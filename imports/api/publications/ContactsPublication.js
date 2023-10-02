import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from '../collections/ContactsCollection';

Meteor.publish('allContacts', function () {
  //   return ContactsCollection.find({ userId: this.userId });
  return ContactsCollection.find({});
});

Meteor.publish('contacts', function () {
  //   return ContactsCollection.find({ userId: this.userId });
  return ContactsCollection.find({ archived: { $ne: true } });
});
