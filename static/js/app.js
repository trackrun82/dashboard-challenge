// Use the D3 library to read in samples.json
const samples = d3.json("samples.json").then(function(data) {
    console.log(data);
});

function dropDown(){
  d3.json("samples.json").then(function(jsonData){

    // Return all the sample ID numbers
    var names = jsonData.names
    // console.log(names)
      
    // Append names to dropdown
    names.forEach(function(name) {
      const idDropdown = d3.select("#selDataset").append("option");
      idDropdown.text(name);
    });
  });
};
dropDown();

// Consider a specific individual/person (test subject ID 940)
function buildPlot(){
  d3.json("samples.json").then(function(jsonData){

    // Retrieve the values from the metaData section
    const id = jsonData.metadata[0].id;
    const ethnicity = jsonData.metadata[0].ethnicity;
    const gender = jsonData.metadata[0].gender;
    const age = jsonData.metadata[0].age;
    const location = jsonData.metadata[0].location;
    const bbtype = jsonData.metadata[0].bbtype;
    const wfreq = jsonData.metadata[0].wfreq;

    buildInfo(id, ethnicity, gender, age, location, bbtype, wfreq);
    
    // Get data for first bar chart
    const values1 = jsonData.samples[0].sample_values.slice(0,10).reverse();
    const labels1 = jsonData.samples[0].otu_ids.slice(0,10).reverse();
    const hoverText1 = jsonData.samples[0].otu_labels.slice(0,10).reverse();
    hoverText1.forEach(function(name) {
      const genus1 = name.split(";").pop();
      console.log(genus1);
    });

    // console.log(values1);
    // console.log(labels1);
    // console.log(hoverText1);

    // Create trace variable
    const trace1 ={
        x: values1,
        y: labels1,
        type: "bar",
        orientation: "h",
        text: hoverText1
    };
        
    // Create the data array for our plot
    const data1 = [trace1];
        
    // Define our plot layout
    const layout1 = {
        title: "Top 10 Bacteria - Selected Subject",
        yaxis: {'type': 'category'}
    }
        
    // Plot the chart to a div tag with id "bar1"
    Plotly.newPlot("bar1", data1, layout1)

//     // Get data for second bar chart
//     const values2 = jsonData.samples[0].sample_values.slice(0,10).reverse();
//     const labels2 = jsonData.samples[0].otu_ids.slice(0,10).reverse();
//     const hoverText2 = jsonData.samples[0].otu_labels.slice(0,10).reverse();
//     hoverText2.forEach(function(name) {
//       const genus2 = name.split(";").pop();
//       console.log(genus2);
//     });

//     // console.log(values);
//     // console.log(labels);
//     // console.log(hoverText);

//     // Create trace variable
//     var trace2 ={
//         x: values,
//         y: labels,
//         type: "bar",
//         orientation: "h",
//         text: hoverText
//     };
        
//     // Create the data array for our plot
//     var data = [trace2];
        
//     // Define our plot layout
//     var layout = {
//         title: "Top 10 Bacteria - All Subjects",
//         yaxis: {'type': 'category'}
//     }
        
//     // Plot the chart to a div tag with id "bar2"
//     Plotly.newPlot("bar2", data, layout)

  })
};
buildPlot();

// Function to handle changes in dropdown
function optionChanged(chosen){
  // console.log(chosen);
  d3.json("samples.json").then(function(jsonData){
    
    //Get metadata
    const filteredMeta = jsonData.metadata.filter(name => name.id === chosen)
    console.log(filteredMeta)
    const id1 = filteredMeta[0].id;
    // const ethnicity1 = filteredMeta[0].ethnicity;
    // const gender1 = filteredMeta[0].gender;
    // const age1 = filteredMeta[0].age;
    // const location1 = filteredMeta[0].location;
    // const bbtype1 = filteredMeta[0].bbtype;
    // const wfreq1 = filteredMeta[0].wfreq;
    // buildInfo(id1, ethnicity1, gender1, age1, location1, bbtype1, wfreq1);
    
    //Get data for first plot
    const filteredData = jsonData.samples.filter(name => name.id === chosen)
    console.log(filteredData)
    const values3 = filteredData[0].sample_values.slice(0,10).reverse();
    const labels3 = filteredData[0].otu_ids.slice(0,10).reverse();
    const hoverText3 = filteredData[0].otu_labels.slice(0,10).reverse();

    // Create trace variable
    const trace3 ={
      x: values3,
      y: labels3,
      type: "bar",
      orientation: "h",
      text: hoverText3
  };

    // Create the data array for our plot
    const data3 = [trace3];
        
    // Define our plot layout
    const layout3 = {
        title: "Top 10 Bacteria - Selected Subject",
        yaxis: {'type': 'category'}
    }
      
    // Plot the chart to a div tag with id "bar1"
    Plotly.newPlot("bar1", data3, layout3)
    });
};


// Consider a specific individual/person (test subject ID 940)
// function buildPlot(){
//   d3.json("samples.json").then(function(jsonData){

//     // Get data for first bar chart
//     const values = jsonData.samples[0].sample_values.slice(0,10).reverse();
//     const labels = jsonData.samples[0].otu_ids.slice(0,10).reverse();
//     const hoverText = jsonData.samples[0].otu_labels.slice(0,10).reverse();
//     hoverText.forEach(function(name) {
//       const genus = name.split(";").pop();
//       console.log(genus);
//     });

//     // console.log(values);
//     // console.log(labels);
//     // console.log(hoverText);

//     // Create trace variable
//     var trace1 ={
//         x: values,
//         y: labels,
//         type: "bar",
//         orientation: "h",
//         text: hoverText
//     };
        
//     // Create the data array for our plot
//     var data = [trace1];
        
//     // Define our plot layout
//     var layout = {
//         title: "Top 10 Bacteria - Selected Subject",
//         yaxis: {'type': 'category'}
//     }
        
//     // Plot the chart to a div tag with id "bar1"
//     Plotly.newPlot("bar1", data, layout)

//     // Get data for second bar chart
//     const values2 = jsonData.samples[0].sample_values.slice(0,10).reverse();
//     const labels2 = jsonData.samples[0].otu_ids.slice(0,10).reverse();
//     const hoverText2 = jsonData.samples[0].otu_labels.slice(0,10).reverse();
//     hoverText2.forEach(function(name) {
//       const genus2 = name.split(";").pop();
//       console.log(genus2);
//     });

//     // console.log(values);
//     // console.log(labels);
//     // console.log(hoverText);

//     // Create trace variable
//     var trace2 ={
//         x: values,
//         y: labels,
//         type: "bar",
//         orientation: "h",
//         text: hoverText
//     };
        
//     // Create the data array for our plot
//     var data = [trace2];
        
//     // Define our plot layout
//     var layout = {
//         title: "Top 10 Bacteria - All Subjects",
//         yaxis: {'type': 'category'}
//     }
        
//     // Plot the chart to a div tag with id "bar2"
//     Plotly.newPlot("bar2", data, layout)

//   })
// };
// buildPlot();

// function getMetaData() {
//   d3.json("samples.json").then(function(jsonData) {
//     // Retrieve the values from the metaData section
//     for (let i = 0; i < 1; i++) {
//       const id = jsonData.metadata[i].id;
//       const ethnicity = jsonData.metadata[i].ethnicity;
//       const gender = jsonData.metadata[i].gender;
//       const age = jsonData.metadata[i].age;
//       const location = jsonData.metadata[i].location;
//       const bbtype = jsonData.metadata[i].bbtype;
//       const wfreq = jsonData.metadata[i].wfreq;

//       buildInfo(id, ethnicity, gender, age, location, bbtype, wfreq);
//     }
//   });
// };

function buildInfo(id, ethnicity, gender, age, location, bbtype, wfreq) {
  const selector = d3.select("#sample-metadata");
  let div;
  div = selector.append("div");
  div.append("p").text(`id: ${id}`);
  div.append("p").text(`ethnicity: ${ethnicity}`);
  div.append("p").text(`gender: ${gender}`);
  div.append("p").text(`age: ${age}`);
  div.append("p").text(`location: ${location}`);
  div.append("p").text(`bbtype: ${bbtype}`);
  div.append("p").text(`wfreq: ${wfreq}`);
}

function buildInfo(id1, ethnicity1, gender1, age1, location1, bbtype1, wfreq1) {
  const selector = d3.select("#sample-metadata");
  let div;
  div = selector.append("div");
  div.append("p").text(`id: ${id1}`);
  div.append("p").text(`ethnicity: ${ethnicity1}`);
  div.append("p").text(`gender: ${gender1}`);
  div.append("p").text(`age: ${age1}`);
  div.append("p").text(`location: ${location1}`);
  div.append("p").text(`bbtype: ${bbtype1}`);
  div.append("p").text(`wfreq: ${wfreq1}`);
}

// Add event listener for submit button
d3.select('#submit').on('click', optionChanged);  