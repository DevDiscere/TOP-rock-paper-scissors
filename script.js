function getComputerChoice () {
    let randomNumber = 0;
    let computerChoice = "";
    
    randomNumber = Math.floor(Math.random() * 3) + 1;
    switch(randomNumber) {
        case 1:
            return computerChoice = "Rock";
        case 2:
            return computerChoice = "Paper";
        case 3:
            return computerChoice = "Scissors";
    }
}

function getHumanChoice() {
    let humanChoice = "";

    humanChoice = prompt('Play a hand ("Rock", "Paper", "Scissors"): ');
    return humanChoice;
}

let humanScore = 0, computerScore = 0;

function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();
    computerChoice = computerChoice.toLowerCase();

    let formattedHumanChoice = humanChoice.charAt(0).toUpperCase().concat(humanChoice.slice(1));
    let formattedComputerChoice = computerChoice.charAt(0).toUpperCase().concat(computerChoice.slice(1));
    let result = "";

    if (humanChoice == computerChoice) {
        return result = `It's a tie! ${formattedHumanChoice} does not beat ${formattedComputerChoice}.`;
    }

    if (
        (humanChoice == "rock" && computerChoice == "scissors") 
        || (humanChoice == "paper" && computerChoice == "rock") 
        || (humanChoice == "scissors" && computerChoice == "paper")
    ) {
        ++humanScore;
        return result = `You win! ${formattedHumanChoice} beats ${formattedComputerChoice}.`;
    }
    else if (
        (computerChoice == "rock" && humanChoice == "scissors") 
        || (computerChoice == "paper" && humanChoice == "rock") 
        || (computerChoice == "scissors" && humanChoice == "paper")
    ) {
        ++computerScore;
        return result = `You lose! ${formattedComputerChoice} beats ${formattedHumanChoice}.`;
    }
}

const computerSelection = getComputerChoice();
const humanSelection = getHumanChoice();

console.log(playRound(humanSelection, computerSelection));