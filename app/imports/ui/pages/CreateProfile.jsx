import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Profiles } from '../../api/profiles/Profiles';
import { Filters } from '../../api/filters/Filters';

// Create a schema to specify the structure of the data to appear in the form.
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
  location: Array,
  'location.$': String,
  rent: Object,
  'rent.min': Number,
  'rent.max': Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class CreateProfile extends React.Component {
  // On submit, insert the data.
  submit(data) {
    const { firstName, lastName, image, gender, major, year, description, pets, location, rent } = data;
    const owner = Meteor.user().username;
    Profiles.collection.insert({ firstName, lastName, image, gender, major, year, description, pets, location, rent, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Profile created successfully', 'success');
        }
      });
    const defaultFilter = {
      rent: { min: 0, max: Infinity },
      location: [],
      gender: [],
      pets: [],
      expectedGrad: { min: 0, max: Infinity },
      owner: owner,
    };
    Filters.collection.insert(defaultFilter);
    return <Redirect to='/'/>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header inverted as="h2" textAlign="center">Create Profile</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='firstName'/>
              <TextField name='lastName'/>
              <TextField name='image'/>
              <TextField name='gender'/>
              <TextField name='major'/>
              <NumField name='year'/>
              <LongTextField name='description'/>
              <TextField name='pets.blacklist'/>
              <TextField name='pets.whitelist'/>
              <TextField name='location'/>
              <NumField name='rent.min'/>
              <NumField name='rent.max'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CreateProfile;
