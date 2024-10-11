// Adding an item to the cart
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Retrieving items from the cart
function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function addToCartButtonClicked()
{
    const weight = document.getElementById('weightSelect').value; // Using value property
    const type = document.getElementById('stateSelect').value; // Using value property
}