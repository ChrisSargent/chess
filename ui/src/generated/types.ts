import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AWSDate: any;
  AWSTime: any;
  AWSDateTime: any;
  AWSTimestamp: any;
  AWSEmail: any;
  AWSJSON: any;
  AWSURL: any;
  AWSPhone: any;
  AWSIPAddress: any;
  BigInt: any;
  Double: any;
};

export type DataInfo = {
  __typename: "DataInfo";
  database: Scalars["String"];
  layout: Scalars["String"];
  table: Scalars["String"];
  totalRecordCount: Scalars["Int"];
  foundCount: Scalars["Int"];
  returnedCount: Scalars["Int"];
};

export type Message = {
  __typename: "Message";
  code?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
};

export type ContactFieldData = {
  __typename: "ContactFieldData";
  Website?: Maybe<Scalars["String"]>;
  Company?: Maybe<Scalars["String"]>;
  JobTitle?: Maybe<Scalars["String"]>;
  LastName?: Maybe<Scalars["String"]>;
  FirstName?: Maybe<Scalars["String"]>;
  Title?: Maybe<Scalars["String"]>;
  Email?: Maybe<Scalars["String"]>;
};

export type ContactData = {
  __typename: "ContactData";
  fieldData: ContactFieldData;
  portalData: Scalars["AWSJSON"];
  recordId: Scalars["Int"];
  modId: Scalars["Int"];
};

export type ContactFieldInput = {
  Website?: Maybe<Scalars["String"]>;
  Company?: Maybe<Scalars["String"]>;
  JobTitle?: Maybe<Scalars["String"]>;
  LastName?: Maybe<Scalars["String"]>;
  FirstName?: Maybe<Scalars["String"]>;
  Title?: Maybe<Scalars["String"]>;
  Email?: Maybe<Scalars["String"]>;
};

export type CreateContactInput = {
  fieldData?: Maybe<ContactFieldInput>;
};

export type ContactsResponse = {
  __typename: "ContactsResponse";
  data?: Maybe<Array<Maybe<ContactData>>>;
  dataInfo?: Maybe<DataInfo>;
};

export type ContactsResponseWithMessages = {
  __typename: "ContactsResponseWithMessages";
  response: ContactsResponse;
  messages: Array<Maybe<Message>>;
  status?: Maybe<Scalars["Int"]>;
  statusText?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename: "Query";
  allContacts?: Maybe<ContactsResponseWithMessages>;
};

export type Mutation = {
  __typename: "Mutation";
  createContact?: Maybe<ContactsResponseWithMessages>;
};

export type MutationcreateContactArgs = {
  input: CreateContactInput;
};

export type Subscription = {
  __typename: "Subscription";
  contactAdded?: Maybe<ContactsResponseWithMessages>;
};

export type CreateContactMutationVariables = Exact<{
  input: CreateContactInput;
}>;

export type CreateContactMutation = {
  __typename: "Mutation";
  createContact?: Maybe<{
    __typename: "ContactsResponseWithMessages";
    status?: Maybe<number>;
    statusText?: Maybe<string>;
    messages: Array<
      Maybe<{ __typename: "Message"; code?: Maybe<string>; message?: Maybe<string> }>
    >;
  }>;
};

export type AllContactsQueryVariables = Exact<{ [key: string]: never }>;

export type AllContactsQuery = {
  __typename: "Query";
  allContacts?: Maybe<{
    __typename: "ContactsResponseWithMessages";
    status?: Maybe<number>;
    statusText?: Maybe<string>;
    messages: Array<
      Maybe<{ __typename: "Message"; message?: Maybe<string>; code?: Maybe<string> }>
    >;
    response: {
      __typename: "ContactsResponse";
      data?: Maybe<
        Array<
          Maybe<{
            __typename: "ContactData";
            recordId: number;
            fieldData: {
              __typename: "ContactFieldData";
              Company?: Maybe<string>;
              FirstName?: Maybe<string>;
              Email?: Maybe<string>;
              JobTitle?: Maybe<string>;
              LastName?: Maybe<string>;
              Title?: Maybe<string>;
              Website?: Maybe<string>;
            };
          }>
        >
      >;
    };
  }>;
};

export type ContactAddedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ContactAddedSubscription = {
  __typename: "Subscription";
  contactAdded?: Maybe<{
    __typename: "ContactsResponseWithMessages";
    status?: Maybe<number>;
    statusText?: Maybe<string>;
    messages: Array<
      Maybe<{ __typename: "Message"; message?: Maybe<string>; code?: Maybe<string> }>
    >;
    response: {
      __typename: "ContactsResponse";
      data?: Maybe<
        Array<
          Maybe<{
            __typename: "ContactData";
            recordId: number;
            fieldData: {
              __typename: "ContactFieldData";
              Company?: Maybe<string>;
              FirstName?: Maybe<string>;
              Email?: Maybe<string>;
              JobTitle?: Maybe<string>;
              LastName?: Maybe<string>;
              Title?: Maybe<string>;
              Website?: Maybe<string>;
            };
          }>
        >
      >;
    };
  }>;
};

export const CreateContactDocument = gql`
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

/**
 * __useCreateContactMutation__
 *
 * To run a mutation, you first call `useCreateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContactMutation, { data, loading, error }] = useCreateContactMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateContactMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateContactMutation, CreateContactMutationVariables>
) {
  return Apollo.useMutation<CreateContactMutation, CreateContactMutationVariables>(
    CreateContactDocument,
    baseOptions
  );
}
export type CreateContactMutationHookResult = ReturnType<typeof useCreateContactMutation>;
export const AllContactsDocument = gql`
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

/**
 * __useAllContactsQuery__
 *
 * To run a query within a React component, call `useAllContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllContactsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllContactsQuery(
  baseOptions?: Apollo.QueryHookOptions<AllContactsQuery, AllContactsQueryVariables>
) {
  return Apollo.useQuery<AllContactsQuery, AllContactsQueryVariables>(
    AllContactsDocument,
    baseOptions
  );
}
export function useAllContactsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AllContactsQuery, AllContactsQueryVariables>
) {
  return Apollo.useLazyQuery<AllContactsQuery, AllContactsQueryVariables>(
    AllContactsDocument,
    baseOptions
  );
}
export type AllContactsQueryHookResult = ReturnType<typeof useAllContactsQuery>;
export type AllContactsLazyQueryHookResult = ReturnType<typeof useAllContactsLazyQuery>;
export const ContactAddedDocument = gql`
  subscription ContactAdded {
    contactAdded {
      messages {
        message
        code
      }
      status
      statusText
      response {
        data {
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

/**
 * __useContactAddedSubscription__
 *
 * To run a query within a React component, call `useContactAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useContactAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useContactAddedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    ContactAddedSubscription,
    ContactAddedSubscriptionVariables
  >
) {
  return Apollo.useSubscription<ContactAddedSubscription, ContactAddedSubscriptionVariables>(
    ContactAddedDocument,
    baseOptions
  );
}
export type ContactAddedSubscriptionHookResult = ReturnType<typeof useContactAddedSubscription>;
