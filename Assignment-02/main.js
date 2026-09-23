// part1 
// 1
// const path = require('path');

// function logCurrentFileInfo() {
//   const filePath = __filename;
//   const dirPath = __dirname;
  
//   console.log({ File: filePath, Dir: dirPath });
  
// }

// logCurrentFileInfo();
// 2
// const path = require('path');

// function getFileName(filePath) {
//   return path.basename(filePath);
// }

// console.log(getFileName('/user/files/node.js'));
// 3
// const path = require('path');

// function buildPath(obj) {
//   return path.format(obj);
// }

// console.log(buildPath({ dir: "/folder", name: "app", ext: ".js" }));
// 4
// const path = require('path');

// function getFileExtension(filePath) {
//   return path.extname(filePath);
// }

// console.log(getFileExtension('/docs/readme.md'));
// 5
// const path = require('path');

// function getNameAndExt(filePath) {
//   const parsed = path.parse(filePath);
//   return { Name: parsed.name, Ext: parsed.ext };
// }

// console.log(getNameAndExt('/home/app/main.js'));
// 6
// const path = require('path');

// function isPathAbsolute(filePath) {
//   return path.isAbsolute(filePath);
// }

// console.log(isPathAbsolute('/home/user/file.txt'));
// 7
// const path = require('path');

// function joinPaths(...segments) {
//   return path.join(...segments);
// }

// console.log(joinPaths('src', 'components', 'App.js'));
// 8
// const path = require('path');

// function resolveToAbsolute(relativePath) {
//   return path.resolve(relativePath);
// }

// console.log(resolveToAbsolute('./index.js'));
// 9 
// const path = require('path');

// function joinTwoPaths(path1, path2) {
//   return path.join(path1, path2);
// }

// console.log(joinTwoPaths('/folder1', 'folder2/file.txt'));
// 10
// const fs = require('fs').promises;

// async function deleteFile(filePath) {
//   await fs.unlink(filePath);
//   console.log(`The ${filePath.split('/').pop()} is deleted.`);
// }

// deleteFile('/path/to/file.txt');
// 11
// const fs = require('fs');

// function createFolder(folderPath) {
//   fs.mkdirSync(folderPath);
//   return "Success";
// }

// console.log(createFolder('/path/to/newFolder'));
// 12
// const EventEmitter = require('events');

// const myEmitter = new EventEmitter();

// myEmitter.on('start', () => {
//   console.log('Welcome event triggered!');
// });

// myEmitter.emit('start');
// 13
// const EventEmitter = require('events');

// const myEmitter = new EventEmitter();

// myEmitter.on('login', (username) => {
//   console.log(`User logged in: ${username}`);
// });

// myEmitter.emit('login', 'Ahmed');

// 14
// const fs = require('fs');

// function readFileSyncAndLog(filePath) {
//   const content = fs.readFileSync(filePath, 'utf8');
//   console.log(content);
//   return content;
// }

// readFileSyncAndLog('./notes.txt');
// 15
// const fs = require('fs').promises;

// async function writeFileAsync(path, content) {
//   await fs.writeFile(path, content);
//   console.log('File written successfully.');
// }

// writeFileAsync('./async.txt', 'Async save');
// 16 
// const fs = require('fs');

// function checkPathExists(dirPath) {
//   return fs.existsSync(dirPath);
// }

// console.log(checkPathExists('./notes.txt'));
// 17
// const os = require('os');

// function getSystemInfo() {
//   return { Platform: os.platform(), Arch: os.arch() };
// }

// console.log(getSystemInfo());
// // 18
// const fs = require('fs');

// function readFileInChunks(filePath) {
//   const readStream = fs.createReadStream(filePath, 'utf8');

//   readStream.on('data', (chunk) => {
//     console.log('Chunk:', chunk);
//   });

//   readStream.on('end', () => {
//     console.log('Finished reading file.');
//   });

//   readStream.on('error', (err) => {
//     console.error('Error reading file:', err.message);
//   });
// }

// readFileInChunks('./big.txt');
// 19
// const fs = require('fs');

// function copyFileWithStreams(sourcePath, destPath) {
//   const readStream = fs.createReadStream(sourcePath);
//   const writeStream = fs.createWriteStream(destPath);

//   readStream.pipe(writeStream);

//   writeStream.on('finish', () => {
//     console.log('File copied using streams');
//   });

//   readStream.on('error', (err) => {
//     console.error('Error reading:', err.message);
//   });

//   writeStream.on('error', (err) => {
//     console.error('Error writing:', err.message);
//   });
// }

// 
// 20 
// const fs = require('fs');
// const zlib = require('zlib');
// const { pipeline } = require('stream');

// function compressFile(sourcePath, destPath) {
//   const readStream = fs.createReadStream(sourcePath);
//   const gzip = zlib.createGzip();
//   const writeStream = fs.createWriteStream(destPath);

//   pipeline(readStream, gzip, writeStream, (err) => {
//     if (err) {
//       console.error('Pipeline failed:', err.message);
//     } else {
//       console.log('File compressed successfully.');
//     }
//   });
// }

// compressFile('./data.txt', './data.txt.gz');


// Part 2: Simple CRUD Operations Using HTTP
// ==========================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const USERS_FILE = path.join(__dirname, 'users.json');

// Helper function to read users from JSON file using fs
function readUsersFromFile() {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, '[]', 'utf8');
      return [];
    }
    const fileContent = fs.readFileSync(USERS_FILE, 'utf8').trim();
    if (!fileContent) return [];
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

function writeUsersToFile(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}


function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', err => reject(err));
  });
}

const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const pathname = req.url.split('?')[0];
  const parts = pathname.split('/').filter(Boolean); // e.g., ["user"] or ["user", "1"]

  // 1) POST /user - Add a new user (ensure email doesn't exist)
  if (req.method === 'POST' && parts.length === 1 && parts[0] === 'user') {
    const body = await getRequestBody(req);
    const users = readUsersFromFile();

    const emailExists = users.some(user => user.email === body.email);
    if (emailExists) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: "Email already exists." }));
      return;
    }

    const newId = users.length > 0 ? Math.max(...users.map(u => u.id || 0)) + 1 : 1;
    const newUser = {
      id: newId,
      name: body.name,
      age: body.age,
      email: body.email
    };

    users.push(newUser);
    writeUsersToFile(users);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "User added successfully." }));
    return;
  }

  
  if (req.method === 'PATCH' && parts.length === 2 && parts[0] === 'user') {
    const userId = Number(parts[1]);
    const body = await getRequestBody(req);
    const users = readUsersFromFile();

    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: "User ID not found." }));
      return;
    }

    const updatedKeys = Object.keys(body);
    if (body.name !== undefined) users[userIndex].name = body.name;
    if (body.age !== undefined) users[userIndex].age = body.age;
    if (body.email !== undefined) users[userIndex].email = body.email;

    writeUsersToFile(users);

    let message = "User updated successfully.";
    if (updatedKeys.length === 1 && ['name', 'age', 'email'].includes(updatedKeys[0])) {
      message = `User ${updatedKeys[0]} updated successfully.`;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message }));
    return;
  }

  // 3) DELETE /user/:id - Delete a user by ID
  if (req.method === 'DELETE' && parts.length === 2 && parts[0] === 'user') {
    const userId = Number(parts[1]);
    const users = readUsersFromFile();

    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: "User ID not found." }));
      return;
    }

    users.splice(userIndex, 1);
    writeUsersToFile(users);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "User deleted successfully." }));
    return;
  }

  // 4) GET /user or GET / - Get all users
  if (req.method === 'GET' && (parts.length === 0 || (parts.length === 1 && parts[0] === 'user'))) {
    const users = readUsersFromFile();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
    return;
  }

  // 5) GET /user/:id - Get user by ID
  if (req.method === 'GET' && parts.length === 2 && parts[0] === 'user') {
    const userId = Number(parts[1]);
    const users = readUsersFromFile();

    const user = users.find(u => u.id === userId);
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: "User not found." }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
    return;
  }

  // Route not found
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: "Route not found" }));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
