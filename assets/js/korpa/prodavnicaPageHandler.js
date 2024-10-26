import { getCartItemCount} from "./cartHandler.js"

document.addEventListener('DOMContentLoaded', (event) => {
    const korpaRef = document.getElementById('korpa');
    korpaRef.innerHTML = `Korpa: ${getCartItemCount()}`;
});