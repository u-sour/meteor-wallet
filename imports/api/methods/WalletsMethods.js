import { Meteor } from 'meteor/meteor';
import { WalletsCollection } from '../collections/WalletsCollection';
import SimpleSchema from 'simpl-schema';

Meteor.methods({
  'wallets.find': (selector) => {
    return WalletsCollection.find(selector).fetch();
  },
  // 'wallets.insert': (isTransferring, form) => {
  //   const transferSchema = new SimpleSchema({
  //     sourceWalletId: { type: String },
  //     destinationWallet: { type: String, optional: isTransferring },
  //     amount: { type: Number, min: 0 },
  //   });
  //   const schema = new SimpleSchema({
  //     isTransferring: { type: Boolean },
  //     form: { type: transferSchema },
  //   });
  //   const cleanForm = schema.clean(form);
  //   schema.validate(cleanForm);
  //   isTransferring ? (form.type = 'TRANSFER') : 'ADD';
  //   return TransactionsCollection.insert(form);
  // },
  // 'contact.remove': (contactId) => {
  //   check(contactId, String);
  //   return ContactsCollection.remove(contactId);
  // },
  // 'contact.archive': (contactId) => {
  //   check(contactId, String);
  //   return ContactsCollection.update(
  //     { _id: contactId },
  //     { $set: { archived: true } },
  //   );
  // },
});
