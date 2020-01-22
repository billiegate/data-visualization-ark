'use-strict'
// import { selectorAll } from './d3.js'
const selectAll = d3.selectAll
const select = d3.select
const scaleLinear = d3.scaleLinear
const scaleTime = d3.scaleTime
const max = d3.max
const extent = d3.extent
const axisLeft = d3.axisLeft
const axisBottom = d3.axisBottom
const format = d3.format
const area = d3.area
const line = d3.line
const curveBasis = d3.curveBasis
const next = d3.next
const json = d3.json
// const scaleOrdinal = d3.scaleOrdinal
// const schemeCategory10 = d3.schemeCategory10

const svgArea = select('svg')
const width = +svgArea.attr('width')
const height = +svgArea.attr('height')
const margin = {top: 20, left: 0, bottom: 10, rigth: 50}
const areaHeight = height - margin.top - margin.bottom
const areaWidth = width - margin.left - margin.rigth
// const width=300
// const height=300

let a1 = []; //to hold dummy data
let words =  []; //
let bloggers = {}
let highestBlogger = 0;


const updateStat = () => {
    bloggers = a1.reduce((blogers, blog, i) => {
        blogers[blog.name] = Object.keys(blogers).indexOf(blog.name) > -1 ? blogers[blog.name] + 1: 1;
        highestBlogger = blogers[blog.name] > highestBlogger ? blogers[blog.name] : highestBlogger;
        return blogers
    }, {});
    select('#blog-mentioned').text( highestBlogger )
    select('#post-mentioned').text( a1.length )
}

const buildOptions = () => {
    let excluded = ['id', 'timestamp', 'likes'];
    const options = Object.keys(a1[0]).filter((menu) => {
        return !excluded.includes(menu)
    })
    select("#buttons")
        .selectAll('button')
        .data(options).enter()
        .append("button")
        .text(d => d).append("span").text("-");
}


const prepWord = () => {
    words =  Object.keys(bloggers).map( v => { return {
        'xpos': bloggers[v], 
        'magn': Object.values(a1).reduce( (r, d) => {
                if(d.name == v) {
                    r = d.population
                }
                return r
            }),
        'comments': Object.values(a1).reduce( (r, d) => {
                if(d.name == v) {
                    r = d.comments
                }
                return r
            }),
        'likes': Object.values(a1).reduce( (r, d) => {
                if(d.name == v) {
                    r = d.likes
                }
                return r
            }),
        }
    })
}


const constructAreaChat = () => {
    const xValue = d => new Date(d.timestamp)
    const yValue = d => d.population

    const yScale = scaleLinear()
        .domain(extent(a1, yValue ))
        .range([areaHeight, 0])
    const xScale = scaleTime()
        .domain( extent(a1, xValue ))
        .range([0, areaWidth])
            
    const g = svgArea.append('g')
        .attr('transform', `translate (${margin.rigth}, ${margin.top})`)
            
    g.append('g')
        .call(axisLeft(yScale).tickSize(-areaWidth))
        .selectAll('path')
        .remove()
                    
    g.append('text').text('Topics trends of post Week')
    
    let found_keys = [];
    const nData = a1.reduce((t, v, i) => {
        if(found_keys.includes(v.country)) {
            let _i = found_keys.indexOf(v.country)
            t[_i]['values'].push(v)
        } else {
            found_keys.push(v.country)
            t.push({key:v.country, values: [v]})
        }
        return t;
    }, []);
    
    let indX = 0;
    let nIndV = [];
    const yArea0 = d => yScale(nIndV[nData[indX+1].values.indexOf(d)]['population'])
    const yArea1 = d => yScale(yValue(d))
    const areaColors = ['#065eeb', '#9fa3aa', '#222325']
    
    const lg = area()
        .x(d => xScale( xValue(d)))
        .y0(yArea0)
        .y1(yArea1)
        .curve(curveBasis)
        
    // const colorScheme = scaleOrdinal(schemeCategory10).domain(nData.map( d => d.key))
    
    g.selectAll('.line-path')
        .data(nData)
        .enter()
        .append('path')
        .attr('d', (d, i) => { 
            indX = i - 1
            if(i > 0){
                nIndV = nData[indX]['values'];
                return lg(d.values)
            }
        })
        .attr('class', 'sline')
        .attr('fill', (d, i) => areaColors[i-1])
}


const constructScatterChat = () => {
    const scattered = select('#point').append("svg").attr("height",300).attr("width",300);
    const scatteredG = scattered.append('g');
    scatteredG.append('text').text('Posts from topic 1 of past week').attr('transform', `translate(0, 15)`)
    const circleG = scattered.append('g').attr('transform', `translate(0, 35)`);
    circleG.selectAll('circle')
        .data(words).enter()
        .append('circle')
        .attr("cx", d => d.comments)
        .attr("cy", d => d.likes)
        .attr("r", d => Math.abs(d.magn)/2)
        .attr('fill', '#000');
}
		

fetch('http://localhost:8080/post', {
    headers: {
        "content-type": "application/json"
    }
  })
    .then( function(res){
        res.json().then(r => {
            a1 = r
            console.log(a1)
            buildOptions()
            updateStat();
            prepWord()
            constructAreaChat()
            constructScatterChat()
    });
});