/*
 * Part1: Node Internals (3 Grades):
 * 
 * 1. 
 * Answer: The Event Loop is the mechanism that allows Node.js to perform non-blocking I/O operations 
 * despite JavaScript being single-threaded. It does this by offloading operations to the system kernel 
 * whenever possible. It continuously checks the Call Stack and the Event Queue. If the Call Stack is empty, 
 * it dequeues the next event/callback from the Event Queue and pushes it to the Call Stack for execution.
 * 
 * 2. 
 * Answer: Libuv is a multi-platform C library that provides support for asynchronous I/O based on event loops. 
 * In Node.js, Libuv is responsible for providing and managing the Event Loop, as well as maintaining the 
 * Thread Pool used for handling heavy, blocking tasks (like File System and Crypto operations) in the background.
 * 
 * 3.
 * Answer: When an asynchronous operation is called, Node.js offloads it to Libuv. Libuv delegates the task 
 * either to the OS kernel or to its own Thread Pool. Node.js then continues executing the rest of the code 
 * without waiting. Once the background task is complete, its associated callback function is pushed to the 
 * Event Queue. The Event Loop then picks it up and pushes it to the Call Stack when the stack is empty.
 * 
 * 4. 
 * Answer: 
 * - Call Stack: A LIFO (Last In, First Out) structure that tracks the currently executing function and its callers.
 * - Event Queue (Callback Queue): A FIFO (First In, First Out) structure that holds the callbacks of completed 
 *   asynchronous operations waiting to be executed.
 * - Event Loop: The manager that continuously checks if the Call Stack is empty, and if so, moves pending 
 *   callbacks from the Event Queue to the Call Stack.
 * 
 * 5.  
 * Answer: The Thread Pool is a collection of threads maintained by Libuv to execute heavy tasks that the OS 
 * cannot handle asynchronously. By default, it consists of 4 threads. You can change its size by setting 
 * the 'UV_THREADPOOL_SIZE' environment variable (e.g., process.env.UV_THREADPOOL_SIZE = 8; in the code, or 
 * using 'export UV_THREADPOOL_SIZE=8' in the terminal before running the app).
 * 
 * 6. 
 * Answer: 
 * - Blocking Code: Executes synchronously on the main thread (Call Stack). It halts the execution of all other 
 *   code (and the Event Loop) until it finishes (e.g., fs.readFileSync).
 * - Non-Blocking Code: Executes asynchronously. Node.js offloads the task to Libuv and immediately moves to 
 *   the next line of code. When the task finishes, its callback is executed via the Event Loop (e.g., fs.readFile), 
 *   keeping the application responsive.
 */
//part 2
// 1
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/user', (req, res) => {

    const data = fs.readFileSync('users.json', 'utf-8');

    const users = JSON.parse(data);

    const emailExists = users.some(user => user.email === req.body.email);

    if (emailExists) {
        return res.status(400).json({
            message: 'Email already exists'
        });
    }

    
    users.push(req.body);

    fs.writeFileSync(
        'users.json',
        JSON.stringify(users, null, 2),
        'utf-8'
    );

    res.status(201).json({
        message: 'User created successfully',
        user: req.body
    });
});
// 2
app.patch('/user/:id', (req, res) => {

    const data = fs.readFileSync('users.json', 'utf-8');
    const users = JSON.parse(data);

    const userId = parseInt(req.params.id);

    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({
            message: 'User id not found'
        });
    }

    Object.assign(users[userIndex], req.body);

    fs.writeFileSync(
        'users.json',
        JSON.stringify(users, null, 2),
        'utf-8'
    );

    res.status(200).json({
        message: 'User updated successfully'
    });
});

//3
app.delete('/user/:id', (req, res) => {

    const data = fs.readFileSync('users.json', 'utf-8');
    const users = JSON.parse(data);

    const userId = parseInt(req.params.id);

    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({
            message: 'User id not found'
        });
    }

    users.splice(userIndex, 1);

    fs.writeFileSync(
        'users.json',
        JSON.stringify(users, null, 2),
        'utf-8'
    );

    res.status(200).json({
        message: 'User deleted successfully'
    });
});

//4


app.get('/user/getUserByName/:name', (req, res) => {
    const data = fs.readFileSync('users.json', 'utf-8');
    const users = JSON.parse(data);

    const user = users.find(user => user.name === req.params.name);

    if (!user) {
        return res.status(404).json({
            message: 'User name not found'
        });
    }

    res.status(200).json(user);
});
// 5:

app.get('/user', (req, res) => {
    const data = fs.readFileSync('users.json', 'utf-8');
    const users = JSON.parse(data);
    res.status(200).json(users);
});

// 6:

app.get('/user/minAge/:age', (req, res) => {
    const data = fs.readFileSync('users.json', 'utf-8');
    const users = JSON.parse(data);

    const minAge = parseInt(req.params.age);
    const filteredUsers = users.filter(user => user.age >= minAge);

    res.status(200).json(filteredUsers);
});

// 7:

app.get('/user/:id', (req, res) => {
    const data = fs.readFileSync('users.json', 'utf-8');
    const users = JSON.parse(data);

    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);

    if (!user) {
        return res.status(404).json({
            message: 'User id not found'
        });
    }

    res.status(200).json(user);
});