import Card from './../template/card';
import EventHander from './event-handler';
import DataLoader from '../data_operations/data-loader';

export default class Tree {

    static addManyElements (contacts) {
        contacts.forEach((contact) => {
            this.addElement(contact);
        });
    }

    static addElement (contact) {
        let parentElement = document.getElementById(contact.superiorId + '__tail');
        if (!contact.hasOwnProperty('superiorId') || typeof (parentElement) === 'undefined' || parentElement === null) {
            parentElement = document.getElementById('tree');
        }

        if (parentElement.style.display === 'none') {
            parentElement.style.display = 'block';
            (document.getElementById(contact.superiorId + '__icon')).setAttribute('src', 'images/icon/minus-icon.png');
        }

        let aCard = new Card(contact);

        let li = document.createElement('li');
        li.setAttribute('id', contact.id + '__head');

        let div = document.createElement('div');
        div.setAttribute('id', contact.id);
        div.setAttribute('class', 'card');
        div.setAttribute('draggable', 'true');
        div.innerHTML = aCard.getCard();

        let ul = document.createElement('ul');
        ul.setAttribute('id', contact.id + '__tail');
        ul.style.display = 'none';

        let icon = document.createElement('img');
        icon.setAttribute('id', contact.id + '__icon');
        icon.setAttribute('class', 'card__expand__collapse');
        icon.setAttribute('src', 'images/icon/plus-icon.png');

        EventHander.addListener(div, 'click', () => { EventHander.clickCard(contact.id, div); });
        EventHander.addListener(div, 'dblclick', () => { EventHander.clickCard(contact.id, div, true); });
        EventHander.addListener(div, 'dragstart', (event) => { EventHander.dragCard(contact.id, div, event); });
        EventHander.addListener(div, 'dragover', (event) => { EventHander.dragoverCard(contact.id, div, event); });
        EventHander.addListener(div, 'drop', (event) => { EventHander.dropCard(contact.id, div, event); });

        EventHander.addListener(icon, 'click', () => { EventHander.triggerExpandCollapse(contact.id, icon); });

        let avatarUploader = div.getElementsByTagName('input')[0];
        EventHander.addListener(avatarUploader, 'change', () => { EventHander.uploadImg(contact.id, avatarUploader); });

        let cardActionComponents = div.getElementsByClassName('card__action')[0];
        EventHander.addListener(cardActionComponents.children[0], 'click', () => { EventHander.triggerEdit(contact.id, div); });
        EventHander.addListener(cardActionComponents.children[1], 'click', () => { EventHander.triggerAddPeer(contact.id, div); });
        EventHander.addListener(cardActionComponents.children[2], 'click', () => { EventHander.triggerAddChild(contact.id, div); });
        EventHander.addListener(cardActionComponents.children[3], 'click', () => { EventHander.triggerDelete(contact.id, div); });

        parentElement.append(li);
        li.appendChild(div);
        li.appendChild(icon);
        li.appendChild(ul);
    }

    static deleteElement (rootId) {
        let card = document.getElementById(rootId + '__head');
        let parentCard = card.parentElement;
        let elementWithChild = DataLoader.loadManyFromLocalStorage(rootId, true);

        parentCard.removeChild(card);

        elementWithChild.forEach((contact) => {
            DataLoader.deleteFromLocalStorage(contact);
        });
    }

    static createEmptyCard (rootId, peer = false) {
        let contact = {};
        let rootContact = DataLoader.loadFromLocalStorage(rootId);

        contact.id = DataLoader.getNextId();
        peer ? contact.superiorId = rootContact.superiorId : contact.superiorId = rootId;

        DataLoader.saveToLocalStorage(contact);
        Tree.addElement(contact);
    }
}
