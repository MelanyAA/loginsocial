import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { JournalScreen } from "../Components/Journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { login } from "../actions/auth";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRoute } from "./PublicRouter";
import { Loading } from "../Components/Journal/Loading";
import { StartLoadingNote } from "../actions/notes";

export const AppRouter = () => {
  const dispatch = useDispatch();
  //Estado de carga de la app
  const [checking, setchecking] = useState(true);
  //Estado donde mostramos si el usuario esta autentificado o no
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("router");
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      // console.log(user, "onAuthStateChanged");
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);

        dispatch(StartLoadingNote(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      setchecking(false);
    });
  }, [dispatch, setchecking, setIsLoggedIn]);

  if (checking) {
    return <Loading />;
  }
  console.log("Routerss");
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="*"
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <AuthRouter />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/"
            element={
              <PrivateRouter isLoggedIn={isLoggedIn}>
                <JournalScreen />
              </PrivateRouter>
            }
          />

          {/* <Route
            path="*"
            element={!isLoggedIn ? <AuthRouter /> : <JournalScreen />}
          /> */}

          {<Route path="**" element={<JournalScreen />} />}
        </Routes>
      </div>
    </Router>
  );
};
