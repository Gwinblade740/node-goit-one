const fs = require("fs").promises;
const path = require("node:path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const { nanoid } = require("nanoid");

const listContacts = async () => {
  // ...твой код. Возвращает массив контактов.
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const listData = await listContacts();
  const result = listData.find((dataItem) => dataItem.id === id);
  return result || null;
};

const removeContact = async (contactId) => {
  // ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
  const contacts = await listContacts();
  const ind = contacts.findIndex((index) => index.id === contactId);
  if (ind === -1) {
    return null;
  }
  const [result] = contacts.splice(ind, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};
const addContact = async (name, email, phone) => {
  // ...твой код. Возвращает объект добавленного контакта.
  const contacts = await listContacts();
  const newContact = {
    id: nanoid,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); ///
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
