
import "./style.css";

const topics = [
  {
    id: "new-yam-festival",
    category: "TRADITIONS",
    title: "New Yam Festival",
    description:
      "Explore the cultural significance of the yam harvest, thanksgiving, community gatherings, and celebrations in Igbo communities.",
    details:
      "The New Yam Festival is associated with the yam harvest and the expression of gratitude. Celebrations and customs vary among communities.",
  },
  {
    id: "igbo-naming",
    category: "CULTURAL PRACTICES",
    title: "Naming Traditions",
    description:
      "Discover how Igbo names can express circumstances of birth, family history, hopes, beliefs, and personal identity.",
    details:
      "Names may communicate family experiences, aspirations, gratitude, or historical circumstances. Their meanings are best understood within their linguistic and community context.",
  },
  {
    id: "igbo-masquerades",
    category: "PERFORMING ARTS",
    title: "Masquerade Traditions",
    description:
      "Learn about masquerades, performance, music, dance, and their roles in different Igbo cultural settings.",
    details:
      "Masquerade traditions can involve costume, dance, music, and community ceremonies. Their meanings and social roles differ across communities.",
  },
  {
    id: "igbo-proverbs",
    category: "ORAL TRADITIONS",
    title: "Proverbs and Oral Literature",
    description:
      "Explore how proverbs, folktales, riddles, and oral storytelling communicate experience and cultural knowledge.",
    details:
      "Oral literature can convey advice, humour, moral lessons, social expectations, and community memory. Interpretation often depends on context.",
  },
  {
    id: "igbo-history",
    category: "HISTORY",
    title: "Igbo History and Communities",
    description:
      "Explore the diverse histories of Igbo communities, including settlement, trade, political organisation, and social change.",
    details:
      "Igbo history includes many local histories and forms of political and social organisation. It should not be reduced to a single story or timeline.",
  },
  {
    id: "igbo-crafts",
    category: "ARTS AND CRAFTS",
    title: "Arts, Crafts, and Material Culture",
    description:
      "Discover artistic expression through textiles, sculpture, pottery, woodwork, and other locally significant crafts.",
    details:
      "Artistic practices differ across places and periods. Documenting makers, materials, locations, and historical context helps preserve this knowledge.",
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
      <a href="index.html">Home</a>
      <a href="explore.html">Explore</a>
      <a class="active" href="culture.html">Culture &amp; History</a>
      <a href="about.html">About</a>
      <a href="favorites.html">Favorites</a>
    </nav>
  </header>

  <main>
    <section class="explore-hero">
      <p class="eyebrow">OUR HERITAGE, OUR STORY</p>
      <h1>Culture &amp; History</h1>
      <p>
        Discover the traditions, histories, creative expressions, and
        community knowledge that contribute to Igbo cultural heritage.
      </p>
    </section>

    <section class="section culture-content">
      <div class="culture-intro">
        <h2>A living and diverse heritage</h2>
        <p>
          Igbo culture is not identical across every community. Language,
          customs, ceremonies, and historical experiences can vary by place
          and generation. This collection aims to document that diversity
          respectfully.
        </p>
      </div>

      <div class="results-heading">
        <h2>Explore cultural topics</h2>
        <p id="topic-count"></p>
      </div>

      <div id="culture-grid" class="records-grid"></div>

      <section class="commons-section">
        <div class="section-heading">
          <p class="eyebrow">CULTURAL IMAGE COLLECTION</p>
          <h2>Discover Igbo Culture in Pictures</h2>
          <p>
            Search Wikimedia Commons for photographs and visual materials
            related to Igbo traditions, history, arts, and communities.
          </p>
        </div>

        <form id="commons-search-form" class="book-search-form">
          <label for="commons-search-input">Search cultural images</label>

          <div class="book-search-controls">
            <input
              id="commons-search-input"
              type="search"
              placeholder="e.g. Igbo New Yam Festival"
              value="Igbo culture"
              required
            />

            <button type="submit" class="detail-button">
              Search Images
            </button>
          </div>
        </form>

        <p id="commons-search-status" role="status" aria-live="polite"></p>

        <div id="commons-results" class="commons-results"></div>
      </section>

      <section class="culture-note">
        <h2>Help preserve our heritage</h2>
        <p>
          Cultural knowledge is strongest when it is documented with context.
          Future entries can include community names, oral histories,
          contributor information, photographs, recordings, and references.
        </p>
        <a class="detail-button" href="explore.html">
          Explore language records
        </a>
      </section>
    </section>

    <section class="section books-section">
      <div class="section-heading">
        <p class="eyebrow">FURTHER READING</p>
        <h2>Explore Igbo Books</h2>
        <p>
          Discover books about Igbo language, history, literature, and culture.
        </p>
      </div>

      <form id="book-search-form" class="book-search-form">
        <label for="book-search-input">Search for books</label>

        <div class="book-search-controls">
          <input
            id="book-search-input"
            type="search"
            placeholder="e.g. Igbo language or Igbo history"
            required
          />

          <button type="submit" class="detail-button">
            Search Books
          </button>
        </div>
      </form>

      <p id="book-search-status" role="status" aria-live="polite"></p>

      <div id="book-results" class="book-results"></div>
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

// Display culture topic cards
const cultureGrid = document.querySelector("#culture-grid");
const topicCount = document.querySelector("#topic-count");

topicCount.textContent = `${topics.length} topics`;

topics.forEach((topic) => {
  const article = document.createElement("article");

  article.className = "record-card culture-card";
  article.tabIndex = 0;
  article.setAttribute("role", "button");
  article.setAttribute("aria-expanded", "false");

  const category = document.createElement("p");
  category.className = "record-category";
  category.textContent = topic.category;

  const title = document.createElement("h3");
  title.textContent = topic.title;

  const description = document.createElement("p");
  description.textContent = topic.description;

  const details = document.createElement("p");
  details.className = "culture-details";
  details.textContent = topic.details;
  details.hidden = true;

  const linkText = document.createElement("span");
  linkText.className = "card-link";
  linkText.textContent = "Read more +";

  function toggleDetails() {
    const isExpanded = article.getAttribute("aria-expanded") === "true";

    article.setAttribute("aria-expanded", String(!isExpanded));
    details.hidden = isExpanded;
    linkText.textContent = isExpanded ? "Read more +" : "Show less −";
  }

  article.addEventListener("click", toggleDetails);

  article.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleDetails();
    }
  });

  article.append(category, title, description, details, linkText);
  cultureGrid.append(article);
});

// Wikimedia Commons image search elements
const commonsSearchForm = document.querySelector("#commons-search-form");
const commonsSearchInput = document.querySelector("#commons-search-input");
const commonsResults = document.querySelector("#commons-results");
const commonsSearchStatus = document.querySelector("#commons-search-status");

async function searchCommons(searchTerm) {
  commonsResults.replaceChildren();
  commonsSearchStatus.textContent = "Searching Wikimedia Commons...";

  try {
    const params = new URLSearchParams({
      action: "query",
      generator: "search",
      gsrsearch: searchTerm,
      gsrnamespace: "6",
      gsrlimit: "8",
      prop: "imageinfo",
      iiprop: "url",
      iiurlwidth: "400",
      format: "json",
      origin: "*",
    });

    const url = `https://commons.wikimedia.org/w/api.php?${params}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();
    const pages = Object.values(data.query?.pages || {});

    if (pages.length === 0) {
      commonsSearchStatus.textContent =
        "No images found. Try a different search term.";
      return;
    }

    let displayedCount = 0;

    pages.forEach((page) => {
      const imageInfo = page.imageinfo?.[0];

      if (!imageInfo) return;

      const article = document.createElement("article");
      article.className = "commons-card";

      const commonsUrl =
        `https://commons.wikimedia.org/wiki/${encodeURIComponent(
          page.title.replaceAll(" ", "_"),
        )}`;

      const imageLink = document.createElement("a");
      imageLink.href = commonsUrl;
      imageLink.target = "_blank";
      imageLink.rel = "noopener noreferrer";
      imageLink.setAttribute(
        "aria-label",
        `View ${page.title} on Wikimedia Commons`,
      );

      const image = document.createElement("img");
      image.src = imageInfo.thumburl || imageInfo.url;
      image.alt = page.title.replace(/^File:/, "");
      image.loading = "lazy";

      imageLink.append(image);

      const title = document.createElement("p");
      title.textContent = page.title.replace(/^File:/, "");

      const sourceLink = document.createElement("a");
      sourceLink.href = commonsUrl;
      sourceLink.target = "_blank";
      sourceLink.rel = "noopener noreferrer";
      sourceLink.textContent = "View source and licence";

      article.append(imageLink, title, sourceLink);
      commonsResults.append(article);

      displayedCount++;
    });

    commonsSearchStatus.textContent = displayedCount
      ? `Showing ${displayedCount} image results. Open each source page to check its licence and attribution requirements.`
      : "No displayable images found. Try another search term.";
  } catch (error) {
    console.error("Wikimedia Commons API error:", error);

    commonsSearchStatus.textContent =
      "Images could not be loaded. Check your internet connection and try again.";
  }
}

commonsSearchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const searchTerm = commonsSearchInput.value.trim();

  if (!searchTerm) {
    commonsSearchStatus.textContent = "Please enter a search term.";
    return;
  }

  await searchCommons(searchTerm);
});

// Load an initial collection of images when the page opens
searchCommons(commonsSearchInput.value);

// Open Library book search elements
const bookSearchForm = document.querySelector("#book-search-form");
const bookSearchInput = document.querySelector("#book-search-input");
const bookResults = document.querySelector("#book-results");
const bookSearchStatus = document.querySelector("#book-search-status");

// Search Open Library when the form is submitted
bookSearchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const searchTerm = bookSearchInput.value.trim();

  if (!searchTerm) {
    bookSearchStatus.textContent = "Please enter a search term.";
    return;
  }

  bookResults.replaceChildren();
  bookSearchStatus.textContent = "Searching Open Library...";

  try {
    const query = encodeURIComponent(searchTerm);
    const fields = "key,title,author_name,first_publish_year,cover_i";

    const url =
      `https://openlibrary.org/search.json?q=${query}` +
      `&fields=${fields}&limit=8`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();
    const books = data.docs || [];

    if (books.length === 0) {
      bookSearchStatus.textContent =
        "No books found. Try a different search term.";
      return;
    }

    bookSearchStatus.textContent =
      `Found ${Number(data.numFound || books.length).toLocaleString()} matching books. ` +
      `Showing ${books.length}.`;

    books.forEach((book) => {
      const article = document.createElement("article");
      article.className = "book-card";

      if (book.cover_i) {
        const cover = document.createElement("img");

        cover.src =
          `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

        cover.alt = `Cover of ${book.title || "book"}`;
        cover.loading = "lazy";
        cover.className = "book-cover";

        article.append(cover);
      }

      const title = document.createElement("h3");
      title.textContent = book.title || "Untitled book";

      const authors = document.createElement("p");
      authors.textContent = book.author_name
        ? `Author: ${book.author_name.join(", ")}`
        : "Author information unavailable";

      const year = document.createElement("p");
      year.textContent = book.first_publish_year
        ? `First published: ${book.first_publish_year}`
        : "Publication year unavailable";

      const link = document.createElement("a");
      link.href = `https://openlibrary.org${book.key}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "View book";

      article.append(title, authors, year, link);
      bookResults.append(article);
    });
  } catch (error) {
    console.error("Open Library API error:", error);

    bookSearchStatus.textContent =
      "Books could not be loaded. Check your internet connection and try again.";
  }
});
