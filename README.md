# Design Token CSS variable converter

> :warning: Be sure to read [the prompt](./PROMPT.md).

Converts Company Design System team's JSON files into CSS variables.

## Dependencies

- Node v18

## Getting Started

### Build CSS Files:

```sh
npm start
```

Output CSS files will be available in the `dist/` directory.

### Run Tests:

```sh
npm test
```

## How It Works

The JSON file conforms to a schema like:

```json
{
  "$ref": "#/definitions/DesignTokens",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "DesignTokens": {
      "additionalProperties": {
        "oneOf": [
          {
            "$ref": "#/definitions/DesignTokens"
          },
          {
            "$ref": "#/definitions/Leaf"
          }
        ]
      },
      "minProperties": 1,
      "type": "object"
    },
    "Leaf": {
      "properties": {
        "comment": {
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      },
      "required": ["value"],
      "type": "object"
    }
  }
}
```

It's a recursive object where the terminal nodes contain a `value` of type `string`. The converter will generate CSS variable names based off of the property path. For example:

```json
{
  "font": {
    "family": {
      "h1": {
        "value": "Helvetica"
      }
    },
    "maximumSize": {
      "value": "32px"
    },
    "weight": {
      "value": "900"
    }
  }
}
```

will generate the following CSS variables:

```css
:root {
  --font-family-h1: Helvetica;
  --font-maximumSize: 32px;
  --font-weight: 900;
}
```
