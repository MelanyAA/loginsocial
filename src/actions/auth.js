import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  googleAuthProvider,
  facebookAuthProvider,
  updateProfile,
} from "../firebase/firebase-config";
import { types } from "../types/types";
import { noteLogout } from "./notes";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      dispatch(login(user.uid, user.displayName));
    });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        console.log(user, "Dispach");
        //await user.updateProfile({ displayName: name });
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:
            "https://scontent.fmga5-1.fna.fbcdn.net/v/t39.30808-6/235722864_1005467616859530_4514562556399001937_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=174925&_nc_ohc=ZuxIlL855wcAX8WeN4S&_nc_ht=scontent.fmga5-1.fna&oh=efa938873691eeceb4abc92262892aec&oe=619D25BF",
        });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//starGoogleLogin
export const starProviderLogin = (opc) => {
  console.log("auth");
  return (dispatch) => {
    let provedor = "";

    switch (opc) {
      case "google":
        provedor = googleAuthProvider;
        break;
      case "facebook":
        provedor = facebookAuthProvider;
        break;

      default:
        break;
    }

    const auth = getAuth();
    signInWithPopup(auth, provedor).then(({ user }) => {
      //console.log(user);
      dispatch(login(user.uid, user.displayName));
    });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const StartLogout = () => {
  return async (dispatch) => {
    const auth = getAuth();
    await signOut(auth);
    dispatch(logout());
    dispatch(noteLogout());
  };
};

export const logout = () => ({
  type: types.logout,
});
