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
            background: _config.background,
            iconColors: _config.iconColors,
            data: _config.data
        }
        console.log(this)
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
         * TODO: create JSON to load icon config from
         */
        vis.icons = [
            new Icon({
                id: "icon1",
                parentElement: vis.grid,
                radius: vis.config.iconR,
                startAngle: 0,
                endAngle: Math.PI,
                colors: vis.config.iconColors,
                quarter: [
                    {
                        translateX: 0,
                        translateY: vis.config.iconR,
                        roate: -90,
                        // innerRadius: vis.config.iconR / 2,
                        color: 0
                    },
                    {
                        translateX: 0,
                        translateY: -vis.config.iconR,
                        roate: 90,
                        innerRadius: vis.config.iconR / 2,
                        color: 2
                    }
    
                ]
            }),
            new Icon({
                id: "icon2",
                parentElement: vis.grid,
                radius: vis.config.iconR,
                startAngle: Math.PI / 2,
                endAngle: Math.PI,
                colors: vis.config.iconColors,
                quarter: [
                    {
                        translateX: 0, 
                        translateY: 0,
                        roate: 0,
                        color: 2
                    },
                    {
                        translateX: 0,
                        translateY: 0,
                        roate: 90,
                        color: 1
                    },
                    {
                        translateX: vis.config.iconR,
                        translateY: 0,
                        roate: 180,
                        color: 2
                    },
                    {
                        translateX: -vis.config.iconR,
                        translateY: 0,
                        roate: 270,
                        color: 1
                    }
    
                ]
            }),
            new Icon({
                id: "icon3",
                parentElement: vis.grid,
                radius: vis.config.iconR,
                innerRadius: vis.config.iconR / 2,
                startAngle: 0,
                endAngle: Math.PI * 2,
                colors: vis.config.iconColors,
                quarter: [
                    { 

                        translateX: 0, 
                        translateY: 0,
                        roate: 0,
                        color: 3
                    }
                ]
            }),
            new Icon({
                id: "icon4",
                parentElement: vis.grid,
                radius: vis.config.iconR,
                startAngle: Math.PI / 2,
                endAngle: Math.PI,
                colors: vis.config.iconColors,
                quarter: [
                    {
                        translateX: -vis.config.iconR, 
                        translateY: -vis.config.iconR,
                        roate: 0,
                        color: 3
                    },
                    {
                        translateX: vis.config.iconR,
                        translateY: -vis.config.iconR,
                        roate: 90,
                        color: 3
                    },
                    {
                        translateX: vis.config.iconR,
                        translateY: vis.config.iconR,
                        roate: 180,
                        color: 4
                    },
                    {
                        translateX: -vis.config.iconR,
                        translateY: vis.config.iconR,
                        roate: 270,
                        color: 4
                    }
    
                ]
            }),
            new Icon({
                id: "icon5",
                parentElement: vis.grid,
                radius: vis.config.iconR,
                startAngle: 0,
                endAngle: Math.PI,
                colors: vis.config.iconColors,
                quarter: [
                    {
                        translateX: 0,
                        translateY: 0,
                        roate: 0,
                        innerRadius: vis.config.iconR / 2,
                        color: 0
                    },
                    {
                        translateX:  -vis.config.iconR,
                        translateY: 0,
                        roate:0,
                        color: 3
                    }
    
                ]
            }),
            new Icon({
                id: "icon6",
                parentElement: vis.grid,
                radius: vis.config.iconR,
                startAngle: Math.PI / 2,
                endAngle: Math.PI,
                colors: vis.config.iconColors,
                quarter: [
                    {
                        translateX: vis.config.iconR, 
                        translateY: vis.config.iconR, 
                        roate: 180,
                        color: 2
                    },
                    {
                        translateX: 0,
                        translateY: 0,
                        roate: 270,
                        innerRadius: vis.config.iconR / 2,
                        color: 4
                    },
                    {
                        translateX: -vis.config.iconR, 
                        translateY: vis.config.iconR,
                        roate: 270,
                        color:2
                    },
                    {
                        translateX: 0,
                        translateY: 0,
                        roate: 180,
                        innerRadius: vis.config.iconR / 2,
                        color: 4
                    }
    
                ]
            }),
        ]
        
        /**
         * Creaate Scales
         */
        vis.y = d3.scaleBand()
        vis.x = d3.scaleBand()
        // Icon scale
        vis.i = d3.scaleOrdinal()

        vis.updateVis()
    }

    updateVis() {
        console.log("update vis IconGrid")
        let vis = this
        
        /**
         * Update SVG
         */
        vis.svg
            .attr("width", vis.config.width)
            .attr("height", vis.config.height)
            .style('background-color', vis.config.background)

        /**
         * Update Scales
         */

        vis.y
            .range([0,vis.config.height])
            .domain(d3.range(vis.config.rowsN));
        vis.x
            .range([0, vis.config.width])
            .domain(d3.range(vis.config.colsN));
        vis.i
            .range(d3.map(vis.icons, d => d.id))
            .domain(d3.map(vis.config.data, d => d.type))

        /**
         * Add icons to grid
         */
        vis.grid.selectAll("use").remove();

        vis.grid.selectAll("use")
            .data(vis.config.data)
            .enter().append("use")
            .attr("xlink:href", d => `#${vis.i(d.type)}`)
            .attr("id", d => "id" + d.index)
            .attr('x', d => vis.x(d.index % vis.config.colsN))
            .attr('y', d => vis.y(Math.floor(d.index / vis.config.colsN)))



        vis.grid
            .attr("transform", `translate(${vis.config.width/(vis.config.colsN * 2)}, ${vis.config.height/(vis.config.rowsN * 2) })`);

        
        } 

    renderVis() {
        console.log("render vis")
    }

} 

export { IconGird }