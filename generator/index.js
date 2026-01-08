#!/usr/bin/env node
import fs from "node:fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

function generator(name, type, path, { filename = null, ext = ".ts" } = {}) {
  const templatePath = `${process.cwd()}/generator/templates/${type}.template.txt`;
  const templateContent = fs.readFileSync(templatePath, "utf8");
  const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
  const camelName = name.charAt(0).toLowerCase() + name.slice(1);

  // Generate camelCase filename as per comment
  const baseFilename = filename || type;
  const camelFilename =
    baseFilename.charAt(0).toLowerCase() + baseFilename.slice(1);
  const fileName = camelFilename + ext;

  const replacedContent = templateContent
    .replace(/__NAME__/g, pascalName)
    .replace(/__name__/g, camelName);

  const generatedPath = `${process.cwd()}/${path}/${fileName}`;

  // Ensure directory exists
  const dir = `${process.cwd()}/${path}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(generatedPath, replacedContent);
  console.log(`Generated: ${generatedPath}`);
}

yargs(hideBin(process.argv))
  .command({
    command: "generator",
    describe: "Generate store and/or provider files from templates",
    builder: {
      name: {
        describe: "Name for the generated file(s)",
        type: "string",
        demandOption: true,
        alias: "n",
      },
      type: {
        describe: "Type of file to generate",
        type: "string",
        demandOption: true,
        alias: "t",
        choices: ["store", "provider", "store-provider"],
      },
    },
    handler(argv) {
      const name = argv.name;
      const kebabName = name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

      switch (argv.type) {
        case "store":
          generator(name, "store", `store/${kebabName}`);
          break;
        case "provider":
          generator(name, "provider", `store/${kebabName}`, {
            ext: ".tsx",
          });
          break;
        case "store-provider":
          generator(name, "store", `store/${kebabName}`);
          generator(name, "provider", `store/${kebabName}`, {
            ext: ".tsx",
          });
          break;
        default:
          console.log("Invalid type");
          process.exit(1);
      }
    },
  })
  .demandCommand(1, "You need to specify a command")
  .help()
  .parse();
