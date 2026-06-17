import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Plan() {
  const [plan, setPlan] = useState(
    JSON.parse(localStorage.getItem("plan")) || []
  );

  const [exercises, setExercises] = useState([]);
  const [level, setLevel] = useState("Початковий");
  const [goal, setGoal] = useState("Загальна гнучкість");

  useEffect(() => {
    fetch("https://stretching-planner-api.onrender.com/api/exercises/${id}")
      .then((res) => res.json())
      .then((data) => setExercises(data))
      .catch((error) => console.error("Помилка:", error));

    const token = localStorage.getItem("token");

    if (token) {
      fetch("https://stretching-planner-api.onrender.com/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((user) => {
          setLevel(user.level || "Початковий");
          setGoal(user.goal || "Загальна гнучкість");
        })
        .catch((error) => console.error("Помилка профілю:", error));
    }
  }, []);

  const savePlan = (updatedPlan) => {
    setPlan(updatedPlan);
    localStorage.setItem("plan", JSON.stringify(updatedPlan));
  };

  const createPlanByCategory = (categoryName) => {
    const selected = exercises
      .filter((exercise) => exercise.category === categoryName)
      .slice(0, 6);

    if (selected.length === 0) {
      alert("Для цієї програми поки немає вправ");
      return;
    }

    savePlan(selected);
    alert(`Програму "${categoryName}" створено`);
  };

  const generateRecommendedPlan = () => {
    let recommended = exercises.filter(
      (exercise) => exercise.difficulty === level
    );

    if (goal !== "Загальна гнучкість") {
      recommended = recommended.filter(
        (exercise) => exercise.category === goal || exercise.muscleGroup === goal
      );
    }

    recommended = recommended.slice(0, 6);

    if (recommended.length === 0) {
      alert("Для цієї цілі поки немає вправ");
      return;
    }

    savePlan(recommended);
    alert(`План створено: ${goal}, рівень ${level}`);
  };

  const removeExercise = (id) => {
    const updatedPlan = plan.filter((exercise) => exercise.id !== id);
    savePlan(updatedPlan);
  };

  const clearPlan = () => {
    savePlan([]);
    localStorage.removeItem("plan");
  };

  return (
    <div>
      <h1>Мій план тренувань</h1>

      <div className="details-card">
        <p>
          <strong>Рівень:</strong> {level}
        </p>

        <p>
          <strong>Ціль із профілю:</strong> {goal}
        </p>

        <button onClick={generateRecommendedPlan}>
          Створити рекомендований план
        </button>

        {plan.length > 0 && (
          <>
            <Link to="/workout">
              <button>Почати тренування</button>
            </Link>

            <button onClick={clearPlan}>Очистити план</button>
          </>
        )}
      </div>

      <h2>Готові навчальні програми</h2>

      <div className="exercise-list">
        <div className="exercise-card">
          <h2>Здорова спина</h2>
          <p>Комплекс для мобільності хребта та розслаблення спини.</p>
          <button onClick={() => createPlanByCategory("Розтяжка спини")}>
            Обрати програму
          </button>
        </div>

        <div className="exercise-card">
          <h2>Поздовжній шпагат</h2>
          <p>Поступова підготовка до поздовжнього шпагату.</p>
          <button onClick={() => createPlanByCategory("Поздовжній шпагат")}>
            Обрати програму
          </button>
        </div>

        <div className="exercise-card">
          <h2>Поперечний шпагат</h2>
          <p>Вправи для розкриття тазу та внутрішньої поверхні стегон.</p>
          <button onClick={() => createPlanByCategory("Поперечний шпагат")}>
            Обрати програму
          </button>
        </div>

        <div className="exercise-card">
          <h2>Місток</h2>
          <p>Підготовка спини, плечей і грудного відділу до містка.</p>
          <button onClick={() => createPlanByCategory("Місток")}>
            Обрати програму
          </button>
        </div>

        <div className="exercise-card">
          <h2>Стійка на ліктях</h2>
          <p>Навчальна програма для балансу та сили плечей.</p>
          <button onClick={() => createPlanByCategory("Стійка на ліктях")}>
            Обрати програму
          </button>
        </div>
      </div>

      <h2>Поточний план</h2>

      {plan.length === 0 ? (
        <p>План поки порожній.</p>
      ) : (
        <div className="exercise-list">
          {plan.map((exercise) => (
            <div className="exercise-card" key={exercise.id}>
              <h2>{exercise.title}</h2>
              <p>{exercise.description}</p>
              <p>Складність: {exercise.difficulty}</p>
              <p>Категорія: {exercise.category}</p>
              <p>Тривалість: {exercise.duration} сек</p>

              <button onClick={() => removeExercise(exercise.id)}>
                Видалити
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Plan;