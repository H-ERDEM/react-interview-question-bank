import React, { useState } from 'react';

/**
 * RandomQuestionModal component is a custom glassmorphism modal popup
 * that lets users view a random question, toggle its answer, and pick a new one.
 */
export default function RandomQuestionModal({ question, onClose, onNext }) {
  const [showAnswer, setShowAnswer] = useState(false);

  if (!question) return null;

  // Helper: Get classes based on category
  const getCategoryClass = (category) => {
    switch (category) {
      case 'JavaScript': return 'badge-js';
      case 'React': return 'badge-react';
      case 'SQL': return 'badge-sql';
      case 'AI': return 'badge-ai';
      default: return 'badge-genel';
    }
  };

  // Helper: Get classes based on difficulty
  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case 'Kolay': return 'badge-easy';
      case 'Orta': return 'badge-medium';
      case 'Zor': return 'badge-hard';
      default: return '';
    }
  };

  // Helper: Basic Markdown Parser for inline backticks and triple backtick code blocks
  const formatAnswer = (text) => {
    if (!text) return null;
    
    // Split by triple backticks to identify code blocks
    const parts = text.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const codeWithLang = part.slice(3, -3).trim();
        const lines = codeWithLang.split('\n');
        
        // Check if first line is a language keyword
        const possibleLang = lines[0].toLowerCase();
        const languages = ['javascript', 'js', 'react', 'sql', 'css', 'html', 'python', 'json'];
        
        let code = codeWithLang;
        if (lines.length > 0 && languages.includes(possibleLang)) {
          code = lines.slice(1).join('\n');
        }
        
        return (
          <pre key={index} className="my-3">
            <code className="text-light">{code}</code>
          </pre>
        );
      } else {
        // Highlight inline code `like_this`
        const inlineParts = part.split(/(`[^`\n]+`)/g);
        
        const elements = inlineParts.map((subPart, subIndex) => {
          if (subPart.startsWith('`') && subPart.endsWith('`')) {
            return <code key={subIndex}>{subPart.slice(1, -1)}</code>;
          }
          
          // Replace newlines with <br />
          return subPart.split('\n').map((line, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {line}
              {lineIndex < subPart.split('\n').length - 1 && <br />}
            </React.Fragment>
          ));
        });
        
        return <p key={index} className="mb-2">{elements}</p>;
      }
    });
  };

  const handleNextClick = () => {
    setShowAnswer(false);
    onNext();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content-glass p-4" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-glass">
          <h4 className="text-white mb-0 fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-dice-5 text-primary"></i>
            Kendimi Test Ediyorum
          </h4>
          <button
            type="button"
            className="btn-action-icon"
            onClick={onClose}
            aria-label="Kapat"
            title="Kapat"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body mb-4">
          <div className="d-flex flex-wrap gap-2 mb-3">
            <span className={`badge badge-category ${getCategoryClass(question.category)}`}>
              {question.category}
            </span>
            <span className={`badge badge-difficulty ${getDifficultyClass(question.difficulty)}`}>
              {question.difficulty}
            </span>
            <span className="badge rounded-pill count-badge" style={{ fontSize: '0.75rem' }}>
              Durum: {question.status}
            </span>
          </div>

          <h5 className="text-white fw-semibold lh-base mb-4" style={{ fontSize: '1.25rem' }}>
            {question.title}
          </h5>

          {/* Answer Section */}
          <div className="mt-3">
            {showAnswer ? (
              <div className="answer-details p-3 rounded border border-glass animate-fade-in">
                <h6 className="text-white fw-bold mb-2">
                  <i className="bi bi-chat-left-text me-2 text-primary"></i>
                  Cevap / Notlar:
                </h6>
                <div className="answer-text text-secondary lh-lg" style={{ fontSize: '0.95rem' }}>
                  {formatAnswer(question.answer)}
                </div>
              </div>
            ) : (
              <div 
                className="p-5 text-center text-muted border border-dashed border-glass rounded cursor-pointer"
                onClick={() => setShowAnswer(true)}
                style={{ cursor: 'pointer', borderStyle: 'dashed' }}
              >
                <i className="bi bi-eye-slash-fill fs-2 mb-2 text-secondary"></i>
                <p className="mb-0 small">Cevabı görmek için buraya tıklayın veya aşağıdaki "Cevabı Göster" butonunu kullanın.</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="d-flex gap-2 justify-content-end border-top border-glass pt-3">
          <button
            type="button"
            className="btn btn-glass-secondary"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? 'Cevabı Gizle' : 'Cevabı Göster'}
          </button>
          
          <button
            type="button"
            className="btn btn-neon d-flex align-items-center gap-2"
            onClick={handleNextClick}
          >
            <i className="bi bi-arrow-right-circle"></i>
            <span>Sıradaki Soru</span>
          </button>
        </div>
      </div>
    </div>
  );
}
