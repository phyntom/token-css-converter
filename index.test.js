import assert from "node:assert";
import fs from "node:fs";
import {afterEach, describe, it, mock} from "node:test";
import {generateCssVariables, maybeCreateOutDirectory} from "./index.js";

describe("maybeCreateOutDirectory", () => {
    afterEach(() => {
        mock.restoreAll();
    });
    it("Does nothing if directory already exists", () => {
        mock.method(fs, "accessSync", () => {
            return;
        });
        mock.method(
            fs, "mkdirSync", () => {
                throw new Error("Should not have been called");
            }
        );

        maybeCreateOutDirectory("test-dir");
        assert.strictEqual(fs.mkdirSync.mock.calls.length, 0);
        assert.match(fs.accessSync.mock.calls[0].arguments[0], /test-dir/);
        assert.strictEqual(fs.accessSync.mock.calls.length, 1);
    });

    it("Creates directory if it does not already exist", () => {
        const error = new Error();
        error.code = "ENOENT";

        mock.method(fs, "accessSync", () => {
            throw error;
        });
        mock.method(
            fs, "mkdirSync", () => {
                return;
            }
        );

        maybeCreateOutDirectory("test-dir");
        assert.strictEqual(fs.accessSync.mock.calls.length, 1);
        assert.match(fs.accessSync.mock.calls[0].arguments[0], /test-dir/);
        assert.strictEqual(fs.mkdirSync.mock.calls.length, 1);
        assert.match(fs.mkdirSync.mock.calls[0].arguments[0], /test-dir/);
    });
});

describe("generateCssVariables", () => {
    afterEach(() => {
        mock.restoreAll();
    });

    it("Parses input and writes file", () => {
        mock.method(fs, "readFileSync", () => {
            return "{\"key\": { \"value\": \"blah\" } }";
        });
        mock.method(fs, "writeFileSync", () => {
            return;
        });

        generateCssVariables("input-file-path", "output-file-path");

        assert.strictEqual(fs.readFileSync.mock.calls.length, 1);
        assert.match(fs.readFileSync.mock.calls[0].arguments[0], /input-file-path/);
        assert.strictEqual(fs.writeFileSync.mock.calls.length, 1);
        assert.match(fs.writeFileSync.mock.calls[0].arguments[0], /output-file-path/);
        assert.match(fs.writeFileSync.mock.calls[0].arguments[1], /key: blah/);
    });
});
