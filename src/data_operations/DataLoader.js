/* eslint-disable no-undef */

import FileReader from './../file_operations/file-reader';

export default class DataLoader {

    constructor () {
        if (localStorage.length === 0) {
            let contacts = (new FileReader()).readFile('data/contacts.json');
            contacts.forEach((contact) => {
                this.saveToLocalStorage(contact);
            });
        }
    }

    saveToLocalStorage (data) {
        localStorage.setItem(data.id, JSON.stringify(data));
    }

    loadFromLocalStorage () {
        let data = [];
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key) && !isNaN(key)) {
                data.push(JSON.parse(localStorage.getItem(key)));
            }
        }

        data.sort((a, b) => {
            if (!a.hasOwnProperty('superiorId') || a.id === b.superiorId) {
                return -1;
            } else {
                return 1;
            }
        });

        return data;
    }
}
