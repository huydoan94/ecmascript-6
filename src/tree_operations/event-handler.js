import Element from './element-handler';
import Tree from './tree-handler';

export default class EventHandler {

    static addListener (element, eventName, handler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, handler);
        } else {
            element['on' + eventName] = handler;
        }

        document.addEventListener('click', (event) => {
            let currentTarget = element.contains(event.target);
            Element.checkCurrentTarget(currentTarget, element);
        });
    }

    static clickCard (CardId, element, dblClicked = false) {
        let that = element;
        setTimeout(function () {
            var dblclick = parseInt(that.getAttribute('data-OffSC'), 10);

            if (dblclick > 0) {
                that.setAttribute('data-OffSC', (dblclick - 1).toString());
            } else {
                Element.cardSingleClick(CardId, element);
            }
        }, 300);

        if (dblClicked) {
            element.setAttribute('data-OffSC', '3');
            Element.cardDoubleClick(CardId, element);
        }
    }

    static triggerExpandCollapse (CardId, element) {
        Element.toggleCollapseExpand(CardId, element);
    }

    static triggerEdit (CardID, element) {
        Element.toggleEditDetail(element, true);
    }

    static triggerAddPeer (CardID, element) {
        Tree.createEmptyCard(CardID);
    }

    static triggerAddChild (CardID, element) {
        console.log('Clicked add child in card: ' + CardID);
    }

    static triggerDelete (CardID, element) {
        Tree.deleteElement(CardID)
        document.getElementById(CardID + '__head');
    }
}
