/**
 * Parse CSS variables string from a deep object
 * @param {object} input
 * @returns {string}
 */
export const parse = (input) => {
    return `:root {\n${parseVariables(input)}\n}\n`;
};

/**
 * Parse CSS variables string from a deep object
 * @param {object} input
 * @returns {string}
 **/
export const parseVariables = (input) => {
    const globals = [];
    parseVariablesFromObject(input, ["-"], globals);
    return globals.join("\n");
};

/**
 * Parse a provided object into variables.
 * The value of a variable is any object attribute with a value of string
 * @param {object} input - Input object.  Input object must contain a key of "value" with a string or number value
 * @param {string[]} prefix - List of strings that will be appended to create the value key
 * @param {string[]} results - List of existing key, value results
 * @param {number} depth - Current depth of traversal on the input object
 * @param {number} maxDepth - Maximum allowed depth of traversal on the input object
 * @returns {string[]}
 */
const parseVariablesFromObject = (input, prefix, results, depth = 0, maxDepth = 10) => {
    // Check that depth has not exceeded specified maximum depth
    if (depth === maxDepth) {
        throw new Error(`Max depth (${maxDepth}) reached.`);
    }

    // Increment depth
    const newDepth = depth + 1;

    // Recursively traverse the input object
    Object.entries(input).forEach(([key, value]) => {
        if (value.value) {
            switch (typeof value.value) {
                case "string":
                    // Valid values are strings.  In this case, add a new found result
                    results.push(`  ${[...prefix, key].join("-")}: ${value.value};`);
                    break;
                case "object":
                    // In case "value" is used as part of the CSS variable key, traverse into objects keyed as "value"
                    parseVariablesFromObject(value, [...prefix, key], results, newDepth, maxDepth);
                    break;
                default:
                    // Throw if the input object contains value data that is not valid CSS
                    throw new Error("Object contains value attribute that is not a string or object");
            }
        } else {
            // If no value key found, append the current object key to the prefix and descend to the next level
            parseVariablesFromObject(value, [...prefix, key], results, newDepth, maxDepth);
        }
    });

    return results;
};
