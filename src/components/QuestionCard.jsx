import React, { useState } from 'react';

/**
 * QuestionCard component renders a single question with category, difficulty, and status badges.
 * It also supports toggling details to show the answer (rendering basic markdown/code blocks)
 * and triggering edit/delete callbacks.
 */
export default function QuestionCard({ question, onEdit, onDelete, onToggleFavorite }) {
  const [isExpanded, setIsExpanded] = useState(false);

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

  // Helper: Get classes based on status
  const getStatusClass = (status) => {
    switch (status) {
      case 'Çalışılacak': return 'status-todo';
      case 'Öğreniliyor': return 'status-learning';
      case 'Tekrar Edilecek': return 'status-retry';
      case 'Tamamlandı': return 'status-done';
      default: return '';
    }
  };

  // Helper: Get border class based on status
  const getBorderClass = (status) => {
    switch (status) {
      case 'Çalışılacak': return 'border-todo';
      case 'Öğreniliyor': return 'border-learning';
      case 'Tekrar Edilecek': return 'border-retry';
      case 'Tamamlandı': return 'border-done';
      default: return '';
    }
  };

  // Helper: Get glow class based on category for card hover glow effect
  const getGlowClass = (category) => {
    switch (category) {
      case 'JavaScript': return 'card-glow-js';
      case 'React': return 'card-glow-react';
      case 'SQL': return 'card-glow-sql';
      case 'AI': return 'card-glow-ai';
      default: return 'card-glow-genel';
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

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div 
      className={`glass-panel question-card-wrapper mb-3 ${getBorderClass(question.status)} ${getGlowClass(question.category)} overflow-hidden animate-fade-in`}
      style={{ animationDelay: '0.1s' }}
    >
      <div 
        className="p-4 cursor-pointer d-flex flex-column gap-3"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: 'pointer' }}
      >
        {/* Header: Title and Chevron */}
        <div className="d-flex justify-content-between align-items-start gap-2">
          <div className="d-flex align-items-start gap-2">
            <button
              type="button"
              className={`btn-favorite mt-1 ${question.isFavorite ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(question.id);
              }}
              title={question.isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
              aria-label="Favori"
            >
              <i className={`bi bi-star${question.isFavorite ? '-fill' : ''}`}></i>
            </button>
            <h5 className="mb-0 text-white fw-semibold lh-base" style={{ fontSize: '1.1rem' }}>
              {question.title}
            </h5>
          </div>
          <span className="text-secondary fs-5 ms-2">
            <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'} transition-smooth`}></i>
          </span>
        </div>

        {/* Badges and info row */}
        <div className="d-flex flex-wrap align-items-center gap-2 justify-content-between">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            {/* Category */}
            <span className={`badge badge-category ${getCategoryClass(question.category)}`}>
              <i className="bi bi-tag-fill me-1"></i>
              {question.category}
            </span>

            {/* Difficulty */}
            <span className={`badge badge-difficulty ${getDifficultyClass(question.difficulty)}`}>
              <i className="bi bi-speedometer2 me-1"></i>
              {question.difficulty}
            </span>

            {/* Status */}
            <span className={`badge badge-status ${getStatusClass(question.status)}`}>
              <i className="bi bi-circle-fill me-1" style={{ fontSize: '0.5rem', verticalAlign: 'middle' }}></i>
              {question.status}
            </span>

            {/* Tags (Rendered inline inside badges list) */}
            {question.tags && question.tags.length > 0 && question.tags.map(tag => (
              <span key={tag} className="badge-tag d-flex align-items-center gap-1">
                <i className="bi bi-hash"></i>
                {tag}
              </span>
            ))}
          </div>

          {/* Creation Date */}
          <div className="text-muted d-flex align-items-center" style={{ fontSize: '0.75rem' }}>
            <i className="bi bi-calendar3 me-1"></i>
            {formatDate(question.createdAt)}
          </div>
        </div>
      </div>

      {/* Expanded Answer Section */}
      {isExpanded && (
        <div className="answer-details p-4 animate-fade-in">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="text-white fw-bold mb-0" style={{ fontSize: '0.95rem' }}>
              <i className="bi bi-chat-left-text me-2 text-primary"></i>
              Cevap / Notlar:
            </h6>
            
            {/* Actions: Edit & Delete (stopping propagation to prevent accordion toggle) */}
            <div className="d-flex gap-2" onClick={(e) => e.stopPropagation()}>
              <button 
                type="button" 
                className="btn-action-icon btn-edit"
                onClick={() => onEdit(question)}
                title="Düzenle"
                aria-label="Düzenle"
              >
                <i className="bi bi-pencil-square"></i>
              </button>
              <button 
                type="button" 
                className="btn-action-icon btn-delete"
                onClick={() => onDelete(question.id)}
                title="Sil"
                aria-label="Sil"
              >
                <i className="bi bi-trash3-fill"></i>
              </button>
            </div>
          </div>
          
          <div className="answer-text text-secondary lh-lg" style={{ fontSize: '0.95rem' }}>
            {formatAnswer(question.answer)}
          </div>
        </div>
      )}
    </div>
  );
}
