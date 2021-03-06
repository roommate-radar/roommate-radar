import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ProfilesCollection. It encapsulates state and variable values for profiles.
 */
class ProfilesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      image: String,
      gender: String,
      major: String,
      year: Number,
      description: String,
      pets: Object,
      'pets.blacklist': Array,
      'pets.blacklist.$': String,
      'pets.whitelist': Array,
      'pets.whitelist.$': String,
      rent: Object,
      'rent.min': Number,
      'rent.max': Number,
      socialMedia: Object,
      'socialMedia.instagram': {
        type: String,
        optional: true,
      },
      'socialMedia.snapchat': {
        type: String,
        optional: true,
      },
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ProfilesCollection.
 * @type {ProfilesCollection}
 */
export const Profiles = new ProfilesCollection();
