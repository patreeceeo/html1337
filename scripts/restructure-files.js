import fs from "fs";
import path from "path";

function showUsage() {
  console.log("Usage: restructure-files.js <pattern> <replacement>");
  console.log("");
  console.log("Restructures files in the current working directory.");
  console.log("");
  console.log("Arguments:");
  console.log(
    "  pattern      Regex pattern to match filenames (use capture groups)",
  );
  console.log(
    "  replacement  Replacement pattern using $1, $2, etc. for captures",
  );
  console.log("");
  console.log("Example:");
  console.log('  restructure-files.js "^(.+)\\.html$" "$1/index.html"');
  console.log('  This converts "more.html" to "more/index.html"');
  process.exit(1);
}

function restructureFiles(pattern, replacement) {
  const regex = new RegExp(pattern);
  const directory = process.cwd();
  const files = fs.readdirSync(directory);
  let processed = 0;

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    // Only process files (not directories)
    if (!stat.isFile()) {
      return;
    }

    const match = file.match(regex);
    if (match) {
      // Build the new path by replacing $1, $2, etc. with capture groups
      let newRelativePath = replacement;
      match.forEach((capture, index) => {
        newRelativePath = newRelativePath.replace(
          new RegExp(`\\$${index}`, "g"),
          capture,
        );
      });

      const newPath = path.join(directory, newRelativePath);
      const newDir = path.dirname(newPath);

      // Only proceed if the new path is different
      if (filePath !== newPath) {
        // Create directory structure if needed
        fs.mkdirSync(newDir, { recursive: true });

        // Move the file
        fs.renameSync(filePath, newPath);

        console.log(`  ${file} -> ${newRelativePath}`);
        processed++;
      }
    }
  });

  console.log(`\nRestructured ${processed} file(s)`);
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error("Error: Wrong number of arguments\n");
  showUsage();
}

const [pattern, replacement] = args;

// Validate pattern is a valid regex
try {
  new RegExp(pattern);
} catch (e) {
  console.error(`Error: Invalid regex pattern: ${pattern}`);
  console.error(e.message);
  process.exit(1);
}

console.log(`Pattern: ${pattern}`);
console.log(`Replacement: ${replacement}\n`);

restructureFiles(pattern, replacement);
