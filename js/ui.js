import {addToCart, loadCart} from "./storage.js";

function updateCartCount(cartElement) {
    let cart = loadCart();

    let count = 0;
    cart.forEach(element => {
        count += element.quantity;
    });

    cartElement.innerText = count;
}

function renderProducts(productsContainer, products) {
    if (products.length <= 0) return;
    productsContainer.innerHTML = "";
    products.forEach((product) => {
        productsContainer.appendChild(createProduct(product));
    });
}

function createProduct(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("product");

    productCard.addEventListener("click", e => {
        location.href = `product.html?id=${product.id}`;
    });
    
    const productImage = document.createElement("img");
    productImage.classList.add("product-image");
    productImage.src = product.image;
    productImage.alt = `${product.title} image`;

    const productTitle = document.createElement("p");
    productTitle.classList.add("product-title");
    productTitle.innerText = product.title;

    const productDescription = document.createElement("p");
    productDescription.classList.add("product-description");
    productDescription.innerText = product.description;

    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    const productPrice = document.createElement("span");
    productPrice.classList.add("product-price");
    productPrice.innerText = `$${product.price}`;

    const productStock = document.createElement("span");
    productStock.classList.add("product-stock");
    productStock.innerText = `Stock ${product.stock}`;

    const productRating = document.createElement("span");
    productRating.classList.add("product-rating");
    productRating.innerText = `⭐ ${product.rating}`;

    productInfo.append(productPrice, productStock, productRating);

    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("add-to-cart");
    addToCartButton.innerText = "Add to cart";

    addToCartButton.addEventListener("click", e => {
        e.stopPropagation();
        addToCart(product.id);
        const cartElement = document.querySelector("#cart-count");
        updateCartCount(cartElement);
    });

    productCard.appendChild(productImage);
    productCard.appendChild(productTitle);
    productCard.appendChild(productDescription);
    productCard.appendChild(productInfo);
    productCard.appendChild(addToCartButton);

    return productCard;
}

export { createProduct, renderProducts, updateCartCount };
