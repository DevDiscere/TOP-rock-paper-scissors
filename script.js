function getHumanChoice (buttonEvent) {
    let targetButtonClass = buttonEvent.target.classList.value;
    
    switch (targetButtonClass) {
        case "rock-button": return "Rock";
        case "paper-button": return "Paper";
        case "scissors-button": return "Scissors";
    }
}

function getComputerChoice () {
    const NUMBER_OF_HANDS = 3, OFFSET_BY_ONE = 1;
    let randomNumber = Math.floor(Math.random() * NUMBER_OF_HANDS) + OFFSET_BY_ONE;

    switch (randomNumber) {
        case 1: return "Rock";
        case 2: return "Paper";
        case 3: return "Scissors";
    }
};

function displayHandChoice (humanChoice, computerChoice) {
    function getImageSource (handChoice) {
        switch (handChoice) {
            case "Rock": return "./images/rock_hand.svg";
            case "Paper": return "./images/paper_hand.svg";
            case "Scissors": return "./images/scissors_hand.svg";
        }
    }

    humanHandImage.setAttribute("src", getImageSource(humanChoice));
    computerHandImage.setAttribute("src", getImageSource(computerChoice));
}

function playRound (humanChoice, computerChoice) {
    let humanDecision = humanChoice.toLowerCase();
    let computerDecision = computerChoice.toLowerCase();

    if (humanDecision == computerDecision) {
        resultContainer.textContent = `Round ${gameRound}: ${humanChoice} does not beat ${computerChoice}.`;
    } else if (
        (humanDecision == "rock" && computerDecision == "scissors") 
        || (humanDecision == "paper" && computerDecision == "rock") 
        || (humanDecision == "scissors" && computerDecision == "paper")
    ) {
        ++humanScore;
        resultContainer.textContent = `Round ${gameRound}: ${humanChoice} beats ${computerChoice}.`;
    } else if (
        (computerDecision == "rock" && humanDecision == "scissors") 
        || (computerDecision == "paper" && humanDecision == "rock") 
        || (computerDecision == "scissors" && humanDecision == "paper")
    ) {
        ++computerScore;
        resultContainer.textContent = `Round ${gameRound}: ${computerChoice} beats ${humanChoice}.`;
    }
    
    humanScoreParagraph.textContent = `YOU: ${humanScore}`;
    computerScoreParagraph.textContent = `COMPUTER: ${computerScore}`;
}

function playGame (buttonEvent) {
    let humanChoice = getHumanChoice(buttonEvent);
    let computerChoice = getComputerChoice();

    displayHandChoice(humanChoice, computerChoice);
    playRound(humanChoice, computerChoice);
}

function displayGameWinner (humanScore, computerScore) {
    winnerContainer.classList.remove("hide");
    commandContainer.classList.remove("hide");
    choiceContainer.classList.add("hide");

    if (humanScore == computerScore) {
        winnerContainer.textContent = "IT'S A TIE! NO ONE WINS.";
    } else if (humanScore > computerScore) {
        winnerContainer.textContent = "YOU WIN! CONGRATULATIONS.";
    } else if (humanScore < computerScore) {
        winnerContainer.textContent = "YOU LOSE! GOODLUCK NEXT TIME.";
    }
}

const startButton = document.querySelector(".start-button");
const gameContainer = document.querySelector(".game-container");
startButton.addEventListener("click", (event) => {
    event.target.classList.add("hide");
    imageContainer.classList.add("hide");
    gameContainer.classList.remove("hide");
});

const NUMBER_OF_ROUNDS = 5;
let gameRound = 1, humanScore = 0, computerScore = 0;
let imageContainer = document.querySelector(".image-container");
let humanHandImage = document.querySelector(".human-hand");
let computerHandImage = document.querySelector(".computer-hand");
let winnerContainer = document.querySelector(".winner-container");
let resultContainer = document.querySelector(".result-container");
let humanScoreParagraph = document.querySelector(".human-score");
let computerScoreParagraph = document.querySelector(".computer-score");
let commandContainer = document.querySelector(".command-container");
let choiceContainer = document.querySelector(".choice-container");

const choiceButtons = document.querySelectorAll(".choice-container button");
choiceButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        if (gameRound == NUMBER_OF_ROUNDS) {
            playGame(event);
            displayGameWinner(humanScore, computerScore);
        } else if (gameRound < NUMBER_OF_ROUNDS) {
            playGame(event);
            ++gameRound;
        }
    });
});

function resetGame () {
    gameRound = 1, humanScore = 0, computerScore = 0;

    humanHandImage.setAttribute("src", "./images/default_choice.svg");
    computerHandImage.setAttribute("src", "./images/default_choice.svg");

    humanScoreParagraph.textContent = `You: ${humanScore}`;
    computerScoreParagraph.textContent = `Computer: ${computerScore}`;
    resultContainer.textContent = "Choose a hand to throw.";

    winnerContainer.classList.add("hide");
    commandContainer.classList.add("hide");

    choiceContainer.classList.remove("hide");
}

const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", resetGame);

const quitButton = document.querySelector(".quit-button");
quitButton.addEventListener("click", () => {
    resetGame();
    gameContainer.classList.add("hide");
    imageContainer.classList.remove("hide");
    startButton.classList.remove("hide");
})
