// const obj = {
//     name: "John",
//     greet: function() {
//       // Normal function
//       setTimeout(function() {
//         console.log("Hello, " + this.name); // 'this' is not what you expect
//       }, 100);
//     },
//     greetArrow: function() {
//       // Arrow function
//       setTimeout(() => {
//         console.log("Hello, " + this.name); // 'this' is the object
//       }, 100);
//     }
//   };
  
//   obj.greet(); // Outputs "Hello, undefined"
//   obj.greetArrow(); // Outputs "Hello, John"
  
// const fs = require('fs');
// const path = require('path');

// function listFilesAndFolders(directoryPath) {
//   const items = fs.readdirSync(directoryPath);

//   items.forEach((item) => {
//     const itemPath = path.join(directoryPath, item);
//     const stats = fs.statSync(itemPath);

//     if (stats.isDirectory()) {
//       console.log(`Directory: ${itemPath}`);
//       listFilesAndFolders(itemPath); // Recursively list files and folders in this directory
//     } else {
//       console.log(`File: ${itemPath}`);
//     }
//   });
// }


// const projectDirectory = "C:\\Users\\Admin\\Desktop\\mongosh";

// listFilesAndFolders(projectDirectory);
const fs = require('fs');
const path = require('path');

function listDirectories(directoryPath) {
  const items = fs.readdirSync(directoryPath);

  items.forEach((item) => {
    const itemPath = path.join(directoryPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      console.log(`Directory: ${itemPath}`);
      listDirectories(itemPath); // Recursively list directories in this directory
    }
  });
}

// Replace 'your_project_directory_path' with the actual path to your Node.js project directory
const projectDirectory = 'C:\\Users\\Admin\\Desktop\\mongosh';

listDirectories(projectDirectory);

