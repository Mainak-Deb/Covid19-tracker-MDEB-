
var i,actv,rec,dead,conf,dactv,drec,ddead,dconf;

fetch('https://api.covid19india.org/data.json')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    // Work with JSON data here
    console.log(data)
    console.log(data.statewise[0].state)

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

  })
  
function updateCounter(){
    fetch('https://api.countapi.xyz/update/iconicsudip.github.io/github/?amount=1')
    .then(response => {return response.json()})
    .then((data) => {
        document.getElementById('count').innerHTML = data.value;
    }
    )
}
updateCounter();
  