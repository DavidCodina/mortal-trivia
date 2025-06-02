///////////////////////////////////////////////////////////////////////////
//
// Note: esbuild does not natively perform type checking or linting; it is primarily a bundler and optimizer.
// This means that it will not exit the build process if there are errors within the code.
// In order to prevent the build when there are Typescript errors we can do the following:
//
//   "build": "npm run typescript && node esbuild.config.mjs",
//   "typescript": "tsc --noEmit",
//
///////////////////////////////////////////////////////////////////////////
import fs from 'fs'
import { execSync } from 'child_process'
import * as esbuild from 'esbuild'
import copyStaticFiles from 'esbuild-copy-static-files'
import dotenv from 'dotenv'

dotenv.config()

// Gotcha: The newish --env-file=.env won't work here.
// Solution: use the good old dotenv package.
const isDev = process.env.NODE_ENV === 'development'

await esbuild.build({
  entryPoints: ['./src/index.ts'],
  outfile: './dist/index.js',
  bundle: true,
  // logLevel: 'error',
  platform: 'node',
  minify: true,
  // format: 'esm',
  // Defines global variables to be available during the build process (optional).
  // define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  sourcemap: isDev,
  // watch: false, // Optional for development

  plugins: [
    copyStaticFiles({
      src: './src/public',
      dest: './dist/public',
      dereference: true,
      errorOnExist: false,
      preserveTimestamps: true,
      recursive: true
      // filter: (file) => {
      //   return (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.jpg') || file.endsWith('.png'))
      // }
    })
  ]
})

/* ======================

====================== */
///////////////////////////////////////////////////////////////////////////
//
// This assumes that you do something like this:
//
//   CREATE_ZIP=true npm run build
//
// However, it's still easier to just use something like bestzip:
// "zip": "bestzip upload.zip dist/* package.json", which seems like
// it also does a better job of compressing the files.
//
///////////////////////////////////////////////////////////////////////////

const shouldCreateZip = process.env.CREATE_ZIP === 'true'

if (shouldCreateZip) {
  const temp = 'temp'

  // Create temp folder.
  if (!fs.existsSync(temp)) {
    fs.mkdirSync(temp)
  }

  const commands = [
    //! `mkdir -p ${temp}`,
    `cp -r ../dist ./dist`,
    `cp ../package.json ./package.json`,
    `zip -r ../upload.zip *`,
    `cd .. && rm -rf ${temp}`
  ].join(' && ')

  execSync(commands, { cwd: temp })
}
