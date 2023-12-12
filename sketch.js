const GRID_SIZE = 30;
let button = [];
let presentClicked;
let buttonX, buttonY;
let bluePresent, bluePresentOpening;
let coal, numberOfCoal;
let numberOfCells;
let coalX = [], coalY = [];
let coalAround;
let newCoalCoord;
let coalIndeces = [];
let numberFont;
let tagModeOn;
let restartButton;
let gameIsOver;
let presentsTagged;
let isMouseInsideCircle, distanceFromCircle, restartGame;
var counter = 0;
var clock = 0;
let notCoal;
let youWin;

function preload() {
    bluePresentOpening = loadImage("assets/present-animation-1.gif");
    bluePresent = loadImage("assets/blue present.png");
    pinkPresent = loadImage("assets/pink present.png");
    coal = loadImage("assets/coal.png");
    numberFont = loadFont("assets/Pacifico-Regular.ttf");
    restartButton = loadImage("assets/restart.png");
    timer = loadImage("assets/timer.png");
    countUp = loadFont("assets/Inconsolata-VariableFont_wdth,wght.ttf");
    youWinScreen = loadImage("assets/you-win-screen.gif");
    youLoseScreen = loadImage("assets/you-lose-screen.gif");
}

class Button {
    displayPresent;
    buttonClicked;
    buttonX;
    buttonY;
    totalNumber;
    isPresentTagged;
    notCoal;

    constructor(x, y) {
        this.buttonX = x;
        this.buttonY = y;
        this.displayPresent = true;
        this.buttonClicked = false;
        this.isPresentTagged = false;
    }

    draw() {
        if (this.isPresentTagged === false) {
            if (this.displayPresent === true && this.buttonClicked === false) {
                image(bluePresent, this.buttonX, this.buttonY,
                    GRID_SIZE, GRID_SIZE);
            }
            else if (this.displayPresent === true && this.buttonClicked === true) {
                textFont(numberFont);
                textAlign(CENTER, CENTER);
                textSize(GRID_SIZE * 1.1);
                fill(20, 255, 0);
                text(this.totalNumber, this.buttonX + GRID_SIZE / 2,
                    this.buttonY + GRID_SIZE / 6);
            }
            else {
                image(coal, this.buttonX, this.buttonY,
                    coal.width / 4.5, coal.height / 4.5);
            }
        }
        else if (this.isPresentTagged === true) {
            image(pinkPresent, this.buttonX, this.buttonY,
                GRID_SIZE, GRID_SIZE);
        }
    }

    mouseOverPresent() {
        if (mouseX < (GRID_SIZE + this.buttonX) && mouseX > this.buttonX &&
            mouseY > this.buttonY && mouseY < (GRID_SIZE + this.buttonY)) {
            mouseIsOverPresent = true;
            return mouseIsOverPresent;
        }
        else {
            mouseIsOverPresent = false;
            return mouseIsOverPresent;
        }
    }

    isThereACoal() {
        this.leftX = this.buttonX - GRID_SIZE;
        this.middleX = this.buttonX;
        this.rightX = this.buttonX + GRID_SIZE;
        this.totalNumber = 0;
        for (let k = 0; k < coalX.length; k++) {
            if (coalX[k] === this.leftX && coalY[k] === this.buttonY) {
                this.totalNumber++;
            }
            if (coalX[k] === this.leftX && coalY[k] === this.buttonY - GRID_SIZE) {
                this.totalNumber++;
            }
            if (coalX[k] === this.leftX && coalY[k] === this.buttonY + GRID_SIZE) {
                this.totalNumber++;
            }
            if (coalX[k] === this.middleX && coalY[k] === this.buttonY + GRID_SIZE) {
                this.totalNumber++;
            }
            if (coalX[k] === this.middleX && coalY[k] === this.buttonY - GRID_SIZE) {
                this.totalNumber++;
            }
            if (coalX[k] === this.rightX && coalY[k] === this.buttonY + GRID_SIZE) {
                this.totalNumber++;
            }
            if (coalX[k] === this.rightX && coalY[k] === this.buttonY) {
                this.totalNumber++;
            }
            if (coalX[k] === this.rightX && coalY[k] === this.buttonY - GRID_SIZE) {
                this.totalNumber++;
            }
        }
        return this.totalNumber;
    }
}

function setup() {
    createCanvas(GRID_SIZE * 21, GRID_SIZE * 28);
    numberOfCoal = floor(random(80, 100));

    gameIsOver = false;

    presentClicked = false;
    mouseIsOverPresent = false;

    tagModeOn = false;

    notCoal = 0;

    youWin = false;

    isMouseInsideCircle = false;
    restartGame = false;

    presentsTagged = numberOfCoal;

    for (buttonX = 15; buttonX < width - GRID_SIZE + 15; buttonX += GRID_SIZE) {
        for (buttonY = GRID_SIZE * 5; buttonY < height - GRID_SIZE - 15; buttonY += GRID_SIZE) {
            button.push(new Button(buttonX, buttonY));
        }
    }

    for (i = 0; i < numberOfCoal; i++) {
        newCoalCoord = coalCoordinate();
        coalIndeces.push(newCoalCoord);
        coalX.push(button[newCoalCoord].buttonX);
        coalY.push(button[newCoalCoord].buttonY);
    }
}

function draw() {
    background(200, 40, 20);

    imageMode(CENTER);
    image(restartButton, GRID_SIZE * 15, GRID_SIZE * 2.6,
        restartButton.width * 12 / GRID_SIZE, restartButton.height * 12 / GRID_SIZE);

    imageMode(CORNER);
    image(timer, GRID_SIZE, GRID_SIZE * 1.3, timer.width, timer.height);

    textAlign(RIGHT, CENTER);
    textSize(65);
    fill(255, 0, 30);
    textFont(countUp);

    if(gameIsOver === false && youWin === false) {
        if(frameCount % 60 === 0){
            clock = convertSeconds(counter++);
        }
    }

    console.log(tagModeOn)
    
    text(clock, GRID_SIZE * 6.8, GRID_SIZE * 2.3);

    fill(20, 255, 0);
    textAlign(CENTER, CENTER);
    textFont(numberFont);
    textSize(85);
    text(presentsTagged, GRID_SIZE * 10.5, GRID_SIZE * 1.7);

    for (i = 0; i < button.length; i++) {
        button[i].draw();
    }

    if (tagModeOn === false) {
        image(bluePresent, width - GRID_SIZE * 3.5, GRID_SIZE * 1.3,
            bluePresent.width / GRID_SIZE * 2, bluePresent.height / GRID_SIZE * 2);
        textFont(countUp);
        textSize(30);
        text("[E]", width - GRID_SIZE * 2.5, GRID_SIZE * 4);
    }
    else {
        image(pinkPresent, width - GRID_SIZE * 3.5, GRID_SIZE * 1.3,
            pinkPresent.width / GRID_SIZE * 2, pinkPresent.height / GRID_SIZE * 2);
            textFont(countUp);
        textSize(30);
        text("[W]", width - GRID_SIZE * 2.5, GRID_SIZE * 4);
    }

    distanceFromCircle = dist((GRID_SIZE * 15), (GRID_SIZE * 2.6), mouseX, mouseY);

    gameOver();

    gameWon();

    restart();
}

function mousePressed() {
    if(gameIsOver === false && youWin === false) {
        for (i = 0; i < button.length; i++) {
            if (button[i].mouseOverPresent() === true) {
                let coalFound = false;
                if (tagModeOn === false) {
                    if(button[i].isPresentTagged === false) { 
                    button[i].buttonClicked = true;
                    notCoal++;
                        for (j = 0; j < button.length; j++) {
                            if (mouseX > coalX[j] && mouseX < (coalX[j] + GRID_SIZE) &&
                                mouseY > coalY[j] && mouseY < (coalY[j] + GRID_SIZE)) {
                                button[i].displayPresent = false;
                                coalFound = true;
                                gameIsOver = true;
                            }
                        }
                        if (coalFound === false) {
                            button[i].isThereACoal(i);
                        }
                    }
                }
                else {
                    if (button[i].isPresentTagged === true) {
                        button[i].isPresentTagged = false;
                        presentsTagged++;
                        return presentsTagged;
                    }
                    else {
                        button[i].isPresentTagged = true;
                        presentsTagged--;
                        return presentsTagged;
                    }
                }
            }
        }
    }

    if(distanceFromCircle <= restartButton.width * 6 / GRID_SIZE) {
        isMouseInsideCircle = true;
        return isMouseInsideCircle;
    }
    else {
        isMouseInsideCircle = false
        return isMouseInsideCircle;
    }
}

function coalCoordinate() {
    indexFound = false;
    numberOfCells = ((width - GRID_SIZE) / GRID_SIZE) * ((height - GRID_SIZE * 6) / GRID_SIZE);
    randomCell = random(numberOfCells);
    randomCellFloor = floor(randomCell);

    while (coalIndeces.includes(randomCellFloor) === true) {
        numberOfCells = ((width - GRID_SIZE) / GRID_SIZE) * ((height - GRID_SIZE * 6) / GRID_SIZE);
        randomCell = random(numberOfCells);
        randomCellFloor = floor(randomCell);
    }

    return randomCellFloor;
}

function keyPressed() {
    if (key === "e") {
        tagModeOn = true;
        return tagModeOn;
    }
    if (key === "w") {
        tagModeOn = false;
        return tagModeOn;
    }
}

function restart() {
    if(isMouseInsideCircle === true) {
        gameIsOver = false;
        presentClicked = false;
        mouseIsOverPresent = false;
        tagModeOn = false;
        presentsTagged = numberOfCoal;
        button = [];
        coalX = [];
        coalY = [];
        coalIndeces = [];
        counter = 0;
        clock = 0;
        numberOfCoal = floor(random(80, 100));
        convertSeconds(0);

        for (buttonX = 15; buttonX < width - GRID_SIZE + 15; buttonX += GRID_SIZE) {
            for (buttonY = GRID_SIZE * 5; buttonY < height - GRID_SIZE - 15; buttonY += GRID_SIZE) {
                button.push(new Button(buttonX, buttonY));
            }
        }
    
        for (i = 0; i < numberOfCoal; i++) {
            newCoalCoord = coalCoordinate();
            coalIndeces.push(newCoalCoord);
            coalX.push(button[newCoalCoord].buttonX);
            coalY.push(button[newCoalCoord].buttonY);
        }

        isMouseInsideCircle = false;
    }
}

function gameOver() {
    for (i = 0; i < button.length; i++) {
        if (gameIsOver === true) {
            rectMode(CENTER);
            fill(0, 175);
            noStroke();
            rect(width / 2, (height / 2) + GRID_SIZE * 2, width - GRID_SIZE, height - GRID_SIZE * 6);
            imageMode(CENTER);
            image(youLoseScreen, width / 2, height / 2,
             youLoseScreen.width / 2, youLoseScreen.height / 2);
            return gameIsOver;
        }
    }
}

function convertSeconds(s){
    var min = floor(s/60);
    var sec = s % 60;
    return nf(min, 2) + ":" + nf(sec, 2);
}

function gameWon() {
    for (i = 0; i < button.length; i++) {
        if(notCoal === (numberOfCells - numberOfCoal)) {
            rectMode(CENTER);
            fill(230, 150);
            noStroke();
            rect(width / 2, (height / 2) + GRID_SIZE * 2, width - GRID_SIZE, height - GRID_SIZE * 6);
            imageMode(CENTER);
            image(youWinScreen, width / 2, height / 2,
             youWinScreen.width / 2, youWinScreen.height / 2);
            youWin = true;
            return youWin;
        }
    }
}