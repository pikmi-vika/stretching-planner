import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ExerciseDetails() {
  const { id } = useParams();

  const [exercise, setExercise] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/exercises/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setExercise(data);
        setTimeLeft(data.duration || 0);
      })
      .catch((error) => {
        console.error("Помилка завантаження вправи:", error);
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

        <p className="exercise-description">{exercise.description}</p>

        <div className="exercise-info">
          <p>
            <strong>Складність:</strong> {exercise.difficulty}
          </p>

          <p>
            <strong>Група мʼязів:</strong> {exercise.muscleGroup}
          </p>

          <p>
            <strong>Категорія:</strong> {exercise.category}
          </p>

          <p>
            <strong>Тривалість:</strong> {exercise.duration} сек
          </p>
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

        <div className="timer">{timeLeft} сек</div>

        <div className="timer-buttons">
          <button onClick={() => setIsActive(true)}>Старт</button>

          <button onClick={() => setIsActive(false)}>Пауза</button>

          <button
            onClick={() => {
              setIsActive(false);
              setTimeLeft(exercise.duration || 0);
            }}
          >
            Скинути
          </button>
        </div>

        {exercise.steps && (
          <div className="instruction-box">
            <h2>Як виконувати</h2>

            {exercise.steps.map((step, index) => (
              <p key={index}>
                <strong>{index + 1}.</strong> {step}
              </p>
            ))}
          </div>
        )}

        {exercise.mistakes && (
          <div className="instruction-box">
            <h2>Типові помилки</h2>

            {exercise.mistakes.map((mistake, index) => (
              <p key={index}>• {mistake}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExerciseDetails;