/* eslint-disable no-undef */

import Tree from './tree_operations/tree-handler';
import DataLoader from './data_operations/data-loader';

let contacts = DataLoader.loadFromLocalStorage();

Tree.addManyElements(contacts);
