import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function truncateString(str) {
  if (str.length > 100) {
    return `${str.slice(0, 100)}. . . `;
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
        <Card.Content>
          <Image
            className='circular-image white-gray-border'
            floated='left'
            size='small'
            src={this.props.profile.image}
          />
          <br/><br/>
          <Card.Header>
            <div className='bigger-font'>{prop.lastName}, <br/>{prop.firstName} </div>
          </Card.Header>
        </Card.Content>
        <Card.Content style={{ border: 'none', boxShadow: 'none' }}>
          <Card.Meta>
            <div className='slightly-smaller-font'>
              Major: {prop.major}, <br/>Class of {prop.year}
            </div>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Card.Description> {description} </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// <Card href={`#/profile/${prop.owner}`}>
//   <Card.Content>
//     <Image size='mini' src={prop.image} wrapped ui={false}/>
//     <Card.Header>{prop.lastName}, {prop.firstName}</Card.Header>
//     <Card.Meta>
//       Major: {prop.major}, Class of {prop.year}
//     </Card.Meta>
//     <Card.Description>
//       {description}
//     </Card.Description>
//   </Card.Content>
// </Card>

// Require a document to be passed to this component.
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Profile);
