import { loadCart } from "./storage.js";
import { getProducts } from "./api.js";
import * as UI from "./ui.js";

async function displayCartItems() {
    let cart = loadCart();
    if (cart.length === 0) {
        document.querySelector("#empty-cart-message").style.display = "block";
        document.querySelector("#cart-summary").style.display = "none";
        return;
    }
    document.querySelector("#empty-cart-message").style.display = "none";

    let products = await getProducts();

    let cartProducts = products.filter((product) => {
        for (let item of cart) {
            if (product.id === item.id) return true;
        }
        return false;
    });

    cartProducts = cartProducts.map((product) => {
        const item = cart.find((item) => item.id === product.id);
        return {
            product,
            quantity: item.quantity,
        };
    });

    const cartItems = document.querySelector("#cart-items");
    cartItems.innerHTML = "";
    cartProducts.forEach((item) => {
        cartItems.appendChild(createCartItem(item.product, item.quantity));
    });

    const itemsElement = document.querySelector("#summary-items");
    const subTotalElement = document.querySelector("#summary-subtotal");
    const totalElement = document.querySelector("#summary-total");

    let items = 0;
    let subtotal = 0;
    cartProducts.forEach((item) => {
        items += item.quantity;
        subtotal += item.quantity * item.product.price;
    });
    itemsElement.innerText = items;
    subTotalElement.innerText = `$${subtotal}`;
    totalElement.innerText = `$${subtotal}`;
    document.querySelector("#cart-summary").style.display = "block";
}

function createCartItem(product, quantity) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const cartImage = document.createElement("img");
    cartImage.classList.add("cart-image");
    cartImage.src = product.image;
    cartImage.alt = product.title;

    const cartInfo = document.createElement("div");
    cartInfo.classList.add("cart-info");

    const cartTitle = document.createElement("h3");
    cartTitle.classList.add("cart-title");
    cartTitle.innerText = product.title;

    const cartCategory = document.createElement("p");
    cartCategory.classList.add("cart-category");
    cartCategory.innerText = product.category;

    const cartPrice = document.createElement("p");
    cartPrice.classList.add("cart-price");
    cartPrice.innerText = `$${product.price}`;

    cartInfo.appendChild(cartTitle);
    cartInfo.appendChild(cartCategory);
    cartInfo.appendChild(cartPrice);

    const cartQuantity = document.createElement("div");
    cartQuantity.classList.add("cart-quantity");
    cartQuantity.innerText = `Quantity: ${quantity}`;

    const cartTotal = document.createElement("div");
    cartTotal.classList.add("cart-total");
    cartTotal.innerText = `$${product.price * quantity}`;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.innerText = "Remove";

    cartItem.appendChild(cartImage);
    cartItem.appendChild(cartInfo);
    cartItem.appendChild(cartQuantity);
    cartItem.appendChild(cartTotal);
    cartItem.appendChild(removeBtn);

    return cartItem;
}

async function init() {
    await displayCartItems();
    const cartElement = document.querySelector("#cart-count");
    UI.updateCartCount(cartElement);
}

init();
