// Use the D3 library to read in samples.json
const samples = d3.json("samples.json").then(function(data) {
    console.log(data);
});

// Add all IDs to dropdown
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

// Create a summing function
function sum(arr) {
  var total = 0;
  for (var i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

// Consider a specific individual/person (test subject ID 940)
function buildPlot(){
  d3.json("samples.json").then(function(jsonData){

    // Retrieve the values from the metaData section
    const selector = d3.select("#sample-metadata");
    let div;
    div = selector.append("div");
    div.append("p").text(`id: ${jsonData.metadata[0].id}`);
    div.append("p").text(`ethnicity: ${jsonData.metadata[0].ethnicity}`);
    div.append("p").text(`gender: ${jsonData.metadata[0].gender}`);
    div.append("p").text(`age: ${jsonData.metadata[0].age}`);
    div.append("p").text(`location: ${jsonData.metadata[0].location}`);
    div.append("p").text(`bbtype: ${jsonData.metadata[0].bbtype}`);
    div.append("p").text(`wfreq: ${jsonData.metadata[0].wfreq}`);
    
    // Get data for first bar chart
    const values1 = jsonData.samples[0].sample_values.slice(0,10).reverse();
    const labels1 = jsonData.samples[0].otu_ids.slice(0,10).reverse();
    const hoverText1 = jsonData.samples[0].otu_labels.slice(0,10).reverse();
    const genusArray1 = []
    hoverText1.forEach(function(name) {
      const genus1 = name.split(";").pop();
      genusArray1.push(genus1);
      // console.log(genus1);
    });
    // console.log(values1);
    // console.log(labels1);
    // console.log(hoverText1);
    // console.log(genusArray1);
    //Combine labels1 and genus1
    const yLabels1 = [];
    for (let i=0; i < genusArray1.length; i++){
      yLabels1.push(`${labels1[i]}: ${genusArray1[i]}`)
    };

    // Create trace variable
    const trace1 ={
        x: values1,
        y: yLabels1,
        type: "bar",
        orientation: "h",
        text: hoverText1
    };
        
    // Create the data array for our plot
    const data1 = [trace1];
        
    // Define our plot layout
    const layout1 = {
        title: `Top 10 Bacteria - Subject ${jsonData.metadata[0].id}`,
        yaxis: {'type': 'category',
                automargin: true
        }
    };
        
    // Plot the chart to a div tag with id "bar1"
    Plotly.newPlot("bar1", data1, layout1);

    // Bubble chart
    const values4 = jsonData.samples[0].sample_values;
    // console.log(values4);
    // Forming labels of family names
    const familyArray1 = []
    jsonData.samples[0].otu_labels.forEach(function(name) {
      const family1 = name.split(";").slice(0,5);
      familyArray1.push(family1);
    });
    // console.log(familyArray1);
    
    const familyArray2 = []
    familyArray1.forEach(function(fam){
      const familyFull1 = fam.join(";");
      familyArray2.push(familyFull1);
    })
    // console.log(familyArray2);
  
    // Create trace variable
    const trace4 ={
      x: values4,
      y: familyArray2,
      mode: "markers",
      marker: {size:values4},
      // text: familyArray2
    };
    
    // Create the data array for our plot
    const data4 = [trace4];
    
    // Define our plot layout
    const layout4 = {
        title: `Count of Bacteria by Family - Subject ${jsonData.metadata[0].id}`,
        yaxis: {automargin: true}
    };
    
    // Plot the chart to a div tag with id "bubble"
    Plotly.newPlot("bubble", data4, layout4);
  });
};
buildPlot();

// Build bar graph to show top 10 bacteria for all subjects
function buildSecondPlot(){
  d3.json("samples.json").then(function(jsonData){
    // Get data for second bar chart
    const sampleValues = jsonData.samples.map(subject => subject.sample_values);
    const sampleIds = jsonData.samples.map(subject => subject.otu_ids);
    const sampleLabels = jsonData.samples.map(subject => subject.otu_labels);

    let joinedArray = [];
    for (let i=0; i < sampleValues.length; i++){
      joinedArray.push(`${sampleIds[i]}: ${sampleValues[i]}`)
    };
    sampleIds.forEach(subject => subject)
    valueArray = sampleValues.flat();
    // console.log(joinedArray);

    // console.log(`The sum is : ${sum(sampleValues)}`);
    const values2 = jsonData.samples[0].sample_values.slice(0,10).reverse();
    const labels2 = jsonData.samples[0].otu_ids.slice(0,10).reverse();
    const hoverText2 = jsonData.samples[0].otu_labels.slice(0,10).reverse();

    // console.log(values2);
    // console.log(labels2);
    // console.log(hoverText2);

    // Create trace variable
    var trace2 ={
        x: values2,
        y: labels2,
        type: "bar",
        orientation: "h",
        text: hoverText2
    };
        
    // Create the data array for our plot
    var data = [trace2];
        
    // Define our plot layout
    var layout = {
        title: "Top 10 Bacteria - All Subjects",
        yaxis: {'type': 'category',
                automargin: true
        }
    }
        
    // Plot the chart to a div tag with id "bar2"
    Plotly.newPlot("bar2", data, layout)


  });
};
buildSecondPlot();

// Function to handle changes in dropdown
function optionChanged(chosen){
  // console.log(chosen);
  d3.json("samples.json").then(function(jsonData){
    
    //Get metadata and append div elements
    const filteredMeta = jsonData.metadata.filter(name => name.id === parseInt(chosen));
    // console.log(filteredMeta)
    const selector = d3.select("#sample-metadata");
    selector.html("");
    div = selector.append("div");
    div.append("p").text(`id: ${filteredMeta[0].id}`);
    div.append("p").text(`ethnicity: ${filteredMeta[0].ethnicity}`);
    div.append("p").text(`gender: ${filteredMeta[0].gender}`);
    div.append("p").text(`age: ${filteredMeta[0].age}`);
    div.append("p").text(`location: ${filteredMeta[0].location}`);
    div.append("p").text(`bbtype: ${filteredMeta[0].bbtype}`);
    div.append("p").text(`wfreq: ${filteredMeta[0].wfreq}`);
    
    //Get data for first plot
    const filteredData = jsonData.samples.filter(name => name.id === chosen);
    // console.log(filteredData)
    const values3 = filteredData[0].sample_values.slice(0,10).reverse();
    const labels3 = filteredData[0].otu_ids.slice(0,10).reverse();
    const hoverText3 = filteredData[0].otu_labels.slice(0,10).reverse();
    const genusArray3 = []
    hoverText3.forEach(function(name) {
      const genus3 = name.split(";").pop();
      genusArray3.push(genus3);
    });
    //Combine labels3 and genus3
    const yLabels3 = [];
    for (let i=0; i < genusArray3.length; i++){
      yLabels3.push(`${labels3[i]}: ${genusArray3[i]}`)
    };
    
    // Create trace variable
    const trace3 ={
      x: values3,
      y: yLabels3,
      type: "bar",
      orientation: "h",
      text: hoverText3
    };

    // Create the data array for our plot
    const data3 = [trace3];
        
    // Define our plot layout
    const layout3 = {
        title: `Top 10 Bacteria - Subject ${filteredMeta[0].id}`,
        yaxis: {'type': 'category',
                automargin: true
        }
    };
      
    // Plot the chart to a div tag with id "bar1"
    Plotly.newPlot("bar1", data3, layout3);
    
    // Bubble chart
    const values5 = filteredData[0].sample_values;
    // console.log(values4);
    // Forming labels of family names
    const familyArray3 = []
    filteredData[0].otu_labels.forEach(function(name) {
      const family2 = name.split(";").slice(0,5);
      familyArray3.push(family2);
    });
        
    const familyArray4 = []
    familyArray3.forEach(function(fam){
      const familyFull2 = fam.join(";");
      familyArray4.push(familyFull2);
    });
      
    // Create trace variable
    const trace5 ={
      x: values5,
      y: familyArray4,
      mode: "markers",
      marker: {size:values5}
    };
        
    // Create the data array for our plot
    const data5 = [trace5];
        
    // Define our plot layout
    const layout5 = {
        title: `Count of Bacteria by Family - Subject ${filteredMeta[0].id}`,
        yaxis: {automargin: true}
    };
        
    // Plot the chart to a div tag with id "bubble"
    Plotly.newPlot("bubble", data5, layout5);
  });
};

// Add event listener for submit button
d3.select('#submit').on('click', optionChanged);  