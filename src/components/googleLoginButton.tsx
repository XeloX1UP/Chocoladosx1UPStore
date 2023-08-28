"use client";
export default function GoogleLoginButton() {
  return (
    <button
      className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
      onClick={async () => {
        // await fetch("/api/logInGoogle")
        //   .then(async (data) => {
        //     const result = await data.json();
        //     console.log(result);
        //   })
        //   .catch((error) => {
        //     console.log({ error });
        //   });
      }}
    >
      Iniciar sesión con Google
    </button>
  );
}
