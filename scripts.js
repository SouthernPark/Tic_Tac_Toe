const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
// select all the cells
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const restartButton = document.getElementById('restartButton')
let circleTurn

const winning_mess_text = document.querySelector('[data-winning-mess-text]')
const winning_mess_element = document.getElementById('winningMessage')
const WINNING_COMBINATION = [
    //horizontal win
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //vertical win
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagnoal win
    [0, 4, 8],
    [2, 4, 6]
]

startGame()

function startGame() {
    // default first turn is X
    circleTurn = false
    // add listener to each cell
    cellElements.forEach(cell => {
        // only fire the event listener once
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setHover()
    winning_mess_element.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    // place the mark
    placeMark(cell, currentClass)
    // check for win
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    }
    else {
        //switch turns
        switchTurn()
        //set hover effect
        // we put setHover behind switch turn, because we want the hover based on the
        // updated turn
        setHover()

    }
}


function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}


// draw -> no winner and no loser
function endGame(draw) {
    if (draw) {
        winning_mess_text.innerText = 'Draw!'
    }
    else {
        winning_mess_text.innerText = `${circleTurn ? "O's Win!" : "X's Win"}`
    }
    winning_mess_element.classList.add('show')
}


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function switchTurn() {
    circleTurn = !circleTurn
}

function setHover() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    }
    else {
        board.classList.add(X_CLASS)
    }
}

// if there is one possible combination occurs 
// they current class win
function checkWin(currentClass) {
    return WINNING_COMBINATION.some(combination => {

        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

restartButton.addEventListener('click', startGame)
