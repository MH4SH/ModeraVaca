module.exports = (n) => {
	let count = 1;
	let number = 1;
	while (count < n) { count++; number = number*10; } 
	return Math.floor(number + Math.random() * (number * 9));
}