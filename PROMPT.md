# Context

You are a member of a customer-facing Ecommerce team (ECOMM) that consumes a [design system](https://www.invisionapp.com/inside-design/guide-to-design-systems/) maintained by the Company Design System (CDS) team. Previously, a member of the ECOMM team wrote a small script to convert the tokens provided by the CDS team into [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

As the design system has evolved, the CDS team is hoping to leverage the library written by the ECOMM team to generate CSS variables for other brand properties across the Company.

Your task is to extend the script in this repo to emit one CSS file per input group. The expectation is that the CDS team will provide the following nested directory structureThe expectation is that the CDS team will provide the following nested directory structure (this is included in `/inputs/after/`):

```sh
inputs/after/
├── brand-a/
│   ├── fonts/
│   │   ├── font-family.json
│   │   └── font-size.json
│   ├── spacing/
│   │   ├── grid.json
│   │   └── box.json
│   └── color-palette.json
│
├── brand-b/
│   ├── fonts/
│   │   └── font-weight.json
│   ├── spacing/
│   │   ├── text/
│   │   │   └── line-height.json
│   │   ├── grid.json
│   │   └── box.json
│   └── colors/
│       └── palette.json
└── brand-c/
```

All `.json` files will follow the format that the repository currently handles with its single-file input.

The story might be written as follows:

---

## Story

### User Stories

As the owner of the token-CSS-converter, I would like to update the library to emit CSS variables for multiple brands.

### Acceptance Criteria

The token-CSS-converter library now supports generating multiple CSS variable files for different brands.

Given a nested directory structure with `.json` files, create one `.css` file per top-level branch folder.

- Folders for `input/brand-a/`, `input/brand-b/`, and `input/brand-c/` should generate `dist/brand-a.css`, `dist/brand-b.css` and `dist/brand-c.css` files, regardless of how many nested directories there are.
- Reuse as much of the existing code as possible.
- Ensure tests continue to pass.

---

## What We Provide

- [README](./README.md) to run the project with some explanation for how it works.
- Sample initial input at `/inputs/before` and sample target input at `/inputs/after`.
- `parse` function that reads a single `.json` file and writes CSS variables.
- `generateCssVariables` function that writes a `.css` file to disk.
- Initial unit tests.

## Expectations

- You should not need to modify the `package.json` scripts.
- :star: If you add dependencies, explain why they were needed to solve the problem.
- Please provide your git history.
  - You won't be graded on your commit messages.
  - You won't be graded on number of commits.
  - This will help Epic employees see what changes you made.
