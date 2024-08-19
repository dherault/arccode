# Arccode

A role-playing game for developers.

## Motivation

Coding is inherently fun — it's an act of creation that yields visible results. However, it can also become repetitive and laborious. That's why I created Arccode: to bring joy to your day and shield you from monotony. By incorporating variable rewards and a sense of progress into coding, I believe we can make the experience even more enjoyable. So, have fun coding!

## Data collected

The VSCode extension collects keyword metadata when the content of a file of a supported language is changed. This metadata is used to calculate the player's progress and to generate the game's content.

Here is an example of such data:

```json
{
  "javascript": {
    "function": 4,
    "const": 12
  },
  "ruby": {
    "def": 3,
    "class": 1
  }
}
```

As you can see, the original code is not stored, only the keywords and their counts.

## App development

First install the dependencies:

For the monorepo (lint and commit hook):
```bash
npm i
```

For the web app:
```bash
cd arccode.dev && npm i && cd functions && npm i
```

Then you can start the development server for the web app:

```bash
cd arccode.dev
```

In one terminal run:
```bash
npm run emulators
```

In another run:

```bash
npm run dev
```

## Extension development

To develop on the extension open the `packages/arccode-vscode-extension` directory in a separate VSCode window (it's important).

Install the dependencies:
```bash
npm i
```

Watch for changes:
```bash
npm run watch
```

Then open `src/extension.ts` and press F5 to launch another VSCode window with the development mode extension loaded.

## Package development

Additionally, you can edit any package under `packages/` by running `npm i` and `npm test` to run the tests.

## Contributing

PRs, issues and feedback are welcome!

## License

[GPLv3](https://www.gnu.org/licenses/gpl-3.0.html)
