// import { Meteor } from 'meteor/meteor';
// import SimpleSchema from 'simpl-schema';
import '../imports/api/collections/ContactsCollection';
import '../imports/api/methods/ContactsMethods';
import '../imports/api/publications/ContactsPublication';
import '../imports/api/collections/TransactionsCollection';
import '../imports/api/methods/TransactionsMethods';
// import { WalletsCollection } from '../imports/api/collections/WalletsCollection';
import '../imports/api/methods/WalletsMethods';
import '../imports/api/publications/WalletsPublication';
import '../imports/api/methods/AccountMethods';
import '../imports/api/publications/UsersPublication'
import '../imports/api/roles/roles'

// const walletSchema = new SimpleSchema({
//   balance: { type: Number, min: 0, defaultValue: 0 },
//   currency: {
//     type: String,
//     allowedValues: ['USD', 'EUR'],
//     defaultValue: 'USD',
//   },
//   createdAt: { type: Date },
// });

// Meteor.startup(async () => {
//   if (!WalletsCollection.find().count()) {
//     // const walletData = {
//     //   createdAt: new Date(),
//     // };
//     // const cleanWallet = walletSchema.clean(walletData);
//     // walletSchema.validate(cleanWallet);
//     WalletsCollection.insert({ createdAt: new Date() });
//   }
// });
