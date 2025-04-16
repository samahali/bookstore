import { useState } from "react";
import { Card, Row, Col, ProgressBar, Button } from "react-bootstrap";
import { Eye } from "react-bootstrap-icons";
import { useTranslation } from "../../context/TranslationContext";
import "./ReadingList.css"

export default function ReadingList({
  books,
  updateProgress,
  viewBookDetails,
}) {
  const { language, t, translateBookTitle, translateAuthor } = useTranslation();
  const [expandedBook, setExpandedBook] = useState(null);

  const handleProgressChange = (bookId, newProgress) => {
    // Ensure progress is between 0 and 100
    const clampedProgress = Math.min(100, Math.max(0, newProgress));
    updateProgress(bookId, clampedProgress);
  };

  const toggleExpand = (bookId) => {
    setExpandedBook(expandedBook === bookId ? null : bookId);
  };

  if (!books || books.length === 0) {
    return null;
  }

  return (
    <div className="reading-list-section my-5">
      <h2 className="section-title mb-4">{t("yourReadingList")}</h2>
      <Row xs={1} className="g-4">
        {books.map((book) => {
          const title =
            language === "en"
              ? book.title
              : translateBookTitle(book.title, { translation: book.titleAr });
          const author =
            language === "en"
              ? book.author
              : translateAuthor(book.author, { translation: book.authorAr });

          return (
            <Col key={book.id}>
              <Card
                className={`reading-list-card ${
                  expandedBook === book.id ? "expanded" : ""
                }`}
              >
                <Card.Body>
                  <div className="d-flex">
                    <div className="reading-list-image me-3">
                      <img
                        src={book.image || "/placeholder.svg"}
                        alt={title}
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="reading-list-content flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="reading-list-title">{title}</h5>
                          <p className="reading-list-author">{author}</p>
                        </div>
                        <div className="d-flex">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="me-2"
                            onClick={() => viewBookDetails(book.id)}
                          >
                            <Eye size={16} />
                          </Button>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => toggleExpand(book.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                            </svg>
                          </Button>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="d-flex justify-content-between mb-1">
                          <small>{t("readingProgress")}</small>
                          <small>{book.progress}%</small>
                        </div>
                        <ProgressBar
                          now={book.progress}
                          variant={
                            book.progress === 100 ? "success" : "primary"
                          }
                          className="reading-progress-bar"
                        />
                      </div>

                      {expandedBook === book.id && (
                        <div className="reading-progress-controls mt-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="reading-stats">
                              <small>
                                {t("pagesRead")}:{" "}
                                {Math.round(
                                  book.totalPages * (book.progress / 100)
                                )}{" "}
                                / {book.totalPages}
                              </small>
                            </div>
                            <div className="progress-buttons">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() =>
                                  handleProgressChange(
                                    book.id,
                                    book.progress - 10
                                  )
                                }
                                disabled={book.progress <= 0}
                              >
                                -10%
                              </Button>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                className="ms-2"
                                onClick={() =>
                                  handleProgressChange(
                                    book.id,
                                    book.progress + 10
                                  )
                                }
                                disabled={book.progress >= 100}
                              >
                                +10%
                              </Button>
                              <Button
                                variant="success"
                                size="sm"
                                className="ms-2"
                                onClick={() =>
                                  handleProgressChange(book.id, 100)
                                }
                                disabled={book.progress === 100}
                              >
                                {t("markAsComplete")}
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
