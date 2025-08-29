import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./component/layout/Layout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./component/protectedRoute/ProtectedRoute";
import RequestList from "./pages/requests/RequestList";
import RequesDetails from "./pages/requests/RequestDetails";
import SignUpPage from "./pages/auth/SignUp";
import SignInPage from "./pages/auth/SignIn";
import VerifyOtpPage from "./pages/auth/VerifyOtp";
import AllPendingPrescriptions from "./pages/prescription/AllPendingPrescription";
import PrPendingPrescriptions from "./pages/prescription/PrPendingPrescriptions";
import SinglePrescription from "./pages/prescription/SinglePrescription";
import PrescriptionDetailAddEdit from "./pages/prescription/PrescriptionDetailAddEdit";
import PrReadPrescriptions from "./pages/prescription/PrReadPrescriptions";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route element={<ProtectedRoute roles={["pr"]} />}>
                <Route path="/" element={<AllPendingPrescriptions />} />
                <Route
                  path="/allPendingPrescriptions"
                  element={<AllPendingPrescriptions />}
                />
                <Route
                  path="/myPendingPrescriptions"
                  element={<PrPendingPrescriptions />}
                />
                <Route
                  path="/myReadPrescriptions"
                  element={<PrReadPrescriptions />}
                />
                <Route
                  path="/singlePrescription/:id"
                  element={<SinglePrescription />}
                />
                <Route
                  path="/prescriptionDetail/add/:pres_id"
                  element={<PrescriptionDetailAddEdit />}
                />
                <Route
                  path="/prescriptionDetail/edit/:pres_id/:pres_detail_id"
                  element={<PrescriptionDetailAddEdit />}
                />
              </Route>
              <Route element={<ProtectedRoute roles={["admin"]} />}>
                <Route path="/requests" element={<RequestList />} />
                {/* <Route path="/requestDetails" element={<RequesDetails />} /> */}
              </Route>
            </Route>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/verifyOtp/:id" element={<VerifyOtpPage />} />
            <Route path="/login" element={<SignInPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
