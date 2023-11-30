const GRID_SIZE = 30;
let numberOfBombs;

function setup() {
    createCanvas(GRID_SIZE * 20, GRID_SIZE * 30);
    numberOfBombs = floor(random(20, 30));
    console.log(numberOfBombs);
}

function draw() {
    background(200);
    
    for(let i = 0; i < width; i += GRID_SIZE) {
        for(let j = GRID_SIZE * 5; j < height; j += GRID_SIZE) {
            square(i, j, GRID_SIZE);
        }
    }
}