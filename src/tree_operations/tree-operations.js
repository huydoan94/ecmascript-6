import Card from './../template/card';
import Element from './element-operation';

export default class Tree {

    addManyElements (contacts) {
        contacts.forEach((contact) => {
            this.addElement(contact);
        });
    }

    addElement (contact) {
        let parentElement;
        contact.hasOwnProperty('superiorId') ? parentElement = document.getElementById(contact.superiorId + '__next')
                                             : parentElement = document.getElementById('tree');

        parentElement.style.display === 'none' ? parentElement.style.display = 'block' : undefined;

        let aCard = new Card(contact);

        let li = document.createElement('li');
        li.setAttribute('id', contact.id + '__head');           /* Create li as head */
        parentElement.append(li);

        let div = document.createElement('div');
        div.setAttribute('id', contact.id);
        div.setAttribute('class', 'card');                      /* Create li as head */
        div.innerHTML = aCard.getCard();
        li.appendChild(div);

        let ul = document.createElement('ul');
        ul.setAttribute('id', contact.id + '__next');
        ul.style.display = 'none';
        li.appendChild(ul);

        Element.addListener(div, 'click', () => { Element.cardClicked(contact.id, div); });
        Element.addListener(div, 'dblclick', () => { Element.cardClicked(contact.id, div, true); });
    }

    rerenderTree (rootCard) {
        let tree = document.getElementById('tree');
        tree.innerHTML = rootCard;
    }
}
