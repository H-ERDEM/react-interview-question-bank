import React, { useState, useEffect } from 'react';
import QuestionForm from '../components/QuestionForm';
import QuestionList from '../components/QuestionList';
import CategoryFilter from '../components/CategoryFilter';
import QuestionControls from '../components/QuestionControls';
import RandomQuestionModal from '../components/RandomQuestionModal';
import { INITIAL_QUESTIONS } from '../interfaces/questionModel';

/**
 * Home page is the core of the application.
 * It manages the list state of questions, filters, stats calculations,
 * and coordinates data persistence in LocalStorage.
 */
export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingQuestion, setEditingQuestion] = useState(null);

  // New features state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [showRandomModal, setShowRandomModal] = useState(false);

  // Advanced features state
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState('');

  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('mulakat_soru_bankasi_tema') || 'dark';
  });

  // Sync theme changes with DOM and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mulakat_soru_bankasi_tema', theme);
  }, [theme]);

  // Toggle Theme
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Load questions from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mulakat_soru_bankasi_sorular');
    if (saved) {
      try {
        setQuestions(JSON.parse(saved));
      } catch (e) {
        console.error('LocalStorage verisi okunamadı, varsayılan veriler yükleniyor.', e);
        setQuestions(INITIAL_QUESTIONS);
      }
    } else {
      // First run: Seed the initial 5 questions
      setQuestions(INITIAL_QUESTIONS);
      localStorage.setItem('mulakat_soru_bankasi_sorular', JSON.stringify(INITIAL_QUESTIONS));
    }
  }, []);

  // Save questions to LocalStorage whenever the list updates
  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem('mulakat_soru_bankasi_sorular', JSON.stringify(questions));
    } else {
      // Allow clearing localstorage if user deletes all questions
      localStorage.removeItem('mulakat_soru_bankasi_sorular');
    }
  }, [questions]);

  // CRUD Callback: Add or update question
  const handleAddOrUpdateQuestion = (data) => {
    if (data.id) {
      // Update Mode
      setQuestions((prev) =>
        prev.map((q) => (q.id === data.id ? data : q))
      );
      setEditingQuestion(null);
    } else {
      // Add Mode
      const newQ = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      setQuestions((prev) => [newQ, ...prev]);
    }
  };

  // CRUD Callback: Delete question
  const handleDeleteQuestion = (id) => {
    const isConfirmed = window.confirm('Bu soruyu silmek istediğinizden emin misiniz?');
    if (isConfirmed) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      // If we are deleting the question that is currently being edited, reset edit mode
      if (editingQuestion && editingQuestion.id === id) {
        setEditingQuestion(null);
      }
    }
  };

  // CRUD Callback: Edit question
  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    // Smooth scroll to top for mobile/desktop to make the form visible
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel Edit Mode
  const handleCancelEdit = () => {
    setEditingQuestion(null);
  };

  // Toggle Favorite Status
  const handleToggleFavorite = (id) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, isFavorite: !q.isFavorite } : q))
    );
  };

  // JSON Export Handler
  const handleExportQuestions = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `mulakat_soru_bankasi_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      alert("Dışa aktarım sırasında bir hata oluştu.");
    }
  };

  // JSON Import Handler
  const handleImportQuestions = (importedList) => {
    if (window.confirm(`${importedList.length} adet soruyu listenize eklemek istediğinizden emin misiniz?`)) {
      // Create new unique ids for imported questions to prevent conflicts
      const sanitized = importedList.map(q => ({
        ...q,
        id: q.id && !questions.some(existing => existing.id === q.id) ? q.id : Date.now().toString() + Math.random().toString(36).substr(2, 5),
        createdAt: q.createdAt || new Date().toISOString(),
        status: q.status || 'Çalışılacak',
        difficulty: q.difficulty || 'Kolay',
        category: q.category || 'Genel'
      }));

      setQuestions((prev) => [...sanitized, ...prev]);
    }
  };

  // Open Random Question Modal
  const handleOpenRandomQuiz = () => {
    if (questions.length === 0) {
      alert('Kendinizi test etmek için önce sisteme en az 1 soru eklemelisiniz.');
      return;
    }
    const randomIndex = Math.floor(Math.random() * questions.length);
    setRandomQuestion(questions[randomIndex]);
    setShowRandomModal(true);
  };

  // Switch to next random question inside modal
  const handleNextRandomQuestion = () => {
    if (questions.length <= 1) {
      alert('Sistemde sadece 1 adet soru bulunmaktadır.');
      return;
    }
    let nextQ = randomQuestion;
    // Avoid showing the exact same question consecutively if possible
    while (nextQ.id === randomQuestion.id) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      nextQ = questions[randomIndex];
    }
    setRandomQuestion(nextQ);
  };

  // Filter questions based on selected category, search query, difficulty, and favorites
  const filteredAndSortedQuestions = questions
    .filter((q) => {
      const matchesCategory = !selectedCategory || q.category === selectedCategory;
      const matchesSearch = !searchTerm ||
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = !difficultyFilter || q.difficulty === difficultyFilter;
      const matchesFavorites = !showOnlyFavorites || q.isFavorite;
      return matchesCategory && matchesSearch && matchesDifficulty && matchesFavorites;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      
      // Difficulty sorting
      const diffWeight = { 'Zor': 3, 'Orta': 2, 'Kolay': 1 };
      const weightA = diffWeight[a.difficulty] || 0;
      const weightB = diffWeight[b.difficulty] || 0;
      
      if (sortBy === 'difficulty-desc') {
        return weightB - weightA;
      }
      if (sortBy === 'difficulty-asc') {
        return weightA - weightB;
      }
      return 0;
    });

  // Calculate stats
  const totalQuestions = questions.length;
  const todoCount = questions.filter((q) => q.status === 'Çalışılacak').length;
  const learningCount = questions.filter((q) => q.status === 'Öğreniliyor').length;
  const retryCount = questions.filter((q) => q.status === 'Tekrar Edilecek').length;
  const doneCount = questions.filter((q) => q.status === 'Tamamlandı').length;

  // Calculate category counts for the filter badges
  const categoryCounts = {
    All: totalQuestions
  };
  questions.forEach((q) => {
    if (q.category) {
      categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
    }
  });

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header section with styling */}
      <header className="app-header mb-5">
        <div className="container">
          <div className="row align-items-center g-3">
            <div className="col-10 col-md-11 text-center text-md-start">
              <h1 className="display-4 app-title-glow mb-2">
                <i className="bi bi-journal-code me-2"></i>
                Mülakat Soru Bankası
              </h1>
              <p className="text-secondary mb-0 fs-5 fw-light">
                Yazılım mülakatlarına hazırlanan adaylar için özelleştirilmiş çalışma ve takip portalı.
              </p>
            </div>
            
            {/* Theme Toggle Button Column */}
            <div className="col-2 col-md-1 d-flex justify-content-end align-items-center">
              <button
                type="button"
                className="btn-theme-toggle"
                onClick={handleToggleTheme}
                title={theme === 'dark' ? 'Aydınlık Temaya Geç' : 'Karanlık Temaya Geç'}
                aria-label="Tema Değiştir"
              >
                <i className={`bi bi-${theme === 'dark' ? 'sun-fill text-warning' : 'moon-stars-fill text-primary'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="container flex-grow-1 pb-5">
        {/* Dashboard Statistics & Progress Card */}
        <div className="row mb-5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="col-12">
            <div className="dashboard-card">
              <div className="row align-items-center g-3">
                {/* Stats Panel */}
                <div className="col-12 col-md-8 d-flex justify-content-start gap-2 gap-sm-3 flex-wrap">
                  <div className="text-center px-2" style={{ minWidth: '70px' }}>
                    <div className="stats-number text-primary">{totalQuestions}</div>
                    <div className="stats-label">Toplam</div>
                  </div>
                  <div className="border-start border-glass ps-3 pe-2 text-center" style={{ minWidth: '70px' }}>
                    <div className="stats-number text-info">{todoCount}</div>
                    <div className="stats-label">Çalışacak</div>
                  </div>
                  <div className="border-start border-glass ps-3 pe-2 text-center" style={{ minWidth: '70px' }}>
                    <div className="stats-number" style={{ color: '#c084fc' }}>{learningCount}</div>
                    <div className="stats-label">Öğreniliyor</div>
                  </div>
                  <div className="border-start border-glass ps-3 pe-2 text-center" style={{ minWidth: '70px' }}>
                    <div className="stats-number text-warning">{retryCount}</div>
                    <div className="stats-label">Tekrar</div>
                  </div>
                  <div className="border-start border-glass ps-3 pe-2 text-center" style={{ minWidth: '70px' }}>
                    <div className="stats-number text-success">{doneCount}</div>
                    <div className="stats-label">Bitti</div>
                  </div>
                </div>

                {/* Progress Panel */}
                <div className="col-12 col-md-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-light small fw-bold">
                      <i className="bi bi-award-fill text-warning me-1"></i>
                      {"İlerleme: %" + (totalQuestions > 0 ? Math.round((doneCount / totalQuestions) * 100) : 0)}
                    </span>
                    <span className="text-white-50 small fw-semibold">
                      {doneCount} / {totalQuestions} Bitti
                    </span>
                  </div>
                  <div className="header-progress-container">
                    <div 
                      className="header-progress-bar" 
                      style={{ width: `${totalQuestions > 0 ? (doneCount / totalQuestions) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Left Column: Form & General Info */}
          <div className="col-lg-4 mb-4">
            <QuestionForm
              onSubmit={handleAddOrUpdateQuestion}
              editingQuestion={editingQuestion}
              onCancelEdit={handleCancelEdit}
            />
            
            {/* Helpful panel in left col */}
            <div className="glass-panel p-4 mt-4 d-none d-lg-block animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h5 className="text-white mb-3 fw-semibold">
                <i className="bi bi-lightbulb-fill text-warning me-2"></i>
                Çalışma İpuçları
              </h5>
              <ul className="text-secondary small ps-3 mb-0 lh-lg">
                <li>Sorularınızı durumuna göre (<b>Çalışılacak</b>, <b>Tekrar Edilecek</b>, <b>Tamamlandı</b>) ayırarak ilerlemenizi görün.</li>
                <li>Mülakat cevaplarınızı daha okunabilir kılmak için <code>`kod_satiri`</code> veya üçlü ters tırnak kullanarak kod blokları oluşturabilirsiniz.</li>
                <li>Verileriniz tarayıcınızın <b>LocalStorage</b> alanında saklanır, sayfayı yenileseniz bile kaybolmaz.</li>
              </ul>
            </div>

            {/* Quick Tools Panel */}
            <div className="glass-panel p-4 mt-4 animate-fade-in" style={{ animationDelay: '0.25s' }}>
              <h5 className="text-white mb-3 fw-semibold">
                <i className="bi bi-tools text-primary me-2"></i>
                Çalışma Araçları
              </h5>
              <p className="text-secondary small mb-3">
                Rastgele seçilen sorular ile kendinizi mülakata hazırlayın.
              </p>
              <button 
                type="button" 
                className="btn btn-neon w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={handleOpenRandomQuiz}
              >
                <i className="bi bi-dice-5"></i>
                <span>Kendimi Test Et</span>
              </button>
            </div>
          </div>

          {/* Right Column: Filters and Cards List */}
          <div className="col-lg-8">
            <h4 className="text-white mb-3 fw-bold d-flex align-items-center gap-2">
              <i className="bi bi-filter-square-fill text-primary"></i>
              Soruları Keşfet & Filtrele
            </h4>
            
            {/* Category selection */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categoryCounts={categoryCounts}
            />

            {/* Question controls panel (Search, Sort, Backup) */}
            <QuestionControls
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortBy={sortBy}
              onSortChange={setSortBy}
              showOnlyFavorites={showOnlyFavorites}
              onShowOnlyFavoritesChange={setShowOnlyFavorites}
              difficultyFilter={difficultyFilter}
              onDifficultyFilterChange={setDifficultyFilter}
              onExport={handleExportQuestions}
              onImport={handleImportQuestions}
            />

            {/* List of questions */}
            <QuestionList
              questions={filteredAndSortedQuestions}
              onEdit={handleEditQuestion}
              onDelete={handleDeleteQuestion}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 mt-auto border-top border-glass text-center text-muted small">
        <div className="container">
          Mülakat Soru Bankası &copy; {new Date().getFullYear()} - Yazılım Stajı Frontend Projesi. Vite + React + Bootstrap 5.
        </div>
      </footer>

      {/* Random Question Quiz Modal */}
      {showRandomModal && (
        <RandomQuestionModal
          question={randomQuestion}
          onClose={() => setShowRandomModal(false)}
          onNext={handleNextRandomQuestion}
        />
      )}
    </div>
  );
}
