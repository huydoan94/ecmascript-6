import DataLoader from './../data_operations/data-loader';
import Tree from './tree-handler';

export default class Element {

    static cardSingleClick (CardId, element) {
        Element.toggleActionPanel(element, false);
    }

    static cardDoubleClick (CardId, element) {
        let contacts = DataLoader.loadFromLocalStorage(CardId, true);
        document.getElementById('tree').innerHTML = '';
        Tree.addManyElements(contacts);
    }

    static checkCurrentTarget (currentTarget, element) {
        let isClicked = parseInt(element.getAttribute('data-currentTarget'), 10);
        if (isClicked === 1 && !currentTarget) {
            Element.toggleActionPanel(element, true);
            Element.toggleEditDetail(element, false);
        }
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
        let detailPanel = element.getElementsByClassName('card__detail')[0];
        let detailPanelComponents = detailPanel.children;

        if (editable) {
            for (let i = 0; i < detailPanelComponents.length - 1; i++) {
                detailPanelComponents[i].setAttribute('contenteditable', 'true');
                detailPanelComponents[i].style.borderBottom = '2px dashed #091f5c';
            }

            let avatarHolder = element.getElementsByClassName('card__avatar')[0];
            avatarHolder.style.border = '2px dashed #091f5c';
        } else {
            let datas = [];
            for (let i = 0; i < detailPanelComponents.length - 1; i++) {
                datas.push(detailPanelComponents[i].innerHTML);
                detailPanelComponents[i].setAttribute('contenteditable', 'false');
                detailPanelComponents[i].style.borderBottom = 'none';
            }

            let avatarHolder = element.getElementsByClassName('card__avatar')[0];
            avatarHolder.style.border = 'none';

            Element.editDetail(element.getAttribute('id'), datas);
        }
    }

    static editDetail (id, datas) {
        let firstname = (datas[0].split(' '))[0].trim();
        let lastname = (datas[0].split(' '))[1].trim();
        let department = datas[1].trim();
        let employeeId = datas[2].trim();

        let update = false;
        // eslint-disable-next-line no-undef
        let originData = JSON.parse(localStorage.getItem(id));

        if (originData.firstName !== firstname) { originData.firstName = firstname; update = true; }
        if (originData.lastName !== lastname) { originData.lastName = lastname; update = true; }
        if (originData.department !== department) { originData.department = department; update = true; }
        if (originData.employeeId !== employeeId) { originData.employeeId = employeeId; update = true; }

        if (update) {
            // eslint-disable-next-line no-undef
            localStorage.setItem(id, JSON.stringify(originData));
        }
    }

    static toggleCollapseExpand (CardId, element) {
        let childElements = document.getElementById(CardId + '__tail');
        let icon = element;

        if (childElements.innerHTML.trim() === '') {
            return;
        }

        if (childElements.style.display === 'block') {
            childElements.style.display = 'none';
            icon.setAttribute('src', 'images/icon/plus-icon.png');
        } else {
            childElements.style.display = 'block';
            icon.setAttribute('src', 'images/icon/minus-icon.png');
        }
    }
}
