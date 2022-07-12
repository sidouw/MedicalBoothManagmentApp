import React,{useRef,useEffect} from 'react';
import * as d3 from "d3";



export default function BarChart({width = 600,height=355,data}) {

    const d3svg = useRef(null)
    const d3chart = useRef(null)
    const rendered = useRef(null)
    rendered.current = false

    const margin = { top: 10, bottom: 22, left: 0, right: -10 };
    const colors = d3.scaleOrdinal(d3.schemeCategory10)
 
    const transDuration = 800
    

    const x = d3.scaleBand()
                .domain(d3.range(data.length))
                .range([margin.left, width - margin.right])
                .padding(0.1)

    const y = d3.scaleLinear()
        .domain([0, d3.max(data.map((d)=>parseInt(d.value)))])
        .range([height - margin.bottom, margin.top])

    const yAxis = (g)=> {
        g.attr("transform", `translate(${margin.left}, 0)`)
        .attr("class", "y axis")
        .call(d3.axisLeft(y).ticks(null, data.format))
        .attr("font-size", '15px')
    }
    
    const  xAxis = (g)=> {
        g.attr("transform", `translate(0,${height - margin.bottom})`)
        .attr("class", "x axis")
        .call(d3.axisBottom(x).tickFormat(i => data[i].lable))
        .attr("font-size", '15px')
    }

    const update = ()=>{
        const svg = d3.select(d3svg.current)
            y
            .domain([0, d3.max(data.map((d)=>parseInt(d.value)))])
            x
            .domain(d3.range(data.length))
    
            svg.select(".y")
                .transition()
                .duration(transDuration-400)
                .call(yAxis);   

            svg.select(".x")
                .transition()
                .duration(transDuration-400)
                .call(xAxis); 

            
            d3.select(d3chart.current)
            .selectAll('rect')
            .data(data)
            .join(
              function(enter) {
                return enter.append('rect')
                            .attr("x", (d, i) => x(i))
                            .attr("y", d =>y(0))
                            .attr('title', (d) => 20)
                            .attr("class", "rect")
                            .attr("height", d =>  y(0) - y(0))
                            .attr("width",x.bandwidth())
                            .attr("fill",(d,i)=>colors(i))
              },
              function(update) {
                // return update.style('opacity', 1);
              },
              function(exit) {
                return exit
                .remove();
              }
            )
    
            svg
            .selectAll("rect")
            .transition()
            .duration(transDuration)
            .attr("y", d => y(d.value))
            .attr("x", (d, i) => x(i))
            .attr("height", d => y(0) - y(d.value))
            .attr("width",x.bandwidth())
    
    }


    useEffect(()=>{
            const svg = d3.select(d3svg.current)
                .attr('width', width - margin.left - margin.right)
                .attr('height', height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height])

            svg.append("g").call(xAxis);
            svg.append("g").call(yAxis);
    },[])
    useEffect(() => {
      update()
    }, [data]);
    
    return <>  <div > <svg  ref={d3svg} > <g ref={d3chart}></g></svg> </div></>;


}
