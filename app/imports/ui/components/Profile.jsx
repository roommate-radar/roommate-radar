import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function truncateString(str) {
  if (str.length > 65) {
    return `${str.slice(0, 65)}...`;
  }
  return str;
}

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {
  render() {
    const prop = this.props.profile;
    const description = truncateString(prop.description);
    return (
      <Card href={`#/profile/${prop.owner}`}>
        <Image size='medium' src={prop.image} wrapped ui={false}/>
        <Card.Content>
          <Card.Header>{prop.lastName}, {prop.firstName}</Card.Header>
          <Card.Meta>
            Major: {prop.major}, Class of {prop.year}
          </Card.Meta>
          <Card.Description>
            {description}
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
