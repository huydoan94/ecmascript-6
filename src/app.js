/* eslint-disable no-undef */

import Tree from './tree_operations/tree-handler';
import DataLoader from './data_operations/data-loader';

// eslint-disable-next-line no-new
new DataLoader();
let contacts = DataLoader.loadManyFromLocalStorage();

Tree.addManyElements(contacts);
Tree.getBreadScrum(contacts[0].id, true);
