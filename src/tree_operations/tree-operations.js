import Card from './../template/card';

export default class Tree {

    addAllElements (contacts) {
        contacts.forEach((contact) => {
            this.addElement(contact);
        });
    }

    addElement (contact) {
        let element;

        if (contact.hasOwnProperty('superiorId')) {
            element = document.getElementById(contact.superiorId);
        } else {
            element = document.getElementById('tree');
        }

        if (typeof (element) !== 'undefined' && element != null) {
            let aCard = new Card(contact.id, contact.firstName + ' ' + contact.lastName, contact.department, contact.employeeId, contact.avatar);

            let li = element.appendChild(document.createElement('li'));
            li.innerHTML = aCard.getCard();

            let ul = li.appendChild(document.createElement('ul'));
            ul.setAttribute('id', contact.id);
        }
    }
}
