

const movies = [
  {
    title: "Big Buck Bunny",
    category: "Animation",
    description: "A short animated film.",
    icon: "🐰",
    video: "videos/video1.mp4"
  },
  {
    title: "Elephant Dream",
    category: "Adventure",
    description: "An experimental animated short.",
    icon: "🐘",
    video: "videos/video2.mp4"
  },
  {
    title: "For Bigger Escapes",
    category: "Nature",
    description: "A scenic travel video.",
    icon: "🌍",
    video: "videos/video3.mp4"
  }
];
const grid = document.querySelector("#movie-grid");
const search = document.querySelector("#search");
const count = document.querySelector("#result-count");
const emptyMessage = document.querySelector("#empty-message");
const filterButtons = document.querySelectorAll(".filter");

let selectedCategory = "All";

function renderMovies() {
  const query = search.value.trim().toLowerCase();

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(query) ||
      movie.description.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "All" ||
      movie.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  grid.innerHTML = filteredMovies.map((movie) => `
    <article class="movie-card">
      <div class="poster" aria-hidden="true">${movie.icon}</div>
      <div class="movie-info">
        <span class="category-label">${movie.category}</span>
        <h3>${movie.title}</h3>
        <p>${movie.description}</p>
        <button class="watch-button" type="button"
          data-title="${movie.title}">
          View details
        </button>
      </div>
    </article>
  `).join("");

  count.textContent =
    `${filteredMovies.length} ${filteredMovies.length === 1 ? "title" : "titles"}`;

  emptyMessage.hidden = filteredMovies.length !== 0;
}

search.addEventListener("input", renderMovies);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;

    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    renderMovies();
  });
});


const videoSection = document.querySelector("#video-section");
const videoPlayer = document.querySelector("#video-player");
const videoTitle = document.querySelector("#video-title");

grid.addEventListener("click", (event) => {
  const button = event.target.closest(".watch-button");
  if (!button) return;

  const movie = movies.find(
    (item) => item.title === button.dataset.title
  );

  if (!movie) return;

  videoTitle.textContent = movie.title;
  videoPlayer.src = movie.video;
  videoSection.hidden = false;
  videoSection.scrollIntoView({ behavior: "smooth" });

  videoPlayer.play().catch(() => {
    // Agar browser playback rok de, user Play button daba sakta hai.
  });
});


renderMovies();
