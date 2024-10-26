/* Module handles page content for a single item pages */

import { singleItem } from "./singleItem.js"
import { getCurrentPageName } from "./prodavnicaConfig.js"
import { getCartItemCount, addItemToCart} from "./cartHandler.js"

var currentItem = new singleItem(getCurrentPageName());

/* Value changed listeners */
// Select all target elements
const weightSelect = document.getElementById('weightSelect');
const typeSelect = document.getElementById('typeSelect');
const quantityInput = document.getElementById('quantity');


function getItemPrice()
{
    const typeRef = document.getElementById('typeSelect');
    const weightRef = document.getElementById('weightSelect');
    const quantityRef = document.getElementById('quantity');

    const type = typeRef ? typeRef.value : null;
    const weight = weightRef ? weightRef.value : null;
    const item = {
        'type': type,
        'weight': weight
    }

        
    return currentItem.getItemPrice(item) * quantityRef.value;
            
}
// Define a single callback function with an argument
function handleChange(event, elementId) 
{
    var updatePrice = false;
    if(!currentItem.isVariantDependent())
    {
        if('weightSelect' == elementId || 'quantity' == elementId)
        {
            updatePrice = true;
            
        }
    }
    else
    {
        if('typeSelect' == elementId)
        {
            updateSelectBoxWeight();
        }

        updatePrice = true;
    }

    if(updatePrice)
    {
        const priceRef = document.getElementById('cena');
        const price = getItemPrice(); 
        
        priceRef.innerHTML = '';
        priceRef.innerHTML = `Cena: ${price} RSD`;
    }
}

// Attach event listeners with the callback
weightSelect.addEventListener('change', (event) => handleChange(event, 'weightSelect'));
typeSelect.addEventListener('change', (event) => handleChange(event, 'typeSelect'));
quantityInput.addEventListener('input', (event) => handleChange(event, 'quantity'));

function updateSingleItemImage()
{
    var imageHtmlRef = document.getElementById('productImage');
    imageHtmlRef.src = `../../../${currentItem.getImagePath()}`;
}

function updateSelectBoxVariant()
{
    if(currentItem.variantsExist())
    {
        var types = currentItem.getItemVariants();;

        var selectRef = document.getElementById('typeSelect');
        selectRef.innerHTML = '';
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.text = type;
            selectRef.appendChild(option);
        })
    }
    else
    {
        const typeSelectSectionRef = document.getElementById('typeSelectSection');
        typeSelectSectionRef.innerHTML = '';
    }

}

function updateSelectBoxWeight()
{
    var weights = null;
    var variant = null;
    var selectRef = document.getElementById('weightSelect');

    if(currentItem.isVariantDependent())
    {
        const typeRef = document.getElementById('typeSelect');
        variant = typeRef.value;
    }

    weights = currentItem.getItemWeights(variant);
    
    selectRef.innerHTML = '';
    weights.forEach(weight => {
        const option = document.createElement('option');
        option.value = weight;
        option.text = weight;
        selectRef.appendChild(option);
    });
}

function addToCartButtonClicked()
{
    const typeRef = document.getElementById('typeSelect');
    const weightRef = document.getElementById('weightSelect');
    const quantityRef = document.getElementById('quantity');
    const type = typeRef ? typeRef.value : null;
    const weight = weightRef ? weightRef.value : null;
    addItemToCart(getCurrentPageName(), type, weight, quantityRef.value);
    updateCartCount();
    alert("Proizvod uspešno dodat u korpu!");
}

function updateCartCount()
{
    const cartCountRef = document.getElementById('korpa_num_of_elements');
    cartCountRef.innerHTML = '';
    cartCountRef.innerHTML = `Korpa: ${getCartItemCount()}`;
}

document.addEventListener('DOMContentLoaded', (event) => {
    updateSingleItemImage();
    updateSelectBoxVariant();
    updateSelectBoxWeight();
    updateCartCount();
    const priceRef = document.getElementById('cena');
    const price = getItemPrice(); 
    
    priceRef.innerHTML = '';
    priceRef.innerHTML = `Cena: ${price} RSD`;

    document.getElementById('addToCardButton').addEventListener('click', addToCartButtonClicked);
});

