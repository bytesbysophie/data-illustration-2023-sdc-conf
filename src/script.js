import * as d3 from "d3"
import GUI from "lil-gui"
import { IconGird } from "./IconGrid"

/**
 *  ICON GRID CONFIG
 */
const gridConfig = {}
gridConfig.parentElement = "#grid-container"
gridConfig.width = 300
gridConfig.height = 900
gridConfig.iconR = 15
gridConfig.colsN = 7
gridConfig.scale = 1
gridConfig.background = '#1B1818'
gridConfig.iconColors = ['#AC5CEA','#62bde4', '#ffffff', '#FFE184', '#00A09A']

let iconGrid

/**  
 * DATA - TODO: load data from csv
*/

d3.csv('tickets.csv').then(data => {

    let gridData = []
    data.forEach(d => {
        d.type = d.type;
        d.count = parseInt(d.count);
        for (let i = 0; i < d.count; i++){
            gridData.push({type: d.type})
        }
    })
    gridData = d3.shuffle(gridData)
    gridData.forEach((d, i) => d.index = i)

    console.log(gridData)

    gridConfig.data = gridData
    gridConfig.rowsN = Math.ceil(gridConfig.data.length / gridConfig.colsN)

    iconGrid = new IconGird(gridConfig)
    addConfigurationMenu()
})

/**
 * CONFIGURATION
 */
function addConfigurationMenu() {


    // Configuration GUI
    const gui = new GUI();

    gui.add( gridConfig, 'width', 0, 1200, 1)
        .name("Width")
        .onChange( value => {
            iconGrid.config.width = value
            iconGrid.updateVis()
        })

    gui.add( gridConfig, 'height', 0, 1200, 1)
        .name("Height")
        .onChange( value => {
            iconGrid.config.height = value
            iconGrid.updateVis()
        })

    gui.add( gridConfig, 'colsN', 0, 50, 1)
        .name("Columns")
        .onChange( value => {
            iconGrid.config.colsN = value
            iconGrid.updateVis()
        })
        
    gui.add( gridConfig, 'rowsN', 0, 50, 1)
        .name("Rows")
        .onChange( value => {
            iconGrid.config.rowsN = value
            iconGrid.updateVis()
        })

    gui.add( gridConfig, 'scale', 0, 5)
        .name("Icon Scale")
        .onChange( value => {
            iconGrid.config.iconR = value
            iconGrid.icons.forEach(i => {
                i.scale = value
                i.updateVis()
            })
            iconGrid.updateVis()
        })

    const colorFormats = {
        background: gridConfig.background
    };

    gui.addColor( colorFormats, 'background' )
        .name("Background")
        .onChange( value => {
            iconGrid.config.background = value
            iconGrid.updateVis()
        })
    
    gridConfig.iconColors.forEach((c, i) => {
        const colorFormats = {
            background: c
        };
    
        gui.addColor( colorFormats, 'background' )
            .name("Icon Color " + String(i + 1))
            .onChange( value => {
                iconGrid.config.iconColors[i] = value
                iconGrid.icons.forEach(icon => {
                    icon.colors[i]
                    icon.updateVis()
                })
            })
        
    })
}