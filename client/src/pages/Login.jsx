import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch( "https://stretching-planner-api.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Вхід успішний");
    navigate("/profile");
  };

  return (
    <div className="auth-page">
  <div className="details-card auth-card">
        <h1>Вхід</h1>

        <form onSubmit={login}>
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <label>Пароль</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button type="submit">Увійти</button>
        </form>

        <p>
          Немає акаунта? <Link to="/register">Реєстрація</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;