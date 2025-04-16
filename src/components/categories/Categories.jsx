import { Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "../../context/TranslationContext";
import "./Categories.css"

export default function Categories({ onCategorySelect, selectedCategory }) {
  const { t } = useTranslation();

  const categories = [
    { id: 1, name: "fiction", icon: "📚", color: "#ff7e5f" },
    { id: 2, name: "nonFiction", icon: "📖", color: "#feb47b" },
    { id: 3, name: "science", icon: "🔬", color: "#6a3de8" },
    { id: 4, name: "history", icon: "🏛️", color: "#4fd1c5" },
    { id: 5, name: "biography", icon: "👤", color: "#f6e05e" },
    { id: 6, name: "children", icon: "🧸", color: "#fc8181" },
  ];

  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      // If clicking the already selected category, clear the filter
      onCategorySelect(null);
    } else {
      onCategorySelect(categoryName);
    }
  };

  return (
    <div className="categories-section my-5">
      <h2 className="section-title mb-4">{t("popularCategories")}</h2>
      <Row xs={2} md={3} lg={6} className="g-4">
        {categories.map((category) => (
          <Col key={category.id}>
            <Card
              className={`category-card h-100 text-center ${
                selectedCategory === category.name ? "selected-category" : ""
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <Card.Body>
                <div
                  className="category-icon mb-3"
                  style={{
                    backgroundColor: `${category.color}20`,
                    color: category.color,
                  }}
                >
                  <span>{category.icon}</span>
                </div>
                <Card.Title className="category-title">
                  {t(category.name)}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
