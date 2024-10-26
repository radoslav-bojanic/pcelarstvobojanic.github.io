import { singleItem } from "./singleItem.js"
import { getCurrentPageName } from "./prodavnicaConfig.js"
import { getCartItemCount, updateItemToCart, removeItemFromCart, readAllCartItems} from "./cartHandler.js"

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
    const currentItem = new singleItem(item['name']);
    if(currentItem.variantsExist())
    {
        const sectionRef = document.getElementById(`type_section_${item['id']}`);
        const selectRef = document.createElement('select');

        const labelRef = document.createElement('label');
        labelRef.className = 'select-label';
        labelRef.textContent = 'Tip';

        var types = currentItem.getItemVariants();

        selectRef.innerHTML = '';
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.text = type;
            selectRef.appendChild(option);
        })

        selectRef.id = `typeSelect_${item['id']}`;
        sectionRef.appendChild(labelRef);
        sectionRef.appendChild(selectRef);
    }

}

function updateSelectBoxWeight(item)
{
    const currentItem = new singleItem(item['name']);
    var weights = null;
    var variant = null;
    const sectionRef = document.getElementById(`weight_section_${item['id']}`);
    var selectRef = document.createElement('select');

    const labelRef = document.createElement('label');
    labelRef.className = 'select-label';
    labelRef.textContent = 'Težina';

    if(currentItem.isVariantDependent())
    {
        const typeRef = document.getElementById(`typeSelect_${item['id']}`);
        variant = typeRef.value;
    }

    weights = currentItem.getItemWeights(variant);
    
    weights.forEach(weight => {
        const option = document.createElement('option');
        option.value = weight;
        option.text = weight;
        selectRef.appendChild(option);
    });

    selectRef.id = `weightSelect_${item['id']}`;
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
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    if(0 != getCartItemCount())
    {
        loadCartItemsToPage();
    }
});