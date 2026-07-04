let engine = {
  version: "1.1",
  elementMakeCount: 0,
  
  oldSelect: null,
  select: null,
  currentId: null,
  projectName: "untitled",
  dataSave: null,
  
  elementData: "{",
  element: {},
  
  playTest: false,
  
  setintervalAll: [],
  sound: { ambiance: new Audio("ambiance.ogg") }
}

document.onclick = function () {
  if (!engine.sound.ambiance.onplaying) {
    engine.sound.ambiance.play()
    engine.sound.ambiance.volume = 0
    engine.sound.ambiance.loop = true;
  }
}

document.getElementById("import images").addEventListener('change', function(event) {
  const file = event.target.files[0];
            
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
                
    reader.onload = function(e) {
      var euh = document.createElement("img");
      document.getElementById("canvas").appendChild(euh);
      
      euh.id = file.name;
      euh.style.position = 'absolute';
      euh.style.top = '100px'
      euh.style.left = '100px'
      euh.src = e.target.result;
      euh.classList.add("wheel")
      
      euh.name = (engine.elementMakeCount+":P"); 
      euh.onclick = function (e) {
        if (!engine.playTest) {
          select(euh.id)
        }
      }
      engine.elementMakeCount++;
      
      alert("'"+file.name + "' add successful !")
      /*if (engine.elementData.length >= 2){
        engine.elementData += ","
      }
      engine.elementData += '"'+[[engine.elementMakeCount-1]+":P"]+'":{ "type":"'+"body"+'" }';
      
      console.log(engine.elementData)
      console.log(JSON.parse(engine.elementData+"}")[[engine.elementMakeCount]+":P"].type)
      */  
    };
                
    reader.readAsDataURL(file);
  }
});

document.getElementById("import project").addEventListener('change', function(event) {
  
  const file = event.target.files[0];
  const reader = new FileReader();
                
  reader.onload = function(e) {
    var dataFile = JSON.parse(e.target.result);
    console.log(dataFile);
    engine.elementMakeCount = 0;
    document.getElementById("projectName").value = file.name;
    
    if (document.getElementById('canvas').lastElementChild) {
      document.getElementById('canvas').lastElementChild.remove()
    }
    
    for (var i = 0; i < dataFile.projectData.length; i++) {
      const euh = document.createElement("img");
      document.getElementById("canvas").appendChild(euh);
      
      euh.id = dataFile.projectData[i].name;
      euh.style.position = 'absolute';
      euh.style.left = dataFile.projectData[i].position[0]+'px'
      euh.style.top = dataFile.projectData[i].position[1]+'px'
      euh.style.zIndex = dataFile.projectData[i].position[2];
      euh.style.scale = dataFile.projectData[i].scale;
      euh.src = dataFile.projectData[i].src;
      euh.name = (engine.elementMakeCount+":P"); 
      euh.classList.add(dataFile.projectData[i].type);
      euh.onclick = function (e) {
        if (!engine.playTest) {
          select(euh.id)
        }
      }
      
      engine.elementMakeCount++;
      
      //alert("'"+file.name + "' add successful !")
    };
  }
  reader.readAsText(file);

});

var opacityTime = 0;
setInterval(() => {
  if (engine.select !== null) {
    if (opacityTime == 0) {
      opacityTime = 1;
      document.getElementById(engine.select).style.opacity = "0.7";
    } else {
      opacityTime = 0;
      document.getElementById(engine.select).style.opacity = "0.5";
    }
  }  
},500)

setInterval(() => {
  if (engine.select !== null) {
    //document.getElementById(engine.select).style.opacity = "0.5";
  } else {
    if (engine.oldSelect !== null) {
      document.getElementById(engine.oldSelect).style.opacity = "1";
    }
  }
  
  if (engine.select !== null) {
    if (HPS_get("§inputName").value !== "") {
      HPS_get(engine.select).id = HPS_get("§inputName").value;
      engine.select = HPS_get("§inputName").value;
    } else {
      HPS_get("§inputName").value = " "
    }
    
    HPS_get(engine.select).classList = HPS_get("§type").value
    HPS_get(engine.select,true).left = HPS_get("§x").value + "px";
    HPS_get(engine.select,true).top = HPS_get("§y").value + "px";
    HPS_get(engine.select,true).zIndex = HPS_get("§z").value;
    HPS_get(engine.select,true).scale = HPS_get("§scale").value;
  }
  
  if (document.title !== "HTS Builder v"+engine.version+" | "+engine.projectName) {
    document.title = "HTS Builder v"+engine.version+" | "+engine.projectName
  }
  
  engine.projectName = document.getElementById("projectName").value;
},0)

function select(name) {
  if (name == engine.select) {
    HPS_get("§x").value = "";
    HPS_get("§y").value = "";
    HPS_get("§z").value = "";
    HPS_get("§scale").value = "";
    HPS_get("§type").value = "";

    HPS_get("§inputName").value = "";
    
    engine.currentId = "";
    engine.oldSelect = engine.select;
    engine.select = null;
  } else {
    //parseInt('245px',10) for remove px
    HPS_get("§x").value = parseInt(HPS_get(name,true).left,10);
    HPS_get("§y").value = parseInt(HPS_get(name,true).top,10);
    HPS_get("§z").value = HPS_get(name,true).zIndex;
    HPS_get("§scale").value = HPS_get(name,true).scale;
    
    HPS_get("§type").value = HPS_get(name).classList
    HPS_get("§inputName").value = HPS_get(name).id;
    
    engine.currentId = HPS_get(name).id;
    if (engine.select !== null) {
      engine.oldSelect = engine.select;
    }
    engine.select = name;
    
    if (engine.oldSelect !== null) {
      document.getElementById(engine.select).style.opacity = "1";
      document.getElementById(engine.oldSelect).style.opacity = "1";
    }
  }
}

function saveData() {
  var loop = 0;
  var child = null;
  const myElement = document.getElementById("canvas");
  engine.dataSave = `{ "project name":"`+engine.projectName+`", "projectData":[`
  
  for (var i = 0; i < engine.elementMakeCount; i++) {
    child = document.getElementsByName(i+":P")[0];
    //console.log(child)
    
    if (i !== engine.elementMakeCount) {
      engine.dataSave += `{ "name":"`+child.id+`", "position":["`+parseInt(child.style.left)+`","`+parseInt(child.style.top)+`","`+child.style.zIndex+`"], "scale":"`+child.style.scale+`","type":"`+child.className+`", "src":"`+child.src+`" }`;
    } 
    
    if (i == engine.elementMakeCount - 1) {
      engine.dataSave += `]}`
      HPS_saveFile(engine.projectName+".HTP",engine.dataSave);
    } else {
      engine.dataSave += ",                             ";
    }
  }
}

function resetEditorCanvas() {
  engine.elementMakeCount = 0;
  if (document.getElementById('canvas').lastElementChild) {
    document.getElementById('canvas').lastElementChild.remove()
  }
  document.getElementById("projectName").value = "untitle";
  engine.select = null
  engine.oldSelect = null
}

function play() {
  if (!engine.playTest) {
    engine.select = null;
    engine.oldSelect = null;
    
    HPS_makeCSSanim("tabMeta",0.3,"ease-out",1,[{ transform: "translate(-300px)" }]).onfinish = function ()
    {
    document.getElementById("tabMeta").style.visibility = "hidden";
    }
    document.getElementById("play/stop").src = "images/stop.png";
    engine.playTest = true;
    
    var child = null;
    for (var i = 0; i < engine.elementMakeCount; i++) {
      child = document.getElementsByName(i+":P")[0];
    
      if (i !== engine.elementMakeCount) {
        child.classList
        if (child.classList == "wheel") {
          
          var angle = 0;
          var loop = setInterval(() => {
            angle += 0.5
            child.style.transform = "rotate("+angle+"deg)"
            if (!engine.playTest) {
              clearInterval(loop)
              child.style.transform = "";
            }
          },0)
          console.log(engine)
        }
      } 
  }

    
  } else {
    for (var i = 0; i < engine.setintervalAll.length; i++) {
      clearInterval(engine.setintervalAll[0]);
    }
    
    engine.playTest = false;
    document.getElementById("play/stop").src = "images/play.png";
    document.getElementById("tabMeta").style.visibility = "visible";
  }
}