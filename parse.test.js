import {describe, it} from "node:test";
import assert from "node:assert";
import {parse} from "./parse.js";

describe("parse", () => {
    it("parses variables string from object", () => {
        const result = parse({
            "a": {
                "b": {
                    "c": {
                        "comment": "c-comment",
                        "value": "c-value",
                    },
                    "d": {
                        "e": {
                            "value": "e-value"
                        },
                        "fG": {
                            "value": "fG value"
                        }
                    }
                }
            }
        });
        assert.equal(result, ":root {\n  --a-b-c: c-value;\n  --a-b-d-e: e-value;\n  --a-b-d-fG: fG value;\n}\n");
    });

    it("throws an error if value is not a string or object", () => {
        try {
            parse({
                "a": {
                    "value": 7
                }
            });


            assert.fail("Error expected");
        } catch (e) {
            assert.equal(e.message, "Object contains value attribute that is not a string or object");
        }
    });

    it("throws an error if max depth is reached", () => {
        try {
            parse({key: "value"});


            assert.fail("Error expected");
        } catch (e) {
            assert.equal(e.message, "Max depth (10) reached.");
        }
    });
});

