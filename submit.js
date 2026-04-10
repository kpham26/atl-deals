const STORAGE_KEY = "atlDealsCustomDeals";

function getCustomDeals() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveCustomDeals(deals) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
}

const form = document.getElementById("submit-deal-form");
const messageEl = document.getElementById("submit-message");
const resetBtn = document.getElementById("reset-form-btn");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newDeal = {
    id: `custom-${Date.now()}`,
    title: document.getElementById("title").value.trim(),
    category: document.getElementById("category").value,
    place: document.getElementById("place").value.trim(),
    location: document.getElementById("location").value.trim(),
    expires: document.getElementById("expires").value.trim(),
    link: document.getElementById("link").value.trim() || "#",
    description: document.getElementById("description").value.trim(),
    featured: document.getElementById("featured").checked,
    custom: true
  };

  const customDeals = getCustomDeals();
  customDeals.push(newDeal);
  saveCustomDeals(customDeals);

  form.reset();
  document.getElementById("location").value = "Atlanta";
  messageEl.textContent = "Deal added successfully. Go to Browse Deals to see it.";
});

resetBtn.addEventListener("click", () => {
  form.reset();
  document.getElementById("location").value = "Atlanta";
  messageEl.textContent = "";
});
