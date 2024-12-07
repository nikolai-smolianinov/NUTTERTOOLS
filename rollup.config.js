import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

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
        resolve({
            extensions: ['.ts', '.js'],
            moduleDirectories: ['node_modules', 'src']
        }),
        commonjs(),
        typescript({
            tsconfig: 'tsconfig.json',
            declaration: true,
            declarationDir: './dist',
            sourceMap: true,
            outDir: './dist',
            compilerOptions: {
                moduleResolution: 'node',
                baseUrl: '.',
                paths: {
                    "@/*": ["./src/*"]
                }
            }
        })
    ]
};