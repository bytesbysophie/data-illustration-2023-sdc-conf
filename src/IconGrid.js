import * as d3 from "d3"

class IconGird {

    constructor(_config) {
        this.config = {
            parentElement: _config.parentElement,
            width: _config.width, 
            height: _config.height, 
            colsN: _config.colsN, 
            rowsN: _config.rowsN, 
            background: _config.background
        }

        this.initVis();
    }
s


    initVis() {
        console.log("init vis")
        let vis = this;

        /**
         * Create SVG
         */
        vis.svg = d3.select(vis.config.parentElement).append("svg")
            .attr("width", vis.config.width)
            .attr("height", vis.config.height)
            .style('background-color', vis.config.background)

        vis.grid = vis.svg.append("g")
            .attr("transform", `translate(${vis.config.width/2}, ${vis.config.height/2})`);

    }

    updateVis() {
        console.log("update vis")
        let vis = this
        
        /**
         * Update SVG
         */
        vis.svg
            .attr("width", vis.config.width)
            .attr("height", vis.config.height)
            .style('background-color', vis.config.background)
        
        } 

    renderVis() {
        console.log("render vis")
    }

} 

export { IconGird }