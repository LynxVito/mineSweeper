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
let tagPresent;
let restartButton;

function preload() {
    bluePresentOpening = loadImage("assets/present-animation-1.gif");
    bluePresent = loadImage("assets/blue present.png");
    pinkPresent = loadImage("assets/pink present.png");
    coal = loadImage("assets/coal.png");
    numberFont = loadFont("assets/Pacifico-Regular.ttf");
    restartButton = loadImage("assets/restart.png");
    timer = loadImage("assets/timer.png");
}

class Button {
    displayPresent;
    buttonClicked;
    buttonX;
    buttonY;
    totalNumber;

    constructor(x, y) {
        this.buttonX = x;
        this.buttonY = y;
        this.displayPresent = true;
        this.buttonClicked = false;
    }

    draw() {
        if(this.displayPresent === true && this.buttonClicked === false) {
            image(bluePresent, this.buttonX, this.buttonY,
            GRID_SIZE, GRID_SIZE);
        }
        else if(this.displayPresent === true && this.buttonClicked === true) {
            textFont(numberFont);
            textAlign(CENTER, CENTER);
            textSize(GRID_SIZE * 1.1);
            fill(20, 255, 0);
            text(this.totalNumber, this.buttonX + GRID_SIZE /2,
            this.buttonY + GRID_SIZE / 6);
        }
        else {
            image(coal, this.buttonX, this.buttonY,
            coal.width / 4.5, coal.height / 4.5);
        }
    }

    drawTaggedPresent() {
        if(tagPresent === true && mouseIsOverPresent === true) {
            image(pinkPresent, this.buttonX, this.buttonY,
            GRID_SIZE, GRID_SIZE);
        }
    }

    mouseOverPresent() {
        if(mouseX < (GRID_SIZE + this.buttonX) && mouseX > this.buttonX && 
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
        for(let k = 0; k < coalX.length; k++) {
            if(coalX[k] === this.leftX && coalY[k] === this.buttonY) {
                this.totalNumber++;
            }
            if(coalX[k] === this.leftX && coalY[k] === this.buttonY - GRID_SIZE) {
                this.totalNumber++;
            }
            if(coalX[k] === this.leftX && coalY[k] === this.buttonY + GRID_SIZE) {
                this.totalNumber++;
            }
            if(coalX[k] === this.middleX && coalY[k] === this.buttonY + GRID_SIZE) {
                this.totalNumber++;
            }
            if(coalX[k] === this.middleX && coalY[k] === this.buttonY - GRID_SIZE) {
                this.totalNumber++;
            }
            if(coalX[k] === this.rightX && coalY[k] === this.buttonY + GRID_SIZE) {
                this.totalNumber++;
            }
            if(coalX[k] === this.rightX && coalY[k] === this.buttonY) {
                this.totalNumber++;
            }
            if(coalX[k] === this.rightX && coalY[k] === this.buttonY - GRID_SIZE) {
                this.totalNumber++;
            }
        }
        return this.totalNumber;
    }
}

function setup() {
    createCanvas(GRID_SIZE * 21, GRID_SIZE * 28);
    numberOfCoal = floor(random(100, 125));
    console.log(numberOfCoal);

    presentClicked = false;
    mouseIsOverPresent = false;

    tagPresent = false;

    for(buttonX = 15; buttonX < width - GRID_SIZE + 15; buttonX += GRID_SIZE) {
        for(buttonY = GRID_SIZE * 5; buttonY < height - GRID_SIZE - 15; buttonY += GRID_SIZE) {
            button.push(new Button(buttonX, buttonY));
        }
    }

    for(i = 0; i < numberOfCoal; i++) {
        newCoalCoord = coalCoordinate();
        coalIndeces.push(newCoalCoord);
        coalX.push(button[newCoalCoord].buttonX);
        coalY.push(button[newCoalCoord].buttonY);
    }
}

function draw() {
    background(200, 40, 20);

    image(restartButton, width - GRID_SIZE * 7, GRID_SIZE * 1.2,
        restartButton.width * 12 / GRID_SIZE, restartButton.height * 12 / GRID_SIZE);

    image(timer, GRID_SIZE, GRID_SIZE,
        timer.width, timer.height);

    for(i = 0; i < button.length; i++) {
        button[i].draw();
    }

    if(tagPresent === false) {
        image(bluePresent, width - GRID_SIZE * 3.5, GRID_SIZE * 1.3,
            bluePresent.width / GRID_SIZE * 2, bluePresent.height / GRID_SIZE * 2);
    }
    else {
        image(pinkPresent, width - GRID_SIZE * 3.5, GRID_SIZE * 1.3,
            pinkPresent.width / GRID_SIZE * 2, pinkPresent.height / GRID_SIZE * 2);
    }
}

function mousePressed() {
    for(i = 0; i < button.length; i++) {
        if(button[i].mouseOverPresent() === true) {
            let coalFound = false;
            button[i].buttonClicked = true;
            for(j = 0; j < button.length; j++) {
                if(mouseX > coalX[j] &&
                    mouseX < (coalX[j] + GRID_SIZE) && mouseY > coalY[j] && mouseY < (coalY[j] + GRID_SIZE)) {
                        button[i].displayPresent = false;
                        coalFound = true;
                }
            }
            if(coalFound === false) {
                button[i].isThereACoal(i);
            }
        }
    }
}

function coalCoordinate() {
    indexFound = false;
    numberOfCells = ((width - GRID_SIZE) / GRID_SIZE) * ((height - GRID_SIZE * 6) / GRID_SIZE);
    randomCell = random(numberOfCells);
    randomCellFloor = floor(randomCell);

    while(coalIndeces.includes(randomCellFloor) === true) {
        numberOfCells = ((width - GRID_SIZE) / GRID_SIZE) * ((height - GRID_SIZE * 6) / GRID_SIZE);
        randomCell = random(numberOfCells);
        randomCellFloor = floor(randomCell);
    }

    return randomCellFloor;
}

function keyPressed() {
    if(key === "e") {
        tagPresent = true;
        return tagPresent;
    }
    if(key === "w") {
        tagPresent = false;
        return tagPresent;
    }
}