import React, { useState, useEffect, useRef } from 'react';
import { CATEGORIES, DIFFICULTIES, STATUSES, TAGS } from '../interfaces/questionModel';

/**
 * QuestionForm component handles adding and editing mülakat (interview) questions.
 * It uses native validation styled with modern CSS `:user-invalid` selectors
 * and maintains ARIA accessibility standards.
 */
export default function QuestionForm({ onSubmit, editingQuestion, onCancelEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    answer: '',
    category: '',
    difficulty: 'Kolay',
    status: 'Çalışılacak',
    isFavorite: false,
    tags: []
  });

  const formRef = useRef(null);

  // Sync form data if we are editing an existing question
  useEffect(() => {
    if (editingQuestion) {
      setFormData({
        title: editingQuestion.title,
        answer: editingQuestion.answer,
        category: editingQuestion.category,
        difficulty: editingQuestion.difficulty,
        status: editingQuestion.status,
        isFavorite: editingQuestion.isFavorite || false,
        tags: editingQuestion.tags || []
      });
    } else {
      resetForm();
    }
  }, [editingQuestion]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Accessibly clear aria-invalid when the input becomes valid
    if (e.target.checkValidity()) {
      e.target.removeAttribute('aria-invalid');
    }
  };

  // Toggle tag selection
  const handleTagToggle = (tag) => {
    setFormData((prev) => {
      const alreadySelected = prev.tags.includes(tag);
      const nextTags = alreadySelected
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags: nextTags };
    });
  };

  // Sync aria-invalid attribute on blur based on browser validity
  const handleBlur = (e) => {
    const { target } = e;
    if (target.hasAttribute('required')) {
      if (!target.checkValidity()) {
        target.setAttribute('aria-invalid', 'true');
      } else {
        target.removeAttribute('aria-invalid');
      }
    }
  };

  // Reset form inputs
  const resetForm = () => {
    setFormData({
      title: '',
      answer: '',
      category: '',
      difficulty: 'Kolay',
      status: 'Çalışılacak',
      isFavorite: false,
      tags: []
    });
    
    // Clear validation classes manually from all inputs if needed
    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll('.form-control, .form-select');
      inputs.forEach(input => {
        input.removeAttribute('aria-invalid');
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;

    // Check validity of form constraints
    if (!form.checkValidity()) {
      // Sync aria-invalid states for assistive technologies
      const inputs = form.querySelectorAll('[required]');
      inputs.forEach(input => {
        if (!input.checkValidity()) {
          input.setAttribute('aria-invalid', 'true');
        }
      });
      // Focus on the first invalid field
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Call submit handler with updated data
    onSubmit({
      ...formData,
      id: editingQuestion ? editingQuestion.id : undefined,
      createdAt: editingQuestion ? editingQuestion.createdAt : new Date().toISOString()
    });

    resetForm();
  };

  return (
    <div className="glass-panel p-4 mb-4">
      <h4 className="text-white mb-3 fw-bold d-flex align-items-center gap-2">
        <i className={`bi ${editingQuestion ? 'bi-pencil-square text-primary' : 'bi-plus-circle-fill text-success'}`}></i>
        {editingQuestion ? 'Soruyu Güncelle' : 'Yeni Soru Ekle'}
      </h4>
      
      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        {/* Title Field */}
        <div className="mb-3 position-relative">
          <label htmlFor="title" className="form-label text-secondary fw-semibold small">
            Soru Başlığı <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Örn: React state ve prop farkı nedir?"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            minLength={5}
            maxLength={150}
          />
          <div className="invalid-feedback-custom">
            <i className="bi bi-exclamation-triangle-fill"></i> Soru başlığı en az 5 karakter olmalıdır.
          </div>
        </div>

        {/* Category Field */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label text-secondary fw-semibold small">
            Kategori <span className="text-danger">*</span>
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          >
            <option value="" disabled hidden>Seçiniz...</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <div className="invalid-feedback-custom">
            <i className="bi bi-exclamation-triangle-fill"></i> Lütfen bir kategori seçin.
          </div>
        </div>

        {/* Difficulty & Status Row */}
        <div className="row g-2 mb-3">
          {/* Difficulty */}
          <div className="col-6">
            <label htmlFor="difficulty" className="form-label text-secondary fw-semibold small">
              Zorluk Seviyesi
            </label>
            <select
              className="form-select"
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              {DIFFICULTIES.map((diff) => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="col-6">
            <label htmlFor="status" className="form-label text-secondary fw-semibold small">
              Çalışma Durumu
            </label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              {STATUSES.map((stat) => (
                <option key={stat} value={stat}>{stat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Answer / Notes Field */}
        <div className="mb-3">
          <label htmlFor="answer" className="form-label text-secondary fw-semibold small d-flex justify-content-between">
            <span>Cevap / Not Alanı <span className="text-danger">*</span></span>
            <span className="text-muted fw-normal" style={{ fontSize: '0.75rem' }}>Kod bloğu için ``` kullanabilirsiniz</span>
          </label>
          <textarea
            className="form-control"
            id="answer"
            name="answer"
            rows="6"
            placeholder="Sorunun cevabını detaylıca buraya yazın...&#10;Kod eklemek için:&#10;```&#10;const x = 5;&#10;```&#10;kullanabilirsiniz."
            value={formData.answer}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            minLength={10}
          />
          <div className="invalid-feedback-custom">
            <i className="bi bi-exclamation-triangle-fill"></i> Cevap alanı en az 10 karakter olmalıdır.
          </div>
        </div>

        {/* Tags Selection */}
        <div className="mb-3">
          <label className="form-label text-secondary fw-semibold small">Etiketler</label>
          <div className="tag-selector-wrapper">
            {TAGS.map((tag) => {
              const isActive = formData.tags.includes(tag);
              return (
                <span
                  key={tag}
                  className={`tag-selector-pill ${isActive ? 'active' : ''}`}
                  onClick={() => handleTagToggle(tag)}
                  style={{ cursor: 'pointer' }}
                >
                  <i className={`bi bi-${isActive ? 'check-circle-fill' : 'plus'} me-1`}></i>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>

        {/* Favorite Checkbox */}
        <div className="mb-4 form-check">
          <input
            type="checkbox"
            className="form-check-input cursor-pointer"
            id="isFavorite"
            name="isFavorite"
            checked={formData.isFavorite}
            onChange={handleChange}
            style={{ cursor: 'pointer' }}
          />
          <label className="form-check-label text-secondary small fw-semibold cursor-pointer" htmlFor="isFavorite" style={{ cursor: 'pointer' }}>
            <i className="bi bi-star-fill text-warning me-1"></i> Favorilere Ekle
          </label>
        </div>

        {/* Buttons */}
        <div className="d-flex gap-2 justify-content-end">
          {editingQuestion && (
            <button
              type="button"
              className="btn btn-glass-secondary w-50"
              onClick={() => {
                resetForm();
                onCancelEdit();
              }}
            >
              Vazgeç
            </button>
          )}
          <button
            type="submit"
            className="btn btn-neon flex-grow-1"
          >
            {editingQuestion ? 'Kaydet' : 'Soru Ekle'}
          </button>
        </div>
      </form>
    </div>
  );
}
