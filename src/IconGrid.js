import * as d3 from "d3"
import { Icon } from "./Icon";

class IconGird {

    constructor(_config) {
        this.config = {
            parentElement: _config.parentElement,
            width: _config.width, 
            height: _config.height, 
            margin: _config.margin,
            colsN: _config.colsN, 
            rowsN: _config.rowsN, 
            iconR: _config.iconR,
            background: _config.background,
            iconColors: _config.iconColors,
            iconsConfig: _config.iconsConfig,
            data: _config.data
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
        vis.icons = []
        vis.config.iconsConfig.forEach(c => {
            vis.icons.push(new Icon({
                id: c.id,
                parentElement: vis.grid,
                radius: c.radius,
                startAngle: c.startAngle,
                endAngle: c.endAngle,
                colors: vis.config.iconColors,
                quarter: c.quarter.map(q => {
                    return {
                        translateX: q.translateX,
                        translateY: q.translateY,
                        roate: q.roate,
                        innerRadius: q.innerRadius || 0,
                        color: q.color
                    }
                })
            }))
        })
        
        /**
         * Create Scales
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
            .range([vis.config.margin.top, vis.config.height - vis.config.margin.bottom])
            .domain(d3.range(vis.config.rowsN));
        vis.x
            .range([vis.config.margin.left, vis.config.width - vis.config.margin.right])
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