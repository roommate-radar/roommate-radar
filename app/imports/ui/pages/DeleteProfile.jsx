import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Container, Loader, Button, Message } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import { Profiles } from '../../api/profiles/Profiles';

/** Renders the selected user profile page. */
class DeleteProfile extends React.Component {

  removeItem(id) {
    console.log(`profile to delete: ${id}`);
    this.props.profile.collection.remove(id);
  }

  render() {
    return (
      <Container>
        <Message>Are you sure you want to delete your profile?</Message>
        <Button onClick={() => this.removeItem(this.props.profile)}>
          <Link to={''}>
            Yes
          </Link>
        </Button>
        <Button>
          <Link to={''}>
            No
          </Link>
        </Button>
      </Container>
    );
  }
}

DeleteProfile.propTypes = {
  profile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withRouter(withTracker(({ match }) => {
  const profileOwner = match.params._id;
  // Ensure access to User's profile page
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const profile = Profiles.collection.findOne({ owner: profileOwner });
  return {
    profile,
    ready,
  };
})(DeleteProfile));

