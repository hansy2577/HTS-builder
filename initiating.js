/* make GUI */

// GUI

//HPS_makeElement("",-5,87,1,(window.innerWidth + 3),3).style.cssText += "background-color: black; opacity: 0.5;"
HPS_makeElement("rail",-20,500,1,100,5,"sub-canvas").style.cssText += "background-color: white; opacity: 0.8;"
HPS_makeElement("rail2",-20,505,1,100,5,"sub-canvas").style.cssText += "background-color: black; opacity: 0.5;"


HPS_makeElement("",100,13,1,2,70).style.cssText += "background-color: black; opacity: 0.3;"
HPS_makeElement("",265,28,1,175,2).style.cssText += "background-color: black; opacity: 0.3;"
HPS_makeElement("",265,13,1,2,70).style.cssText += "background-color: black; opacity: 0.3;"
HPS_makeElement("",440,13,1,2,70).style.cssText += "background-color: black; opacity: 0.3;"

HPS_makeElement("",-5,165,1,150,3,"tabMeta").style.cssText += "background-color: black; opacity: 0.3;"

HPS_makeElement("",-38,225,1,130,3,"playTest").style.cssText += "background-color: black; opacity: 0.3;"

HPS_makeElement("element0",-1,550,1,(window.innerWidth - 5),30).style.cssText += "background-color: #4E526E;"


// button
function GUIresize(){
  HPS_get("rail",true).width = (window.innerWidth + 10) + "px";
  HPS_get("rail2",true).width = (window.innerWidth + 10) + "px";
  HPS_get("rail2",true).height = (window.innerHeight - 540) + "px";

  HPS_get("top bars",true).width = (window.innerWidth + 0.5) + "px";
  HPS_get("playTest").style.left = (window.innerWidth - 105) +"px";
  
  if ((window.innerHeight - 50) <= 550) {
    // manual
    HPS_get("element0").remove()
    HPS_get("move").style.top = (550)+"px";
    HPS_get("tabMeta").style.top = 0+"px";
  
    HPS_makeElement("element0",-1,550,1,(window.innerWidth - 5),30).style.cssText += "background-color: #4E526E;"
  } else {
    // auto
    HPS_get("element0").remove()
    HPS_get("move").style.top = (window.innerHeight - 25)+"px";
    HPS_get("tabMeta").style.top = ((window.innerHeight * 0.3) - 140)+"px";
    HPS_get("playTest").style.top = ((window.innerHeight * 0.3) - 170)+"px";

    HPS_makeElement("element0",-1,(window.innerHeight - 30.8),1,(window.innerWidth + 0.5),30).style.cssText += "background-color: #4E526E;"
  }
}

GUIresize()
window.onresize = function () {
  GUIresize()
}


HPS_makeImage("save","images/save.png",10,-85,1,0.28);
HPS_makeImage("play/stop","images/play.png",63,-85,1,0.2).onclick = function () {
  click()
  play()
};
HPS_makeImage("save","images/setting.png",110,-85,1,0.2);

// text
HPS_makeText("meta text","name: ",-10,146,1,0.55,"tabMeta").style.color = "white"; 

//HPS_makeImage("save","images/save.png",-50,-85,1,0.28);
//HPS_makeImage("save","images/save.png",-50,-85,1,0.28);