import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from '../collections/ContactsCollection';

Meteor.publish('allContacts', function () {
  //   return ContactsCollection.find({ userId: this.userId });
  return ContactsCollection.find({});
});

Meteor.publish('myContacts', function () {
  //   return ContactsCollection.find({ userId: this.userId });
  const { userId } = this;
  if (!userId) {
    throw Meteor.Error('Not authorized.')
  }
  return ContactsCollection.find({ userId, archived: { $ne: true } });
});
