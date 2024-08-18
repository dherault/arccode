# Arccode

A role-playing game for developers.

## Development

First install the dependencies:

For the monorepo (lint and commit hook):
```bash
npm i
```

For the web app:
```bash
cd arccode.dev && npm i && cd functions && npm i
```

For the extension:
```bash
cd packages/arccode-vscode-extension && npm i
```

Then you can start the development server for the web app:

```bash
cd arccode.dev && npm run dev
```

To develop on the extension open the `packages/arccode-vscode-extension` directory in a separate VSCode window (it's important).
Open a terminal and run `npm run watch` to compile the extension in watch mode.
Then open `src/extension.ts` and press F5 to launch another VSCode window with the development mode extension loaded.

Additionally, you can edit any package under `packages/` by running `npm i` and `npm test` to run the tests.

## Contributing

PRs, issues and feedback are welcome!

## License

[GPLv3](https://www.gnu.org/licenses/gpl-3.0.html)
