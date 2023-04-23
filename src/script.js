import * as d3 from "d3"
import GUI from "lil-gui"
import { IconGird } from "./IconGrid"

/**
 *  ICON GRID CONFIG
 */
const gridConfig = {}
gridConfig.parentElement = "#grid-container"
gridConfig.width = 300
gridConfig.height = 800
gridConfig.colsN = 5
gridConfig.rowsN = 12
gridConfig.iconR = 20
gridConfig.background = '#1B1818'

let iconGrid

// // Number of icons
// let iconN = 5 * 12

// // The share of circles that should be highlighted
// let percentNumber = 0.7;

// // Generate the circles data: array of indices + "active" info for each cell in the grid
// // TODO: We need a data category instead of the active boolean
// let data = [];
// d3.range(iconN).forEach(function(d){
//     data.push({"index": d,"active": d / iconN < percentNumber})
// })


/**  
 * DATA - TODO: load data from csv
*/

d3.csv('tickets.csv').then(data => {

    data.forEach(function(d, i) {
        d.index = i,
        d.type = d.type;
        d.count = parseInt(d.count);
    });

    console.log(data)

    gridConfig.data = data

    iconGrid = new IconGird(gridConfig)
})


/**
 * CONFIGURATION
 */

// Configuration GUI
const gui = new GUI();

gui.add( gridConfig, 'width', 0, 1200, 1)
    .name("Width")
    .onFinishChange( value => {
        iconGrid.config.width = value
        iconGrid.updateVis()
    })

gui.add( gridConfig, 'height', 0, 1200, 1)
    .name("Height")
    .onChange( value => {
        iconGrid.config.height = value
        iconGrid.updateVis()
    })

gui.add( gridConfig, 'colsN', 0, 10, 1)
    .name("Columns")
    .onChange( value => {
        iconGrid.config.colsN = value
        iconGrid.updateVis()
    })
    
gui.add( gridConfig, 'rowsN', 0, 10, 1)
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