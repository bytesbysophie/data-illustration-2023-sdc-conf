import * as d3 from "d3"

class Icon {

    constructor(_config) {
        this.id = _config.id
        this.parentElement = _config.parentElement
        this.radius = _config.radius
        this.scale = _config.scale || 1
        this.innerRadius = _config.innerRadius || 0
        this.startAngle = _config.startAngle
        this.endAngle = _config.endAngle
        this.colors = _config.colors

        // Expected: array with 4 entries in the form of         
        // {
        //     translateX: 0,
        //     translateY: 0,
        //     roate: 0,
        //     color: "#00A09A"
        // }
        this.sections = _config.quarter

        this.initVis()
    }

    initVis() {
        console.log("init vis icon")
        let vis = this;

        /**
         * Create defs for Icon
         */

        vis.arcGenerator = d3.arc()

        // Append icon container
        vis.icon = vis.parentElement.append("defs")
            .append("g")
            .attr("id", vis.id)

        vis.updateVis()
    }

    updateVis() {
        console.log("update vis Icon")
        let vis = this
        vis.icon.selectAll("path").remove();

        // Append path for each section of the icon depending on the section configs
        for (let i in vis.sections) {

            // The following attributes can be configured for each section of the icon or for all at once
            vis.arcGenerator
                .outerRadius(vis.sections[i].radius * vis.scale || vis.radius * vis.scale)
                .startAngle(vis.sections[i].startAngle || vis.startAngle)
                .endAngle(vis.sections[i].endAngle || vis.endAngle)
                .innerRadius(vis.sections[i].innerRadius * vis.scale || vis.innerRadius * vis.scale || 0)

            vis.icon
                .append("path")
                .attr("d", d => vis.arcGenerator(d))
                .attr("transform", d => `translate(${vis.sections[i].translateX * vis.scale},${vis.sections[i].translateY * vis.scale}) 
                                        rotate(${vis.sections[i].roate})`)
                .attr("fill", vis.colors[vis.sections[i].color])
        }

    }

}

export { Icon }