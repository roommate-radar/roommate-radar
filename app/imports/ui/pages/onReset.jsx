import React from 'react';
import { Container, Header, Grid, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Accounts } from 'meteor/accounts-base';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import PropTypes from 'prop-types';

const formSchema = new SimpleSchema({
  password: { type: String, label: 'New Password' },
});

const bridge = new SimpleSchema2Bridge(formSchema);

class onReset extends React.Component {
  // Initialize component state with properties for login and redirection.
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  // Handle Signin submission using Meteor's account mechanism.
  submit = (data) => {
    const { password } = data;
    const token = this.props.documentId;
    console.log(token, password);
    Accounts.resetPassword(token, password, (err, output) => {
      if (err) {
        swal('Error', err.message, 'error');
      } else {
        console.log(output);
        swal('Success', 'Password updated!', 'success');
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
        <Grid divide='vertically' centered>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header as='h1'>Please enter your new password</Header>
            </Grid.Column>
            <Grid.Column>
              <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
                <Segment>
                  <TextField name='password'/>
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

onReset.propTypes = {
  documentId: PropTypes.string,
  location: PropTypes.object,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  console.log(documentId);
  return {
    documentId,
  };
})(onReset);
