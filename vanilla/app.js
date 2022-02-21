// CSS Class Selectors
const X_CLASS = 'x';
const O_CLASS = 'o';

// Grabbing a cell marked with [data-cell] attribute.
const cellElements = document.querySelectorAll('[data-cell]');

// Grabbing the board.
const board = document.getElementById('board');

// Variable for keeping track of who's turn it is.
let turn;

startGame();

// Setting inside function to fix issue with the first instance not working.
function startGame() {
	turn = false;
	// Looping over each cell to allow a click event.
	cellElements.forEach((cell) => {
		cell.addEventListener('click', handleClick);
	});
	setBoardHoverClass();
}

// Function to process what happens in a click event.
function handleClick(event) {
	console.log('clickings');

	// Determine what cell the event should happen on.
	const cell = event.target;

	// Keep track of who's turn it is by checking which class is active after clicking a cell. If the turn is X then set an X, if not, then it must be O so set circle. Not sure if my thinking is correct here...
	const currentClass = turn ? X_CLASS : O_CLASS;

	// Processing the event to mark the cell by taking the current cell and current turn based on the class.
	markCell(cell, currentClass);

	// /// /// To Do
	// Check for win?
	// Check for Draw?

	// Switch Turns; if the click event has already fired, do the inverse? Not sure how/why this works exactly.
	swapTurns();

	// Sets the current class based on who's turn it is, whether or not the turn is inverse.
	setBoardHoverClass();
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
