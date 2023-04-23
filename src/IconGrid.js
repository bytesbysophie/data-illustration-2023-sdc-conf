import * as d3 from "d3"
import { Icon } from "./Icon";

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
        vis.grid = vis.svg.append("g")
            .attr("transform", `translate(${vis.config.width/(vis.config.colsN * 2)}, ${vis.config.height/(vis.config.rowsN * 2) })`);

        /**
         * Create Icon List
         */
        vis.icons = [
            new Icon({
                id: "icon1",
                parentElement: vis.grid,
                radius: vis.config.iconR,
                startAngle: 0,
                endAngle: Math.PI,
                quarter: [
                    {
                        translateX: 0,
                        translateY: vis.config.iconR,
                        roate: -90,
                        color: "#AC5CEA"
                    },
                    {
                        translateX: 0,
                        translateY: -vis.config.iconR,
                        roate: 90,
                        color: "#ffffff"
                    }
    
                ]
            }),
            new Icon({
                id: "icon2",
                parentElement: vis.grid,
                radius: vis.config.iconR,
                startAngle: Math.PI / 2,
                endAngle: Math.PI,
                quarter: [
                    {
                        translateX: 0, 
                        translateY: 0,
                        roate: 0,
                        color: "#00A09A"
                    },
                    {
                        translateX: 0,
                        translateY: 0,
                        roate: 90,
                        color: "#00A09A"
                    },
                    {
                        translateX: vis.config.iconR,
                        translateY: 0,
                        roate: 180,
                        color: "#00A09A"
                    },
                    {
                        translateX: -vis.config.iconR,
                        translateY: 0,
                        roate: 270,
                        color: "#00A09A"
                    }
    
                ]
            }),
            new Icon({
                id: "icon3",
                parentElement: vis.grid,
                radius: vis.config.iconR,
                startAngle: 0,
                endAngle: Math.PI * 2,
                quarter: [
                    { 

                        translateX: 0, 
                        translateY: 0,
                        roate: 0,
                        color: "#FFE184"
                    }
                ]
            }),
        ]
        
        let y = d3.scaleBand()
            .range([0,vis.config.height])
            .domain(d3.range(vis.config.rowsN));
        let x = d3.scaleBand()
            .range([0, vis.config.width])
            .domain(d3.range(vis.config.colsN));

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
         * Add icons to grid
         * TODO: Use d3 categorical scale to assign icons
         */
        vis.grid.selectAll("use")
            .data(vis.data)
            .enter().append("use")
            .attr("xlink:href", d => d.active ? `#${vis.icons[0].id}` : `#${vis.icons[2].id}`)
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