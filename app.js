let boxes = document.querySelectorAll(".box");
let ResetBtn = document.querySelector("#ResetBtn");
let newGameBtn = document.querySelector("#New-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    removeWinClasses();
}

const removeWinClasses = () => {
    boxes.forEach(box => {
        box.classList.remove('win', 'horizontal', 'vertical', 'diagonal-right', 'diagonal-left', 'x', 'o');
    });
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add('o');
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add('x');
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove('x', 'o');
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
}

const addWinClasses = (pattern, type) => {
    pattern.forEach(index => {
        boxes[index].classList.add('win', type);
    });
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                let type;
                if (pattern[0] < 3 && pattern[1] < 3 && pattern[2] < 3) {
                    type = 'horizontal';
                } else if (pattern[0] % 3 === 0 && pattern[1] % 3 === 1 && pattern[2] % 3 === 2) {
                    type = 'horizontal';
                } else if (pattern[0] % 3 === pattern[1] % 3 && pattern[1] % 3 === pattern[2] % 3) {
                    type = 'vertical';
                } else if (pattern[0] === 0 && pattern[1] === 4 && pattern[2] === 8) {
                    type = 'diagonal-right';
                } else if (pattern[0] === 2 && pattern[1] === 4 && pattern[2] === 6) {
                    type = 'diagonal-left';
                }

                addWinClasses(pattern, type);
                showWinner(pos1Val);
                disableBoxes();
                return;
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
ResetBtn.addEventListener("click", resetGame);
