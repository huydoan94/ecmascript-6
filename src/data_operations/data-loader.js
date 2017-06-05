/* eslint-disable no-undef */

import FileReader from './../file_operations/file-reader';

export default class DataLoader {

    constructor () {
        if (localStorage.length === 0) {
            let contacts = (new FileReader()).readFile('data/contacts.json');
            DataLoader.saveToLocalStorage(contacts);
        }
    }

    static loadFromLocalStorage (rootId) {
        return JSON.parse(localStorage.getItem(rootId));
    }

    static loadManyFromLocalStorage (rootId = undefined, first = false) {
        let datas = [];
        if (rootId === undefined) {
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key) && !isNaN(key)) {
                    datas.push(JSON.parse(localStorage.getItem(key)));
                }
            }
        } else {
            let allDatas = DataLoader.loadManyFromLocalStorage();
            allDatas.forEach((contact) => {
                if (first && contact.id === rootId) { datas.push(contact); }
                if (contact.superiorId === rootId) {
                    datas.push(contact);
                    let subResults = DataLoader.loadManyFromLocalStorage(contact.id);
                    if (subResults.length !== 0) { datas = datas.concat(subResults); }
                }
            });
        }

        return DataLoader.sortData(datas);
    }

    static saveToLocalStorage (datas) {
        if (datas.constructor === Array) {
            datas.forEach((data) => {
                localStorage.setItem(data.id, JSON.stringify(data));
            });
        } else {
            localStorage.setItem(datas.id, JSON.stringify(datas));
        }
    }

    static deleteFromLocalStorage (datas) {
        if (datas.constructor === Array) {
            datas.forEach((data) => {
                localStorage.removeItem(data.id);
            });
        } else {
            localStorage.removeItem(datas.id);
        }
    }

    static sortData (datas) {
        datas.sort((a, b) => {
            if (!a.hasOwnProperty('superiorId') || a.id === b.superiorId) {
                return -1;
            } else {
                return 1;
            }
        });

        return datas;
    }
}
