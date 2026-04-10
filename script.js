const deals = [
  {
    title: "50% Off Wings",
    location: "Atlanta",
    description: "Only available on Tuesdays",
    link: "https://example.com"
  },
  {
    title: "$5 Movie Tickets",
    location: "Atlanta",
    description: "Discount day special",
    link: "https://example.com"
  },
  {
    title: "Gym Membership $10",
    location: "Atlanta",
    description: "Limited time promotion",
    link: "https://example.com"
  }
];

const container = document.getElementById("deals-container");
const searchInput = document.getElementById("search");

function displayDeals(filteredDeals) {
  container.innerHTML = "";

  filteredDeals.forEach(deal => {
    const div = document.createElement("div");
    div.className = "deal-card";

    div.innerHTML = `
      <h2>${deal.title}</h2>
      <p>${deal.description}</p>
      <p><strong>Location:</strong> ${deal.location}</p>
      <a href="${deal.link}" target="_blank">View Deal</a>
    `;

    container.appendChild(div);
  });
}

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  const filtered = deals.filter(deal =>
    deal.title.toLowerCase().includes(searchTerm) ||
    deal.description.toLowerCase().includes(searchTerm)
  );

  displayDeals(filtered);
});

displayDeals(deals);
