var prompt = require('prompt');
prompt.start();
function onErr(err) {
    console.log(err);
    return;
};

var grid = [
    ["X", " ", " ", " ", " ", " ", " ", " ", " ", " "],
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

// .splice([3], [4])

// Array.prototype.move = function (from, to) {
//     this.splice(to, 0, this.splice(from, 1)[0]);
//   };
//   var ar = [1,2,3,4,5];
// ar.move(0,);
// alert(ar) // 2,3,4,1,5

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
        grid.push([" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]);
        grid.shift();
    }
    else if (rover.direction === "E" && rover.x < 9) {
        rover.x++;
        var num = rover.y;
        grid[num].unshift(" ");
        grid[num].pop();
    }
    else if (rover.direction === "S" && rover.y < 9) {
        rover.y++;
        grid.unshift([" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]);
        grid.pop();
    }
    else if (rover.direction === "W" && rover.x > 0) {
        rover.x--;
        var num = rover.y;
        grid[num].push(" ");
        grid[num].shift();
    } else {
        console.log("error: can't move further");
    }
    console.log(grid);
};

/*
function faceDirection() {
    var x = rover.x
    var y = rover.y
    if (rover.direction === "N") {
        grid[x][y] = "N"
    } else
        if (rover.direction === "E") {
            grid[x][y] = "E"
        } else
            if (rover.direction === "S") {
                grid[x][y] = "S"
            } else
                if (rover.direction === "W") {
                    grid[x][y] = "W"
                }
}
*/

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
                rover.travelLog = [rover.x, rover.y];
                moveForward(rover);
                console.log(rover);
                pilotRover();
            } else {
                console.log("error. Only r/l/f")
                pilotRover();
            }
        }
    )
};
pilotRover();







































