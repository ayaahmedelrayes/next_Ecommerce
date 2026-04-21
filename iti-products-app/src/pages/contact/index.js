import React, { useState } from "react";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div class="row justify-content-center mt-4">
      <div class="col-md-6">
        <h2>Contact Us</h2>
        <p class="text-muted">Fill out the form below and we will get back to you.</p>

        {sent ? (
          <div class="alert alert-success">
            Message sent! Thank you, {name}.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Message</label>
              <textarea
                class="form-control"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button type="submit" class="btn btn-dark w-100">Send</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
