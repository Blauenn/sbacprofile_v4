import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// Components //
import Sidebar from "./components/miscellaneous/Sidebar/Sidebar.component";
import PageNotFound from "./components/miscellaneous/PageNotFound.component";
import Loading from "./components/miscellaneous/Loading.component";
// Contexts //
import { AccountContextProvider } from "./contexts/Account.context";

// Pages //
const Home = lazy(() => import("./pages/Home.page"));
const Students = lazy(() => import("./pages/Students.page"));

const App = () => {
  const location = useLocation();

  return (
    <AccountContextProvider>
      <div className="flex flex-row">
        <Sidebar />

        <Suspense fallback={<Loading />}>
          <div className="relative ms-20 me-8 my-16 | sm:ms-32 sm:me-20 sm:my-20 | lg:ms-40 lg:me-28 | w-full">
            <AnimatePresence>
              <Routes location={location} key={location.pathname}>
                {/* No URL */}
                <Route path="" element={<Navigate to="/home" replace />} />
                <Route
                  path="/login"
                  element={<Navigate to="/home" replace />}
                />

                {/* Page not found */}
                <Route path="*" element={<PageNotFound />}></Route>

                {/* Home */}
                <Route path="/home" element={<Home />}></Route>
                {/* Home */}
                <Route path="/students" element={<Students />}></Route>
              </Routes>
            </AnimatePresence>
          </div>
        </Suspense>
      </div>
    </AccountContextProvider>
  );
};

export default App;
