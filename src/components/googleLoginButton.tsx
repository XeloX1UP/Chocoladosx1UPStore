"use client";

import { signInGooglePopUp } from "@/services/firebase/auth/app";
import {
  getFromDB,
  getFromDBOneTime,
  writeData,
} from "@/services/firebase/realtimeDB/app";
import { TCookieUser } from "@/types";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();
  return (
    <button
      className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
      onClick={async () => {
        await signInGooglePopUp(async (user) => {
          const dbUserData = await getFromDBOneTime<TCookieUser>({
            route: "users",
            id: user.uid,
          });

          if (dbUserData) {
            writeData({
              object: { ...dbUserData, verified: true },
              table: "users",
              id: user.uid,
            });
            fetch(
              `/api/createUserCookie/${encodeURIComponent(
                JSON.stringify(dbUserData)
              )}`
            ).then(async (response) => {
              const res = await response.json();
              if (res["isValid"]) router.refresh();
            });
          } else {
            const googleUser: TCookieUser = {
              email: `${user.email}`,
              name: `${user.displayName}`,
              phoneNumber: user.phoneNumber ? Number(user.phoneNumber) : 0,
              verified: user.emailVerified,
            };
            writeData({ object: googleUser, table: "users", id: user.uid });
            fetch(
              `/api/createUserCookie/${encodeURIComponent(
                JSON.stringify(googleUser)
              )}`
            ).then(async (response) => {
              const recivedData = await response.json();

              if (recivedData["isValid"]) router.refresh();
            });
          }
        });
      }}
    >
      Iniciar sesión con Google
    </button>
  );
}
