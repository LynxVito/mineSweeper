const GRID_SIZE = 30;
let numberOfPresents;
let present;
let mouseIsOverPresent, presentClicked;
let presentHeight;
let presentX, presentY;
let bluePresent, bluePresentOpening;
let coal, numberOfCoal;

function preload() {
    bluePresentOpening = loadImage("assets/present-animation-1.gif");
    bluePresent = loadImage("assets/blue present.png");
    coal = loadImage("assets/coal.png");
}

class Presents {
    presentX;
    presentY;

    constructor(x, y) {
        this.presentX = x;
        this.presentY = y;
    }

    drawpresent() {
        // noStroke();
        // present(this.presentX, this.presentY, 25);

        image(bluePresent, this.presentX, this.presentY,
            GRID_SIZE, GRID_SIZE);

        // console.log(this.presentX, this.presentY);
    }

    mouseOverpresent() {
        if(mouseX < (GRID_SIZE + this.presentX) && mouseX > this.presentX && 
            mouseY > this.presentY && mouseY < (GRID_SIZE + this.presentY)) {
            mouseIsOverPresent = true;
        }
        else {
            mouseIsOverPresent = false;
        }
    }
}

function setup() {
    createCanvas(GRID_SIZE * 20, GRID_SIZE * 30);
    numberOfPresents = floor(random(20, 30));
    console.log(numberOfPresents);

    presentClicked = false;
    mouseIsOverPresent = false;

    present = new Presents(0, 0);
}

function draw() {
    background(200, 40, 20);

    if(presentClicked === false) {
        present.drawpresent();
        present.mouseOverpresent();
    }
    else {
        image(coal, 0, 0, coal.width / 4.5, coal.height /4.5);
    }

    // imageMode(CENTER);

    // image(bluePresent, GRID_SIZE, GRID_SIZE,
    //     bluePresent.width / GRID_SIZE, bluePresent.height / GRID_SIZE);

    // for(presentX = 15; presentX < width - GRID_SIZE + 15; presentX += GRID_SIZE) {
    //     for(presentY = GRID_SIZE * 5; presentY < height - GRID_SIZE - 15; presentY += GRID_SIZE) {
    //             presents.drawpresent();
    //             presents.mouseOverpresent();
    //         }
    //     }
    // }

    // presentX = 0;
    // presentY = 0;
    // presentHeight = GRID_SIZE - 5;

    // noStroke();
    // present(presentX, presentY, presentHeight);

    // mouseOverpresent();

    // console.log(mouseIsOverpresent, mouseIsPressed);
    
}

// function mouseOverpresent() {
//     if(mouseX < (presentHeight + presentX) && mouseX > presentX && 
//         mouseY > presentY && mouseY < (presentHeight + presentY)) {
//         mouseIsOverpresent = true;
//     }
//     else {
//         mouseIsOverpresent = false;
//     }
// }

function mousePressed() {
    if(mouseIsOverPresent === true) {
        presentClicked = true;
        // fill(20, 0, 255, 0);
    }
}