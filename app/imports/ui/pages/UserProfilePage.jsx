import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Container, Loader, Grid, Header, Image } from 'semantic-ui-react';
import { Profiles } from '../../api/profiles/Profiles';

// function getProfileId(param1, param2) {
//   let data = '';
//   if (param1 === param2) {
//     data = Profiles.collection.find({ owner: param2 }).fetch();
//   } else {
//     data = Profiles.collection.find({ owner: param2 }).fetch();
//   }
//   return data;
// }

/** Renders the selected user profile page. */
class UserProfilePage extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Fetching Profile</Loader>;
  }

  renderPage() {
    // const currentId = Meteor.user().username;
    // const parameter = this.props.paramId;
    // {_.map(currentUser1, (profile, index) => <Profile key={index} profile={profile}/>)}
    const currentUser1 = Profiles.collection.find({ owner: this.props.paramId }).fetch();
    // console.log(currentUser1);
    return (
      <Container>
        <Grid celled column={2}>
          <Grid.Row>
            <Grid.Column width={6}>
              <Image circular src={_.pluck(currentUser1, 'image')} size='medium'/>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header inverted as='h1'>
                <div>{_.pluck(currentUser1, 'firstName')} {_.pluck(currentUser1, 'lastName')}</div>
              </Header>
              <Header inverted as='h3'>
                About Me <br/><br/>
                <div>{_.pluck(currentUser1, 'description')}</div>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row column={1}>
            <Grid.Column>
              <Header inverted as='h2'>
                <div>Major: {_.pluck(currentUser1, 'major')} </div>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row column={1}>
            <Grid.Column>
              <Header inverted as='h2'>
                <div>Class of: {_.pluck(currentUser1, 'year')} </div>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

// Require a object of student profile to be passed to this component.
UserProfilePage.propTypes =
  {
    paramId: PropTypes.string,
    ready: PropTypes.bool.isRequired,
  };

/** withTracker connects Meteor data to React components. */
export default withTracker(({ match }) => {
  const paramId = match.params._id;
  // Ensure access to User's profile page
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  return {
    paramId,
    ready,
  };
})(UserProfilePage);
