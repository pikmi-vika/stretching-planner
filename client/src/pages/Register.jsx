import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const register = async (e) => {
    e.preventDefault();

    const res = await fetch("https://stretching-planner-api.onrender.com/api/register", {
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

    alert("Реєстрація успішна");
    navigate("/login");
  };

  return (
    <div className="details-page">
      <div className="details-card">
        <h1>Реєстрація</h1>

        <form onSubmit={register}>
          <label>Імʼя</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

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

          <button type="submit">Зареєструватися</button>
        </form>

        <p>
          Уже маєте акаунт? <Link to="/login">Увійти</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;