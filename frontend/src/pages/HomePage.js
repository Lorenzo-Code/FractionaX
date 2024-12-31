import React from "react";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <div>
      <Header />
      <main>
        <section className="bg-secondary bg-opacity-50 position-relative pt-xl-8 overflow-hidden">
          <div className="container position-relative pt-4 pt-sm-5 pb-4 pb-lg-8">
            <h1 className="h2 mb-lg-4">Powerful analytics to drive your business</h1>
            <p>Gain insights, make informed decisions, and drive growth with our powerful analytics feature.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
