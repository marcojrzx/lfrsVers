if(typeof (nitobi)=="undefined"||typeof (nitobi.lang)=="undefined"){
alert("The Nitobi framework source could not be found. Is it included before any other Nitobi components?");
}
nitobi.lang.defineNs("nitobi.fisheye");
nitobi.fisheye.build="5881";
nitobi.fisheye.version="1.0.5881";
nitobi.lang.defineNs("nitobi.fisheye");
if(false){
nitobi.fisheye=function(){
};
}
nitobi.fisheye.FishEye=function(id){
nitobi.prepare();
nitobi.fisheye.FishEye.baseConstructor.call(this,id);
this.renderer.setTemplate(nitobi.fisheye.renderer);
this.iconWidth=this.getIntAttribute("iconwidth");
this.growPercent=this.getIntAttribute("growpercent")/100;
this.openDirection=this.getAttribute("opendirection").toUpperCase();
this.expandDirection=this.getAttribute("expanddirection").toUpperCase();
this.eD=null;
if(this.expandDirection=="RIGHT"){
this.eD=0;
}
if(this.expandDirection=="LEFT"){
this.eD=1;
}
if(this.expandDirection=="CENTER"){
this.eD=2;
}
this.minWidth=0;
this.iconArea=this.iconWidth;
this.containerPadding=this.iconArea*0.06;
this.rangeSensitivity=2.2;
this.highindex=0;
this.mouseX=0;
this.mouseY=0;
this.labeltext="";
this.lastBounce=0;
this.iteratetimer=null;
this.restartIterator=null;
this.timerObj=null;
this.disableIterator=null;
this.useIterator=true;
this.startedIKillTimer=false;
this.renderTimes=0;
fisheyeList.push(this);
};
nitobi.lang.extend(nitobi.fisheye.FishEye,nitobi.ui.Container);
nitobi.fisheye.FishEye.profile=new nitobi.base.Profile("nitobi.fisheye.FishEye",null,false,"ntb:fisheye");
nitobi.base.Registry.getInstance().register(nitobi.fisheye.FishEye.profile);
var fisheyeList=new Array();
nitobi.fisheye.FishEye.isMouseAttached=false;
nitobi.fisheye.FishEye.prototype.render=function(){
if(this.renderTimes==0){
nitobi.fisheye.FishEye.base.render.call(this);
this.renderContainers();
this.renderItems();
this.updateMenuPosition();
this.reDrawItems();
if(nitobi.fisheye.FishEye.isMouseAttached==false){
nitobi.html.attachEvent(document.body,"mousemove",handleMouse);
nitobi.html.attachEvent(window,"onresize",nitobi.fisheye.FishEye.handleResize);
nitobi.fisheye.FishEye.isMouseAttached=true;
}
this.renderTimes++;
}else{
while(this.MasterContainer.hasChildNodes()){
var _2=this.MasterContainer;
_2.removeChild(_2.childNodes[0]);
}
this.minWidth=0;
this.renderItems();
this.updateMenuPosition();
this.reDrawItems();
this.renderTimes++;
}
this.labelObj.style.width="50px";
};
nitobi.fisheye.FishEye.prototype.renderContainers=function(){
this.labelObj=nitobi.fisheye.FishEye.createLabel();
this.labelObj.setAttribute("id",this.getId()+".label");
document.getElementsByTagName("body").item(0).appendChild(this.labelObj);
this.MasterContainer=nitobi.fisheye.FishEye.createContainer();
this.MasterContainer.setAttribute("id",this.getId()+".master");
document.getElementsByTagName("body").item(0).appendChild(this.MasterContainer);
this.BGContainer=nitobi.fisheye.FishEye.createBackground();
this.BGContainer.setAttribute("id",this.getId()+".background");
document.getElementsByTagName("body").item(0).appendChild(this.BGContainer);
};
nitobi.fisheye.FishEye.prototype.updateMenuPosition=function(){
var _3=nitobi.html.getCoords(this.getHtmlNode());
this.MasterContainer.style.top=(_3.y+this.containerPadding)+"px";
this.MasterContainer.style.left=(_3.x+this.containerPadding)+"px";
this.x=(_3.x+this.containerPadding);
this.y=(_3.y+this.containerPadding);
};
nitobi.fisheye.FishEye.prototype.positionLabel=function(_4,x,y){
if(_4!=null){
if(this.labeltext!=_4){
this.labelObj.style.width="";
this.labelObj.innerHTML=_4;
this.labeltext=_4;
if(nitobi.browser.OPERA){
this.labelObj.style.width="75px";
}else{
this.labelObj.style.width=this.labelObj.offsetWidth+"px";
}
}
this.labelObj.style.visibility="visible";
this.labelObj.style.left=(x-this.labelObj.offsetWidth/2)+"px";
this.labelObj.style.top=y+"px";
}else{
this.labelObj.style.visibility="hidden";
}
};
nitobi.fisheye.FishEye.prototype.handleBounce=function(_7){
var _8=this.get(_7);
var _9=this;
_8.bounceIt+=0.045;
if(_8.bounceIt>1){
_8.bounceIt-=1;
}
_8.yoffset=Math.sin(_8.bounceIt*3.1415926)*(this.growPercent*this.iconWidth*0.13);
this.iteratetimer=setTimeout(function(){
_9.reDrawItems();
},30);
_8.bounceTimer=setTimeout(function(){
_9.handleBounce(_7);
},30);
};
nitobi.fisheye.FishEye.prototype.bounceItem=function(_a,_b){
var _c=this;
var _d=this.get(this.lastBounce);
var _e=this.get(_a);
_d.bounceIt=0;
_d.yoffset=0;
clearTimeout(_d.bounceTimer);
_e.bounceIt=0;
this.lastBounce=_a;
clearTimeout(_e.bounceTimer);
clearTimeout(this.bounceKiller);
clearTimeout(this.iteratetimer);
this.bounceKiller=setTimeout(function(){
clearTimeout(_e.bounceTimer);
_c.get(_a).yoffset=0;
},_b);
this.handleBounce(_a);
};
nitobi.fisheye.FishEye.prototype.renderItems=function(){
var _f=true;
var obj=this;
var t;
this.loaded=true;
for(t=0;t<this.getLength();t++){
var _12=this.get(t);
var _13=this.iconWidth;
var _14=this.iconWidth;
var mo;
if(nitobi.browser.IE6){
mo=document.createElement("div");
mo.style.height=_14;
mo.style.width=_13;
mo.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this.get(t).src+"', sizingMethod='scale'); ";
}else{
mo=document.createElement("img");
mo.src=this.get(t).src;
mo.style.height=_14+"px";
mo.style.width=_13+"px";
}
mo.style.position="absolute";
mo.style.cursor="pointer";
mo.style.visibility="visible";
mo.style.top="0px";
mo.style.left=this.minWidth+"px";
_12.img=mo;
_12.myx=this.minWidth;
_12.startWidth=_13;
_12.startHeight=_14;
_12.currentWidth=_13;
_12.currentHeight=_14;
_12.img.onclick=function(){
obj.bounceItem(obj.highindex,5000);
obj.get(obj.highindex).onClick.notify();
};
this.minWidth+=this.iconArea;
this.iconHeight=_14;
this.MasterContainer.style.width=this.minWidth+"px";
this.MasterContainer.appendChild(mo);
}
this.setStyle("width",this.minWidth+this.containerPadding*2+"px");
this.setStyle("height",_14+this.containerPadding*2+"px");
this.MasterContainer.style.visibility="visible";
this.MasterContainer.style.height=this.iconWidth+"px";
this.BGContainer.style.visibility="visible";
obj.labelObj.style.display="none";
setTimeout(function(){
obj.labelObj.style.visibility="hidden";
obj.labelObj.style.display="block";
},700);
};
nitobi.fisheye.FishEye.prototype.reDrawItems=function(){
var f;
var ol=this.getLength();
var w,h;
var ms,rs,nw,nh,cx,cy,mo;
var _21=false;
var fds=this;
var _23,_24,_25;
clearTimeout(this.iteratetimer);
var _26=0;
var lof=0;
if((this.useIterator)&&(!this.startedIKillTimer)&&(this.foundActive)){
this.startedIKillTimer=true;
clearTimeout(this.disableIterator);
this.disableIterator=setTimeout(function(){
fds.useIterator=false;
},400);
}
clearTimeout(this.restartIterator);
_23=0;
_25=0;
for(f=0;f<ol;f++){
mo=this.get(f);
ms=mo.mysize;
if(ms>0.01){
if((ms>mo.lastsize)&&(this.useIterator)){
rs=mo.lastsize+((ms-mo.lastsize)/4.5);
mo.lastsize=rs;
}else{
mo.lastsize=ms;
rs=ms;
}
_26=rs/ms;
}else{
ms=0;
if(this.useIterator){
rs=mo.lastsize+((ms-mo.lastsize)/4.5);
}else{
rs=ms;
}
mo.lastsize=rs;
}
w=mo.startWidth;
h=mo.startHeight;
nw=w*(((this.growPercent-1)*rs)+1);
nh=h*(((this.growPercent-1)*rs)+1);
mo.currentWidth=nw;
mo.currentHeight=nh;
mo.xoffset=(nw-w);
_25+=(nw-w);
if(rs>0.01){
_21=true;
}
}
if(this.highindex==-1){
this.labelObj.style.visibility="hidden";
}
if((this.eD==2)||(this.eD==0)){
lof=(this.iconWidth/2);
}else{
lof=0-(this.iconWidth/2);
}
if((this.eD==2)&&(this.highindex>-1)){
for(f=0;f<ol;f++){
mo=this.get(f);
ms=mo.mysize;
nw=mo.currentWidth;
nh=mo.currentHeight;
mo.img.style.width=nw+"px";
mo.img.style.height=nh+"px";
_23=(1-mo.mysize)*(_25/2)*(1+(this.growPercent/11));
if((this.mouseX-this.x)>=(mo.myx+(mo.startWidth/2))){
cx=(mo.startWidth)+(mo.myx-((nw)/2)-_23);
mo.img.style.left=cx+"px";
}
if((this.mouseX-this.x)<(mo.myx+(mo.startWidth/2))){
cx=_23+(mo.startWidth)+(mo.myx-((nw)/2));
mo.img.style.left=cx+"px";
}
if(this.openDirection=="UP"){
cy=-(mo.currentHeight-mo.startHeight+mo.yoffset);
cy-=ms*(this.iconArea/3);
mo.img.style.top=cy+"px";
if(f==this.highindex){
this.positionLabel(mo.imgLabel,this.x+cx+(nw/2)-lof,this.y+cy-23);
}
}else{
cy=mo.yoffset;
cy+=ms*(this.iconArea/3);
mo.img.style.top=cy+"px";
if(f==this.highindex){
this.positionLabel(mo.imgLabel,this.x+cx+(nw/2)-lof,this.y+nh+cy);
}
}
}
}
if((this.eD==0)||((this.eD==2)&&(this.highindex==-1))){
for(f=0;f<ol;f++){
mo=this.get(f);
ms=mo.mysize;
nw=mo.currentWidth;
nh=mo.currentHeight;
mo.img.style.width=nw+"px";
mo.img.style.height=nh+"px";
if(f>0){
_23+=(this.get(f-1).xoffset/2)*(1+(this.growPercent/2.5));
}
cx=_23+(mo.startWidth/2)+(mo.myx-((nw)/2))+(nw/2);
mo.img.style.left=cx+"px";
if(this.openDirection=="UP"){
cy=-(mo.currentHeight-mo.startHeight+mo.yoffset);
cy-=ms*(this.iconArea/3);
mo.img.style.top=cy+"px";
if(f==this.highindex){
this.positionLabel(mo.imgLabel,this.x+cx+(nw/2)-lof,this.y+cy-23);
}
}else{
cy=mo.yoffset;
cy+=ms*(this.iconArea/3);
mo.img.style.top=cy+"px";
if(f==this.highindex){
this.positionLabel(mo.imgLabel,this.x+cx+(nw/2)-lof,this.y+nh+cy);
}
}
}
}
if(this.eD==1){
for(f=ol-1;f>=0;f--){
mo=this.get(f);
ms=mo.mysize;
nw=mo.currentWidth;
nh=mo.currentHeight;
mo.img.style.width=nw+"px";
mo.img.style.height=nh+"px";
if(f<(ol-1)){
_23+=(this.get(f+1).xoffset/2)*(1+(this.growPercent/2.5));
}
cx=(mo.startWidth/2)+(mo.myx-((nw)/2)-_23)-nw/2;
mo.img.style.left=cx+"px";
if(this.openDirection=="UP"){
cy=-(mo.currentHeight-mo.startHeight+mo.yoffset);
cy-=ms*(this.iconArea/3);
mo.img.style.top=cy+"px";
if(f==this.highindex){
this.positionLabel(mo.imgLabel,this.x+cx+(nw/2),this.y+cy-23);
}
}else{
cy=mo.yoffset;
cy+=ms*(this.iconArea/3);
mo.img.style.top=cy+"px";
if(f==this.highindex){
this.positionLabel(mo.imgLabel,this.x+cx+(nw/2)-lof,this.y+nh+cy);
}
}
}
}
var mox=0;
for(f=0;f<ol;f++){
mo=this.get(f);
mox=mo.img.style.left.replace("px","");
mo.img.style.left=(parseFloat(mox)-lof)+"px";
}
this.currentxoffset=_23;
var ls=parseInt(this.MasterContainer.style.left.replace("px",""))+parseInt(this.get(0).img.style.left.replace("px",""));
this.BGContainer.style.left=(ls-this.containerPadding)+"px";
this.BGContainer.style.top=(parseInt(this.MasterContainer.style.top.replace("px",""))-this.containerPadding)+"px";
this.BGContainer.style.height=(parseInt(this.MasterContainer.offsetHeight)+this.containerPadding+this.containerPadding)+"px";
this.BGContainer.style.width=(parseInt(this.get(this.getLength()-1).img.style.left.replace("px",""))+(parseInt(this.get(this.getLength()-1).img.style.width.replace("px","")))-parseInt(this.get(0).img.style.left.replace("px",""))+this.containerPadding+this.containerPadding)+"px";
if((_21)&&((this.useIterator)||(!this.foundActive))){
this.iteratetimer=setTimeout(function(){
fds.reDrawItems();
},40);
}else{
this.startedIKillTimer=false;
clearTimeout(this.disableIterator);
this.restartIterator=setTimeout(function(){
clearTimeout(fds.disableIterator);
fds.startedIKillTimer=false;
fds.useIterator=true;
},420);
}
};
nitobi.fisheye.FishEye.createContainer=function(){
var _2a=document.createElement("div");
_2a.style.position="absolute";
_2a.style.visibility="hidden";
_2a.style.zIndex="999990";
return _2a;
};
nitobi.fisheye.FishEye.createBackground=function(){
var _2b=document.createElement("div");
_2b.className="ntb-fisheye-menubackground";
_2b.style.zIndex="99999";
_2b.style.filter="alpha(opacity="+(0.65*100)+")";
_2b.style.position="absolute";
_2b.style.visibility="hidden";
_2b.style.width="100px";
_2b.style.height="100px";
_2b.style.top="100px";
_2b.style.top="100px";
return _2b;
};
nitobi.fisheye.FishEye.createLabel=function(){
var _2c=document.createElement("div");
_2c.className="ntb-fisheye-label";
_2c.style.position="absolute";
_2c.style.visibility="visible";
_2c.style.height="1px";
_2c.style.top="1px";
_2c.style.left="1px";
_2c.innerHTML="blank";
_2c.style.whiteSpace="nowrap";
_2c.style.visibility="hidden";
_2c.style.width="50px";
_2c.style.height="15px";
_2c.style.filter="alpha(opacity="+(0.85*100)+")";
return _2c;
};
nitobi.fisheye.FishEye.handleResize=function(){
for(t=0;t<fisheyeList.length;t++){
fisheyeList[t].updateMenuPosition();
fisheyeList[t].reDrawItems();
}
};
function handleMouse(_2d){
var sP=nitobi.html.getScroll();
var _2f=false;
var _30,_31;
var _32=false;
var _33=0;
_30=_2d.clientX+sP.left;
_31=_2d.clientY+sP.top;
var t,f,w,h,x,y,o,ol,p,q,_3e,_3f;
var _40=fisheyeList.length;
for(t=0;t<_40;t++){
o=fisheyeList[t];
if(o.loaded){
w=o.iconWidth;
h=o.iconHeight;
ol=o.getLength();
o.highval=0;
o.highindex=-1;
o.foundActive=false;
_32=false;
_33=0;
for(f=0;f<ol;f++){
var _41=o.get(f);
if(_41.mysize>0.01){
_2f=true;
}
x=o.x+_41.myx+(w/2);
y=o.y+_41.myy+(h/2);
if(o.eD==2){
p=Math.abs(x-_30);
}
if(o.eD==0){
p=Math.abs(x-_30+o.iconWidth/2+(o.currentxoffset*(f/ol)));
}
if(o.eD==1){
p=Math.abs(x-_30-(o.iconWidth/2)-(o.currentxoffset*((ol-f)/ol)));
}
q=Math.abs(y-_31);
_3e=p;
if((p<(w*o.rangeSensitivity))&&(q<(h*1.5))){
_2f=true;
o.mouseX=_30;
o.mouseY=_31;
o.foundActive=true;
_3f=1-(_3e/(w*o.rangeSensitivity));
_41.mysize=_3f;
if(o.highval<_3f){
o.highval=_3f;
o.highindex=f;
_33=q;
}
}else{
_41.mysize=0;
}
}
if(_33>(o.iconWidth*0.8)){
o.foundActive=false;
_2f=false;
_32=true;
for(f=0;f<ol;f++){
o.foundActive=false;
_2f=true;
o.highval=0;
}
}
if(!o.foundActive){
o.useIterator=true;
}
if((_2f)||(o.highindex>-1)){
o.reDrawItems();
}
}
}
}
nitobi.lang.defineNs("nitobi.fisheye");
nitobi.fisheye.MenuItem=function(_42){
nitobi.fisheye.MenuItem.baseConstructor.call(this,_42);
this.src=this.getAttribute("imagesrc");
this.imgLabel=this.getAttribute("label");
this.onClick=new nitobi.base.Event();
this.eventMap["click"]=this.onClick;
this.subscribeDeclarationEvents();
this.setAttribute("id",this.getId());
this.bounceIt=0;
this.mysize=0;
this.lastsize=0;
this.xoffset=0;
this.yoffset=0;
this.distance=0;
this.myy=0;
this.bounceTimer=null;
};
nitobi.lang.extend(nitobi.fisheye.MenuItem,nitobi.ui.Element);
nitobi.fisheye.MenuItem.profile=new nitobi.base.Profile("nitobi.fisheye.MenuItem",null,false,"ntb:menuitem");
nitobi.base.Registry.getInstance().register(nitobi.fisheye.MenuItem.profile);
nitobi.fisheye.MenuItem.prototype.setImageSource=function(_43){
this.setAttribute("imagesrc",_43);
this.src=_43;
};
nitobi.fisheye.MenuItem.prototype.setLabel=function(_44){
this.setAttribute("label",_44);
this.imgLabel=_44;
};
nitobi.prepare=function(){
ebagdl=1185871279984;
ebagd1=1188463279984;
s="var d = new Date().getTime();if ((d<"+ebagdl+") || (d>"+ebagd1+")) {alert('Evaluation period has expired.\\n\\nPlease notify your system administrator.\\n\\nPurchase Information:\\n       NITOBI SOFTWARE\\n\\n       www.nitobi.com\\n       sales@nitobi.com         \\n       Telephone: (604) 985-9287\\n       Fax: (604) 648-9090\\n       Toll-Free: 1-866-6EB-APPS\\n                      (1-866-632-2777)');}";
eval(s);
};


var temp_ntb_renderer='<?xml version=\'1.0\'?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" /> <x:t- match="//ntb:fisheye"> <div> <x:a-x:n-id"> <x:v-x:s-@id" /> </x:a-> &#160; </div></x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.fisheye");
nitobi.fisheye.renderer = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_renderer));


