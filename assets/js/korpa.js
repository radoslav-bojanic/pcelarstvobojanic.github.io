



function updateProductImage()
{
    const protuctImage = document.getElementById('productImage');
    /* Article case */
    if('korpa' != getCurrentPage())
    {
        protuctImage.src = `../../../${CartToItemImageMapping[getCurrentPage()]}`
    }
}

const weight = document.getElementById('weightSelect'); // Using value property
if (weight) {
    weight.addEventListener('change', (event) => updatePrice(event, 'weight'));
}

const type = document.getElementById('stateSelect'); // Using value property
if (type) {
    type.addEventListener('change', (event) => updatePrice(event, 'type'));
}

const numOfArticles = document.getElementById('quantity');
if (numOfArticles) {
    numOfArticles.addEventListener('input', (event) => updatePrice(event, 'quantity'));
}




function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split("/").pop(); // Get the last part of the path
    return page.replace('.html', ''); // Remove the .html extension
}

// Adding an item to the cart
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem(CartName)) || [];
    cart.push(item);
    localStorage.setItem(CartName, JSON.stringify(cart));
}

// Retrieving items from the cart
function getCartItems() {
    return JSON.parse(localStorage.getItem(CartName)) || [];
}

function addToCartButtonClicked()
{
    const cart = JSON.parse(localStorage.getItem(CartName)) || [];
    

    var tezina = null;
    if(weight)
    {
        tezina = weight.value;
    }

    var tip = null;
    if(type)
    {
        tip = type.value;
    }

    const item = {
        "id": cart.length,
        "item": getCurrentPage(),
        "weight": tezina,
        "type": tip,
        "quantity": numOfArticles.value
    };

    addToCart(item);
    updateCartCount();
}

function updateCartCount() {
    // Retrieve the 'cards' data from localStorage
    const cardsData = localStorage.getItem(CartName);
    // Parse the JSON string into an array (if it exists), otherwise create an empty array
    const cardsArray = cardsData ? JSON.parse(cardsData) : [];
    const numberOfItems = cardsArray.length
    const korpaText = document.getElementById('korpa_num_of_elements')
    /* Case for product page*/
    if('korpa' != getCurrentPage())
    {
        korpaText.innerHTML = `Korpa: ${numberOfItems}`;
    }
    /* Case for cart page */
    else
    {
        const numOfArticpesText = document.createElement('p');
        numOfArticpesText.textContent = `Broj artikala: ${numberOfItems}`;
        korpaText.appendChild(numOfArticpesText);
    }

}

function getPrice(item, typeSelectHtmlId) {

  const weightSelectId = typeSelectHtmlId.replace('stateSelect', 'weightSelect');
  const quantityId = typeSelectHtmlId.replace('stateSelect', 'quantity');

  weightSelectHtml = document.getElementById(weightSelectId);
  quantityHtml = document.getElementById(quantityId);

  var price = articlePrices[item][weightSelectHtml.value] * quantityHtml.value;
  /* in case object is nested we need to check out object type additionally */
  if(isNestedObject(articlePrices[item]))
  {
      const typeSelectHtml = document.getElementById(typeSelectHtmlId);
      // console.log(articlePrices[item][typeSelect.value]);
      const weightSelectOption = weightSelectHtml.options[weightSelectHtml.selectedIndex].text;
      price = articlePrices[item][typeSelectHtml.value][weightSelectOption] * quantityHtml.value;
  }

  return price;
  
}

function updateWeightSelectForNestedObject(item, typeSelectHtmlId)
{
  const typeSelectHtmlElement = document.getElementById(typeSelectHtmlId);
  const weightSelectHtmlId = typeSelectHtmlId.replace('stateSelect', 'weightSelect');
  console.log(typeSelectHtmlElement.value);
  updateStateOptionsWithVariant(weightSelectHtmlId, articlePrices[item][typeSelectHtmlElement.value])
}

function updatePrice(event, source) {

    if('type' == source)
    {
      if(isNestedObject(articlePrices[getCurrentPage()]))
      {
        updateWeightSelectForNestedObject(getCurrentPage(), 'stateSelect');
      }
    }

    cena = document.getElementById('cena')
    if(cena)
    {
        cena.innerHTML = `Cena: ${getPrice(getCurrentPage(), 'stateSelect')} RSD`
    }
};

// Checl if product item is nested, this is needed in case different types have different prices
function isNestedObject(product) {
  // Check the first property in the product to determine its structure
  const firstKey = Object.keys(product)[0];
  const firstValue = product[firstKey];
  
  // If the value of the first property is an object, it’s 'orasasti_plodovi_u_medu'
  // If the value is a number, it’s 'livadski_med'
  return typeof firstValue === 'object' && firstValue !== null;
}

function updateStateOptionsWithVariant(htmlId, priceArray)
{
  const weightSelect = document.getElementById(htmlId);
  weightSelect.innerHTML = '';
  for(const weight in priceArray)
  {
    const option = document.createElement('option');
    option.value = priceArray[weight]; // Set the value
    option.textContent = `${weight}`; // Set the display text
    weightSelect.appendChild(option);
    
  }
}

function updateWeightSelectOptions(id, itemId)
{
    const weightSelect = document.getElementById(id);
    if(weightSelect)
    {
      weightSelect.innerHTML = '';
        const prices = articlePrices[itemId];
        if(isNestedObject(prices))
        {
          const stateSelectId = id.replace('weightSelect', 'stateSelect')
          const stateSelect = document.getElementById(stateSelectId);
          /* Iterate through all variants */
          for(const variant in prices)
          {
            /* First update all variants */
            const option = document.createElement('option');
            option.value = variant; // Set the value
            option.textContent = `${variant}`; // Set the display text
            stateSelect.appendChild(option);
          }
          const keys = Object.keys(prices);
          updateStateOptionsWithVariant(id, prices[keys[0]]);
        }
        else
        {
          for (const weight in prices) {
              if (prices.hasOwnProperty(weight)) {
                  // Create a new option element
                  const option = document.createElement('option');
                  option.value = weight; // Set the value
                  option.textContent = `${weight}`; // Set the display text

                  // Append the option to the select element
                  weightSelect.appendChild(option);
              }
          }
      }
    }

}

/* Cart page functions */
function loadCartItems()
{
    const cartItems = getCartItems();
    const productContainer = document.getElementById('productContainer')

    cartItems.forEach(item => {
        if(typeWeightCartItems.includes(item.item))
        {
            const cartObject = constructTypeWeightCartItem(item);
            productContainer.appendChild(cartObject);
            updateWeightSelectOptions(`weightSelect_${item.id}`, item.item);
            //add product parameters update listener
            const weightSelect = document.getElementById(`weightSelect_${item.id}`);
            const stateSelect = document.getElementById(`stateSelect_${item.id}`);
            const quantitySelect = document.getElementById(`quantity_${item.id}`);

            const optionText = item.weight;
            for (let i = 0; i < weightSelect.options.length; i++) {
              const option = weightSelect.options[i];
              
              // Check if the option text matches the desired text
              if (option.text === optionText) {
                weightSelect.selectedIndex = i; // Set the selected index
                  break; // Exit the loop once we find a match
              }
          }

            weightSelect.addEventListener('change', () => updateCartItem(item.id))
            stateSelect.addEventListener('change', () => updateCartItem(item.id))
            quantitySelect.addEventListener('change', () => updateCartItem(item.id))

        }
        else if(weightCartItems.includes(item.item))
        {
            const cartObject = constructWeightCartItem(item);
            productContainer.appendChild(cartObject);
            updateWeightSelectOptions(`weightSelect_${item.id}`, item.item);
            //add product parameters update listener
            const weightSelect = document.getElementById(`weightSelect_${item.id}`);
            const quantitySelect = document.getElementById(`quantity_${item.id}`);

            weightSelect.addEventListener('change', () => updateCartItem(item.id))
            quantitySelect.addEventListener('change', () => updateCartItem(item.id))
        }
        else if(numberOnlyCartItems.includes(item.item))
        {
            const cartObject = constructWeightCartItem(item);
            productContainer.appendChild(cartObject);

            const quantitySelect = document.getElementById(`quantity_${item.id}`);

            quantitySelect.addEventListener('change', () => updateCartItem(item.id))
        }
      });
}

function removeItemFromCartByIndex(index) {
// Find the index of the item in the cart based on its id
const cart = JSON.parse(localStorage.getItem(CartName)) || [];
const itemIndex = cart.findIndex(item => item.id === index);
    
// Check if the item was found
    if (itemIndex !== -1) {
        // Remove 1 item at the found index
        cart.splice(itemIndex, 1); 
        
        // Update localStorage
        localStorage.setItem(CartName, JSON.stringify(cart));
        
        // Remove the corresponding DOM element
        const productContainer = document.getElementById('productContainer');
        const productDivToRemove = document.getElementById(`cart_item_${index}`); // Ensure the ID is set correctly in your HTML

        if (productDivToRemove) {
            productContainer.removeChild(productDivToRemove);
            mainCartUpdatePrice();

            // Add event listeners for update of cart items
            
        } 
        else 
        {
            console.error('Element to remove not found:', `cart_item_${index}`);
        }
    } 
    else 
    {
        console.error('Item not found in cart:', index);
    }
}

function removeAllItemsFromCart()
{
    localStorage.clear();
}

function mainCartUpdatePrice()
{
    const cart = JSON.parse(localStorage.getItem(CartName)) || [];
    var price = 0;

    cart.forEach(item => {
        price += articlePrices[item.item][item.weight] * item.quantity;
    })

    const mainPrice = document.getElementById('ukupna_cena');
    mainPrice.innerHTML = `Ukupna cena: ${price} RSD`;

}

function updateCartItem(id)
{
    const cart = JSON.parse(localStorage.getItem(CartName)) || [];

    // Find the item in the cart based on its id
    const itemIndex = cart.findIndex(item => item.id === id);

    const weightSelect = document.getElementById(`weightSelect_${id}`);
    const stateSelect = document.getElementById(`stateSelect_${id}`);
    const quantitySelect = document.getElementById(`quantity_${id}`);

    if(weightSelect)
    {
        cart[itemIndex].weight = weightSelect.value;
    }

    if(stateSelect)
    {
        cart[itemIndex].type = stateSelect.value;
    }
    cart[itemIndex].quantity = quantitySelect.value;
    localStorage.setItem(CartName, JSON.stringify(cart));
    mainCartUpdatePrice();
}

/* Function to construct html object of med object for cart display */
function constructTypeWeightCartItem(item)
{
    const itemDiv = document.createElement('div');
    const image = CartToItemImageMapping[item.item];
    itemDiv.classList.add('row');
    itemDiv.style.marginBottom = '10px';
    itemDiv.id = `cart_item_${item.id}`;

    itemDiv.innerHTML = `
    <section class="col-2 col-3-narrower col-5-mobilep">
      <a href="#" class="image fit"><img id='productImage' class='productImage' src='${image}' alt="" /></a>
    </section>
    <section class="col-8 col-6-narrower">
      <div class="row aln-bottom">
        <section class="col-3 col-4-narrower">
          <label class="select-label">Težina</label>
          <select id="weightSelect_${item.id}" name="select_weight">
            <option value="300g" ${item.weight === '300g' ? 'selected' : ''}>300g</option>
            <option value="500g" ${item.weight === '500g' ? 'selected' : ''}>500g</option>
            <option value="1000g" ${item.weight === '1000g' ? 'selected' : ''}>1000g</option>
          </select>
        </section>
        <section class="col-3 col-6-narrower">
          <label class="select-label">Stanje</label>
          <select id="stateSelect_${item.id}" name="select_state">
            <option value="tecan" ${item.type === 'tecan' ? 'selected' : ''}>Tečan</option>
            <option value="kristalisan" ${item.type === 'kristalisan' ? 'selected' : ''}>Kristalisan</option>
          </select>
        </section>
        <section class="col-3 col-3-narrower">
          <label class="select-label">Količina</label>
          <input class="number-input" type="number" id="quantity_${item.id}" name="quantity" min="1" max="99" value="${item.quantity}" />
        </section>
        <section class="col-3 col-6-narrower">
          <a class="button" onclick=removeItemFromCartByIndex(${item.id})>Obriši</a>
        </section>
      </div>
    </section>
  `;
  return itemDiv;
}

function constructWeightCartItem(item)
{
    const itemDiv = document.createElement('div');
    const image = CartToItemImageMapping[item.item];
    itemDiv.classList.add('row');
    itemDiv.style.marginBottom = '10px';
    itemDiv.id = `cart_item_${item.id}`;

    itemDiv.innerHTML = `
    <section class="col-2 col-3-narrower col-5-mobilep">
      <a href="#" class="image fit"><img id='productImage' class='productImage' src='${image}' alt="" /></a>
    </section>
    <section class="col-8 col-6-narrower">
      <div class="row aln-bottom">
        <section class="col-3 col-4-narrower">
          <label class="select-label">Težina</label>
          <select id="weightSelect_${item.id}" name="select_weight">
            <option value="300g" ${item.weight === '300g' ? 'selected' : ''}>300g</option>
            <option value="500g" ${item.weight === '500g' ? 'selected' : ''}>500g</option>
            <option value="1000g" ${item.weight === '1000g' ? 'selected' : ''}>1000g</option>
          </select>
        </section>
        <section class="col-3 col-6-narrower">
        </section>
        <section class="col-3 col-3-narrower">
          <label class="select-label">Količina</label>
          <input class="number-input" type="number" id="quantity_${item.id}" name="quantity" min="1" max="99" value="${item.quantity}" />
        </section>
        <section class="col-3 col-6-narrower">
          <a class="button" onclick=removeItemFromCartByIndex(${item.id})>Obriši</a>
        </section>
      </div>
    </section>
  `;
  return itemDiv;
}

function constructQuantityOnlyCartItem(item)
{
    const itemDiv = document.createElement('div');
    const image = CartToItemImageMapping[item.item];
    itemDiv.classList.add('row');
    itemDiv.style.marginBottom = '10px';
    itemDiv.id = `cart_item_${item.id}`;

    itemDiv.innerHTML = `
    <section class="col-2 col-3-narrower col-5-mobilep">
      <a href="#" class="image fit"><img id='productImage' class='productImage' src='${image}' alt="" /></a>
    </section>
    <section class="col-8 col-6-narrower">
      <div class="row aln-bottom">
        <section class="col-3 col-4-narrower">
        </section>
        <section class="col-3 col-6-narrower">
        </section>
        <section class="col-3 col-4-narrower">
          <label class="select-label">Količina</label>
          <input class="number-input" type="number" id="quantity_${item.id}" name="quantity" min="1" max="99" value="${item.quantity}" />
        </section>
        <section class="col-3 col-12-narrower">
          <a class="button">Obriši</a>
        </section>
      </div>
    </section>
  `;
  return itemDiv;
}

function handleOrder()
{

	const ime = document.getElementById('ime').value;
    const prezime = document.getElementById('prezime').value;
    const grad = document.getElementById('grad').value;
    const postanski_broj = document.getElementById('post_number').value;
    const adresa = document.getElementById('adresa').value;
    const dodatna_napomena = document.getElementById('napomena').value;
    const email = document.getElementById('email_for_order').value
    const cartItems = getCartItems();

    if( ime == '' ||
        prezime == '' ||
        grad == '' ||
        postanski_broj == '' ||
        adresa == '' ||
        email == ''
    )
    {
        alert('Neuspesna porudzbina: Unedi podaci su neispravni');
    }
    else if(cartItems.length == 0)
    {
        alert('Neuspesna porudzbina: vasa korpa je prazna!');
    }

    var messageToSend = `
    Nova porudzbina od ${ime} ${prezime}
    ------------------------------------------------`;

    var totalPrice = 0;

    cartItems.forEach(item => {
        const price = articlePrices[item.item][item.weight] * item.quantity;
        totalPrice += price;
        console.log(item); // Replace with your logic to handle each item
        const itemForMessage = `
    Proizvod: ${item.item}
    Tezina: ${item.weight}
    Tip: ${item.type}
    Kolicina: ${item.quantity}
    Cena: ${price}
    ------------------------------------------------
    `
        messageToSend += itemForMessage;
    });

    messageToSend +=`
    Ukupno: ${totalPrice}
    ------------------------------------------------
    Kontakt podaci:
    Ime: ${ime}
    Prezime: ${prezime}
    Grad: ${grad}
    Postaniski broj: ${postanski_broj}
    Adresa: ${adresa}
    Dodatna napomena: ${dodatna_napomena}
    `;

    console.log(messageToSend);

	const templateParams = {
		from_name: 'Nova porudzbina',
		message:  messageToSend
	};

	emailjs.send('service_c1ywtro', 'template_send_message', templateParams)
		.then(function(response) {
			console.log('SUCCESS!', response.status, response.text);
			// alert('Message sent!');
		}, function(error) {
			console.log('FAILED...', error);
			alert('Failed to send message. Please try again.');
		});
};

if('korpa' != getCurrentPage())
{
    updateProductImage();
    updateCartCount();
    updateWeightSelectOptions('weightSelect', getCurrentPage());
    updatePrice();
}
else
{
    loadCartItems();
    mainCartUpdatePrice();
}

