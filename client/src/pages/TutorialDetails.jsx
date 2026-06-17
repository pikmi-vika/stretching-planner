import { Link, useParams, useNavigate } from "react-router-dom";

const tutorialData = {
  bridge: {
    title: "Місток",
    image: "/exercises/bridge.png",
    category: "Місток",
    goal: "Навчитися безпечно виконувати місток через розвиток гнучкості спини, плечей і грудного відділу.",
    steps: [
      "Розігрійте спину вправою Кішка-корова.",
      "Виконайте розкриття грудного відділу.",
      "Підготуйте плечі через розтягування.",
      "Спробуйте місток з положення лежачи.",
      "Поступово збільшуйте час утримання пози.",
    ],
    safety: [
      "Не виконувати при болю в попереку.",
      "Не прогинатися різко.",
      "Працювати тільки після розминки.",
    ],
  },

  "front-split": {
    title: "Поздовжній шпагат",
    image: "/exercises/front-split.png",
    category: "Поздовжній шпагат",
    goal: "Розвинути гнучкість задньої поверхні стегна та згиначів стегна.",
    steps: [
      "Почніть з низького випаду.",
      "Додайте півшпагат.",
      "Виконайте випад із розтягуванням.",
      "Поступово опускайтесь нижче.",
      "Утримуйте положення без різкого болю.",
    ],
    safety: [
      "Не пружинити в глибокій позиції.",
      "Не тягнутися через сильний біль.",
      "Тримати таз рівно.",
    ],
  },

  "middle-split": {
    title: "Поперечний шпагат",
    image: "/exercises/middle-split.png",
    category: "Поперечний шпагат",
    goal: "Розкрити тазостегнові суглоби та внутрішню поверхню стегон.",
    steps: [
      "Почніть з вправи Метелик.",
      "Перейдіть до Жабки.",
      "Додайте бічні випади.",
      "Поступово розводьте ноги ширше.",
      "Утримуйте контрольоване положення.",
    ],
    safety: [
      "Не тиснути на коліна.",
      "Не робити різких рухів.",
      "Працювати симетрично.",
    ],
  },

  "elbow-stand": {
    title: "Стійка на ліктях",
    image: "/exercises/elbow-stand-wall.png",
    category: "Стійка на ліктях",
    goal: "Навчитися балансувати на передпліччях із контролем корпусу.",
    steps: [
      "Зміцніть корпус планкою.",
      "Виконайте позу Дельфін.",
      "Спробуйте стійку біля стіни.",
      "Контролюйте положення плечей.",
      "Поступово відходьте від стіни.",
    ],
    safety: [
      "Не переносити вагу на шию.",
      "Тримати плечі активними.",
      "Починати біля стіни.",
    ],
  },

  handstand: {
    title: "Стійка на руках",
    image: "/exercises/handstand-wall.png",
    category: "Стійка на руках",
    goal: "Підготувати плечі, запʼястя та корпус до стійки на руках.",
    steps: [
      "Розігрійте запʼястя.",
      "Виконайте планку.",
      "Потренуйте вихід у стійку біля стіни.",
      "Тримайте корпус напруженим.",
      "Поступово тренуйте баланс.",
    ],
    safety: [
      "Не тренувати без розігріву запʼясть.",
      "Починати біля стіни.",
      "Не прогинати поперек.",
    ],
  },

  cartwheel: {
    title: "Колесо",
    image: "/exercises/cartwheel.png",
    category: "Гімнастичні елементи",
    goal: "Навчитися переносити вагу через руки у бічному напрямку.",
    steps: [
      "Виконайте бічний випад.",
      "Поставте руки на підлогу по черзі.",
      "Перенесіть вагу через руки.",
      "Винесіть ноги через верх.",
      "Завершіть рух у випаді.",
    ],
    safety: [
      "Тренувати на мʼякій поверхні.",
      "Не виконувати без розминки плечей.",
      "Починати з повільного темпу.",
    ],
  },
};

function TutorialDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const tutorial = tutorialData[id];

  if (!tutorial) {
    return <p>Навчання не знайдено.</p>;
  }

  const createPlan = async () => {
    const res = await fetch("https://stretching-planner-api.onrender.com/api/exercises");
    const exercises = await res.json();

    const selected = exercises.filter(
      (exercise) => exercise.category === tutorial.category
    );

    localStorage.setItem("plan", JSON.stringify(selected));

    alert(`План "${tutorial.title}" створено`);
    navigate("/plan");
  };

  return (
    <div className="details-page">
      <Link to="/tutorials" className="back-link">
        ← Назад до навчання
      </Link>

      <div className="details-card">
        <h1>{tutorial.title}</h1>

        <div className="animation-box">
          <img
            src={tutorial.image}
            alt={tutorial.title}
            className="exercise-media"
          />
        </div>

        <h2>Мета</h2>
        <p>{tutorial.goal}</p>

        <h2>Етапи навчання</h2>
        {tutorial.steps.map((step, index) => (
          <p key={index}>
            <strong>{index + 1}.</strong> {step}
          </p>
        ))}

        <h2>Безпека</h2>
        {tutorial.safety.map((item, index) => (
          <p key={index}>• {item}</p>
        ))}

        <button onClick={createPlan}>Створити план навчання</button>
      </div>
    </div>
  );
}

export default TutorialDetails;