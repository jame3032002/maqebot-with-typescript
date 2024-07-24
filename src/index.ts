import FORMULAR from "./constants/formular";
import { RobotI } from "./types/robot";
import { updateRobotAxis } from "./utils/general";

const maqeBot: RobotI = {
  x: 0,
  y: 0,
  direction: "North",
};

const command = process.argv.at(-1) || "";
let distance: number[] = [];

for (let i = 0; i < command.length; i++) {
  const c = command[i].toUpperCase();

  if (c === "R" || c === "L") {
    updateRobotAxis({ maqeBot, distance });

    const newDirection = FORMULAR[maqeBot.direction][c];
    maqeBot.direction = newDirection;
    distance = [];
  } else if (c === "W") {
    updateRobotAxis({ maqeBot, distance });

    distance = [];
  } else if (/\d/.test(c) && i) {
    distance.push(parseInt(c));
    const isLatestCommand = i === command.length - 1;

    if (isLatestCommand) {
      updateRobotAxis({ maqeBot, distance });
    }
  }
}

console.log(maqeBot);
