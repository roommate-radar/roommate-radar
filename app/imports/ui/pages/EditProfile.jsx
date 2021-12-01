import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Grid, Header, Form, Segment } from 'semantic-ui-react';
import { AutoForm, HiddenField, LongTextField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profiles/Profiles';
import { Filters } from '../../api/filters/Filters';
// import updateProfileMethod from '../../startup/both/Methods';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = () => new SimpleSchema({
  username: { type: String, label: 'Username', optional: true },
  firstName: { type: String, label: 'First', optional: true },
  lastName: { type: String, label: 'Last', optional: true },
  image: { type: String, label: 'Image URL', optional: true },
  gender: { type: String, label: 'Gender', optional: true },
  major: { type: String, label: 'Major', optional: true },
  year: { type: Number, label: 'Year', optional: true },
  description: { type: String, label: 'Description', optional: true },
  pets: { type: Object, label: 'Pets', optional: true },
  'pets.blacklist': { type: Array, blackbox: true },
  'pets.blacklist.$': { type: String, blackbox: true },
  'pets.whitelist': { type: Array, blackbox: true },
  'pets.whitelist.$': { type: String, blackbox: true },
  rent: { type: Object, label: 'Rent', optional: true },
  'rent.min': Number, 'rent.max': Number,
});

/** Renders the Edit Page. */
class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  submit(data) {
    const { firstName, lastName, address, image, gender, major, year, description, pets, rent, owner, username, _id } = data;
    Profiles.collection.update(_id, { $set: { _id, firstName, lastName, address, image, gender, major, year, description, pets, rent, owner, username } }, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfuly', 'success');
        this.setState({ redirectToReferer: true });
      }
    });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Data</Loader>;
  }

  renderPage() {
    const email = Meteor.user().username;
    console.log(email);

    const { from } = this.props.location.state || { from: { pathname: `/profile/${email}` } };
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }


    const formSchema = makeSchema();
    const bridge = new SimpleSchema2Bridge(formSchema);
    const profile = Profiles.collection.findOne({ username: email });
    console.log(profile);
    const model = _.extend({}, profile);
    console.log({ model });
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as='h2' textAlign='center'>Edit My Profile</Header>
          <AutoForm model={model} schema={bridge} onSubmit={data => this.submit(data)}>
            <Segment>
              <Form.Group width={'equal'}>
                <TextField id='firstName' name='firstName' showInlineError={true} placeholder={'First Name'}/>
                <TextField id='lastName' name='lastName' showInlineError={true} placeholder={'Last Name'}/>
                <TextField id='major' name='major' showInlineError={true} placeholder={'Major'}/>
              </Form.Group>
              <Form.Group>
                <NumField id='year' name='year' showInlineError={true} placeholder={'Year'}/>
                <TextField id='image' name='image' showInlineError={true} placeholder={'Image URL'}/>
              </Form.Group>
              <Form.Group>
                <TextField id='pets' name='pets.blacklist.$' showInlineError={true} placeholder={'Pets'}/>
                <TextField id='pets' name='pets.whitelist.$' showInlineError={true} placeholder={'Pets'}/>
              </Form.Group>
              <Form.Group>
                <NumField id='rent' name='rent.min' showInlineError={true} placeholder={'Rent'}/>
                <NumField id='rent' name='rent.max' showInlineError={true} placeholder={'Rent'}/>
              </Form.Group>
              <Form.Group>
                <LongTextField id='description' name='description' showInlineError={true} placeholder={'Description'}/>
              </Form.Group>
              <SubmitField value='Update'/>
              <HiddenField name='username'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

EditProfile.propTypes = {
  location: PropTypes.object,
  paramId: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const paramId = match.params._id;
  const sub1 = Meteor.subscribe(Filters.userPublicationName);
  const sub2 = Meteor.subscribe(Profiles.userPublicationName);
  const ready = sub1.ready() && sub2.ready();
  return {
    paramId,
    ready,
  };
})(EditProfile);
