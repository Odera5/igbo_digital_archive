
import "./style.css";

const records = [
  {
    title: "Ndewo",
    category: "Language",
    igbo: "Ndewo",
    meaning: "Hello or greetings",
    description:
      "A common Igbo greeting used to acknowledge someone or begin a conversation.",
  },
  {
    title: "Udo",
    category: "Language",
    igbo: "Udo",
    meaning: "Peace",
    description:
      "A word expressing peace, harmony, and the absence of conflict.",
  },
  {
    title: "Onye kwe, chi ya ekwe",
    category: "Proverbs",
    igbo: "Onye kwe, chi ya ekwe",
    meaning: "When a person agrees, their personal spirit agrees.",
    description:
      "A proverb commonly understood to emphasize personal effort and determination.",
  },
];

const app = document.querySelector("#app");

app.innerHTML = `
  <header class="site-header">
    <a class="logo" href="index.html">
      <span class="logo-mark">Ị</span>
      <span>Igbo Digital Archive</span>
    </a>

    <nav class="navigation" aria-label="Main navigation">
      <a class="active" href="index.html">Home</a>
      <a href="explore.html">Explore</a>
      <a href="culture.html">Culture & History</a>
      <a href="about.html">About</a>
      <a href="favorites.html">Favorites</a>
    </nav>
  </header>

  <main>
    <section class="hero">
      <p class="eyebrow">LANGUAGE · HISTORY · HERITAGE</p>
      <h1>Preserving Igbo knowledge.<br /><span>Connecting generations.</span></h1>
      <p class="hero-description">
        Discover the words, proverbs, stories, traditions, and history
        that make up the richness of Igbo culture.
      </p>

      <form id="search-form" class="search-form">
        <input
          id="search-input"
          type="search"
          placeholder="Search Igbo words, proverbs, and more..."
          aria-label="Search the archive"
        />
        <button type="submit">Search Archive</button>
      </form>

      <p class="hero-note">Explore, learn, and help preserve our heritage.</p>
    </section>

    <section id="explore" class="section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">START EXPLORING</p>
          <h2>Explore the archive</h2>
        </div>
        <p class="section-intro">
          Browse different areas of Igbo knowledge.
        </p>
      </div>

      <div class="category-grid">
        <a class="category-card" href="#records" data-category="Language">
          <span class="category-icon">文</span>
          <h3>Language & Words</h3>
          <p>Learn Igbo words, greetings, and meanings.</p>
          <span class="card-link">Explore words →</span>
        </a>

        <a class="category-card" href="#records" data-category="Proverbs">
          <span class="category-icon">“ ”</span>
          <h3>Proverbs</h3>
          <p>Discover traditional sayings and their interpretations.</p>
          <span class="card-link">Explore proverbs →</span>
        </a>

        <a class="category-card" href="#culture">
          <span class="category-icon">⌂</span>
          <h3>Culture & Traditions</h3>
          <p>Explore customs, practices, and community life.</p>
          <span class="card-link">Discover culture →</span>
        </a>

        <a class="category-card" href="#culture">
          <span class="category-icon">◷</span>
          <h3>History & Heritage</h3>
          <p>Learn about historical events and cultural heritage.</p>
          <span class="card-link">Discover history →</span>
        </a>
      </div>
    </section>

    <section class="featured-section">
      <div class="featured-content">
        <p class="eyebrow">FEATURED PROVERB</p>
        <h2>“Onye kwe, chi ya ekwe.”</h2>
        <p class="featured-meaning">
          Commonly interpreted as: “When a person agrees, their personal
          spirit agrees.”
        </p>
        <p class="featured-note">
          Interpretations can vary by context and speaker.
        </p>
      </div>
      <div class="featured-symbol" aria-hidden="true">Ị</div>
    </section>

    <section id="records" class="section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">FROM THE COLLECTION</p>
          <h2 id="records-heading">Discover Igbo knowledge</h2>
        </div>
      </div>
      <div id="records-grid" class="records-grid"></div>
      <p id="empty-message" class="empty-message" hidden>
        No matching records found. Try another search.
      </p>
    </section>

    <section id="culture" class="culture-section">
      <p class="eyebrow">OUR SHARED HERITAGE</p>
      <h2>A living culture worth preserving</h2>
      <p>
        Language carries knowledge across generations. This archive aims
        to make Igbo words, oral traditions, history, and cultural
        knowledge easier to discover and learn.
      </p>
    </section>

    <section id="about" class="about-section">
      <p class="eyebrow">ABOUT THE PROJECT</p>
      <h2>Knowledge for future generations</h2>
      <p>
        The Igbo Digital Archive is a digital learning project designed
        to document and explore Igbo language, culture, and heritage.
        The collection will grow as more records and reliable sources
        are added.
      </p>
    </section>
  </main>

  <footer class="site-footer">
    <a class="logo footer-logo" href="index.html">
      <span class="logo-mark">Ị</span>
      <span>Igbo Digital Archive</span>
    </a>
    <p>Preserving knowledge. Connecting generations.</p>
    <p>© <span id="year"></span> Igbo Digital Archive</p>
  </footer>
`;

const recordsGrid = document.querySelector("#records-grid");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const recordsHeading = document.querySelector("#records-heading");
const emptyMessage = document.querySelector("#empty-message");

function displayRecords(items) {
  recordsGrid.innerHTML = "";

  items.forEach((record) => {
    const article = document.createElement("article");
    article.className = "record-card";

    const category = document.createElement("p");
    category.className = "record-category";
    category.textContent = record.category;

    const title = document.createElement("h3");
    title.textContent = record.igbo;

    const meaning = document.createElement("p");
    meaning.className = "record-meaning";
    meaning.textContent = record.meaning;

    const description = document.createElement("p");
    description.textContent = record.description;

    article.append(category, title, meaning, description);
    recordsGrid.append(article);
  });

  emptyMessage.hidden = items.length !== 0;
}

function searchRecords(query) {
  const term = query.trim().toLowerCase();

  const matchingRecords = records.filter((record) =>
    [
      record.title,
      record.category,
      record.igbo,
      record.meaning,
      record.description,
    ].some((value) => value.toLowerCase().includes(term))
  );

  recordsHeading.textContent = term
    ? `Search results for "${query.trim()}"`
    : "Discover Igbo knowledge";

  displayRecords(matchingRecords);
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchRecords(searchInput.value);
  document.querySelector("#records").scrollIntoView({
    behavior: "smooth",
  });
});

document.querySelectorAll("[data-category]").forEach((link) => {
  link.addEventListener("click", () => {
    const category = link.dataset.category;
    recordsHeading.textContent = category;
    displayRecords(
      records.filter((record) => record.category === category)
    );
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

displayRecords(records);
