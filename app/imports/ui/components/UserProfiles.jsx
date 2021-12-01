import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Grid, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

class UserProfiles extends React.Component {

  currentUser(param1) {
    // console.log(param1);
    let currentOwner;
    if (param1 === Meteor.user().emails[0].address) {
      currentOwner = (
        <Button>
          <Link to={`/edit/${this.props.profile.username}`}>
            Edit Profile
          </Link>
        </Button>
      );
    }
    return currentOwner;
  }

  render() {
    return (
      <Container>
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
                {this.currentUser(this.props.profile.owner)}
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

UserProfiles.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default withRouter(UserProfiles);
