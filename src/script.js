import * as d3 from "d3"
import GUI from "lil-gui"
import { IconGird } from "./IconGrid"


/**
 *  ICON GRID
 */
const gridConfig = {}
gridConfig.parentElement = "#grid-container"
gridConfig.width = 400
gridConfig.height = 800
gridConfig.colsN = 3
gridConfig.rowsN = 5
gridConfig.iconR = 25
gridConfig.background = '#c898c6'

const iconGrid = new IconGird(gridConfig)

/**
 * CONFIGURATION
 */

// Configuration GUI
const gui = new GUI();

gui.add( gridConfig, 'width', 100, 600, 1)
    .name("Width")
    .onFinishChange( value => {
        iconGrid.config.width = value
        iconGrid.updateVis()
    })

gui.add( gridConfig, 'height', 100, 600, 1)
    .name("Height")
    .onChange( value => {
        iconGrid.config.height = value
        iconGrid.updateVis()
    })

gui.add( gridConfig, 'colsN', 4, 10, 1)
    .name("Columns")
    .onChange( value => {
        iconGrid.config.colsN = value
        iconGrid.updateVis()
    })
    
gui.add( gridConfig, 'rowsN', 4, 10, 1)
    .name("Rows")
    .onChange( value => {
        iconGrid.config.rowsN = value
        iconGrid.updateVis()
    })

gui.add( gridConfig, 'iconR', 0, 100, 1)
    .name("Icon Radius")
    .onChange( value => {
        iconGrid.config.iconR = value
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