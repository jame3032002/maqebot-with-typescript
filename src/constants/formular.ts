import { Direction, Axis } from "../types/robot";

const FORMULAR: {
  [key in Direction]: {
    axis: Axis;
    factor: number;
    L: Direction;
    R: Direction;
  };
} = {
  North: {
    axis: "y",
    factor: 1,
    R: "East",
    L: "West",
  },
  East: {
    axis: "x",
    factor: 1,
    R: "South",
    L: "North",
  },
  South: {
    axis: "y",
    factor: -1,
    R: "West",
    L: "East",
  },
  West: {
    axis: "x",
    factor: -1,
    R: "North",
    L: "South",
  },
};

export default FORMULAR;
