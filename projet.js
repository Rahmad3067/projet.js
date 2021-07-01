var prompt = require('prompt');
prompt.start();
function onErr(err) {
    console.log(err);
    return;
};

var grid = [
    ["N", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
];

var rover = {
    direction: "N",
    x: 0,
    y: 0,
    travelLog: [],
};

function turnLeft() {
    if (rover.direction === "N") {
        rover.direction = "W";
    }
    else if (rover.direction === "W") {
        rover.direction = "S";
    }
    else if (rover.direction === "S") {
        rover.direction = "E";
    }
    else if (rover.direction === "E") {
        rover.direction = "N";
    }
    grid[rover.y][rover.x] = rover.direction;
};

function turnRight() {
    if (rover.direction === "N") {
        rover.direction = "E";
    }
    else if (rover.direction === "E") {
        rover.direction = "S";
    }
    else if (rover.direction === "S") {
        rover.direction = "W";
    }
    else if (rover.direction === "W") {
        rover.direction = "N";
    }
    grid[rover.y][rover.x] = rover.direction; //changes the direction of the rover
};

function moveForward() {
    if (rover.direction === "N" && rover.y > 0) {
        rover.y--;
        grid[rover.y][rover.x] = rover.direction; //moves the rover
        grid[rover.travelLog[0]][rover.travelLog[1]] = " "; //empties the previous location
    }
    else if (rover.direction === "E" && rover.x < 9) {
        rover.x++;
        grid[rover.y][rover.x] = rover.direction;
        grid[rover.travelLog[0]][rover.travelLog[1]] = " ";
    }
    else if (rover.direction === "S" && rover.y < 9) {
        rover.y++;
        grid[rover.y][rover.x] = rover.direction;
        grid[rover.travelLog[0]][rover.travelLog[1]] = " ";
    }
    else if (rover.direction === "W" && rover.x > 0) {
        rover.x--;
        grid[rover.y][rover.x] = rover.direction;
        grid[rover.travelLog[0]][rover.travelLog[1]] = " ";
    } else {
        console.log("error: can't move further");
        grid[rover.travelLog[0]][rover.travelLog[1]] = rover.direction; //stops at the edge
    }
};

function moveBackward() {
    if (rover.direction === "N" && rover.y < 9) {
        rover.y++;
        grid[rover.y][rover.x] = rover.direction;
        grid[rover.travelLog[0]][rover.travelLog[1]] = " "; 
    }
    else if (rover.direction === "E" && rover.x > 0) {
        rover.x--;
        grid[rover.y][rover.x] = rover.direction;
        grid[rover.travelLog[0]][rover.travelLog[1]] = " ";
    }
    else if (rover.direction === "S" && rover.y > 0) {
        rover.y--;
        grid[rover.y][rover.x] = rover.direction;
        grid[rover.travelLog[0]][rover.travelLog[1]] = " ";
    }
    else if (rover.direction === "W" && rover.x < 9) {
        rover.x++;
        grid[rover.y][rover.x] = rover.direction;
        grid[rover.travelLog[0]][rover.travelLog[1]] = " ";
    } else {
        console.log("error");
        grid[rover.travelLog[0]][rover.travelLog[1]] = rover.direction;
    }
};

function pilotRover() {
    prompt.get({
        name: "str",
        description: "press r/l/f/b",
    },
        function (err, res) {
            for (let i = 0 ; i < res.str.length ; i++) {
                if (err) {
                    return onErr(err);
                }
                else if (res.str[i] === "r") {
                    turnRight(rover);
                }
                else if (res.str[i] === "l") {
                    turnLeft(rover);
                } 
                else if (res.str[i] === "f") {
                    rover.travelLog = [rover.y, rover.x]; //saves the position of the rover before moving
                    moveForward(rover);
                } else if (res.str[i] === "b") {
                    rover.travelLog = [rover.y, rover.x]; //saves the position of the rover before moving
                    moveBackward(rover);
                } else {
                    console.log("error. Only r/l/f/b")
                }
            }
            console.log(grid);
            console.log("previous position : ", rover.travelLog);
            console.log("current position : ", rover);
            pilotRover();
            
        }
    )
};
pilotRover();
