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
import { writeNormal, writeWithNextAuth } from "./functions/TSFunctions";
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
    };
    console.log("Welcome to NextJS CLI!");

    // Reading the name of the app
    rl.question("-> Please enter app name: ", (name) => {
      userConfig.name = name;
      const rootFolder = path.join(process.cwd(), userConfig.name);
      userConfig.rootFolder = rootFolder;
      // Confirming if the user wants to include next-auth
      rl.question("-> Do you want to include next-auth? (y/n): ", (answer) => {
        if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
          userConfig.includesNextAuth = true;
        } else {
          userConfig.includesNextAuth = false;
        }
        rl.close();
      });
      rl.on("close", () => {
        // Create the directory and write the project files
        fs.mkdirSync(userConfig.rootFolder);
        if (userConfig.includesNextAuth) {
          writeWithNextAuth(userConfig.rootFolder);
        } else {
          writeNormal(userConfig.rootFolder);
        }
      });
    });
  });

program.parse(process.argv);
