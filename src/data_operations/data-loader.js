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

    static loadManyFromLocalStorage (rootId = undefined, first = false, initData = []) {
        if (initData.length === 0) {
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key) && !isNaN(key)) {
                    initData.push(JSON.parse(localStorage.getItem(key)));
                }
            }
        }

        let datas = [];
        initData.forEach((contact) => {
            if (first && (contact.id === rootId || (!contact.hasOwnProperty('superiorId') && rootId === undefined))) {
                datas.push(contact);
            }
        });

        initData.forEach((contact) => {
            if (contact.superiorId === rootId) {
                datas.push(contact);
                let subResults = DataLoader.loadManyFromLocalStorage(contact.id, false, initData);
                if (subResults.length !== 0) { datas = datas.concat(subResults); }
            }
        });

        return datas;
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

    static getNextId () {
        let nextId = -1;
        for (let key in localStorage) {
            nextId < key ? nextId = parseInt(key, 10) : 0;
        }

        return nextId + 1;
    }
}
