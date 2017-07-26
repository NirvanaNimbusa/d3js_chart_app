angApp.service("columnChart",function() {


		this.buildcolumnChart = function(service,data) {

			//convertData;
			    var barData = [],
			    d3= service,
			    colorsArray = ["#807dba","#e08214","#41ab5d"],
			    total=0;
				Object.keys(data).forEach(function(key,index) {
						barData[index] = {};
						barData[index].companyName = key;
						barData[index].employeesNumber = data[key];
						barData[index].colors = colorsArray[index]
						total += barData[index].employeesNumber;
				});



				  var vis = d3.select('#visualisation'),
				    WIDTH = 500,
				    HEIGHT = 300,
				    MARGINS = {
				      top: 20,
				      right: 20,
				      bottom: 20,
				      left: 50
				    },
				    xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1).domain(barData.map(function (d) {
				      return d.companyName;
				    })),
				    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,
				      d3.max(barData, function (d) {
				        return total;
				      })
				    ]),
				    xAxis = d3.svg.axis()
				      .scale(xRange)
				      .tickSize(5)
				      .tickSubdivide(true),

				    yAxis = d3.svg.axis()
				      .scale(yRange)
				      .tickSize(5)
				      .orient("left")
				      .tickSubdivide(true);


				    //svg objects	


				  vis.append('svg:g')
				    .attr('class', 'x axis')
				    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
				    .call(xAxis);

				  vis.append('svg:g')
				    .attr('class', 'y axis')
				    .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
				    .call(yAxis);


				  vis.selectAll('rect')
				    .data(barData)
				    .enter()
				    .append('rect')
				    .attr('x', function (d) {
				      return xRange(d.companyName);
				    })
				    .attr('y', function (d) {
				      return yRange(d.employeesNumber);
				    })
				    .attr('width', xRange.rangeBand())
				    .attr('height', function (d) {
				      return ((HEIGHT - MARGINS.bottom) - yRange(d.employeesNumber));
				    })
				    .attr('class', 'charts')
				    .attr('fill', function(d) { return d.colors })


				    //labels 
				    var container =  vis.append("svg");
				    container.selectAll("text")
				        .data(barData)
				        .enter().append("text")
				        .text(function(d) {return d.employeesNumber})
				              .attr("class", "text")
				              .attr("x", function(d) {return xRange(d.companyName)+20;})
				              .attr("y", function(d) {return yRange(d.employeesNumber)+20;})
				              .attr("fill",'#fff')

				     //total label 
				     var container2 =  vis.append("svg");
				     container2.selectAll("text")
				         .data(barData)
				        .enter().append("text")
				        .text(function(d) {return "Employees hire distribution in group of total "+total})
				              .attr("class", "text")
				              .attr("x", '70')
				              .attr("y", '50')
				              .attr("fill",'#52565a')

				 }
			


});