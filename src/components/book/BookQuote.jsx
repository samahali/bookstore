import { useContext, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import TranslationContext from "../../context/TranslationContext";
import "./BookQuote.css";

export default function BookQuote() {
  const { language } = useContext(TranslationContext);
  const [currentQuote, setCurrentQuote] = useState(0);

  // Literary quotes with translations
  const quotes = [
    {
      en: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
      ar: "يعيش القارئ ألف حياة قبل أن يموت، أما من لا يقرأ فلا يعيش سوى حياة واحدة.",
      author: "George R.R. Martin",
      authorAr: "جورج آر. آر. مارتن",
      source: "A Dance with Dragons",
      sourceAr: "رقصة مع التنانين",
    },
    {
      en: "Books are a uniquely portable magic.",
      ar: "الكتب هي سحر فريد قابل للحمل.",
      author: "Stephen King",
      authorAr: "ستيفن كينغ",
      source: "On Writing: A Memoir of the Craft",
      sourceAr: "عن الكتابة: مذكرات الحرفة",
    },
    {
      en: "I have always imagined that Paradise will be a kind of library.",
      ar: "لطالما تخيلت أن الجنة ستكون نوعًا من المكتبة.",
      author: "Jorge Luis Borges",
      authorAr: "خورخي لويس بورخيس",
      source: "Poems of the Gifts",
      sourceAr: "قصائد الهدايا",
    },
    {
      en: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
      ar: "كلما قرأت أكثر، كلما عرفت أشياء أكثر. وكلما تعلمت أكثر، كلما ذهبت إلى أماكن أكثر.",
      author: "Dr. Seuss",
      authorAr: "د. سوس",
      source: "I Can Read With My Eyes Shut!",
      sourceAr: "يمكنني القراءة وعيناي مغلقتان!",
    },
    {
      en: "Reading is to the mind what exercise is to the body.",
      ar: "القراءة للعقل كالرياضة للجسد.",
      author: "Joseph Addison",
      authorAr: "جوزيف أديسون",
      source: "The Tatler, 1709",
      sourceAr: "ذا تاتلر، ١٧٠٩",
    },
    {
      en: "A book is a dream that you hold in your hand.",
      ar: "الكتاب حلم تمسكه بيدك.",
      author: "Neil Gaiman",
      authorAr: "نيل غايمان",
      source: "Literary speech",
      sourceAr: "خطاب أدبي",
    },
    {
      en: "That's the thing about books. They let you travel without moving your feet.",
      ar: "هذا ما يميز الكتب. إنها تتيح لك السفر دون أن تحرك قدميك.",
      author: "Jhumpa Lahiri",
      authorAr: "جومبا لاهيري",
      source: "The Namesake",
      sourceAr: "سميّ",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  const quote = quotes[currentQuote];
  const displayedQuote = language === "en" ? quote.en : quote.ar;
  const displayedAuthor = language === "en" ? quote.author : quote.authorAr;
  const displayedSource = language === "en" ? quote.source : quote.sourceAr;

  return (
    <Card className="quote-card my-4">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{displayedQuote}</p>
          <footer className="blockquote-footer">
            {displayedAuthor}
            {displayedSource && (
              <cite title={displayedSource}> — {displayedSource}</cite>
            )}
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}
