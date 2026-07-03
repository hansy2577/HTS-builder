// made for funky.mit :] and made by me 

let fmsValue = {
  modsList: null
}

function HPS_get(id,isStyle) {
  if (isStyle) {
    return document.getElementById(id).style;
  } else {
    return document.getElementById(id);
  }
}

function HPS_makeElement(id = "element",x = 1,y = 1,z = 1,w = 100,h = 100,putIn = "default") {
  var sprite = document.createElement("div")
  if (putIn !== "default") {
    document.getElementById(putIn).appendChild(sprite);
  } else {
    document.body.appendChild(sprite);
  }
  
  sprite.id = id;
  sprite.style.position = "absolute";
  sprite.style.width = w + "px";
  sprite.style.height = h + "px";
  sprite.style.backgroundColor = "red";
  sprite.style.left = x + "px";
  sprite.style.top = y + "px";
  return sprite;
}

function HPS_makeText(id = "element",text = "Hello word !",x = 1,y = 1,z = 1,scale = 1,putIn = "default") {
  var sprite = document.createElement("a")
  if (putIn !== "default") {
    document.getElementById(putIn).appendChild(sprite);
  } else {
    document.body.appendChild(sprite);
  }
  
  sprite.style.scale = scale;
  sprite.id = id;
  sprite.innerText = text;
  sprite.style.position = "absolute";
  sprite.style.left = x + "px";
  sprite.style.top = y + "px";
  return sprite;
}

function HPS_makeFolder(id = "element",putIn = "default") {
  var sprite = document.createElement("div")
  if (putIn !== "default") {
    document.getElementById(putIn).appendChild(sprite);
  } else {
    document.body.appendChild(sprite);
  }
  
  sprite.id = id;
  sprite.style.position = "absolute";
  sprite.style.left = "0px";
  sprite.style.top = "0px";
  return sprite;
}

function HPS_saveFile(filename = "myText",data = "hello words !",as = "text/plain") {
  try {
    const blob = new Blob([data], { as });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url); // Cleanup memory
  } catch (err) {
    alert("Download failed | reason :", err);
  }
}

function HPS_makeImage(id = "element",src,x = 1,y = 1,z = 1,scale = 1,putIn = "default") {
  var sprite = document.createElement("img")
  if (putIn !== "default") {
    document.getElementById(putIn).appendChild(sprite);
  } else {
    document.body.appendChild(sprite);
  }
  
  sprite.id = id;
  sprite.src = src;
  sprite.onerror = function () {
    alert("fail to load '"+id+"' image")
  }
  sprite.style.position = "absolute";
  sprite.style.left = x + "px";
  sprite.style.top = y + "px";
  sprite.style.scale = scale;
  return sprite;
}


function HPS_makeCSSanim(id,duration = 1,easing = "ease",loopTime = "Infinity",anim) {
  var doc = document.getElementById(id).animate(
  anim,{ duration: duration * 1000, easing: easing, iterations: loopTime, })
  return doc;
}

function HPS_playScript(id = "myScript",src = "scripts/myScript.js") {
  for (var i = 0; i < src.length; i++) {
    var script = document.createElement("script");
  
    script.src = src[0];
    
    script.id = id;
    document.body.appendChild(script);
    
    return script;
  }
}
