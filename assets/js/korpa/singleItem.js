import * as shopConfig from "./prodavnicaConfig.js"

export class singleItem {
    constructor(name) {
        this.name = name
        this.currentItemConfig = shopConfig.articlePriceConfig[this.name];
    }

    printName() {
        console.log(this.name);
    }

    getImagePath() {
        return shopConfig.CartToItemImageMapping[this.name]
    }

    variantsExist()
    {
        if(this.currentItemConfig['VariantDependent'] == false)
        {
            if(!this.currentItemConfig['Variants'])
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        else
        {
            return true;
        }
    }

    getItemVariants()
    {
        if(!this.isVariantDependent())
        {
            return this.currentItemConfig['Variants'];
        }
        else
        {
            return Object.keys(this.currentItemConfig['Prices']);
        }
        
    }

    getItemPrice(item = null)
    {
        if(!this.isVariantDependent())
        {
            return this.currentItemConfig['Prices'][item['weight']];
        }
        else
        {
            return this.currentItemConfig['Prices'][item['type']][item['weight']];
        }
    }

    getItemWeights(variant = null)
    {
        var weights = null;
        /* Get prices for the selected variant */
        if(null != variant)
        {
            weights = Object.keys(this.currentItemConfig['Prices'][variant]);
        }
        /* Get prices idependent of the selected variant */
        else
        {
            if(this.currentItemConfig['VariantDependent'] == false)
            {
                weights = Object.keys(this.currentItemConfig['Prices']);
            }
        }

        return weights;
    }

    isVariantDependent()
    {
        return this.currentItemConfig['VariantDependent'];
    }
}