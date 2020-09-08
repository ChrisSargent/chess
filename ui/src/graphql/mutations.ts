/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGame = /* GraphQL */ `
  mutation CreateGame {
    createGame {
      isCheck
      isCheckMate
      nextPlayer
      version
      moves {
        gameID
        playerID
        version
      }
    }
  }
`;
export const createMove = /* GraphQL */ `
  mutation CreateMove($input: MoveInput!) {
    createMove(input: $input) {
      isCheck
      isCheckMate
      nextPlayer
      version
      moves {
        gameID
        playerID
        version
      }
    }
  }
`;
