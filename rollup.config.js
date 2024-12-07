import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('rollup').RollupOptions} */
export default {
    input: 'src/app/index.ts',
    output: {
        dir: 'dist',
        format: 'es',
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'named'
    },
    external: [
        'node:fs',
        'node:path',
        'axios',
        'mime-types'
    ],
    plugins: [
        alias({
            entries: [
                { find: '@', replacement: './src' }
            ]
        }),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: 'tsconfig.json',
            declaration: true,
            declarationDir: './dist',
            sourceMap: true,
            outDir: './dist',
            compilerOptions: {
                baseUrl: '.',
                paths: {
                    "@/*": ["./src/*"]
                }
            }
        })
    ]
};