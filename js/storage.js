function addToCart(id) {
    let cart = loadCart();
    let exist = false;

    cart.forEach((element) => {
        if (element.id === id) {
            element.quantity += 1;
            exist = true;
        }
    });

    if (!exist) cart.push({ id: id, quantity: 1 });

    localStorage.setItem("vanillaStore", JSON.stringify(cart));
}

function initCart() {
    let cart = localStorage.getItem("vanillaStore");
    if (!cart) localStorage.setItem("vanillaStore", JSON.stringify([]));
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("vanillaStore"));
    return cart;
}


export {loadCart, addToCart, initCart };