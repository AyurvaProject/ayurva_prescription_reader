import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./component/layout/Layout";
import RequestList from "./pages/requests/RequestList";
import RequesDetails from "./pages/requests/RequestDetails";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<RequestList />} />
            <Route path="/requestDetails" element={<RequesDetails />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
