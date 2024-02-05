const fs = require("fs");
const csvtojson = require("csvtojson");

const csvFilePath = "./csvdirectory/nodejs-hw1-ex1.csv";
const txtFilePath = "./csvdirectory/output.txt";

const stream = fs.createReadStream(csvFilePath, { encoding: "utf8" });
const writeStream = fs.createWriteStream(txtFilePath);

csvtojson({
  noheader: true,
  output: "line",
})
  .fromStream(stream)
  .subscribe(
    (csvLine, lineNumber) => {
      if (lineNumber === 0) {
        return;
      }
      const [book, author, _, price] = csvLine.split(",");
      const txtLine = `{"book":"${book}","author":"${author}","price":${price}}\n`;
      writeStream.write(txtLine);
    },
    (error) => {
      console.error("Error converting CSV to JSON:", error.message);
    },
    () => {
      writeStream.end();
      console.log("Conversion completed successfully.");
    }
  );

stream.on("error", (error) => {
  console.error("Error reading CSV file:", error.message);
});

writeStream.on("error", (error) => {
  console.error("Error writing to TXT file:", error.message);
});
