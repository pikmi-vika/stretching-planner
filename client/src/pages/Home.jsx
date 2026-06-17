import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="hero-card">
        <div className="hero-text">
          <h1>
            Розтягни своє тіло.
            <br />
            Покращуй своє життя.
          </h1>

          <p>
            Stretching Planner допоможе тобі створювати індивідуальні плани
            тренувань, виконувати вправи з комфортом та відстежувати свій
            прогрес щодня.
          </p>

          <Link to="/exercises">
            <button className="hero-button">
              🤸 Почати тренування
            </button>
          </Link>
        </div>

       
      </section>

      <section className="features-grid">
  <Link to="/exercises" className="feature-card feature-link">
    <span>🤸</span>

    <div>
      <h3>Вправи</h3>
      <p>Перейти до каталогу вправ для спини, шпагатів, містка та стійок.</p>
      <strong>Відкрити →</strong>
    </div>
  </Link>

  <Link to="/plan" className="feature-card feature-link">
    <span>📋</span>

    <div>
      <h3>Мій план</h3>
      <p>Створи або відкрий персональний план тренувань.</p>
      <strong>Перейти →</strong>
    </div>
  </Link>

  <Link to="/workout" className="feature-card feature-link">
    <span>⏱️</span>

    <div>
      <h3>Тренування</h3>
      <p>Запусти тренування з таймером і автоматичним переходом між вправами.</p>
      <strong>Почати →</strong>
    </div>
  </Link>

  <Link to="/tutorials" className="feature-card feature-link">
    <span>🎓</span>

    <div>
      <h3>Навчання</h3>
      <p>Вивчай місток, шпагати, стійки та гімнастичні елементи.</p>
      <strong>Навчатися →</strong>
    </div>
  </Link>
</section>
    </div>
  );
}

export default Home;