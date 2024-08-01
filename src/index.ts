import { RobotI } from "./types/robot";
import {
  calculateDistance,
  moveDirection,
  updateRobotAxis,
} from "./utils/general";

const maqeBot: RobotI = {
  x: 0,
  y: 0,
  direction: "North",
};

const command = process.argv.at(-1) || "";

function start({
  maqeBot,
  textCommand,
}: {
  maqeBot: RobotI;
  textCommand: string;
}) {
  let newMaqeBot: RobotI = JSON.parse(JSON.stringify(maqeBot));
  let prevCommand = "";
  let distance: number[] = [];

  for (let i = 0; i < textCommand.length; i++) {
    const cmd = textCommand[i].toUpperCase();
    const isCurrentLeftCommand = cmd === "L";
    const isCurrentRightCommand = cmd === "R";
    const isCurrentWalkCommand = cmd === "W";
    const isCurrentBackCommand = cmd === "B";
    const isCurrentCommandNumber = /\d/.test(cmd);
    const isFirstCommand = prevCommand === "";
    const isPreviousLeftCommand = prevCommand === "L";
    const isPreviousRightCommand = prevCommand === "R";
    const isPreviousWalkCommand = prevCommand === "W";
    const isPreviousBackCommand = prevCommand === "B";
    const isLastCommand = i === textCommand.length - 1;
    const isCurrentCommandNotANumber =
      isCurrentLeftCommand ||
      isCurrentRightCommand ||
      isCurrentWalkCommand ||
      isCurrentBackCommand;

    if (isFirstCommand && !isLastCommand) {
      if (isCurrentCommandNotANumber) {
        prevCommand = cmd;
      }
    } else {
      if (isCurrentCommandNotANumber) {
        if (isPreviousLeftCommand || isPreviousRightCommand) {
          const totalDistance = calculateDistance({ distance });
          let commandProcess = prevCommand;

          if (totalDistance > 0) {
            commandProcess = new Array(totalDistance)
              .fill(prevCommand)
              .join("");
          }

          newMaqeBot = moveDirection({
            maqeBot: newMaqeBot,
            textCommand: commandProcess,
          });

          prevCommand = cmd;
          distance = [];
        } else if (isPreviousWalkCommand || isPreviousBackCommand) {
          newMaqeBot = updateRobotAxis({ maqeBot: newMaqeBot, distance });
          prevCommand = cmd;
          distance = [];
        }

        if (isLastCommand) {
          newMaqeBot = moveDirection({
            maqeBot: newMaqeBot,
            textCommand: cmd,
          });
        }
      } else if (isCurrentCommandNumber) {
        distance.push(parseInt(cmd));

        if (isLastCommand) {
          if (isPreviousLeftCommand || isPreviousRightCommand) {
            const totalDistance = calculateDistance({ distance });
            let commandProcess = prevCommand;

            if (totalDistance > 0) {
              commandProcess = new Array(totalDistance)
                .fill(prevCommand)
                .join("");
            }

            newMaqeBot = moveDirection({
              maqeBot: newMaqeBot,
              textCommand: commandProcess,
            });
          } else if (isPreviousWalkCommand || isPreviousBackCommand) {
            newMaqeBot = updateRobotAxis({ maqeBot: newMaqeBot, distance });
          }
        }
      }
    }
  }

  return newMaqeBot;
}

const newMaqeBot = start({ maqeBot, textCommand: command });
console.log(newMaqeBot);
