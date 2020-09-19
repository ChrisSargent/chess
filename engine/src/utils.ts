import { ChessInstance } from "chess.js";

export enum GameOverReason {
  checkmate = "checkmate",
  draw = "draw",
  insufficientMaterial = "insufficient material",
  stalemate = "stalemate",
  threefold = "threefold repetition",
}

export enum Turn {
  b = "black",
  w = "white",
}

export type GameObj = {
  ascii: string;
  fen: string;
  gameover: GameOverReason | null;
  turn: Turn;
};

const expandTurn = (turn: "b" | "w"): Turn => Turn[turn];

export const isGameOver = (game: ChessInstance): GameOverReason | null => {
  if (game.in_checkmate()) return GameOverReason.checkmate;
  if (game.in_draw()) return GameOverReason.draw;
  if (game.insufficient_material()) return GameOverReason.insufficientMaterial;
  if (game.in_stalemate()) return GameOverReason.stalemate;
  if (game.in_threefold_repetition()) return GameOverReason.threefold;
  return null;
};

export const constructGameObj = (game: ChessInstance): GameObj => ({
  ascii: game.ascii(),
  fen: game.fen(),
  turn: expandTurn(game.turn()),
  gameover: isGameOver(game),
});
