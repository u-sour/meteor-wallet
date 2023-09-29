import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from './ContactsCollection';

Meteor.publish('allContacts', function () {
  //   return ContactsCollection.find({ userId: this.userId });
  return ContactsCollection.find({});
});
