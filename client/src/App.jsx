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

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <BrowserRouter>
      <nav className="navbar">
 <div className="logo">
  <img src="/logo.png" alt="Stretching Krupko" />
</div>

  <div className="nav-links">
    <Link to="/">Головна</Link>
    <Link to="/exercises">Вправи</Link>
    <Link to="/plan">План</Link>
    <Link to="/workout">Тренування</Link>
    <Link to="/schedule">Календар</Link>
    <Link to="/stats">Статистика</Link>
    <Link to="/profile">Профіль</Link>
    <Link to="/tutorials">Навчання</Link>
<Link to="/videos">Відеоуроки</Link>

    <button className="theme-button" onClick={() => setDarkMode(!darkMode)}>
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
          <Route
  path="/achievements"
  element={<Achievements />}
/>
<Route path="/about" element={<About />} />
<Route path="/videos" element={<Videos />} />
<Route path="*" element={<NotFound />} />

        </Routes>
      </div>
      <footer className="footer">
  <p>Stretching Planner © 2026</p>
  
</footer>
    </BrowserRouter>
  );
}

export default App;