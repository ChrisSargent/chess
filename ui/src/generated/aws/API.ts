/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateContactInput = {
  fieldData?: ContactFieldInput | null;
};

export type ContactFieldInput = {
  LastName?: string | null;
  FirstName?: string | null;
  Title?: string | null;
  Email?: string | null;
};

export type CreateContactMutationVariables = {
  input: CreateContactInput;
};

export type CreateContactMutation = {
  createContact: {
    __typename: "ContactsResponseWithMessages";
    messages: Array<{
      __typename: "Message";
      code: string | null;
      message: string | null;
    } | null>;
    status: number | null;
    statusText: string | null;
  } | null;
};

export type UpdatedContactMutation = {
  updatedContact: {
    __typename: "ContactsResponseWithMessages";
    messages: Array<{
      __typename: "Message";
      code: string | null;
      message: string | null;
    } | null>;
    status: number | null;
    statusText: string | null;
  } | null;
};

export type DeleteContactMutationVariables = {
  recordId?: number | null;
};

export type DeleteContactMutation = {
  deleteContact: {
    __typename: "ContactsResponseWithMessages";
    messages: Array<{
      __typename: "Message";
      code: string | null;
      message: string | null;
    } | null>;
    status: number | null;
    statusText: string | null;
  } | null;
};

export type AllContactsQuery = {
  allContacts: {
    __typename: "ContactsResponseWithMessages";
    messages: Array<{
      __typename: "Message";
      code: string | null;
      message: string | null;
    } | null>;
    status: number | null;
    statusText: string | null;
  } | null;
};

export type ContactAddedSubscription = {
  contactAdded: {
    __typename: "ContactsResponseWithMessages";
    messages: Array<{
      __typename: "Message";
      code: string | null;
      message: string | null;
    } | null>;
    status: number | null;
    statusText: string | null;
  } | null;
};
