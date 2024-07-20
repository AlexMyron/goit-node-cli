import { promises as fs } from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db', 'contacts.json');
const overwriteContacts = async (path, list) =>
  await fs.writeFile(path, JSON.stringify(list, null, 2));

async function listContacts() {
  try {
    const list = await fs.readFile(contactsPath);
    return JSON.parse(list);
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const contactsList = await listContacts();
    const contact = await contactsList.find(({ id }) => id === contactId);
    return contact || null;
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const contactsList = await listContacts();
    const contactIdx = contactsList.findIndex(({ id }) => id === contactId);

    if (contactIdx !== -1) {
      const removedContact = contactsList.splice(contactIdx, 1);
      await overwriteContacts(contactsPath, contactsList);
      return removedContact;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
  }
}

async function addContact(data) {
  const contact = {
    id: nanoid(),
    ...data,
  };

  try {
    const contactsList = await listContacts();
    contactsList.push(contact);
    await overwriteContacts(contactsPath, contactsList);
    return contact;
  } catch (err) {
    console.error(err);
  }
}

export { listContacts, getContactById, removeContact, addContact };
