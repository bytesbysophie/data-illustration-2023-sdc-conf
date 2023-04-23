import * as d3 from "d3"

class Icon {

    constructor(_config) {
        this.id = _config.id
        this.parentElement = _config.parentElement
        this.radius = _config.radius
        this.innerRadius = _config.innerRadius || 0
        this.startAngle = _config.startAngle
        this.endAngle = _config.endAngle

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
        const arcGenerator = d3.arc()
            .outerRadius(vis.radius)
            .innerRadius(vis.innerRadius)
            .startAngle(this.startAngle)
            .endAngle(this.endAngle)

        // Append icon container
        vis.icon = vis.parentElement.append("defs")
            .append("g")
            .attr("id", vis.id)

        // Append path for each section of the icon depending on the section configs
        for (let i in vis.sections) {

            /**
             * Create defs for Icon
             */
            const arcGenerator = d3.arc()
            .outerRadius(vis.radius)
            .innerRadius(vis.sections[i].innerRadius || 0)
            .startAngle(this.startAngle)
            .endAngle(this.endAngle)


            vis.icon
                .append("path")
                .attr("d", d => arcGenerator(d))
                .attr("transform", d => `translate(${vis.sections[i].translateX},${vis.sections[i].translateY}) rotate(${vis.sections[i].roate})`)
                .attr("fill", vis.sections[i].color)
        }
    }

}

export { Icon }