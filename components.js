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
	labelTimer,
	btnTransfer,
	btnClose,
	inputTransferTo,
	inputTransferAmount,
	inputLoanAmount,
	inputCloseUsername,
	inputClosePin,
	btnSort,
	labelDate,
} from "./app.js";

import { calculatingBalance } from "./operations.js";

("use strict");
let currentAccount,
	sorted = false;

let intervalID = null;

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
	labelSumIn.textContent = `+${new Intl.NumberFormat(account.locale, {
		style: "currency",
		currency: account.currency,
	}).format(
		account.movements
			.filter((mov) => mov > 0)
			.reduce((total, mov) => total + mov, 0)
			.toFixed(2)
	)}`;
};

// computing total withdrawals
const computeWithdrawal = function (account) {
	labelSumOut.textContent = `-${new Intl.NumberFormat(account.locale, {
		style: "currency",
		currency: account.currency,
	}).format(
		Math.abs(
			account.movements
				.filter((mov) => mov < 0)
				.reduce((total, mov) => total + mov, 0)
				.toFixed(2)
		)
	)}`;
};

// computing total interest
const computeInterest = function (account) {
	labelSumInterest.textContent = `+${new Intl.NumberFormat(account.locale, {
		style: "currency",
		currency: account.currency,
	}).format(
		account.movements
			.filter((mov) => mov > 0)
			.map((mov) => mov * (account.interestRate / 100))
			.reduce((total, mov) => total + mov, 0)
			.toFixed(2)
	)}`;
};

// Formatting Dates
const formatMovementDate = (date, locale) => {
	const daysPassed = (currDate, prevDate) => {
		return Math.abs(currDate - prevDate) / (1000 * 60 * 60 * 24);
	};

	if (Math.round(daysPassed(new Date(), date)) === 0) return `Today`;
	else if (Math.round(daysPassed(new Date(), date)) === 1) return "Yesterday";
	else if (Math.round(daysPassed(new Date(), date)) <= 7)
		return `${Math.round(daysPassed(new Date(), date))} days ago`;
	else {
		return `${new Intl.DateTimeFormat(locale, {
			day: "numeric",
			month: "numeric",
			year: "numeric",
		}).format(date)}`;
	}
};

// rendering movements
const renderingMovements = (account, sorted = false) => {
	let html = ``;
	let count_deposit = 0;
	let count_withdrawal = 0;

	const transaction = sorted
		? account.movements.slice().sort((a, b) => a - b)
		: account.movements;

	transaction.forEach((mov, i) => {
		const movement_type = mov > 0 ? "deposit" : "withdrawal";
		const color_type = mov > 0 ? "bg-green-600" : "bg-red-600";

		let date = new Date(account.movementsDates[i]);
		if (date == "Invalid Date") {
			date = new Date();
		}
		const displayDate = formatMovementDate(date, account.locale);

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
						<h6>${displayDate}</h6>
					</div>
					<div class="stack_group_text_right">
						<h4 class="stack_group_text_value">
							${movement_type === "deposit" ? "+" : "-"}${new Intl.NumberFormat(
			account.locale,
			{
				style: "currency",
				currency: account.currency,
			}
		).format(Math.abs(mov).toFixed(2))}
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
	labelBalance.innerText = `${new Intl.NumberFormat(account.locale, {
		style: "currency",
		currency: account.currency,
	}).format(account.totalBalance)}`;

	renderingMovements(account);

	computeDeposit(account);
	computeWithdrawal(account);
	computeInterest(account);
};

const timer = () => {
	// logout timer
	labelTimer.textContent = "10:00";

	let [min, second] = labelTimer.textContent
		.split(":")
		.map((time) => Number(time));

	intervalID = setInterval(() => {
		if (second === 0) {
			if (min === 0) {
				labelTimer.textContent =
					`${min}`.padStart(2, 0) + `:` + `${second}`.padStart(2, 0);
				setTimeout(() => {
					containerApp.classList.add("hidden");
				}, 1000);
				clearInterval(intervalID);
				alert("You are logged out!");
			} else {
				min--;
				second = 59;
			}
		} else {
			second--;
		}
		labelTimer.textContent =
			`${min}`.padStart(2, 0) + `:` + `${second}`.padStart(2, 0);
	}, 1000);

	return intervalID;
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

		inputLoginUsername.value = inputLoginPin.value = "";

		// printing the welcome label associated with the account
		labelWelcome.textContent = `Welcome ${
			currentAccount.owner.split(" ")[0]
		}`;

		// setting up the label date
		const options = {
			hour: "numeric",
			minute: "numeric",
			day: "numeric",
			month: "long",
			year: "numeric",
		};
		// Internationalization API

		// const locale = navigator.language;
		const time = new Intl.DateTimeFormat(
			currentAccount.locale,
			options
		).format(new Date());
		labelDate.innerText = `${time}`;

		// rendering the movements
		renderUI(currentAccount);

		// displaying the app container
		setTimeout(() => {
			containerApp.classList.remove("hidden");
		}, 800);

		if (intervalID) {
			clearInterval(intervalID);
			timer();
		} else {
			timer();
		}
	} else {
		inputLoginUsername.value = inputLoginPin.value = "";
		alert("Invalid Credentials!");
	}
});

// requesting loan
btnLoan.addEventListener("click", (e) => {
	e.preventDefault();
	let isFailed = false;
	const loanAmount = Math.floor(+inputLoanAmount.value);
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
		setTimeout(() => {
			renderUI(currentAccount);
		}, 3000);
		inputLoanAmount.value = "";
	}

	clearInterval(intervalID);
	timer();
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

		inputCloseUsername.value = inputClosePin.value = "";
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
			transferAmount +
				` ${currentAccount.currency}` +
				" is successfully transferred to " +
				targetUser.owner
		);

		// computing the total balance and displaying the balance
		renderUI(currentAccount);

		inputTransferTo.value = inputTransferAmount.value = "";

		clearInterval(intervalID);
		timer();
	} else {
		alert("Invalid Transfer!");
	}
});

// sorting the movements
btnSort.addEventListener("click", () => {
	containerMovements.innerHTML = "";
	renderingMovements(currentAccount, !sorted);
	sorted = !sorted;
});

// PRACTICE

// console.log(time);
