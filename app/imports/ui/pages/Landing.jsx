import React from 'react';
import { Grid, Header, Icon, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Container fluid className='landing-container-background'>
        <Grid container centered columns={2}>
          <Grid.Column textAlign='center'>
            <Header inverted as='h1'>Welcome to Roommate Radar</Header>
            <Header inverted as='h3'> Roommate Radar has helped students find the perfect roommate since 2021.
              Designed by students for students, Roommate Radar is the perfect platform to meet others like you.</Header>
          </Grid.Column>

          <Grid container centered stackable columns='2'>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Icon inverted size='huge' name='users'/>
                <Header inverted as='h1'>Multiple Users</Header>
                <Header inverted as='h3'>Create your own personal profile to display to other students.</Header>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Icon inverted size='huge' name='calendar check'/>
                <Header inverted as='h1'>Personalize</Header>
                <Header inverted as='h3'>List specific personal details like pet preference, budget, neighborhood details to help find the perfect roommate.</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid.Row columns={1} centered>
            <Grid.Column verticalAlign='middle'>
              <Header inverted as='h4'>To continue, please log in <Link to='/signin'>here</Link>. Don&apos;t have an account with us? Register <Link to='/signup'>here</Link>!</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Landing;
