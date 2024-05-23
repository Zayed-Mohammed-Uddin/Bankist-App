import {
	btnLogin,
	inputLoginUsername,
	inputLoginPin,
	accounts,
	labelWelcome,
	containerApp,
	containerMovements,
	btnLoan,
	labelSumIn,
	labelSumOut,
	labelSumInterest,
	labelBalance,
	btnTransfer,
	btnClose,
	inputTransferTo,
	inputTransferAmount,
	inputLoanAmount,
	inputCloseUsername,
	inputClosePin,
} from "./app.js";

import { calculatingBalance } from "./operations.js";

("use strict");
let currentAccount;

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

const renderUI = function (account) {
	containerMovements.innerHTML = "";

	// computing the total balance and displaying the balance
	account.totalBalance = calculatingBalance(account.movements);
	labelBalance.innerText = `$${account.totalBalance}`;

	renderingMovements(account);

	computeDeposit(account);
	computeWithdrawal(account);
	computeInterest(account);
};

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
		renderUI(currentAccount);

		// displaying the app container
		setTimeout(() => {
			containerApp.classList.remove("hidden");
		}, 800);
	} else {
		alert("Invalid Credentials!");
	}
});

// requesting loan
btnLoan.addEventListener("click", (e) => {
	e.preventDefault();
	let isFailed = false;
	const loanAmount = parseInt(inputLoanAmount.value);
	loanAmount > 0 &&
	currentAccount?.movements.some(
		(transaction) => transaction > 0.1 * loanAmount
	)
		? currentAccount?.movements?.push(loanAmount)
		: (isFailed = true);

	if (isFailed) {
		alert("Insufficient funds!");
		inputLoanAmount.value = "";
	} else {
		renderUI(currentAccount);
		inputLoanAmount.value = "";
	}
});

// closing account
btnClose.addEventListener("click", (e) => {
	e.preventDefault();
	const closeUsername = inputCloseUsername.value;
	const closePin = parseInt(inputClosePin.value);

	if (
		closeUsername === currentAccount.user &&
		closePin === currentAccount.pin
	) {
		// getting the target account's index
		const index = accounts.findIndex(
			(account) => account.user === currentAccount.user
		);
		accounts.splice(index, 1);
		containerApp.classList.add("hidden");
		alert("Account successfully closed!");

		inputCloseUsername.value = "";
		inputClosePin.value = "";
	} else {
		alert("Invalid Credentials!");
	}
});

// transfering money
btnTransfer.addEventListener("click", (e) => {
	e.preventDefault();

	const targetUser = accounts.find(
		(account) => account.user === inputTransferTo.value
	);
	const transferAmount = parseInt(inputTransferAmount.value);

	if (
		transferAmount > 0 &&
		transferAmount <= currentAccount.totalBalance &&
		targetUser &&
		targetUser.user !== currentAccount.user
	) {
		currentAccount.movements.push(-transferAmount);
		targetUser.movements.push(transferAmount);
		alert(
			"$" +
				transferAmount +
				" is successfully transferred to " +
				targetUser.owner
		);

		// computing the total balance and displaying the balance
		renderUI(currentAccount);

		inputTransferTo.value = "";
		inputTransferAmount.value = "";
	} else {
		alert("Invalid Transfer!");
	}
});

// Practice

accounts.forEach((acc) => {
	console.log(acc.movements.map((mov) => mov * -1)); // converting withdrawal to deposit
	console.log(acc.movements.filter((mov) => mov > 0)); // filtering the deposits only
	console.log(acc.movements.reduce((accum, mov) => accum + mov, 0)); // getting the total balance

	console.log(acc.movements.map((mov) => mov * -1).some((mov) => mov > 0)); // some - checking the condition of one instance and returning the boolean value

	console.log(acc.movements.every((mov) => mov > 0)); // checking the condition of all instances and upon satisfying the condition, return the boolean value
	
	
});
