import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Container, Loader, Button, Grid, Header, Image, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Profiles } from '../../api/profiles/Profiles';


/** Renders the selected user profile page. */
class DeleteProfile extends React.Component {

  removeItem(id) {
    console.log(`profile to delete: ${id}`);
    this.props.Profiles.collection.remove(id);
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container>
        <Message>Are you sure you want to delete your profile?</Message>
        <Button onClick={() => this.removeItem(this.props.profile._id)}>
          Yes
        </Button>
        <Button>
          No
        </Button>
      </Container>
    );
  }
}

// Require a object of student profile to be passed to this component.
DeleteProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  Profiles: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. */
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
