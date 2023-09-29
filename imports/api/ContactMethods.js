import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from './ContactsCollection';

Meteor.methods({
  'contact.find': (selector) => {
    return ContactsCollection.find(selector).fetch();
  },
  'contact.insert': (form) => {
    if (!form.name) {
      throw new Meteor.Error('Name is required.');
    }
    return ContactsCollection.insert(form);
  },
  'contact.remove': (contactId) => {
    return ContactsCollection.remove(contactId);
  },
});
