
const CartName = 'pcelarstvo_bojanic_cart'

const CartToItemImageMapping = {
    'livadski_med': 'images/products/med/med.png',
    'orasasti_plodovi_u_medu': 'images/products/med/bademi_u_medu.png',
    'med_sa_sacem': 'images/products/med/med_sa_sacem.png',
    'propolis': 'images/products/zdravlje/propolis.png'
};

/* cart items that have type, weight alongside number of items */
const typeWeightCartItems = ['livadski_med', 'orasasti_plodovi_u_medu'];
const weightCartItems = ['med_sa_sacem', 'propolis'];
/* Cart items with numer only */

const articlePrices = {
    'livadski_med': { //mapping: kolicina -> cena
        '300g':400,
        '500g': 500,
        '1000g': 900
    },
    'orasasti_plodovi_u_medu': {
        'Orah': {
            '300g': 500,
            '500g': 800
        },
        'Badem': {
            '200g': 500,
            '300g': 800
        },
        'Lešnik': {
            '100g': 500,
            '900g': 800
        },
        'Mešavina': {
            '3000g': 500,
            '5000g': 800
        }
        
    },
    'med_sa_sacem': {
        '500g': 700,
        '1000g': 1200
    },
    'propolis': {
        '30ml': 400
    }
}