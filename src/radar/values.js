import { boundary, getAxisList, getCarAxisList, getCarsList, color, getMaxValue, gridSize } from "./utils"

export function values(csv, svg, events, svgProps) {

    const cars = getCarsList(csv)
    const axis = getAxisList(csv)
    const maxRadius = getMaxValue(csv)

    const centerX = boundary.width / 2 - gridSize / 2.5
    const centerY = boundary.height / 2

    const group = svg
        .selectAll(".grid-value-box")
        .data([null])
        .enter()
        .append('g')
        .attr('class', 'grid-value-box')
        .attr("transform", `translate(${centerX}, ${centerY})`)

    const lineXAtIndex = (radius, index) => (radius * gridSize) * Math.sin(index * 2 * Math.PI / axis.length)
    const lineYAtIndex = (radius, index) => (radius * gridSize) * Math.cos(index * 2 * Math.PI / axis.length)


    const getCarPathD = car => {
        const axisValues = getCarAxisList(csv, car)
        const getValueForAxis = index => axisValues[axis[index % axis.length]] / maxRadius

        const joints = axis.map((_, i) => {
            const x = lineXAtIndex(getValueForAxis(i), i)
            const y = lineYAtIndex(getValueForAxis(i), i)
            return ` ${x} ${y} `
        })

        return `m ${joints[0]} ${joints.map(x => `L ${x}`).join(' ')} Z`
    }

    cars.forEach((car, carIndex) => {
        const axisValues = getCarAxisList(csv, car)
        const getValueForAxis = index => axisValues[axis[index % axis.length]] / maxRadius

        const isSelected = (svgProps.selectedIndex === carIndex) ? ' c-selected ' : ''

        group
            .append("path")
            .attr("d", getCarPathD(car))
            .attr("class", "value-line" + isSelected)
            .style("stroke", color[carIndex])
            .style("fill", color[carIndex])
            .on('mouseover', e => events && events.onMouseOver(e, carIndex))

        group.append('g')
            .selectAll(".value-line-joint")
            .data(axis)
            .enter()
            .append("circle")
            .attr("cx", (_, i) => lineXAtIndex(getValueForAxis(i), i))
            .attr("cy", (_, i) => lineYAtIndex(getValueForAxis(i), i))
            .attr("r", 5)
            .attr("class", "value-line-joint" + isSelected)
            .style("stroke", color[carIndex])
            .style("stroke-width", 1)
            .style("fill-opacity", 0.8)
            .style("fill", color[carIndex])

    })


}