import fs from 'node:fs';
import path from 'node:path';

const packageJson = {
    "type": "module",
    "main": "./app/index.js",
    "module": "./app/index.js",
    "types": "./app/index.d.ts",
    "exports": {
        ".": {
            "types": "./app/index.d.ts",
            "import": "./app/index.js",
            "default": "./app/index.js"
        }
    }
};

fs.writeFileSync(
    path.join('dist', 'package.json'),
    JSON.stringify(packageJson, null, 2)
);