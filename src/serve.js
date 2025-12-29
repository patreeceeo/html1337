import express from "express";
import { marked } from "marked";
import fs from "fs";

const app = express();

const basePath = process.env.BASE_URL ?? "/";

app.listen(process.env.PORT, () => {
  console.log(`serving`);
});

/**
 * @param {string} template
 * @param {Record<string, string>}
 * @returns string
 */
const renderTemplate = (template, data) => {
  let result = template;
  for (const [key, value] of Object.entries(data)) {
    result = result.replace(RegExp(`\\$\\{${key}\\}`, "g"), value);
  }
  return result;
};

const renderPage = (filePath) => {
  const contents = fs.readFileSync(filePath).toString();
  const main = marked.parse(contents);
  const layoutHtmlTemplate = fs
    .readFileSync("./templates/layout.html")
    .toString();
  return renderTemplate(layoutHtmlTemplate, { main, basePath });
};

app.get(`${basePath}`, (_, res) => {
  res.send(renderPage("./pages/intro.md"));
});

app.get(`${basePath}more`, (_, res) => {
  res.send(renderPage("./pages/more.md"));
});

app.get(`${basePath}static/:resource`, (req, res) => {
  res.type("text/css");
  res.send(fs.readFileSync(`static/${req.params.resource}`));
});
