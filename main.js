const {app, BrowserWindow, screen} = require('electron');
// const path = require('path');
const Database = require('better-sqlite3');

let dbPath = 'lworker.db';
let db;

// Modules to control application life and create native browser window
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: global.storeObjects.screenSize.width * 3 / 4,
        height: global.storeObjects.screenSize.height * 7 / 8,
        minWidth: Math.max(global.storeObjects.screenSize.width / 3, 150),
        minHeight: global.storeObjects.screenSize.height / 1.6,
        webPreferences: {
            // preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');

    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
        db.close();
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    db = new Database(dbPath, { verbose: console.log });

    db.prepare('CREATE TABLE tb_tasks(\n' +
        '   id integer  PRIMARY KEY(id),\n' +
        '   name text,\n' +
        '   crtDate integer,\n' +
        '   uptDate integer\n' +
        ');').run();

    const insertStmt = db.prepare('insert into tb_tasks(id,name,crtDate,uptDate) values(?,?,?,?)');
    const insertMany = db.transaction((tasks) => {
        for (const task of tasks) insertStmt.run(task);
    });

    insertMany([
        {id: 1, name: 'task1', crtDate: new Date().getTime(), uptDate: new Date().getTime()},
        {id: 2, name: 'task2', crtDate: new Date().getTime(), uptDate: new Date().getTime()},
        {id: 3, name: 'task3', crtDate: new Date().getTime(), uptDate: new Date().getTime()},
        {id: 4, name: 'task4', crtDate: new Date().getTime(), uptDate: new Date().getTime()}
    ]);

    let allTask = db.prepare('select * from tb_tasks').all();
    console.log(allTask);

    const size = screen.getPrimaryDisplay().size;
    global.storeObjects = {
        screenSize: size
    };
    createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
});
