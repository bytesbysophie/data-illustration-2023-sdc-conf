
class IconGird {

    constructor(_config) {
        this.config = {
            width: _config.width, 
            height: _config.height, 
            colsN: _config.colsN, 
            rowsN: _config.rowsN, 
            background: _config.background
        }

        this.initVis();
    }

    initVis() {
        console.log("init vis")
    }

    updateVis() {
        console.log("update vis")
    } 

    renderVis() {
        console.log("render vis")
    }

} 

export { IconGird }