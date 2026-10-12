
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
    <section id="cultural-images" class="section">
  <div class="section-heading">
    <div>
      <p class="eyebrow">WIKIMEDIA COMMONS API</p>
      <h2>Explore Cultural Images</h2>
    </div>
    <p class="section-intro">
      Discover photographs and visual resources related to Igbo
      culture, traditions, and heritage.
    </p>
  </div>

  <form id="commons-search-form" class="search-form">
    <input
      id="commons-search-input"
      type="search"
      placeholder="Search Igbo culture, masquerades..."
      aria-label="Search cultural images"
    />
    <button type="submit">Search Images</button>
  </form>

  <p id="commons-status" role="status" aria-live="polite">
    Loading cultural images...
  </p>

  <div id="commons-results" class="commons-grid"></div>

  <p class="demo-note">
    Images are provided by Wikimedia Commons. Visit each source page
    to check its license and attribution requirements.
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
// Wikimedia Commons API: search cultural images
const commonsForm = document.querySelector("#commons-search-form");
const commonsInput = document.querySelector("#commons-search-input");
const commonsResults = document.querySelector("#commons-results");
const commonsStatus = document.querySelector("#commons-status");

async function searchCulturalImages(searchTerm) {
  commonsResults.replaceChildren();
  commonsStatus.textContent = "Searching Wikimedia Commons...";

  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: searchTerm,
    gsrnamespace: "6",
    gsrlimit: "12",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "400",
    format: "json",
    origin: "*",
  });

  try {
    const response = await fetch(
      `https://commons.wikimedia.org/w/api.php?${params}`
    );

    if (!response.ok) {
      throw new Error("The image search request failed.");
    }

    const data = await response.json();
    const pages = Object.values(data.query?.pages ?? {});

    const images = pages.filter(
      (page) => page.imageinfo?.[0]?.thumburl
    );

    if (images.length === 0) {
      commonsStatus.textContent =
        "No images found. Try another search term.";
      return;
    }

    images.forEach((page) => {
      const imageInfo = page.imageinfo[0];
      const title = page.title
        .replace(/^File:/, "")
        .replaceAll("_", " ");

      const sourceUrl =
        `https://commons.wikimedia.org/wiki/` +
        encodeURIComponent(page.title.replaceAll(" ", "_"));

      const card = document.createElement("article");
      card.className = "commons-card";

      const image = document.createElement("img");
      image.src = imageInfo.thumburl;
      image.alt = title;
      image.loading = "lazy";

      const heading = document.createElement("h3");
      heading.textContent = title;

      const license = document.createElement("p");
      license.className = "commons-license";

      const licenseName =
        imageInfo.extmetadata?.LicenseShortName?.value;

      license.textContent = licenseName
        ? `License: ${licenseName.replace(/<[^>]*>/g, "")}`
        : "Check the source page for licensing information.";

      const sourceLink = document.createElement("a");
      sourceLink.href = sourceUrl;
      sourceLink.target = "_blank";
      sourceLink.rel = "noopener noreferrer";
      sourceLink.textContent = "View source and license";

      card.append(image, heading, license, sourceLink);
      commonsResults.append(card);
    });

    commonsStatus.textContent =
      `Found ${images.length} cultural image results.`;
  } catch (error) {
    console.error("Wikimedia Commons API error:", error);

    commonsStatus.textContent =
      "Unable to load images. Please check your connection and try again.";
  }
}

commonsForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchTerm = commonsInput.value.trim();

  if (searchTerm) {
    searchCulturalImages(searchTerm);
  }
});

// Display an initial set of images when the page loads.
searchCulturalImages("Igbo culture");