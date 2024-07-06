#!/usr/bin/env node

/**
 *
 * This is the main entry point of the whole CLI
 * @author [Parv Shah](https://github.com/parv141206)
 *
 */
import * as commander from "commander";
import path from "path";
import * as readline from "readline";
import * as fs from "fs";
import {
  writeNormal,
  writeWithNextAuth,
  writeWithNextAuthAndTheme,
  writeWithTheme,
} from "./functions/TSFunctions";

const program = new commander.Command();

program
  .version("1.0.0")
  .command("spawn")
  .description("Spawn a new NextJS app")
  .action(() => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let userConfig = {
      rootFolder: "",
      name: "my-app",
      includesNextAuth: false,
      includesTheme: false,
    };

    console.log("Welcome to NextJS CLI!");

    // Reading the name of the app
    rl.question("-> Please enter app name: ", (name) => {
      userConfig.name = name;
      let rootFolder = path.join(process.cwd(), userConfig.name);
      userConfig.rootFolder = rootFolder;

      // If the user enters './', use the current directory
      if (userConfig.name === "./") {
        userConfig.name = path.basename(process.cwd());
        rootFolder = process.cwd();
        userConfig.rootFolder = rootFolder;

        // Delete the contents of the current directory
        deleteDirectoryContents(rootFolder);
      }

      // Confirming if the user wants to include next-auth
      rl.question("-> Do you want to include next-auth? (y/n): ", (answer) => {
        if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
          userConfig.includesNextAuth = true;
        } else {
          userConfig.includesNextAuth = false;
        }

        rl.question(
          "-> Do you want to add a light and dark theme context? (y/n): ",
          (answer) => {
            if (
              answer.toLowerCase() === "y" ||
              answer.toLowerCase() === "yes"
            ) {
              userConfig.includesTheme = true;
            } else {
              userConfig.includesTheme = false;
            }

            rl.close();
          }
        );
      });

      rl.on("close", () => {
        // Create the directory and write the project files
        fs.mkdirSync(userConfig.rootFolder, { recursive: true });
        if (userConfig.includesNextAuth) {
          writeWithNextAuth(userConfig.rootFolder);
          if (userConfig.includesTheme) {
            writeWithNextAuthAndTheme(userConfig.rootFolder);
          }
        } else {
          writeNormal(userConfig.rootFolder);
          if (userConfig.includesTheme) {
            writeWithTheme(userConfig.rootFolder);
          }
        }
        console.log("Project created successfully!");
      });
    });
  });

program.parse(process.argv);

function deleteDirectoryContents(dirPath: string) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // Recursive call for directories
        deleteDirectoryContents(curPath);
      } else {
        // Delete files
        fs.unlinkSync(curPath);
      }
    });
  }
}
