
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
    'propolis': 'images/products/zdravlje/propolis.png'
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
                '300g': 100,
                '500g': 200
            },
            'Badem': {
                '200g': 300,
                '300g': 400
            },
            'Lešnik': {
                '100g': 500,
                '900g': 600
            },
            'Mešavina': {
                '3000g': 700,
                '5000g': 800
            }
        }
    },
    'propolis': {
        'VariantDependent': false,
        'Variants': false,
        'Prices':{
            '30ml': 400
        }
    }
}