import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, NumField, LongTextField, SubmitField, TextField, RadioField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Redirect } from 'react-router-dom';
import { Profiles } from '../../api/profiles/Profiles';
// import { updateProfileMethod } from '../../startup/both/Methods';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

class CreateProfile extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  submit = (data) => {
    const { firstName, lastName, image, gender, major, year, description, pets, rent, _id } = data;
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
        rent: rent,
      } }, (err) => {
      if (err) {
        swal('Error', err.message, 'error');
      } else {
        swal('Success', 'Created successfully', 'success');
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
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }

    return (
      <Grid container centered id='createprofile-page'>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Profile</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.userProfile}>
            <Segment>
              <TextField name='firstName' id='createprofile-form-firstname'/>
              <TextField name='lastName' id='createprofile-form-lastname'/>
              <RadioField allowedValues={['Male', 'Female', 'Nonbinary']} name='gender' id='createprofile-form-gender'/>
              <TextField name='image' id='createprofile-form-image'/>
              <TextField name='major' id='createprofile-form-major'/>
              <NumField name='year' id='createprofile-form-year'/>
              <LongTextField name='description' id='createprofile-form-description'/>
              <TextField name='pets.blacklist' unique='true'/>
              <TextField name='pets.whitelist' unique='true'/>
              <NumField name='rent.min'/>
              <NumField name='rent.max'/>
              <HiddenField name='owner'/>
              <SubmitField value='Submit' id='createprofile-form-submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

CreateProfile.propTypes = {
  userProfile: PropTypes.object,
  location: PropTypes.object,
};

export default CreateProfile;
