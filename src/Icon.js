import * as d3 from "d3"

class Icon {

    constructor(_config) {
        this.id = _config.id
        this.parentElement = _config.parentElement
        this.radius = _config.radius

        // Expected: array with 4 entries in the form of         
        // {
        //     translateX: 0,
        //     translateY: 0,
        //     roate: 0,
        //     color: "#00A09A"
        // }
        this.quarter = _config.quarter

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
            .innerRadius(0)
            .startAngle(Math.PI / 2)
            .endAngle(Math.PI)

        // Append icon container
        vis.icon = vis.parentElement.append("defs")
            .append("g")
            .attr("id", vis.id)

        // Append path for each quarter of the icon depending on the quarter configs
        for (let i in vis.quarter) {
            vis.icon
                .append("path")
                .attr("d", d => arcGenerator(d))
                .attr("transform", d => `translate(${vis.quarter[i].translateX},${vis.quarter[i].translateY}) rotate(${vis.quarter[i].roate})`)
                .attr("fill", vis.quarter[i].color)
        }
    }

}

export { Icon }