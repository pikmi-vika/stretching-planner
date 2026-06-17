function Stats() {
  const plan = JSON.parse(localStorage.getItem("plan")) || [];
  const schedules = JSON.parse(localStorage.getItem("schedules")) || [];
  const completedWorkouts =
    JSON.parse(localStorage.getItem("completedWorkouts")) || [];

  const totalDuration = completedWorkouts.reduce(
    (sum, workout) => sum + (workout.totalDuration || 0),
    0
  );

  const totalMinutes = Math.round(totalDuration / 60);

  const averageDuration =
    completedWorkouts.length > 0
      ? Math.round(totalMinutes / completedWorkouts.length)
      : 0;

  const allExercises = completedWorkouts.flatMap(
    (workout) => workout.exercises || []
  );

  const categoryCount = {};

  allExercises.forEach((exercise) => {
    if (exercise.category) {
      categoryCount[exercise.category] =
        (categoryCount[exercise.category] || 0) + 1;
    }
  });

  const favoriteCategory =
    Object.keys(categoryCount).length > 0
      ? Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0][0]
      : "Поки немає даних";

  const clearHistory = () => {
    localStorage.removeItem("completedWorkouts");
    window.location.reload();
  };

  return (
    <div>
      <h1>Статистика прогресу</h1>

      <div className="exercise-list">
        <div className="exercise-card">
          <h2>{plan.length}</h2>
          <p>Вправ у поточному плані</p>
        </div>

        <div className="exercise-card">
          <h2>{schedules.length}</h2>
          <p>Запланованих тренувань</p>
        </div>

        <div className="exercise-card">
          <h2>{completedWorkouts.length}</h2>
          <p>Завершених тренувань</p>
        </div>

        <div className="exercise-card">
          <h2>{totalMinutes}</h2>
          <p>Хвилин тренувань</p>
        </div>

        <div className="exercise-card">
          <h2>{averageDuration}</h2>
          <p>Середня тривалість, хв</p>
        </div>

        <div className="exercise-card">
          <h2>{favoriteCategory}</h2>
          <p>Улюблена категорія</p>
        </div>
      </div>

      <h2>Історія тренувань</h2>

      {completedWorkouts.length > 0 && (
        <button onClick={clearHistory}>Очистити історію</button>
      )}

      {completedWorkouts.length === 0 ? (
        <p>Історія поки порожня.</p>
      ) : (
        <div className="schedule-list">
          {completedWorkouts.map((workout) => (
            <div className="schedule-card" key={workout.id}>
              <h3>{workout.date}</h3>
              <p>Кількість вправ: {workout.exercisesCount}</p>
              <p>Тривалість: {Math.round(workout.totalDuration / 60)} хв</p>

              {workout.exercises && (
                <div>
                  <strong>Вправи:</strong>
                  {workout.exercises.map((exercise) => (
                    <p key={exercise.id}>• {exercise.title}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Stats;