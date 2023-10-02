import { Meteor } from 'meteor/meteor';
import {
  TransactionsCollection,
  TRANSFER_TYPE,
  ADD_TYPE,
} from '../collections/TransactionsCollection';
import SimpleSchema from 'simpl-schema';

Meteor.methods({
  // 'contact.find': (selector) => {
  //   return ContactsCollection.find(selector).fetch();
  // },
  'transactions.insert': (isTransferring, form) => {
    console.log(
      '🚀 ~ file: TransactionsMethods.js:10 ~ isTransferring:',
      isTransferring,
    );
    form.type = isTransferring ? TRANSFER_TYPE : ADD_TYPE;
    console.log('🚀 ~ file: TransactionsMethods.js:10 ~ form:', form);
    const transferSchema = new SimpleSchema({
      sourceWalletId: { type: String },
      destinationWallet: { type: String, optional: isTransferring },
      amount: { type: Number, min: 1 },
      type: { type: String },
    });
    const schema = new SimpleSchema({
      // isTransferring: { type: Boolean },
      form: { type: Object, optional: true },
      'form.$': { type: transferSchema },
    });
    const cleanForm = schema.clean(form);
    schema.validate(cleanForm);
    return TransactionsCollection.insert(form);
  },
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
