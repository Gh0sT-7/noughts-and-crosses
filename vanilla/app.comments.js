// CSS Class Selectors.
const X_CLASS = 'x';
const O_CLASS = 'o';

// Array of possible wins.
const SUCESS_COMBOS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

// Grabbing a cell marked with [data-cell] attribute.
const cellElements = document.querySelectorAll('[data-cell]');

// Grabbing the board.
const board = document.getElementById('board');

// Grabbing the Success Message Text elements.
const sucessMessageText = document.querySelector('[data-success-message-text]');
const successMessage = document.querySelector('.success-message');

// Restart Button
const restartButton = document.getElementById('restartButton');


// Variable for keeping track of who's turn it is.
let turn;

startGame();

restartButton.addEventListener('click', startGame);

// Setting inside function to fix issue with the first instance not working.
function startGame() {
	turn = false;
	// Looping over each cell to allow a click event.
	cellElements.forEach((cell) => {
		cell.classList.remove(O_CLASS);
		cell.classList.remove(X_CLASS);
		cell.removeEventListener('click', handleClick);
		cell.addEventListener('click', handleClick);
	});
	setBoardHoverClass();
	successMessage.classList.remove('show');
}

// Function to process what happens in a click event.
function handleClick(event) {
	console.log('clickings');

	// Determine what cell the event should happen on.
	const cell = event.target;

	// Keep track of who's turn it is by checking which class is active after clicking a cell. If the turn is X then set an X, if not, then it must be O so set circle. Not sure if my thinking is correct here...
	const currentClass = turn ? O_CLASS : X_CLASS;

	// Processing the event to mark the cell by taking the current cell and current turn based on the class.
	markCell(cell, currentClass);

	if (checkWinner(currentClass)) {
		console.log('winner!!!');
		endGame(false);
	} else if (draw()) {
		endGame(true);
	} else {
		// Switch Turns; if the click event has already fired, do the inverse? Not sure how/why this works exactly.
		swapTurns();

		// Sets the current class based on who's turn it is, whether or not the turn is inverse.
		setBoardHoverClass();
	}
}

// Taking both the cell position and whoever's turn it is, and adding the class to the cell.
function markCell(cell, currentClass) {
	cell.classList.add(currentClass);
}

function swapTurns() {
	turn = !turn;
}

function setBoardHoverClass() {
	board.classList.remove(X_CLASS);
	board.classList.remove(O_CLASS);

	if (turn) {
		board.classList.add(O_CLASS);
	} else {
		board.classList.add(X_CLASS);
	}
}

function checkWinner(currentClass) {
	// Check all of the winning combinations to see if ".some" of the winning combinations are met by the current combinations. // .some returns true if any of the values inside of it are true.
	return SUCESS_COMBOS.some((combination) => {
		// Every to check every element has the same class.
		return combination.every((index) => {
			// Checking which cell the combination appears, then check the class list for the current class. So if the same class is inside all 3 in the current combination, then we know who the winner is.
			return cellElements[index].classList.contains(currentClass);
		});
	});
}

function draw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
	});
}

function endGame(draw) {
	if (draw) {
		sucessMessageText.innerText = `Draw!`;
	} else {
		sucessMessageText.innerText = `${turn ? "O's" : "X's"} Wins!`;
	}
	successMessage.classList.add('show');
}
