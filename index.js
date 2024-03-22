function Gameboard() {
	this.board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	this.last_move = "";

	this.playmove = function (button, player) {
		if (button.textContent == " ") {
			let pos = button.className;
			let x = pos[1];
			let y = pos[0];
			this.board[y][x] = player.sign;
			this.last_move = player.sign;
			button.textContent = player.sign;

			if (this.checkBoard() == 1) {
				player.score++;
				return this.restartreq(
					"Game over! Player " + player.sign + " wins!"
				);
			} else if (this.checkBoard() == -1) {
				return this.restartreq("a draw");
			}
		} else {
			// Add shaking effect to signify that a move cannot be made
			button.classList.add("shake-text");
			// Remove the shaking effect after a short delay
			setTimeout(function () {
				button.classList.remove("shake-text");
			}, 500); // Adjust this time as needed
		}
	};

	this.restartreq = function (msg) {
		board.style.display = "none";
		start.style.display = null;
		const restart = document.querySelector(".modal-content");
		restart.textContent = "Restart!";
		const message = document.querySelector(".players-message");
		message.textContent = msg;
	};

	// 1 = win for the last player, 0 = game continues, -1 = draw
	this.checkBoard = function () {
		let val = this.last_move;
		let board = this.board;

		for (let i = 0; i < 3; i++) {
			if (
				board[i][0] == val &&
				board[i][1] == val &&
				board[i][2] == val
			) {
				return 1;
			}

			if (
				board[0][i] == val &&
				board[1][i] == val &&
				board[2][i] == val
			) {
				return 1;
			}
		}

		if (board[0][0] == val && board[1][1] == val && board[2][2] == val) {
			return 1;
		}

		let counter = 0;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] != "") {
					counter++;
				}
			}
		}

		if (counter == 9) {
			return -1;
		} else {
			return 0;
		}
	};
}

function Player(sign) {
	this.sign = sign;
	this.score = 0;
}

function handleClick(button) {
	current_player = players[index];
	index = (index + 1) % 2;
	return gameboard.playmove(button, current_player);
}

const start = document.querySelector(".start-container");
const board = document.querySelector(".board");
const scores = document.querySelector(".score");

let gameboard = new Gameboard();

let current_player;
let playX = new Player("X");
let playO = new Player("O");

let players = [playX, playO];
let index = 0;

function game() {
	const score_x = document.querySelector(".scorex");
	const score_o = document.querySelector(".scoreo");

	score_x.textContent = "X: " + playX.score;
	score_o.textContent = "O: " + playO.score;

	gameboard.board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	gameboard.last_move = "";

	// Get all buttons and set their text content to empty
	let buttons = document.querySelectorAll(".board button");
	buttons.forEach((button) => {
		button.textContent = " ";
	});

	board.style.display = null;
	start.style.display = "none";
}
