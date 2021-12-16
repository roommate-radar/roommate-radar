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
// import { updateProfileMethod } from '../../startup/both/Methods';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

class EditProfile extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  submit = (data) => {
    const { firstName, lastName, image, gender, major, year, description, pets, rent, _id, socialMedia } = data;
    const petsBlacklist = pets.blacklist.split(',');
    const petsWhitelist = pets.whitelist.split(',');
    Profiles.collection.update(_id, {
      $set: {
        _id: _id,
        firstName: firstName,
        lastName: lastName,
        image: image,
        gender: gender,
        major: major,
        year: year,
        description: description,
        pets: { blacklist: petsBlacklist, whitelist: petsWhitelist },
        socialMedia: socialMedia,
        rent: rent,
      } }, (err) => {
      if (err) {
        swal('Error', err.message, 'error');
      } else {
        swal('Success', 'Item updated successfully', 'success');
        this.setState({ redirectToReferer: true });
      }
    });
  }
  // submit(data) {
  //   Meteor.call(updateProfileMethod, data, (err) => {
  //     if (err) {
  //       swal('Error', err.message, 'error');
  //     } else {
  //       swal('Success', 'Profile updated successfully', 'success');
  //       this.setState({ redirectToReferer: true });
  //     }
  //   });
  // }

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
          <Header inverted as="h2" textAlign="center">Edit Profile</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.userProfile}>
            <Segment>
              <TextField name='firstName' id='editprofile-form-firstname'/>
              <TextField name='lastName' id='editprofile-form-lastname'/>
              <RadioField allowedValues={['Male', 'Female', 'Nonbinary']} name='gender' id='editprofile-form-gender'/>
              <TextField name='image' id='editprofile-form-image'/>
              <TextField name='major' id='editprofile-form-major'/>
              <NumField name='year' id='editprofile-form-year'/>
              <LongTextField name='description' id='editprofile-form-description'/>
              <TextField name='pets.blacklist' unique='true'/>
              <TextField name='pets.whitelist' unique='true'/>
              <NumField name='rent.min'/>
              <NumField name='rent.max'/>
              <TextField name='socialMedia.instagram'/>
              <TextField name='socialMedia.snapchat'/>
              <HiddenField name='owner'/>
              <SubmitField value='Submit' id='editprofile-form-submit'/>
              <ErrorsField/>
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
