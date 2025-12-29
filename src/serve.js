import express from "express";
import { marked } from "marked";
import fs from "fs";

const app = express();

const basePath = process.env.BASE_URL ?? "/";

app.listen(process.env.PORT, () => {
  console.log(`serving`);
});

const renderPage = (filePath) => {
  const contents = fs.readFileSync(filePath).toString();
  const mainHtml = marked.parse(contents);
  const layoutHtmlTemplate = fs
    .readFileSync("./templates/layout.html")
    .toString();
  return layoutHtmlTemplate
    .replace("${main}", mainHtml)
    .replace("${basePath}", basePath);
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
