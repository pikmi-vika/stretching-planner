import { useState } from "react";

function Videos() {
  const videos = [
    {
      title: "How to do a Split Fast!",
      category: "Поздовжній шпагат",
      keywords: ["шпагат", "поздовжній", "поздовжній шпагат", "розтяжка", "ноги", "split"],
      videoId: "Ulnw1WRubX0",
    },
    {
      title: "15 MIN STRETCH FOR SPLITS",
      category: "Поздовжній шпагат",
      keywords: ["шпагат", "поздовжній", "розтяжка ніг", "split", "stretching"],
      videoId: "SdltgVDEPmM",
    },
    {
      title: "8 MIN STRETCH FOR SPLITS",
      category: "Поздовжній шпагат",
      keywords: ["шпагат", "поздовжній", "розтяжка", "гнучкість", "split"],
      videoId: "GVZZi-Gth_M",
    },
    {
      title: "Yoga for Splits",
      category: "Поздовжній шпагат",
      keywords: ["йога", "шпагат", "поздовжній", "розтяжка", "split"],
      videoId: "wVnC31PP8wk",
    },
    {
      title: "Front Splits Routine",
      category: "Поздовжній шпагат",
      keywords: ["front split", "поздовжній шпагат", "шпагат", "розтяжка"],
      videoId: "oxx7gdBBQs0",
    },

    {
      title: "Get the Middle Splits Fast!",
      category: "Поперечний шпагат",
      keywords: ["поперечний", "поперечний шпагат", "шпагат", "middle split", "розтяжка"],
      videoId: "NFJKVOJdMR4",
    },
    {
      title: "Stretches for Splits & Middle Splits",
      category: "Поперечний шпагат",
      keywords: ["поперечний", "middle split", "шпагат", "розтяжка", "таз"],
      videoId: "NgmwNtweWAE",
    },
    {
      title: "Get Your Middle Splits",
      category: "Поперечний шпагат",
      keywords: ["поперечний шпагат", "middle splits", "розтяжка", "ноги"],
      videoId: "by1FWSfkJIk",
    },
    {
      title: "Middle Split Tutorial",
      category: "Поперечний шпагат",
      keywords: ["middle split", "поперечний", "шпагат", "розтяжка"],
      videoId: "zCi7trpTYmg",
    },

    {
      title: "Bridge Flexibility Routine",
      category: "Місток",
      keywords: ["місток", "гімнастичний місток", "спина", "гнучкість спини", "backbend"],
      videoId: "9ROQ5lcynZQ",
    },
    {
      title: "Bridge Tutorial Gymnastics",
      category: "Місток",
      keywords: ["місток", "bridge", "backbend", "гімнастика", "спина"],
      videoId: "TlAXQhtYtRU",
    },

    {
      title: "Back Flexibility Routine",
      category: "Розтяжка спини",
      keywords: ["спина", "розтяжка спини", "гнучкість спини", "back flexibility", "хребет"],
      videoId: "9ROQ5lcynZQ",
    },

    {
      title: "Handstand Tutorial",
      category: "Стійка на руках",
      keywords: ["стійка", "стійка на руках", "handstand", "баланс", "руки"],
      videoId: "F3EH9pxNSGs",
    },
  ];

  const [category, setCategory] = useState("Усі");
  const [search, setSearch] = useState("");

  const filteredVideos = videos.filter((video) => {
    const searchText = search.toLowerCase().trim();

    const matchesCategory = category === "Усі" || video.category === category;

    const matchesSearch =
      searchText === "" ||
      video.title.toLowerCase().includes(searchText) ||
      video.category.toLowerCase().includes(searchText) ||
      video.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchText)
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <h1>Відеоуроки</h1>

      <div className="video-hero">
        <h2>Навчайся техніці правильно</h2>
        <p>
          Добірка відеоуроків для шпагату, містка, розтяжки спини та
          гімнастичних елементів. Шукай українською або англійською.
        </p>
      </div>

      <div className="video-controls">
        <input
          type="text"
          placeholder="Пошук: шпагат, місток, спина, стійка..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Усі</option>
          <option>Поздовжній шпагат</option>
          <option>Поперечний шпагат</option>
          <option>Місток</option>
          <option>Розтяжка спини</option>
          <option>Стійка на руках</option>
        </select>
      </div>

      <p className="video-count">Знайдено відео: {filteredVideos.length}</p>

      <div className="video-grid">
        {filteredVideos.length === 0 ? (
          <div className="details-card">
            <h2>Нічого не знайдено</h2>
            <p>Спробуйте: шпагат, місток, спина, стійка, split або handstand.</p>
          </div>
        ) : (
          filteredVideos.map((video) => (
            <div className="video-card" key={`${video.videoId}-${video.title}`}>
              <div className="video-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  allowFullScreen
                />
              </div>

              <div className="video-info">
                <span>{video.category}</span>
                <h2>{video.title}</h2>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Videos;