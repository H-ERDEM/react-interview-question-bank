import React, { useRef } from 'react';

/**
 * QuestionControls component renders the search input, difficulty filters,
 * favorites filter, sorting options, and JSON import/export buttons.
 */
export default function QuestionControls({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  showOnlyFavorites,
  onShowOnlyFavoritesChange,
  difficultyFilter,
  onDifficultyFilterChange,
  onExport,
  onImport
}) {
  const fileInputRef = useRef(null);

  // Trigger JSON file input click
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle JSON file selection and reading
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (Array.isArray(importedData)) {
          onImport(importedData);
          // Reset file input so same file can be selected again
          e.target.value = '';
        } else {
          alert('Hata: Geçersiz yedek dosyası. Dosya içeriği soru listesi olmalıdır.');
        }
      } catch (err) {
        alert('Hata: JSON dosyası okunamadı veya biçimi bozuk.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="controls-panel mb-4 animate-fade-in" style={{ animationDelay: '0.15s' }}>
      <div className="row g-3 align-items-center">
        {/* Search Input Column */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="search-wrapper">
            <i className="bi bi-search text-secondary"></i>
            <input
              type="text"
              className="form-control"
              placeholder="Soru veya cevap ara..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Soru veya cevap ara"
            />
          </div>
        </div>

        {/* Difficulty Select Column */}
        <div className="col-6 col-md-3 col-lg-2">
          <select
            className="form-select"
            value={difficultyFilter}
            onChange={(e) => onDifficultyFilterChange(e.target.value)}
            aria-label="Zorluk Filtresi"
          >
            <option value="">Zorluk: Tümü</option>
            <option value="Kolay">Zorluk: Kolay</option>
            <option value="Orta">Zorluk: Orta</option>
            <option value="Zor">Zorluk: Zor</option>
          </select>
        </div>

        {/* Sort Select Column */}
        <div className="col-6 col-md-3 col-lg-2">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sıralama ölçütü"
          >
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
            <option value="difficulty-desc">{"Zorluk (Zor -> Kolay)"}</option>
            <option value="difficulty-asc">{"Zorluk (Kolay -> Zor)"}</option>
          </select>
        </div>

        {/* Favorites Filter Column */}
        <div className="col-6 col-md-4 col-lg-2">
          <button
            type="button"
            className={`btn btn-filter-favorite w-100 d-flex align-items-center justify-content-center gap-2 ${showOnlyFavorites ? 'active' : ''}`}
            onClick={() => onShowOnlyFavoritesChange(!showOnlyFavorites)}
            title="Sadece favorileri listele"
          >
            <i className={`bi bi-star${showOnlyFavorites ? '-fill' : ''}`}></i>
            <span>Favoriler</span>
          </button>
        </div>

        {/* Export / Import Buttons Column */}
        <div className="col-6 col-md-8 col-lg-2 d-flex gap-2 justify-content-end">
          {/* Export Button */}
          <button
            type="button"
            className="btn btn-glass-secondary d-flex align-items-center justify-content-center p-2 flex-grow-1"
            onClick={onExport}
            title="Soruları yedekle (JSON)"
            aria-label="Dışa Aktar"
          >
            <i className="bi bi-download"></i>
          </button>

          {/* Hidden File Input for Import */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            style={{ display: 'none' }}
          />

          {/* Import Button */}
          <button
            type="button"
            className="btn btn-glass-secondary d-flex align-items-center justify-content-center p-2 flex-grow-1"
            onClick={handleImportClick}
            title="Yedeği geri yükle (JSON)"
            aria-label="İçe Aktar"
          >
            <i className="bi bi-upload"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
