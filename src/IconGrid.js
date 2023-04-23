import * as d3 from "d3"

class IconGird {

    constructor(_config) {
        this.config = {
            parentElement: _config.parentElement,
            width: _config.width, 
            height: _config.height, 
            colsN: _config.colsN, 
            rowsN: _config.rowsN, 
            iconR: _config.iconR,
            background: _config.background
        }

        this.initVis();
    }

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

        /**
         * Create Icon Grid
         */
        var y = d3.scaleBand()
            .range([0,vis.config.height])
            .domain(d3.range(vis.config.rowsN));
        var x = d3.scaleBand()
            .range([0, vis.config.width])
            .domain(d3.range(vis.config.colsN));

        vis.grid = vis.svg.append("g")
            .attr("transform", `translate(${vis.config.width/(vis.config.colsN * 2)}, ${vis.config.height/(vis.config.rowsN * 2) })`);

        /**
         * Define data
         */
        // Number of icons
        let iconN = vis.config.colsN * vis.config.rowsN

        // The share of circles that should be highlighted
        let percentNumber = 0.5;

        // Generate the circles data: array of indices + "active" info for each cell in the grid
        vis.data =[];
        d3.range(iconN).forEach(function(d){
            vis.data.push({"index": d, "percentNumber": d+1,"active": d / iconN < percentNumber})
        })

        /**
         * Create circles (temporary Icon alternative)
         */

         // Append circles to grid container & stlyle them accorting to the data & percentNumber
        vis.circles = vis.grid.selectAll("circle")
            .data(vis.data)
            .enter().append("circle")
            .attr("id", d => "id" + d.index)
            .attr('cx', d => x(d.index % vis.config.colsN))
            .attr('cy', d => y(Math.floor(d.index / vis.config.colsN)))
            .attr('r', vis.config.iconR)
            .attr('fill', "white")
            .attr('opacity', (d) => d.active ? 1 : 0.2)

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
        vis.circles
            .attr('r', vis.config.iconR)
        
        } 

    renderVis() {
        console.log("render vis")
    }

} 

export { IconGird }