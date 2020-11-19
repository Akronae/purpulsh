const http = require('http')
const fs = require('fs')
const path = require('path')

const repoPath = path.resolve(__dirname)
const repoThemePath = path.resolve(repoPath, './src/akronae.purpulsh.1.0.0')
const extensionsPath = path.resolve(require('os').homedir() + '/.vscode/extensions')

console.log('Installing theme.. 🔮')
console.log('Copying', repoThemePath, 'to', extensionsPath)

copyFolderRecursiveSync(repoThemePath, extensionsPath)
console.log('Theme copied')

console.log('Deleting this repo from your machine')
deleteFolderRecursive(repoPath)
console.log(repoPath, 'deleted')
console.log('\nYou\'re done! Enjoy the mood.')

// from https://stackoverflow.com/questions/13786160/copy-folder-recursively-in-node-js
function copyFileSync( source, target ) {

    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target ) {
    var files = [];

    // Check if folder needs to be created or integrated
    var targetFolder = path.join( target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    // Copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}

// from https://stackoverflow.com/questions/18052762/remove-directory-which-is-not-empty
function deleteFolderRecursive (dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file, index) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
};