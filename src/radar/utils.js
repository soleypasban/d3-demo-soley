import { max } from 'd3'

export const gridSize = 160

const margin = { top: 15, right: 15, bottom: 15, left: 15 }
const width = 700 - margin.left - margin.right
const height = 500 - margin.top - margin.bottom

export const boundary = {
    margin,
    width,
    height
}

export const color = ['#f05440', '#60a55c', '#925d94']

export function getCarsList(csv) {
    const list = csv.reduce((map, row) => {
        map[row.group] = true
        return map
    }, {})
    return Object.keys(list)
}

export function getAxisList(csv) {
    const list = csv.reduce((map, row) => {
        map[row.axis] = true
        return map
    }, {})
    return Object.keys(list)
}

export function getCarAxisList(csv, car) {
    const axisMap = csv
        .filter(x => x.group === car)
        .reduce((map, row) => {
            map[row.axis] = row.value
            return map
        }, {})
    return axisMap
}


export function getMaxValue(csv) {
    return max(csv, d => d.value)
}