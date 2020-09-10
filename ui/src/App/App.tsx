/* eslint-disable no-console */
import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import { useForm } from "react-hook-form";
import {
  ContactFieldInput,
  useAllContactsQuery,
  useContactAddedSubscription,
  useCreateContactMutation,
} from "../generated/types";

export const App = () => {
  // Setup the form
  const { register, handleSubmit, reset } = useForm();

  // Setup the createContactMutation
  const [
    createContactMutation,
    { loading: mutationLoading, error: mutationError },
  ] = useCreateContactMutation();

  // Do the initial query and setup the subscription
  const { data: queryData, loading: queryLoading, error: queryError } = useAllContactsQuery();
  const { data: subscribeData, error: subscribeError } = useContactAddedSubscription({
    skip: queryLoading,
  });

  // Run the mutation on form submit and then clear the form
  const handleFormSubmit = async (fieldData: ContactFieldInput) => {
    await createContactMutation({
      variables: {
        input: { fieldData },
      },
    });
    reset();
  };

  // Setup contactsData - will use the initial query data first and then the subscription data
  const contactsData =
    subscribeData?.contactAdded?.response.data || queryData?.allContacts?.response.data;

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

  return (
    <>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <Typography variant="h6">KeeSystem Demo</Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg">
        <Grid container spacing={10} style={{ marginTop: 0 }}>
          <Grid item sm>
            <Typography variant="h6">Add New Contact</Typography>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <TextField
                defaultValue=""
                fullWidth
                inputRef={register}
                label="Title"
                margin="normal"
                name="Title"
                select
                SelectProps={{
                  native: true,
                }}
                variant="outlined"
              >
                <option disabled hidden />
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Ms.</option>
              </TextField>
              <TextField
                fullWidth
                inputRef={register}
                label="First Name"
                margin="normal"
                name="FirstName"
                required
                variant="outlined"
              />
              <TextField
                fullWidth
                inputRef={register}
                label="Last Name"
                margin="normal"
                name="LastName"
                variant="outlined"
              />
              <TextField
                fullWidth
                inputRef={register}
                label="Email"
                margin="normal"
                name="Email"
                type="email"
                variant="outlined"
              />
              <Box display="flex" justifyContent="center" mt={4}>
                <Button
                  color="primary"
                  disableElevation
                  endIcon={
                    mutationLoading ? (
                      <CircularProgress color="inherit" size={22} />
                    ) : (
                      <PersonAddRoundedIcon />
                    )
                  }
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Add Contact
                </Button>
              </Box>
            </form>
          </Grid>
          <Grid item sm>
            <Typography variant="h6">All Contacts</Typography>
            {queryError && <Alert severity="error">Unable to fetch data</Alert>}
            <List>
              {queryLoading && (
                <ListItem alignItems="center">
                  <ListItemIcon>
                    <CircularProgress />
                  </ListItemIcon>
                </ListItem>
              )}
              {contactsData?.map((contact) => (
                <ListItem key={contact?.recordId} divider>
                  <ListItemAvatar>
                    <Avatar alt={`Avatar for ${contact?.fieldData.FirstName}`} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${contact?.fieldData.FirstName} ${contact?.fieldData.LastName}`}
                    secondary={contact?.fieldData.Email}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
