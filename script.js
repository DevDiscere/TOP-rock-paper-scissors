function getComputerChoice() {
    const NUMBER_OF_HANDS = 3;
    const OFFSET_BY_ONE = 1;
    
    let randomNumber = Math.floor(Math.random() * NUMBER_OF_HANDS) + OFFSET_BY_ONE;
    switch(randomNumber) {
        case 1: return "Rock";
        case 2: return "Paper";
        case 3: return "Scissors";
    }
}

function playerSelection(event) {
    let targetButton = event.target.classList.value;
    let humanChoice = "";

    switch(targetButton) {
        case "rock-button":
            humanChoice = "Rock";
            console.log(`You played ${humanChoice}!`);
            // Play Round
            break;
        case "paper-button":
            humanChoice = "Paper";
            console.log(`You played ${humanChoice}!`);
            // Play Round
            break;
        case "scissors-button":
            humanChoice = "Scissors";
            console.log(`You played ${humanChoice}!`);
            // Play Round
            break;
    }
}

function playGame(numberOfTries) {
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

    let humanSelection = "", computerSelection = "";

    for(i = 0; i < numberOfTries; i++) {
        humanSelection = getHumanChoice();
        computerSelection = getComputerChoice();
        console.log(playRound(humanSelection, computerSelection));
    }

    console.log(`You: ${humanScore}, Computer: ${computerScore}`);

    if (humanScore > computerScore) {
        console.log("YOU WIN!!!");
    } else if (humanScore < computerScore) {
        console.log("COMPUTER WINS!!!")
    } else {
        console.log("NO ONE WINS...")
    }
}

const body = document.querySelector("body");
body.addEventListener('click', playerSelection);
// playGame(5);