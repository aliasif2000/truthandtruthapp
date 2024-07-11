import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoutes";
import PageTitle from "./components/PageTitle";
import Page404 from "./pages/Page404";
import UpdateDrawer from "./components/UpdateDrawer";
import Layout from "./Layout";

const AdminPanel = React.lazy(() => import("../src/pages/AdminPanel"));
const TruthPage = React.lazy(() => import("../src/pages/TruthPage"));
const Users = React.lazy(() => import("./pages/UsersPage"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route
              path="adminpanel"
              element={
                <>
                  <PageTitle title={"Dashboard"} />
                  <Suspense>
                    <AdminPanel />
                  </Suspense>
                </>
              }
            />

            <Route
              path="/users"
              element={
                <>
                  <PageTitle title={"Users List"} />
                  <Suspense>
                    <Users />
                  </Suspense>
                </>
              }
            />
            <Route
              path="kidstruth"
              element={
                <>
                  <PageTitle title={"Kids Truths"} />
                  <UpdateDrawer />
                  <Suspense>
                    <TruthPage api={"getkidstruth"} />
                  </Suspense>
                </>
              }
            />
            <Route
              path="teenstruth"
              element={
                <>
                  <PageTitle title={"Teens Truths"} />
                  <Suspense>
                    <TruthPage api={"getteenstruth"} />
                  </Suspense>
                </>
              }
            />
            <Route
              path="adultstruth"
              element={
                <>
                  <PageTitle title={"Adults Truths"} />
                  <Suspense>
                    <TruthPage api={"getadultstruth"} />
                  </Suspense>
                </>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
