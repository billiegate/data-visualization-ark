var width=300, height=300
	,outerRadius = Math.min(width, height) * 0.5 - 40
    ,innerRadius = outerRadius - 7;
	
var m = [
  [11975,  5871, 8916, 2868],
  [ 1951, 10048, 2060, 6171],
  [ 8010, 16145, 8090, 8045],
  [ 1013,   990,  940, 6907]
];
//turn matrix into table
var data=[];
m.forEach(function(r,i){ r.forEach(function(c,j){ data.push([i,j,c])})});

var colors = ['#065eeb', '#9fa3aa', '#222325', "#FF0000"];

var ch = viz.ch().data(data).padding(.05)
	  	  .innerRadius(innerRadius)
	  	  .outerRadius(outerRadius)
	  	  .label(function(d){ return ""})
	  	  .startAngle(1.5*Math.PI)
	  	  .fill(function(d){ return colors[d];});

var svg = d3.select("#chord").append("svg").attr("height",height).attr("width",width);

svg.append("g").attr("transform", "translate("+width/2+","+height/2+")").call(ch);

// adjust height of frame in bl.ocks.org
d3.select(self.frameElement).style("height", height+"px").style("width", width+"px");
