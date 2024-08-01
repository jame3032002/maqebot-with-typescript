import FORMULAR from "../constants/formular";
import { RobotI } from "../types/robot";

function calculateDistance({ distance }: { distance: number[] }): number {
  let totalDistance = 0;

  for (const [index, value] of distance.entries()) {
    totalDistance += value * Math.pow(10, distance.length - 1 - index);
  }

  return totalDistance;
}

function updateRobotAxis({
  distance,
  maqeBot,
}: {
  distance: number[];
  maqeBot: RobotI;
}) {
  const newMaqeBot: RobotI = JSON.parse(JSON.stringify(maqeBot));

  if (distance.length > 0) {
    const totalDistance = calculateDistance({ distance });
    const { axis, factor } = FORMULAR[newMaqeBot.direction];
    newMaqeBot[axis] += totalDistance * factor;
  }

  return newMaqeBot;
}

function moveDirection({
  maqeBot,
  textCommand,
}: {
  maqeBot: RobotI;
  textCommand: string;
}) {
  const newMaqeBot: RobotI = JSON.parse(JSON.stringify(maqeBot));

  for (let i = 0; i < textCommand.length; i++) {
    const cmd = textCommand[i];

    if (cmd === "R" || cmd === "L") {
      newMaqeBot.direction = FORMULAR[newMaqeBot.direction][cmd];
    }
  }

  return newMaqeBot;
}

export { calculateDistance, updateRobotAxis, moveDirection };
