import { useState } from "react";

function Schedule() {
  const [date, setDate] = useState("");
  const [schedules, setSchedules] = useState(
    JSON.parse(localStorage.getItem("schedules")) || []
  );

  const plan = JSON.parse(localStorage.getItem("plan")) || [];

  const saveSchedule = () => {
    if (!date) {
      alert("Оберіть дату тренування");
      return;
    }

    if (plan.length === 0) {
      alert("Спочатку додайте вправи у план");
      return;
    }

    const newSchedule = {
      id: Date.now(),
      date,
      exercises: plan,
      completed: false,
    };

    const updatedSchedules = [...schedules, newSchedule];

    setSchedules(updatedSchedules);
    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));

    setDate("");
    alert("Тренування заплановано");
  };

  const removeSchedule = (id) => {
    const updatedSchedules = schedules.filter((item) => item.id !== id);

    setSchedules(updatedSchedules);
    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
  };

  const toggleCompleted = (id) => {
    const updatedSchedules = schedules.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    );

    setSchedules(updatedSchedules);
    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
  };

  return (
    <div>
      <h1>Календар тренувань</h1>

      <div className="schedule-box">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={saveSchedule}>Запланувати тренування</button>
      </div>

      {schedules.length === 0 ? (
        <p>Запланованих тренувань поки немає.</p>
      ) : (
        <div className="schedule-list">
          {schedules.map((item) => (
            <div className="schedule-card" key={item.id}>
              <h2>{item.date}</h2>

              <p>
                Статус:{" "}
                <strong>
                  {item.completed ? "Виконано" : "Заплановано"}
                </strong>
              </p>

              {item.exercises.map((exercise) => (
                <p key={exercise.id}>• {exercise.title}</p>
              ))}

              <button onClick={() => toggleCompleted(item.id)}>
                {item.completed
                  ? "Позначити як невиконане"
                  : "Позначити як виконане"}
              </button>

              <button onClick={() => removeSchedule(item.id)}>
                Видалити тренування
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Schedule;