import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { WalletRoles } from './WalletRole';

Roles.createRole(WalletRoles.ADMIN, { unlessExists: true });

Meteor.startup(() => {
    const user = Meteor.users.findOne({ _id: "ydx8nnaMFQMPgGfeb" })
    if (!user || Roles.userIsInRole(user._id, WalletRoles.ADMIN)) {
        return;
    }
    Roles.addUsersToRoles(user._id, WalletRoles.ADMIN)
}) 