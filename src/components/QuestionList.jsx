import React from 'react';
import QuestionCard from './QuestionCard';

/**
 * QuestionList renders a list of QuestionCard elements or presents a clean,
 * detailed empty state message if no questions are present.
 */
export default function QuestionList({ questions, onEdit, onDelete, onToggleFavorite }) {
  if (!questions || questions.length === 0) {
    return (
      <div className="glass-panel empty-state p-5 text-center animate-fade-in">
        <div className="empty-icon text-primary mb-3">
          <i className="bi bi-patch-question-fill" style={{ fontSize: '3.5rem' }}></i>
        </div>
        <h5 className="text-white fw-bold mb-2">Henüz Soru Eklenmemiş</h5>
        <p className="text-secondary mx-auto mb-0" style={{ maxWidth: '350px', fontSize: '0.9rem', lineHeight: '1.6' }}>
          Bu kategoride henüz mülakat sorusu bulunmuyor. Sol taraftaki formu kullanarak ilk soruyu ekleyebilir ya da filtreleri değiştirebilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <div className="question-list">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
