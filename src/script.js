import * as d3 from "d3"
import GUI from "lil-gui"
import { IconGird } from "./IconGrid"


/**
 *  ICON GRID
 */
const gridConfig = {}
gridConfig.parentElement = "#grid-container"
gridConfig.width = 400
gridConfig.height = 400
gridConfig.colsN = 5
gridConfig.rowsN = 5
gridConfig.background = '#c898c6'

const iconGrid = new IconGird(gridConfig)

/**
 * CONFIGURATION
 */

// Configuration GUI
const gui = new GUI();

gui.add( gridConfig, 'width', 100, 600 )
    .name("Width")
    .onFinishChange( value => {
        iconGrid.config.width = value
        iconGrid.updateVis()
    })

gui.add( gridConfig, 'height', 100, 600 )
    .name("Height")
    .onChange( value => {
        iconGrid.config.height = value
        iconGrid.updateVis()
    })

gui.add( gridConfig, 'colsN', 4, 10 )
    .name("Columns")
    .onChange( value => {
        iconGrid.config.colsN = value
        iconGrid.updateVis()
    })
    
gui.add( gridConfig, 'rowsN', 4, 10 )
    .name("Rows")
    .onChange( value => {
        iconGrid.config.rowsN = value
        iconGrid.updateVis()
    })

const colorFormats = {
	background: gridConfig.background,
	object: { r: 1, g: 1, b: 1 },
	array: [ 1, 1, 1 ]
};

gui.addColor( colorFormats, 'background' )
    .name("Background")
    .onChange( value => {
        iconGrid.config.background = value
        iconGrid.updateVis()
    })