import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { TUserLogin } from "@/types";
const provider = new GoogleAuthProvider();
// provider.setCustomParameters({
//   "login-hint": "usuario@ejemplo.com",
// });

export async function createUser(
  email: string,
  password: string,
  onSignin: (user: User) => void
) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      onSignin(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({ errorMessage });
    });
}

// export async function signInRedirect() {
//   await signInWithRedirect(auth, provider);
// }
// export async function getSignInRedirect() {
//   await getRedirectResult(auth)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access Google APIs.
//       if (!result) return;
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       if (!credential) return;
//       const token = credential.accessToken;
//       if (!token) return;
//       // The signed-in user info.
//       const user = result.user;
//       // IdP data available using getAdditionalUserInfo(result)
//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });
// }
export async function signInGooglePopUp(onSignin: (user: User) => void) {
  return await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (!credential) return;
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      onSignin(user);
      return user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
export async function signInEmailAndPassword(
  { email, password }: TUserLogin,
  onSignin: (user: User) => void
) {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      onSignin(user);
      // ...
    })
    .catch((error) => {
      alert("Contraseña incorrecta.");
    });
}
export async function emailVerification(onSend: () => void) {
  if (!auth.currentUser || auth.currentUser === null) return;
  await sendEmailVerification(auth.currentUser)
    .then(() => {
      //Correo enviado
      onSend();
    })
    .catch((error) => {
      alert("Error enviando el correo de verificación");
    });
}
export async function logOut(onLogout: () => void) {
  try {
    await auth.signOut().then(() => {
      onLogout();
    });
  } catch (error) {
    console.log("Error cerrando sesión");
  }
}

export function getUserUID() {
  const user = auth.currentUser;
  if (user) {
    return user.uid;
  }
}
export function onLoggedStatusChange({
  handleLogin,
  handleLogout,
}: {
  handleLogin?: ({ user }: { user: User }) => void;
  handleLogout?: () => void;
}) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      if (handleLogin) handleLogin({ user });

      // ...
    } else {
      // User is signed out
      // ...
      if (handleLogout) handleLogout();
    }
  });
}
// const actionCodeSettings = {
//   // URL you want to redirect back to. The domain (www.example.com) for this
//   // URL must be in the authorized domains list in the Firebase Console.
//   url: "https://www.example.com/finishSignUp?cartId=1234",
//   // This must be true.
//   handleCodeInApp: true,
//   iOS: {
//     bundleId: "com.example.ios",
//   },
//   android: {
//     packageName: "com.example.android",
//     installApp: true,
//     minimumVersion: "12",
//   },
//   dynamicLinkDomain: "example.page.link",
// };
// export const sendVerificationEmail = ({ email }: { email: string }) => {};

export function handleCredentialResponse(response: any) {
  // Build Firebase credential with the Google ID token.
  const idToken = response.credential;
  const credential = GoogleAuthProvider.credential(idToken);

  // Sign in with credential from the Google user.
  signInWithCredential(auth, credential).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The credential that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}
