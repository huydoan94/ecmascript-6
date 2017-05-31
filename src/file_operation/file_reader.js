export default class FileReader {
  readFile (filePath) {
    console.log(filePath)

    let contents = ''
    // eslint-disable-next-line
    let rawFile = new XMLHttpRequest()

    // eslint-disable-next-line
    rawFile.open('GET', filePath, false)
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          contents = rawFile.responseText
        }
      }
    }
    rawFile.send(null)
    return contents
  }
}
