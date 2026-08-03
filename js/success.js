import { initCart } from "./storage.js";
import * as UI from "./ui.js";

initCart();
UI.updateCartCount(document.querySelector("#cart-count"));