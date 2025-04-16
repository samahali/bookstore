import { Button } from "react-bootstrap";
import { useTranslation } from "../../context/TranslationContext";
import "./ReadingMoodSelector.css"

export default function ReadingMoodSelector({ onMoodSelect, selectedMood }) {
  const { t } = useTranslation();

  const moods = [
    { id: "romantic", icon: "💖", color: "#ff6b81" },
    { id: "thoughtful", icon: "🤔", color: "#786fa6" },
    { id: "curious", icon: "🧐", color: "#f19066" },
    { id: "motivated", icon: "💪", color: "#3dc1d3" },
    { id: "reflective", icon: "🌙", color: "#546de5" },
    { id: "whimsical", icon: "🦄", color: "#c44569" },
    { id: "spiritual", icon: "✨", color: "#574b90" },
    { id: "practical", icon: "🔧", color: "#303952" },
    { id: "dystopian", icon: "🏙️", color: "#596275" },
    { id: "cultural", icon: "🌍", color: "#1e3799" },
    { id: "serious", icon: "📚", color: "#6a0572" },
  ];

  const handleMoodClick = (mood) => {
    if (selectedMood === mood) {
      onMoodSelect(null);
    } else {
      onMoodSelect(mood);
    }
  };

  return (
    <div className="mood-selector my-4">
      <h5 className="mb-3">{t("selectYourReadingMood")}</h5>
      <div className="mood-buttons">
        {moods.map((mood) => (
          <Button
            key={mood.id}
            variant={selectedMood === mood.id ? "primary" : "outline-secondary"}
            className="mood-button me-2 mb-2"
            onClick={() => handleMoodClick(mood.id)}
            style={{
              backgroundColor:
                selectedMood === mood.id ? mood.color : "transparent",
              borderColor: mood.color,
              color: selectedMood === mood.id ? "#fff" : mood.color,
            }}
          >
            <span className="mood-icon me-1">{mood.icon}</span>
            {t(mood.id)}
          </Button>
        ))}
      </div>
    </div>
  );
}
