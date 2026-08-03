import { getProducts } from "./api.js";
import {initCart} from "./storage.js";
import * as UI from "./ui.js";

const productsContainer = document.getElementById("grid-container");

const searchElement = document.querySelector("#search");
const filterElement = document.querySelector("#filter");
const sortElement = document.querySelector("#sort");

let products = [];

searchElement.addEventListener("input", updateProducts);

filterElement.addEventListener("change", updateProducts);

sortElement.addEventListener("change", updateProducts);

function updateProducts() {
    let userProducts = [...products];
    userProducts = searchProducts(searchElement.value.trim(), userProducts);
    userProducts = filterProducts(filterElement.value, userProducts);
    userProducts = sortProducts(sortElement.value, userProducts, userProducts);
    if (userProducts.length === 0)
        productsContainer.innerHTML = "<p>No products found</p>";
    else {
        UI.renderProducts(productsContainer, userProducts);
    }
}

function sortProducts(sortingMethod, products, defaultSorting) {
    if (sortingMethod === "default") return defaultSorting;

    if (sortingMethod === "price-asc")
        products.sort((product1, product2) => product1.price - product2.price);
    else if (sortingMethod === "price-desc")
        products.sort((product1, product2) => product2.price - product1.price);
    else if (sortingMethod === "rating")
        products.sort(
            (product1, product2) => product2.rating - product1.rating,
        );
    else if (sortingMethod === "nameAZ")
        products.sort((product1, product2) =>
            product1.title.localeCompare(product2.title),
        );
    return products;
}

function filterProducts(filterType, products) {
    if (filterType === "all") return products;

    const filteredProducts = products.filter(
        (product) => product.category === filterType,
    );

    return filteredProducts;
}

function searchProducts(itemTosearch, products) {
    if (itemTosearch === "") return products;
    return getMatching(itemTosearch, products);
}

function getMatching(match, products) {
    products = products.filter((product) => {
        return product.title.toLowerCase().includes(match.toLowerCase());
    });
    return products;
}

async function init() {
    try {
        initCart();
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
