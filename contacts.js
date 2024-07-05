import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const getNanoid = async () => {
  const { nanoid } = await import('nanoid');
  return nanoid;
};

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
      await fs.writeFile(contactsPath, JSON.stringify(contactsList));
      return removedContact;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  const nanoid = await getNanoid();
  const contact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  try {
    const contactsList = await listContacts();
    contactsList.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList));
    return contact;
  } catch (err) {
    console.error(err);
  }
}

export { listContacts, getContactById, removeContact, addContact };
