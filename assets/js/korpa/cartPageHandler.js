import { singleItem } from "./singleItem.js"
import { getCurrentPageName } from "./prodavnicaConfig.js"
import { getCartItemCount, updateItemToCart, removeItemFromCart, readAllCartItems, getItemName, getCartItem} from "./cartHandler.js"

const firebaseConfig = {
    apiKey: "AIzaSyB-bQxxyN3bekbN17l80A7dyA9ycIP5VZc",
    authDomain: "pcelarstvobojanicproject.firebaseapp.com",
    databaseURL: "https://pcelarstvobojanicproject-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pcelarstvobojanicproject",
    storageBucket: "pcelarstvobojanicproject.appspot.com",
    messagingSenderId: "297939220343",
    appId: "1:297939220343:web:6a1436eb101e1e49be5372"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

function constructItemHtml(item)
{
    const currentItem = new singleItem(item['name']);
    const singleItemDiv = `
    <div class="row" id="item_div_${item['id']}">
        <section class="col-2 col-3-narrower col-5-mobilep">
            <a href="#" class="image fit"><img id='productImage_${item['id']}' class='productImage' src='${currentItem.getImagePath()}' alt="" /></a>
        </section>
        <section class="col-8 col-6-narrower">
            <div class="row aln-bottom">
            <section class="col-3 col-4-narrower" id="weight_section_${item['id']}">
            </section>
            <section class="col-3 col-6-narrower" id="type_section_${item['id']}">
            </section>
            <section class="col-3 col-3-narrower">
                <label class="select-label">Količina</label>
                <input class="number-input" type="number" id="quantity_${item['id']}" name="quantity" min="1" max="99" value="1" />
            </section>
            <section class="col-3 col-6-narrower">
                <a class="button" id="delete_item_${item['id']}">Obriši</a>
            </section>
            </div>
        </section>
        </div>`;

    return singleItemDiv;
}

function updateSelectBoxVariant(item)
{
    const cartItem = getCartItem(item.id);
    const currentItem = new singleItem(item['name']);
    if(currentItem.variantsExist())
    {
        const sectionRef = document.getElementById(`type_section_${item['id']}`);
        const selectRef = document.createElement('select');
        selectRef.id = `typeSelect_${item['id']}`;

        const labelRef = document.createElement('label');
        labelRef.className = 'select-label';
        labelRef.textContent = 'Tip';

        var types = currentItem.getItemVariants();

        
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.text = type;
            if(cartItem.type === type)
            {
                option.selected = true; // Set the selected option
            }
            selectRef.appendChild(option);
        })

        
        sectionRef.appendChild(labelRef);
        sectionRef.appendChild(selectRef);
    }

}

function updateSelectBoxWeight(item) {
    const cartItem = getCartItem(item.id);
    const currentItem = new singleItem(item['name']);
    let weights = null;
    let variant = null;
    const sectionRef = document.getElementById(`weight_section_${item['id']}`);

    // Check if the section exists
    if (!sectionRef) {
        console.error(`Section with ID weight_section_${item['id']} does not exist.`);
        return; // Exit if the section doesn't exist
    }

    // Remove existing label and select elements if they exist
    const existingLabel = sectionRef.querySelector('.select-label');
    const existingSelect = sectionRef.querySelector(`select[id^="weightSelect_${item['id']}"]`);

    if (existingLabel) {
        sectionRef.removeChild(existingLabel);
    }
    if (existingSelect) {
        sectionRef.removeChild(existingSelect);
    }

    // Create the new select element
    const selectRef = document.createElement('select');
    selectRef.id = `weightSelect_${item['id']}`;

    // Create and append the label
    const labelRef = document.createElement('label');
    labelRef.className = 'select-label';
    labelRef.textContent = 'Težina';

    // Determine variant if needed
    if (currentItem.isVariantDependent()) {
        const typeRef = document.getElementById(`typeSelect_${item['id']}`);
        variant = typeRef ? typeRef.value : null; // Ensure typeRef exists
    }

    // Get the weights for the current item
    weights = currentItem.getItemWeights(variant);
    
    // Populate the select element with options
    if (weights && weights.length > 0) {
        weights.forEach(weight => {
            const option = document.createElement('option');
            option.value = weight;
            option.textContent = weight; // Using textContent instead of text
            if(cartItem.weight == weight)
            {
                option.selected = true;
            }
            selectRef.appendChild(option);
        });
    } else {
        // Optionally handle the case when there are no weights
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No weights available';
        selectRef.appendChild(option);
    }

    // Append the label and select to the section
    sectionRef.appendChild(labelRef);
    sectionRef.appendChild(selectRef);
}

function loadCartItemsToPage()
{
    const cartContent = readAllCartItems();
    cartContent.forEach(item => {
        const currentItem = new singleItem(item['name']);
        const productContainerRef = document.getElementById('productContainer');
        
        var itemDiv = constructItemHtml(item);
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = itemDiv.trim();
        const newChild = tempContainer.firstChild
        newChild.style.margin = '3px';
        productContainerRef.appendChild(newChild);
        updateSelectBoxVariant(item);
        updateSelectBoxWeight(item);

        const typeRef = document.getElementById(`typeSelect_${item['id']}`);
        const weightRef = document.getElementById(`weightSelect_${item['id']}`);
        const quantityRef = document.getElementById(`quantity_${item['id']}`);
        const deleteItemButtonRef = document.getElementById(`delete_item_${item['id']}`);

        quantityRef.value = item.quantity;

        if(typeRef)
        {
            typeRef.addEventListener("change", (event) => handleChange(item['id'], 'type'));
        }
        weightRef.addEventListener("change", (event) => handleChange(item['id'], 'weight'));
        quantityRef.addEventListener("input", (event) => handleChange(item['id'], 'quantity'));
        if (deleteItemButtonRef) { // Check if the button exists
            deleteItemButtonRef.addEventListener('click', function() {
                handleDeleteItem(item['id']); // Call your delete function with item ID
            });
        }
    });
}

function handleDeleteItem(itemId) {
    // Your logic to delete the item from the cart or perform any action
    const itemDivRef = document.getElementById(`item_div_${itemId}`);
    if (itemDivRef) {
        itemDivRef.remove(); // Remove the element from the DOM
    }
    removeItemFromCart(itemId);
    // Example: removeItemFromCart(itemId); // Call a function to remove the item
}

function emptyCart()
{
    const cart = readAllCartItems();
    cart.forEach(item => {
        handleDeleteItem(item.id);
    });
}

/* Listener for cart changes */
function handleChange(itemId, changedElement) {
    
    const currentItem = new singleItem(getItemName(itemId));


    // update weight options for variant dependent items */
    if(changedElement === 'type' && currentItem.isVariantDependent())
    {
        const newItem = 
        {
            id: itemId,
            name: getItemName(itemId)
        }
        updateSelectBoxWeight(newItem);
        const weightRef = document.getElementById(`weightSelect_${itemId}`);
        weightRef.addEventListener("change", (event) => handleChange(itemId, 'weight'));
    }

    const typeSelectRef = document.getElementById(`typeSelect_${itemId}`);
    const weightSelectRef = document.getElementById(`weightSelect_${itemId}`);
    const quantityRef = document.getElementById(`quantity_${itemId}`);

    const item = 
    {
        id: itemId,
        name: getItemName(itemId),
        type: typeSelectRef ? typeSelectRef.value : null,
        weight: weightSelectRef.value,
        quantity: quantityRef.value
    };

    updateItemToCart(
        item.id,
        item.name,
        item.type,
        item.weight,
        item.quantity
    );

    updateTotalPrice();
}

function writeOrderToFirebase(orderText) {
    // Create a unique key for the new order
    const sanitizedDate = orderText.date
        .replace(/\s+/g, '_')   // Replace spaces with underscores
        .replace(/[.,#$/[\]]/g, ''); // Remove invalid characters
    const orderKey = `${orderText.ime}_${sanitizedDate}`;

    // Return a Promise for the asynchronous operation
    return firebase.database().ref('orders/' + orderKey).set(orderText)
        .then(() => {
            console.log("Order saved successfully!");
            return true; // Optional: you can return a value if needed
        })
        .catch((error) => {
            console.error("Error saving order: ", error);
            throw error; // Re-throw the error to handle it in placeOrder
        });
}

function placeOrder()
{
    const cart = readAllCartItems();

    // Access each input field by its ID and get its value
    const ime = document.getElementById('ime').value;
    const prezime = document.getElementById('prezime').value;
    const grad = document.getElementById('grad').value;
    const postNumber = document.getElementById('post_number').value;
    const adresa = document.getElementById('adresa').value;
    const email = document.getElementById('email_for_order').value;
    const napomena = document.getElementById('napomena').value;

    const currentDateTime = new Date();
    // Format the date and time
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false // Set to true for 12-hour format
    };
    const formattedDateTime = currentDateTime.toLocaleString('sr-RS', options); // Serbian locale

    // Check for empty fields
    if (!ime || !prezime || !grad || !postNumber || !adresa || !email || !napomena) {
        alert("Sva polja moraju biti popunjena!"); // Alert for empty fields
        return;
    }

    // Check if email contains '@'
    if (!email.includes('@')) {
        alert("E-mail mora sadržati '@'!"); // Alert for invalid email
        return;
    }

    const orderText = 
    {
        date: formattedDateTime,
        ime,
        prezime,
        grad,
        postNumber,
        adresa,
        email,
        napomena,
        orderContent: cart,
        totalPrice: updateTotalPrice(),
        orderProcessed: false,
    };

    writeOrderToFirebase(orderText)
        .then(() => {
            // Redirect to another page after the order is successfully written to Firebase
            emptyCart();
            window.location.href = 'porudzbina_primljena.html'; // Replace with your target page
        })
        .catch(error => {
            console.error("Error writing order to Firebase:", error);
            alert("Došlo je do greške prilikom obrade porudžbine. Pokušajte ponovo."); // Alert for errors
        });
}

function updateTotalPrice()
{
    const cart = readAllCartItems();
    var price = 0;
    cart.forEach(item =>
    {
        const currentItem = new singleItem(item.name);
        const typeRef = document.getElementById(`typeSelect_${item.id}`);
        const weightRef = document.getElementById(`weightSelect_${item.id}`);
        const quantityRef = document.getElementById(`quantity_${item.id}`);
    
        const type = typeRef ? typeRef.value : null;
        const weight = weightRef ? weightRef.value : null;
        const tempItem = {
            'type': type,
            'weight': weight
        }
    
            
        price += currentItem.getItemPrice(tempItem) * quantityRef.value;
    })

    const totalPriceRef = document.getElementById('ukupna_cena');
    totalPriceRef.innerHTML = `Ukupna cena: ${price} RSD`;

    return price;
}

document.addEventListener('DOMContentLoaded', (event) => {
    if(0 != getCartItemCount())
    {
        loadCartItemsToPage();
    }

    updateTotalPrice();

    const emptyCartButtonRef = document.getElementById('emptyCartButton');
    emptyCartButtonRef.addEventListener('click', emptyCart);

    const placeOrderButtonRef = document.getElementById('placeOrderButton');
    placeOrderButtonRef.addEventListener('click', placeOrder);
});