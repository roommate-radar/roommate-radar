import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import { Filters } from '../../api/filters/Filters';

/* eslint-disable no-console */

// Initialize the database with a default profile document.
function addProfile(profile) {
  const whyCantJsonStoreInfinity = profile;
  if (whyCantJsonStoreInfinity.rent.max === 'Infinity') {
    whyCantJsonStoreInfinity.rent.max = Infinity;
  }

  console.log(`  Adding: ${profile.firstName} ${profile.lastName} (${profile.owner})`);
  console.log(whyCantJsonStoreInfinity);
}

// Initialize the database with a default filter document.
function addFilter(filter) {
  const whyCantJsonStoreInfinity = filter;
  if (whyCantJsonStoreInfinity.rent.max === 'Infinity') {
    whyCantJsonStoreInfinity.rent.max = Infinity;
  }

  if (whyCantJsonStoreInfinity.year.max === 'Infinity') {
    whyCantJsonStoreInfinity.year.max = Infinity;
  }

  console.log(`  Adding filter for ${filter.owner}`);
  Filters.collection.insert(whyCantJsonStoreInfinity);
}

// Initialize the ProfilesCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
  }
}

// Initialize the FiltersCollection if empty.
if (Filters.collection.find().count() === 0) {
  if (Meteor.settings.defaultFilters) {
    console.log('Creating default filters.');
    Meteor.settings.defaultFilters.map(filter => addFilter(filter));
  }
}
