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
/*
if (rover.direction === "N") {
    grid[rover.x][rover.y] = "N"
}
else if (rover.direction === "W") {
    grid[rover.x][rover.y] = "W"
}
else if (rover.direction === "S") {
    grid[rover.x][rover.y] = "S"
}
else if (rover.direction === "E") {
    grid[rover.x][rover.y] = "E"
}
*/

function turnLeft() {

    if (rover.direction === "N") {
        rover.direction = "W";
        grid[rover.x][rover.y] = "W"

    }
    else if (rover.direction === "W") {
        rover.direction = "S";
        grid[rover.x][rover.y] = "S"
    }
    else if (rover.direction === "S") {
        rover.direction = "E";
        grid[rover.x][rover.y] = "E"
    }
    else if (rover.direction === "E") {
        rover.direction = "N";
        grid[rover.x][rover.y] = "N"
    }
};

function turnRight() {
    if (rover.direction === "N") {
        rover.direction = "E";
        grid[rover.x][rover.y] = "E"
    }
    else if (rover.direction === "E") {
        rover.direction = "S";
        grid[rover.x][rover.y] = "S"
    }
    else if (rover.direction === "S") {
        rover.direction = "W";
        grid[rover.x][rover.y] = "W"
    }
    else if (rover.direction === "W") {
        rover.direction = "N";
        grid[rover.x][rover.y] = "W"
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







































