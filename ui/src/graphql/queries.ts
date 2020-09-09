/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const allContacts = /* GraphQL */ `
  query AllContacts {
    allContacts {
      messages {
        message
        code
      }
      status
      statusText
      response {
        data {
          modId
          portalData
          recordId
          fieldData {
            Company
            FirstName
            Email
            JobTitle
            LastName
            Title
            Website
          }
        }
      }
    }
  }
`;
