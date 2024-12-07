import fs from 'node:fs';
import path from 'node:path';

const packageJson = {
    "type": "module",
    "types": "./app/index.d.ts",
    "exports": {
        ".": {
            "types": "./app/index.d.ts",
            "import": "./app/index.js"
        }
    },
    "sideEffects": false
};

fs.writeFileSync(
    path.join('dist', 'package.json'),
    JSON.stringify(packageJson, null, 2)
);