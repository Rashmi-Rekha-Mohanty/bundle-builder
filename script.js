const products = [
  { id: 1, title: "Product 1", price: 10.0, image: "assets/product-1.jpg" },
  { id: 2, title: "Product 2", price: 15.0, image: "assets/product-2.jpg" },
  { id: 3, title: "Product 3", price: 20.0, image: "assets/product-1.jpg" },
  { id: 4, title: "Product 4", price: 25.0, image: "assets/product-2.jpg" },
  { id: 5, title: "Product 5", price: 30.0, image: "assets/product-1.jpg" },
  { id: 6, title: "Product 6", price: 35.0, image: "assets/product-2.jpg" },
];

const productGrid = document.getElementById("productGrid");
const bundleList = document.getElementById("bundleList");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const subtotalText = document.getElementById("subtotal");
const ctaButton = document.getElementById("ctaButton");
const discountText = document.getElementById("discountText");

let selected = [];

function updateUI() {
  bundleList.innerHTML = "";
  let subtotal = selected.reduce((acc, id) => acc + products.find(p => p.id === id).price, 0);
  const discount = selected.length >= 3 ? 0.3 * subtotal : 0;
  const total = subtotal - discount;

  progressBar.style.width = `${(selected.length / 3) * 100}%`;
  progressText.textContent = `${selected.length}/3 added`;
  subtotalText.textContent = total.toFixed(2);
  discountText.textContent = discount > 0 ? "30% Discount Applied!" : "";

  selected.forEach(id => {
    const product = products.find(p => p.id === id);
    const item = document.createElement("li");
    item.textContent = `${product.title} - $${product.price}`;
    bundleList.appendChild(item);
  });

  ctaButton.disabled = selected.length < 3;
}

products.forEach(product => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}" width="100"/>
    <h4>${product.title}</h4>
    <p>$${product.price}</p>
    <button id="toggle-${product.id}">Add to Bundle</button>
  `;
  productGrid.appendChild(card);

  document.getElementById(`toggle-${product.id}`).addEventListener("click", () => {
    if (selected.includes(product.id)) {
      selected = selected.filter(id => id !== product.id);
      card.querySelector("button").textContent = "Add to Bundle";
    } else {
      selected.push(product.id);
      card.querySelector("button").textContent = "Remove";
    }
    updateUI();
  });
});

ctaButton.addEventListener("click", () => {
  console.log("Selected bundle:", selected.map(id => products.find(p => p.id === id)));
});
