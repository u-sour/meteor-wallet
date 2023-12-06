import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from '../collections/ContactsCollection';
import { check } from 'meteor/check';

Meteor.methods({
  'contact.find': (selector) => {
    return ContactsCollection.find(selector).fetch();
  },
  'contact.insert': (form) => {
    if (!Meteor.userId()) {
      throw new Meteor.Error('Not authorized.');
    }
    check(form.name, String);
    check(form.email, String);
    check(form.imageUrl, String);
    check(form.walletId, String);
    if (!form.name) {
      throw new Meteor.Error('Name is required.');
    }
    if (!form.walletId) {
      throw new Meteor.Error('Wallet ID is required.');
    }
    form.userId = Meteor.userId()
    return ContactsCollection.insert(form);
  },
  'contact.remove': (contactId) => {
    if (!Meteor.userId()) {
      throw new Meteor.Error('Not authorized.');
    }
    check(contactId, String);
    return ContactsCollection.remove(contactId);
  },
  'contact.archive': (contactId) => {
    if (!Meteor.userId()) {
      throw new Meteor.Error('Not authorized.');
    }
    check(contactId, String);
    return ContactsCollection.update(
      { _id: contactId },
      { $set: { archived: true } },
    );
  },
});
