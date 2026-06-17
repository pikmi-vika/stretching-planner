function ExerciseAnimation({ type }) {
  const animations = {
    back: {
      icon: "🧘‍♀️",
      title: "Мʼяке розтягування спини",
      className: "anim-back",
    },
    bridge: {
      icon: "🤸‍♀️",
      title: "Підготовка до містка",
      className: "anim-bridge",
    },
    frontSplit: {
      icon: "🩰",
      title: "Поздовжній шпагат",
      className: "anim-front-split",
    },
    middleSplit: {
      icon: "🤸",
      title: "Поперечний шпагат",
      className: "anim-middle-split",
    },
    shoulders: {
      icon: "🙆‍♀️",
      title: "Розкриття плечей",
      className: "anim-shoulders",
    },
    elbowStand: {
      icon: "🤸‍♀️",
      title: "Стійка на ліктях",
      className: "anim-elbow",
    },
    handstand: {
      icon: "🤸",
      title: "Стійка на руках",
      className: "anim-handstand",
    },
    cartwheel: {
      icon: "🤸‍♂️",
      title: "Колесо",
      className: "anim-cartwheel",
    },
  };

  const current = animations[type] || animations.back;

  return (
    <div className={`nice-animation ${current.className}`}>
      <div className="animation-circle">
        <span>{current.icon}</span>
      </div>

      <p>{current.title}</p>
    </div>
  );
}

export default ExerciseAnimation;