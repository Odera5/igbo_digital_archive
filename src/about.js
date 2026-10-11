
import "./style.css";

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
      <a class="active" href="about.html">About</a>
      <a href="favorites.html">Favorites</a>
    </nav>
  </header>

  <main>
    <section class="explore-hero">
      <p class="eyebrow">ABOUT THE PROJECT</p>
      <h1>Preserving Igbo Knowledge</h1>
      <p>
        A digital collection designed to document, explore, and share
        Igbo language, oral traditions, history, and cultural knowledge.
      </p>
    </section>

    <section class="section about-content">
      <article class="about-section">
        <h2>Our mission</h2>
        <p>
          The Igbo Digital Archive aims to make Igbo language and cultural
          knowledge easier to discover through an organised digital
          collection of words, expressions, proverbs, historical accounts,
          and cultural practices.
        </p>
        <p>
          The long-term vision is to support cultural preservation,
          intergenerational learning, research, and responsible digital
          access to community knowledge.
        </p>
      </article>

      <article class="about-section">
        <h2>What the archive covers</h2>
        <div class="about-feature-grid">
          <div class="about-feature">
            <h3>Language</h3>
            <p>Words, meanings, expressions, and usage examples.</p>
          </div>
          <div class="about-feature">
            <h3>Oral traditions</h3>
            <p>Proverbs, folktales, riddles, and oral histories.</p>
          </div>
          <div class="about-feature">
            <h3>Culture</h3>
            <p>Traditions, festivals, crafts, and cultural practices.</p>
          </div>
          <div class="about-feature">
            <h3>History</h3>
            <p>Historical events, community accounts, and heritage.</p>
          </div>
        </div>
      </article>

      <article class="about-section">
        <h2>Sources and verification</h2>
        <p>
          Cultural and linguistic records should be documented with
          enough context for readers to understand where the information
          came from and how reliable it is.
        </p>

        <ul class="source-principles">
          <li>
            <strong>Identify sources:</strong>
            Record the book, publication, archive, website, or contributor
            associated with each entry.
          </li>
          <li>
            <strong>Respect variation:</strong>
            Document dialect, community, and regional differences instead
            of assuming that one expression represents every Igbo speaker.
          </li>
          <li>
            <strong>Review translations:</strong>
            Where possible, ask fluent speakers or knowledgeable reviewers
            to check meanings, spelling, pronunciation, and examples.
          </li>
          <li>
            <strong>Be transparent:</strong>
            Distinguish verified records from demonstration entries and
            information that still requires review.
          </li>
          <li>
            <strong>Respect cultural ownership:</strong>
            Obtain appropriate permission before publishing recordings,
            personal accounts, photographs, or sensitive community knowledge.
          </li>
        </ul>
      </article>

      <article class="about-section">
        <h2>Current project status</h2>
        <p>
          This version is an early prototype. It uses demonstration records
          to illustrate the interface and its features. It is not yet a
          comprehensive or fully verified cultural database.
        </p>
        <p>
          The next development stages can introduce documented sources,
          contributor details, dialect labels, audio pronunciation,
          and a database for storing and retrieving records.
        </p>
      </article>

      <section class="about-cta">
        <h2>Start exploring</h2>
        <p>
          Browse the current collection of introductory language records
          and cultural topics.
        </p>
        <a class="detail-button" href="explore.html">
          Explore the Archive
        </a>
      </section>
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
