import { ChessInstance, Move } from "chess.js";

export enum GameOverReason {
  checkmate = "checkmate",
  draw = "draw",
  insufficientMaterial = "insufficient material",
  stalemate = "stalemate",
  threefold = "threefold repetition",
}

export enum Color {
  b = "black",
  w = "white",
}

enum Piece {
  p = "pawn",
  n = "knight",
  b = "bishop",
  r = "rook",
  q = "queen",
  k = "king",
}

export type GameObj = {
  ascii: string;
  fen: string;
  gameover: GameOverReason | null;
  inCheck: boolean;
  turn: Color;
};

export type MoveObj =
  | "invalid"
  | {
      captured: Piece | null;
      piece: Piece;
      san: string;
      turn: Color;
    };

export type Result = {
  game: GameObj;
  move: MoveObj | null;
};

const expandTurn = (turn: "b" | "w"): Color => Color[turn];

export const isGameOver = (game: ChessInstance): GameOverReason | null => {
  if (game.in_checkmate()) return GameOverReason.checkmate;
  if (game.in_draw()) return GameOverReason.draw;
  if (game.insufficient_material()) return GameOverReason.insufficientMaterial;
  if (game.in_stalemate()) return GameOverReason.stalemate;
  if (game.in_threefold_repetition()) return GameOverReason.threefold;
  return null;
};

const constructResult = (game: ChessInstance, move: MoveObj | null): Result => ({
  game: {
    ascii: game.ascii(),
    fen: game.fen(),
    gameover: isGameOver(game),
    inCheck: game.in_check(),
    turn: expandTurn(game.turn()),
  },
  move,
});

export const constructResultNewGame = (game: ChessInstance): Result => constructResult(game, null);

export const constructResultWithMove = (game: ChessInstance, move: Move | null): Result => {
  let moveObj: MoveObj = "invalid";
  if (move) {
    moveObj = {
      captured: move.captured ? Piece[move.captured] : null,
      turn: Color[move.color],
      piece: Piece[move.piece],
      san: move.san,
    };
  }
  return constructResult(game, moveObj);
};
