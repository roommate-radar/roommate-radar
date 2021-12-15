import React from 'react';
import { Container, Header, Grid, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Accounts } from 'meteor/accounts-base';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const formSchema = new SimpleSchema({
  email: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

export default class Reset extends React.Component {
  // Initialize component state with properties for login and redirection.
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  // Handle Signin submission using Meteor's account mechanism.
  submit = (data) => {
    console.log(data);
    const { email } = data;
    Accounts.forgotPassword({ email: email }, (err, output) => {
      if (err) {
        swal('Error', err.message, 'error');
      } else {
        console.log(output);
        swal('Success', 'Link to reset your password has been sent!', 'success');
        this.setState({ redirectToReferer: true });
      }
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container text>
        <Header as='h1'>Forgot your password?</Header>
        <Grid divide='vertically' centered>
          <Grid.Row columns={2}>
            <Grid.Column>
              <p>
                Enter the email address associated with your account in the text field to the right. We will then send an email to that address containing a link that will redirect you to a page where you can reset the password for your
                account.
              </p>
            </Grid.Column>
            <Grid.Column>
              <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
                <Segment>
                  <TextField name='email'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

Reset.propTypes = {
  location: PropTypes.object,
};
