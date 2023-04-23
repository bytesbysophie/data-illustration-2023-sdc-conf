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
        let y = d3.scaleBand()
            .range([0,vis.config.height])
            .domain(d3.range(vis.config.rowsN));
        let x = d3.scaleBand()
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
        let percentNumber = 0.7;

        // Generate the circles data: array of indices + "active" info for each cell in the grid
        // TODO: We need a data category instead of the active boolean
        vis.data =[];
        d3.range(iconN).forEach(function(d){
            vis.data.push({"index": d,"active": d / iconN < percentNumber})
        })

        /**
         * Create icons (testing first approach)
         */

        const arcGenerator = d3.arc()
            .outerRadius(vis.config.iconR)
            .innerRadius(0)
            .startAngle(Math.PI / 2)
            .endAngle(Math.PI)

        let quarter = vis.grid.append("defs")
            .append("g")
            .attr("id","quarterIcon");

        quarter
            .append("path")
            .attr("d", d => arcGenerator(d))
            .attr("transform", d => `translate(${0},${vis.config.iconR}) rotate(${270})`)
            .attr("fill", "#AC5CEA")

        quarter
            .append("path")
            .attr("d", d => arcGenerator(d))
            .attr("transform", d => `translate(${0},${vis.config.iconR}) rotate(${180})`)
            .attr("fill", "#AC5CEA")

        quarter
            .append("path")
            .attr("d", d => arcGenerator(d))
            .attr("transform", d => `translate(${0},${-vis.config.iconR}) rotate(${0})`)
            .attr("fill", "white")

        quarter
            .append("path")
            .attr("d", d => arcGenerator(d))
            .attr("transform", d => `translate(${0},${-vis.config.iconR}) rotate(${90})`)
            .attr("fill", "white")

        let quarterInactive = vis.grid.append("defs")
            .append("g")
            .attr("id","quarterInactiveIcon");

        quarterInactive
            .append("path")
            .attr("d", d => arcGenerator(d))
            .attr("fill", "#00A09A")

        quarterInactive
            .append("path")
            .attr("d", d => arcGenerator(d))
            .attr("transform", d => `translate(${0},${0}) rotate(${90})`)
            .attr("fill", "#00A09A")

        quarterInactive
            .append("path")
            .attr("d", d => arcGenerator(d))
            .attr("transform", d => `translate(${vis.config.iconR},${0}) rotate(${180})`)
            .attr("fill", "#00A09A")

        quarterInactive
            .append("path")
            .attr("d", d => arcGenerator(d))
            .attr("transform", d => `translate(${-vis.config.iconR},${0}) rotate(${270})`)
            .attr("fill", "#00A09A")

        vis.grid.selectAll("use")
            .data(vis.data.filter(d => d.active))
            .enter().append("use")
            .attr("xlink:href", "#quarterIcon")
            .attr("id", d => "id" + d.index)
            .attr('x', d => x(d.index % vis.config.colsN))
            .attr('y', d => y(Math.floor(d.index / vis.config.colsN)))

        vis.grid.selectAll("use")
            .data(vis.data.filter(d => ~d.active))
            .enter().append("use")
            .attr("xlink:href", "#quarterInactiveIcon")
            .attr("id", d => "id" + d.index)
            .attr('x', d => x(d.index % vis.config.colsN))
            .attr('y', d => y(Math.floor(d.index / vis.config.colsN)))

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

        /**
         * Update Circles
         */

        let y = d3.scaleBand()
            .range([0,vis.config.height])
            .domain(d3.range(vis.config.rowsN));
        let x = d3.scaleBand()
            .range([0, vis.config.width])
            .domain(d3.range(vis.config.colsN));

        vis.grid
            .attr("transform", `translate(${vis.config.width/(vis.config.colsN * 2)}, ${vis.config.height/(vis.config.rowsN * 2) })`);

        // Append circles to grid container & stlyle them according to the data & percentNumber
        vis.grid.selectAll("circle").remove();
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

    renderVis() {
        console.log("render vis")
    }

} 

export { IconGird }