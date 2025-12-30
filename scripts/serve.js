import express from "express";
import { Marked } from "marked";
import fs from "fs";
import hljs from "highlight.js";
import { markedHighlight } from "marked-highlight";

const app = express();

const basePath = process.env.BASE_URL ?? "/";

app.listen(process.env.PORT, () => {
  console.log(
    `serving on http://localhost:${process.env.PORT}${process.env.BASE_URL}`,
  );
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

const marked = new Marked(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);

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

const mimeTypeByExt = {
  css: "text/css",
  js: "text/JavaScript",
};

/**
 * @param {string} path
 * @returns string
 */
function getMimeType(path) {
  const [_, ext] = path.split(".");
  return mimeTypeByExt[ext] ?? "text/text";
}

app.get(`${basePath}static/:resource`, (req, res) => {
  const path = req.params.resource;
  res.type(getMimeType(path));
  res.send(fs.readFileSync(`static/${path}`));
});

app.get(`${basePath}:page`, (req, res) => {
  res.send(renderPage(`./pages/${req.params.page}.md`));
});
