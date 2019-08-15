const words = [
    {
        xpos: 2,
        ypos: 4,
        magn: 30
    },
    {
        xpos: 20,
        ypos: 23,
        magn: 30
    },
    {
        xpos: 9,
        ypos: 27,
        magn: 30
    },
    {
        xpos: 12,
        ypos: 15,
        magn: 30
    },
    {
        xpos: 13,
        ypos: 23,
        magn: 40
    },
    {
        xpos: 21,
        ypos: 14,
        magn: 20
    },
    {
        xpos: 19,
        ypos: 11,
        magn: 15
    },
    {
        xpos: 31,
        ypos: 25,
        magn: 35
    },
    {
        xpos: 24,
        ypos: 5,
        magn: 22
    },
    {
        xpos: 25,
        ypos: 7,
        magn: 20
    },
]
var width=300, height=300
const svg = d3.select('#word').append("svg").attr("height",height).attr("width",width);
svg.selectAll('g')
    .data(words).enter()
    .append('g')
    .attr("transform", d => `translate (${d.xpos * 10}, ${d.ypos * 10})`)
    .append('text')
    .text('word')
    .attr('style', d => 'font-size:' + d.magn + 'px')
    .attr('class', 'words');

