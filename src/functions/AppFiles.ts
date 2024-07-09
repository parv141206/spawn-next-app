import path from "path";
import fs from "fs";
export function writeLayoutFile(rootFolder: string) {
  const templatePath = path.join(__dirname, "../src/templates/ts/layout.tsx");
  const layoutFile = path.join(rootFolder, "app", "layout.tsx");

  fs.mkdirSync(path.dirname(layoutFile), { recursive: true });

  fs.copyFileSync(templatePath, layoutFile);
}
export function writePageFile(rootFolder: string) {
  const templatePath = path.join(__dirname, "../src/templates/ts/page.tsx");
  const pageFile = path.join(rootFolder, "app", "page.tsx");
  fs.mkdirSync(path.dirname(pageFile), { recursive: true });

  fs.copyFileSync(templatePath, pageFile);
}

