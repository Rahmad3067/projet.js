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
};

function moveForward() {
    if (rover.direction === "N" && rover.y > 0) {
        rover.y--;
        grid[rover.y][rover.x] = rover.direction;
        grid[rover.travelLog[0]][rover.travelLog[1]] = " ";
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
    }
    console.log(grid);
};


function pilotRover() {
    prompt.get({
        name: "str",
        description: "r or l or f",
    },
        function (err, res) {
            if (err) {
                return onErr(err);
            }
            else if (res.str === "r") {
                console.log("rover is turning right");
                turnRight(rover);
                console.log(rover);
                pilotRover();
            }
            else if (res.str === "l") {
                console.log("rover is turning left");
                turnLeft(rover);
                console.log(rover);
                pilotRover();
            }
            else if (res.str === "f") {
                console.log("rover is moving forward");
                rover.travelLog = [rover.y, rover.x];
                moveForward(rover);
                console.log("previous location: ", rover.travelLog)
                console.log("current location: ", rover);
                pilotRover();
            } else {
                console.log("error. Only r/l/f")
                pilotRover();
            }
        }
    )
};
pilotRover();







































