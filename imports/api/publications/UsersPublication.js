import { Meteor } from "meteor/meteor";

Meteor.publish('users', (selector = {}, options = {}) => {
    return Meteor.users.find(selector, options)
})

