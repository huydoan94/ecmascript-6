/* eslint-disable no-undef */

import Tree from './tree_operations/tree-operations';
import DataLoader from './data_operations/DataLoader';

let contacts = (new DataLoader()).loadFromLocalStorage();

let tree = new Tree();
tree.addManyElements(contacts);
