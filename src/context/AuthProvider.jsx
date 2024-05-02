import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify, toastWarnNotify } from "../helpers/ToastNotify";


const AuthContext = createContext();
export const useAuthContext = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const [yuksel, setYuksel] = useState("")
  const [mustafa, setMustafa] = useState("")
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("currentUser")) || false
  );
  const navigate = useNavigate();

  useEffect(() => {
    userObserver();
  }, []);

  const signUp = (email, password, displayName) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in

        return updateProfile(auth.currentUser, {
          displayName,
        });
      })
      .then(() => {
        navigate("/login");
        toastSuccessNotify("Registered successfully");
      })
      .catch((error) => {
        console.log(error);
        toastErrorNotify(error.message);
      });
  };

  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        if (yuksel) {
          navigate(`/series/details/${yuksel}`)
        }else if (mustafa){

          navigate(`/details/${mustafa}`);
        } else {
          navigate("/")
        }
        toastSuccessNotify("Logged in successfully");
      })
      .catch((error) => {
        console.log(error);
        toastErrorNotify(error.message);
      });
  };

  const googleProvider = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(() => {
        // The signed-in user info.
        if (yuksel) {
          navigate(`/series/details/${yuksel}`)
        }else if (mustafa){

          navigate(`/details/${mustafa}`);
        } else {
          navigate("/")
        }
        toastSuccessNotify("Logged in successfully");
      })
      .catch((error) => {
        // Handle Errors here.

        toastErrorNotify(error.message);
      });
  };

  const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toastWarnNotify("Please check your mail box!");
      })
      .catch((error) => {
        toastErrorNotify(error.message);
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setYuksel("")
        setMustafa("")
        toastSuccessNotify("Logged out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const userObserver = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify({ email, displayName, photoURL })
        );
      } else {
        // User is signed out
        setCurrentUser(false);
        sessionStorage.removeItem("currentUser");
      }
    });
  };
  const values = { signUp, signIn, googleProvider, forgotPassword, logOut, currentUser,setYuksel, setMustafa };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
