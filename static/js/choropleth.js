//console.log(window.location.pathname)
//var data=d3.json("/cat_neighborhood").then(function(data) {
 // console.log(data);
//});



function initialize()
{
    var select=d3.select("#selDataset");
    d3.json("/cat_neighborhood").then(function(data) {
        dataset=data.res
        let neighborhood_option=[]
        for (let i = 0; i < dataset.length; i++){
            let data_res=dataset[i]
          if(neighborhood_option.includes(data_res.neighborhood)==false){
             neighborhood_option.push(data_res.neighborhood)
            }
        }
        //console.log(neighborhood_option)  

        neighborhood_option.forEach(function(sample){
            select.append("option")
            .text(sample)
            .property("value",sample)
        });
        
        let sample1=neighborhood_option[0];
        
        bar_building(sample1);
        bubble_building(sample1);
        pie_building(sample1);
        line_building(sample1);
        Gauge_building(sample1);
        
        
    });
    
    
    

}
function optionChanged(item){
    
   
    bar_building(item)
    bubble_building(item)
    pie_building(item)
    line_building(item)
    Gauge_building(item);
   
}


function Gauge_building(sample){
  d3.json("/year_neighborhood").then(function(data) {
       
    let result=data.res.filter(sample_res => sample_res.neighborhood==sample)
    console.log(data)
    var sum=0;
    for (let i = 0; i < result.length; i++){
        let data_res=result[i]
        if (data_res.occur_year=="2022")
            sum+= data_res.occur_count
    }
    console.log(sum)
    let value=sum;
    // Gauge chart 
    var Gauge_chart = [
      {
        type: "indicator",
        mode: "gauge+number+delta",
        value: value,
        title: { text: "Number of crime in year 2022", font: { size: 20 } },
        //delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
        gauge: {
          axis: { range: [null, 400], tickwidth: 2, tickcolor: "black" },
          bar: { color: "#03045e" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "black",
          steps: [
            { range: [0, 40], color: "#3FC1C0" },
            { range: [40, 80], color: "#20BAC5"},
            { range: [80, 120], color: "#00B2CA" },
            { range: [120,160], color: "#04A6C2"},
            { range: [160, 200], color: "#0899BA" },
            { range: [200, 240], color: "#0F80AA"},
            { range: [240, 280], color: "#16679A"},
            { range: [280,320], color: "#1A5B92" },
            { range: [320, 360], color: "#1C558E"},
            { range: [360, 400], color: "#1D4E89"},
          ],
          
        }
      }
    ];
    var layout = {
            
      margin: { t: 45, r: 45, l: 45, b: 5 },
  
      
    };
    var config = {responsive: true}
    Plotly.newPlot('gauge', Gauge_chart, layout ,config);


  })
  
  
  
}


function bar_building(sample){
    d3.json("/cat_neighborhood").then(function(data) {
        
        //let res=mdata.filter(function(sample_res){sample_res.id==sample});
        let result=data.res.filter(sample_res => sample_res.neighborhood==sample)
        
        Jan_sum=0;
        Feb_sum=0;
        Mar_sum=0;
        Apr_sum=0;
        May_sum=0;
        Jun_sum=0;
        Jul_sum=0;
        Aug_sum=0;
        Sep_sum=0;
        Oct_sum=0;
        Nov_sum=0;
        Dec_sum=0;
        for (let i = 0; i < result.length; i++){
            let data_res=result[i]
            if (data_res.occur_month=="January"){
                Jan_sum+= data_res.occur_count
            }
            else if(data_res.occur_month=="February"){
                Feb_sum+= data_res.occur_count}
            else if(data_res.occur_month=="March"){
                Mar_sum+= data_res.occur_count}
            else if(data_res.occur_month=="April"){
                Apr_sum+= data_res.occur_count}
            else if(data_res.occur_month=="May"){
                May_sum+= data_res.occur_count}
            else if(data_res.occur_month=="June"){
                Jun_sum+= data_res.occur_count}
            else if(data_res.occur_month=="July"){
                Jul_sum+= data_res.occur_count}
            else if(data_res.occur_month=="August"){
                Aug_sum+= data_res.occur_count}
            else if(data_res.occur_month=="September"){
                Sep_sum+= data_res.occur_count}
            else if(data_res.occur_month=="October"){
                Oct_sum+= data_res.occur_count}
            else if(data_res.occur_month=="November"){
                Nov_sum+= data_res.occur_count}
            else if(data_res.occur_month=="December"){
                Dec_sum+= data_res.occur_count}
            
        }
    
        let ids=["January","February","March","April","May","June","July","August","September","October","November","December"]
        let values=[Jan_sum,Feb_sum,Mar_sum,Apr_sum,May_sum,Jun_sum,Jul_sum,Aug_sum,Sep_sum,Oct_sum,Nov_sum,Dec_sum]
        let labels=ids;
        

        //barchart
        let yticks=ids.map(function(id){
            return `${id}`
        });

        let x_values=values;
        let text_labels=labels;

        let bar_chart={
            y:yticks.reverse(),
            x:x_values.reverse(),
            text:text_labels.reverse(),
            type:"bar",
            orientation:"h",
            mode:"markers",
            marker:{
              
              //color:x_values,
              //colorscale:
              color:["#1D4E89","#1C558E","#1A5B92","#16679A","#0F80AA","#0899BA","#04A6C2","#00B2CA","#20BAC5","#3FC1C0","#72efdd","#80ffdb"]
          }
        }

        let layout={
            margin: { t: 55, r: 25, l: 65, b: 25 },
            title:"Crime by month"
        };
        var config = {responsive: true}

        Plotly.newPlot("bar",[bar_chart],layout,config);

    });
}
//Bubble chart function
function bubble_building(sample){
    d3.json("/cat_neighborhood").then(function(data) {
        
        let result=data.res.filter(sample_res => sample_res.neighborhood==sample)
        function func(catg,year){
          x=result.filter(sample_res => sample_res.crime_type==catg)
          x_year=x.filter(sample_res => sample_res.occur_year==year)
          sum=0
          for (let i = 0; i < x_year.length; i++){
            date_res=x_year[i]
            sum+=date_res.occur_count 
          }
          return sum
        }
        //console.log(data)

        function trace_maker(catg,color){
          var x=[...Array(14).keys()].map(i => i + 2009)
          var y=[func(catg,2009),func(catg,2010),func(catg,2011),func(catg,2012),func(catg,2013),func(catg,2014),func(catg,2015),func(catg,2016),func(catg,2007),func(catg,2018),func(catg,2019),func(catg,2020),func(catg,2021),func(catg,2022)]
          //var sizeref = 30.0 * Math.max(...y)
          var trace={
          x:x, 
          y:y,
          name: catg,
          text:catg,
          mode: 'markers',
          marker: {
          color:color,
          size: [func(catg,2009)/20,func(catg,2010)/20,func(catg,2011)/20,func(catg,2012)/20,func(catg,2013)/20,func(catg,2014),func(catg,2015)/20,func(catg,2016)/20,func(catg,2007)/20,func(catg,2018)/20,func(catg,2019)/20,func(catg,2020)/20,func(catg,2021)/20,func(catg,2022)/20],
          sizeref: .2,
         // sizemode: 'area'

       }}
        return trace;
  };

                var color=["#1D4E89","#1C558E","#1A5B92","#16679A","#0F80AA","#0899BA","#04A6C2","#00B2CA","#20BAC5","#3FC1C0","#72efdd","#80ffdb"]

               var traces = [trace_maker('AGG ASSAULT',color[0]), trace_maker('LARCENY-NON VEHICLE',color[1]),trace_maker('AUTO THEFT',color[2]),trace_maker('ROBBERY',color[3])
               ,trace_maker('BURGLARY',color[4]),trace_maker('LARCENY-FROM VEHICLE',color[5]), trace_maker('HOMICIDE',color[6]),
               trace_maker('MANSLAUGHTER',color[7]), trace_maker('ROBBERY-PEDESTRIAN',color[8]),trace_maker('ROBBERY-RESIDENCE',color[9]), trace_maker('BURGLARY-RESIDENCE',color[10])
              ,trace_maker('BURGLARY-NONRES',color[11]), trace_maker('ROBBERY-COMMERCIAL',color[12])];

                let layout={
                 margin: { t: 55, r: 35, l: 55, b: 65 },
                    title:"Number of crime per Category",
                   hovermode:"closest",
                xaxis:{title:"years"},
                yaxis:{title:"Crime_number"},       
        };
        var config = {responsive: true}
        Plotly.newPlot("bubble",traces,layout,config);

    });
}

function pie_building(sample){
  d3.json("/cat_neighborhood").then(function(data) {
     
      let result=data.res.filter(sample_res => sample_res.neighborhood==sample)
      function func1(catg){
        x=result.filter(sample_res => sample_res.crime_type==catg)
        sum=0
        for (let i = 0; i < x.length; i++){
            date_res=x[i]
            sum+=date_res.occur_count 
          }
        return sum  
      }

      crime_num=[func1("AGG ASSAULT"),func1("LARCENY-NON VEHICLE"),func1("AUTO THEFT"),func1("ROBBERY"),func1("BURGLARY")
      ,func1("LARCENY-FROM VEHICLE"),func1("HOMICIDE"),func1("MANSLAUGHTER"),func1("ROBBERY-PEDESTRIAN"),func1("BURGLARY-RESIDENCE")
      ,func1("BURGLARY-NONRES"),func1("ROBBERY-COMMERCIAL")]

      crime_type_list=["AGG ASSAULT","LARCENY-NON VEHICLE","AUTO THEFT","ROBBERY","BURGLARY"
      ,"LARCENY-FROM VEHICLE","HOMICIDE","MANSLAUGHTER","ROBBERY-PEDESTRIAN","BURGLARY-RESIDENCE"
      ,"BURGLARY-NONRES","ROBBERY-COMMERCIAL"]

      

      let Pie_chart={
              type: "pie",
              values:crime_num,
              labels:crime_type_list,
              //hole:.25,
              //pull: [0.1, 0, 0, 0, 0],
              //direction: 'clockwise',
              //automargin: true,
              textinfo: "percent",
              mode: 'markers',
              //colors: ["#1D4E89","#16679A","#1C658C","398AB9","398AB9","#005073","#107dac","#189ad3","#90e0ef","#04A6C2","#0899BA","#1ebbd7"],
              marker:{
            
                //color:crime_num,
                //colorscale:
                color:["#1D4E89","#1C558E","#1A5B92","#16679A","#0F80AA","#0899BA","#04A6C2","#00B2CA","#20BAC5","#3FC1C0","#72efdd","#80ffdb"]
            },
              //domain: {
               // row: 0,
               // column: 0
              //},
              
              insidetextorientation: "radial"}

      

      let layout={
                  margin: { t: 30, r: 50, l: 60, b:165 },
                     title:"Crime ctegory in neighborhood",
                     hovermode:"closest"}
          
      var config = {responsive: true}
      Plotly.newPlot("pie-ch",[Pie_chart],layout,config);        

      
  

  });
}


    



function line_building(sample){
    d3.json("/year_neighborhood").then(function(data) {
       
        let result=data.res.filter(sample_res => sample_res.neighborhood==sample)
        console.log(result)
        let years=[...Array(14).keys()].map(i => i + 2009);
        let crime_num=[]
        for (let i = 0; i < result.length; i++){
          let data_res=result[i]
          crime_num.push(data_res.occur_count)}


        let line_chart={
                type: "line",
                y:crime_num,
                x:years,
                automargin: true,
                mode: 'lines+markers',
                marker: {
                  color: '#1C658C',
                  size: 8
                },
                line: {
                  color: '#1C658C)',
                  width: 1
                },
                insidetextorientation: "radial"}


        

        let layout={
                     margin: { t: 45, r: 35, l: 45, b: 35 },
                       //title:"Crime ctegory in neighborhood",
                       hovermode:"closest",
                       
                       
                   xaxis:{title:"Year"},
                   yaxis:{title:"Crime_count"},
                   title: {
                    text:'Crime History',
                    font: {
                      
                      size: 24
                    },
                    xref: 'paper',
                    x: 0.05,
                  }}
            
        var config = {responsive: true}
        Plotly.newPlot("line",[line_chart],layout,config);        

        
    

    });
}


    
      
      
     
  
  
   

initialize();




  
  