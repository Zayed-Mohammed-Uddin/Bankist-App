"use strict";

// Elements
export const labelWelcome = document.querySelector(".welcome");
export const labelDate = document.querySelector(".date");
export const labelBalance = document.querySelector(".balance__value");
export const labelSumIn = document.querySelector(".summary__value--in");
export const labelSumOut = document.querySelector(".summary__value--out");
export const labelSumInterest = document.querySelector(
	".summary__value--interest"
);
export const labelTimer = document.querySelector(".session_timer");

export const containerApp = document.querySelector(".app");
export const containerMovements = document.querySelector(
	".movements_container"
);
const movement_row = document.querySelector(".movement_stacks");
const movement_rows = document.querySelectorAll(".movement_stacks");

export const btnLogin = document.querySelector(".login__btn");
export const btnTransfer = document.querySelector(".form__btn--transfer");
export const btnLoan = document.querySelector(".form__btn--loan");
export const btnClose = document.querySelector(".form__btn--close");
export const btnSort = document.querySelector(".btn--sort");

export const inputLoginUsername = document.querySelector(".login__input--user");
export const inputLoginPin = document.querySelector(".login__input--pin");
export const inputTransferTo = document.querySelector(".form__input--to");
export const inputTransferAmount = document.querySelector(
	".form__input--amount"
);
export const inputLoanAmount = document.querySelector(
	".form__input--loan-amount"
);
export const inputCloseUsername = document.querySelector(".form__input--user");
export const inputClosePin = document.querySelector(".form__input--pin");

// Data
const account1 = {
	owner: "Jonas Schmedtmann",
	movements: [200, 450, -400.22, 3000, -650.87, -130.23, 70, 1300],
	interestRate: 1.2, // %
	pin: 1111,
	movementsDates: [
		"2019-11-18T21:31:17.178Z",
		"2019-12-23T07:42:02.383Z",
		"2020-01-28T09:15:04.904Z",
		"2020-04-01T10:17:24.185Z",
		"2020-05-08T14:11:59.604Z",
		"2020-05-27T17:01:17.194Z",
		"2020-07-11T23:36:17.929Z",
		"2020-07-12T10:51:36.790Z",
	],
	currency: "EUR",
	locale: "pt-PT", // de-DE
};

const account2 = {
	owner: "Jessica Davis",
	movements: [5000, 3400, -150.76, -790.11, -3210, -1000.92, 8500, -30],
	interestRate: 1.5,
	pin: 2222,
	movementsDates: [
		"2019-11-01T13:15:33.035Z",
		"2019-11-30T09:48:16.867Z",
		"2019-12-25T06:04:23.907Z",
		"2020-01-25T14:18:46.235Z",
		"2020-02-05T16:33:06.386Z",
		"2020-04-10T14:43:26.374Z",
		"2020-06-25T18:49:59.371Z",
		"2020-07-26T12:01:20.894Z",
	],
	currency: "USD",
	locale: "en-US",
};

const account3 = {
	owner: "Steven Thomas Williams",
	movements: [200, -200.49, 340, -300.45, -20.23, 50, 400, -460.12],
	interestRate: 0.7,
	pin: 3333,
	movementsDates: [
		"2019-11-01T13:15:33.035Z",
		"2019-11-30T09:48:16.867Z",
		"2019-12-25T06:04:23.907Z",
		"2020-01-25T14:18:46.235Z",
		"2020-02-05T16:33:06.386Z",
		"2020-04-10T14:43:26.374Z",
		"2020-06-25T18:49:59.371Z",
		"2020-07-26T12:01:20.894Z",
	],
	currency: "USD",
	locale: "en-US",
};

const account4 = {
	owner: "Sarah Smith",
	movements: [430, 1000, 700, 50, 90, -22.22, 65, 233.87],
	interestRate: 1,
	pin: 4444,
	movementsDates: [
		"2019-11-18T21:31:17.178Z",
		"2019-12-23T07:42:02.383Z",
		"2020-01-28T09:15:04.904Z",
		"2020-04-01T10:17:24.185Z",
		"2020-05-08T14:11:59.604Z",
		"2020-05-27T17:01:17.194Z",
		"2020-07-11T23:36:17.929Z",
		"2020-07-12T10:51:36.790Z",
	],
	currency: "EUR",
	locale: "pt-PT", // de-DE
};

export const accounts = [account1, account2, account3, account4];
