import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    input: 'src/app/index.ts',
    output: [
        {
            dir: 'dist',
            format: 'es',
            sourcemap: true,
            preserveModules: true,
            preserveModulesRoot: 'src'
        }
    ],
    external: [
        'node:fs',
        'node:path',
        'axios',
        'mime-types'
    ],
    plugins: [
        alias({
            entries: [
                { find: '@', replacement: path.resolve(__dirname, 'src') }
            ]
        }),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            sourceMap: true,
            outDir: './dist',
            exclude: ['**/__tests__/**']
        })
    ]
};