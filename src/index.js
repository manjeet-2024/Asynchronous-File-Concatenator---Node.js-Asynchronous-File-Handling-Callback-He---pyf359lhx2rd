const fs = require("fs").promises;

async function cat(filePaths, outputFilePath) {
  const results = [];

  for (const filePath of filePaths) {
    try {
      const stats = await fs.lstat(filePath);

      if (stats.isFile()) {
        const content = await fs.readFile(filePath, "utf8");
        results.push(content);
      } else if (stats.isDirectory()) {
        results.push("Is a directory");
      } else {
        results.push("File not found");
      }
    } catch (err) {
      results.push("File not found");
    }
  }

  await fs.writeFile(outputFilePath, results.join("\n"), "utf8");
}

module.exports = { cat };
