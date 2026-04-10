const STORAGE_KEY = "atlDealsCustomDeals";
const FAVORITES_KEY = "atlDealsFavorites";

const defaultDeals = [
  {
    id: "deal-1",
    title: "50% Off Wings",
    category: "Food",
    location: "Atlanta",
    place: "Wing House",
    description: "Only available on Tuesdays. Great for a cheap dinner with friends.",
    expires: "Tuesday only",
    featured: true,
    link: "https://example.com",
    custom: false
  },
  {
    id: "deal-2",
    title: "$5 Movie Tickets",
    category: "Entertainment",
    location: "Atlanta",
    place: "Local Theater",
    description: "Discount day special for select showtimes.",
    expires: "This week",
    featured: false,
    link: "https://example.com",
    custom: false
  },
  {
    id: "deal-3",
    title: "Gym Membership $10",
    category: "Fitness",
    location: "Atlanta",
    place: "Fit Zone",
    description: "Limited time promotion for new members.",
    expires: "Ends soon",
    featured: false,
    link: "https://example.com",
    custom: false
  },
  {
    id: "deal-4",
    title: "Buy 1 Get 1 Boba",
    category: "Food",
    location: "Atlanta",
    place: "Tea Spot",
    description: "Buy one drink and get another free after 5 PM.",
    expires: "Today",
    featured: true,
    link: "https://example.com",
    custom: false
  },
  {
    id: "deal-5",
    title: "20% Off Sneakers",
    category: "Shopping",
    location: "Atlanta",
    place: "Sneaker Corner",
    description: "Save on select shoe styles this weekend.",
    expires: "Weekend only",
    featured: false,
    link: "https://example.com",
    custom: false
  },
  {
    id: "deal-6",
    title: "Escape Room Group Discount",
    category: "Entertainment",
    location: "Atlanta",
    place: "Puzzle Rooms ATL",
    description: "Bring 4 or more people and get a lower price per person.",
    expires: "This month",
    featured: false,
    link: "https://example.com",
    custom: false
  }
];

function getCustomDeals() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function getAllDeals() {
  return [...defaultDeals, ...getCustomDeals()];
}

function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  const exists = favorites.includes(id);

  const updated = exists
    ? favorites.filter((favId) => favId !== id)
    : [...favorites, id];

  saveFavorites(updated);
  renderDealsPage();
}

function createDealCard(deal) {
  const favorites = getFavorites();
  const isFavorite = favorites.includes(deal.id);

  return `
    <article class="deal-card">
      <div class="card-top">
        <div>
          <h3 class="deal-title">${deal.title}</h3>
          <div class="meta">
            <span class="meta-tag">${deal.category}</span>
            <span class="meta-tag">${deal.place}</span>
            <span class="meta-tag">${deal.location}</span>
          </div>
        </div>
        <span class="badge ${deal.featured ? "featured" : ""}">
          ${deal.featured ? "Featured" : "Deal"}
        </span>
      </div>

      <p class="description">${deal.description}</p>

      <div class="card-bottom">
        <span class="expire-text">Expires: ${deal.expires}</span>
        <div class="card-actions">
          <button class="favorite-btn" onclick="toggleFavorite('${deal.id}')">
            ${isFavorite ? "★ Favorited" : "☆ Favorite"}
          </button>
          <a class="deal-link" href="${deal.link || "#"}" target="_blank">View Deal</a>
        </div>
      </div>
    </article>
  `;
}

function renderHomePage() {
  const featuredGrid = document.getElementById("featured-deals-grid");
  const totalDealsEl = document.getElementById("home-total-deals");
  const featuredDealsEl = document.getElementById("home-featured-deals");

  if (!featuredGrid) return;

  const deals = getAllDeals();
  const featuredDeals = deals.filter((deal) => deal.featured).slice(0, 4);

  totalDealsEl.textContent = deals.length;
  featuredDealsEl.textContent = featuredDeals.length;

  featuredGrid.innerHTML = featuredDeals.map(createDealCard).join("");
}

function renderDealsPage() {
  const dealsGrid = document.getElementById("deals-grid");
  if (!dealsGrid) return;

  const searchInput = document.getElementById("search");
  const categoryFilter = document.getElementById("category-filter");
  const sortFilter = document.getElementById("sort-filter");
  const viewFilter = document.getElementById("view-filter");
  const resultsText = document.getElementById("results-text");
  const emptyState = document.getElementById("empty-state");
  const chips = document.querySelectorAll(".chip");

  const allDeals = getAllDeals();
  const favorites = getFavorites();

  const searchTerm = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;
  const sort = sortFilter.value;
  const view = viewFilter.value;

  let filtered = allDeals.filter((deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchTerm) ||
      deal.description.toLowerCase().includes(searchTerm) ||
      deal.place.toLowerCase().includes(searchTerm) ||
      deal.category.toLowerCase().includes(searchTerm);

    const matchesCategory = category === "all" || deal.category === category;
    const matchesView = view === "all" || favorites.includes(deal.id);

    return matchesSearch && matchesCategory && matchesView;
  });

  if (sort === "title-asc") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "title-desc") {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sort === "featured-first") {
    filtered.sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  dealsGrid.innerHTML = filtered.map(createDealCard).join("");
  resultsText.textContent =
    filtered.length === 1 ? "Showing 1 deal" : `Showing ${filtered.length} deals`;

  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  chips.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.category === category);
  });
}

function setupDealsPageEvents() {
  const searchInput = document.getElementById("search");
  const categoryFilter = document.getElementById("category-filter");
  const sortFilter = document.getElementById("sort-filter");
  const viewFilter = document.getElementById("view-filter");
  const clearFavoritesBtn = document.getElementById("clear-favorites-btn");
  const chips = document.querySelectorAll(".chip");

  if (!searchInput) return;

  searchInput.addEventListener("input", renderDealsPage);
  categoryFilter.addEventListener("change", renderDealsPage);
  sortFilter.addEventListener("change", renderDealsPage);
  viewFilter.addEventListener("change", renderDealsPage);

  clearFavoritesBtn.addEventListener("click", () => {
    localStorage.removeItem(FAVORITES_KEY);
    renderDealsPage();
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      categoryFilter.value = chip.dataset.category;
      renderDealsPage();
    });
  });
}

renderHomePage();
setupDealsPageEvents();
renderDealsPage();
