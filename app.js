"use strict";

// LECTURES

const currencies = new Map([
	["USD", "United States Dollar"],
	["EUR", "Euro"],
	["GBP", "Pound Sterling"],
])
	.set("INR", "Indian Rupee")
	.set("YEN", "Japanese Yen");

currencies.set("BDT", "Bangladeshi Taka");
currencies.set("CAD", "Canadian Dollar");

currencies.forEach(function (val, key, map) {
	console.log(`${key} -> ${val}`);
});

// Set

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

// currenciesUnique.forEach(function(value, _, map){
//     console.log(`${value} -> ${value}`);
// });
// console.log(currencies.get('USD'));
// console.log(currencies.get('INR'));
// console.log(currencies.get('BDT'));

// console.log(currencies.has('USD'));

// console.log(currencies.size);

// console.log(currencies.keys());
// console.log(currencies.values());
// console.log(currencies.entries());

// for(const [key, value] of currencies.entries()) {
//     console.log(key, '->',value);
// }

// const book = {
// 	author: "James Bond",
// 	ISBN: 4454545458785,
// 	publishedDate: "12 Nov 2010",
// 	title: "Casino Royale",
// 	price: 12.99,
// 	stock: 100,
// 	isAvailable: true,
// };

// const bookMap = new Map(Object.entries(book));
// console.log(bookMap);
// for(const [key, value] of bookMap.entries()){
//     console.log(key, value);
// }

// const setExample = new Set(['USD', 'EUR', 'BRZ', 'GBP', 'BDT', 'CAD', 'BDT', 'CAD']);

// console.log(setExample);
// console.log(setExample.keys());

// for(const [key, value] of setExample.entries()){
//     console.log(key, value);
// }
// console.log(setExample.size);

// setExample.add('MNU');
// setExample.delete('USD');

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for(const transaction of movements){
//     transaction > 0
// 		? console.log(`You deposited $${transaction}`)
// 		: console.log(`You withdrew $${Math.abs(transaction)}`);
// }
