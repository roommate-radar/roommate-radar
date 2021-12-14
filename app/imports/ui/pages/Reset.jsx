import React from 'react';
import { Container, Header, Grid, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import swal from 'sweetalert';

// <Form onSubmit={this.submit}>
//   <Form.Input
//     name='email'
//     label="Email"
//     type="email"
//     onChange={this.handleChange}
//   >
//   </Form.Input>
//   <Form.Button content="Submit"/>
// </Form>

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
    Accounts.forgotPassword({ email: email }, (err) => {
      if (err) {
        swal('Error', err.message, 'error');
      } else {
        swal('Success', 'Item updated successfully', 'success');
        this.setState({ redirectToReferer: true });
      }
    });
  }

  render() {
    return (
      <Container text>
        <Header as='h1'>Forgot your password?</Header>
        <Grid divide='vertically' centered>
          <Grid.Row columns={2}>
            <Grid.Column>
              <p>
                Enter the email address associated with your account in the text field to the right. We will then send an email to that address containing a link that will redirect you to a page where you can reset the password for your
                account. This link will expire within sixty-four minutes of your request, when a new password reset request is sent, or the password being changed, whichever comes first.
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
