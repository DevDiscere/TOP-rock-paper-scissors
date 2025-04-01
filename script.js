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
            case "Rock": return "./images/rock_hand.png";
            case "Paper": return "./images/paper_hand.png";
            case "Scissors": return "./images/scissors_hand.png";
        }
    }

    humanHandImage.setAttribute("src", getImageSource(humanChoice));
    computerHandImage.setAttribute("src", getImageSource(computerChoice));
}

function playRound (humanChoice, computerChoice) {
    let humanDecision = humanChoice.toLowerCase();
    let computerDecision = computerChoice.toLowerCase();

    if (humanDecision == computerDecision) {
        resultContainer.textContent = `It's a tie! ${humanChoice} does not beat ${computerChoice}.`;
    } else if (
        (humanDecision == "rock" && computerDecision == "scissors") 
        || (humanDecision == "paper" && computerDecision == "rock") 
        || (humanDecision == "scissors" && computerDecision == "paper")
    ) {
        ++humanScore;
        resultContainer.textContent = `You win! ${humanChoice} beats ${computerChoice}.`;
    } else if (
        (computerDecision == "rock" && humanDecision == "scissors") 
        || (computerDecision == "paper" && humanDecision == "rock") 
        || (computerDecision == "scissors" && humanDecision == "paper")
    ) {
        ++computerScore;
        resultContainer.textContent = `You lose! ${computerChoice} beats ${humanChoice}.`;
    }
    
    humanScoreParagraph.textContent = `You: ${humanScore}`;
    computerScoreParagraph.textContent = `Computer: ${computerScore}`;
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

    if (humanScore == computerScore) {
        winnerContainer.textContent = "NO ONE WINS...";
    } else if (humanScore > computerScore) {
        winnerContainer.textContent = "YOU WIN! CONGRATS.";
    } else if (humanScore < computerScore) {
        winnerContainer.textContent = "YOU LOSE! GOODLUCK NEXT TIME.";
    }
}

const startButton = document.querySelector(".start-button");
const section = document.querySelector("section");
startButton.addEventListener("click", (event) => {
    event.target.classList.add("hide");
    section.classList.remove("hide");
});

const NUMBER_OF_ROUNDS = 5;
let gameRound = 1, humanScore = 0, computerScore = 0;
let humanHandImage = document.querySelector(".human-hand");
let computerHandImage = document.querySelector(".computer-hand");
let winnerContainer = document.querySelector(".winner-container");
let resultContainer = document.querySelector(".result-container");
let humanScoreParagraph = document.querySelector(".human-score");
let computerScoreParagraph = document.querySelector(".computer-score");
let commandContainer = document.querySelector(".command-container");

const choiceButtons = document.querySelectorAll(".choice-container button");
choiceButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        if (gameRound == NUMBER_OF_ROUNDS) {
            disableChoiceButtons();
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

    humanHandImage.setAttribute("src", "./images/default_choice.png");
    computerHandImage.setAttribute("src", "./images/default_choice.png");

    enableChoiceButtons();

    winnerContainer.classList.add("hide");

    humanScoreParagraph.textContent = `You: ${humanScore}`;
    computerScoreParagraph.textContent = `Computer: ${computerScore}`;
    resultContainer.textContent = "ROCK. PAPER. SCISSORS.";

    commandContainer.classList.add("hide");
}

const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", resetGame);

const quitButton = document.querySelector(".quit-button");
quitButton.addEventListener("click", () => {
    resetGame();
    section.classList.add("hide");
    startButton.classList.remove("hide");
})

function enableChoiceButtons () {
    choiceButtons.forEach(button => button.removeAttribute("disabled"));
}
function disableChoiceButtons () {
    choiceButtons.forEach(button => button.setAttribute("disabled", "disabled"));
}