import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from './ContactsCollection';
import { check } from 'meteor/check';

Meteor.methods({
  'contact.find': (selector) => {
    return ContactsCollection.find(selector).fetch();
  },
  'contact.insert': (form) => {
    check(form.name, String);
    check(form.email, String);
    check(form.imageUrl, String);
    if (!form.name) {
      throw new Meteor.Error('Name is required.');
    }
    return ContactsCollection.insert(form);
  },
  'contact.remove': (contactId) => {
    check(contactId, String);
    return ContactsCollection.remove(contactId);
  },
});
