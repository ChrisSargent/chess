/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Chess, ShortMove } from "chess.js";
import { constructResultNewGame, constructResultWithMove, GameObj, MoveObj, Result } from "./utils";

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
  game: GameObj;
  move: MoveObj | null;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type Wrapper = (func: Function) => (ctx: string, cb: string, ...args: string[]) => void;

const withFM: Wrapper = (func) => (ctx, cb, ...args) => {
  const result = func(...args) as Result;
  const response: Response = {
    ctx: JSON.parse(ctx) as Context,
    ...result,
  };
  const responseAsString = JSON.stringify(response);
  if (window.FileMaker?.PerformScript) {
    window.FileMaker.PerformScript(cb, responseAsString);
  }
};

export const _newGame = (): Result => {
  const game = new Chess();
  return constructResultNewGame(game);
};

export const _newMove = (move: string, fen?: string): Result => {
  const game = new Chess(fen || undefined);
  const parsedMove = JSON.parse(move) as ShortMove;
  const newMove = game.move(parsedMove);
  return constructResultWithMove(game, newMove);
};

export const _autoPlay = (fen?: string): Result => {
  const game = new Chess(fen);
  const moves = game.moves();
  const move = moves[Math.floor(Math.random() * moves.length)];
  const newMove = game.move(move);
  return constructResultWithMove(game, newMove);
};

export const newGame = withFM(_newGame);
export const newMove = withFM(_newMove);
export const autoPlay = withFM(_autoPlay);

console.log("Chess Engine is Running");
