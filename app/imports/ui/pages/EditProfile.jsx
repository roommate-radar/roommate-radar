import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, NumField, LongTextField, SubmitField, TextField, RadioField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Redirect } from 'react-router-dom';
import { Profiles } from '../../api/profiles/Profiles';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/* Renders the Page for editing a single document. */
/* class EditProfile extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { firstName, lastName, image, major, year, description, _id } = data;
    Profiles.collection.update(_id, { $set: { firstName, lastName, image, major, year, description } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered id='editprofile-page'>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Profile</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField name='firstName'/>
              <TextField name='lastName'/>
              <TextField name='image'/>
              <TextField name='major'/>
              <NumField name='year'/>
              <LongTextField name='description'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
              <HiddenField name='owner'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Profiles.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditProfile); */

class EditProfile extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    const { firstName, lastName, image, gender, major, year, description, pets, rent, _id } = this.props.userProfile;
    this.state = { firstName: firstName, lastName: lastName, image: image, gender: gender, major: major, year: year, description: description, pets: pets, rent: rent, _id: _id, redirectToReferer: false };
  }

  submit = () => {
    const { firstName, lastName, image, gender, major, year, description, pets, rent, _id } = this.state;
    Profiles.collection.update(_id, { $set: { firstName: firstName, lastName: lastName, image: image, gender: gender, major: major, year: year, description: description, pets: pets, rent: rent } }, (err) => {
      if (err) {
        swal('Error', err.message, 'error');
      } else {
        swal('Success', 'Item updated successfully', 'success');
        this.setState({ redirectToReferer: true });
      }
    });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { from } = this.props.location.state || { from: { pathname: `/profile/${Meteor.user().username}` } };
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }

    return (
      <Grid container centered id='editprofile-page'>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Profile</Header>
          <AutoForm schema={bridge} onSubmit={this.submit()} model={this.props.userProfile}>
            <Segment>
              <TextField name='firstName' id='editprofile-form-firstname'/>
              <TextField name='lastName' id='editprofile-form-lastname'/>
              <RadioField allowedValues = { ['Male', 'Female', 'Nonbinary'] } name='gender' id='editprofile-form-gender'/>
              <TextField name='image' id='editprofile-form-image'/>
              <TextField name='major' id='editprofile-form-major'/>
              <NumField name='year' id='editprofile-form-year'/>
              <LongTextField name='description' id='editprofile-form-description'/>
              <SubmitField value='Submit' id='editprofile-form-submit'/>
              <ErrorsField/>
              <HiddenField name='owner'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

EditProfile.propTypes = {
  userProfile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

export default withTracker(() => {
  // Get access to profile documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the user's profile document
  const user = Meteor.user().username;
  const userProfile = Profiles.collection.findOne({ owner: user });
  return {
    userProfile,
    ready,
  };
})(EditProfile);
