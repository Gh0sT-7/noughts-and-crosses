const O_CLASS = 'o';
const X_CLASS = 'x';
const board = document.getElementById('board');
const cellElements = document.querySelectorAll('[data-cell]');
const successMessage = document.querySelector('.success-message');
const sucessMessageText = document.querySelector('[data-success-message-text]');const restartButton = document.getElementById('restartButton');
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

let playerTurn;

restartButton.addEventListener('click', startGame);

function startGame() {
	playerTurn = false;
	cellElements.forEach((cell) => {
		cell.classList.remove(O_CLASS);
		cell.classList.remove(X_CLASS);
		cell.removeEventListener('click', handleClick);
		cell.addEventListener('click', handleClick);
	});
	setBoardHoverClass();
	successMessage.classList.remove('show');
}

function handleClick(event) {
	const cell = event.target;
	playerTurn = !playerTurn;
	const currentClass = playerTurn ? O_CLASS : X_CLASS;
	markCell(cell, currentClass);

	if (checkWinner(currentClass)) {
		console.log('winner!!!');
		endGame(false);
	} else if (draw()) {
		endGame(true);
	} else {
		swapTurns();
		setBoardHoverClass();
	}
}

function markCell(cell, currentClass) {
	cell.classList.add(currentClass);
}

function swapTurns(playerTurn) {
	return !playerTurn;
}

function setBoardHoverClass() {
	board.classList.remove(X_CLASS);
	board.classList.remove(O_CLASS);

	if (!playerTurn) {
		board.classList.add(O_CLASS);
	} else {
		board.classList.add(X_CLASS);
	}
}

function checkWinner(currentClass) {
	return SUCESS_COMBOS.some((combination) => {
		return combination.every((index) => {
			return cellElements[index].classList.contains(currentClass);
		});
	});
}

function draw() {
	return [...cellElements].every((cell) => {
		return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
	});
}

function endGame(draw) {
	if (draw) {
		sucessMessageText.innerText = `Draw!`;
	} else {
		sucessMessageText.innerText = `${playerTurn ? "O's" : "X's"} Wins!`;
	}
	successMessage.classList.add('show');
}

startGame();




