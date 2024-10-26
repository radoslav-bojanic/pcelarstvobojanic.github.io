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

export function updateItemToCart(id, name, type, weight, quantity) {
  // Retrieve the existing cart or create an empty array if it doesn't exist
  let cart = JSON.parse(localStorage.getItem(CartName)) || [];

  // Find if the item already exists in the cart based on id
  const existingItemIndex = cart.findIndex(item => item.id === id);

  if (existingItemIndex !== -1) {
      // If the item exists, update its quantity or other properties
      cart[existingItemIndex].quantity = quantity;
      cart[existingItemIndex].name = name;
      cart[existingItemIndex].type = type;
      cart[existingItemIndex].weight = weight;
  } else {
      // If it doesn't exist, create a new item and add it to the cart
      const newItem = { id, name, type, weight, quantity };
      cart.push(newItem);
  }

  // Save the updated cart back to local storage
  localStorage.setItem(CartName, JSON.stringify(cart));
}

export function removeItemFromCart(id) {
  // Retrieve the existing cart or create an empty array if it doesn't exist
  let cart = JSON.parse(localStorage.getItem(CartName)) || [];

  // Filter out the item with the specified id
  cart = cart.filter(item => item.id !== id);

  // Save the updated cart back to local storage
  localStorage.setItem(CartName, JSON.stringify(cart));
}

export function readAllCartItems()
{
  return JSON.parse(localStorage.getItem(CartName)) || [];
}

export function getItemName(id)
{
  const cart = JSON.parse(localStorage.getItem(CartName)) || [];
  const item = cart.find(item => item.id === id);
  return item ? item.name : null; // or return "Item not found" for a message
}

export function getCartItem(id)
{
  const cart = JSON.parse(localStorage.getItem(CartName)) || [];
  const item = cart.find(item => item.id === id);
  return item ? item : null; // or return "Item not found" for a message
}