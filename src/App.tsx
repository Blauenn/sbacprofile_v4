import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { fetch_user_info } from "./functions/fetch/fetch_user.function";
// Contexts //
import { useContext_Account } from "./contexts/Account.context";
import { StudentsContextProvider } from "./contexts/Student.context";
import { TeachersContextProvider } from "./contexts/Teacher.context";
// Components //
import Sidebar from "./components/miscellaneous/Sidebar/Sidebar.component";
import PageNotFound from "./components/miscellaneous/PageNotFound.component";
import Loading from "./components/miscellaneous/Loading.component";

// Pages //
const Login = lazy(() => import("./pages/Login.page"));
const Home = lazy(() => import("./pages/Home.page"));
const Students = lazy(() => import("./pages/Students.page"));
const Teachers = lazy(() => import("./pages/Teachers.page"));

const App = () => {
  const location = useLocation();

  const {
    accessToken,
    isLoggedIn,
    setAccessToken,
    setUserInfo,
    setIsLoggedIn,
  } = useContext_Account();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      setIsLoggedIn(true);

      if (accessToken) {
        fetch_user_info(accessToken, setUserInfo);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, [accessToken]);

  return isLoggedIn ? (
    <div className="flex flex-row">
      <Sidebar />

      <Suspense fallback={<Loading />}>
        <AnimatePresence>
          <div className="| | | relative my-16 me-8 ms-20 w-full sm:my-20 sm:me-20 sm:ms-32 lg:me-28 lg:ms-40">
            <Routes location={location} key={location.pathname}>
              {/* No URL */}
              <Route path="" element={<Navigate to="/home" replace />} />
              <Route path="/login" element={<Navigate to="/home" replace />} />

              {/* Page not found */}
              <Route path="*" element={<PageNotFound />}></Route>

              {/* Home */}
              <Route path="/home" element={<Home />}></Route>
              {/* Students */}
              <Route
                path="/students"
                element={
                  <StudentsContextProvider>
                    <Students />
                  </StudentsContextProvider>
                }
              ></Route>
              {/* Teachers */}
              <Route
                path="/teachers"
                element={
                  <TeachersContextProvider>
                    <Teachers />
                  </TeachersContextProvider>
                }
              ></Route>
            </Routes>
          </div>
        </AnimatePresence>
      </Suspense>
    </div>
  ) : (
    <Suspense>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <Login
              setAccessToken={setAccessToken}
              setUserInfo={setUserInfo}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
