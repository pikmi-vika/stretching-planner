import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [difficulty, setDifficulty] = useState("Усі");
  const [category, setCategory] = useState("Усі");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/exercises")
      .then((res) => res.json())
      .then((data) => setExercises(data))
      .catch((error) => console.error("Помилка:", error));
  }, []);

  const addToPlan = (exercise) => {
    const currentPlan = JSON.parse(localStorage.getItem("plan")) || [];
    const alreadyAdded = currentPlan.find((item) => item.id === exercise.id);

    if (alreadyAdded) {
      alert("Ця вправа вже є у плані");
      return;
    }

    localStorage.setItem("plan", JSON.stringify([...currentPlan, exercise]));
    alert("Вправу додано до плану");
  };

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDifficulty =
      difficulty === "Усі" || exercise.difficulty === difficulty;

    const matchesCategory =
      category === "Усі" || exercise.category === category;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <div>
      <h1>Вправи</h1>

      <div className="schedule-box">
        <input
          type="text"
          placeholder="Пошук вправи..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Усі</option>
          <option>Початковий</option>
          <option>Середній</option>
          <option>Просунутий</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Усі</option>
          <option>Розтяжка спини</option>
          <option>Місток</option>
          <option>Поздовжній шпагат</option>
          <option>Поперечний шпагат</option>
          <option>Плечі та грудний відділ</option>
          <option>Стійка на ліктях</option>
          <option>Стійка на руках</option>
          <option>Гімнастичні елементи</option>
        </select>
      </div>

      <div className="exercise-list">
        {filteredExercises.length === 0 ? (
          <p>Вправ не знайдено.</p>
        ) : (
          filteredExercises.map((exercise) => (
            <div className="exercise-card" key={exercise.id}>
              <h2>{exercise.title}</h2>

              <p>{exercise.description}</p>

              <p>
                <strong>Складність:</strong> {exercise.difficulty}
              </p>

              <p>
                <strong>Категорія:</strong> {exercise.category}
              </p>

              <p>
                <strong>Тривалість:</strong> {exercise.duration} сек
              </p>

              <Link to={`/exercises/${exercise.id}`}>
                <button>Почати</button>
              </Link>

              <button onClick={() => addToPlan(exercise)}>
                Додати до плану
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Exercises;