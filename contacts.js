const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");
const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
    const result = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(result);
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const contactIdToString = String(contactId);
    const result = contacts.find(item => item.id === contactIdToString);
    return result || null;
}

const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const contactIdToString = String(contactId);
    const index = contacts.findIndex(item => item.id === contactIdToString);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1)
    await updateContacts(contacts);
    return result;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
};