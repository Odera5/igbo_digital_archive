
import "../styles/style.css";

const FAVORITES_KEY = "igboArchiveFavorites";
const app = document.querySelector("#app");

app.innerHTML = `
  <header class="site-header">
    <a class="logo" href="index.html">
      <span class="logo-mark">Ị</span>
      <span>Igbo Digital Archive</span>
    </a>

    <nav class="navigation" aria-label="Main navigation">
      <a href="index.html">Home</a>
      <a href="explore.html">Explore</a>
      <a href="culture.html">Culture & History</a>
      <a href="about.html">About</a>
      <a class="active" href="favorites.html">Favorites</a>
    </nav>
  </header>

  <main>
    <section class="explore-hero">
      <p class="eyebrow">YOUR PERSONAL COLLECTION</p>
      <h1>My Favorites</h1>
      <p>
        Revisit the Igbo words and proverbs you have saved.
      </p>
    </section>

    <section class="section favorites-content">
      <div class="results-heading">
        <h2>Saved records</h2>
        <p id="favorites-count"></p>
      </div>

      <div id="favorites-grid" class="records-grid"></div>

      <div id="favorites-empty" class="favorites-empty" hidden>
        <h2>No favorites yet</h2>
        <p>
          Visit Explore, open a record, and save it to your favorites.
        </p>
        <a class="detail-button" href="explore.html">
          Explore the Archive
        </a>
      </div>
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

const favoritesGrid = document.querySelector("#favorites-grid");
const favoritesCount = document.querySelector("#favorites-count");
const favoritesEmpty = document.querySelector("#favorites-empty");

function getFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function displayFavorites() {
  const favorites = getFavorites();

  favoritesGrid.replaceChildren();
  favoritesCount.textContent =
    `${favorites.length} saved record${favorites.length === 1 ? "" : "s"}`;

  favoritesEmpty.hidden = favorites.length > 0;
  favoritesGrid.hidden = favorites.length === 0;

  favorites.forEach((record) => {
    const article = document.createElement("article");
    article.className = "record-card";

    const category = document.createElement("p");
    category.className = "record-category";
    category.textContent = record.category || "Archive record";

    const title = document.createElement("h3");
    title.textContent = record.igbo || "Untitled record";

    const meaning = document.createElement("p");
    meaning.className = "record-meaning";
    meaning.textContent = record.meaning || "";

    const description = document.createElement("p");
    description.textContent = record.description || "";

    const detailsLink = document.createElement("a");
    detailsLink.className = "card-link";
    detailsLink.href =
      `record.html?id=${encodeURIComponent(record.id)}`;
    detailsLink.textContent = "View details →";

    const removeButton = document.createElement("button");
    removeButton.className = "remove-favorite-button";
    removeButton.type = "button";
    removeButton.textContent = "Remove from Favorites";

    removeButton.addEventListener("click", () => {
      const updatedFavorites = getFavorites().filter(
        (item) => item.id !== record.id
      );

      localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites)
      );

      displayFavorites();
    });

    article.append(
      category,
      title,
      meaning,
      description,
      detailsLink,
      removeButton
    );

    favoritesGrid.append(article);
  });
}

displayFavorites();
