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
 * asynchronously check if the give file is directory
 * @param filePath
 * @returns {*|boolean}
 */
function isDir(filePath) { // in case we would like to implement reading file recursively from scratch
    try {
        const stats = fs.statSync(filePath);
        return stats.isDirectory();
    } catch (error) {
        console.error('cannot find file directory.');
        return false;
    }
}

/**
 * function that will get the top level directories
 * to be used when creating fileNames
 * @param {string} dir
 * @returns {Promise<*[]>}
 */
async function getTopLevelDirNames(dir) {
    try {
        // check if the content is accessible
        await fs.promises.access(dir, fs.constants.R_OK);
        // read the dir content
        const contents = await fs.promises.readdir(dir, {encoding: 'utf-8'});
        // return only first directories names
        const topLevelDir = [...contents.map(content => path.join(dir, content)).filter(filePath => isDir(filePath))];
        return topLevelDir.map(topDir => path.basename(topDir))
    } catch (err) {
        console.log(err);
        return []
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
