const {BrowserWindow} = require('electron').remote;
const path = require('path');
$(() => {
    const newWindowBtn = document.getElementById('historicalBtn');
    // let historicalTaskWin;
    // newWindowBtn.addEventListener('click', (event) => {
    //     if (historicalTaskWin) {
    //         historicalTaskWin.show();
    //         return;
    //     }
    //     const modalPath = path.join('file://', __dirname, 'historicalTask.html');
    //     historicalTaskWin = new BrowserWindow({frame: false});
    //
    //     historicalTaskWin.on('close', () => {
    //         historicalTaskWin = null
    //     });
    //     historicalTaskWin.loadURL(modalPath);
    //     historicalTaskWin.show();
    // });
    let $menuDiv = $("#menuDiv");
    let $showMenuBtn = $("#showMenuBtn");
    $showMenuBtn.click(() => {
        $menuDiv.removeClass("d-none");
        $menuDiv.addClass("position-fixed");
        $menuDiv.addClass("opc");
        $showMenuBtn.removeClass("d-block");
        $showMenuBtn.addClass("d-none");
        $menuDiv.on("mouseout", () => {
            setTimeout(() => {
                $menuDiv.addClass("d-none");
                $menuDiv.removeClass("position-fixed");
                $menuDiv.removeClass("opc");
                $showMenuBtn.addClass("d-block");
                $showMenuBtn.removeClass("d-none");
                $menuDiv.off("mouseout");
            }, 322);
        });
    });

    let columnGrids = [];

// Define the column grids so we can drag those
// items around.
        // Instantiate column grid.
        let grid = new Muuri('.board-column-content', {
            items: '.board-item',
            layoutDuration: 400,
            layoutEasing: 'ease',
            dragEnabled: true,
            dragSort: function () {
                console.log("drag sort");
                return columnGrids;
            },
            dragSortInterval: 0,
            dragContainer: document.body,
            dragReleaseDuration: 400,
            dragReleaseEasing: 'ease'
        })
            .on('dragStart', function (item) {
                // Let's set fixed widht/height to the dragged item
                // so that it does not stretch unwillingly when
                // it's appended to the document body for the
                // duration of the drag.
                item.getElement().style.width = item.getWidth() + 'px';
                item.getElement().style.height = item.getHeight() + 'px';
            })
            .on('dragReleaseEnd', function (item) {
                // Let's remove the fixed width/height from the
                // dragged item now that it is back in a grid
                // column and can freely adjust to it's
                // surroundings.
                item.getElement().style.width = '';
                item.getElement().style.height = '';
                // Just in case, let's refresh the dimensions of all items
                // in case dragging the item caused some other items to
                // be different size.
                columnGrids.forEach(function (grid) {
                    grid.refreshItems();
                });
            })
            .on('layoutStart', function () {
                // Let's keep the board grid up to date with the
                // dimensions changes of column grids.
                console.log("layoutStart");
            });

        // Add the column grid reference to the column grids
        // array, so we can access it later on.
        columnGrids.push(grid);
});
