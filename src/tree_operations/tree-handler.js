import Card from './../template/card';
import EventHandler from './event-handler';
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

        EventHandler.addListener(div, 'click', () => { EventHandler.clickCard(contact.id, div); });
        EventHandler.addListener(div, 'dblclick', () => { EventHandler.clickCard(contact.id, div, true); });
        EventHandler.addListener(div, 'dragstart', (event) => { EventHandler.dragCard(contact.id, div, event); });
        EventHandler.addListener(div, 'dragover', (event) => { EventHandler.dragoverCard(contact.id, div, event); });
        EventHandler.addListener(div, 'drop', (event) => { EventHandler.dropCard(contact.id, div, event); });

        EventHandler.addListener(icon, 'click', () => { EventHandler.triggerExpandCollapse(contact.id, icon); });

        let avatarUploader = div.getElementsByTagName('input')[0];
        EventHandler.addListener(avatarUploader, 'change', () => { EventHandler.uploadImg(contact.id, avatarUploader); });

        let cardActionComponents = div.getElementsByClassName('card__action')[0];
        EventHandler.addListener(cardActionComponents.children[0], 'click', () => { EventHandler.triggerEdit(contact.id, div); });
        EventHandler.addListener(cardActionComponents.children[1], 'click', () => { EventHandler.triggerAddPeer(contact.id, div); });
        EventHandler.addListener(cardActionComponents.children[2], 'click', () => { EventHandler.triggerAddChild(contact.id, div); });
        EventHandler.addListener(cardActionComponents.children[3], 'click', () => { EventHandler.triggerDelete(contact.id, div); });

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

    static getBreadScrum (childId, first = false) {
        let contact = DataLoader.loadFromLocalStorage(childId);

        let a;
        if (!first) {
            a = document.createElement('a');
            a.setAttribute('href', '#');
            EventHandler.addListener(a, 'click', () => { EventHandler.clickPath(childId, a); });
        } else {
            a = document.createElement('p');
        }
        a.setAttribute('id', childId + '__breadscrum');
        a.innerHTML = contact.firstName + ' ' + contact.lastName;

        let p = document.createElement('p');
        p.innerHTML = '/';

        let breadscrum = document.getElementById('breadscrum');
        breadscrum.insertBefore(a, breadscrum.firstChild);
        breadscrum.insertBefore(p, breadscrum.firstChild);

        contact.hasOwnProperty('superiorId') ? Tree.getBreadScrum(contact.superiorId) : 0;
    }
}
