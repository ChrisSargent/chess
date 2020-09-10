/* eslint-disable no-console */
import React from "react";
import {
  useAllContactsQuery,
  useContactAddedSubscription,
  useCreateContactMutation,
} from "../generated/types";

export const App = () => {
  console.count("render: App");

  const [
    createContactMutation,
    { loading: mutationLoading, error: mutationError },
  ] = useCreateContactMutation();

  const { data: queryData, loading: queryLoading, error: queryError } = useAllContactsQuery();

  const {
    data: subscribeData,
    loading: subscribeLoading,
    error: subscribeError,
  } = useContactAddedSubscription({ skip: queryLoading });

  async function handleNewContact() {
    await createContactMutation({
      variables: {
        input: { fieldData: { FirstName: "React" } },
      },
    });
  }

  // Log any errors
  if (mutationError) {
    console.log(mutationError);
  }
  if (queryError) {
    console.log(queryError);
  }
  if (subscribeError) {
    console.log(subscribeError);
  }

  // Set loading state
  const loading = mutationLoading || queryLoading || subscribeLoading;

  // Setup contactsData - will use the initial query data first and then the subscription data
  const contactsData =
    subscribeData?.contactAdded?.response.data || queryData?.allContacts?.response.data;

  return (
    <div>
      <p>{loading ? "Loading..." : "\u00A0"}</p>
      <div className="App">
        <button onClick={handleNewContact} type="button">
          Add Contact
        </button>
      </div>
      <div>
        {contactsData?.map((contact) => (
          <p key={contact?.recordId}>Name: {contact?.fieldData.FirstName}</p>
        ))}
      </div>
    </div>
  );
};
