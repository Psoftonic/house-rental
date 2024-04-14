//VARIABLES
const productsContainer = document.querySelector('.products-container');
const cartContainer = document.querySelector('.cart-container');
const itemsTotal = document.querySelector('.total-items');
const priceTotal = document.querySelector('.total-price');
const checkout = document.querySelector('.checkout');
const cartCount = document.querySelector('.cart-count');

//RENDER PRODUCTS
function renderProducts() {
  productsArray.map((productItem) => {
    productsContainer.innerHTML += `
      <div class="product">
        <img src=${productItem.img} />
        <h3 class="product-name">${productItem.name}</h3>
        <p class="product-desc">${productItem.desc}</p>
        <small class="product-price">$${productItem.price}</small>
        <div class="cart-btn" onclick="addToCart(${productItem.id})"><i class="fa fa-shopping-cart"></i></div>
      </div>`;
  });
}

renderProducts();

//ADD ITEMS TO THE CART
//create empty cart array
let cart = JSON.parse(localStorage.getItem('CART')) || [];
updateCart();
function addToCart(id) {
  //find if item existed in the cart
  if (cart.some((item) => item.id === id)) {
    //increase number of product quantity
    addCartButtons(id, 'plus');
  } else {
    const item = productsArray.find((item) => item.id === id);
    cart.push({
      ...item,
      quantity: 1,
    });
  }
  //update the cart
  updateCart();
}
//UPDATING CART
function updateCart() {
  cartItemsProduct();
  renderSubtotal();
  //SAVE ITEMS TO THE LOCAL STORAGE
  localStorage.setItem('CART', JSON.stringify(cart));
}
//CART ITEMS PRODUCT
function cartItemsProduct() {
  cartContainer.innerHTML = '';
  cart.map((item) => {
    //RENDER CART
    cartContainer.innerHTML += `
      <div class="cart-box">
        <div class="cart-item" onclick="removeItemsFromCart(${item.id})">
        <img src=${item.img} alt="" width="100" />
        <h4 class="cart-name">${item.name}</h4>
        </div>
        <!----UNIT PRICE---->
        <small class="cart-price">$${item.price}</small>
        <!----UNITS---->
        <div class="cart-units">
        <span class="left-btn" onclick="addCartButtons(${item.id}, 'minus')"><i class="fa fa-minus"></i></span>
        <small class="quantity">${item.quantity}</small>
        <span class="right-btn" onclick="addCartButtons(${item.id}, 'plus')"><i class="fa fa-plus"></i></span>
        </div>
      </div>`;
  });
}

//RENDER SUBTOTAL
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;
  cart.map((item) => {
    totalPrice += item.quantity * item.price;
    totalItems += item.quantity;
  });
  priceTotal.innerHTML = `$${totalPrice.toFixed(2)}`;
  itemsTotal.innerHTML = `(${totalItems} Items)`;
  //cart count button
  cartCount.innerHTML = `${totalItems}`;
}
//REMOVE ITEMS FROM CART
function removeItemsFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}
//CHECKOUT BUTTON
checkout.addEventListener('click', function () {
  let totalPrice = 0,
    totalItems = 0;
  cart.map((item) => {
    totalPrice += item.quantity * item.price;
    totalItems += item.quantity;
  });

  alert(
    `Total Items = ${totalItems}:\nTotal Price = $${totalPrice.toFixed(
      2
    )}:\nPurchase Product :)`
  );
});

//ADD CART BUTTONS
function addCartButtons(id, action) {
  cart = cart.map((item) => {
    let quantity = item.quantity;
    if (item.id === id) {
      if (action === 'plus' && quantity < item.instock) {
        quantity++;
      } else if (action === 'minus' && quantity > 1) {
        quantity--;
      }
    }
    return {
      ...item,
      quantity,
    };
  });
  updateCart();
}
