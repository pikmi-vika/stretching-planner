import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://stretching-planner-api.onrender.com/api/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Пароль змінено");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="details-card auth-card">
        <h1>Новий пароль</h1>

        <form onSubmit={submit}>
          <label>Новий пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />

          <button type="submit">Змінити пароль</button>
        </form>

        <p>
          <Link to="/login">Повернутися до входу</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;