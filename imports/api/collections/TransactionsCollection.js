import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { WalletsCollection } from './WalletsCollection';
import { ContactsCollection } from './ContactsCollection';

export const TRANSFER_TYPE = 'TRANSFER';
export const ADD_TYPE = 'ADD';

// collection hooks with inheritance
// class TransactionsMongoCollection extends Mongo.Collection {
//   insert(transactionDoc, callback) {
//     const sourceWallet = WalletsCollection.findOne(
//       transactionDoc.sourceWalletId,
//     );
//     if (!sourceWallet) {
//       throw new Meteor.Error('Source Wallet not found.');
//     }
//     if (transactionDoc.type === TRANSFER_TYPE) {
//       const destinationWallet = WalletsCollection.findOne(
//         transactionDoc.destinationWalletId,
//       );
//       if (!destinationWallet) {
//         throw new Meteor.Error('Destination Wallet not found.');
//       }
//       if (sourceWallet.balance < transactionDoc.amount) {
//         throw new Meteor.Error('Insufficient funds.');
//       }
//       WalletsCollection.update(transactionDoc.sourceWalletId, {
//         $inc: { balance: -transactionDoc.amount },
//       });
//       WalletsCollection.update(transactionDoc.destinationWalletId, {
//         $inc: { balance: transactionDoc.amount },
//       });
//     }

//     if (transactionDoc.type === ADD_TYPE) {
//       WalletsCollection.update(transactionDoc.sourceWalletId, {
//         $inc: { balance: transactionDoc.amount },
//       });
//     }
//     return super.insert(transactionDoc, callback);
//   }
// }

// export const TransactionsCollection = new TransactionsMongoCollection(
//   'transactions',
// );

export const TransactionsCollection = new Mongo.Collection('transactions');
// collection hook with matb33:collection-hooks package
TransactionsCollection.before.insert(function (userId, transactionDoc) {
  const sourceWallet = WalletsCollection.findOne(transactionDoc.sourceWalletId);
  if (!sourceWallet) {
    throw new Meteor.Error('Source Wallet not found.');
  }
  if (transactionDoc.type === TRANSFER_TYPE) {
    const destinationContact = ContactsCollection.findOne(
      transactionDoc.destinationContactId,
    );
    if (!destinationContact) {
      throw new Meteor.Error('Destination Contact not found.');
    }
    if (sourceWallet.balance < transactionDoc.amount) {
      throw new Meteor.Error('Insufficient funds.');
    }
    WalletsCollection.update(transactionDoc.sourceWalletId, {
      $inc: { balance: -transactionDoc.amount },
    });
    WalletsCollection.update(transactionDoc.destinationContactId, {
      $inc: { balance: transactionDoc.amount },
    });
  }

  if (transactionDoc.type === ADD_TYPE) {
    WalletsCollection.update(transactionDoc.sourceWalletId, {
      $inc: { balance: transactionDoc.amount },
    });
  }
});

TransactionsCollection.before.remove(function (userId, transactionDoc) {
  const sourceWallet = WalletsCollection.findOne(transactionDoc.sourceWalletId);
  if (!sourceWallet) {
    throw new Meteor.Error('Source Wallet not found.');
  }
  if (transactionDoc.type === TRANSFER_TYPE) {
    const destinationContact = ContactsCollection.findOne(
      transactionDoc.destinationContactId,
    );
    if (!destinationContact) {
      throw new Meteor.Error('Destination Contact not found.');
    }
    if (sourceWallet.balance < transactionDoc.amount) {
      throw new Meteor.Error('Insufficient funds.');
    }
    WalletsCollection.update(transactionDoc.sourceWalletId, {
      $inc: { balance: transactionDoc.amount },
    });
  }

  if (transactionDoc.type === ADD_TYPE) {
    WalletsCollection.update(transactionDoc.sourceWalletId, {
      $inc: { balance: -transactionDoc.amount },
    });
  }
});

const TransactionsSchema = new SimpleSchema({
  sourceWalletId: { type: String },
  destinationContactId: { type: String, optional: true },
  amount: { type: Number, min: 1 },
  type: { type: String, allowedValues: [TRANSFER_TYPE, ADD_TYPE] },
  createdAt: { type: Date },
  userId: { type: String },
});

TransactionsCollection.attachSchema(TransactionsSchema);
