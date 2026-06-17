import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Workout() {
  const plan = JSON.parse(localStorage.getItem("plan")) || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(plan[0]?.duration || 0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isExerciseDone, setIsExerciseDone] = useState(false);

  const currentExercise = plan[currentIndex];

  const finishWorkout = () => {
    const completedWorkouts =
      JSON.parse(localStorage.getItem("completedWorkouts")) || [];

    const workoutResult = {
      id: Date.now(),
      date: new Date().toLocaleDateString("uk-UA"),
      exercisesCount: plan.length,
      totalDuration: plan.reduce(
        (sum, exercise) => sum + (exercise.duration || 0),
        0
      ),
    };

    localStorage.setItem(
      "completedWorkouts",
      JSON.stringify([...completedWorkouts, workoutResult])
    );

    setIsActive(false);
    setIsFinished(true);
  };

  useEffect(() => {
    if (!isActive || isFinished) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (timeLeft === 0) {
      setIsExerciseDone(true);

      const autoNext = setTimeout(() => {
        if (currentIndex < plan.length - 1) {
          const nextIndex = currentIndex + 1;

          setCurrentIndex(nextIndex);
          setTimeLeft(plan[nextIndex].duration || 0);
          setIsExerciseDone(false);
          setIsActive(true);
        } else {
          finishWorkout();
        }
      }, 2000);

      return () => clearTimeout(autoNext);
    }
  }, [isActive, timeLeft, currentIndex, isFinished]);

  const startWorkout = () => {
    setIsActive(true);
    setIsExerciseDone(false);
  };

  const pauseWorkout = () => {
    setIsActive(false);
  };

  const resetExercise = () => {
    setIsActive(false);
    setIsExerciseDone(false);
    setTimeLeft(currentExercise.duration || 0);
  };

  const nextExercise = () => {
    setIsExerciseDone(false);

    if (currentIndex < plan.length - 1) {
      const nextIndex = currentIndex + 1;

      setCurrentIndex(nextIndex);
      setTimeLeft(plan[nextIndex].duration || 0);
      setIsActive(false);
    } else {
      finishWorkout();
    }
  };

  const restartWorkout = () => {
    setCurrentIndex(0);
    setTimeLeft(plan[0]?.duration || 0);
    setIsActive(false);
    setIsFinished(false);
    setIsExerciseDone(false);
  };

  if (plan.length === 0) {
    return (
      <div>
        <h1>Тренування</h1>
        <p>Спочатку додайте вправи у план.</p>

        <Link to="/plan">
          <button>Перейти до плану</button>
        </Link>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="details-page">
        <div className="details-card workout-finish">
          <h1>Тренування завершено 🎉</h1>
          <p>Ви виконали всі вправи з плану.</p>

          <button onClick={restartWorkout}>Почати знову</button>

          <Link to="/stats">
            <button>Перейти до статистики</button>
          </Link>

          <Link to="/plan">
            <button>Мій план</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="details-page">
      <Link to="/plan" className="back-link">
        ← Назад до плану
      </Link>

      <div className="details-card">
        <h1>{currentExercise.title}</h1>
        <p>{currentExercise.description}</p>

        <div className="exercise-info">
          <p>
            <strong>Вправа:</strong> {currentIndex + 1} / {plan.length}
          </p>

          <p>
            <strong>Категорія:</strong> {currentExercise.category}
          </p>

          <p>
            <strong>Складність:</strong> {currentExercise.difficulty}
          </p>
        </div>

        <div className="animation-box">
          {currentExercise.image ? (
            <img
              src={currentExercise.image}
              alt={currentExercise.title}
              className="exercise-media"
            />
          ) : (
            <p>Фото вправи не додано</p>
          )}
        </div>

        <div className="timer">{timeLeft} сек</div>

        {isExerciseDone && (
          <div className="workout-success">
            ✓ Вправу завершено! Переходимо до наступної...
          </div>
        )}

        <div className="timer-buttons">
          <button onClick={startWorkout} disabled={isActive}>
            {isActive ? "Йде тренування" : "Старт"}
          </button>

          <button onClick={pauseWorkout}>Пауза</button>

          <button onClick={resetExercise}>Скинути</button>

          <button onClick={nextExercise}>
            {currentIndex < plan.length - 1
              ? "Наступна вправа"
              : "Завершити тренування"}
          </button>
        </div>

        {currentExercise.steps && (
          <div className="instruction-box">
            <h2>Як виконувати</h2>

            {currentExercise.steps.map((step, index) => (
              <p key={index}>
                <strong>{index + 1}.</strong> {step}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


export default Workout;
