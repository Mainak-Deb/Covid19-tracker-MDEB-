
var i,actv,rec,dead,conf,dactv,drec,ddead,dconf;
var oactv={},oconf={},odead={},orecv={},ototal={};

var songs = {
    "Mon 67 yujk=> 89" : 100280,
    "Tues": 40,
    "Wed" : 60,
    "Thu" : 80,
    "Fri": 40,
    "Sat" : 60,
    
     };
fetch('https://api.covid19india.org/data.json')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    // Work with JSON data here
    // console.log(data)
    // console.log(data.statewise[0].state)

    conf=data.statewise[0].confirmed
    rec=data.statewise[0].recovered
    dead=data.statewise[0].deaths
    actv=conf-rec-dead

    dconf=data.statewise[0].deltaconfirmed
    drec=data.statewise[0].deltarecovered
    ddead=data.statewise[0].deltadeaths


    // india dashboard value fetch
    
    document.getElementById("lastupdate").innerHTML = data.statewise[0].lastupdatedtime
    ;

    document.getElementById("Confirmed").innerHTML = conf;
    document.getElementById("dConfirmed").innerHTML = dconf;
    
    document.getElementById("Active").innerHTML = actv;
    
    document.getElementById("Recovered").innerHTML = rec;
    document.getElementById("dRecovered").innerHTML = drec;
    
    document.getElementById("Deceased").innerHTML = dead;
    document.getElementById("dDeceased").innerHTML = ddead;
   

    var tabletag=`<tr class="tbl-header">
    <th>State/UT</th>
    <th>Confirmed</th>
    <th>Active</th>
    <th>Recovered</th>
    <th>Deceased</th>
    </tr>
    `
    
    for(i=1;i<data.statewise.length;i++){
        stt=data.statewise[i].state
        conf=data.statewise[i].confirmed
        rec=data.statewise[i].recovered
        dead=data.statewise[i].deaths
        actv=conf-rec-dead
        tabletag=tabletag+`<tr> `+
        `<td class="tabstt" >` + stt.toString() + `</td>`+
        `<td class="tabcon">`  + conf.toString() +  `</td>`+
        `<td class="tabact" >` + actv.toString() +  `</td>`+
        `<td class="tabrec" >` + rec.toString() + `</td>`+
        `<td class="tabdead" >` + dead.toString() + `</td>`+
        `</tr>  `
        // console.log(i)
        // console.log(data.statewise[i].state)
    }
    document.getElementById("maintable").innerHTML = tabletag;
    // console.log(data.cases_time_series[100])
    for(i=0;i<data.cases_time_series.length;i++){
        oconf[data.cases_time_series[i].date.toString()]=parseInt(data.cases_time_series[i].dailyconfirmed);
        oactv[data.cases_time_series[i].date.toString()]=parseInt(data.cases_time_series[i].totalconfirmed-data.cases_time_series[i].totaldeceased-data.cases_time_series[i].totalrecovered);
        ototal[data.cases_time_series[i].date.toString()]=parseInt(data.cases_time_series[i].totalconfirmed);
        orecv[data.cases_time_series[i].date.toString()]=parseInt(data.cases_time_series[i].dailyrecovered);
        odead[data.cases_time_series[i].date.toString()]=parseInt(data.cases_time_series[i].dailydeceased);


    }

    
    $('.graph-songs').graphiq({
        data: oconf,
        fluidParent: ".col",
        height: 200,
        xLineCount: 6,
        dotRadius: 0,
        yLines: false,
        xLines: true,
        dots: true,
        fillOpacity: 0.5,
        fill: true,
        colorLine: "#ed7664",
        colorFill: "#fc0808",
    });
     
$('.graph-coffees').graphiq({
    data: oactv,
    fluidParent: ".col",
    height: 200,
    xLineCount: 6,
    dotRadius: 0,
    yLines: false,
    xLines: true,
    dots: true,
    colorLine: "#0a7cff",
    colorDot: "#726d60",
    colorXGrid: "#634e1b",
    colorUnits: "#d3d1b1",
    colorFill: "#2eeff2",
    dotStrokeWeight: 3,
  
  });
      
$('.graph-total').graphiq({
    data: ototal,
    fluidParent: ".col",
    height: 200,
    xLineCount: 6,
    dotRadius: 0,
    yLines: false,
    xLines: true,
    dots: false,
    colorLine: "#f4fc03",
    colorDot: "#726d60",
    colorXGrid: "#634e1b",
    colorUnits: "#d3d1b1",
    colorFill: "#fca103",
    dotStrokeWeight: 3,
  
  });
  
    $('.graph-cats').graphiq({
    data: orecv,
    fluidParent: ".col",
    height: 200,
    yLines: false,
    xLines: true,
    dots: false,
    colorLine: "#0aff1a",
    colorLabels: "#efede5",
    colorFill: "#beff0a",
    fill: true
  });
  
    $('.graph-hours').graphiq({
    data: odead,
    fluidParent: ".col",
    height: 200,
    xLineCount: 6,
    dotRadius: 0,
    yLines: false,
    xLines: true,
    dots: true,
    colorLine: "#ef7efc",
    colorDot: "#A3F7B5",
    colorXGrid: "#788476",
    colorUnits: "#A3F7B5",
    colorFill: "#75039e"
  });
     

  })
 

function selectstate() {
    
    var sst= document.getElementById("stateselectbox").value;
    // console.log(sst);
    if(sst=="India"){
    document.getElementById("india").style.display = "block";
    document.getElementById("states").style.display = "none";
    }else{
                
        var state,district,selecttag;
        fetch('https://api.covid19india.org/state_district_wise.json')
            .then(response => {return response.json()})
            .then((data) => {  
                // console.log(sst)              
                // console.log(data[sst].districtData)
                document.getElementById("statename").innerHTML = sst;
                
                conf=0
                actv=0
                rec=0
                dead=0
                dconf=0
                drec=0
                ddead=0
                            
                var tabletag2 =`<tr class="tbl-header">
                <th>District</th>
                <th>Confirmed</th>
                <th>Active</th>
                <th>Recovered</th>
                <th>Deceased</th>
                </tr>
                `   
                for(district in data[sst].districtData){
                    conf=conf+data[sst].districtData[district].confirmed
                    actv=actv+data[sst].districtData[district].active
                    dead=dead+data[sst].districtData[district].deceased

                    dconf=dconf+data[sst].districtData[district].delta.confirmed
                    drec=drec+data[sst].districtData[district].delta.recovered
                    ddead=ddead+data[sst].districtData[district].delta.deceased
                    // console.log(ddead) 
                    tabletag2=tabletag2+`<tr> `+
                    `<td class="tabstt" >` + district.toString() + `</td>`+
                    `<td class="tabcon">`  + data[sst].districtData[district].confirmed.toString() +  `</td>`+
                    `<td class="tabact" >` + data[sst].districtData[district].active.toString() +  `</td>`+
                    `<td class="tabrec" >` + data[sst].districtData[district].recovered.toString() + `</td>`+
                    `<td class="tabdead" >` + data[sst].districtData[district].deceased.toString() + `</td>`+
                    `</tr>  `
                }
                document.getElementById("smaintable").innerHTML = tabletag2;




                // State dashboard value fetch
              
                document.getElementById("sConfirmed").innerHTML = conf;
                document.getElementById("sdConfirmed").innerHTML = dconf;
                
                document.getElementById("sActive").innerHTML = actv;
                
                document.getElementById("sRecovered").innerHTML = conf-dead-actv;
                document.getElementById("sdRecovered").innerHTML = drec;
                
                document.getElementById("sDeceased").innerHTML = dead;
                document.getElementById("sdDeceased").innerHTML = ddead; 
            




                document.getElementById("india").style.display = "none";
                document.getElementById("states").style.display = "block";

        })

    }
}
function updateCounter(){
    fetch('https://api.countapi.xyz/update/mainakdeb/debcode/?amount=1')
    .then(response => {return response.json()})
    .then((data) => {
        document.getElementById('count').innerHTML = data.value;
    }
    )
}
updateCounter();
// {"namespace":"mainakdeb","key":"debcode"}


// For example on how to intiate graphs, or if you want to mess around with the data / style of these graphs, check the bottom of this panel.

(function ($) {

  $.fn.graphiq = function (options) {

      // Default options
      var settings = $.extend({
          data: {},
          colorLine: "#d3a2ef",
          colorDot: "#c3ecf7",
          colorXGrid: "#7f7f7f",
          colorYGrid: "#7f7f7f",
          colorLabels: "#FFFFFF",
          colorUnits: "#FFFFFF",
          colorRange: "#FFFFFF",
          colorFill: "#533c68",
          colorDotStroke: "#FFFFFF",
          dotStrokeWeight: 0,
          fillOpacity: 0.25,
          rangeOpacity: 0.5,
          dotRadius: 3,
          lineWeight: 2,
          yLines: true,
          dots: true,
          xLines: true,
          xLineCount: 5,
          fill: true,
          height: 100,
          fluidParent: null
      }, options);

      var values = [];
      var entryDivision;
      var dataRange = settings.height + settings.dotRadius;
      var parent = this;
      var maxVal;
      var scaleFactor = settings.height / 100;
      var pathPoints = "";
      for (var key in settings.data) {
          values.push(settings.data[key]);
      }

      parent.append(
          '<div class="graphiq__graph-values"></div><div class="graphiq__graph-layout"><svg class="graphiq__graph" viewBox="0 0 960 '+ (settings.height + 10) +'" shape-rendering="geometricPrecision"><path fill="'+ settings.colorFill +'" style="opacity: '+ settings.fillOpacity +'" class="graphiq__fill-path" d="" stroke-width="0" stroke="#000" fill="cyan"/></svg><div class="graphiq__graph-key"></div></div>'
      );
          if (settings.fluidParent) {
              this.closest(".col").css("overflow", "auto");
          }
      parent.addClass('graphiq');

      var graph = this.find(".graphiq__graph");

    //   // Get data from table
    //   for (var key in settings.data) {
    //       this.find(".graphiq__graph-key").append('<div class="key vanishappear" >' + key + "</div>");

    //   }

      
      maxVal = Math.max.apply(Math, values);


      this.find('.graphiq__graph-values').append('<span style="color: ' + settings.colorRange + '; opacity: ' + settings.rangeOpacity + '">' + maxVal + '</span><span style="color: ' + settings.colorRange + '; opacity: ' + settings.rangeOpacity + '" >0</span>');



      // Set even spacing in the graph depending on amount of data

      var width = parent.find(".graphiq__graph-layout").width();
      
      if (settings.xLines) {
          unitLines(width, maxVal);
      }

      layoutGraph(width, true);

      $(window).on("resize", function () {
          pathPoints = "";
          width = parent.find(".graphiq__graph-layout").width();
          layoutGraph(width, false);
      });

     // buildFillPath();
 
      function percentageOf(max, current) {
          return (current / max * 100) * scaleFactor;
      }

      function layoutGraph(width, initial) {
          graph.attr({
              viewBox: "0 0 " + width + " " + (settings.height + 10),
              width: width
          });
          entryDivision = width / (values.length - 1);
          getCoordinates(initial, entryDivision);
      }

      function getCoordinates(initial, entryDivision) {


          for (i = 0; i < values.length; i++) {
         
              var offset;
     
              if (i == 0) {
                  offset = (settings.dotRadius + (settings.dotStrokeWeight)) + 1;
              } 
          
               else if (i == values.length - 1) {
                  offset = ((settings.dotRadius + (settings.dotStrokeWeight )) * -1) - 1;
              } else {
                  offset = 0;
              }
         
              var lineOffset = i == values.length - 2 ? (settings.dotRadius + (settings.dotStrokeWeight)) / 2 : 0;

              let nextI = i + 1;
              let xAxis = (entryDivision * i) + offset;
              let xAxis2 = entryDivision * nextI;
              
         

              let yAxis = dataRange - percentageOf(maxVal, values[i]);

              let yAxis2 = dataRange - percentageOf(maxVal, values[nextI]);

              if (i == values.length - 1) {
                  yAxis2 = yAxis;
                  xAxis2 = xAxis;
              }

            pathPoints += " L " + xAxis + " " + yAxis;
           

              if (i == values.length - 1 && settings.fill) {
                  buildFillPath(pathPoints);
              }

              if (initial) {

                  if (settings.yLines) {

                  $(document.createElementNS("http://www.w3.org/2000/svg", "line"))
                      .attr({
                          class: "graphiq__y-division",
                          x1: xAxis,
                          y1: yAxis,
                          x2: xAxis,
                          y2: settings.height + 5,
                          stroke: settings.colorYGrid,
                          "stroke-dasharray": "5 6",
                          "stroke-width": 1
                      })
                      .prependTo(graph);

                  }

                  // Draw the line
                  

                  $(document.createElementNS("http://www.w3.org/2000/svg", "line"))
                      .attr({
                          class: "graphiq__line",
                          x1: xAxis ,
                          y1: yAxis,
                          x2: xAxis2 - lineOffset,
                          y2: yAxis2 + (settings.dotStrokeWeight / 2),
                          stroke: settings.colorLine,
                          "stroke-width": settings.lineWeight,
                          "vector-effect": "non-scaling-stroke"
                      }).appendTo(graph);

                  // Draw the circle

             
                  $(document.createElementNS("http://www.w3.org/2000/svg", "circle"))
                      .attr({
                          class: "graphiq__graph-dot",
                          cx: xAxis,
                          cy: yAxis + (settings.dotStrokeWeight / 2),
                          r: settings.dots ? settings.dotRadius : 0,
                          fill: settings.colorDot,
                          stroke: settings.colorDotStroke,
                          "stroke-width": settings.dotStrokeWeight,
                          "data-value": values[i],
                          "vector-effect": "non-scaling-stroke"
                      })
                      .appendTo(graph);
                  

                  // Resize instead of draw, used in resize
              } else {

                  parent.find(".graphiq__graph-dot")
                      .eq(i)
                      .attr({
                          cx: xAxis,
                      });
                  parent.find(".graphiq__line")
                      .eq(i)
                      .attr({
                          x1: xAxis,
                          x2: xAxis2 - lineOffset,
                      });
                  parent.find(".graphiq__y-division")
                      .eq(values.length - i - 1)
                      .attr({
                          x1: xAxis,
                          x2: xAxis
                      });
                  parent.find(".graphiq__x-line").each(function () {
                      $(this).attr({
                          x2: width
                      });
                  });
              }
          }
      }

      function buildFillPath(pathPoints) {
        
        parent.find('.graphiq__fill-path').attr("d", "M  " + (4 + settings.dotStrokeWeight) + " " + (settings.height + 5 + settings.dotStrokeWeight) + pathPoints +  " L " + (width - settings.dotRadius - settings.dotStrokeWeight) + " " + (settings.height + 5 + settings.dotStrokeWeight))
      }

      function unitLines(width, maxVal) {
          // Draw the max line

          var iteration = 200 / (settings.xLineCount - 1);


              for (i=0; i < settings.xLineCount; i++) {

                      $(document.createElementNS("http://www.w3.org/2000/svg", "line"))
                      .attr({
                          class: "graphiq__x-line",
                          y1: iteration * i + (settings.dotRadius + settings.dotStrokeWeight),
                          x2: width,
                          y2: iteration * i +  (settings.dotRadius + settings.dotStrokeWeight),
                          stroke: settings.colorXGrid,
                          // "stroke-dasharray": "5 6",
                          "stroke-width": 1
                      })
                      .prependTo(graph);

              }

      }

      parent.hover(function () {
      
          $(this).find('.graphiq__graph-dot').each(function (index) {
              $('.value-' + index).css({
                  top: $(this).position().top - 20,
                  left: $(this).position().left - ($('.value-' + index).outerWidth() / 2) + 3
              })
          })
      }, function () {
          $('.graphiq__value-dialog').remove();
      })

  };

}(jQuery));











//  songs["sun"]=100;


// https://codepen.io/kylewetton/pen/rQLoVe?editors=0010
