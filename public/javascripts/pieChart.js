angApp.service("pieChart",function() {

		this.buildPie = function(service,data) {

				
				var w = 300,  
				h = 300,                           
				r = 150, 
				dataConverted = [],
				d3 = service,
				total = 0,
				index=0;

				//convert data;	
				Object.keys(data).forEach(function(key,index) {
						dataConverted[index] = {};
						dataConverted[index].company = key;
						dataConverted[index].employeesNb = data[key];
						dataConverted[index].em_percentage = function () {
							total += dataConverted[index].employeesNb;
							if(index == 2){
								for(s=0;s<=index;s++){ dataConverted[s].percentage = (dataConverted[s].employeesNb/total *100).toFixed(1); }
							}
						};
						dataConverted[index].em_percentage();
				});

			    data = [{"label":dataConverted[0].percentage.toString(), "value":dataConverted[0].percentage, "color":"#807dba",company:dataConverted[0].company},
			            {"label":dataConverted[1].percentage.toString(), "value":dataConverted[1].percentage, "color":"#e08214",company:dataConverted[1].company}, 
			            {"label":dataConverted[2].percentage.toString(), "value":dataConverted[2].percentage, "color":"#41ab5d",company:dataConverted[2].company}];
			    
			    var vis = d3.select("#pie")
			        .append("svg:svg")              
			        .data([data])                   
			            .attr("width", w)           
			            .attr("height", h)
			        .append("svg:g")                
			            .attr("transform", "translate(" + r + "," + r + ")");   

			    var arc = d3.svg.arc().outerRadius(r);
			    var pie = d3.layout.pie().value(function(d) { return d.value; });    

			    var arcs = vis.selectAll("g.slice")     
			        .data(pie)                          
			        .enter()                            
			        .append("svg:g")                
			           .attr("class", "slice");    

			        arcs.append("svg:path")
			            .attr("fill", function(d,i) { return data[i].color;} ) 
			            .attr("d", arc);                                    

			        arcs.append("svg:text")                                     
			            .attr("transform", function(d) {                    
				                d.innerRadius = 0;
				                d.outerRadius = r;
				                return "translate(" + arc.centroid(d) + ")";        
			         		})
			            .attr("text-anchor", "middle") 
			            .attr("fill",'#fff')                         
			            .text(function(d, i) { return data[i].label + "%"; });        



			/*********** function to handle legend. *********/

			    function legend(lD){
			            
			        var legend = d3.select("#pie").append("table").attr('class','legend');
			        var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");

			        tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
			            .attr("width", '16').attr("height", '16')
						.attr("fill",function(d, i) { return data[i].color });  
			        tr.append("td").text(function(d, i) { return "-->"+data[i].company+" ";  });
			        tr.append("td").attr("class",'legendPerc')
			             .text(function(d, i) { return "-->"+data[i].value + " % "; }); 

			        return leg;
			    }
			     var leg= legend(data);  


			     /***********/

		}
});