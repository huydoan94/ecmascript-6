import FileReader from './file_operation/file_reader';
import Card from './template/card';

let contacts = (new FileReader()).readFile('data/contacts.json');

contacts.forEach((contact) => {
    let aCard = new Card(contact.id, contact.firstName + ' ' + contact.lastName, contact.department, contact.employeeId, contact.avatar);
    document.getElementById('org-tree').innerHTML += aCard.getCard();
});
