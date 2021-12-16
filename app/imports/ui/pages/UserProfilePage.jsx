import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Container, Loader, Button, Grid, Header, Image, Icon, Menu } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import { Profiles } from '../../api/profiles/Profiles';

/** Renders the selected user profile page. */
class UserProfilePage extends React.Component {

  isLoggedInUser(profileOwner) {
    // console.log(param1);
    if (profileOwner === Meteor.user().username) {
      return (
        <Button>
          <Link to={`/edit/${this.props.profile.owner}`} id='userprofile-editprofile'>
            Edit Profile
          </Link>
        </Button>
      );
    }
    return null;
  }

  haveInstagram(profileOwner) {
    if (profileOwner === Meteor.user().username) {
      if (this.props.profile.socialMedia.instagram !== '') {
        return (
          <Menu.Item href={`https://instagram.com/${this.props.profile.socialMedia.instagram}`} icon='instagram' as='a' />
        );
      }
    }
    return null;
  }

  haveSnapchat(profileOwner) {
    if (profileOwner === Meteor.user().username) {
      if (this.props.profile.socialMedia.snapchat !== '') {
        return (
          <Menu.Item href={`https://snapchat.com/add/${this.props.profile.socialMedia.snapchat}`} icon='snapchat square' as='a' />
        );
      }
    }
    return null;
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container id='userprofile-page'>
        <Grid celled column={2}>
          <Grid.Row>
            <Grid.Column width={6}>
              <Image circular src={this.props.profile.image} size='medium'/>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header inverted as='h1'>
                <div>{this.props.profile.firstName} {this.props.profile.lastName}</div>
              </Header>
              <Header inverted as='h3'>
                About Me <br/><br/>
                <div>{this.props.profile.description}</div>
                <div>{this.haveInstagram(this.props.profile.owner)}</div>
                <div>{this.haveSnapchat(this.props.profile.owner)}</div>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row column={1}>
            <Grid.Column>
              <Header inverted as='h2'>
                <div>Major: {this.props.profile.major} </div>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row column={1}>
            <Grid.Column>
              <Header inverted as='h2'>
                <div>Class of: {this.props.profile.year} </div>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row column={1}>
            <Grid.Column>
              <Header inverted as='h2'>
                {this.isLoggedInUser(this.props.profile.owner)}
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

// Require a object of student profile to be passed to this component.
UserProfilePage.propTypes = {
  profile: PropTypes.object,
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
})(UserProfilePage));
