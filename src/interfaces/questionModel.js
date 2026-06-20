/**
 * @typedef {Object} Question
 * @property {string} id - Benzersiz kimlik
 * @property {string} title - Soru başlığı
 * @property {string} answer - Cevap veya not alanı
 * @property {string} category - JavaScript | React | SQL | AI | Genel
 * @property {string} difficulty - Kolay | Orta | Zor
 * @property {string} status - Çalışılacak | Tekrar Edilecek | Tamamlandı
 * @property {string} createdAt - Oluşturulma tarihi
 */

// Kategori Seçenekleri
export const CATEGORIES = ['JavaScript', 'React', 'SQL', 'AI', 'Genel'];

// Zorluk Seviyeleri
export const DIFFICULTIES = ['Kolay', 'Orta', 'Zor'];

// Çalışma Durumları (Yeni durum 'Öğreniliyor' eklendi)
export const STATUSES = ['Çalışılacak', 'Öğreniliyor', 'Tekrar Edilecek', 'Tamamlandı'];

// Etiket Seçenekleri
export const TAGS = ['frontend', 'backend', 'algoritma', 'veritabanı', 'oop'];

// Başlangıç için 5 Adet Örnek Soru (Etiket ve Favori alanları ile)
export const INITIAL_QUESTIONS = [
  {
    id: '1',
    title: 'JavaScript\'te "Closure" (Kapsama) nedir? Bir örnekle açıklayınız.',
    answer: 'Closure, bir fonksiyonun kendi dışındaki (üst kapsamındaki) değişkenlere, o fonksiyon dış kapsamından çıktıktan sonra bile erişebilmesi durumudur. \n\nÖrnek:\n```javascript\nfunction sayici() {\n  let adet = 0;\n  return function() {\n    adet++;\n    return adet;\n  };\n}\nconst arttir = sayici();\nconsole.log(arttir()); // 1\nconsole.log(arttir()); // 2\n```\nBurada içteki fonksiyon, dıştaki `adet` değişkenini hafızada tutmaya devam eder.',
    category: 'JavaScript',
    difficulty: 'Orta',
    status: 'Tekrar Edilecek',
    isFavorite: true,
    tags: ['frontend', 'algoritma'],
    createdAt: '2026-06-20T00:00:00.000Z'
  },
  {
    id: '2',
    title: 'React\'te "useEffect" Hook\'unun kullanım amaçları nelerdir ve temizleme (cleanup) fonksiyonu ne zaman çalışır?',
    answer: 'useEffect, bileşenin yaşam döngüsündeki yan etkileri (side effects) yönetmek için kullanılır (API çağrıları, event listener tanımlamaları vb.).\n\nTemizleme (cleanup) fonksiyonu:\n1. Bileşen ekrandan kaldırıldığında (unmount).\n2. Efektin bağımlılıkları değişip efekt yeniden tetiklenmeden hemen önce çalışır.\n\nÖrnek:\n```javascript\nuseEffect(() => {\n  const handleResize = () => console.log(window.innerWidth);\n  window.addEventListener(\'resize\', handleResize);\n  return () => {\n    window.removeEventListener(\'resize\', handleResize);\n  };\n}, []);\n```',
    category: 'React',
    difficulty: 'Orta',
    status: 'Tamamlandı',
    isFavorite: false,
    tags: ['frontend'],
    createdAt: '2026-06-20T00:01:00.000Z'
  },
  {
    id: '3',
    title: 'SQL\'de "INNER JOIN" ile "LEFT JOIN" arasındaki temel fark nedir?',
    answer: 'INNER JOIN, her iki tabloda da eşleşen satırları getirir. Eğer bir satırın karşılığı diğer tabloda yoksa, o satır sonuç kümesine dahil edilmez.\n\nLEFT JOIN (veya LEFT OUTER JOIN) ise sol tablodaki tüm satırları getirir. Sağ tabloda eşleşen bir satır yoksa, sağ tablodan gelecek sütunlar "NULL" olarak doldurulur.',
    category: 'SQL',
    difficulty: 'Kolay',
    status: 'Çalışılacak',
    isFavorite: false,
    tags: ['backend', 'veritabanı'],
    createdAt: '2026-06-20T00:02:00.000Z'
  },
  {
    id: '4',
    title: 'Büyük Dil Modellerinde (LLM) "Prompt Engineering" nedir ve "Few-Shot Prompting" tekniği nasıl çalışır?',
    answer: 'Prompt Engineering, yapay zeka modellerinden (LLM) en doğru ve etkili yanıtları alabilmek için girdileri (prompt) tasarlama ve optimize etme sürecidir.\n\nFew-Shot Prompting tekniğinde, modele yapmak istediği göreve dair birkaç örnek (girdi-çıktı çifti) sunulur. Model bu örnekleri görerek kalıbı anlar ve yeni girdiye uygun çıktıyı çok daha başarılı bir şekilde üretir.',
    category: 'AI',
    difficulty: 'Zor',
    status: 'Öğreniliyor',
    isFavorite: true,
    tags: ['backend'],
    createdAt: '2026-06-20T00:03:00.000Z'
  },
  {
    id: '5',
    title: 'RESTful API tasarımında GET, POST, PUT ve DELETE HTTP metotlarının kullanım amaçları nelerdir?',
    answer: 'HTTP metotları sunucudaki kaynaklar üzerinde yapılacak işlemleri (CRUD) temsil eder:\n\n- GET: Sunucudan veri okumak için kullanılır. Güvenli ve idempotent (tekrarlandığında durumu değiştirmeyen) olmalıdır.\n- POST: Sunucuda yeni bir kaynak oluşturmak için kullanılır. Güvenli değildir ve idempotent değildir.\n- PUT: Sunucudaki var olan bir kaynağı tamamen güncellemek (veya yoksa oluşturmak) için kullanılır. Idempotent\'tir.\n- DELETE: Sunucudaki bir kaynağı silmek için kullanılır. Idempotent\'tir.',
    category: 'Genel',
    difficulty: 'Kolay',
    status: 'Tamamlandı',
    isFavorite: false,
    tags: ['backend', 'oop'],
    createdAt: '2026-06-20T00:04:00.000Z'
  }
];
