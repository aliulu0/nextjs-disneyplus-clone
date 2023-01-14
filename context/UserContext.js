import { createContext, useContext, useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useRouter } from "next/router";

const UserContext = createContext();
export const useAuth = () => {
  return useContext(UserContext);
};
export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  
  const [currentUser, setUser] = useState({});
  
  const logOut = async () => {
    await auth.signOut(auth.currentUser);
    setUser({})
    router.push("/");
  };

  const logIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
-      setUser({
        id: auth?.currentUser?.uid,
        avatar: auth?.currentUser?.photoURL,
      });
      router.push("/home");
    } catch (error) {
      console.log(error.message);
      router.push("/");
    }
  };

  const values = {
    currentUser,
    logOut,
    logIn,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
