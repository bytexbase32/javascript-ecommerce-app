import { getProducts } from "./api.js";
import {addToCart} from "./storage.js";
import * as UI from "./ui.js";

// Get the query string (e.g., "?product=shoes&size=10")
const queryString = window.location.search;

// Parse it
const urlParams = new URLSearchParams(queryString);

// Extract a specific parameter value
const productId = parseInt(urlParams.get("id"));

let products = [];
let productDetails = null;

async function init() {
    try {
        products = await getProducts();

        if (products.length === 0) {
            document.querySelector("body").innerHTML =
                "<p>No products available.</p>";
            return;
        }

        productDetails = products.find((product) => productId === product.id);

        if (!productDetails) {
            document.getElementById("no-product").style.display = "block";
            document.getElementById("product-details").style.display = "none";
            return;
        }
        document.getElementById("no-product").style.display = "none";
        document.getElementById("product-image").src = productDetails.image;
        document.getElementById("product-image").alt = productDetails.title;
        document.getElementById("product-title").innerText =
            productDetails.title;
        document.getElementById("product-description").innerText =
            productDetails.description;
        document.getElementById("product-price").innerText =
            "$" + productDetails.price;
        document.getElementById("product-stock").innerText =
            "Stock " + productDetails.stock;
        document.getElementById("product-rating").innerText =
            "⭐ " + productDetails.rating;
        document.getElementById("product-category").innerText =
            productDetails.category;
        document.getElementById("add-to-cart").innerText = "Add to Cart";
        document
            .getElementById("add-to-cart")
            .addEventListener("click", (e) => {
                e.stopPropagation();
                addToCart(productDetails.id);
            });
        dispalyRelatedProducts(productDetails.category, productId);
    } catch (error) {
        console.log(error);
        document.querySelector("#product-details").innerHTML =
            "<p>Unable to load product.</p>";
    }
}

async function dispalyRelatedProducts(category, id) {
    let products = await getProducts();

    products = products.filter(
        (product) => product.category === category && product.id !== id,
    );
    const productsContainer = document.getElementById("related-products-grid");
    UI.renderProducts(productsContainer, products);
}

init();
