import { getProducts } from "./api.js";
import * as UI from "./ui.js";

const productsContainer = document.getElementById("grid-container");

const searchElement = document.querySelector("#search");
const filterElement = document.querySelector("#filter");

let products = [];

searchElement.addEventListener("input", async (e) => {
    try {
        if (e.target.value.trim() === "") {
            UI.renderProducts(productsContainer, products);
            return;
        }

        const searchedProducts = getMatching(e.target.value, products);

        if (searchedProducts.length === 0)
            productsContainer.innerHTML = "<p>No products found</p>";
        else {
            UI.renderProducts(productsContainer, searchedProducts);
        }
    } catch (e) {
        document.querySelector("#products").innerHTML =
            "<p>Unable to load products</p>";
    }
});

filterElement.addEventListener("change", (e) => {
    if (e.target.value === "all") {
        UI.renderProducts(productsContainer, products);
        return;
    }

    const filteredProducts = products.filter(
        (product) => product.category === e.target.value,
    );

    if (filteredProducts.length === 0)
        productsContainer.innerHTML = "<p> No product found </p>";
    else UI.renderProducts(productsContainer, filteredProducts);
});

function getMatching(match, products) {
    products = products.filter((product) => {
        return product.title.toLowerCase().includes(match.toLowerCase());
    });
    return products;
}

async function init() {
    try {
        products = await getProducts();

        if (products.length === 0) {
            productsContainer.innerHTML = "<p>No products available.</p>";
            return;
        }
        UI.renderProducts(productsContainer, products);
    } catch (error) {
        productsContainer.innerHTML = "<p>Unable to load products.</p>";
    }
}

init();
