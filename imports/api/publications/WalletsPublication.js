import { Meteor } from 'meteor/meteor';
import { WalletsCollection } from '../collections/WalletsCollection';

Meteor.publish('myWallet', function () {
  //   return ContactsCollection.find({ userId: this.userId });
  const { userId } = this;
  if (!userId) {
    throw Meteor.Error('Not authorized.')
  }
  return WalletsCollection.find({ userId });
});
