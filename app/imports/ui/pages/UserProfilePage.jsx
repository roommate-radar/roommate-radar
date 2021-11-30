import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Container, Loader, Grid } from 'semantic-ui-react';
import { Profiles } from '../../api/profiles/Profiles';
import UserProfiles from '../components/UserProfiles';

function getProfileId(param1) {
  const data = Profiles.collection.find({}).fetch().filter(datas => datas.owner === param1[0]);
  const emails = _.pluck(data, 'owner');
  return emails[0];
}

/** Renders the selected user profile page. */
class UserProfilePage extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Fetching Profile</Loader>;
  }

  renderPage() {
    const userEmail = getProfileId(_.pluck(Meteor.user().emails, 'address'));
    const getData = (this.props.paramId === Meteor.user().username) ? userEmail : this.props.paramId;
    const currentUser1 = Profiles.collection.find({ owner: getData }).fetch();
    return (
      <Container>
        <Grid>
          {_.map(currentUser1, (profile, index) => <UserProfiles key={index} profile={profile}/>)}
        </Grid>
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
