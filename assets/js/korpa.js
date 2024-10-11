const articlePrices = {
    'livadski_med': { //mapping: kolicina -> cena
        '300g':400,
        '500g': 500,
        '1000g': 900
    }
}

const weight = document.getElementById('weightSelect') // Using value property
const type = document.getElementById('stateSelect') // Using value property
const numOfArticles = document.getElementById('quantity')

weight.addEventListener('change', updatePrice)
type.addEventListener('change', updatePrice)
numOfArticles.addEventListener('input', updatePrice)

function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split("/").pop(); // Get the last part of the path
    return page.replace('.html', ''); // Remove the .html extension
}

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
    const item = {
        "id": getCurrentPage(),
        "weight": weight.value,
        "type": type.value,
        "quantity": numOfArticles.value
    };

    addToCart(item);
    updateCartCount();
}

function updateCartCount() {
    // Retrieve the 'cards' data from localStorage
    const cardsData = localStorage.getItem('cart');
    // Parse the JSON string into an array (if it exists), otherwise create an empty array
    const cardsArray = cardsData ? JSON.parse(cardsData) : [];

    document.getElementById('korpa_button').innerHTML = `Korpa: ${cardsArray.length}`;
}

function getPrice() {
    return articlePrices[getCurrentPage()][weight.value] * quantity.value;
}

function updatePrice(){
    cena = document.getElementById('cena')
    cena.innerHTML = `Cena: ${getPrice()} RSD`
};

updateCartCount();

