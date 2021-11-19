import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {
  render() {
    const prop = this.props.profile;
    return (
      <Card href={`#/profile/${prop._id}`}>
        <Image src={prop.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{prop.lastName}, {prop.firstName}</Card.Header>
          <Card.Meta>
            Major: {prop.major}, Class of {prop.year}
          </Card.Meta>
          <Card.Description>
            {prop.description}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Profile);
