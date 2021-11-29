import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profiles/Profiles';
import { Filters } from '../../api/filters/Filters';
import Profile from '../components/Profile';

/** Renders a table containing all of the Profile documents. Use <ProfileItem> to render each row. */
class ListProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header inverted as="h2" textAlign="center">List Profile</Header>
        <Card.Group centered>
          {this.props.profiles.map((profile, index) => <Profile key={index} profile={profile}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Profile documents in the props.
ListProfile.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Profile documents.
  const profilesSubscription = Meteor.subscribe(Profiles.userPublicationName);
  const filtersSubscription = Meteor.subscribe(Filters.userPublicationName);
  // Determine if the subscription is ready
  const ready = profilesSubscription.ready() && filtersSubscription.ready();
  // Get the user's filter document
  /* const filter = Filters.collection.findOne({}); */

  // Get the Profile documents matching the user's filter
  const profiles = Profiles.collection.find({
    /* rent: { $gte: filter.rent.min, $lte: filter.rent.max }, */
    /* location: { $nin: filter.location }, */
    /* gender: { $in: filter.gender }, */
    /* 'pets.blacklist': { $nin: { filter.pets.whitelist }}, */
    /* 'pets.whitelist': { $nin: { filter.pets.blacklist }}, */
    /* year: { $gte: filter.year.min, $lte: filter.year.max }, */
    /* owner: { $ne: Meteor.user().username }, */
  }).fetch();
  return {
    profiles,
    ready,
  };
})(ListProfile);
