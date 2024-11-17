
export function getCurrentPageName() {
	const path = window.location.pathname;
	const pageName = path.substring(path.lastIndexOf('/') + 1);
	
	// Remove the file extension if it exists
	return pageName.split('.')[0];
  }

export const CartName = 'pcelarstvo_bojanic_cart'

export const CartToItemImageMapping = {
    'livadski_med': 'images/products/med/med.png',
    'orasasti_plodovi_u_medu': 'images/products/med/bademi_u_medu.png',
    'med_sa_sacem': 'images/products/med/med_sa_sacem.png',
    'propolis': 'images/products/zdravlje/propolis.png',
    'sveca_obicna': 'images/products/vosak/sveca_obicna.png',
    'sveca_ukrasna_kosnica': 'images/products/vosak/sveca_kosnica.png',
    'sveca_ukrasna_model1': 'images/products/vosak/sveca_ukrasna_1.png',
    'sveca_ukrasna_model2': 'images/products/vosak/sveca_ukrasna_2.png',
};

export const articlePriceConfig = {
    'livadski_med': { //mapping: kolicina -> cena
        'VariantDependent': false,
        'Variants': ['Tečan', 'Kristalisan'],
        'Prices': {
            '300g':400,
            '500g': 500,
            '1000g': 900
        }
    },
    'med_sa_sacem': {
        'VariantDependent': false,
        'Variants': false,
        'Prices':{
            '500g': 700,
            '1000g': 1200
        }
    },
    'orasasti_plodovi_u_medu': {
        'VariantDependent': true,
        'Prices':{
            'Orah': {
                '500g': 600
            },
            'Badem': {
                '500g': 600
            },
            'Lešnik': {
                '500g': 600
            },
            'Mešavina': {
                '500g': 600
            }
        }
    },
    'propolis': {
        'VariantDependent': false,
        'Variants': false,
        'Prices':{
            '20ml': 300
        }
    },
    'sveca_obicna': {
        'VariantDependent': false,
        'Variants': false,
        'Prices':{
            '100g': 200,
            '150g': 300,
            '200g': 400,
        }
    },
    'sveca_ukrasna_kosnica': {
        'VariantDependent': false,
        'Variants': false,
        'Prices':{
            '60g': 150,
        }
    },
    'sveca_ukrasna_model1': {
        'VariantDependent': false,
        'Variants': false,
        'Prices':{
            '100g': 300,
        }
    },
    'sveca_ukrasna_model2': {
        'VariantDependent': false,
        'Variants': false,
        'Prices':{
            '80g': 300,
        }
    }
}