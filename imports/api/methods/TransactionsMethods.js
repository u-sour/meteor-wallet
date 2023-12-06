import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { WalletRoles } from '../roles/WalletRole';

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
    if (!Meteor.userId()) {
      throw new Meteor.Error('Not authorized.');
    }
    form.type = isTransferring ? TRANSFER_TYPE : ADD_TYPE;
    form.userId = Meteor.userId()
    const transferSchema = new SimpleSchema({
      sourceWalletId: { type: String },
      destinationContactId: { type: String, optional: isTransferring },
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
  'transactions.remove': (transactionId) => {
    if (!Meteor.userId()) {
      throw new Meteor.Error('Not authorized.');
    }

    if (!Roles.userIsInRole(Meteor.userId(), WalletRoles.ADMIN)) {
      throw new Meteor.Error('Permission denied.')
    }
    return TransactionsCollection.remove(transactionId);
  },
  // 'contact.archive': (contactId) => {
  //   if (!Meteor.userId()) {
  //     throw new Meteor.Error('Not authorized.');
  //   }
  //   check(contactId, String);
  //   return ContactsCollection.update(
  //     { _id: contactId },
  //     { $set: { archived: true } },
  //   );
  // },
});
