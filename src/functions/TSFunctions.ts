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

export function writeWithTheme(rootFolder: string) {
  // Write the files from the "with-next-auth" template
  writeWithNextAuth(rootFolder);

  // Replace the "layout.tsx" file with the one from the "with-theme" template
  const srcLayoutPath = path.join(
    __dirname,
    "../src/templates/ts/with-theme",
    "without-auth.tsx"
  );
  const destLayoutPath = path.join(rootFolder, "app", "layout.tsx");

  fs.copyFileSync(srcLayoutPath, destLayoutPath);

  // Create the "_contexts" folder and copy the "Theme.tsx" file
  const contextsFolderPath = path.join(rootFolder, "app", "_contexts");
  fs.mkdirSync(contextsFolderPath, { recursive: true });

  const srcThemePath = path.join(
    __dirname,
    "../src/templates/ts/with-theme",
    "Theme.tsx"
  );
  const destThemePath = path.join(contextsFolderPath, "Theme.tsx");

  fs.copyFileSync(srcThemePath, destThemePath);

  // Delete the "api" folder (and everything inside)
  const apiFolderPath = path.join(rootFolder, "app", "api");
  deleteFolderRecursive(apiFolderPath);
}

export function writeWithNextAuthAndTheme(rootFolder: string) {
  // Write the files from the "with-next-auth" template
  writeWithNextAuth(rootFolder);

  // Replace the "layout.tsx" file with the one from the "with-theme" template
  const srcLayoutPath = path.join(
    __dirname,
    "../src/templates/ts/with-theme",
    "layout.tsx"
  );
  const destLayoutPath = path.join(rootFolder, "app", "layout.tsx");

  fs.copyFileSync(srcLayoutPath, destLayoutPath);

  // Create the "_contexts" folder and copy the "Theme.tsx" file
  const contextsFolderPath = path.join(rootFolder, "app", "_contexts");
  fs.mkdirSync(contextsFolderPath, { recursive: true });

  const srcThemePath = path.join(
    __dirname,
    "../src/templates/ts/with-theme",
    "Theme.tsx"
  );
  const destThemePath = path.join(contextsFolderPath, "Theme.tsx");

  fs.copyFileSync(srcThemePath, destThemePath);
}
export function writeWithMongo(rootFolder: string) {
  const srcAppFolder = path.join(__dirname, "../src/templates/ts/mongodb/normal");
  const destAppFolder = path.join(rootFolder); // No "mongo" folder

  fs.mkdirSync(destAppFolder, { recursive: true });

  copyFolderRecursive(srcAppFolder, destAppFolder);
}

export function writeWithMongoAndTheme(rootFolder: string) {
  const srcAppFolder = path.join(__dirname, "../src/templates/ts/mongodb/with-theme");
  const destAppFolder = path.join(rootFolder); // No "mongo-and-theme" folder

  fs.mkdirSync(destAppFolder, { recursive: true });

  copyFolderRecursive(srcAppFolder, destAppFolder);
}

export function writeWithMongoAndThemeAndAuth(rootFolder: string) {
  const srcAppFolder = path.join(__dirname, "../src/templates/ts/mongodb/with-auth-with-theme");
  const destAppFolder = path.join(rootFolder); // No "mongo-and-theme-and-auth" folder

  fs.mkdirSync(destAppFolder, { recursive: true });

  copyFolderRecursive(srcAppFolder, destAppFolder);
}

export function writeWithMongoAndAuth(rootFolder: string) {
  const srcAppFolder = path.join(__dirname, "../src/templates/ts/mongodb/with-auth");
  const destAppFolder = path.join(rootFolder); // No "mongo-and-auth" folder

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

export function deleteFolderRecursive(folderPath: string) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // Recursive call for directories
        deleteFolderRecursive(curPath);
      } else {
        // Delete files
        fs.unlinkSync(curPath);
      }
    });
    // Delete the folder
    fs.rmdirSync(folderPath);
  }
}
