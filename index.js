import { program } from 'commander';
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from './contacts.js';

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case 'list':
      const list = await listContacts();
      console.log('contactsList: ', list);
      break;

    case 'get':
      const requiredContact = await getContactById(id);
      console.log('requiredContact: ', requiredContact);
      break;

    case 'add':
      const addedContact = await addContact(data);
      console.log('addedContact', addedContact);
      break;

    case 'remove':
      const removedContact = await removeContact(id);
      console.log('removedContact: ', removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);
