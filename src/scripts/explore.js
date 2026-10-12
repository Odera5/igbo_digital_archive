
import "../styles/style.css";

const app = document.querySelector("#app");

app.innerHTML = `
  <header class="site-header">
    <a class="logo" href="index.html">
      <span class="logo-mark">Ị</span>
      <span>Igbo Digital Archive</span>
    </a>

    <nav class="navigation" aria-label="Main navigation">
      <a href="index.html">Home</a>
      <a class="active" href="explore.html">Explore</a>
      <a href="culture.html">Culture & History</a>
      <a href="about.html">About</a>
      <a href="favorites.html">Favorites</a>
    </nav>
  </header>

  <main>
    <section class="explore-hero">
      <p class="eyebrow">DISCOVER OUR HERITAGE</p>
      <h1>Explore the Archive</h1>
      <p>
        Discover Igbo words, expressions, proverbs, and cultural knowledge.
        Search the collection or choose a category to begin.
      </p>
    </section>

    <section class="section explore-content">
      <form id="search-form" class="search-form">
        <input
          id="search-input"
          type="search"
          placeholder="Search words, meanings, or descriptions..."
          aria-label="Search archive records"
        />
        <button type="submit">Search</button>
      </form>

      <div class="filter-area">
        <h2>Browse by category</h2>

        <div class="filter-buttons" aria-label="Filter records">
          <button
            class="filter-button selected"
            data-category="All"
            type="button"
          >
            All records
          </button>

          <button
            class="filter-button"
            data-category="Language"
            type="button"
          >
            Language & Words
          </button>

          <button
            class="filter-button"
            data-category="Proverbs"
            type="button"
          >
            Proverbs
          </button>
        </div>
      </div>

      <div class="results-heading">
        <h2 id="results-title">All records</h2>
        <p id="results-count">Loading records...</p>
      </div>

      <div id="records-grid" class="records-grid"></div>

      <p id="empty-message" class="empty-message" hidden>
        No records match your search. Try another word or category.
      </p>

      <p class="demo-note">
        This is an initial demonstration collection. Records will be expanded
        and verified as the archive develops.
      </p>
    </section>
  </main>

  <footer class="site-footer">
    <a class="logo footer-logo" href="index.html">
      <span class="logo-mark">Ị</span>
      <span>Igbo Digital Archive</span>
    </a>
    <p>Preserving knowledge. Connecting generations.</p>
  </footer>
`;

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const recordsGrid = document.querySelector("#records-grid");
const resultsTitle = document.querySelector("#results-title");
const resultsCount = document.querySelector("#results-count");
const emptyMessage = document.querySelector("#empty-message");
const filterButtons = document.querySelectorAll(".filter-button");

let records = [];
let selectedCategory = "All";
let searchTerm = "";

function displayRecords() {
  const filteredRecords = records.filter((record) => {
    const matchesCategory =
      selectedCategory === "All" ||
      record.category === selectedCategory;

    const searchableText = [
      record.igbo,
      record.category,
      record.meaning,
      record.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  recordsGrid.innerHTML = "";

  filteredRecords.forEach((record) => {
    const article = document.createElement("article");

    article.className = "record-card";
    article.tabIndex = 0;
    article.setAttribute("role", "link");
    article.setAttribute(
      "aria-label",
      `View details for ${record.igbo}`
    );

    function openRecord() {
      window.location.href =
        `record.html?id=${encodeURIComponent(record.id)}`;
    }

    article.addEventListener("click", openRecord);

    article.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openRecord();
      }
    });

    const category = document.createElement("p");
    category.className = "record-category";
    category.textContent = record.category || "Uncategorized";

    const title = document.createElement("h3");
    title.textContent = record.igbo;

    const meaning = document.createElement("p");
    meaning.className = "record-meaning";
    meaning.textContent = record.meaning || "";

    const description = document.createElement("p");
    description.textContent = record.description || "";

    const linkText = document.createElement("span");
    linkText.className = "card-link";
    linkText.textContent = "View details →";

    article.append(
      category,
      title,
      meaning,
      description,
      linkText
    );

    recordsGrid.append(article);
  });

  resultsTitle.textContent =
    selectedCategory === "All"
      ? "All records"
      : selectedCategory === "Language"
        ? "Language & Words"
        : selectedCategory;

  resultsCount.textContent =
    `${filteredRecords.length} record${
      filteredRecords.length === 1 ? "" : "s"
    }`;

  emptyMessage.hidden = filteredRecords.length > 0;

  if (filteredRecords.length === 0) {
    emptyMessage.textContent =
      records.length === 0
        ? "No archive records are available. Please check record.json."
        : "No records match your search. Try another word or category.";
  }
}

async function loadRecords() {
  try {
    resultsCount.textContent = "Loading records...";

    const response = await fetch("/data/record.json");

    if (!response.ok) {
      throw new Error(
        `Failed to load record.json: HTTP ${response.status}`
      );
    }

    const recordData = await response.json();

    if (!Array.isArray(recordData)) {
      throw new Error(
        "Invalid archive data: record.json must contain a JSON array."
      );
    }

    const validRecords = recordData.filter((record) => {
      return (
        record &&
        typeof record.id === "string" &&
        typeof record.igbo === "string" &&
        typeof record.category === "string" &&
        typeof record.meaning === "string"
      );
    });

    if (validRecords.length !== recordData.length) {
      console.warn(
        "Some records were skipped because they are missing required fields."
      );
    }

    records = validRecords;

    displayRecords();
  } catch (error) {
    console.error("Error loading archive records:", error);

    resultsCount.textContent = "Unable to load records.";

    emptyMessage.textContent =
      "Could not load archive records. Check that public/data/record.json exists and contains valid JSON.";

    emptyMessage.hidden = false;
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  searchTerm = searchInput.value.trim().toLowerCase();

  displayRecords();
});

searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value.trim().toLowerCase();

  displayRecords();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;

    filterButtons.forEach((filterButton) => {
      filterButton.classList.toggle(
        "selected",
        filterButton === button
      );
    });

    displayRecords();
  });
});

loadRecords();
