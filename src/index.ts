#!/usr/bin/env node

import { Command } from "commander";
import { createSVGSpriteWithConfig } from "./util";

const program = new Command()
  .name("svg2sprite")
  .description(
    "This library collects .svg icons from the folder you specify into a single sprite.svg file, so you can use your .svg icons in the project with use-symbol"
  )
  .version("1.0.0")
  .option(
    "-c, --config-dir <value>",
    "Specify a directory for the config file (svg2sprite.config.{.js,.ts})",
    process.cwd()
  );

program.parse();

createSVGSpriteWithConfig(program.opts().configDir);