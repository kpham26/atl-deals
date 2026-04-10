const deals = [
  {
    title: "50% Off Wings",
    category: "Food",
    location: "Atlanta",
    place: "Wing House",
    description: "Only available on Tuesdays. Great for a cheap dinner with friends.",
    expires: "Tuesday only",
    featured: true,
    link: "#"
  },
  {
    title: "$5 Movie Tickets",
    category: "Entertainment",
    location: "Atlanta",
    place: "Local Theater",
    description: "Discount day special for select showtimes.",
    expires: "This week",
    featured: false,
    link: "#"
  },
  {
    title: "Gym Membership $10",
    category: "Fitness",
    location: "Atlanta",
    place: "Fit Zone",
    description: "Limited time promotion for new members.",
    expires: "Ends soon",
    featured: false,
    link: "#"
  },
  {
    title: "Buy 1 Get 1 Boba",
    category: "Food",
    location: "Atlanta",
    place: "Tea Spot",
    description: "Buy one drink and get another free after 5 PM.",
    expires: "Today",
    featured: true,
    link: "#"
  },
  {
    title: "20% Off Sneakers",
    category: "Shopping",
    location: "Atlanta",
    place: "Sneaker Corner",
    description: "Save on select shoe styles this weekend.",
    expires: "Weekend only",
    featured: false,
    link: "#"
  },
  {
    title: "Escape Room Group Discount",
    category: "Entertainment",
    location: "Atlanta",
    place: "Puzzle Rooms ATL",
    description: "Bring 4 or more people and get a lower price per person.",
    expires: "This month",
    featured: false,
    link: "#"
  }
];

const container = document.getElementById("deals-container");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("category-filter");
const sortFilter = document.getElementById("sort-filter");
const resultsText = document.getElementById("results-text");
const dealCount = document.getElementById("deal-count");
const emptyState = document.getElementById("empty-state");
const chips = document.querySelectorAll(".chip");

dealCount.textContent = deals.length;

function createDealCard(deal) {
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
        <a class="deal-link" href="${deal.link}" target="_blank">View Deal</a>
      </div>
    </article>
  `;
}

function getFilteredDeals() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;
  const sort = sortFilter.value;

  let filtered = deals.filter((deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchTerm) ||
      deal.description.toLowerCase().includes(searchTerm) ||
      deal.place.toLowerCase().includes(searchTerm) ||
      deal.category.toLowerCase().includes(searchTerm);

    const matchesCategory =
      category === "all" || deal.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sort === "title-asc") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "title-desc") {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  }

  return filtered;
}

function renderDeals() {
  const filteredDeals = getFilteredDeals();

  container.innerHTML = filteredDeals.map(createDealCard).join("");

  resultsText.textContent =
    filteredDeals.length === 1
      ? "Showing 1 deal"
      : `Showing ${filteredDeals.length} deals`;

  if (filteredDeals.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
}

function setCategory(category) {
  categoryFilter.value = category;

  chips.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.category === category);
  });

  renderDeals();
}

searchInput.addEventListener("input", renderDeals);
categoryFilter.addEventListener("change", () => {
  chips.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.category === categoryFilter.value);
  });
  renderDeals();
});
sortFilter.addEventListener("change", renderDeals);

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    setCategory(chip.dataset.category);
  });
});

renderDeals();
