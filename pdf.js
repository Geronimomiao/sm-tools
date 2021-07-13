const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

const dir = process.argv[2];
const title = process.argv[3];
const pdfDir = [];

// 获取指定文件夹下 .pdf 结尾的文件
function travel(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    var pathname = path.join(dir, file);
    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback);
    } else {
      callback(pathname);
    }
  });
}

travel(dir, (pathname) => {
  const ext = path.extname(pathname);
  if (ext === ".pdf") {
    pdfDir.push(pathname);
  }
});

async function run() {
  const doc = await PDFDocument.create();
  for (const dir of pdfDir) {
    const content = await PDFDocument.load(fs.readFileSync(dir));
    const contentPages = await doc.copyPages(content, content.getPageIndices());
    for (const page of contentPages) {
      doc.addPage(page);
    }
  }

  fs.writeFileSync(`./${title}.pdf`, await doc.save());
}

run().catch((err) => console.log(err));
