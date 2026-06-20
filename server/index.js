require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = require("./prismaClient");

const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "stretching_secret_key";

const exercises = [
  {
    id: 1,
    title: "Кішка-корова",
    description: "Мʼяка мобілізація хребта для розігріву спини.",
    difficulty: "Початковий",
    duration: 40,
    muscleGroup: "Спина",
    category: "Розтяжка спини",
    image: "/exercises/cat-cow.png",
    steps: [
      "Станьте на коліна та поставте долоні під плечима.",
      "На вдиху прогніть спину вниз і підніміть голову.",
      "На видиху округліть спину вгору та опустіть голову.",
      "Повторюйте рух повільно та контрольовано.",
    ],
    mistakes: [
      "Не робіть рух різко.",
      "Не перенапружуйте шию.",
      "Не прогинайте поперек через біль.",
    ],
  },
  {
    id: 2,
    title: "Поза дитини",
    description: "Розслаблює поперек, плечі та шию.",
    difficulty: "Початковий",
    duration: 45,
    muscleGroup: "Спина",
    category: "Розтяжка спини",
    image: "/exercises/child-pose.png",
    steps: [
      "Сядьте на пʼяти.",
      "Нахиліться вперед і витягніть руки перед собою.",
      "Опустіть грудну клітку до підлоги.",
      "Дихайте спокійно та розслабляйте спину.",
    ],
    mistakes: [
      "Не затримуйте дихання.",
      "Не напружуйте плечі.",
      "Не тисніть корпусом через біль.",
    ],
  },
  {
    id: 3,
    title: "Скручування лежачи",
    description: "Допомагає зняти напругу в попереку.",
    difficulty: "Початковий",
    duration: 40,
    muscleGroup: "Спина",
    category: "Розтяжка спини",
    image: "/exercises/spinal-twist.png",
    steps: [
      "Ляжте на спину.",
      "Зігніть одну ногу та переведіть її через корпус.",
      "Плечі залишайте на підлозі.",
      "Утримуйте положення та спокійно дихайте.",
    ],
    mistakes: [
      "Не відривайте плечі від підлоги.",
      "Не робіть різких скручувань.",
      "Не тягніть коліно силою.",
    ],
  },
  {
    id: 4,
    title: "Підготовка до містка",
    description: "Розкриває грудний відділ, плечі та спину.",
    difficulty: "Середній",
    duration: 50,
    muscleGroup: "Спина",
    category: "Місток",
    image: "/exercises/bridge-prep.png",
    steps: [
      "Ляжте на спину та зігніть ноги.",
      "Поставте долоні біля плечей.",
      "Плавно підніміть таз і грудну клітку.",
      "Утримуйте положення без різкого прогину.",
    ],
    mistakes: [
      "Не переносіть усе навантаження на поперек.",
      "Не розводьте коліна занадто широко.",
      "Не виконуйте без розминки.",
    ],
  },
  {
    id: 5,
    title: "Місток",
    description: "Гімнастичний елемент для розвитку гнучкості спини та плечей.",
    difficulty: "Просунутий",
    duration: 30,
    muscleGroup: "Спина",
    category: "Місток",
    image: "/exercises/bridge.png",
    steps: [
      "Ляжте на спину, зігніть ноги.",
      "Поставте долоні біля голови пальцями до плечей.",
      "Підніміть корпус угору.",
      "Випрямляйте руки поступово та контролюйте дихання.",
    ],
    mistakes: [
      "Не робіть місток без розігріву.",
      "Не стискайте шию.",
      "Не терпіть біль у попереку.",
    ],
  },
  {
    id: 6,
    title: "Низький випад",
    description: "Розтягує згиначі стегна та готує до поздовжнього шпагату.",
    difficulty: "Початковий",
    duration: 45,
    muscleGroup: "Ноги",
    category: "Поздовжній шпагат",
    image: "/exercises/low-lunge.png",
    steps: [
      "Зробіть широкий крок однією ногою вперед.",
      "Заднє коліно опустіть на підлогу.",
      "Таз мʼяко подайте вперед.",
      "Тримайте спину рівною.",
    ],
    mistakes: [
      "Не завалюйте коліно всередину.",
      "Не прогинайте поперек занадто сильно.",
      "Не пружиньте внизу.",
    ],
  },
  {
    id: 7,
    title: "Півшпагат",
    description: "Розтягує задню поверхню стегна та підколінні сухожилля.",
    difficulty: "Початковий",
    duration: 45,
    muscleGroup: "Ноги",
    category: "Поздовжній шпагат",
    image: "/exercises/half-split.png",
    steps: [
      "Станьте в низький випад.",
      "Випряміть передню ногу.",
      "Нахиліться корпусом до прямої ноги.",
      "Тягніться животом до стегна, а не головою до коліна.",
    ],
    mistakes: [
      "Не округляйте сильно спину.",
      "Не блокуйте коліно через біль.",
      "Не тягніться ривками.",
    ],
  },
  {
    id: 8,
    title: "Випад із розтягуванням",
    description: "Поглиблена вправа для стегон і тазостегнових суглобів.",
    difficulty: "Середній",
    duration: 50,
    muscleGroup: "Ноги",
    category: "Поздовжній шпагат",
    image: "/exercises/lunge-stretch.png",
    steps: [
      "Займіть положення випаду.",
      "Опустіть таз нижче.",
      "Руки поставте на підлогу або на коліно.",
      "Утримуйте позицію без напруження плечей.",
    ],
    mistakes: [
      "Не завалюйте таз убік.",
      "Не переносіть вагу тільки на коліно.",
      "Не робіть вправу через гострий біль.",
    ],
  },
  {
    id: 9,
    title: "Поздовжній шпагат",
    description: "Основний елемент для розвитку глибокої гнучкості ніг.",
    difficulty: "Просунутий",
    duration: 40,
    muscleGroup: "Ноги",
    category: "Поздовжній шпагат",
    image: "/exercises/front-split.png",
    steps: [
      "Вийдіть із положення низького випаду.",
      "Повільно ковзайте передньою ногою вперед.",
      "Задню ногу відводьте назад.",
      "Тримайте таз рівно та не розвертайте корпус.",
    ],
    mistakes: [
      "Не сідайте різко.",
      "Не розвертайте таз убік.",
      "Не тягніться без підготовчих вправ.",
    ],
  },
  {
    id: 10,
    title: "Метелик",
    description: "Розкриває тазостегнові суглоби та внутрішню поверхню стегон.",
    difficulty: "Початковий",
    duration: 45,
    muscleGroup: "Ноги",
    category: "Поперечний шпагат",
    image: "/exercises/butterfly.png",
    steps: [
      "Сядьте на підлогу.",
      "Зʼєднайте стопи разом.",
      "Коліна опускайте до підлоги.",
      "Тримайте спину рівною.",
    ],
    mistakes: [
      "Не тисніть руками на коліна.",
      "Не сутультесь.",
      "Не пружиньте різко.",
    ],
  },
  {
    id: 11,
    title: "Жабка",
    description: "Глибока вправа для підготовки до поперечного шпагату.",
    difficulty: "Середній",
    duration: 50,
    muscleGroup: "Ноги",
    category: "Поперечний шпагат",
    image: "/exercises/frog-stretch.png",
    steps: [
      "Станьте на коліна.",
      "Розведіть коліна в сторони.",
      "Опустіться на передпліччя.",
      "Плавно подавайте таз назад.",
    ],
    mistakes: [
      "Не тисніть на коліна.",
      "Не прогинайте поперек.",
      "Не заходьте одразу в максимальну глибину.",
    ],
  },
  {
    id: 12,
    title: "Бічний випад",
    description: "Розтягує внутрішню поверхню стегна та покращує мобільність.",
    difficulty: "Середній",
    duration: 45,
    muscleGroup: "Ноги",
    category: "Поперечний шпагат",
    image: "/exercises/side-lunge.png",
    steps: [
      "Поставте ноги широко.",
      "Перенесіть вагу на одну ногу.",
      "Іншу ногу залиште прямою.",
      "Повільно змінюйте сторону.",
    ],
    mistakes: [
      "Не відривайте пʼяту опорної ноги.",
      "Не завалюйте корпус вперед.",
      "Не рухайтесь занадто швидко.",
    ],
  },
  {
    id: 13,
    title: "Поперечний шпагат",
    description: "Просунутий елемент для максимальної гнучкості тазу та ніг.",
    difficulty: "Просунутий",
    duration: 40,
    muscleGroup: "Ноги",
    category: "Поперечний шпагат",
    image: "/exercises/middle-split.png",
    steps: [
      "Поставте ноги широко.",
      "Повільно розводьте ноги в сторони.",
      "Контролюйте положення тазу.",
      "Опускайтесь тільки до комфортної глибини.",
    ],
    mistakes: [
      "Не сідайте різко.",
      "Не розвертайте стопи неконтрольовано.",
      "Не виконуйте без розігріву.",
    ],
  },
  {
    id: 14,
    title: "Розтягування плечей",
    description: "Покращує рухливість плечових суглобів.",
    difficulty: "Початковий",
    duration: 35,
    muscleGroup: "Плечі",
    category: "Плечі та грудний відділ",
    image: "/exercises/shoulder-stretch.png",
    steps: [
      "Витягніть одну руку перед собою.",
      "Іншою рукою притягніть її до грудей.",
      "Плечі тримайте опущеними.",
      "Повторіть на іншу сторону.",
    ],
    mistakes: [
      "Не піднімайте плечі до вух.",
      "Не тягніть руку ривками.",
      "Не скручуйте корпус.",
    ],
  },
  {
    id: 15,
    title: "Розкриття грудного відділу",
    description: "Покращує поставу та мобільність верхньої частини тіла.",
    difficulty: "Середній",
    duration: 40,
    muscleGroup: "Плечі",
    category: "Плечі та грудний відділ",
    image: "/exercises/chest-opening.png",
    steps: [
      "Станьте рівно або сядьте.",
      "Відведіть руки назад.",
      "Розкрийте грудну клітку.",
      "Дихайте повільно та не закидайте голову.",
    ],
    mistakes: [
      "Не прогинайте поперек занадто сильно.",
      "Не затискайте шию.",
      "Не піднімайте плечі.",
    ],
  },
  {
    id: 16,
    title: "Планка",
    description: "Зміцнює корпус для підготовки до гімнастичних елементів.",
    difficulty: "Початковий",
    duration: 40,
    muscleGroup: "Корпус",
    category: "Гімнастичні елементи",
    image: "/exercises/plank.png",
    steps: [
      "Поставте передпліччя або долоні на підлогу.",
      "Витягніть тіло в одну лінію.",
      "Напружте прес і сідниці.",
      "Утримуйте положення без провисання тазу.",
    ],
    mistakes: [
      "Не опускайте таз.",
      "Не піднімайте таз занадто високо.",
      "Не затримуйте дихання.",
    ],
  },
  {
    id: 17,
    title: "Дельфін",
    description: "Підготовча вправа до стійки на ліктях.",
    difficulty: "Середній",
    duration: 40,
    muscleGroup: "Плечі",
    category: "Стійка на ліктях",
    image: "/exercises/dolphin-pose.png",
    steps: [
      "Станьте на передпліччя.",
      "Підніміть таз угору.",
      "Пʼяти тягніть до підлоги.",
      "Плечі тримайте активними.",
    ],
    mistakes: [
      "Не провалюйтеся в плечах.",
      "Не переносіть вагу на шию.",
      "Не згинайте спину неконтрольовано.",
    ],
  },
  {
    id: 18,
    title: "Стійка на ліктях біля стіни",
    description: "Безпечне навчання балансу в стійці на ліктях.",
    difficulty: "Середній",
    duration: 30,
    muscleGroup: "Плечі",
    category: "Стійка на ліктях",
    image: "/exercises/elbow-stand-wall.png",
    steps: [
      "Поставте передпліччя на підлогу біля стіни.",
      "Підніміть таз угору.",
      "Обережно підніміть ноги на стіну.",
      "Тримайте корпус напруженим.",
    ],
    mistakes: [
      "Не переносіть вагу на голову.",
      "Не розслабляйте плечі.",
      "Не виконуйте без мʼякої поверхні.",
    ],
  },
  {
    id: 19,
    title: "Стійка на руках біля стіни",
    description: "Підготовка до стійки на руках із підтримкою.",
    difficulty: "Просунутий",
    duration: 30,
    muscleGroup: "Плечі",
    category: "Стійка на руках",
    image: "/exercises/handstand-wall.png",
    steps: [
      "Поставте долоні на підлогу біля стіни.",
      "Підніміть одну ногу вгору.",
      "Обережно вийдіть у стійку.",
      "Тримайте корпус сильним і рівним.",
    ],
    mistakes: [
      "Не прогинайте поперек.",
      "Не згинайте лікті.",
      "Не тренуйте без розігріву запʼясть.",
    ],
  },
  {
    id: 20,
    title: "Колесо",
    description: "Базовий гімнастичний елемент із перенесенням ваги через руки.",
    difficulty: "Просунутий",
    duration: 30,
    muscleGroup: "Все тіло",
    category: "Гімнастичні елементи",
    image: "/exercises/cartwheel.png",
    steps: [
      "Станьте боком у напрямку руху.",
      "Поставте першу руку на підлогу.",
      "Перенесіть вагу через руки.",
      "Перекиньте ноги через верх і вийдіть у випад.",
    ],
    mistakes: [
      "Не згинайте руки під час опори.",
      "Не опускайте голову занадто низько.",
      "Не виконуйте на твердій поверхні без підготовки.",
    ],
  },

];

app.get("/", (req, res) => {
  res.send("Stretching Planner API is running");
});

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Користувач уже існує" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.json({
      message: "Реєстрація успішна",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        level: user.level,
        goal: user.goal,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "Невірний email або пароль" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Невірний email або пароль" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Вхід успішний",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        level: user.level,
        goal: user.goal,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера" });
  }
});

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Немає токена" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: "Недійсний токен" });
  }
};

app.get("/api/me", authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: {
      id: true,
      name: true,
      email: true,
      level: true,
      goal: true,
      createdAt: true,
    },
  });

  res.json(user);
});

app.put("/api/profile", authMiddleware, async (req, res) => {
  const { name, level, goal } = req.body;

  const user = await prisma.user.update({
    where: { id: req.userId },
    data: { name, level, goal },
    select: {
      id: true,
      name: true,
      email: true,
      level: true,
      goal: true,
      createdAt: true,
    },
  });

  res.json(user);
});
app.get("/api/exercises", (req, res) => {
  res.json(exercises);
});

app.get("/api/exercises/:id", (req, res) => {
  const id = Number(req.params.id);

  const exercise = exercises.find((item) => item.id === id);

  if (!exercise) {
    return res.status(404).json({ message: "Вправу не знайдено" });
  }

  res.json(exercise);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});