
function map_building(){
  d3.json("/MapAPI").then(function(res){

    let data=res.res.filter(sample_res => sample_res.occur_year=="2022")
    let data2=data
    for (let i = 0; i < data.length; i++){
    delete data2[i].occur_year;}
    
    

      function npu_bielder(x){
  
        id=res.res.filter(sample_res => sample_res.npu==x)
        crime_count=[]
        let years=[...Array(14).keys()].map(i => i + 2009);
        for (let i = 0; i < id.length; i++){
          let data_res=id[i]
          crime_count.push(data_res.occur_count)};
        return {npu:x,crime_count:crime_count}
      }
  

      //var mapData =  d3.json("/static/js/map.json")
      //console.log(npus)
      let categories=[...Array(14).keys()].map(i => i + 2009);
      var npus = [],
      mapChart,
      countryChart
      for (let i = 0; i < data.length; i++){
        let data_res=data[i].npu
        npus[data_res]=npu_bielder(data_res)//.push({data_res:npu_bielder(data_res)})
      }

      console.log(npus)
      
      //mapData.forEach(function (np) {
       // country.id = np.properties['hc-key']; // for Chart.get()
     // });

     //var np
      Highcharts.wrap(Highcharts.Point.prototype, 'select', function (proceed) {

        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
  
        var points = mapChart.getSelectedPoints();
        if (points.length) {
          if (points.length === 1) {
            document.querySelector('#info1 #flag')
              
            document.querySelector('#info1 h2').innerHTML = points[0].npu;
          } else {
            document.querySelector('#info1 #flag')
              .className = 'flag';
            document.querySelector('#info1 h2').innerHTML = 'Comparing NPUs';
  
          }
          document.querySelector('#info1 .subheader')
            .innerHTML = '<h4>Historical Crime</h4><small><em>Shift + Click on map to compare NPUs</em></small>';
  
          if (!countryChart) {
            countryChart = Highcharts.chart('country-chart', {
              chart: {
                height: 250,
                spacingLeft: 10
              },
              credits: {
                enabled: false
              },
              title: {
                text: null
              },
              subtitle: {
                text: null
              },
              xAxis: {
                tickPixelInterval: 70,
                crosshair: true
              },
              yAxis: {
                title: null,
                opposite: true
              },
              tooltip: {
                split: true
              },
              plotOptions: {
                series: {
                  animation: {
                    duration: 500
                  },
                  marker: {
                    enabled: false
                  },
                  threshold: 0,
                  pointStart: parseInt(categories[0], 10)
                }
              }
            });
          }
  
          countryChart.series.slice(0).forEach(function (s) {
            s.remove(false);
          });
          points.forEach(function (p) {
            countryChart.addSeries({
              name: p.npu,
              data: npus[p.npu].crime_count,
              type: points.length > 1 ? 'line' : 'area'
            }, false);
          });
          countryChart.redraw();
  
        } else {
         
          document.querySelector('#info h2').innerHTML = '';
          document.querySelector('#info .subheader').innerHTML = '';
          if (countryChart) {
            countryChart = countryChart.destroy();
          }
        }
      });
  
      // Initiate the map chart
      mapChart = Highcharts.mapChart('atlanta', {
  
        title: {
          text: 'Crime history by NPU'
        },
  
        subtitle: {
          text: 'Source: <a href="https://www.atlantapd.org/i-want-to/crime-data-downloads">Atlanta Police Department</a>'
        },
  
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: 'bottom'
          }
        },
  
        colorAxis: {
          type: 'logarithmic',
          color:'#288da3',
          endOnTick: false,
        startOnTick: false,
        min: 1
          
        },
        color: '#288da3',
  
        tooltip: {
          formatter: function () {
            return '<br>NPU: ' +this.point.npu + (
              this.point.occur_count ?
              '<br>Number of crime: ' + this.point.occur_count  : ''
            );
          }
        },
  
        series: [{
          data: data,
          mapData:  [
            {
              "id": "id0",
              "npu": "Q",
              "path": "M32,193,32,189,29,189L29,183L21,180,16,182,17,185,18,186,18,187,9,187,9,195,15,195,15,193,18,192,19,188,21,188,20,189L21,189L21,194zM22,208,13,209L13,205L22,205zM35,180L36,180L36,183L33,182,33,183,31,182,32,181,30,180,30,177z"
            },
            {
              "id": "id1",
              "npu": "X",
              "path": "M106,215,107,214,108,204,112,194,115,194L115,191L118,193,122,195,128,195,133,196,129,205,127,209,128,214,126,217,127,221,132,226,131,232,132,235,133,239,132,240,115,240,115,236,118,236L118,232L116,232,116,222,118,222,118,217,106,217zM107,256,109,255,109,254,113,254,113,255,114,257,114,264,107,264z"
            },
            {
              "id": "id2",
              "npu": "A",
              "path": "M89,49,95,43,98,44,99,42,101,42,102,42,103,44L107,44L108,41,109,43L112,43L125,43,125,39,126,39,127,37,129,35,130,36,130,41,131,41,131,43,133,42,133,44,139,44,137,42,138,40,134,35,137,36,141,41,141,43,141,46,141,58,142,60L142,63L145,65,145,69,143,69,140,73,133,75,134,78,131,76,126,75,117,81,109,75,107,75L107,81L108,84,109,87,109,89,109,90,106,90,99,92,99,93,101,95,99,96,96,94,96,91,96,90,95,88,94,89,92,92,93,93,92,94,90,95,89,93L86,93L87,91,81,81,82,77,84,72,82,68,87,62,86,58,85,55,89,52z"
            },
            {
              "id": "id3",
              "npu": "B",
              "path": "M141,43,147,44,155,43,157,43,158,41,160,41,161,45,163,45,163,43,165,44,167,44,167,40,172,40L172,43L170,44,172,45,172,95,163,97,160,102,155,102,153,104,149,103,141,107,136,106,139,103,140,100,136,97,135,94,135,91,136,88,134,87,133,83,133,80,134,78,133,75,140,73,143,69,145,69,145,65C145,65,142,63,142,63L142,60L141,58z"
            },
            {
              "id": "id4",
              "npu": "C",
              "path": "M136,106,139,103,140,100,136,97,135,94,135,91,136,88,134,87,133,83,133,80,134,78,131,76,126,75,117,81,109,75,107,75L107,81L108,84,109,87,109,90,106,90,99,92,99,93,101,95,99,96,96,94,96,91,96,90,95,88,94,89,92,92,93,93,92,94,90,95,89,93L86,93L84,95C84,95,85,96,85,97,85,97,89,100,89,100L92,103,95,103,96,101,100,103,101,104,101,101,100,100,101,99,106,102,111,106,112,108,108,107,111,109,117,110,117,112,122,114,126,117,129,114,132,110z"
            },
            {
              "id": "id5",
              "npu": "F",
              "path": "M172,95,172,114,180,114,180,119,177,123,174,122,174,126,171,127L171,135L173,135,173,138,171,144,158,144,159,141,154,133,154,129,155,127,149,111,148,109,151,104,153,104,155,102,160,102,163,97z"
            },
            {
              "id": "id6",
              "npu": "D",
              "path": "M124,116,124,129,118,133,115,133,111,132L105,132L103,131,96,124,84,112,82,112,63,113,59,106,62,105,67,101,74,92,79,92,84,95,85,97,92,103,95,103,96,101,100,103,102,107,101,101,100,100,101,99,106,102,111,106,112,108,108,107,111,109,117,110,117,112,122,114z"
            },
            {
              "id": "id7",
              "npu": "E",
              "path": "M115,133,118,133,124,129,124,116,126,117,136,106,141,107,149,103,151,104,148,109,155,127,154,129,154,133,159,141,158,144,156,144,154,143,151,145,148,144,148,146,144,146,130,147,128,146,126,145,121,139z"
            },
            {
              "id": "id8",
              "npu": "G",
              "path": "M59,106,56,107,50,115,49,118,43,123,45,124,48,125,52,123,51,126,55,131,56,132,59,132,60,135,64,137,66,137,70,141,71,142,71,138,85,138,86,132,89,130,90,131,90,134,95,134,95,138,97,139,98,141,99,139,100,138,101,133,105,132,84,112,82,112,63,113z"
            },
            {
              "id": "id9",
              "npu": "H",
              "path": "M43,123,38,127,38,134,44,134,41,138,39,140L39,142L38,144,37,151,38,154,30,154,30,158,22,159,21,164,19,167,18,166,17,168,20,169,20,172,22,172,21,177,30,177,35,180L36,180L36,183L35,185,39,189L39,186L43,184,43,180,43,178,43,176,45,176,46,177,45,183,45,183,48,184,54,160,56,155,53,147,52,139,53,134,56,132,51,126,52,123,48,125z"
            },
            {
              "id": "id10",
              "npu": "I",
              "path": "M53,134,56,132,59,132,60,135,64,137,66,137,71,142L71,142L72,146,74,151,76,161,81,164,85,166,94,165,98,168,98,172L93,172L93,182,84,182,84,190,76,189,78,193,75,194,75,203,69,203,65,202,62,197,59,201,59,202,55,198,52,200,51,198,49,198,48,196,50,195L50,192L52,193,53,193,53,188,48,188,48,184,56,155,53,147,52,139z"
            },
            {
              "id": "id11",
              "npu": "J",
              "path": "M105,132,105,136,106,137,109,141,109,146,103,146,105,151,104,154,100,154,100,163,95,163,94,165,85,166,76,161,74,151,72,146,71,142,71,138,85,138,86,132,89,130,90,131,90,134,95,134,95,138,97,139,98,141,99,139,100,138,101,133z"
            },
            {
              "id": "id12",
              "npu": "K",
              "path": "M105,132L111,132L115,133L115,133L117,135,116,162L110,162L109,167,106,170,100,170,98,168,94,165,95,163,100,163,100,154,104,154,105,151,103,146,109,146,109,141,106,137z"
            },
            {
              "id": "id13",
              "npu": "L",
              "path": "M116,162,117,135,121,139,126,145,128,146,130,147,129,153,127,152,128,154,127,162z"
            },
            {
              "id": "id14",
              "npu": "M",
              "path": "M130,147,148,146,148,144,151,145,154,143,156,144,158,144,160,148,163,151,163,155,158,160,158,163,154,166,146,169,143,167,139,171,132,171,127,174,124,170,128,166,127,162,128,154,127,152,129,153z"
            },
            {
              "id": "id15",
              "npu": "N",
              "path": "M158,144,171,144,173,138,186,138,186,145,187,146,187,150,189,150,190,148,192,147,192,149,195,150,197,152,192,157,187,157,181,155,170,157,171,171,165,173,160,174,160,170,156,170,154,166,158,163,158,160,163,155,163,151,160,148z"
            },
            {
              "id": "id16",
              "npu": "O",
              "path": "M197,152,200,152,201,161,203,162,202,163,201,165,206,165,207,163,209,162,211,162L211,163L218,163,218,170,219,177,196,176,196,170,188,169,189,177,186,176,182,172,171,171,170,157,181,155,187,157,192,157z"
            },
            {
              "id": "id17",
              "npu": "P",
              "path": "M49,198L49,198L48,200,45,200,45,202,37,201,38,198,39,194,35,194,34,192,32,193,21,194,21,201,22,202,22,208,13,209L13,233L21,233L21,240,30,240,29,249,26,250,26,253,29,253,29,256,34,256,45,258,45,247,52,246,50,236,50,224,50,216,52,209,50,204z"
            },
            {
              "id": "id18",
              "npu": "R",
              "path": "M52,246,56,247,57,239,60,239,61,223,64,223,64,221,69,221,69,216,82,216,85,215,89,216,89,217L90,217L91,209,96,209,96,203,86,208,85,205,89,194,83,194,78,193,75,194,75,203,69,203,65,202,62,197,59,201,55,198,52,200,51,198,49,198,52,209,50,216,50,224,50,236z"
            },
            {
              "id": "id19",
              "npu": "S",
              "path": "M89,194,83,194,78,193,76,189,84,190,84,182,93,182,102,183,111,183,116,188,118,189,122,195,118,193,115,191L115,194L112,194,108,204,107,214,106,215,99,215L99,213L96,213,96,209,96,203,86,208,85,205z"
            },
            {
              "id": "id20",
              "npu": "T",
              "path": "M93,182,93,172L98,172L98,168,100,170,106,170,109,167,110,162L116,162,127L163,3.57998L160,4.139363.57998L161,1.108664.139363.57998L157,3.366321.108664.139363.57998L155,2.237493.366321.108664.139363.57998L155,5.929342.237493.366321.108664.139363.57998L154,2.796865.929342.237493.366321.108664.139363.57998L151,2.461242.796865.929342.237493.366321.108664.139363.57998L146,-4.586852.461242.796865.929342.237493.366321.108664.139363.57998L128,-1.11875-4.586852.461242.796865.929342.237493.366321.108664.139363.57998L"
            },
            {
              "id": "id21",
              "npu": "W",
              "path": "M186,176,182,172,171,171,165,173,160,174,160,170,156,170,154,166,146,169,145,175,145,178,147,179L147,184L148,184,147,191,151,191,155,189,156,190,155,202,161,204,165,208,167,208,170,208,171,183,179,183,183,189,185,196,187,197,189,193,193,190,194,190,187,185L187,180z"
            },
            {
              "id": "id22",
              "npu": "V",
              "path": "M147,191,148,184,147,184L147,179L145,178,146,169,143,167,139,171,132,171,127,174,125,171,121,175,120,177,120,183,118,185,116,188,118,189,122,195,133,196,139,195,143,191z"
            },
            {
              "id": "id23",
              "npu": "Z",
              "path": "M165,208,167,208,170,208,170,264L130,264L130,259,133,258,134,257,134,251,131,244,132,240,133,239,132,235,131,232,132,226,127,221C127,221,126,217,127,217,127,217,135,216,135,216L139,216,141,218,149,218,148,216,152,215,151,213,155,212,159,209,163,206z"
            },
            {
              "id": "id24",
              "npu": "Y",
              "path": "M133,196,139,195,143,191,147,191,151,191,155,189,156,190,155,202,161,204,163,206,155,212,151,213,152,215,148,216,149,218,141,218,139,216,135,216,132,216,127,217,126,217,128,214,127,209,129,205,131,200z"
            },
            {
              "id": "id25",
              "npu": "T",
              "path": "M106,170,109,167,110,162L127,162L128,166,124,170,125,171,121,175,120,177,120,183,118,185,116,188,111,183,93,182,93,172L98,172L98,168,100,170z"
            }
          ],
          joinBy: ['npu','npu'],
          name: 'Current crime',
          allowPointSelect: true,
          cursor: 'pointer',
          states: {
            select: {
              color: '#a4edba',
              borderColor: 'black',
              dashStyle: 'shortdot'
            }
          },
          borderWidth: 0.5
        }]
      });
  
     
    })
  }

        
 







  
map_building();
    // Wrap point.select to get to the total selected points
   
