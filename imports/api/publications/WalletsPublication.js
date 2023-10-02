import { Meteor } from 'meteor/meteor';
import { WalletsCollection } from '../collections/WalletsCollection';

Meteor.publish('allWallets', function () {
  //   return ContactsCollection.find({ userId: this.userId });
  return WalletsCollection.find({});
});
