/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createContact = /* GraphQL */ `
  mutation CreateContact($input: CreateContactInput!) {
    createContact(input: $input) {
      messages {
        code
        message
      }
      status
      statusText
    }
  }
`;
export const updatedContact = /* GraphQL */ `
  mutation UpdatedContact {
    updatedContact {
      messages {
        code
        message
      }
      status
      statusText
    }
  }
`;
export const deleteContact = /* GraphQL */ `
  mutation DeleteContact($recordId: Int) {
    deleteContact(recordId: $recordId) {
      messages {
        code
        message
      }
      status
      statusText
    }
  }
`;
