/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const game = /* GraphQL */ `
  query Game($id: String) {
    game(id: $id) {
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
