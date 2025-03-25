// You have to write a Node.js program to clear clutter inside of a directory and organise the content of the directory of a folder -> make folder of all extension

const fs = require("fs");
const path = require("path");

let source =
  "c:\\My Folders\\Coding\\Relearning Web Dev course\\JavaScript revisited\\node\\Backend\\E1 ClutterRemover";

fs.readdirSync(source).forEach((file) => {
  if (fs.statSync(path.join(source, file)).isFile()) {
    let ext = path.extname(file);
    ext = ext.split(".")[ext.split(".").length - 1];
    if (ext && ext != "js" && ext != "json") {
      const folderPath = path.join(source, ext);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      fs.renameSync(path.join(source, file), path.join(folderPath, file));
      console.log(`Moved: ${file} -> ${folderPath}/`);
    }
  }
});
