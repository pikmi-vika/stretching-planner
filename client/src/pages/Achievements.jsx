function Achievements() {
  const completedWorkouts =
    JSON.parse(localStorage.getItem("completedWorkouts")) || [];

  const achievements = [
    {
      id: 1,
      title: "Перше тренування",
      completed: completedWorkouts.length >= 1,
    },
    {
      id: 2,
      title: "5 завершених тренувань",
      completed: completedWorkouts.length >= 5,
    },
    {
      id: 3,
      title: "10 завершених тренувань",
      completed: completedWorkouts.length >= 10,
    },
  ];

  return (
    <div>
      <h1>Досягнення</h1>

      <div className="exercise-list">
        {achievements.map((achievement) => (
          <div className="exercise-card" key={achievement.id}>
            <h2>{achievement.title}</h2>

            <p>
              Статус:{" "}
              <strong>
                {achievement.completed
                  ? "Отримано"
                  : "Заблоковано"}
              </strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achievements;