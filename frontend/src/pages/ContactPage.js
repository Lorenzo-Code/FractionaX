import React, { useState } from "react";
// import "../styles/contactPage.scss";
 // Using SCSS for customization

const ContactPage = () => {
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    // Simulate form submission success
    setResponseMessage("Thank you for reaching out! I'll get back to you soon.");

    // Clear form fields
    event.target.reset();
  };

  return (
    <div className="container">
      <h1>Contact Me</h1>
      <p>I'd love to hear from you! Please fill out the form below, and I'll get back to you as soon as possible.</p>
      <form id="contactForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" name="name" placeholder="Enter your full name" required />

        <label htmlFor="email">Your Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email address" required />

        <label htmlFor="message">Your Message</label>
        <textarea id="message" name="message" rows="5" placeholder="Write your message here" required></textarea>

        <button type="submit">Send Message</button>

        {responseMessage && <div className="success-message">{responseMessage}</div>}
      </form>
    </div>
  );
};

export default ContactPage;
