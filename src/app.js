
import FileReader from './file_operation/file_reader'

let content = new FileReader()

let contactsJSON = JSON.parse(content.readFile('data/contacts.json'))
document.getElementById('content').innerHTML = contactsJSON[0].firstName + ' ' + contactsJSON[0].employeeId
