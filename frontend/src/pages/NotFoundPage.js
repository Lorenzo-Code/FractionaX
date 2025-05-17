import React from "react";
import Navbar from "../components/Navbar";

const NotFoundPage = () => {
  return (
    <div>
    <section className="text-center">
      <Navbar />
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </section>
    </div>
  );
};

export default NotFoundPage;
