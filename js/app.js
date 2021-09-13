// load product data
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <div class="single-product">
        <div class="my-3">
          <img class="product-image" src="${image}"></img>
        </div>
        <h3>${product.title}</h3>
        <p>Category: ${product.category}</p>
        <h5>Total ratings: ${product.rating.count}</h5>
        <h5>Average ratings: ${product.rating.rate}</h5>
        <h2>Price: $ ${product.price}</h2>
        <button onclick="addToCart(${product.id}, ${product.price})" id="addToCart-btn" class="buy-now btn btn-info text-white fw-medium">add to cart</button>
        <button id="details-btn" class="btn btn-dark" onclick="displayModal(${product.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
      </div>
    `;
    document.getElementById("all-products").appendChild(div);
  }
};

const displayModal = productId => {
  const url = `https://fakestoreapi.com/products/${productId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.getElementById('exampleModalLabel').innerText = `${data.title}`;
      document.getElementById('modal-body').innerText = `${data.description}`;
  });
}

// add to the cart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  document.getElementById("total-Products").innerText = count;
  
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
};

// getInputvalue
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const previousPrice = getInputValue(id);
  const newPrice = parseFloat(value);
  const total = previousPrice + newPrice;
  document.getElementById(id).innerText = parseFloat(total.toFixed(2));
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
};
