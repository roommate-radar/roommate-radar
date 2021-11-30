import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ProfilesCollection. It encapsulates state and variable values for profiles.
 */
class FiltersCollection {
  constructor() {
    // The name of this collection.
    this.name = 'FiltersCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      rent: Object,
      'rent.min': Number,
      'rent.max': Number,
      location: Array,
      'location.$': String,
      /* figure out what's happening with this: blacklist or whitelist? */
      /* if whitelist, how do you default to displaying all locations? */
      /* for now, just treating it as a blacklist. */
      gender: Array,
      'gender.$': String,
      pets: Object,
      'pets.blacklist': Array,
      'pets.blacklist.$': String,
      'pets.whitelist': Array,
      'pets.whitelist.$': String,
      year: Object,
      'year.min': Number,
      'year.max': Number,
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
 * @type {FiltersCollection}
 */
export const Filters = new FiltersCollection();
