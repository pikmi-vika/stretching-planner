import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    level: "Початковий",
    goal: "Загальна гнучкість",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "");
  const [progress, setProgress] = useState(
    Number(localStorage.getItem("goalProgress")) || 0
  );

  const plan = JSON.parse(localStorage.getItem("plan")) || [];
  const schedules = JSON.parse(localStorage.getItem("schedules")) || [];
  const completedWorkouts =
    JSON.parse(localStorage.getItem("completedWorkouts")) || [];

  const totalDuration = completedWorkouts.reduce(
    (sum, workout) => sum + (workout.totalDuration || 0),
    0
  );

  const totalMinutes = Math.round(totalDuration / 60);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("https://stretching-planner-api.onrender.com/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      });
  }, [token, navigate]);

  const saveProfile = async () => {
    const res = await fetch("https://stretching-planner-api.onrender.com/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: profile.name,
        level: profile.level,
        goal: profile.goal,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Помилка збереження");
      return;
    }

    setProfile(data);
    localStorage.setItem("user", JSON.stringify(data));
    setIsEditing(false);
    alert("Профіль оновлено");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const changeAvatar = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);
      localStorage.setItem("avatar", reader.result);
    };

    reader.readAsDataURL(file);
  };

  const updateProgress = (value) => {
    setProgress(value);
    localStorage.setItem("goalProgress", value);
  };

  return (
    <div>
      <h1>Кабінет користувача</h1>

      <div className="profile-layout">
        <div className="details-card profile-main-card">
          <div className="profile-avatar">
            {avatar ? (
              <img src={avatar} alt="Аватар користувача" />
            ) : (
              <span>{profile.name ? profile.name[0].toUpperCase() : "U"}</span>
            )}
          </div>

          <label className="avatar-upload">
            Змінити фото
            <input type="file" accept="image/*" onChange={changeAvatar} />
          </label>

          {!isEditing ? (
            <>
              <h2>{profile.name || "Користувач"}</h2>
              <p>{profile.email}</p>

              <div className="profile-badges">
                <span>{profile.level}</span>
                <span>{profile.goal}</span>
              </div>

              <button onClick={() => setIsEditing(true)}>
                Редагувати профіль
              </button>

              <button onClick={logout}>Вийти</button>
            </>
          ) : (
            <div className="profile-edit-inline">
              <label>Імʼя</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />

              <label>Email</label>
              <input type="email" value={profile.email} disabled />

              <label>Рівень підготовки</label>
              <select
                value={profile.level}
                onChange={(e) =>
                  setProfile({ ...profile, level: e.target.value })
                }
              >
                <option>Початковий</option>
                <option>Середній</option>
                <option>Просунутий</option>
                <option>Професійний</option>
              </select>

              <label>Тип занять / ціль</label>
              <select
                value={profile.goal}
                onChange={(e) =>
                  setProfile({ ...profile, goal: e.target.value })
                }
              >
                <option>Загальна гнучкість</option>
                <option>Розтяжка спини</option>
                <option>Поздовжній шпагат</option>
                <option>Поперечний шпагат</option>
                <option>Місток</option>
                <option>Стійка на ліктях</option>
                <option>Стійка на руках</option>
                <option>Гімнастичні елементи</option>
              </select>

              <button onClick={saveProfile}>Зберегти зміни</button>

              <button onClick={() => setIsEditing(false)}>
                Скасувати
              </button>
            </div>
          )}
        </div>

        <div className="details-card">
          <h2>Моя статистика</h2>

          <div className="profile-stats">
            <div>
              <strong>{plan.length}</strong>
              <span>Вправ у плані</span>
            </div>

            <div>
              <strong>{schedules.length}</strong>
              <span>Заплановано</span>
            </div>

            <div>
              <strong>{completedWorkouts.length}</strong>
              <span>Завершено</span>
            </div>

            <div>
              <strong>{totalMinutes}</strong>
              <span>Хвилин тренувань</span>
            </div>
          </div>

          <div className="profile-actions">
            <Link to="/plan">
              <button>Мій план</button>
            </Link>

            <Link to="/workout">
              <button>Тренування</button>
            </Link>

            <Link to="/stats">
              <button>Статистика</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="details-card profile-progress-card">
        <h2>Моя ціль</h2>

        <p>
          <strong>Поточна ціль:</strong> {profile.goal}
        </p>

        <div className="progress-bar-wrapper">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <strong>{progress}%</strong>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => updateProgress(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Profile;