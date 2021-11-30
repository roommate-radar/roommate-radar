import { Meteor } from 'meteor/meteor';
import { Filters } from '../../api/filters/Filters';
import { Profiles } from '../../api/profiles/Profiles';

const updateProfileMethod = 'Profiles.method';

Meteor.methods({
  'Profiles.update'({ firstName, lastName, image, gender, major, year, description, pets, location, rent, owner, _id}) {
    Profiles.collection.update({ _id }, { $set: { firstName, lastName, image, gender, major, year, description, pets, location, rent, owner } });
    Filters.collection.update
  }
})
