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
