import { boundary, getAxisList, gridSize } from "./utils"


export function renderGrid(csv, svg) {
    const axis = getAxisList(csv)
    const centerX = boundary.width / 2 - gridSize / 2.5
    const centerY = boundary.height / 2

    const lineXAtIndex = (radius, index) => (radius * gridSize) * Math.sin(index * 2 * Math.PI / axis.length)
    const lineYAtIndex = (radius, index) => (radius * gridSize) * Math.cos(index * 2 * Math.PI / axis.length)

    const group = svg
        .selectAll(".grid-box")
        .data([null])
        .enter()
        .append('g')
        .attr('class', 'grid-box')
        .attr("transform", `translate(${centerX}, ${centerY})`)


    for (let radius = 0; radius <= 1; radius += 0.2) {
        group.append('g')
            .selectAll("line")
            .data(axis)
            .enter()
            .append("line")
            .attr("x1", (_, i) => lineXAtIndex(radius, i))
            .attr("y1", (_, i) => lineYAtIndex(radius, i))
            .attr("x2", (_, i) => lineXAtIndex(radius, i + 1))
            .attr("y2", (_, i) => lineYAtIndex(radius, i + 1))
            .attr("class", "grid-line")
            .style("stroke", "#707080")
            .style("stroke-opacity", "0.5")
            .style("stroke-width", 1)
    }

    group.append('g')
        .selectAll("line")
        .data(axis)
        .enter()
        .append("line")
        .attr("x1", (_, i) => lineXAtIndex(0, i))
        .attr("y1", (_, i) => lineYAtIndex(0, i))
        .attr("x2", (_, i) => lineXAtIndex(1, i))
        .attr("y2", (_, i) => lineYAtIndex(1, i))
        .attr("class", "grid-line")
        .style("stroke", "#707080")
        .style("stroke-opacity", "0.5")
        .style("stroke-width", 1)

    const textRadius = 1 + 0.2

    group.selectAll(".grid-text")
        .data(axis)
        .enter()
        .append('text')
        .attr("class", 'grid-text')
        .attr("x", (_, i) => lineXAtIndex(textRadius, i))
        .attr("y", (_, i) => lineYAtIndex(textRadius, i))
        .text(d => d)

}