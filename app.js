"use strict";

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".session_timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements_container");
const movement_row = document.querySelector(".movement_stacks");
const movement_rows = document.querySelectorAll(".movement_stacks");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Data
const account1 = {
	owner: "Jonas Schmedtmann",
	movements: [200, 450, -400.22, 3000, -650.87, -130.23, 70, 1300],
	interestRate: 1.2, // %
	pin: 1111,
};

const account2 = {
	owner: "Jessica Davis",
	movements: [5000, 3400, -150.76, -790.11, -3210, -1000.92, 8500, -30],
	interestRate: 1.5,
	pin: 2222,
};

const account3 = {
	owner: "Steven Thomas Williams",
	movements: [200, -200.49, 340, -300.45, -20.23, 50, 400, -460.12],
	interestRate: 0.7,
	pin: 3333,
};

const account4 = {
	owner: "Sarah Smith",
	movements: [430, 1000, 700, 50, 90],
	interestRate: 1,
	pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// transfering money
const transferMoney = () => {};

// requesting loan
const requestingLoan = () => {};

// closing account
const closingAccount = () => {};

// calculating the current balance
const calculatingBalance = (movements) => {
	let total_amount = 0;
	movements.forEach((movement, i) => {
		total_amount += movement;
	});
	return total_amount;
};

// displaying the movement related to the account
const renderingMovement = (movements) => {
	let html = ``;
	let count_deposit = 0;
	let count_withdrawal = 0;

	movements.forEach((movement, i) => {
		const movement_type = movement > 0 ? "deposit" : "withdrawal";
		const color_type = movement > 0 ? "bg-green-600" : "bg-red-600";

		html = `
				<div
					class="movement_stacks flex justify-between bg-white border-b-2 px-4 py-6 border-gray-200 shadow-lg">
					<div
						class="stack_group_text_left items-center justify-center flex gap-x-5">
						<h6 class="${color_type} text-sm">
							${movement_type === "deposit" ? ++count_deposit : ++count_withdrawal} ${
			movement_type.at(0).toUpperCase() + movement_type.slice(1)
		}(s)
						</h6>
						<h6>${new Date().toUTCString()}</h6>
					</div>
					<div class="stack_group_text_right">
						<h4>
							${movement_type === "deposit" ? "+" : "-"}$${Math.abs(movement).toFixed(2)}
						</h4>
					</div>
				</div>
			`;
		containerMovements.insertAdjacentHTML("afterbegin", html);
	});
};

// setting up the label date
labelDate.innerText = `${new Date().toUTCString()}`;

// displaying the balance
labelBalance.innerText = `$${calculatingBalance(account3.movements).toFixed(
	2
)}`;

renderingMovement(account3.movements);

// computing credentials
const computingCredentials = function (accs) {
	accs.forEach((account, i) => {
		account.user = account.owner
			.toLowerCase()
			.split(" ")
			.map((str, i) => str.charAt(0))
			.join("");
	});
};

computingCredentials(accounts);

const movement = [300, 250, -50, 25, 100, -93];

const deposit = movement.map((transaction) => transaction > 0);

// console.log(deposit);

let s = "";
for (let i = 0; i < 5; i++) {
	for (let j = 0; j < 5; j++) {
		s += Math.round(Math.random() * 100 + 1);
		s += "\t";
	}
	s += "\n";
}
console.log(s);
