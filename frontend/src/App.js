import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
// import ServicesPage from "./pages/ServicesPage";
// import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";


const App = () => {
  return (
    <Router>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* <Route path="/services" element={<ServicesPage />} /> */}
            {/* <Route path="/sign-up" element={<SignUpPage />} /> */}
            <Route path="*" element={<NotFoundPage />} />  {/* Catch-all for 404 */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
