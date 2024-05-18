("use strict");

// calculating the current balance
export const calculatingBalance = (movements) => {
	const total = movements.reduce(
		(acc, amount, i, movements) => acc + amount,
		0
	);
	return total.toFixed(2);
};
