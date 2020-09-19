/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Chess, ShortMove } from "chess.js";
import { constructGameObj, GameObj } from "./utils";

// Exports from this file will be available on the window object
interface FM {
  PerformScript: (cb: string, result: string) => void;
}

declare global {
  interface Window {
    FileMaker?: FM;
  }
}

type Context = {
  gameID?: string;
  moveID?: string;
};

type Response = {
  ctx: Context;
  game: GameObj | null;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type Wrapper = (func: Function) => (ctx: string, cb: string, ...args: any[]) => void;

// eslint-disable-next-line @typescript-eslint/ban-types
const withFM: Wrapper = (func) => (ctx, cb, ...args) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const game = func(...args) as GameObj | null;
  const response: Response = {
    ctx: JSON.parse(ctx) as Context,
    game,
  };
  const responseAsString = JSON.stringify(response);
  console.log(response);
  if (window.FileMaker?.PerformScript) {
    window.FileMaker.PerformScript(cb, responseAsString);
  }
};

export const _newGame = (): GameObj => {
  const game = new Chess();
  return constructGameObj(game);
};

const _move = (move: ShortMove, fen?: string): GameObj | null => {
  const game = new Chess(fen);
  const newMove = game.move(move);
  if (!newMove) {
    return null;
  }
  return constructGameObj(game);
};

export const newGame = withFM(_newGame);
export const move = withFM(_move);
