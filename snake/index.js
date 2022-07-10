const board = document.querySelector('#grid__boardid');
const score = document.querySelector('.scoreshow');
const gameCondition = document.querySelector('.gameCondition');
let lastTime = 0;
let cusSpeed = 3;
let countDown = 0;
let anim = true;
let snakesucide = false;
let gamescore = 00;
let condition = "Start";
let isStart = false;
let snakeElement, fishElement;
let snakePos = {
    x: 0,
    y: 0
};
let snakeArray = [{
    x: 15,
    y: 15
}];
let fishPos = {
    x: 10,
    y: 10
};
//Draw fish and Snake
const gameEngine = () => {
    if (!snakesucide) {
        board.innerHTML = '';
        //create Snake
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = snakeArray[0].y;
        snakeElement.style.gridColumnStart = snakeArray[0].x;
        snakeElement.classList.add('head');
        board.appendChild(snakeElement);
        for (let i = 1; i < snakeArray.length; i++) {
            {
                //  console.log(snakeArray);
                if (snakeArray.length <= 5) {
                    snakeElement = document.createElement('div');
                    snakeElement.style.gridRowStart = snakeArray[i].y;
                    snakeElement.style.gridColumnStart = snakeArray[i].x;
                    snakeElement.classList.add('initial');
                    board.appendChild(snakeElement);
                }
                if (snakeArray.length > 5) {
                    snakeElement = document.createElement('div');
                    snakeElement.style.gridRowStart = snakeArray[i].y;
                    snakeElement.style.gridColumnStart = snakeArray[i].x;
                    snakeElement.classList.remove('initial');
                    snakeElement.classList.add('medium');
                    board.appendChild(snakeElement);
                }
                if (snakeArray.length > 15) {
                    snakeElement = document.createElement('div');
                    snakeElement.style.gridRowStart = snakeArray[i].y;
                    snakeElement.style.gridColumnStart = snakeArray[i].x;
                    snakeElement.classList.remove('medium');
                    snakeElement.classList.add('large');
                    board.appendChild(snakeElement);
                }
            }
        }
        //addgin score 
        score.innerHTML = gamescore;
        //adding gameCondition
        gameCondition.innerHTML = condition;
        //create Fish
        fishElement = document.createElement('div');
        fishElement.style.gridRowStart = fishPos.y;
        fishElement.style.gridColumnStart = fishPos.x;
        fishElement.classList.add('fish');
        board.appendChild(fishElement);
    }
}
// game function logic is here

const goDown = () => {
    //  console.log('goDown');
    snakePos.y = 1;
    snakePos.x = 0;
};
const goUp = () => {
    //  console.log('goUp');
    snakePos.y = -1;
    snakePos.x = 0;
    //  console.log(snakeArray);
};
const goLeft = () => {
    //   console.log('goLeft');
    snakePos.x = -1;
    snakePos.y = 0;
};
const goRight = () => {
    //   console.log('goRight');
    snakePos.x = 1;
    snakePos.y = 0;
};

//call all function

const main = (currtime) => {
    checkKillEnemy();
    if (anim) {
        window.requestAnimationFrame(main);
    }
    if ((currtime - lastTime) / 1000 < 1 / cusSpeed) {
        return;
    };
    lastTime = currtime;



    for (let i = snakeArray.length - 2; i >= 0; i--) {

        snakeArray[i + 1] = {
            ...snakeArray[i]
        }
    }
    snakeArray[0].x += snakePos.x;
    snakeArray[0].y += snakePos.y;
    if (checkOutside()) {
        if (checkSucide()) {
            gameEngine()
        }
    }
}
//game event listner here Logic
document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case "ArrowDown":
            isStart ? goDown() : 'Not start';
            break;
        case "ArrowUp":
            isStart ? goUp() : 'Not start';
            break;
        case "ArrowLeft":
            isStart ? goLeft() : 'Not start';
            break;
        case "ArrowRight":
            isStart ? goRight() : 'Not start';
            break;
        case "Space":
            if (isStart == true) {
                if (anim) {
                    anim = false;
                    condition = 'Pause';
                    gameCondition.innerHTML = condition;
                } else {
                    anim = true;
                    condition = 'Running';
                    window.requestAnimationFrame(main);

                };
            }
            break;
        case 'Enter':
            if (!isStart) {
                isStart = true;
                snakePos.x = 1;
                snakePos.y = 0;
                condition = "Running";
                window.requestAnimationFrame(main);
            } else {
                isStart = false;
                condition = "Start";
                snakePos = {
                    x: 0,
                    y: 0
                };
                snakeArray = [{
                    x: 15,
                    y: 15
                }];
                fishPos = {
                    x: 10,
                    y: 10
                };
            }
    }
});

const checkKillEnemy = () => {
    if (fishPos.y == snakeArray[0].y && fishPos.x == snakeArray[0].x) {
        fishElement.style.backgroundColor = 'transparent';
        let newx = Math.floor(Math.random() * 16 + 2);
        let newy = Math.floor(Math.random() * 16 + 2);
        fishPos.y = newy;
        fishPos.x = newx;
        //    console.log(snakeArray[snakeArray.length - 1])
        snakeArray.push({
            x: snakeArray[snakeArray.length - 1].x + snakePos.x,
            y: snakeArray[snakeArray.length - 1].y + snakePos.y
        });
        cusSpeed += 0.2;
        gamescore += 5;
    } else {
        return;
    }
}
const checkOutside = () => {
    if (snakeArray[0].x == 21 || snakeArray[0].x == 0 || snakeArray[0].y == 21 || snakeArray[0].y == 0) {
        alert(`Your'e dead`);
        snakePos = {
            x: 0,
            y: 0
        };
        snakeArray = [{
            x: 15,
            y: 15
        }];
        fishPos = {
            x: 10,
            y: 10
        };
    } else {
        return true;
    }
}
const checkSucide = () => {

    if (snakeArray.length > 0) {
        for (let i = 1; i <= snakeArray.length - 1; i++) {
            if (snakeArray[0].x === snakeArray[i].x && snakeArray[0].y === snakeArray[i].y) {
                anim = false;
                alert(`Your'e Dead`)
            }
        }
    }
    return true;
}
const showName = () => {}
//start game
window.requestAnimationFrame(main);