import { build } from 'esbuild';

const baseConfig = {
    entryPoints: ['src/app/index.ts'],
    bundle: true,
    minify: true,
    platform: 'node',
    target: 'es2020',
    packages: 'external',
    alias: {
        '@': './src'
    }
};

// Production build configuration
const productionBuild = {
    ...baseConfig,
    outfile: 'dist/app/index.js',
    format: 'esm'
};

// Development build configuration
const developmentBuild = {
    ...baseConfig,
    entryPoints: ['entry.ts'],
    outfile: 'build/app/index.js',
    sourcemap: true,
    watch: {
        onRebuild(error, result) {
            if (error) {
                console.error('Build failed:', error);
            } else {
                console.log('Build succeeded:', result);
            }
        },
    },
};

// Build function
async function runBuild(isDev = false) {
    try {
        await build(isDev ? developmentBuild : productionBuild);
        console.log(`Build completed in ${isDev ? 'development' : 'production'} mode`);
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
}

// Handle build type based on arguments
const isDev = process.argv.includes('--dev');
runBuild(isDev);

export { runBuild };