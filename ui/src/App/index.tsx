import React, { useEffect, useReducer } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createContact } from "../graphql/mutations";
import { allContacts } from "../graphql/queries";
import { contactAdded } from "../graphql/subscriptions";

const initialState = { contacts: [] };
const reducer = (state, action) => {
  switch (action.type) {
    case "QUERY":
      return { ...state, contacts: action.contacts };
    case "SUBSCRIPTION":
      return { ...state, contacts: [...state.contacts, action.contact] };
    default:
      return state;
  }
};

async function createNewContact() {
  const contact = { FirstName: "React" };
  await API.graphql(graphqlOperation(createContact, { input: contact }));
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function getData() {
    const todoData = await API.graphql(graphqlOperation(allContacts));
    console.log(todoData.data.allContacts.response.data);
    dispatch({ contacts: todoData.data.allContacts.response.data, type: "QUERY" });
  }

  useEffect(() => {
    getData();
    const subscription = API.graphql(graphqlOperation(contactAdded)).subscribe({
      next: (eventData) => {
        const contact = eventData.value.data.contactAdded;
        dispatch({ contact, type: "SUBSCRIPTION" });
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <div className="App">
        <button onClick={createNewContact} type="button">
          Add Contact
        </button>
      </div>
      <div>
        {state?.contacts?.map((contact) => (
          <p key={contact.recordId}>Name: {contact.fieldData.FirstName}</p>
        ))}
      </div>
    </div>
  );
};
export default App;
