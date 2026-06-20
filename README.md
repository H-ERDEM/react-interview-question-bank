# 📝 Mülakat Soru Bankası / Interview Question Bank

Language: [Türkçe](#-türkçe) | [English](#-english)

---

## 🇹🇷 Türkçe

Yazılım mülakatlarına hazırlanan adayların farklı kategorilerde (JavaScript, React, SQL, AI, Genel) mülakat soruları ekleyebildiği, listeleyebildiği, güncelleyebildiği, silebildiği (CRUD) ve durum takibi yapabildiği modern ve duyarlı (responsive) bir ReactJS web uygulamasıdır.

### 📸 Ekran Görüntüleri

#### 1. Karanlık Tema Genel Görünüm
![Karanlık Tema Genel Görünüm](img/Screenshot%202026-06-20%20at%2014.46.05.png)

#### 2. Aydınlık Tema Görünümü
![Aydınlık Tema Görünümü](img/Screenshot%202026-06-20%20at%2014.48.00.png)

#### 3. Soru Ekleme ve Düzenleme Arayüzü
![Soru Ekleme ve Düzenleme Arayüzü](img/Screenshot%202026-06-20%20at%2014.48.18.png)

#### 4. Kendimi Test Et (Rastgele Soru Modali)
![Kendimi Test Et - Çalışma Modali](img/Screenshot%202026-06-20%20at%2014.48.29.png)

---

### 🚀 Kullanılan Teknolojiler

*   **React 19 & JavaScript (ES6+)**: Arayüz bileşenlerinin oluşturulması ve durum yönetimi (state management).
*   **Vite**: Hızlı ve modern modül derleyici ve geliştirme sunucusu.
*   **Bootstrap 5 & Bootstrap Icons**: Responsive (mobil uyumlu) ızgara sistemi, bileşenler ve ikon seti.
*   **LocalStorage**: Sayfa yenilense dahi verilerin tarayıcıda kalıcı olarak saklanması.
*   **Vanilla CSS**: Bootstrap'e ek olarak modern cam efekti (glassmorphism), neon gradyanlar ve özel mikro-animasyonlar için özel CSS kuralları.

---

### ✨ Özellikler

*   **Soru Ekleme**: Başlık, cevap, kategori, zorluk seviyesi ve durum bilgilerini içeren form doğrulama destekli yeni soru ekleme.
*   **Soru Listeleme & Detay Görüntüleme**: Kart yapısında listelenen soruların üzerine tıklayarak tırnak işaretli kod blokları içeren cevap detayını açma/kapatma.
*   **Soru Güncelleme (Düzenleme)**: Listelenen herhangi bir soruyu güncellemek için formu otomatik doldurup değişiklikleri kaydetme.
*   **Soru Silme**: Silme işleminde kullanıcıdan onay (confirm) alarak soruyu listeden kaldırma.
*   **Kategoriye Göre Filtreleme**: JavaScript, React, SQL, AI ve Genel kategorilerine ait soru sayılarını gösteren dinamik filtre butonları.
*   **Canlı İstatistik Paneli**: Toplam soru sayısı ve durum bazlı (Çalışılacak, Tekrar Edilecek, Bitti) soruların anlık adetlerini gösteren sayaçlar.
*   **Hazır Veriler (Seed Data)**: Uygulama ilk kez açıldığında kullanıcıyı karşılayan 5 adet kaliteli mülakat sorusu.
*   **Erişilebilirlik (A11y)**: HTML5 form doğrulama kuralları ile entegre `:user-invalid` CSS seçicisi ve `aria-invalid` durum senkronizasyonu.

---

### 📁 Proje Klasör Yapısı

```text
src/
├── components/
│    ├── QuestionForm.jsx       # Soru ekleme ve güncelleme formu (Doğrulamalı)
│    ├── QuestionList.jsx       # Soruların listelendiği ve boş durum mesajı sunan bileşen
│    ├── QuestionCard.jsx       # Soru kartı bileşeni (Detayları ve eylemleri barındırır)
│    └── CategoryFilter.jsx     # Dinamik sayaçlı kategori filtreleme sekmeleri
├── pages/
│    └── Home.jsx               # Ana sayfa bileşeni (State ve LocalStorage yönetimi)
├── interfaces/
│    └── questionModel.js       # Soru modeli tanımları, sabitler ve örnek sorular
├── App.jsx                     # Home bileşenini sarmalayan kök bileşen
├── main.jsx                    # Giriş noktası (Bootstrap ve stillerin import edildiği yer)
├── index.css                   # Global tasarımlar, animasyonlar ve neon stil tanımları
└── App.css                     # Çakışmayı önlemek için temizlenmiş stil dosyası
```

---

### 🛠️ Kurulum ve Lokal Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları sırasıyla uygulayınız:

#### 1. Depoyu Klonlayın veya İndirin
Projeyi bilgisayarınıza indirdikten sonra terminalde proje ana dizinine gidin.

#### 2. Bağımlılıkları Yükleyin
Gerekli kütüphaneleri indirmek için terminale yazın:
```bash
npm install
```

#### 3. Geliştirme Sunucusunu Başlatın
Uygulamayı lokalde çalıştırmak için aşağıdaki komutu girin:
```bash
npm run dev
```
Terminal ekranında görünen adrese (genellikle `http://localhost:5173`) tarayıcınızdan giderek uygulamayı test edebilirsiniz.

#### 4. Yayına Hazır Çıktı Alma (Build)
Netlify veya benzeri platformlara yükleme öncesinde projenin hatasız derlendiğini kontrol etmek için:
```bash
npm run build
```

---

### 🌐 GitHub ve Netlify Yayına Alma Adımları

#### GitHub'a Yükleme Adımları:
1. GitHub profilinizde yeni bir depo (repository) oluşturun.
2. Bilgisayarınızdaki proje klasöründe terminali açıp sırasıyla şu komutları çalıştırın:
   ```bash
   git init
   git add .
   git commit -m "first commit: Mulakat Soru Bankasi Projesi"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADINIZ/DEPO_ADINIZ.git
   git push -u origin main
   ```

#### Netlify'a Yükleme Adımları:
Netlify, Vite projelerini doğrudan GitHub deposu üzerinden veya derlenmiş `dist` klasörüyle kolayca barındırmanızı sağlar:

##### Yöntem A: GitHub ile Sürekli Entegrasyon (Önerilen)
1. [Netlify Panelinde](https://app.netlify.com/) oturum açın ve **"Add new site" -> "Import an existing project"** adımlarını izleyin.
2. Deponuzu barındırdığınız **GitHub** seçeneğini seçip yetki verin ve projenizi seçin.
3. Derleme ayarlarını şu şekilde yapılandırın:
   *   **Branch to deploy**: `main`
   *   **Build command**: `npm run build`
   *   **Publish directory**: `dist`
4. **"Deploy site"** butonuna basarak sitenizin oluşturulmasını sağlayın. Netlify size özel bir URL (`site-adi.netlify.app`) verecektir.

##### Yöntem B: Sürükle-Bırak ile Yayına Alma
1. Terminalde `npm run build` komutunu çalıştırın. Bu işlem proje dizininde bir `dist` klasörü üretecektir.
2. Netlify paneline gidin ve alt kısımdaki **"Deploy manually"** sürükle-bırak alanına sadece bu `dist` klasörünü sürükleyip bırakın. Birkaç saniye içinde siteniz yayına girecektir.

---
---

## 🇺🇸 English

A modern and responsive ReactJS web application designed for candidates preparing for software development interviews. Users can add, list, update, delete (CRUD), and track the status of interview questions across various categories (JavaScript, React, SQL, AI, General).

### 📸 Screenshots

#### 1. Dark Theme General View
![Dark Theme General View](img/Screenshot%202026-06-20%20at%2014.46.05.png)

#### 2. Light Theme View
![Light Theme View](img/Screenshot%202026-06-20%20at%2014.48.00.png)

#### 3. Add & Edit Question Interface
![Add & Edit Question Interface](img/Screenshot%202026-06-20%20at%2014.48.18.png)

#### 4. Test Yourself (Random Question Modal)
![Test Yourself - Study Modal](img/Screenshot%202026-06-20%20at%2014.48.29.png)

---

### 🚀 Technologies Used

*   **React 19 & JavaScript (ES6+)**: Build user interface components and state management.
*   **Vite**: Extremely fast and modern module bundler and development server.
*   **Bootstrap 5 & Bootstrap Icons**: Responsive mobile-friendly grid system, utility classes, and icon set.
*   **LocalStorage**: For persistent storage of questions and theme preferences in the client browser.
*   **Vanilla CSS**: Custom styling for premium glassmorphism panels, glowing neon gradients, and micro-animations.

---

### ✨ Features

*   **Create Question**: Add a new question with a title, answer/notes, category, difficulty, and study status, complete with native HTML5 form validation.
*   **List & Detail View**: Render questions in clean styled cards, clicking opens/closes the answer section featuring formatted code block highlights.
*   **Update/Edit**: Easily update any question by clicking the edit icon, which pre-populates the form and saves updates smoothly.
*   **Delete**: Safely delete questions from the list with a native confirmation dialog.
*   **Category Filters**: Dynamic filter pills with counts showing question stats for JavaScript, React, SQL, AI, and General categories.
*   **Live Statistics Dashboard**: Display real-time counts for Total, Todo, Learning, Review, and Completed questions.
*   **Seed Data**: Pre-loaded with 5 high-quality tech interview questions on first run.
*   **Accessibility (A11y)**: Built with proper accessibility attributes like `aria-invalid` sync and modern `:user-invalid` styling.

---

### 📁 Project Folder Structure

```text
src/
├── components/
│    ├── QuestionForm.jsx       # Add/update form with form validation
│    ├── QuestionList.jsx       # Renders the question list and empty states
│    ├── QuestionCard.jsx       # Renders individual cards with expand and action buttons
│    └── CategoryFilter.jsx     # Category tabs with dynamic count badges
├── pages/
│    └── Home.jsx               # Main page component (Handles state and LocalStorage sync)
├── interfaces/
│    └── questionModel.js       # Question type annotations, categories, and initial seed data
├── App.jsx                     # Root application component wrapping Home
├── main.jsx                    # Entry point importing Bootstrap & styles
├── index.css                   # Global designs, animations, and custom theme overrides
└── App.css                     # Cleared style sheet to avoid styling conflicts
```

---

### 🛠️ Installation & Local Setup

Follow these steps to run the application locally on your machine:

#### 1. Clone or Download the Repository
Open your terminal and navigate to the project root directory.

#### 2. Install Dependencies
Run the following command to download dependencies:
```bash
npm install
```

#### 3. Start the Development Server
Launch the local dev environment:
```bash
npm run dev
```
Open the URL shown in your terminal (usually `http://localhost:5173`) in your browser.

#### 4. Build for Production
To build a production-ready package:
```bash
npm run build
```

---

### 🌐 GitHub & Netlify Deployment Steps

#### GitHub Upload Steps:
1. Create a new public repository on your GitHub account.
2. In your local project terminal, execute the following commands in order:
   ```bash
   git init
   git add .
   git commit -m "first commit: Mulakat Soru Bankasi Projesi"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

#### Netlify Deployment Steps:
Netlify lets you deploy Vite projects directly from your GitHub repository or by manually uploading the compiled directory:

##### Method A: GitHub Continuous Integration (Recommended)
1. Sign in to the [Netlify Dashboard](https://app.netlify.com/) and click **"Add new site" -> "Import an existing project"**.
2. Select **GitHub**, authenticate, and choose this repository.
3. Configure the build settings as follows:
   *   **Branch to deploy**: `main`
   *   **Build command**: `npm run build`
   *   **Publish directory**: `dist`
4. Click **"Deploy site"** to publish. Netlify will generate a custom live URL (`your-site-name.netlify.app`).

##### Method B: Drag and Drop Deployment
1. Run the build command `npm run build` in your terminal to generate a `dist` folder.
2. Go to your Netlify dashboard and drag the `dist` folder directly onto the **"Deploy manually"** area. Your site will be online in seconds.
