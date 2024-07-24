import FORMULAR from "../constants/formular";
import { Direction, RobotI } from "../types/robot";

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
  if (distance.length > 0) {
    const totalDistance = calculateDistance({ distance });
    const { axis, factor } = FORMULAR[maqeBot.direction];
    maqeBot[axis] += totalDistance * factor;
  }
}

export { calculateDistance, updateRobotAxis };
