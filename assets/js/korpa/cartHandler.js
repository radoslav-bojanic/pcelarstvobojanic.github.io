import { CartName } from "./prodavnicaConfig.js"

export function getCartItemCount() {
    // Retrieve the cart from local storage, or use an empty array if it doesn't exist
    const cart = JSON.parse(localStorage.getItem(CartName)) || [];
    
    // Return the number of items in the cart
    return cart.length;
  }

export function addItemToCart(name, type, weight, quantity) {
    // Retrieve the existing cart or create an empty array if it doesn't exist
    let cart = JSON.parse(localStorage.getItem(CartName)) || [];
  
    // Create the new item as an object
    const newItem = { id: getCartItemCount(), name, type, weight, quantity };
  
    // Add the new item to the cart array
    cart.push(newItem);
  
    // Save the updated cart back to local storage
    localStorage.setItem(CartName, JSON.stringify(cart));
}