import React from 'react';
import { CATEGORIES } from '../interfaces/questionModel';

/**
 * CategoryFilter component renders a row of interactive filter pills/tabs
 * with question count badges to filter questions by category.
 */
export default function CategoryFilter({ selectedCategory, onSelectCategory, categoryCounts = {} }) {
  return (
    <div className="d-flex flex-wrap gap-2 mb-4 align-items-center">
      {/* "Hepsi" Filter Tab */}
      <button
        type="button"
        className={`filter-tab d-flex align-items-center gap-2 ${selectedCategory === '' ? 'active' : ''}`}
        onClick={() => onSelectCategory('')}
      >
        <span>Hepsi</span>
        <span className="badge rounded-pill count-badge" style={{ fontSize: '0.75rem' }}>
          {categoryCounts['All'] || 0}
        </span>
      </button>

      {/* Dynamic Category Filter Tabs */}
      {CATEGORIES.map((category) => {
        const count = categoryCounts[category] || 0;
        return (
          <button
            key={category}
            type="button"
            className={`filter-tab d-flex align-items-center gap-2 ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            <span>{category}</span>
            <span className="badge rounded-pill count-badge" style={{ fontSize: '0.75rem' }}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
