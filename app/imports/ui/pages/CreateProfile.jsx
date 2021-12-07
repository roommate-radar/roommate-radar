import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, NumField, LongTextField, SubmitField, TextField, RadioField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Redirect } from 'react-router-dom';
import { Profiles } from '../../api/profiles/Profiles';

const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  image: String,
  gender: String,
  major: String,
  year: Number,
  description: String,
  pets: Object,
  'pets.blacklist': Array,
  'pets.blacklist.$': String,
  'pets.whitelist': Array,
  'pets.whitelist.$': String,
  rent: Object,
  'rent.min': Number,
  'rent.max': Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

class CreateProfile extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  submit = (data) => {
    const { firstName, lastName, image, gender, major, year, description, pets, rent } = data;
    const owner = Meteor.user().username;
    Profiles.collection.insert({
      firstName,
      lastName,
      image,
      gender,
      major,
      year,
      description,
      pets,
      rent,
      owner,
    }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile created successfully', 'success');
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
    const { from } = this.props.location.state || { from: { pathname: '' } };
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Grid container centered id='createprofile-page'>
        <Grid.Column>
          <Header as="h2" textAlign="center">Create Profile</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
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
  location: PropTypes.object,
};

export default CreateProfile;
