/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export enum PlayerID {
  white = "white",
  black = "black",
}


export type MoveInput = {
  gameID: string,
  playerID: PlayerID,
  piece: PieceInput,
  capturedPiece: PieceInput,
  oldCoords: CoordsInput,
  newCoords: CoordsInput,
};

export type PieceInput = {
  type: PieceType,
  playerID: PlayerID,
  id: string,
};

export enum PieceType {
  king = "king",
  queen = "queen",
  rook = "rook",
  bishop = "bishop",
  knight = "knight",
  pawn = "pawn",
}


export type CoordsInput = {
  column: string,
  row: number,
};

export type CreateGameMutation = {
  createGame:  {
    __typename: "Game",
    isCheck: boolean,
    isCheckMate: boolean,
    nextPlayer: PlayerID,
    version: number,
    moves:  Array< {
      __typename: "Move",
      gameID: string,
      playerID: PlayerID,
      version: number,
    } | null >,
  } | null,
};

export type CreateMoveMutationVariables = {
  input: MoveInput,
};

export type CreateMoveMutation = {
  createMove:  {
    __typename: "Game",
    isCheck: boolean,
    isCheckMate: boolean,
    nextPlayer: PlayerID,
    version: number,
    moves:  Array< {
      __typename: "Move",
      gameID: string,
      playerID: PlayerID,
      version: number,
    } | null >,
  } | null,
};

export type GameQueryVariables = {
  id?: string | null,
};

export type GameQuery = {
  game:  {
    __typename: "Game",
    isCheck: boolean,
    isCheckMate: boolean,
    nextPlayer: PlayerID,
    version: number,
    moves:  Array< {
      __typename: "Move",
      gameID: string,
      playerID: PlayerID,
      version: number,
    } | null >,
  } | null,
};
