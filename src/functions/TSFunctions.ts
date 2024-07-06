import path from "path";
import fs from "fs";

export function writeWithNextAuth(rootFolder: string) {
  const srcAppFolder = path.join(
    __dirname,
    "../src/templates/ts/with-next-auth"
  );
  const destAppFolder = path.join(rootFolder);

  fs.mkdirSync(destAppFolder, { recursive: true });

  copyFolderRecursive(srcAppFolder, destAppFolder);
}
export function writeNormal(rootFolder: string) {
  const srcAppFolder = path.join(__dirname, "../src/templates/ts/normal");
  const destAppFolder = path.join(rootFolder);

  fs.mkdirSync(destAppFolder, { recursive: true });

  copyFolderRecursive(srcAppFolder, destAppFolder);
}

function copyFolderRecursive(src: string, dest: string) {
  fs.readdirSync(src).forEach((file) => {
    const srcFilePath = path.join(src, file);
    const destFilePath = path.join(dest, file);

    if (fs.lstatSync(srcFilePath).isDirectory()) {
      fs.mkdirSync(destFilePath, { recursive: true });
      copyFolderRecursive(srcFilePath, destFilePath);
    } else {
      fs.copyFileSync(srcFilePath, destFilePath);
    }
  });
}
