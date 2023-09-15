// index.js
const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      return console.table(list);
      break;
    case "get":
      // ... id
      const getContact = await contacts.getContactById(id);
      return console.log(getContact);
      break;

    case "add":
      // ... name email phone
      const addContactItem = await contacts.addContact(name, email, phone);
      return console.log(addContactItem);
      break;

    case "remove":
      // ... id
      const deleteContact = await contacts.removeContact(id);
      return console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
