import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import ExerciseDetails from "./pages/ExerciseDetails";
import Plan from "./pages/Plan";
import Workout from "./pages/Workout";
import Schedule from "./pages/Schedule";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";
import Achievements from "./pages/Achievements";
import About from "./pages/About";
import Progress from "./pages/Progress";
import ProgressChart from "./pages/ProgressChart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tutorials from "./pages/Tutorials";
import TutorialDetails from "./pages/TutorialDetails";
import Videos from "./pages/Videos";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/logo.png" alt="Stretching Krupko" />
        </Link>

        <button
          className="burger-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className={menuOpen ? "nav-links open" : "nav-links"}>
          <Link to="/" onClick={closeMenu}>Головна</Link>
          <Link to="/exercises" onClick={closeMenu}>Вправи</Link>
          <Link to="/plan" onClick={closeMenu}>План</Link>
          <Link to="/workout" onClick={closeMenu}>Тренування</Link>
          <Link to="/schedule" onClick={closeMenu}>Календар</Link>
          <Link to="/stats" onClick={closeMenu}>Статистика</Link>
          <Link to="/profile" onClick={closeMenu}>Профіль</Link>
          <Link to="/tutorials" onClick={closeMenu}>Навчання</Link>
          <Link to="/videos" onClick={closeMenu}>Відеоуроки</Link>

          <button
            className="theme-button"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/exercises/:id" element={<ExerciseDetails />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/chart" element={<ProgressChart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/tutorials/:id" element={<TutorialDetails />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/about" element={<About />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <footer className="footer">
        <p>Stretching Krupko © 2026</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;