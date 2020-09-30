import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3'
import { renderLegend } from './radar/legend';
import { renderGrid } from './radar/grid';
import { values } from './radar/values';
import { boundary } from './radar/utils';


export const Application = () => {
    const ref = useRef()
    const [data, setData] = useState(null)
    const [svgProps, setSvgProps] = useState({})

    const fetchData = () => {
        d3
            .csv('./data/car-rating.csv')
            .then(data => {
                data.forEach(rating => rating.value = +rating.value)
                setData(data)
            })
    }

    const events = {
        onMouseOver: (e, selectedIndex) => {
            e.stopPropagation()
            setSvgProps(prev => ({ ...prev, selectedIndex }))
        }
    }

    const renderData = () => {
        if (data) {
            const svg = d3.select(ref.current)
            svg.selectAll('g').remove()
            renderGrid(data, svg)
            renderLegend(data, svg, events, svgProps)
            values(data, svg, events, svgProps)
        }
    }

    useEffect(fetchData, [])
    useEffect(renderData, [data, svgProps])

    return (
        <div className='dark-theme'>
            <div className='demo-svg-title'>D3 Demo in React - Soley</div>
            <svg
                onMouseOver={() => setSvgProps({})}
                style={{
                    width: boundary.width,
                    height: boundary.height
                }} className='d-svg' ref={ref} />
        </div>
    )

}