import { Link } from "react-router-dom";

function Tutorials() {
  const tutorials = [
    {
      id: "bridge",
      title: "Місток",
      image: "/exercises/bridge.png",
      description: "Навчання містку через гнучкість спини, плечей і грудного відділу.",
      level: "Просунутий",
    },
    {
      id: "front-split",
      title: "Поздовжній шпагат",
      image: "/exercises/front-split.png",
      description: "Поступова підготовка до поздовжнього шпагату.",
      level: "Просунутий",
    },
    {
      id: "middle-split",
      title: "Поперечний шпагат",
      image: "/exercises/middle-split.png",
      description: "Розкриття тазостегнових суглобів для поперечного шпагату.",
      level: "Просунутий",
    },
    {
      id: "elbow-stand",
      title: "Стійка на ліктях",
      image: "/exercises/elbow-stand-wall.png",
      description: "Підготовка плечей, корпусу та балансу.",
      level: "Середній",
    },
    {
      id: "handstand",
      title: "Стійка на руках",
      image: "/exercises/handstand-wall.png",
      description: "Навчання стійці на руках біля стіни.",
      level: "Просунутий",
    },
    {
      id: "cartwheel",
      title: "Колесо",
      image: "/exercises/cartwheel.png",
      description: "Базовий гімнастичний елемент із перенесенням ваги через руки.",
      level: "Просунутий",
    },
  ];

  return (
    <div>
      <h1>Навчання елементів</h1>

      <div className="exercise-list">
        {tutorials.map((item) => (
          <div className="exercise-card" key={item.id}>
            <div className="tutorial-image-box">
              <img src={item.image} alt={item.title} />
            </div>

            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>
              <strong>Рівень:</strong> {item.level}
            </p>

            <Link to={`/tutorials/${item.id}`}>
              <button>Відкрити навчання</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tutorials;