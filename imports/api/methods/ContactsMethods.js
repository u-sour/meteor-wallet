import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from '../collections/ContactsCollection';
import { check } from 'meteor/check';

Meteor.methods({
  'contact.find': (selector) => {
    return ContactsCollection.find(selector).fetch();
  },
  'contact.insert': (form) => {
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
    return ContactsCollection.insert(form);
  },
  'contact.remove': (contactId) => {
    check(contactId, String);
    return ContactsCollection.remove(contactId);
  },
  'contact.archive': (contactId) => {
    check(contactId, String);
    return ContactsCollection.update(
      { _id: contactId },
      { $set: { archived: true } },
    );
  },
});
