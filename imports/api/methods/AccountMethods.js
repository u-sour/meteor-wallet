import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base';
import { WalletsCollection } from '../collections/WalletsCollection';

// hooks
Accounts.onCreateUser((options, user) => {
    const customizeUser = { ...user }
    WalletsCollection.insert({ userId: user._id, createdAt: new Date() })
    return customizeUser;
})

Meteor.methods({
    'acc.createUser': (form) => {
        const { username, email, password } = form;
        return Accounts.createUser({ username, email, password });
    },
    'acc.resetPassword': (email) =>
        Accounts.forgotPassword({ email })
    ,
    'acc.findOne': (selector = {}, options = {}) =>
        Meteor.users.findOne(selector, options)
})