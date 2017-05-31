export default class FileReader {

    readFile (filePath) {
        let contents = '';

        // eslint-disable-next-line no-undef
        let rawFile = new XMLHttpRequest();

        rawFile.open('GET', filePath, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {
                    contents = rawFile.responseText;
                }
            }
        };
        rawFile.send(null);

        return JSON.parse(contents);
    }
}
