var fs = require('fs')

function readFile () {
  let content

  fs.readFile('file', 'utf8', function (err, data) {
    if (err) throw err
    content = data
  })

  return content
}
