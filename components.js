import {
	btnLogin,
	inputLoginUsername,
	inputLoginPin,
	accounts,
	labelWelcome,
	containerApp,
	containerMovements,
	labelSumIn,
	labelSumOut,
	labelSumInterest,
	labelBalance,
	btnTransfer,
	btnLoan,
	btnClose,
	inputTransferTo,
	inputTransferAmount,
	inputLoanAmount,
	inputCloseUsername,
	inputClosePin,
} from "./app.js";

import { calculatingBalance } from "./operations.js";

("use strict");

// computing credentials
const computingCredentials = function (accs) {
	accs.forEach(
		(account) =>
			(account.user = account.owner
				.toLowerCase()
				.split(" ")
				.map((str) => str.charAt(0))
				.join(""))
	);
};

computingCredentials(accounts);

// computing total deposits
const computeDeposit = function (account) {
	// computing total deposit
	labelSumIn.textContent = `+$${account.movements
		.filter((mov) => mov > 0)
		.reduce((total, mov) => total + mov, 0)
		.toFixed(2)}`;
};

// computing total withdrawals
const computeWithdrawal = function (account) {
	labelSumOut.textContent = `-$${Math.abs(
		account.movements
			.filter((mov) => mov < 0)
			.reduce((total, mov) => total + mov, 0)
			.toFixed(2)
	)}`;
};

// computing total interest
const computeInterest = function (account) {
	labelSumInterest.textContent = `+$${account.movements
		.filter((mov) => mov > 0)
		.map((mov) => mov * (account.interestRate / 100))
		.reduce((total, mov) => total + mov, 0)
		.toFixed(2)}`;
};

// rendering movements
const renderingMovements = (account) => {
	let html = ``;
	let count_deposit = 0;
	let count_withdrawal = 0;

	account.movements.forEach((movement, i) => {
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

const getCurrentAccount = function (user, pin) {
	const currentAccount = accounts.find(
		(acc) => acc?.user === user && acc?.pin === pin
	);
	return currentAccount;
};

let currentAccount;
let totalBalance = 0;

btnLogin.addEventListener("click", (e) => {
	// preventing the form to be submitted
	e.preventDefault();

	// getting the username and pin
	const user = inputLoginUsername.value;
	const pin = parseInt(inputLoginPin.value);

	// checking the credentials
	currentAccount = getCurrentAccount(user, pin);

	if (currentAccount) {
		alert("Successfully logged in!");

		inputLoginUsername.value = "";
		inputLoginPin.value = "";

		// printing the welcome label associated with the account
		labelWelcome.textContent = `Welcome ${
			currentAccount.owner.split(" ")[0]
		}`;

		// rendering the movements
		renderingMovements(currentAccount);

		computeDeposit(currentAccount);
		computeWithdrawal(currentAccount);
		computeInterest(currentAccount);

		// displaying the balance
		totalBalance = calculatingBalance(currentAccount.movements);
		currentAccount.totalBalance = totalBalance;
		labelBalance.innerText = `$${currentAccount.totalBalance}`;

		// displaying the app container
		setTimeout(() => {
			containerApp.classList.remove("hidden");
		}, 800);
	} else {
		alert("Invalid Credentials!");
	}
});

// requesting loan
const requestingLoan = () => {};

// closing account
const closingAccount = () => {};

// transfering money
btnTransfer.addEventListener("click", (e) => {
	e.preventDefault();

	const targetUser = accounts.find(
		(account) => account.user === inputTransferTo.value
	);
	const amount = parseInt(inputTransferAmount.value);

	console.log(targetUser, currentAccount);
	// if(amount > 0 && amount <= currentAccount.totalBalance)
});
