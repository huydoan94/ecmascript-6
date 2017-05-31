import FileReader from './file_operations/file-reader';
import Tree from './tree_operations/tree-operations';

let contacts = (new FileReader()).readFile('data/contacts.json');

let tree = new Tree();
tree.addAllElements(contacts);
