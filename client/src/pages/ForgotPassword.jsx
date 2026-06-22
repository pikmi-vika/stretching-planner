import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://stretching-planner-api.onrender.com/api/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="auth-page">
      <div className="details-card auth-card">
        <h1>Відновлення пароля</h1>

        <form onSubmit={submit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Надіслати лист</button>
        </form>

        <p>
          <Link to="/login">Повернутися до входу</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;