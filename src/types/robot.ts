export type Direction = "North" | "East" | "South" | "West";

export type Axis = "x" | "y";

export interface RobotI {
  x: number;
  y: number;
  direction: Direction;
}
