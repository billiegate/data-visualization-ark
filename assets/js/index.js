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

fetch('http://localhost:8080/sample-data/rest/post', {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }

  })
    .then( function(res){
        
        res.json().then(r => {
            console.dir(r);
            let a1 = [];
            a1.push(r);
            //console.log(JSON.parse(JSON.stringify(r)))
            const options = Object.keys(a1[0]);
            var svg = d3.select("#buttons")
                .selectAll('button')
                .data(options)
                .enter()
                .append("button")
                .text(d => d)
                .append("span")
                .text("-");

            const bloggers = {}
            let highestBlogger = 0;
            let blogCount = 0;
            a1.forEach( d  => {
                if(Object.keys(bloggers).indexOf(d.name) > -1) {
                    bloggers[d.name] += 1;
                } else {
                    bloggers[d.name] = 1;
                }
                highestBlogger = bloggers[d.name] > highestBlogger ? bloggers[d.name] : highestBlogger;
                blogCount++
            })

            select('#blog-mentioned').text( highestBlogger )

            select('#post-mentioned').text( blogCount )

            const words = Object.keys(bloggers).map( v => { return {
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
            }})

            

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
                // g.append('g')
                //     .call(axisBottom(xScale))
                //     .attr('transform', `translate (0, ${areaHeight})`)
            
            g.append('text').text('Countries population')
            const nData = []
            // const nestedData = next().key( d => d.country ).entries( a1 )
            a1.forEach( cData => {
                let foundIndex = -1
                nData.forEach(( _nData, i) => {
                    if(_nData.key == cData.country){
                        foundIndex = i;
                        nData[i]['values'].push(cData)
                        return;
                    }
                })
                if(foundIndex == -1) {
                    nData.push({
                        key: cData.country,
                        values : [cData]
                    })
                }
                
            })

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


            const scattered = select('#point').append("svg").attr("height",300).attr("width",300);
            const scatteredG = scattered.append('g');
            scatteredG.append('text').text('keywords of topic 1  from last week post').attr('transform', `translate(0, 5)`)
            scatteredG.selectAll('circle')
                .data(words).enter()
                .append('circle')
                .attr("cx", d => d.comments)
                .attr("cy", d => d.likes)
                .attr("r", d => Math.abs(d.magn)/2)
                .attr('fill', '#000');

            // const words = a1.filter( d => d.population > 23);
            // console.log(words)

    })
})