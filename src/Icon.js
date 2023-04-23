import * as d3 from "d3"

class Icon {

    constructor(_config) {
        this.config = {
            radius: _config.radius,
            color: _config.color
        }

        this.initVis();
    }
}

export { Icon }