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

function saveCustomDeals(deals) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
}

function getAllDeals() {
  return [...defaultDeals, ...getCustomDeals()];
}

function deleteCustomDeal(id) {
  const updated = getCustomDeals().filter((deal) => deal.id !== id);
  saveCustomDeals(updated);
  renderAdminDeals();
}

function renderAdminDeals() {
  const list = document.getElementById("admin-deals-list");
  const emptyState = document.getElementById("admin-empty-state");
  const countText = document.getElementById("admin-count-text");

  const allDeals = getAllDeals();

  countText.textContent =
    allDeals.length === 1 ? "1 total deal" : `${allDeals.length} total deals`;

  if (allDeals.length === 0) {
    list.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  list.innerHTML = allDeals.map((deal) => {
    return `
      <div class="admin-item">
        <div>
          <h3>${deal.title}</h3>
          <p><strong>Category:</strong> ${deal.category}</p>
          <p><strong>Place:</strong> ${deal.place}</p>
          <p><strong>Location:</strong> ${deal.location}</p>
          <p><strong>Expires:</strong> ${deal.expires}</p>
          <p><strong>Type:</strong> ${deal.custom ? "Custom" : "Default"}</p>
        </div>
        <div class="card-actions">
          ${deal.custom ? `<button class="delete-btn" onclick="deleteCustomDeal('${deal.id}')">Delete</button>` : ""}
        </div>
      </div>
    `;
  }).join("");
}

document.getElementById("reset-custom-btn").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  renderAdminDeals();
});

document.getElementById("reset-all-btn").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(FAVORITES_KEY);
  renderAdminDeals();
});

renderAdminDeals();
