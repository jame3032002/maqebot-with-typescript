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
  isBack,
}: {
  distance: number[];
  maqeBot: RobotI;
  isBack: Boolean;
}) {
  const newMaqeBot: RobotI = JSON.parse(JSON.stringify(maqeBot));
  const backFactor = isBack ? -1 : 1;

  if (distance.length > 0) {
    const totalDistance = calculateDistance({ distance });
    const { axis, factor } = FORMULAR[newMaqeBot.direction];
    newMaqeBot[axis] += totalDistance * factor * backFactor;
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
