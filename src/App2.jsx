import React, { useState } from "react";

const App2 = () => {
  const [email, setEmail] = useState("");

  const sendemailform = (e) => {
    e.preventDefault();
    console.log("Email sent to:", email);
    setEmail(""); // clear input after submit
  };

  return (
    <div>
      <div>Welcome to interact the mail service</div>

      <form onSubmit={sendemailform}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />

        <button type="submit">Send email</button>
      </form>
    </div>
  );
};

export default App2;