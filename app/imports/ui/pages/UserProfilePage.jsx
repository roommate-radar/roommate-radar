import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Container, Loader, Card } from 'semantic-ui-react';
import { Profiles } from '../../api/profiles/Profiles';
import Profile from '../components/Profile';

function getProfileId(param1, param2) {
  let data = '';
  if (param1 === param2) {
    data = Profiles.collection.find({ owner: param2 }).fetch();
  } else {
    data = Profiles.collection.find({ _id: param2 }).fetch();
  }
  return data;
}

/** Renders the selected user profile page. */
class UserProfilePage extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Fetching Profile</Loader>;
  }

  renderPage() {
    const currentId = Meteor.user().username;
    const parameter = this.props.paramId;
    const currentUser = getProfileId(currentId, parameter);
    return (
      <Container>
        <Card.Group>
          {_.map(currentUser, (profile, index) => <Profile key={index} profile={profile}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require a object of student profile to be passed to this component.
UserProfilePage.propTypes = {
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
