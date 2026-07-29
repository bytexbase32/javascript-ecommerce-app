import { getProducts } from "./api.js";
import { createProduct } from "./ui.js";

const productsContainer = document.getElementById("grid-container");

async function init() {
    try {
        const products = await getProducts();

        if (products.length === 0) {
            productsContainer.innerHTML = "<p>No products available.</p>";
            return;
        }

        products.forEach((product) => {
            productsContainer.appendChild(createProduct(product));
        });
    } catch (error) {
        productsContainer.innerHTML = "<p>Unable to load products.</p>";
    }
}

init();
