import Tree from './tree-operations';

export default class Element {

    static addListener (element, eventName, handler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, handler);
        } else {
            element['on' + eventName] = handler;
        }
    }

    static cardClicked (CardId, element, dblClicked = false) {
        let that = element;
        setTimeout(function () {
            var dblclick = parseInt(that.getAttribute('data-dblClick'), 10);

            if (dblclick > 0) {
                that.setAttribute('data-dblClick', dblclick - 1);
            } else {
                (new Element()).singleClick(CardId);
            }
        }, 300);

        if (dblClicked) {
            element.setAttribute('data-dblClick', 3);
            (new Element()).doubleClick(CardId);
        }
    }

    singleClick (CardId) {
        console.log('Click card at ID: ' + CardId);
    }

    doubleClick (CardId) {
        let tree = new Tree();
        let li = document.createElement('li');
        let card = document.getElementById(CardId).outerHTML;
        let cardChild = document.getElementById(CardId + '__next').outerHTML;
        li.innerHTML += card;
        li.innerHTML += cardChild;
        tree.rerenderTree(li.outerHTML);
    }
}
