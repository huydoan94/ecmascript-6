/* eslint-disable no-undef */

import FileReader from './../file_operations/file-reader';

export default class DataLoader {

    constructor () {
        if (localStorage.length === 0) {
            let contacts = (new FileReader()).readFile('data/contacts.json');
            DataLoader.saveToLocalStorage(contacts);
        }
    }

    static saveToLocalStorage (datas) {
        datas.forEach((data) => {
            localStorage.setItem(data.id, JSON.stringify(data));
        });
    }

    static loadFromLocalStorage (rootID = undefined, first = false) {
        let datas = [];
        if (rootID === undefined) {
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key) && !isNaN(key)) {
                    datas.push(JSON.parse(localStorage.getItem(key)));
                }
            }
        } else {
            let allDatas = DataLoader.loadFromLocalStorage();
            allDatas.forEach((contact) => {
                if (first && contact.id === rootID) { datas.push(contact); }
                if (contact.superiorId === rootID) {
                    datas.push(contact);
                    let subResults = DataLoader.loadFromLocalStorage(contact.id);
                    if (subResults.length !== 0) { datas = datas.concat(subResults); }
                }
            });
        }

        return DataLoader.sortData(datas);
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
