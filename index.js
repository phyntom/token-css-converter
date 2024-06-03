import * as url from "node:url";
import fs from "node:fs";
import path from "node:path";
import {parse} from "./parse.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const inputFilePath = "inputs/before/input.json";
const outDirectory = "dist";
const outFile = "tokens.css";

/**
 * Synchronously checks for the existence of a directory path relative to current directory
 * Creates the directory if it does not exist
 * @param {string} outDirectory
 * @returns {void}
 */
export function maybeCreateOutDirectory(outDirectory) {
    try {
        fs.accessSync(path.join(__dirname, outDirectory), fs.constants.F_OK);
    } catch (e) {
        if (e.code === "ENOENT") {
            fs.mkdirSync(path.join(__dirname, outDirectory));
        }
    }
}

/**
 * asynchronously check if the given filePath is a file
 * @param {string} fileName
 * @returns {Promise<*|boolean>}
 */
async function isFile(fileName) {
    try {
        const stats = await fs.promises.stat(fileName);
        return stats.isFile();
    } catch (error) {
        console.error('cannot find file directory.');
        return false;
    }
}

/**
 * Writes a CSS variables file to output path
 * @param {string} inputPath - Path (beneath library directory) from which the file will be read
 * @param {string} outputPath - Path (beneath library directory) to which the file will be written
 * @returns {void}
 */
export function generateCssVariables(inputPath, outputPath) {
    const readPath = path.join(__dirname, inputPath)
    const writePath = path.join(__dirname, outputPath)

    const inputString = fs.readFileSync(readPath, "utf-8");
    const inputJson = JSON.parse(inputString);
    const outputString = parse(inputJson);

    fs.writeFileSync(writePath, outputString);
}

maybeCreateOutDirectory(outDirectory);
generateCssVariables(inputFilePath, path.join(outDirectory, outFile))
