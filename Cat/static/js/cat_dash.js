const url = "/catAPI";

var bluePalette = ["3fc1c0","20bac5","00b2ca","04a6c2","0899ba","0f80aa","16679a","1a5b92","1c558e","1d4e89"];

// Empty Object to insert crimes
var crimes = {}

function buildBar() {
    d3.json(url).then(function (res) {
        var length = res.res.length
        for (let i = 0; i < length; i++) {
            let data_res = res.res[i]
            // console.log(data_res);

            // Getting only Crime Type Data
            let crimeType = data_res.UC2_Literal
            // console.log(crimeType)

            // runs if 0
            if (!crimes[crimeType]) {
                crimes[crimeType] = 0
            }
            crimes[crimeType] += 1

        };
        // Creating layout adding plot
        let layout = {
            title: "Crime Category Totals",
            height: 600,
            width: 1000
        };

        Plotly.newPlot('bar', [{
            // x values are the crime types
            x: Object.keys(crimes),
            // y values are the total count values
            y: Object.values(crimes),
            type: 'bar',
            // orientation: 'h',
            marker: {
                color: bluePalette
            },
            transforms: [{
                type: 'sort',
                target: 'y',
                order: 'descending'
            }]    
        }], layout)
    });

}

buildBar();
// console.log(crimes)

// Empty object to insert crimes
var crimes_per_year = {}

// Function that builds scatter plot
function buildScatter() {
    d3.json(url).then(function (res) {
        var length = res.res.length
        for (let i = 0; i < length; i++) {
            let data_res = res.res[i]
            // console.log(data_res)

            // Grabbing occur_year data
            let crimeYear = data_res.occur_year
            console.log(crimeYear)

            // Same if to populate crimes_per_year
            if (!crimes_per_year[crimeYear]) {
                crimes_per_year[crimeYear] = 0
            }
            crimes_per_year[crimeYear] += 1
        };

        // Trace values to create scatter
        var trace1 = {
            // x-values are the year
            x: Object.keys(crimes_per_year),
            // y-values are the total crime 
            y: Object.values(crimes_per_year),
            type: 'scatter',
            name: 'Crime Total'
        };

        var data = [trace1];

        // Creating layout adding plot
        let layout = {
            title: "Crimes Total Per Year"
        }
        Plotly.newPlot('scatter', data, layout)

    });
}

buildScatter();

function buildPie() {
    d3.json(url).then(function (res) {
        var length = res.res.length
        for (let i = 0; i < length; i++) {
            let data_res = res.res[i]
            // console.log(data_res);

            // Getting only Crime Type Data
            let crimeType = data_res.UC2_Literal
            // console.log(crimeType)

            // runs if 0
            if (!crimes[crimeType]) {
                crimes[crimeType] = 0
            }
            crimes[crimeType] += 1

        };

        var data = [{
            values: Object.values(crimes),
            labels: Object.keys(crimes),
            type: 'pie'
        }];

        var layout = {
            height: 500,
            width: 600,
            title: "Crime Type %",
            marker: {
                color: bluePalette
            }
        };

        
        Plotly.newPlot('pie', data, layout);
    });

}

buildPie();