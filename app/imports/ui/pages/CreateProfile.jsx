import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, LongTextField, SubmitField, TextField, RadioField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Profiles } from '../../api/profiles/Profiles';
import { Filters } from '../../api/filters/Filters';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  gender: String,
  image: String,
  major: String,
  year: Number,
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class CreateProfile extends React.Component {
  // On submit, insert the data.
  submit(data, formRef) {
    const { firstName, lastName, gender, image, major, year, description } = data;
    const owner = Meteor.user().username;
    const pets = { whitelist: [], blacklist: [] }; /* TEMPORARY SOLUTION! REPLACE ME WITH A FIELD IN THE FORM */
    const rent = { min: 0, max: Infinity }; /* TEMPORARY SOLUTION! REPLACE ME WITH A FIELD IN THE FORM */
    Profiles.collection.insert({ firstName, lastName, image, gender, major, year, description, pets, rent, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
    const defaultFilter = {
      rent: { min: 0, max: Infinity },
      gender: [],
      pets: { whitelist: [], blacklist: [] },
      year: { min: 0, max: Infinity },
      owner: owner,
    };
    Filters.collection.insert(defaultFilter);
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered id='createprofile-page'>
        <Grid.Column>
          <Header inverted as="h2" textAlign="center">Create Profile</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='firstName' id='createprofile-form-firstname'/>
              <TextField name='lastName' id='createprofile-form-lastname'/>
              <RadioField allowedValues = { ['Male', 'Female', 'Nonbinary'] } name='gender' id='createprofile-form-gender'/>
              <TextField name='image' id='createprofile-form-image'/>
              <TextField name='major' id='createprofile-form-major'/>
              <NumField name='year' id='createprofile-form-year'/>
              <LongTextField name='description' id='createprofile-form-description'/>
              <SubmitField value='Submit' id='createprofile-form-submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CreateProfile;
