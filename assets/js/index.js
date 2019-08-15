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

let a1 = [
    {timestamp:'2015-03-20T21:00:00.000Z', country: 'USA', population: 22, name: 'hoston joe', comments: 12, likes: 34},
    {timestamp:'2015-03-21T21:00:00.000Z', country: 'USA', population: 21, name: 'Moh Ham', comments: 60, likes: 250},
    {timestamp:'2015-03-22T21:00:00.000Z', country: 'USA', population: 24, name: 'Juston Lake', comments: 26, likes: 32},
    {timestamp:'2015-03-23T21:00:00.000Z', country: 'USA', population: 28, name: 'Juston Lake', comments: 81, likes: 87},
    {timestamp:'2015-03-24T21:00:00.000Z', country: 'USA', population: 29, name: 'Juston Lake', comments: 283, likes: 210},
    {timestamp:'2015-03-25T21:00:00.000Z', country: 'USA', population: 23, name: 'Miles joe', comments: 20, likes: 189},
    {timestamp:'2015-03-26T21:00:00.000Z', country: 'USA', population: 20, name: 'Moh Ham', comments: 189, likes: 109},
    {timestamp:'2015-03-27T21:00:00.000Z', country: 'USA', population: 25, name: 'Moh Ham', comments: 19, likes: 16},
    {timestamp:'2015-03-28T21:00:00.000Z', country: 'USA', population: 23, name: 'Juston Lake', comments: 211, likes: 57},
    {timestamp:'2015-03-29T21:00:00.000Z', country: 'USA', population: 24, name: 'hoston joe', comments: 261, likes: 86},
    {timestamp:'2015-03-30T21:00:00.000Z', country: 'USA', population: 28, name: 'Miles joe', comments: 167, likes: 125},
    {timestamp:'2015-04-01T21:00:00.000Z', country: 'USA', population: 26, name: 'hoston joe', comments: 243, likes: 278},
    {timestamp:'2015-04-02T21:00:00.000Z', country: 'USA', population: 24, name: 'Miles joe', comments: 171, likes: 31},
    
    {timestamp:'2015-03-20T21:00:00.000Z', country: 'France', population: 20, name: 'Viera Sandre', comments: 111, likes: 12},
    {timestamp:'2015-03-21T21:00:00.000Z', country: 'France', population: 19, name: 'Alison Lisa', comments: 98, likes: 29},
    {timestamp:'2015-03-22T21:00:00.000Z', country: 'France', population: 18, name: 'Mo Lesha', comments: 129, likes: 68},
    {timestamp:'2015-03-23T21:00:00.000Z', country: 'France', population: 15, name: 'Mo Lesha', comments: 10, likes: 294},
    {timestamp:'2015-03-24T21:00:00.000Z', country: 'France', population: 17, name: 'Alisha kipe', comments: 9, likes: 21},
    {timestamp:'2015-03-25T21:00:00.000Z', country: 'France', population: 18, name: 'Madison Embre', comments: 262, likes: 109},
    {timestamp:'2015-03-26T21:00:00.000Z', country: 'France', population: 18, name: 'Alisha kipe', comments: 159, likes: 176},
    {timestamp:'2015-03-27T21:00:00.000Z', country: 'France', population: 16, name: 'Alison Lisa', comments: 233, likes: 91},
    {timestamp:'2015-03-28T21:00:00.000Z', country: 'France', population: 18, name: 'Madison Embre', comments: 21, likes: 231},
    {timestamp:'2015-03-29T21:00:00.000Z', country: 'France', population: 14, name: 'Madison Embre', comments: 130, likes: 76},
    {timestamp:'2015-03-30T21:00:00.000Z', country: 'France', population: 16, name: 'Mo Lesha', comments: 211, likes: 5},
    {timestamp:'2015-04-01T21:00:00.000Z', country: 'France', population: 22, name: 'Viera Sandre', comments: 3, likes: 86},
    {timestamp:'2015-04-02T21:00:00.000Z', country: 'France', population: 19, name: 'Viera Sandre', comments: 78, likes: 139},

    {timestamp:'2015-03-20T21:00:00.000Z', country: 'Nigeria', population: 10, name: 'Soji Anu', comments: 16, likes: 212},
    {timestamp:'2015-03-21T21:00:00.000Z', country: 'Nigeria', population: 12, name: 'Soji Anu', comments: 212, likes: 21},
    {timestamp:'2015-03-22T21:00:00.000Z', country: 'Nigeria', population: 9, name: 'Olishe Raymond', comments: 187, likes: 2},
    {timestamp:'2015-03-23T21:00:00.000Z', country: 'Nigeria', population: 7, name: 'Soji Anu', comments: 36, likes: 57},
    {timestamp:'2015-03-24T21:00:00.000Z', country: 'Nigeria', population: 6, name: 'Segun Okali', comments: 92, likes: 94},
    {timestamp:'2015-03-25T21:00:00.000Z', country: 'Nigeria', population: 7, name: 'Derik Bamishaye', comments: 131, likes: 181},
    {timestamp:'2015-03-26T21:00:00.000Z', country: 'Nigeria', population: 14, name: 'Seun Leke', comments: 298, likes: 145},
    {timestamp:'2015-03-27T21:00:00.000Z', country: 'Nigeria', population: 12, name: 'Duro Jaye', comments: 188, likes: 279},
    {timestamp:'2015-03-28T21:00:00.000Z', country: 'Nigeria', population: 8, name: 'Jade Makun', comments: 259, likes: 39},
    {timestamp:'2015-03-29T21:00:00.000Z', country: 'Nigeria', population: 9, name: 'Richie Tytle', comments: 23, likes: 174},
    {timestamp:'2015-03-30T21:00:00.000Z', country: 'Nigeria', population: 9, name: 'Usman Yakubu', comments: 31, likes: 265},
    {timestamp:'2015-04-01T21:00:00.000Z', country: 'Nigeria', population: 13, name: 'Chima Kelechi', comments: 109, likes: 9},
    {timestamp:'2015-04-02T21:00:00.000Z', country: 'Nigeria', population: 10, name: 'Jade Makun', comments: 190, likes: 73},

    {timestamp:'2015-03-20T21:00:00.000Z', country: 'China', population: -9, name: 'Lee Chun', comments: 63, likes: 69},
    {timestamp:'2015-03-21T21:00:00.000Z', country: 'China', population: -10, name: 'Chung Wayne', comments: 59, likes: 164},
    {timestamp:'2015-03-22T21:00:00.000Z', country: 'China', population: -19, name: 'keng Zing', comments: 101, likes: 33},
    {timestamp:'2015-03-23T21:00:00.000Z', country: 'China', population: -17, name: 'Chun Poa', comments: 179, likes: 54},
    {timestamp:'2015-03-24T21:00:00.000Z', country: 'China', population: -5, name: 'Feng kun', comments: 209, likes: 138},
    {timestamp:'2015-03-25T21:00:00.000Z', country: 'China', population: -7, name: 'Sing Sun', comments: 271, likes: 49},
    {timestamp:'2015-03-26T21:00:00.000Z', country: 'China', population: -14, name: 'Feng kun', comments: 103, likes: 96},
    {timestamp:'2015-03-27T21:00:00.000Z', country: 'China', population: -2, name: 'Lee Chun', comments: 15, likes: 198},
    {timestamp:'2015-03-28T21:00:00.000Z', country: 'China', population: 1, name: 'Sing Sun', comments: 32, likes: 21},
    {timestamp:'2015-03-29T21:00:00.000Z', country: 'China', population: -5, name: 'Chun Poa', comments: 2, likes: 200},
    {timestamp:'2015-03-30T21:00:00.000Z', country: 'China', population: -8, name: 'Sing Sun', comments: 109, likes: 69},
    {timestamp:'2015-04-01T21:00:00.000Z', country: 'China', population: -1, name: 'Chung Wayne', comments: 9, likes: 209},
    {timestamp:'2015-04-02T21:00:00.000Z', country: 'China', population: -4, name: 'Lee Chun', comments: 36, likes: 147},
]

const options = Object.keys(a1[0])
var svg = d3.select("#buttons").selectAll('button').data(options).enter().append("button").text(d => d).append("span").text("-");

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