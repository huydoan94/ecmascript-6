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
            let dblclick = parseInt(that.getAttribute('data-OffSC'), 10);

            if (dblclick > 0) {
                that.setAttribute('data-OffSC', (dblclick - 1).toString());
            } else {
                Element.toggleActionPanel(element, false);
            }
        }, 300);

        if (dblClicked) {
            element.setAttribute('data-OffSC', '3');
            Element.changeRootCard(CardId, element);
        }
    }

    static triggerExpandCollapse (CardId, element) {
        Element.toggleCollapseExpand(CardId, element);
    }

    static triggerEdit (CardId, element) {
        Element.toggleEditDetail(element, true);
    }

    static triggerAddPeer (CardId, element) {
        Tree.createEmptyCard(CardId, true);
    }

    static triggerAddChild (CardId, element) {
        Tree.createEmptyCard(CardId);
    }

    static triggerDelete (CardId, element) {
        Tree.deleteElement(CardId);
    }

    static dragCard (CardId, element, event) {
        Element.dragCard(CardId, event);
    }

    static dragoverCard (CardId, element, event) {
        event.preventDefault();
    }

    static dropCard (CardId, element, event) {
        event.preventDefault();
        Element.dropCard(CardId, event);
    }

    static uploadImg (CardId, element) {
        let file = document.getElementById(CardId + '-avatar-uploader').files[0];

        // eslint-disable-next-line no-undef
        let reader = new FileReader();
        reader.onloadend = function () {
            document.getElementById(CardId + '-avatar-img').setAttribute('src', reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
            console.log(file);
        }
    }

    static clickPath (Id, element) {
        Element.changeRootCard(Id, element);
    }
}
