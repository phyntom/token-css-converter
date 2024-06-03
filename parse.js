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
    let globals = [];
    return parseVariablesFromObject(input,"-").join("\n");
};

/**
 * Parse a provided object into variables.
 * The value of a variable is any object attribute with a value of string
 * @param {object} input - Input object.  Input object must contain a key of "value" with a string or number value
 * @param {string} prefix - List of strings that will be appended to create the value key
 // * @param {string[]} results - List of existing key, value results
 * @param {number} depth - Current depth of traversal on the input object
 * @param {number} maxDepth - Maximum allowed depth of traversal on the input object
 * @returns {string[]}
 */
const parseVariablesFromObject = (input, prefix, depth = 0, maxDepth = 10) => {
    let cssVariable = [];
    const processObject = (object, currentPrefix,depth = 0, maxDepth = 10) =>{
        if (depth === maxDepth) {
            console.log("max depth",maxDepth)
            throw new Error(`Max depth (${maxDepth}) reached.`);
        }

        // Increment depth
        const newDepth = depth + 1;
        for(const key in object){
            if(typeof object[key] === "object"){
                if('value' in object[key]){
                    if(typeof object[key].value === "string")
                        cssVariable.push(`  ${currentPrefix}-${key}: ${object[key].value};`)
                    else
                        throw new Error("Object contains value attribute that is not a string or object");
                }
                else{
                    processObject(object[key],`${currentPrefix}-${key}`,newDepth,maxDepth)
                }
            }
            else{
                processObject(object[key],`${currentPrefix}-${key}`,newDepth,maxDepth)
            }
        }
        return cssVariable;
    }
    processObject(input,"-",0,10)
    return cssVariable
};
