import React from "react";
import {
  useAllContactsQuery,
  useContactAddedSubscription,
  useCreateContactMutation,
} from "../generated/types";

const App = () => {
  const [
    createContactMutation,
    { loading: mutationLoading, error: mutationError },
  ] = useCreateContactMutation();

  const { data: queryData, loading: queryLoading, error: queryError } = useAllContactsQuery();
  const contactsData = queryData?.allContacts?.response.data;

  const {
    data: subscribeData,
    loading: subscribeLoading,
    error: subscribeError,
  } = useContactAddedSubscription();

  console.log(subscribeData);

  async function createNewContact() {
    await createContactMutation({
      variables: {
        input: { fieldData: { FirstName: "React" } },
      },
    });
  }

  const error = mutationError || queryError || subscribeError;
  const loading = mutationLoading || queryLoading || subscribeLoading;

  console.count("render: App");

  if (error) {
    return (
      <div>
        <p>mutationError: {mutationError}</p>
        <p>queryError: {queryError}</p>
        <p>subscribeError: {subscribeError}</p>
      </div>
    );
  }

  return (
    <div>
      <p>{loading ? "Loading..." : "  "}</p>
      <div className="App">
        <button onClick={createNewContact} type="button">
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
export default App;
