function Progress() {
  const completed =
    JSON.parse(localStorage.getItem("completedWorkouts")) || [];

  const count = completed.length;

  let level = "Новачок 🌱";

  if (count >= 30) {
    level = "Майстер 🏆";
  } else if (count >= 15) {
    level = "Просунутий 🔥";
  } else if (count >= 5) {
    level = "Любитель 💪";
  }

  return (
    <div>
      <h1>Мій прогрес</h1>

      <div className="details-card">
        <h2>{level}</h2>

        <p>Виконано тренувань: {count}</p>

        <progress
          value={Math.min(count, 30)}
          max="30"
          style={{
            width: "100%",
            height: "30px",
          }}
        />
      </div>
    </div>
  );
}

export default Progress;