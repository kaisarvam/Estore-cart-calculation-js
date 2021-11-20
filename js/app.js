const modalDiv = document.getElementById('modal-id');
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// =============Loading Single product for Modal create =================
const loadSingleProduct = (id)=>{
  fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json=>createModal(json))
}

const createModal = (data)=>{
  console.log(data);
  modalDiv.innerHTML =`
  
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">${data.title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center m-2">
      <img src=${data.image} class="card-img-top" style="width:400px; height:400px;" alt="...">
        <p>price : $ ${data.price}</p>
        <p>${data.description}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Proceed</button>
      </div>
    </div>
  `; 
}

function printStar(s) {
  var x = ` `;
  for(let i=0;i<s;i++){
  x = x + `<i class="fas fa-star text-warning"></i>`; 
  }
  for(let z=0;z<(5-s);z++){
  x = x +`<i class="far fa-star text-warning"></i>`;
  }
 return x;
};
  


//================ show all product in UI ====================
const showProducts = (products) => {
  console.log("products : ",typeof(products) ,products);
  for (const product of products) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product","rounded","m-2","color-blue");
    div.innerHTML = `<div class="card m-3 align-items-center p-3 text-dark " style="height:700px">
    <img src=${image} class="card-img-top" style="width:320px; height:320px;" alt="...">
    <div class="card-body">
      <h5 class="card-title">${product.title}</h5>
      <p class="card-text"><span class="fw-bolder">Category : </span> ${product.category}</p>
      <h3>Price: $ ${product.price}</h3>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item fw-bolder">Total rating : <span class="text-success fw-bold">${product.rating.count} </span> <i class="fas fa-user-alt"></i> </li>
      <li class="list-group-item fw-bolder ">Avarage rating : ${printStar(Math.round(product.rating.rate))}  (${product.rating.rate}) </li>
    </ul>
    <div class="card-footer">
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn color-yellow ">Add to cart</button>
        <button id="details-btn" class="btn color-red " onClick="loadSingleProduct(${product.id})"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
    </div>
  </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;


// =================== Add to cart function ===========================

const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};


// ========================= returning update value function ==================
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = Number(element);
  return converted;
};

//=================== main price update function ============================
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = Number(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Number(total).toFixed(2);
};

// ================ set innerText function ===================
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Number(value).toFixed(2);
};

//================= update delivery charge and total Tax =========================
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

// ======================= grandTotal update function ==============================
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
