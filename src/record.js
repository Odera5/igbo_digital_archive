
import "./style.css";

const records = [
  {
    id: "ndewo",
    igbo: "Ndewo",
    category: "Language",
    meaning: "Hello or greetings",
    description:
      "Ndewo is a greeting used to acknowledge or greet someone. It is a useful expression when beginning a conversation.",
    usage: "Ndewo! Kedu?",
    translation: "Hello! How are you?",
  },
  {
    id: "udo",
    igbo: "Udo",
    category: "Language",
    meaning: "Peace",
    description:
      "Udo refers to peace, calmness, or harmony. It is also used in expressions and names associated with peaceful living.",
    usage: "Udo dịrị gị.",
    translation: "Peace be with you.",
  },
  {
    id: "imela",
    igbo: "Imela",
    category: "Language",
    meaning: "Thank you",
    description:
      "Imela is an expression of gratitude. It can be used to appreciate someone's help, kindness, or generosity.",
    usage: "Imela nke ukwuu.",
    translation: "Thank you very much.",
  },
  {
    id: "biko",
    igbo: "Biko",
    category: "Language",
    meaning: "Please",
    description:
      "Biko is a polite expression used when making a request or asking someone to do something.",
    usage: "Biko, nyere m aka.",
    translation: "Please, help me.",
  },
  {
    id: "onye-kwe",
    igbo: "Onye kwe, chi ya ekwe",
    category: "Proverbs",
    meaning: "When a person agrees, their personal spirit agrees.",
    description:
      "This proverb is commonly interpreted as emphasizing personal commitment, determination, and the importance of being willing to pursue one's goals. Interpretations may vary by context.",
    usage: "Onye kwe, chi ya ekwe.",
    translation:
      "When a person agrees, their personal spirit agrees.",
  },
  {
    id: "aha",
    igbo: "Aha",
    category: "Language",
    meaning: "Name",
    description:
      "Aha is the Igbo word for a name. Names can carry personal, family, historical, and cultural significance.",
    usage: "Gịnị bụ aha gị?",
    translation: "What is your name?",
  },
  {
    id: "nwoke",
    igbo: "Nwoke",
    category: "Language",
    meaning: "Man",
    description:
      "Nwoke is a word commonly used for an adult male. Its meaning in a sentence depends on the surrounding words and context.",
    usage: "Nwoke ahụ bịara.",
    translation: "That man came.",
  },
  {
    id: "nwanyi",
    igbo: "Nwanyị",
    category: "Language",
    meaning: "Woman",
    description:
      "Nwanyị is a word commonly used for an adult female. Spelling and pronunciation conventions can vary in informal writing.",
    usage: "Nwanyị ahụ bịara.",
    translation: "That woman came.",
  },
  {
    id: "aka-nri",
    igbo: "Aka nri",
    category: "Language",
    meaning: "Right hand",
    description:
      "Aka nri refers to the right hand. The expression combines aka, meaning hand, with nri, meaning right in this context.",
    usage: "Jiri aka nri gị.",
    translation: "Use your right hand.",
  },
];

const app = document.querySelector("#app");

const params = new URLSearchParams(window.location.search);
const recordId = params.get("id");

const record = records.find((item) => item.id === recordId);

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

  <main class="record-detail-page">
    <a class="back-link" href="explore.html">
      ← Back to Explore
    </a>

    <div id="record-content"></div>
  </main>

  <footer class="site-footer">
    <a class="logo footer-logo" href="index.html">
      <span class="logo-mark">Ị</span>
      <span>Igbo Digital Archive</span>
    </a>
    <p>Preserving knowledge. Connecting generations.</p>
  </footer>
`;

const recordContent = document.querySelector("#record-content");

if (record) {
  document.title = `${record.igbo} | Igbo Digital Archive`;

  recordContent.innerHTML = `
    <article class="record-detail">
      <p class="eyebrow">${record.category.toUpperCase()}</p>

      <h1>${record.igbo}</h1>

      <p class="record-meaning">${record.meaning}</p>
      <button
  id="favorite-button"
  class="favorite-button"
  type="button"
>
  ☆ Save to Favorites
</button>

      <div class="detail-divider"></div>

      <h2>About this record</h2>
      <p>${record.description}</p>

      <section class="example-box">
        <p class="eyebrow">EXAMPLE OF USE</p>
        <h2>${record.usage}</h2>
        <p>${record.translation}</p>
      </section>

      <p class="source-note">
        Archive note: These are introductory demonstration entries.
        Meanings, translations, spelling, and usage examples should be
        reviewed by fluent Igbo speakers and reliable cultural sources
        before being treated as verified records.
      </p>
    </article>
  `;
} else {
  document.title = "Record Not Found | Igbo Digital Archive";

  recordContent.innerHTML = `
    <section class="record-not-found">
      <p class="eyebrow">RECORD NOT FOUND</p>
      <h1>We couldn't find that record.</h1>
      <p>
        The record may not exist or the link may be incorrect.
        Return to the archive to explore the available entries.
      </p>
      <a class="detail-button" href="explore.html">
        Explore the Archive
      </a>
    </section>
  `;
}

const FAVORITES_KEY = "igboArchiveFavorites";

function getFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

if (record) {
  const favoriteButton = document.querySelector("#favorite-button");

  function updateFavoriteButton() {
    const favorites = getFavorites();
    const isFavorite = favorites.some(
      (item) => item.id === record.id
    );

    favoriteButton.textContent = isFavorite
      ? "★ Remove from Favorites"
      : "☆ Save to Favorites";

    favoriteButton.setAttribute(
      "aria-pressed",
      String(isFavorite)
    );
  }

  favoriteButton.addEventListener("click", () => {
    let favorites = getFavorites();

    const isFavorite = favorites.some(
      (item) => item.id === record.id
    );

    if (isFavorite) {
      favorites = favorites.filter(
        (item) => item.id !== record.id
      );
    } else {
      favorites.push(record);
    }

    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(favorites)
    );

    updateFavoriteButton();
  });

  updateFavoriteButton();
}
