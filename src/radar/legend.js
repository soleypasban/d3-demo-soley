import { color, boundary, getCarsList } from "./utils"

const size = 15
const padding = 10

const addLegendRows = (group, labels, events, svgProps) => {

    labels.forEach((label, labelIndex) => {

        // .merge([])
        // .style("fill-opacity", isSelected ? 1 : 0.5)

        const row = group
            .selectAll(".legend-box")
            .data([null])
            .enter()
            .append('g')
            .attr('transform', `translate(0, ${labelIndex * (size + padding)})`)
            .on('mouseover', e => events && events.onMouseOver(e, labelIndex))

        const isSelected = (svgProps.selectedIndex === labelIndex) ? ' c-selected ' : ''

        row.append('rect')
            .attr('class', 'legend-mark' + isSelected)
            .style('fill', color[labelIndex])
            .style("stroke", color[labelIndex])
            .style("stroke-width", 1)
            .style('rx', '2')

        row.append('text')
            .attr('class', 'legend-text' + isSelected)
            .attr('x', size + padding / 2)
            .attr('y', (size + padding) / 2)
            .text(label);
    });
}

const getLegendBox = svg => {
    const x = boundary.width - 110
    const y = boundary.margin.top + 10
    const group = svg
        .selectAll(".legend-box")
        .data([null])
        .enter()
        .append('g')
        .attr('class', 'legend-box')
        .attr('transform', `translate(${x}, ${y})`)

    return group
}

export function renderLegend(csv, svg, events, svgProps) {
    const cars = getCarsList(csv)
    addLegendRows(getLegendBox(svg), cars, events, svgProps)
}