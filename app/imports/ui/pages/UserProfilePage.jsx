import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Container, Loader, Card } from 'semantic-ui-react';
import { Profiles } from '../../api/profiles/Profiles';
import Profile from '../components/Profile';

/** Renders the selected user profile page. */
class UserProfilePage extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Fetching Profile</Loader>;
  }

  renderPage() {
    return (
      <Container>
        <Card.Group>
          {this.props.profiles.map((profile, index) => <Profile key={index} profile={profile}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require a object of student profile to be passed to this component.
UserProfilePage.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. */
export default withTracker(() => {
  // Ensure access to User's profile page
  const subscription = Meteor.subscribe('ProfilesCollection');
  // Get the Profiles collection
  const profiles = Profiles.collection.find({}).fetch();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  return {
    profiles,
    ready,
  };
})(UserProfilePage);
