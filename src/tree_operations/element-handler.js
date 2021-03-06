import DataLoader from './../data_operations/data-loader';
import Tree from './tree-handler';

export default class Element {

    static changeRootCard (CardId, element) {
        let contacts = DataLoader.loadManyFromLocalStorage(CardId, true);
        document.getElementById('tree').innerHTML = '';
        Tree.addManyElements(contacts);

        document.getElementById('breadscrum').innerHTML = '';
        Tree.getBreadScrum(CardId, true);
    }

    static checkCurrentTarget (currentTarget, element) {
        let isClicked = parseInt(element.getAttribute('data-currentTarget'), 10);
        if (isClicked === 1 && !currentTarget) {
            Element.toggleActionPanel(element, true);
            Element.toggleEditDetail(element, false);
        }
    }

    static transferCurrentTarget (CardId, event) {
        event.dataTransfer.setData('CardMoving', CardId);
    }

    static changeSuperiorId (destCardId, event) {
        let movingElementId = parseInt(event.dataTransfer.getData('CardMoving'), 10);
        if (movingElementId === destCardId) {
            return;
        }

        let movingElementCard = document.getElementById(movingElementId + '__head');
        let movingElementCardChildren = Array.prototype.slice.call(movingElementCard.getElementsByTagName('li'));
        let subordinanceCards = movingElementCardChildren.filter((child) => {
            let childId = parseInt((child.id).substring(0, (child.id).indexOf('__head')), 10);
            return destCardId === childId;
        });
        if (subordinanceCards.length > 0) {
            return;
        }

        (movingElementCard.parentElement).removeChild(movingElementCard);

        let childElements = DataLoader.loadFromLocalStorage(movingElementId);
        childElements.superiorId = destCardId;
        DataLoader.saveToLocalStorage(childElements);

        let itsChildElements = DataLoader.loadManyFromLocalStorage(movingElementId, true);
        Tree.addManyElements(itsChildElements);
    }

    static toggleActionPanel (element, hide) {
        if (hide) {
            element.style.backgroundColor = '';
            element.style.color = '#666';
            element.style.border = '1px solid #ccc';

            element.setAttribute('data-currentTarget', '0');

            let actionPanel = element.getElementsByClassName('card__action')[0];
            actionPanel.style.visibility = 'hidden';
        } else {
            element.style.backgroundColor = '#c8e4f8';
            element.style.color = '#000';
            element.style.border = '1px solid #94a0b4';

            element.setAttribute('data-currentTarget', '1');

            let actionPanel = element.getElementsByClassName('card__action')[0];
            actionPanel.style.visibility = 'visible';
        }
    }

    static toggleEditDetail (element, editable) {
        let cardId = parseInt(element.getAttribute('id'), 10);
        let detailPanel = element.getElementsByClassName('card__detail')[0];
        let detailPanelComponents = detailPanel.children;

        if (editable) {
            for (let i = 0; i < detailPanelComponents.length - 1; i++) {
                detailPanelComponents[i].setAttribute('contenteditable', 'true');
                detailPanelComponents[i].style.borderBottom = '2px dashed #091f5c';
            }

            let avatarHolder = element.getElementsByClassName('card__avatar')[0];
            avatarHolder.style.border = '2px dashed #091f5c';

            let avatarUploader = document.getElementById(cardId + '-avatar-uploader');
            avatarUploader.removeAttribute('disabled');
        } else {
            let datas = [];
            for (let i = 0; i < detailPanelComponents.length - 1; i++) {
                datas.push(detailPanelComponents[i].innerHTML);
                detailPanelComponents[i].setAttribute('contenteditable', 'false');
                detailPanelComponents[i].style.borderBottom = 'none';
            }
            datas.push(element.getElementsByTagName('img')[0].getAttribute('src'));

            let avatarHolder = element.getElementsByClassName('card__avatar')[0];
            avatarHolder.style.border = 'none';

            let avatarUploader = document.getElementById(cardId + '-avatar-uploader');
            avatarUploader.setAttribute('disabled', 'true');

            Element.editDetail(cardId, datas);
        }
    }

    static editDetail (CardId, datas) {
        let firstname = (datas[0].split(' '))[0].trim();
        let lastname = (datas[0].split(' '))[1].trim();
        let department = datas[1].trim();
        let employeeId = datas[2].trim();
        let avatar = datas[3];

        let update = false;
        let originData = DataLoader.loadFromLocalStorage(CardId);

        if (originData.firstName !== firstname) {
            originData.firstName = firstname;
            update = true;
        }
        if (originData.lastName !== lastname) {
            originData.lastName = lastname;
            update = true;
        }
        if (originData.department !== department) {
            originData.department = department;
            update = true;
        }
        if (originData.employeeId !== employeeId) {
            originData.employeeId = employeeId;
            update = true;
        }

        let headerIndex = avatar.search('images/');
        if (headerIndex !== -1) {
            avatar = avatar.substring(('images/').length);
        }
        if (originData.avatar !== avatar) {
            originData.avatar = avatar;
            update = true;
        }

        if (update) {
            DataLoader.saveToLocalStorage(originData);
        }
    }

    static toggleCollapseExpand (CardId, element) {
        let childElementss = document.getElementById(CardId + '__tail');
        let icon = element;

        if (childElementss.innerHTML.trim() === '') {
            return;
        }

        if (childElementss.style.display === 'block') {
            childElementss.style.display = 'none';
            icon.setAttribute('src', 'images/icon/plus-icon.png');
        } else {
            childElementss.style.display = 'block';
            icon.setAttribute('src', 'images/icon/minus-icon.png');
        }
    }
}
