import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ExerciseDetails() {
  const { id } = useParams();

  const [exercise, setExercise] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    fetch(
      `https://stretching-planner-api.onrender.com/api/exercises/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setExercise(data);
        setTimeLeft(data.duration);
      });
  }, [id]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  if (!exercise) {
    return <p>Завантаження...</p>;
  }

  return (
    <div className="details-page">
      <Link to="/exercises" className="back-link">
        ← Назад до вправ
      </Link>

      <div className="details-card">
        <h1>{exercise.title}</h1>

        <p>{exercise.description}</p>

        <div className="exercise-info">
          <span>Складність: {exercise.difficulty}</span>
          <span>Група мʼязів: {exercise.muscleGroup}</span>
          <span>Тривалість: {exercise.duration} сек</span>
        </div>

        <div className="animation-box">
          {exercise.image ? (
            <img
              src={exercise.image}
              alt={exercise.title}
              className="exercise-media"
            />
          ) : (
            <p>Фото вправи не додано</p>
          )}
        </div>

        <div className="timer">
          {timeLeft} сек
        </div>

        <div className="timer-buttons">
          <button onClick={() => setIsActive(true)}>
            Старт
          </button>

          <button onClick={() => setIsActive(false)}>
            Пауза
          </button>

          <button
            onClick={() => {
              setIsActive(false);
              setTimeLeft(exercise.duration);
            }}
          >
            Скинути
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExerciseDetails;