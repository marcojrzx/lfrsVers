if(typeof (nitobi)=="undefined"){
nitobi=function(){
};
}
if(false){
nitobi.lang=function(){
};
}
if(typeof (nitobi.lang)=="undefined"){
nitobi.lang={};
}
nitobi.lang.defineNs=function(_1){
var _2=_1.split(".");
var _3="";
var _4="";
for(var i=0;i<_2.length;i++){
_3+=_4+_2[i];
_4=".";
if(eval("typeof("+_3+")")=="undefined"){
eval(_3+"={}");
}
}
};
nitobi.lang.extend=function(_6,_7){
function inheritance(){
}
inheritance.prototype=_7.prototype;
_6.prototype=new inheritance();
_6.prototype.constructor=_6;
_6.baseConstructor=_7;
if(_7.base){
_7.prototype.base=_7.base;
}
_6.base=_7.prototype;
};
nitobi.lang.implement=function(_8,_9){
if(typeof (_9)=="undefined"||_9==null){
var _a="nitobi.lang.implement argument interface_ is null or undefined.  The most likely cause of this is that a js file has not been included, or has been included in the wrong order.";
nitobi.lang.throwError(_a);
}
for(var _b in _9.prototype){
if(typeof (_8.prototype[_b])=="undefined"||_8.prototype[_b]==null){
_8.prototype[_b]=_9.prototype[_b];
}
}
};
nitobi.lang.isDefined=function(a){
return (typeof (a)!="undefined");
};
nitobi.lang.getBool=function(a){
if(null==a){
return null;
}
if(typeof (a)=="boolean"){
return a;
}
return a.toLowerCase()=="true";
};
nitobi.lang.type={XMLNODE:0,HTMLNODE:1,ARRAY:2,XMLDOC:3};
nitobi.lang.typeOf=function(_e){
var t=typeof (_e);
if(t=="object"){
if(_e.blur){
return nitobi.lang.type.HTMLNODE;
}
if(_e.nodeName&&_e.nodeName.toLowerCase()==="#document"){
return nitobi.lang.type.XMLDOC;
}
if(_e.nodeName){
return nitobi.lang.type.XMLNODE;
}
if(_e instanceof Array){
return nitobi.lang.type.ARRAY;
}
}
return t;
};
nitobi.lang.toBool=function(_10,_11){
if(typeof (_11)!="undefined"){
if((typeof (_10)=="undefined")||(_10=="")||(_10==null)){
_10=_11;
}
}
_10=_10.toString()||"";
_10=_10.toUpperCase();
if((_10=="Y")||(_10=="1")||(_10=="TRUE")){
return true;
}else{
return false;
}
};
nitobi.lang.boolToStr=function(_12){
if(typeof (_12)=="boolean"){
if(_12){
return "1";
}else{
return "0";
}
}else{
return _12;
}
};
nitobi.lang.close=function(_13,_14,_15){
if(null==_15){
return function(){
return _14.apply(_13,arguments);
};
}else{
return function(){
return _14.apply(_13,_15);
};
}
};
nitobi.lang.after=function(_16,_17,_18,_19){
var _1a=_16[_17];
var _1b=_18[_19];
if(_19 instanceof Function){
_1b=_19;
}
_16[_17]=function(){
_1a.apply(_16,arguments);
_1b.apply(_18,arguments);
};
_16[_17].orig=_1a;
};
nitobi.lang.before=function(_1c,_1d,_1e,_1f){
var _20=_1c[_1d];
var _21=_1e[_1f];
if(_1f instanceof Function){
_21=_1f;
}
_1c[_1d]=function(){
_21.apply(_1e,arguments);
_20.apply(_1c,arguments);
};
_1c[_1d].orig=_20;
};
nitobi.lang.forEach=function(arr,_23){
var len=arr.length;
for(var i=0;i<len;i++){
_23.call(this,arr[i],i);
}
_23=null;
};
nitobi.lang.throwError=function(_26,_27){
var msg=_26;
if(_27!=null){
msg+="\n - because "+nitobi.lang.getErrorDescription(_27);
}
throw msg;
};
nitobi.lang.getErrorDescription=function(_29){
var _2a=(typeof (_29.description)=="undefined")?_29:_29.description;
return _2a;
};
nitobi.lang.newObject=function(_2b,_2c,_2d){
var a=_2c;
if(null==_2d){
_2d=0;
}
var e="new "+_2b+"(";
var _30="";
for(var i=_2d;i<a.length;i++){
e+=_30+"a["+i+"]";
_30=",";
}
e+=")";
return eval(e);
};
nitobi.lang.getLastFunctionArgs=function(_32,_33){
var a=new Array(_32.length-_33);
for(var i=_33;i<_32.length;i++){
a[i-_33]=_32[i];
}
return a;
};
nitobi.lang.getFirstHashKey=function(_36){
for(var x in _36){
return x;
}
};
nitobi.lang.getFirstFunction=function(obj){
for(var x in obj){
if(obj[x]!=null&&typeof (obj[x])=="function"&&typeof (obj[x].prototype)!="undefined"){
return {name:x,value:obj[x]};
}
}
return null;
};
nitobi.lang.dispose=function(_3a,_3b){
try{
if(_3b!=null){
var _3c=_3b.length;
for(var i=0;i<_3c;i++){
if(typeof (_3b[i].dispose)=="function"){
_3b[i].dispose();
}
if(typeof (_3b[i])=="function"){
_3b[i].call(_3a);
}
_3b[i]=null;
}
}
for(var _3e in _3a){
if(_3a[_3e].dispose instanceof Function){
_3a[_3e].dispose();
}
_3a[_3e]=null;
}
}
catch(e){
}
};
nitobi.lang.parseNumber=function(val){
var num=parseInt(val);
return (isNaN(num)?0:num);
};
nitobi.lang.numToAlpha=function(num){
if(typeof (nitobi.lang.numAlphaCache[num])==="string"){
return nitobi.lang.numAlphaCache[num];
}
var ck1=num%26;
var ck2=Math.floor(num/26);
var _44=(ck2>0?String.fromCharCode(96+ck2):"")+String.fromCharCode(97+ck1);
nitobi.lang.alphaNumCache[_44]=num;
nitobi.lang.numAlphaCache[num]=_44;
return _44;
};
nitobi.lang.alphaToNum=function(_45){
if(typeof (nitobi.lang.alphaNumCache[_45])==="number"){
return nitobi.lang.alphaNumCache[_45];
}
var j=0;
var num=0;
for(var i=_45.length-1;i>=0;i--){
num+=(_45.charCodeAt(i)-96)*Math.pow(26,j++);
}
num=num-1;
nitobi.lang.alphaNumCache[_45]=num;
nitobi.lang.numAlphaCache[num]=_45;
return num;
};
nitobi.lang.alphaNumCache={};
nitobi.lang.numAlphaCache={};
nitobi.lang.toArray=function(obj,_4a){
return Array.prototype.splice.call(obj,_4a||0);
};
nitobi.lang.merge=function(_4b,_4c){
var r={};
for(var i=0;i<arguments.length;i++){
var a=arguments[i];
for(var x in arguments[i]){
r[x]=a[x];
}
}
return r;
};
nitobi.lang.xor=function(){
var b=false;
for(var j=0;j<arguments.length;j++){
if(arguments[j]&&!b){
b=true;
}else{
if(arguments[j]&&b){
return false;
}
}
}
return b;
};
nitobi.lang.zeros="00000000000000000000000000000000000000000000000000000000000000000000";
nitobi.lang.padZeros=function(num,_54){
_54=_54||2;
num=num+"";
return nitobi.lang.zeros.substr(0,Math.max(_54-num.length,0))+num;
};
nitobi.lang.noop=function(){
};
nitobi.lang.defineNs("nitobi.lang");
nitobi.lang.Math=function(){
};
nitobi.lang.Math.sinTable=Array();
nitobi.lang.Math.cosTable=Array();
nitobi.lang.Math.rotateCoords=function(_55,_56,_57){
var _58=_57*0.01745329277777778;
if(nitobi.lang.Math.sinTable[_58]==null){
nitobi.lang.Math.sinTable[_58]=Math.sin(_58);
nitobi.lang.Math.cosTable[_58]=Math.cos(_58);
}
var cR=nitobi.lang.Math.cosTable[_58];
var sR=nitobi.lang.Math.sinTable[_58];
var x=_55*cR-_56*sR;
var y=_56*cR+_55*sR;
return {x:x,y:y};
};
nitobi.lang.Math.returnAngle=function(_5d,_5e,_5f,_60){
return Math.atan2(_60-_5e,_5f-_5d)/0.01745329277777778;
};
nitobi.lang.Math.returnDistance=function(x1,y1,x2,y2){
return Math.sqrt(((x2-x1)*(x2-x1))+((y2-y1)*(y2-y1)));
};
nitobi.lang.defineNs("nitobi.toolkit");
nitobi.toolkit.build="5881";
nitobi.toolkit.version="1.0.5881";
nitobi.lang.defineNs("nitobi");
nitobi.Object=function(){
this.disposal=new Array();
};
nitobi.Object.prototype.setValues=function(_65){
for(var _66 in _65){
if(this[_66]!=null){
if(this[_66].subscribe!=null){
}else{
this[_66]=_65[_66];
}
}else{
if(this[_66] instanceof Function){
this[_66](_65[_66]);
}else{
if(this["set"+_66] instanceof Function){
this["set"+_66](_65[_66]);
}else{
this[_66]=_65[_66];
}
}
}
}
};
nitobi.Object.prototype.dispose=function(){
if(this.disposing){
return;
}
this.disposing=true;
var _67=this.disposal.length;
for(var i=0;i<_67;i++){
if(disposal[i] instanceof Function){
disposal[i].call(context);
}
disposal[i]=null;
}
for(var _69 in this){
if(this[_69].dispose instanceof Function){
this[_69].dispose.call(this[_69]);
}
this[_69]=null;
}
};
if(false){
nitobi.base=function(){
};
}
nitobi.lang.defineNs("nitobi.base");
nitobi.base.uid=1;
nitobi.base.getUid=function(){
return "ntb__"+(nitobi.base.uid++);
};
nitobi.lang.defineNs("nitobi.browser");
if(false){
nitobi.browser=function(){
};
}
nitobi.browser.UNKNOWN=true;
nitobi.browser.IE=false;
nitobi.browser.IE6=false;
nitobi.browser.IE7=false;
nitobi.browser.MOZ=false;
nitobi.browser.SAFARI=false;
nitobi.browser.OPERA=false;
nitobi.browser.XHR_ENABLED;
nitobi.browser.detect=function(){
var _6a=[{string:navigator.vendor,subString:"Apple",identity:"Safari"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}];
var _6b="Unknown";
for(var i=0;i<_6a.length;i++){
var _6d=_6a[i].string;
var _6e=_6a[i].prop;
if(_6d){
if(_6d.indexOf(_6a[i].subString)!=-1){
_6b=_6a[i].identity;
break;
}
}else{
if(_6e){
_6b=_6a[i].identity;
break;
}
}
}
nitobi.browser.IE=(_6b=="Explorer");
nitobi.browser.IE6=(nitobi.browser.IE&&!window.XMLHttpRequest);
nitobi.browser.IE7=(nitobi.browser.IE&&window.XMLHttpRequest);
nitobi.browser.MOZ=(_6b=="Netscape"||_6b=="Firefox");
nitobi.browser.SAFARI=(_6b=="Safari");
nitobi.browser.OPERA=(_6b=="Opera");
nitobi.browser.XHR_ENABLED=nitobi.browser.OPERA||nitobi.browser.SAFARI||nitobi.browser.MOZ||nitobi.browser.IE;
nitobi.browser.UNKNOWN=!(nitobi.browser.IE||nitobi.browser.MOZ||nitobi.browser.SAFARI);
};
nitobi.browser.detect();
if(nitobi.browser.IE6){
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
}
nitobi.lang.defineNs("nitobi.browser");
nitobi.browser.Cookies=function(){
};
nitobi.lang.extend(nitobi.browser.Cookies,nitobi.Object);
nitobi.browser.Cookies.get=function(id){
var _70,end;
if(document.cookie.length>0){
_70=document.cookie.indexOf(id+"=");
if(_70!=-1){
_70+=id.length+1;
end=document.cookie.indexOf(";",_70);
if(end==-1){
end=document.cookie.length;
}
return unescape(document.cookie.substring(_70,end));
}
}
return null;
};
nitobi.browser.Cookies.set=function(id,_73,_74){
var _75=new Date();
_75.setTime(_75.getTime()+(_74*24*3600*1000));
document.cookie=id+"="+escape(_73)+((_74==null)?"":"; expires="+_75.toGMTString());
};
nitobi.browser.Cookies.remove=function(id){
if(nitobi.browser.Cookies.get(id)){
document.cookie=id+"="+"; expires=Thu, 01-Jan-70 00:00:01 GMT";
}
};
nitobi.lang.defineNs("nitobi.xml");
nitobi.xml=function(){
};
nitobi.xml.nsPrefix="ntb:";
nitobi.xml.nsDecl="xmlns:ntb=\"http://www.nitobi.com\"";
if(nitobi.browser.IE){
var inUse=false;
nitobi.xml.XslTemplate=new ActiveXObject("MSXML2.XSLTemplate.3.0");
}
if(nitobi.browser.MOZ){
nitobi.xml.Serializer=new XMLSerializer();
nitobi.xml.DOMParser=new DOMParser();
}
if(!nitobi.browser.IE&&!nitobi.browser.MOZ){
}
nitobi.xml.getChildNodes=function(_77){
if(nitobi.browser.IE){
return _77.childNodes;
}else{
return _77.selectNodes("./*");
}
};
nitobi.xml.indexOfChildNode=function(_78,_79){
var _7a=nitobi.xml.getChildNodes(_78);
for(var i=0;i<_7a.length;i++){
if(_7a[i]==_79){
return i;
}
}
return -1;
};
nitobi.xml.createXmlDoc=function(xml){
if(xml!=null&&xml.documentElement!=null){
return xml;
}
var doc=null;
if(nitobi.browser.IE){
doc=new ActiveXObject("Msxml2.DOMDocument.3.0");
doc.setProperty("SelectionNamespaces","xmlns:ntb='http://www.nitobi.com'");
}else{
if(nitobi.browser.MOZ){
doc=document.implementation.createDocument("","",null);
}
}
if(xml!=null&&typeof xml=="string"){
doc=nitobi.xml.loadXml(doc,xml);
}
return doc;
};
nitobi.xml.loadXml=function(doc,xml,_80){
doc.async=false;
if(nitobi.browser.IE){
doc.loadXML(xml);
}else{
var _81=nitobi.xml.DOMParser.parseFromString(xml,"text/xml");
if(_80){
while(doc.hasChildNodes()){
doc.removeChild(doc.firstChild);
}
for(var i=0;i<_81.childNodes.length;i++){
doc.appendChild(doc.importNode(_81.childNodes[i],true));
}
}else{
doc=_81;
}
_81=null;
}
return doc;
};
nitobi.xml.hasParseError=function(_83){
if(nitobi.browser.IE){
return (_83.parseError!=0);
}else{
if(_83==null||_83.documentElement==null){
return true;
}
var _84=_83.documentElement;
if((_84.tagName=="parserError")||(_84.namespaceURI=="http://www.mozilla.org/newlayout/xml/parsererror.xml")){
return true;
}
return false;
}
};
nitobi.xml.getParseErrorReason=function(_85){
if(!nitobi.xml.hasParseError(_85)){
return "";
}
if(nitobi.browser.IE){
return (_85.parseError.reason);
}else{
return (new XMLSerializer().serializeToString(_85));
}
};
nitobi.xml.createXslDoc=function(xsl){
var doc=null;
if(nitobi.browser.IE){
doc=new ActiveXObject("MSXML2.FreeThreadedDOMDocument.3.0");
}else{
if(nitobi.browser.MOZ){
doc=nitobi.xml.createXmlDoc();
}
}
doc=nitobi.xml.loadXml(doc,xsl||"<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" xmlns:ntb=\"http://www.nitobi.com\" />");
return doc;
};
nitobi.xml.createXslProcessor=function(xsl){
var _89=null;
var xt=null;
if(typeof (xsl)!="string"){
xsl=nitobi.xml.serialize(xsl);
}
if(nitobi.browser.IE){
_89=new ActiveXObject("MSXML2.FreeThreadedDOMDocument.3.0");
xt=new ActiveXObject("MSXML2.XSLTemplate.3.0");
_89.async=false;
_89.loadXML(xsl);
xt.stylesheet=_89;
return xt.createProcessor();
}else{
_89=nitobi.xml.createXmlDoc(xsl);
xt=new XSLTProcessor();
xt.importStylesheet(_89);
xt.stylesheet=_89;
return xt;
}
};
nitobi.xml.parseHtml=function(_8b){
if(typeof (_8b)=="string"){
_8b=document.getElementById(_8b);
}
var _8c=nitobi.html.getOuterHtml(_8b);
var _8d="";
if(nitobi.browser.IE){
var _8e=new RegExp("(\\s+.[^=]*)='(.*?)'","g");
_8c=_8c.replace(_8e,function(m,_1,_2){
return _1+"=\""+_2.replace(/"/g,"&quot;")+"\"";
});
_8d=(_8c.substring(_8c.indexOf("/>")+2).replace(/(\s+.[^\=]*)\=\s*([^\"^\s^\>]+)/g,"$1=\"$2\" ")).replace(/\n/gi,"").replace(/(.*?:.*?\s)/i,"$1  ");
var _92=new RegExp("=\"([^\"]*)(<)(.*?)\"","gi");
var _93=new RegExp("=\"([^\"]*)(>)(.*?)\"","gi");
while(true){
_8d=_8d.replace(_92,"=\"$1&lt;$3\" ");
_8d=_8d.replace(_93,"=\"$1&gt;$3\" ");
var x=(_92.test(_8d));
if(!_92.test(_8d)){
break;
}
}
}else{
if(nitobi.browser.MOZ){
_8d=_8c.replace(/(\s+.[^\=]*)\=\s*([^\"^\s^\>]+)/g,"$1=\"$2\" ").replace(/\n/gi,"").replace(/\>\s*\</gi,"><").replace(/(.*?:.*?\s)/i,"$1  ");
_8d=_8d.replace(/\&/g,"&amp;");
_8d=_8d.replace(/\&amp;gt;/g,"&gt;").replace(/\&amp;lt;/g,"&lt;").replace(/\&amp;apos;/g,"&apos;").replace(/\&amp;quot;/g,"&quot;").replace(/\&amp;amp;/g,"&amp;").replace(/\&amp;eq;/g,"&eq;");
}
}
if(_8d.indexOf("xmlns:ntb=\"http://www.nitobi.com\"")<1){
_8d=_8d.replace(/\<(.*?)(\s|\>|\\)/,"<$1 xmlns:ntb=\"http://www.nitobi.com\"$2");
}
_8d=_8d.replace(/\&nbsp\;/gi," ");
return nitobi.xml.createXmlDoc(_8d);
};
nitobi.xml.transform=function(xml,xsl,_97){
if(xsl.documentElement){
xsl=nitobi.xml.createXslProcessor(xsl);
}
if(nitobi.browser.IE){
xsl.input=xml;
xsl.transform();
return xsl.output;
}else{
var doc=xsl.transformToDocument(xml);
var _99=doc.documentElement;
if(_99&&_99.nodeName.indexOf("ntb:")==0){
_99.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:ntb","http://www.nitobi.com");
}
return doc;
}
};
nitobi.xml.transformToString=function(xml,xsl,_9c){
var _9d=nitobi.xml.transform(xml,xsl,"text");
if(nitobi.browser.MOZ){
if(_9c=="xml"){
_9d=nitobi.xml.Serializer.serializeToString(_9d);
}else{
if(_9d.documentElement.childNodes[0]==null){
nitobi.lang.throwError("The transformToString fn could not find any valid output");
}
if(_9d.documentElement.childNodes[0].data!=null){
_9d=_9d.documentElement.childNodes[0].data;
}else{
if(_9d.documentElement.childNodes[0].textContent!=null){
_9d=_9d.documentElement.childNodes[0].textContent;
}else{
nitobi.lang.throwError("The transformToString fn could not find any valid output");
}
}
}
}
return _9d;
};
nitobi.xml.transformToXml=function(xml,xsl){
var _a0=nitobi.xml.transform(xml,xsl,"xml");
if(nitobi.browser.IE){
_a0=nitobi.xml.createXmlDoc(_a0);
}else{
if(nitobi.browser.MOZ){
if(_a0.documentElement.nodeName=="transformiix:result"){
_a0=nitobi.xml.createXmlDoc(_a0.documentElement.firstChild.data);
}
}
}
return _a0;
};
nitobi.xml.serialize=function(xml){
if(nitobi.browser.IE){
return xml.xml;
}else{
return (new XMLSerializer()).serializeToString(xml);
}
};
nitobi.xml.createXmlHttp=function(){
if(nitobi.browser.IE){
var _a2=null;
try{
_a2=new ActiveXObject("Msxml2.XMLHTTP");
}
catch(e){
try{
_a2=new ActiveXObject("Microsoft.XMLHTTP");
}
catch(ee){
}
}
return _a2;
}else{
if(nitobi.browser.MOZ){
return new XMLHttpRequest();
}
}
};
nitobi.xml.createElement=function(_a3,_a4,ns){
ns=ns||"http://www.nitobi.com";
var _a6=null;
if(nitobi.browser.IE){
_a6=_a3.createNode(1,nitobi.xml.nsPrefix+_a4,ns);
}else{
if(_a3.createElementNS){
_a6=_a3.createElementNS(ns,nitobi.xml.nsPrefix+_a4);
}
}
return _a6;
};
function nitobiXmlDecodeXslt(xsl){
return xsl.replace(/x:c-/g,"xsl:choose").replace(/x\:wh\-/g,"xsl:when").replace(/x\:o\-/g,"xsl:otherwise").replace(/x\:n\-/g," name=\"").replace(/x\:s\-/g," select=\"").replace(/x\:va\-/g,"xsl:variable").replace(/x\:v\-/g,"xsl:value-of").replace(/x\:ct\-/g,"xsl:call-template").replace(/x\:w\-/g,"xsl:with-param").replace(/x\:p\-/g,"xsl:param").replace(/x\:t\-/g,"xsl:template").replace(/x\:at\-/g,"xsl:apply-templates").replace(/x\:a\-/g,"xsl:attribute");
}
if(nitobi.browser.MOZ){
Document.prototype.__defineGetter__("xml",function(){
return (new XMLSerializer()).serializeToString(this);
});
Node.prototype.__defineGetter__("xml",function(){
return (new XMLSerializer()).serializeToString(this);
});
XPathResult.prototype.__defineGetter__("length",function(){
return this.snapshotLength;
});
XSLTProcessor.prototype.addParameter=function(_a8,_a9,_aa){
if(_a9==null){
this.removeParameter(_aa,_a8);
}else{
this.setParameter(_aa,_a8,_a9);
}
};
XMLDocument.prototype.selectNodes=function(_ab,_ac){
try{
if(this.nsResolver==null){
this.nsResolver=this.createNSResolver(this.documentElement);
}
var _ad=this.evaluate(_ab,(_ac?_ac:this),this.nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var _ae=new Array(_ad.snapshotLength);
_ae.expr=_ab;
var j=0;
for(i=0;i<_ad.snapshotLength;i++){
var _b0=_ad.snapshotItem(i);
if(_b0.nodeType!=3){
_ae[j++]=_b0;
}
}
return _ae;
}
catch(e){
}
};
XMLDocument.prototype.selectSingleNode=function(_b1,_b2){
var _b3=_b1.match(/\[\d+\]/ig);
if(_b3!=null){
var x=_b3[_b3.length-1];
if(_b1.lastIndexOf(x)+x.length!=_b1.length){
_b1+="[1]";
}
}
var _b5=this.selectNodes(_b1,_b2||null);
return ((_b5!=null&&_b5.length>0)?_b5[0]:null);
};
Element.prototype.selectNodes=function(_b6){
var doc=this.ownerDocument;
return doc.selectNodes(_b6,this);
};
Element.prototype.selectSingleNode=function(_b8){
var doc=this.ownerDocument;
return doc.selectSingleNode(_b8,this);
};
}
nitobi.xml.getLocalName=function(_ba){
var _bb=_ba.indexOf(":");
if(_bb==-1){
return _ba;
}else{
return _ba.substr(_bb+1);
}
};
nitobi.xml.encode=function(str){
str+="";
str=str.replace(/&/g,"&amp;");
str=str.replace(/'/g,"&apos;");
str=str.replace(/\"/g,"&quot;");
str=str.replace(/</g,"&lt;");
str=str.replace(/>/g,"&gt;");
str=str.replace(/\n/g,"&#xa;");
return str;
};
nitobi.xml.constructValidXpathQuery=function(_bd,_be){
var _bf=_bd.match(/(\"|\')/g);
if(_bf!=null){
var _c0="concat(";
var _c1="";
var _c2;
for(var i=0;i<_bd.length;i++){
if(_bd.substr(i,1)=="\""){
_c2="&apos;";
}else{
_c2="&quot;";
}
_c0+=_c1+_c2+nitobi.xml.encode(_bd.substr(i,1))+_c2;
_c1=",";
}
_c0+=_c1+"&apos;&apos;";
_c0+=")";
_bd=_c0;
}else{
var _c4=(_be?"\"":"");
_bd=_c4+nitobi.xml.encode(_bd)+_c4;
}
return _bd;
};
nitobi.lang.defineNs("nitobi.html");
nitobi.html.Url=function(){
};
nitobi.html.Url.setParameter=function(url,key,_c7){
var reg=new RegExp("(\\?|&)("+encodeURIComponent(key)+")=(.*?)(&|$)");
if(url.match(reg)){
return url.replace(reg,"$1$2="+encodeURIComponent(_c7)+"$4");
}
if(url.match(/\?/)){
url=url+"&";
}else{
url=url+"?";
}
return url+encodeURIComponent(key)+"="+encodeURIComponent(_c7);
};
nitobi.html.Url.removeParameter=function(url,key){
var reg=new RegExp("(\\?|&)("+encodeURIComponent(key)+")=(.*?)(&|$)");
return url.replace(reg,function(str,p1,p2,p3,p4,_d1,s){
if(((p1)=="?")&&(p4!="&")){
return "";
}else{
return p1;
}
});
};
nitobi.html.Url.normalize=function(url,_d4){
if(_d4){
if(_d4.indexOf("http://")==0||_d4.indexOf("https://")==0||_d4.indexOf("/")==0){
return _d4;
}
}
var _d5=(url.match(/.*\//)||"")+"";
if(_d4){
return _d5+_d4;
}
return _d5;
};
nitobi.html.Url.randomize=function(url){
return nitobi.html.Url.setParameter(url,"ntb-random",(new Date).getTime());
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.Event=function(_d7){
this.type=_d7;
this.handlers={};
this.guid=0;
this.setEnabled(true);
};
nitobi.base.Event.prototype.subscribe=function(_d8,_d9,_da){
if(_d8==null){
return;
}
var _db=_d8;
if(typeof (_d8)=="string"){
var s=_d8;
s=s.replace(/eventArgs/g,"arguments[0]");
_d8=nitobi.lang.close(_d9,function(){
eval(s);
});
}
if(typeof _d9=="object"&&_d8 instanceof Function){
_db=nitobi.lang.close(_d9,_d8);
}
_da=_da||_db.observer_guid||_d8.observer_guid||this.guid++;
_db.observer_guid=_da;
_d8.observer_guid=_da;
this.handlers[_da]=_db;
return _da;
};
nitobi.base.Event.prototype.subscribeOnce=function(_dd,_de){
var _df=null;
var _e0=this;
var _e1=function(){
_dd.apply(_de||null,arguments);
_e0.unSubscribe(_df);
};
_df=this.subscribe(_e1);
return _df;
};
nitobi.base.Event.prototype.unSubscribe=function(_e2){
if(_e2 instanceof Function){
_e2=_e2.observer_guid;
}
this.handlers[_e2]=null;
delete this.handlers[_e2];
};
nitobi.base.Event.prototype.notify=function(_e3){
if(this.enabled){
if(arguments.length==0){
arguments=new Array();
arguments[0]=new nitobi.base.EventArgs(null,this);
arguments[0].event=this;
arguments[0].source=null;
}else{
if(typeof (arguments[0].event)!="undefined"&&arguments[0].event==null){
arguments[0].event=this;
}
}
var _e4=false;
for(var _e5 in this.handlers){
var _e6=this.handlers[_e5];
if(_e6 instanceof Function){
var rv=(_e6.apply(this,arguments)==false);
_e4=_e4||rv;
}
}
return !_e4;
}
return true;
};
nitobi.base.Event.prototype.dispose=function(){
for(var _e8 in this.handlers){
this.handlers[_e8]=null;
}
this.handlers={};
};
nitobi.base.Event.prototype.setEnabled=function(_e9){
this.enabled=_e9;
};
nitobi.base.Event.prototype.isEnabled=function(){
return this.enabled;
};
nitobi.lang.defineNs("nitobi.html");
nitobi.html.Css=function(){
};
nitobi.html.Css.onPrecached=new nitobi.base.Event();
nitobi.html.Css.swapClass=function(_ea,_eb,_ec){
if(_ea.className){
var reg=new RegExp("(\\s|^)"+_eb+"(\\s|$)");
_ea.className=_ea.className.replace(reg,"$1"+_ec+"$2");
}
};
nitobi.html.Css.replaceOrAppend=function(_ee,_ef,_f0){
if(nitobi.html.Css.hasClass(_ee,_ef)){
nitobi.html.Css.swapClass(_ee,_ef,_f0);
}else{
nitobi.html.Css.addClass(_ee,_f0);
}
};
nitobi.html.Css.hasClass=function(_f1,_f2){
if(!_f2||_f2===""){
return false;
}
return (new RegExp("(\\s|^)"+_f2+"(\\s|$)")).test(_f1.className);
};
nitobi.html.Css.addClass=function(_f3,_f4){
if(!nitobi.html.Css.hasClass(_f3,_f4)){
_f3.className=_f3.className?_f3.className+" "+_f4:_f4;
}
};
nitobi.html.Css.removeClass=function(_f5,_f6){
if(nitobi.html.Css.hasClass(_f5,_f6)){
var reg=new RegExp("(\\s|^)"+_f6+"(\\s|$)");
_f5.className=_f5.className.replace(reg,"$2");
}
};
nitobi.html.Css.getRules=function(_f8){
var _f9=null;
if(typeof (_f8)=="number"){
_f9=document.styleSheets[_f8];
}else{
_f9=_f8;
}
if(_f9==null){
return null;
}
try{
if(_f9.cssRules){
return _f9.cssRules;
}
if(_f9.rules){
return _f9.rules;
}
}
catch(e){
}
return null;
};
nitobi.html.Css.getStyleSheetsByName=function(_fa){
var arr=new Array();
var ss=document.styleSheets;
var _fd=new RegExp(_fa.replace(".",".")+"($|\\?)");
for(var i=0;i<ss.length;i++){
arr=nitobi.html.Css._getStyleSheetsByName(_fd,ss[i],arr);
}
return arr;
};
nitobi.html.Css._getStyleSheetsByName=function(_ff,_100,arr){
if(_ff.test(_100.href)){
arr=arr.concat([_100]);
}
var _102=nitobi.html.Css.getRules(_100);
if(_100.href!=""&&_100.imports){
for(var i=0;i<_100.imports.length;i++){
arr=nitobi.html.Css._getStyleSheetsByName(_ff,_100.imports[i],arr);
}
}else{
for(var i=0;i<_102.length;i++){
var s=_102[i].styleSheet;
if(s){
arr=nitobi.html.Css._getStyleSheetsByName(_ff,s,arr);
}
}
}
return arr;
};
nitobi.html.Css.imageCache={};
nitobi.html.Css.imageCacheDidNotify=false;
nitobi.html.Css.trackPrecache=function(_105){
nitobi.html.Css.precacheArray[_105]=true;
var _106=false;
for(var i in nitobi.html.Css.precacheArray){
if(!nitobi.html.Css.precacheArray[i]){
_106=true;
}
}
if((!nitobi.html.Css.imageCacheDidNotify)&&(!_106)){
nitobi.html.Css.imageCacheDidNotify=true;
nitobi.html.Css.isPrecaching=false;
nitobi.html.Css.onPrecached.notify();
}
};
nitobi.html.Css.precacheArray={};
nitobi.html.Css.isPrecaching=false;
nitobi.html.Css.precacheImages=function(_108){
nitobi.html.Css.isPrecaching=true;
if(!_108){
var ss=document.styleSheets;
for(var i=0;i<ss.length;i++){
nitobi.html.Css.precacheImages(ss[i]);
}
return;
}
var _10b=/.*?url\((.*?)\).*?/;
var _10c=nitobi.html.Css.getRules(_108);
var url=nitobi.html.Css.getPath(_108);
for(var i=0;i<_10c.length;i++){
var rule=_10c[i];
if(rule.styleSheet){
nitobi.html.Css.precacheImages(rule.styleSheet);
}else{
var s=rule.style;
var _110=s?s.backgroundImage:null;
if(_110){
_110=_110.replace(_10b,"$1");
_110=nitobi.html.Url.normalize(url,_110);
if(!nitobi.html.Css.imageCache[_110]){
var _111=new Image();
_111.src=_110;
nitobi.html.Css.precacheArray[_110]=false;
var _112=nitobi.lang.close({},nitobi.html.Css.trackPrecache,[_110]);
_111.onload=_112;
_111.onerror=_112;
_111.onabort=_112;
nitobi.html.Css.imageCache[_110]=_111;
try{
if(_111.width>0){
nitobi.html.Css.precacheArray[_110]=true;
}
}
catch(e){
}
}
}
}
}
if(_108.href!=""&&_108.imports){
for(var i=0;i<_108.imports.length;i++){
nitobi.html.Css.precacheImages(_108.imports[i]);
}
}
};
nitobi.html.Css.getPath=function(_113){
var href=_113.href;
href=nitobi.html.Url.normalize(href);
if(_113.parentStyleSheet&&href.indexOf("/")!=0&&href.indexOf("http://")!=0&&href.indexOf("https://")!=0){
href=nitobi.html.Css.getPath(_113.parentStyleSheet)+href;
}
return href;
};
nitobi.html.Css.getSheetUrl=nitobi.html.Css.getPath;
nitobi.html.Css.findParentStylesheet=function(_115){
var rule=nitobi.html.Css.getRule(_115);
if(rule){
return rule.parentStyleSheet;
}
return null;
};
nitobi.html.Css.findInSheet=function(_117,_118,_119){
if(nitobi.browser.IE6&&typeof _119=="undefined"){
_119=0;
}else{
if(_119>4){
return null;
}
}
_119++;
var _11a=nitobi.html.Css.getRules(_118);
for(var rule=0;rule<_11a.length;rule++){
var _11c=_11a[rule];
if(_11c.styleSheet){
var _11d=nitobi.html.Css.findInSheet(_117,_11c.styleSheet,_119);
if(_11d){
return _11d;
}
}else{
if(_11c.selectorText!=null&&_11c.selectorText.toLowerCase().indexOf(_117)>-1){
if(nitobi.browser.IE){
_11c={selectorText:_11c.selectorText,style:_11c.style,readOnly:_11c.readOnly,parentStyleSheet:_118};
}
return _11c;
}
}
}
if(_118.href!=""&&_118.imports){
for(var i=0;i<_118.imports.length;i++){
var _11d=nitobi.html.Css.findInSheet(_117,_118.imports[i],_119);
if(_11d){
return _11d;
}
}
}
return null;
};
nitobi.html.Css.getClass=function(_11f){
_11f=_11f.toLowerCase();
if(_11f.indexOf(".")!==0){
_11f="."+_11f;
}
var rule=nitobi.html.Css.getRule(_11f);
if(rule!=null){
return rule.style;
}
return null;
};
nitobi.html.Css.getStyleBySelector=function(_121){
var rule=nitobi.html.Css.getRule(_121);
if(rule!=null){
return rule.style;
}
return null;
};
nitobi.html.Css.getRule=function(_123){
_123=_123.toLowerCase();
if(_123.indexOf(".")!==0){
_123="."+_123;
}
var _124=document.styleSheets;
for(var ss=0;ss<_124.length;ss++){
try{
var _126=nitobi.html.Css.findInSheet(_123,_124[ss]);
if(_126){
return _126;
}
}
catch(err){
}
}
return null;
};
nitobi.html.Css.getClassStyle=function(_127,_128){
var _129=nitobi.html.Css.getClass(_127);
if(_129!=null){
return _129[_128];
}else{
return null;
}
};
nitobi.html.Css.setStyle=function(el,rule,_12c){
rule=rule.replace(/\-(\w)/g,function(_12d,p1){
return p1.toUpperCase();
});
el.style[rule]=_12c;
};
nitobi.html.Css.getStyle=function(oElm,_130){
var _131="";
if(document.defaultView&&document.defaultView.getComputedStyle){
_130=_130.replace(/([A-Z])/g,function($1){
return "-"+$1.toLowerCase();
});
_131=document.defaultView.getComputedStyle(oElm,"").getPropertyValue(_130);
}else{
if(oElm.currentStyle){
_130=_130.replace(/\-(\w)/g,function(_133,p1){
return p1.toUpperCase();
});
_131=oElm.currentStyle[_130];
}
}
return _131;
};
nitobi.html.Css.setOpacities=function(_135,_136){
if(_135.length){
for(var i=0;i<_135.length;i++){
nitobi.html.Css.setOpacity(_135[i],_136);
}
}else{
nitobi.html.Css.setOpacity(_135,_136);
}
};
nitobi.html.Css.setOpacity=function(_138,_139){
var s=_138.style;
if(_139>100){
_139=100;
}
if(_139<0){
_139=0;
}
if(s.filter!=null){
var _13b=s.filter.match(/alpha\(opacity=[\d\.]*?\)/ig);
if(_13b!=null&&_13b.length>0){
s.filter=s.filter.replace(/alpha\(opacity=[\d\.]*?\)/ig,"alpha(opacity="+_139+")");
}else{
s.filter+="alpha(opacity="+_139+")";
}
}else{
s.opacity=(_139/100);
}
};
nitobi.html.Css.getOpacity=function(_13c){
if(_13c==null){
nitobi.lang.throwError(nitobi.error.ArgExpected+" for nitobi.html.Css.getOpacity");
}
if(nitobi.browser.IE){
if(_13c.style.filter==""){
return 100;
}
var s=_13c.style.filter;
s.match(/opacity=([\d\.]*?)\)/ig);
if(RegExp.$1==""){
return 100;
}
return parseInt(RegExp.$1);
}else{
return Math.abs(_13c.style.opacity?_13c.style.opacity*100:100);
}
};
nitobi.html.Css.getCustomStyle=function(_13e,_13f){
if(nitobi.browser.IE){
return nitobi.html.getClassStyle(_13e,_13f);
}else{
var rule=nitobi.html.Css.getRule(_13e);
var re=new RegExp("(.*?)({)(.*?)(})","gi");
var _142=rule.cssText.match(re);
re=new RegExp("("+_13f+")(:)(.*?)(;)","gi");
_142=re.exec(RegExp.$3);
}
};
if(nitobi.browser.MOZ){
Document.prototype.createStyleSheet=function(){
var _143=this.createElement("style");
this.documentElement.childNodes[0].appendChild(_143);
return _143;
};
HTMLStyleElement.prototype.__defineSetter__("cssText",function(_144){
this.innerHTML=_144;
});
HTMLStyleElement.prototype.__defineGetter__("cssText",function(){
return this.innerHTML;
});
}
nitobi.lang.defineNs("nitobi.drawing");
nitobi.drawing.Point=function(x,y){
this.x=x;
this.y=y;
};
nitobi.drawing.Point.prototype.toString=function(){
return "("+this.x+","+this.y+")";
};
nitobi.drawing.rgb=function(r,g,b){
return "#"+((r*65536)+(g*256)+b).toString(16);
};
nitobi.drawing.align=function(_14a,_14b,_14c,oh,ow,oy,ox){
oh=oh||0;
ow=ow||0;
oy=oy||0;
ox=ox||0;
var a=_14c;
var td,sd,tt,tb,tl,tr,th,tw,st,sb,sl,sr,sh,sw;
if(nitobi.browser.IE){
td=_14b.getBoundingClientRect();
sd=_14a.getBoundingClientRect();
tt=td.top;
tb=td.bottom;
tl=td.left;
tr=td.right;
th=Math.abs(tb-tt);
tw=Math.abs(tr-tl);
st=sd.top;
sb=sd.bottom;
sl=sd.left;
sr=sd.right;
sh=Math.abs(sb-st);
sw=Math.abs(sr-sl);
}else{
if(nitobi.browser.MOZ){
td=document.getBoxObjectFor(_14b);
sd=document.getBoxObjectFor(_14a);
tt=td.y;
tl=td.x;
tw=td.width;
th=td.height;
st=sd.y;
sl=sd.x;
sw=sd.width;
sh=sd.height;
}else{
td=nitobi.html.getCoords(_14b);
sd=nitobi.html.getCoords(_14a);
tt=td.y;
tl=td.x;
tw=td.width;
th=td.height;
st=sd.y;
sl=sd.x;
sw=sd.width;
sh=sd.height;
}
}
var s=_14a.style;
if(a&268435456){
s.height=(th+oh)+"px";
}
if(a&16777216){
s.width=(tw+ow)+"px";
}
if(a&1048576){
s.top=(nitobi.html.getStyleTop(_14a)+tt-st+oy)+"px";
}
if(a&65536){
s.top=(nitobi.html.getStyleTop(_14a)+tt-st+th-sh+oy)+"px";
}
if(a&4096){
s.left=(nitobi.html.getStyleLeft(_14a)-sl+tl+ox)+"px";
}
if(a&256){
s.left=(nitobi.html.getStyleLeft(_14a)-sl+tl+tw-sw+ox)+"px";
}
if(a&16){
s.top=(nitobi.html.getStyleTop(_14a)+tt-st+oy+Math.floor((th-sh)/2))+"px";
}
if(a&1){
s.left=(nitobi.html.getStyleLeft(_14a)-sl+tl+ox+Math.floor((tw-sw)/2))+"px";
}
};
nitobi.drawing.align.SAMEHEIGHT=268435456;
nitobi.drawing.align.SAMEWIDTH=16777216;
nitobi.drawing.align.ALIGNTOP=1048576;
nitobi.drawing.align.ALIGNBOTTOM=65536;
nitobi.drawing.align.ALIGNLEFT=4096;
nitobi.drawing.align.ALIGNRIGHT=256;
nitobi.drawing.align.ALIGNMIDDLEVERT=16;
nitobi.drawing.align.ALIGNMIDDLEHORIZ=1;
nitobi.drawing.alignOuterBox=function(_161,_162,_163,oh,ow,oy,ox,show){
oh=oh||0;
ow=ow||0;
oy=oy||0;
ox=ox||0;
if(nitobi.browser.moz){
td=document.getBoxObjectFor(_162);
sd=document.getBoxObjectFor(_161);
var _169=parseInt(document.defaultView.getComputedStyle(_162,"").getPropertyValue("border-left-width"));
var _16a=parseInt(document.defaultView.getComputedStyle(_162,"").getPropertyValue("border-top-width"));
var _16b=parseInt(document.defaultView.getComputedStyle(_161,"").getPropertyValue("border-top-width"));
var _16c=parseInt(document.defaultView.getComputedStyle(_161,"").getPropertyValue("border-bottom-width"));
var _16d=parseInt(document.defaultView.getComputedStyle(_161,"").getPropertyValue("border-left-width"));
var _16e=parseInt(document.defaultView.getComputedStyle(_161,"").getPropertyValue("border-right-width"));
oy=oy+_16b-_16a;
ox=ox+_16d-_169;
}
nitobi.drawing.align(_161,_162,_163,oh,ow,oy,ox,show);
};
nitobi.lang.defineNs("nitobi.html");
if(false){
nitobi.html=function(){
};
}
nitobi.html.createElement=function(_16f,_170,_171){
var elem=document.createElement(_16f);
for(var attr in _170){
elem.setAttribute(attr,_170[attr]);
}
for(var _174 in _171){
elem.style[_174]=_171[_174];
}
return elem;
};
nitobi.html.setBgImage=function(elem,src){
var s=nitobi.html.Css.getStyle(elem,"background-image");
if(s!=""&&nitobi.browser.IE){
s=s.replace(/(^url\(")(.*?)("\))/,"$2");
}
};
nitobi.html.getDomNodeByPath=function(Node,Path){
if(nitobi.browser.IE){
}
var _17a=Node;
var _17b=Path.split("/");
var len=_17b.length;
for(var i=0;i<len;i++){
if(_17a.childNodes[Number(_17b[i])]!=null){
_17a=_17a.childNodes[Number(_17b[i])];
}else{
alert("Path expression failed."+Path);
}
var s="";
}
return _17a;
};
nitobi.html.indexOfChildNode=function(_17f,_180){
var _181=_17f.childNodes;
for(var i=0;i<_181.length;i++){
if(_181[i]==_180){
return i;
}
}
return -1;
};
nitobi.html.evalScriptBlocks=function(node){
for(var i=0;i<node.childNodes.length;i++){
var _185=node.childNodes[i];
if(_185.nodeName.toLowerCase()=="script"){
eval(_185.text);
}else{
nitobi.html.evalScriptBlocks(_185);
}
}
};
nitobi.html.position=function(node){
var pos=nitobi.html.getStyle($(node),"position");
if(pos=="static"){
node.style.position="relative";
}
};
nitobi.html.setOpacity=function(_188,_189){
var _18a=_188.style;
_18a.opacity=(_189/100);
_18a.MozOpacity=(_189/100);
_18a.KhtmlOpacity=(_189/100);
_18a.filter="alpha(opacity="+_189+")";
};
nitobi.html.highlight=function(o,x){
if(o.createTextRange){
o.focus();
var r=document.selection.createRange().duplicate();
r.move("character",0-o.value.length);
r.move("character",x);
r.moveEnd("textedit",1);
r.select();
}else{
if(o.setSelectionRange){
o.setSelectionRange(x,o.value.length);
}
}
};
nitobi.html.setCursor=function(o,x){
if(o.createTextRange){
o.focus();
var r=document.selection.createRange().duplicate();
r.move("character",0-o.value.length);
r.move("character",x);
r.select();
}else{
if(o.setSelectionRange){
o.setSelectionRange(x,x);
}
}
};
nitobi.html.encode=function(str){
str+="";
str=str.replace(/&/g,"&amp;");
str=str.replace(/\"/g,"&quot;");
str=str.replace(/</g,"&lt;");
str=str.replace(/>/g,"&gt;");
str=str.replace(/\n/g,"<br>");
return str;
};
nitobi.html.getElement=function(_192){
if(typeof (_192)=="string"){
return document.getElementById(_192);
}
return _192;
};
if(typeof ($)=="undefined"){
$=nitobi.html.getElement;
}
if(typeof ($F)=="undefined"){
$F=function(id){
var _194=$(id);
if(_194!=null){
return _194.value;
}
return "";
};
}
nitobi.html.getTagName=function(elem){
if(nitobi.browser.IE&&elem.scopeName!=""){
return (elem.scopeName+":"+elem.nodeName).toLowerCase();
}else{
return elem.nodeName.toLowerCase();
}
};
nitobi.html.getStyleTop=function(elem){
return nitobi.lang.parseNumber(elem.style.top);
};
nitobi.html.getStyleLeft=function(elem){
return nitobi.lang.parseNumber(elem.style.left);
};
nitobi.html.getHeight=function(elem){
return elem.offsetHeight;
};
nitobi.html.getWidth=function(elem){
return elem.offsetWidth;
};
if(nitobi.browser.IE){
nitobi.html.getBox=function(elem){
var _19b=nitobi.lang.parseNumber(nitobi.html.getStyle(document.body,"border-top-width"));
var _19c=nitobi.lang.parseNumber(nitobi.html.getStyle(document.body,"border-left-width"));
var _19d=nitobi.lang.parseNumber(document.body.scrollTop)-(_19b==0?2:_19b);
var _19e=nitobi.lang.parseNumber(document.body.scrollLeft)-(_19c==0?2:_19c);
var rect=elem.getBoundingClientRect();
return {top:rect.top+_19d,left:rect.left+_19e,bottom:rect.bottom,right:rect.right,height:rect.bottom-rect.top,width:rect.right-rect.left};
};
}else{
nitobi.html.getBox=function(elem){
var _1a1=0;
var _1a2=0;
var _1a3=elem.parentNode;
while(_1a3.nodeType==1&&_1a3!=document.body){
_1a1+=nitobi.lang.parseNumber(_1a3.scrollTop)-(nitobi.html.getStyle(_1a3,"overflow")=="auto"?nitobi.lang.parseNumber(nitobi.html.getStyle(_1a3,"border-top-width")):0);
_1a2+=nitobi.lang.parseNumber(_1a3.scrollLeft)-(nitobi.html.getStyle(_1a3,"overflow")=="auto"?nitobi.lang.parseNumber(nitobi.html.getStyle(_1a3,"border-left-width")):0);
_1a3=_1a3.parentNode;
}
var _1a4=elem.ownerDocument.getBoxObjectFor(elem);
var _1a5=nitobi.lang.parseNumber(nitobi.html.getStyle(elem,"border-left-width"));
var _1a6=nitobi.lang.parseNumber(nitobi.html.getStyle(elem,"border-right-width"));
var _1a7=nitobi.lang.parseNumber(nitobi.html.getStyle(elem,"border-top-width"));
var top=nitobi.lang.parseNumber(_1a4.y)-_1a1-_1a7;
var left=nitobi.lang.parseNumber(_1a4.x)-_1a2-_1a5;
var _1aa=left+nitobi.lang.parseNumber(_1a4.width);
var _1ab=top+_1a4.height;
var _1ac=nitobi.lang.parseNumber(_1a4.height);
var _1ad=nitobi.lang.parseNumber(_1a4.width);
return {top:top,left:left,bottom:_1ab,right:_1aa,height:_1ac,width:_1ad};
};
nitobi.html.getBox.cache={};
}
nitobi.html.getBox2=nitobi.html.getBox;
nitobi.html.getUniqueId=function(elem){
if(elem.uniqueID){
return elem.uniqueID;
}else{
var t=(new Date()).getTime();
elem.uniqueID=t;
return t;
}
};
nitobi.html.getChildNodeById=function(elem,_1b1,_1b2){
return nitobi.html.getChildNodeByAttribute(elem,"id",_1b1,_1b2);
};
nitobi.html.getChildNodeByAttribute=function(elem,_1b4,_1b5,_1b6){
for(var i=0;i<elem.childNodes.length;i++){
if(elem.nodeType!=3&&Boolean(elem.childNodes[i].getAttribute)){
if(elem.childNodes[i].getAttribute(_1b4)==_1b5){
return elem.childNodes[i];
}
}
}
if(_1b6){
for(var i=0;i<elem.childNodes.length;i++){
var _1b8=nitobi.html.getChildNodeByAttribute(elem.childNodes[i],_1b4,_1b5,_1b6);
if(_1b8!=null){
return _1b8;
}
}
}
return null;
};
nitobi.html.getParentNodeById=function(elem,_1ba){
return nitobi.html.getParentNodeByAtt(elem,"id",_1ba);
};
nitobi.html.getParentNodeByAtt=function(elem,att,_1bd){
while(elem.parentNode!=null){
if(elem.parentNode.getAttribute(att)==_1bd){
return elem.parentNode;
}
elem=elem.parentNode;
}
return null;
};
if(nitobi.browser.IE){
nitobi.html.getFirstChild=function(node){
return node.firstChild;
};
}else{
if(nitobi.browser.MOZ){
nitobi.html.getFirstChild=function(node){
var i=0;
while(i<node.childNodes.length&&node.childNodes[i].nodeType==3){
i++;
}
return node.childNodes[i];
};
}
}
nitobi.html.getScroll=function(){
var _1c1,_1c2=0;
if((nitobi.browser.OPERA==false)&&(document.documentElement.scrollTop>0)){
_1c1=document.documentElement.scrollTop;
_1c2=document.documentElement.scrollLeft;
}else{
_1c1=document.body.scrollTop;
_1c2=document.body.scrollLeft;
}
if(((_1c1==0)&&(document.documentElement.scrollTop>0))||((_1c2==0)&&(document.documentElement.scrollLeft>0))){
_1c1=document.documentElement.scrollTop;
_1c2=document.documentElement.scrollLeft;
}
return {"left":_1c2,"top":_1c1};
};
nitobi.html.getCoords=function(_1c3){
var ew,eh;
try{
var _1c6=_1c3;
ew=_1c3.offsetWidth;
eh=_1c3.offsetHeight;
for(var lx=0,ly=0;_1c3!=null;lx+=_1c3.offsetLeft,ly+=_1c3.offsetTop,_1c3=_1c3.offsetParent){
}
for(;_1c6!=document.body;lx-=_1c6.scrollLeft,ly-=_1c6.scrollTop,_1c6=_1c6.parentNode){
}
}
catch(e){
}
return {"x":lx,"y":ly,"height":eh,"width":ew};
};
nitobi.html.scrollBarWidth=0;
nitobi.html.getScrollBarWidth=function(_1c9){
if(nitobi.html.scrollBarWidth){
return nitobi.html.scrollBarWidth;
}
try{
if(null==_1c9){
var d=document.getElementById("eba.sb.div");
if(null==d){
d=document.createElement("div");
d.id="eba.sb.div";
d.style.width="100px";
d.style.height="100px";
d.style.overflow="auto";
d.innerHTML="<div style='height:200px;'></div>";
d.style.backgroundColor="black";
d.style.position="absolute";
d.style.top="-200px";
document.body.appendChild(d);
}
_1c9=d;
}
if(nitobi.browser.IE){
nitobi.html.scrollBarWidth=Math.abs(_1c9.offsetWidth-_1c9.clientWidth-(_1c9.clientLeft?_1c9.clientLeft*2:0));
}else{
var b=document.getBoxObjectFor(_1c9);
nitobi.html.scrollBarWidth=Math.abs((b.width-_1c9.clientWidth));
}
}
catch(err){
}
return nitobi.html.scrollBarWidth;
};
nitobi.html.align=nitobi.drawing.align;
nitobi.html.emptyElements={HR:true,BR:true,IMG:true,INPUT:true};
nitobi.html.specialElements={TEXTAREA:true};
nitobi.html.permHeight=0;
nitobi.html.permWidth=0;
nitobi.html.getBodyArea=function(){
var _1cc,_1cd,_1ce,_1cf;
var x,y;
var _1d2=navigator.userAgent.toLowerCase();
var _1d3=false;
var _1d4=false;
var _1d5=false;
var ie=false;
var _1d7=false;
if(_1d2.indexOf("opera")>=0){
_1d3=true;
}
if(_1d2.indexOf("firefox")>=0){
_1d4=true;
}
if(_1d2.indexOf("msie")>=0){
ie=true;
}
if(_1d2.indexOf("safari")>=0){
_1d5=true;
}
if(document.compatMode=="CSS1Compat"){
_1d7=true;
}
var de=document.documentElement;
var db=document.body;
if(self.innerHeight){
x=self.innerWidth;
y=self.innerHeight;
}else{
if(de&&de.clientHeight){
x=de.clientWidth;
y=de.clientHeight;
}else{
if(db){
x=db.clientWidth;
y=db.clientHeight;
}
}
}
_1ce=x;
_1cf=y;
if(self.pageYOffset){
x=self.pageXOffset;
y=self.pageYOffset;
}else{
if(de&&de.scrollTop){
x=de.scrollLeft;
y=de.scrollTop;
}else{
if(db){
x=db.scrollLeft;
y=db.scrollTop;
}
}
}
_1cc=x;
_1cd=y;
var _1da=db.scrollHeight;
var _1db=db.offsetHeight;
if(_1da>_1db){
x=db.scrollWidth;
y=db.scrollHeight;
}else{
x=db.offsetWidth;
y=db.offsetHeight;
}
nitobi.html.permHeight=y;
nitobi.html.permWidth=x;
if(nitobi.html.permHeight<_1cf){
nitobi.html.permHeight=_1cf;
if(ie&&_1d7){
_1ce+=20;
}
}
if(_1ce<nitobi.html.permWidth){
_1ce=nitobi.html.permWidth;
}
if(nitobi.html.permHeight>_1cf){
_1ce+=20;
}
var _1dc,_1dd;
_1dc=de.scrollHeight;
_1dd=de.scrollWidth;
return {scrollWidth:_1dd,scrollHeight:_1dc,scrollLeft:_1cc,scrollTop:_1cd,clientWidth:_1ce,clientHeight:_1cf,bodyWidth:nitobi.html.permWidth,bodyHeight:nitobi.html.rrPermHeight};
};
nitobi.html.getOuterHtml=function(node){
if(nitobi.browser.IE){
return node.outerHTML;
}else{
var html="";
switch(node.nodeType){
case Node.ELEMENT_NODE:
html+="<";
html+=node.nodeName.toLowerCase();
if(!nitobi.html.specialElements[node.nodeName]){
for(var a=0;a<node.attributes.length;a++){
if(node.attributes[a].nodeName.toLowerCase()!="_moz-userdefined"){
html+=" "+node.attributes[a].nodeName.toLowerCase()+"=\""+node.attributes[a].nodeValue+"\"";
}
}
html+=">";
if(!nitobi.html.emptyElements[node.nodeName]){
html+=node.innerHTML;
html+="</"+node.nodeName.toLowerCase()+">";
}
}else{
switch(node.nodeName){
case "TEXTAREA":
for(var a=0;a<node.attributes.length;a++){
if(node.attributes[a].nodeName.toLowerCase()!="value"){
html+=" "+node.attributes[a].nodeName.toUpperCase()+"=\""+node.attributes[a].nodeValue+"\"";
}else{
var _1e1=node.attributes[a].nodeValue;
}
}
html+=">";
html+=_1e1;
html+="</"+node.nodeName+">";
break;
}
}
break;
case Node.TEXT_NODE:
html+=node.nodeValue;
break;
case Node.COMMENT_NODE:
html+="<!"+"--"+node.nodeValue+"--"+">";
break;
}
return html;
}
};
try{
Node.prototype.swapNode=function(node){
var _1e3=this.nextSibling;
var _1e4=this.parentNode;
node.parentNode.replaceChild(this,node);
_1e4.insertBefore(node,_1e3);
};
HTMLElement.prototype.getBoundingClientRect=function(_1e5,_1e6){
_1e5=_1e5||0;
_1e6=_1e6||0;
var td=document.getBoxObjectFor(this);
var top=td.y-_1e5;
var left=td.x-_1e6;
return {top:top,left:left,bottom:(top+td.height),right:(left+td.width)};
};
HTMLElement.prototype.getClientRects=function(_1ea,_1eb){
_1ea=_1ea||0;
_1eb=_1eb||0;
var td=document.getBoxObjectFor(this);
return new Array({top:(td.y-_1ea),left:(td.x-_1eb),bottom:(td.y+td.height-_1ea),right:(td.x+td.width-_1eb)});
};
HTMLElement.prototype.insertAdjacentElement=function(pos,node){
switch(pos){
case "beforeBegin":
this.parentNode.insertBefore(node,this);
break;
case "afterBegin":
this.insertBefore(node,this.firstChild);
break;
case "beforeEnd":
this.appendChild(node);
break;
case "afterEnd":
if(this.nextSibling){
this.parentNode.insertBefore(node,this.nextSibling);
}else{
this.parentNode.appendChild(node);
}
break;
}
};
HTMLElement.prototype.insertAdjacentHTML=function(_1ef,_1f0,_1f1){
var df;
var r=this.ownerDocument.createRange();
switch(String(_1ef).toLowerCase()){
case "beforebegin":
r.setStartBefore(this);
df=r.createContextualFragment(_1f0);
this.parentNode.insertBefore(df,this);
break;
case "afterbegin":
r.selectNodeContents(this);
r.collapse(true);
df=r.createContextualFragment(_1f0);
this.insertBefore(df,this.firstChild);
break;
case "beforeend":
if(_1f1==true){
this.innerHTML=this.innerHTML+_1f0;
}else{
r.selectNodeContents(this);
r.collapse(false);
df=r.createContextualFragment(_1f0);
this.appendChild(df);
}
break;
case "afterend":
r.setStartAfter(this);
df=r.createContextualFragment(_1f0);
this.parentNode.insertBefore(df,this.nextSibling);
break;
}
};
HTMLElement.prototype.insertAdjacentText=function(pos,s){
var node=document.createTextNode(s);
this.insertAdjacentElement(pos,node);
};
}
catch(e){
}
nitobi.html.Event=function(){
};
nitobi.html.handlerId=0;
nitobi.html.elementId=0;
nitobi.html.elements=[];
nitobi.html.unload=[];
nitobi.html.unloadCalled=false;
nitobi.html.attachEvents=function(_1f7,_1f8,_1f9){
var _1fa=[];
for(var i=0;i<_1f8.length;i++){
var e=_1f8[i];
_1fa.push(nitobi.html.attachEvent(_1f7,e.type,e.handler,_1f9,e.capture||false));
}
return _1fa;
};
nitobi.html.attachEvent=function(_1fd,type,_1ff,_200,_201,_202){
if(type=="anyclick"){
if(nitobi.browser.IE){
nitobi.html.attachEvent(_1fd,"dblclick",_1ff,_200,_201,_202);
}
type="click";
}
if(!(_1ff instanceof Function)){
nitobi.lang.throwError("Event handler needs to be a Function");
}
_1fd=$(_1fd);
if(type.toLowerCase()=="unload"&&_202!=true){
var _203=_1ff;
if(_200!=null){
_203=function(){
_1ff.call(_200);
};
}
return this.addUnload(_203);
}
var _204=this.handlerId++;
var _205=this.elementId++;
if(typeof (_1ff.ebaguid)!="undefined"){
_204=_1ff.ebaguid;
}else{
_1ff.ebaguid=_204;
}
if(typeof (_1fd.ebaguid)=="undefined"){
_1fd.ebaguid=_205;
nitobi.html.elements[_205]=_1fd;
}
if(typeof (_1fd.eba_events)=="undefined"){
_1fd.eba_events={};
}
if(_1fd.eba_events[type]==null){
_1fd.eba_events[type]={};
if(_1fd.attachEvent){
_1fd["eba_event_"+type]=function(){
nitobi.html.notify.call(_1fd,window.event);
};
_1fd.attachEvent("on"+type,_1fd["eba_event_"+type]);
if(_201&&_1fd.setCapture!=null){
_1fd.setCapture(true);
}
}else{
if(_1fd.addEventListener){
_1fd["eba_event_"+type]=function(){
nitobi.html.notify.call(_1fd,arguments[0]);
};
_1fd.addEventListener(type,_1fd["eba_event_"+type],_201);
}
}
}
_1fd.eba_events[type][_204]={handler:_1ff,context:_200};
return _204;
};
nitobi.html.notify=function(e){
if(!nitobi.browser.IE){
e.srcElement=e.target;
e.fromElement=e.relatedTarget;
e.toElement=e.relatedTarget;
}
var _207=this;
e.eventSrc=_207;
nitobi.html.Event=e;
for(var _208 in _207.eba_events[e.type]){
var _209=_207.eba_events[e.type][_208];
if(typeof (_209.context)=="object"){
_209.handler.call(_209.context,e,_207);
}else{
_209.handler.call(_207,e,_207);
}
}
};
nitobi.html.detachEvents=function(_20a,_20b){
for(var i=0;i<_20b.length;i++){
var e=_20b[i];
nitobi.html.detachEvent(_20a,e.type,e.handler);
}
};
nitobi.html.detachEvent=function(_20e,type,_210){
_20e=$(_20e);
var _211=_210;
if(_210 instanceof Function){
_211=_210.ebaguid;
}
if(type=="unload"){
this.unload.splice(ebaguid,1);
}
if(_20e.eba_events!=null&&_20e.eba_events[type]!=null&&_20e.eba_events[type][_211]!=null){
var _212=_20e.eba_events[type];
_212[_211]=null;
delete _212[_211];
if(nitobi.collections.isHashEmpty(_212)){
this.m_detach(_20e,type,_20e["eba_event_"+type]);
_20e["eba_event_"+type]=null;
_20e.eba_events[type]=null;
_212=null;
if(_20e.nodeType==1){
_20e.removeAttribute("eba_event_"+type);
}
}
}
return true;
};
nitobi.html.m_detach=function(_213,type,_215){
if(_215!=null&&_215 instanceof Function){
if(_213.detachEvent){
_213.detachEvent("on"+type,_215);
}else{
if(_213.removeEventListener){
_213.removeEventListener(type,_215,false);
}
}
_213["on"+type]=null;
if(type=="unload"){
for(var i=0;i<this.unload.length;i++){
this.unload[i].call(this);
this.unload[i]=null;
}
}
}
};
nitobi.html.detachAllEvents=function(){
for(var i=0;i<nitobi.html.elements.length;i++){
if(typeof (nitobi.html.elements[i])!="undefined"){
for(var _218 in nitobi.html.elements[i].eba_events){
nitobi.html.m_detach(nitobi.html.elements[i],_218,nitobi.html.elements[i]["eba_event_"+_218]);
if(typeof (nitobi.html.elements[i])!="undefined"&&nitobi.html.elements[i].eba_events[_218]!=null){
for(var j=0;j<nitobi.html.elements[i].eba_events[_218].length;j++){
nitobi.html.elements[i].eba_events[_218][j]=null;
}
}
nitobi.html.elements[i]["eba_event_"+_218]=null;
}
}
}
nitobi.html.elements=null;
};
nitobi.html.addUnload=function(_21a){
this.unload.push(_21a);
return this.unload.length-1;
};
nitobi.html.cancelEvent=function(evt,v){
nitobi.html.stopPropagation(evt);
nitobi.html.preventDefault(evt);
};
nitobi.html.stopPropagation=function(evt){
if(evt==null){
return;
}
if(nitobi.browser.MOZ){
evt.stopPropagation();
}else{
if(nitobi.browser.IE){
evt.cancelBubble=true;
}
}
};
nitobi.html.preventDefault=function(evt,v){
if(evt==null){
return;
}
if(nitobi.browser.MOZ){
evt.preventDefault();
}else{
if(nitobi.browser.IE){
evt.returnValue=false;
}
}
if(v!=null){
e.keyCode=v;
}
};
nitobi.html.getEventCoords=function(evt){
var _221={"x":evt.clientX,"y":evt.clientY};
if(nitobi.browser.IE){
_221.x+=document.documentElement.scrollLeft+document.body.scrollLeft;
_221.y+=document.documentElement.scrollTop+document.body.scrollTop;
}else{
_221.x+=window.scrollX;
_221.y+=window.scrollY;
}
return _221;
};
nitobi.html.getEvent=function(_222){
if(nitobi.browser.IE){
return window.event;
}else{
_222.srcElement=_222.target;
_222.fromElement=_222.relatedTarget;
_222.toElement=_222.relatedTarget;
return _222;
}
};
nitobi.html.createEvent=function(_223,_224,_225,_226){
if(nitobi.browser.IE){
_225.target.fireEvent("on"+_224);
}else{
var _227=document.createEvent(_223);
_227.initKeyEvent(_224,true,true,document.defaultView,_225.ctrlKey,_225.altKey,_225.shiftKey,_225.metaKey,_226.keyCode,_226.charCode);
_225.target.dispatchEvent(_227);
}
};
nitobi.html.unloadEventId=nitobi.html.attachEvent(window,"unload",nitobi.html.detachAllEvents,nitobi.html,false,true);
nitobi.lang.defineNs("nitobi.event");
nitobi.event=function(){
};
nitobi.event.keys={};
nitobi.event.guid=0;
nitobi.event.subscribe=function(key,_229){
nitobi.event.publish(key);
var guid=this.guid++;
this.keys[key].add(_229,guid);
return guid;
};
nitobi.event.unsubscribe=function(key,guid){
if(this.keys[key]==null){
return true;
}
this.keys[key].remove(guid);
};
nitobi.event.evaluate=function(func,_22e){
var _22f=true;
if(typeof func=="string"){
func=func.replace(/eventArgs/gi,"arguments[1]");
var _230=eval(func);
_22f=(typeof (_230)=="undefined"?true:_230);
}
return _22f;
};
nitobi.event.publish=function(key){
if(this.keys[key]==null){
this.keys[key]=new nitobi.event.Key();
}
};
nitobi.event.notify=function(key,_233){
if(this.keys[key]!=null){
return this.keys[key].notify(_233);
}else{
return true;
}
};
nitobi.event.dispose=function(){
for(var key in this.keys){
if(typeof (this.keys[key])=="function"){
this.keys[key].dispose();
}
}
this.keys=null;
};
nitobi.event.Key=function(){
this.handlers={};
};
nitobi.event.Key.prototype.add=function(_235,guid){
this.handlers[guid]=_235;
};
nitobi.event.Key.prototype.remove=function(guid){
this.handlers[guid]=null;
delete this.handlers[guid];
};
nitobi.event.Key.prototype.notify=function(_238){
var fail=false;
for(var item in this.handlers){
var _23b=this.handlers[item];
if(_23b instanceof Function){
var rv=(_23b.apply(this,arguments)==false);
fail=fail||rv;
}else{
}
}
return !fail;
};
nitobi.event.Key.prototype.dispose=function(){
for(var _23d in this.handlers){
this.handlers[_23d]=null;
}
};
nitobi.event.Args=function(src){
this.source=src;
};
nitobi.event.Args.prototype.callback=function(){
};
nitobi.html.cancelBubble=nitobi.html.cancelEvent;
nitobi.html.getCssRules=nitobi.html.Css.getRules;
nitobi.html.findParentStylesheet=nitobi.html.Css.findParentStylesheet;
nitobi.html.getClass=nitobi.html.Css.getClass;
nitobi.html.getStyle=nitobi.html.Css.getStyle;
nitobi.html.addClass=nitobi.html.Css.addClass;
nitobi.html.removeClass=nitobi.html.Css.removeClass;
nitobi.html.getClassStyle=nitobi.html.Css.getClassStyle;
nitobi.html.normalizeUrl=nitobi.html.Url.normalize;
nitobi.html.setUrlParameter=nitobi.html.Url.setParameter;
nitobi.lang.defineNs("nitobi.base.XmlNamespace");
nitobi.base.XmlNamespace.prefix="ntb";
nitobi.base.XmlNamespace.uri="http://www.nitobi.com";
nitobi.lang.defineNs("nitobi.collections");
if(false){
nitobi.collections=function(){
};
}
nitobi.collections.IEnumerable=function(){
this.list=new Array();
this.length=0;
};
nitobi.collections.IEnumerable.prototype.add=function(obj){
this.list[this.getLength()]=obj;
this.length++;
};
nitobi.collections.IEnumerable.prototype.insert=function(_240,obj){
this.list.splice(_240,0,obj);
this.length++;
};
nitobi.collections.IEnumerable.createNewArray=function(obj,_243){
var _244;
_243=_243||0;
if(obj.count){
_244=obj.count;
}
if(obj.length){
_244=obj.length;
}
var x=new Array(_244-_243);
for(var i=_243;i<_244;i++){
x[i-_243]=obj[i];
}
return x;
};
nitobi.collections.IEnumerable.prototype.get=function(_247){
if(_247<0||_247>=this.getLength()){
nitobi.lang.throwError(nitobi.error.OutOfBounds);
}
return this.list[_247];
};
nitobi.collections.IEnumerable.prototype.set=function(_248,_249){
if(_248<0||_248>=this.getLength()){
nitobi.lang.throwError(nitobi.error.OutOfBounds);
}
this.list[_248]=_249;
};
nitobi.collections.IEnumerable.prototype.indexOf=function(obj){
for(var i=0;i<this.getLength();i++){
if(this.list[i]===obj){
return i;
}
}
return -1;
};
nitobi.collections.IEnumerable.prototype.remove=function(_24c){
var i;
if(typeof (_24c)!="number"){
i=this.indexOf(_24c);
}else{
i=_24c;
}
if(-1==i||i<0||i>=this.getLength()){
nitobi.lang.throwError(nitobi.error.OutOfBounds);
}
this.list[i]=null;
this.list.splice(i,1);
this.length--;
};
nitobi.collections.IEnumerable.prototype.getLength=function(){
return this.length;
};
nitobi.collections.IEnumerable.prototype.each=function(func){
var l=this.length;
var list=this.list;
for(var i=0;i<l;i++){
func(list[i]);
}
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.ISerializable=function(_252,id,xml,_255){
nitobi.Object.call(this);
if(typeof (this.ISerializableInitialized)=="undefined"){
this.ISerializableInitialized=true;
}else{
return;
}
this.xmlNode=null;
this.setXmlNode(_252);
if(_252!=null){
this.profile=nitobi.base.Registry.getInstance().getCompleteProfile({idField:null,tagName:_252.nodeName});
}else{
this.profile=nitobi.base.Registry.getInstance().getProfileByInstance(this);
}
this.onDeserialize=new nitobi.base.Event();
this.onSetParentObject=new nitobi.base.Event();
this.factory=nitobi.base.Factory.getInstance();
this.objectHash={};
this.onCreateObject=new nitobi.base.Event();
if(_252!=null){
this.deserializeFromXmlNode(this.getXmlNode());
}else{
if(this.factory!=null&&this.profile.tagName!=null){
this.createByProfile(this.profile,this.getXmlNode());
}else{
if(xml!=null&&_252!=null){
this.createByXml(xml);
}
}
}
this.disposal.push(this.xmlNode);
};
nitobi.lang.extend(nitobi.base.ISerializable,nitobi.Object);
nitobi.base.ISerializable.guidMap={};
nitobi.base.ISerializable.prototype.ISerializableImplemented=true;
nitobi.base.ISerializable.prototype.getProfile=function(){
return this.profile;
};
nitobi.base.ISerializable.prototype.createByProfile=function(_256,_257){
if(_257==null){
var xml="<"+_256.tagName+" xmlns:"+nitobi.base.XmlNamespace.prefix+"=\""+nitobi.base.XmlNamespace.uri+"\" />";
var _259=nitobi.xml.createXmlDoc(xml);
this.setXmlNode(_259.firstChild);
this.deserializeFromXmlNode(this.xmlNode);
}else{
this.deserializeFromXmlNode(_257);
this.setXmlNode(_257);
}
};
nitobi.base.ISerializable.prototype.createByXml=function(xml){
this.deserializeFromXml(xml);
};
nitobi.base.ISerializable.prototype.getParentObject=function(){
return this.parentObj;
};
nitobi.base.ISerializable.prototype.setParentObject=function(_25b){
this.parentObj=_25b;
this.onSetParentObject.notify();
};
nitobi.base.ISerializable.prototype.addChildObject=function(_25c){
this.addToCache(_25c);
_25c.setParentObject(this);
var _25d=_25c.getXmlNode();
if(!this.areGuidsGenerated(_25d)){
_25d=this.generateGuids(_25d);
_25c.setXmlNode(_25d);
}
this.xmlNode.appendChild(_25d);
};
nitobi.base.ISerializable.prototype.insertBeforeChildObject=function(obj,_25f){
_25f=_25f?_25f.getXmlNode():null;
this.addToCache(obj);
obj.setParentObject(this);
var _260=obj.getXmlNode();
if(!this.areGuidsGenerated(_260)){
_260=this.generateGuids(_260);
obj.setXmlNode(_260);
}
this.xmlNode.insertBefore(_260,_25f);
};
nitobi.base.ISerializable.prototype.createElement=function(name){
var _262;
if(this.xmlNode==null||this.xmlNode.ownerDocument==null){
_262=nitobi.xml.createXmlDoc();
}else{
_262=this.xmlNode.ownerDocument;
}
if(nitobi.browser.IE){
return _262.createNode(1,name,nitobi.base.XmlNamespace.uri);
}else{
if(_262.createElementNS){
return _262.createElementNS(nitobi.base.XmlNamespace.uri,name);
}else{
nitobi.lang.throwError("Unable to create a new xml node on this browser.");
}
}
};
nitobi.base.ISerializable.prototype.deleteChildObject=function(id){
this.removeFromCache(id);
var e=this.getElement(id);
if(e!=null){
e.parentNode.removeChild(e);
}
};
nitobi.base.ISerializable.prototype.addToCache=function(obj){
this.objectHash[obj.getId()]=obj;
};
nitobi.base.ISerializable.prototype.removeFromCache=function(id){
this.objectHash[id]=null;
};
nitobi.base.ISerializable.prototype.inCache=function(id){
return (this.objectHash[id]!=null);
};
nitobi.base.ISerializable.prototype.flushCache=function(){
this.objectHash={};
};
nitobi.base.ISerializable.prototype.areGuidsGenerated=function(_268){
if(_268==null||_268.ownerDocument==null){
return false;
}
if(nitobi.browser.IE){
var node=_268.ownerDocument.documentElement;
if(node==null){
return false;
}else{
var id=node.getAttribute("id");
if(id==null||id==""){
return false;
}else{
return (nitobi.base.ISerializable.guidMap[id]!=null);
}
}
}else{
return (_268.ownerDocument.generatedGuids==true);
}
};
nitobi.base.ISerializable.prototype.setGuidsGenerated=function(_26b,_26c){
if(_26b==null||_26b.ownerDocument==null){
return;
}
if(nitobi.browser.IE){
var node=_26b.ownerDocument.documentElement;
if(node!=null){
var id=node.getAttribute("id");
if(id!=null&&id!=""){
nitobi.base.ISerializable.guidMap[id]=true;
}
}
}else{
_26b.ownerDocument.generatedGuids=true;
}
};
nitobi.base.ISerializable.prototype.generateGuids=function(_26f){
nitobi.base.uniqueIdGeneratorProc.addParameter("guid",nitobi.component.getUniqueId(),"");
var doc=nitobi.xml.transformToXml(_26f,nitobi.base.uniqueIdGeneratorProc);
this.saveDocument=doc;
this.setGuidsGenerated(doc.documentElement,true);
return doc.documentElement;
};
nitobi.base.ISerializable.prototype.deserializeFromXmlNode=function(_271){
if(!this.areGuidsGenerated(_271)){
_271=this.generateGuids(_271);
}
this.setXmlNode(_271);
this.flushCache();
if(this.profile==null){
this.profile=nitobi.base.Registry.getInstance().getCompleteProfile({idField:null,tagName:_271.nodeName});
}
this.onDeserialize.notify();
};
nitobi.base.ISerializable.prototype.deserializeFromXml=function(xml){
var doc=nitobi.xml.createXmlDoc(xml);
var node=this.generateGuids(doc.firstChild);
this.setXmlNode(node);
this.onDeserialize.notify();
};
nitobi.base.ISerializable.prototype.getChildObject=function(id){
var obj=null;
obj=this.objectHash[id];
if(obj==null){
var _277=this.getElement(id);
if(_277==null){
return null;
}else{
obj=this.factory.createByNode(_277);
this.onCreateObject.notify(obj);
this.addToCache(obj);
}
obj.setParentObject(this);
}
return obj;
};
nitobi.base.ISerializable.prototype.getChildObjectById=function(id){
return this.getChildObject(id);
};
nitobi.base.ISerializable.prototype.getElement=function(id){
try{
var node=this.xmlNode.selectSingleNode("*[@id='"+id+"']");
return node;
}
catch(err){
nitobi.lang.throwError(nitobi.error.Unexpected,err);
}
};
nitobi.base.ISerializable.prototype.getFactory=function(){
return this.factory;
};
nitobi.base.ISerializable.prototype.setFactory=function(_27b){
this.factory=factory;
};
nitobi.base.ISerializable.prototype.getXmlNode=function(){
return this.xmlNode;
};
nitobi.base.ISerializable.prototype.setXmlNode=function(_27c){
if(nitobi.lang.typeOf(_27c)==nitobi.lang.type.XMLDOC&&_27c!=null){
this.ownerDocument=_27c;
_27c=nitobi.html.getFirstChild(_27c);
}else{
if(_27c!=null){
this.ownerDocument=_27c.ownerDocument;
}
}
if(_27c!=null&&nitobi.browser.MOZ&&_27c.ownerDocument==null){
nitobi.lang.throwError(nitobi.error.OrphanXmlNode+" ISerializable.setXmlNode");
}
this.xmlNode=_27c;
};
nitobi.base.ISerializable.prototype.serializeToXml=function(){
return nitobi.xml.serialize(this.xmlNode);
};
nitobi.base.ISerializable.prototype.getAttribute=function(name,_27e){
if(this[name]!=null){
return this[name];
}
var _27f=this.xmlNode.getAttribute(name);
return _27f===null?_27e:_27f;
};
nitobi.base.ISerializable.prototype.setAttribute=function(name,_281){
this[name]=_281;
this.xmlNode.setAttribute(name.toLowerCase(),_281!=null?_281.toString():"");
};
nitobi.base.ISerializable.prototype.setIntAttribute=function(name,_283){
var n=parseInt(_283);
if(_283!=null&&(typeof (n)!="number"||isNaN(n))){
nitobi.lang.throwError(name+" is not an integer and therefore cannot be set. It's value was "+_283);
}
this.setAttribute(name,_283);
};
nitobi.base.ISerializable.prototype.getIntAttribute=function(name,_286){
var x=this.getAttribute(name,_286);
if(x==null||x==""){
return 0;
}
var tx=parseInt(x);
if(isNaN(tx)){
nitobi.lang.throwError("ISerializable attempting to get "+name+" which was supposed to be an int but was actually NaN");
}
return tx;
};
nitobi.base.ISerializable.prototype.setBoolAttribute=function(name,_28a){
_28a=nitobi.lang.getBool(_28a);
if(_28a!=null&&typeof (_28a)!="boolean"){
nitobi.lang.throwError(name+" is not an boolean and therefore cannot be set. It's value was "+_28a);
}
this.setAttribute(name,(_28a?"true":"false"));
};
nitobi.base.ISerializable.prototype.getBoolAttribute=function(name,_28c){
var x=this.getAttribute(name,_28c);
if(typeof (x)=="string"&&x==""){
return null;
}
var tx=nitobi.lang.getBool(x);
if(tx==null){
nitobi.lang.throwError("ISerializable attempting to get "+name+" which was supposed to be a bool but was actually "+x);
}
return tx;
};
nitobi.base.ISerializable.prototype.setDateAttribute=function(name,_290){
this.setAttribute(name,_290);
};
nitobi.base.ISerializable.prototype.getDateAttribute=function(name,_292){
if(this[name]){
return this[name];
}
var _293=this.getAttribute(name,_292);
return _293?new Date(_293):null;
};
nitobi.base.ISerializable.prototype.getId=function(){
return this.getAttribute("id");
};
nitobi.base.ISerializable.prototype.getChildObjectId=function(_294,_295){
var _296=(typeof (_294.className)=="string"?_294.tagName:_294.getXmlNode().nodeName);
var _297=_296;
if(_295){
_297+="[@instancename='"+_295+"']";
}
var node=this.getXmlNode().selectSingleNode(_297);
if(null==node){
return null;
}else{
return node.getAttribute("id");
}
};
nitobi.base.ISerializable.prototype.setObject=function(_299,_29a){
if(_299.ISerializableImplemented!=true){
nitobi.lang.throwError(nitobi.error.ExpectedInterfaceNotFound+" ISerializable");
}
var id=this.getChildObjectId(_299,_29a);
if(null!=id){
this.deleteChildObject(id);
}
if(_29a){
_299.setAttribute("instancename",_29a);
}
this.addChildObject(_299);
};
nitobi.base.ISerializable.prototype.getObject=function(_29c,_29d){
var id=this.getChildObjectId(_29c,_29d);
if(null==id){
return id;
}
return this.getChildObject(id);
};
nitobi.base.ISerializable.prototype.getObjectById=function(id){
return this.getChildObject(id);
};
nitobi.base.ISerializable.prototype.isDescendantExists=function(id){
var node=this.getXmlNode();
var _2a2=node.selectSingleNode("//*[@id='"+id+"']");
return (_2a2!=null);
};
nitobi.base.ISerializable.prototype.getPathToLeaf=function(id){
var node=this.getXmlNode();
var _2a5=node.selectSingleNode("//*[@id='"+id+"']");
if(nitobi.browser.IE){
_2a5.ownerDocument.setProperty("SelectionLanguage","XPath");
}
var _2a6=_2a5.selectNodes("./ancestor-or-self::*");
var _2a7=this.getId();
var _2a8=0;
for(var i=0;i<_2a6.length;i++){
if(_2a6[i].getAttribute("id")==_2a7){
_2a8=i+1;
break;
}
}
var arr=nitobi.collections.IEnumerable.createNewArray(_2a6,_2a8);
return arr.reverse();
};
nitobi.base.ISerializable.prototype.isDescendantInstantiated=function(id){
var node=this.getXmlNode();
var _2ad=node.selectSingleNode("//*[@id='"+id+"']");
if(nitobi.browser.IE){
_2ad.ownerDocument.setProperty("SelectionLanguage","XPath");
}
var _2ae=_2ad.selectNodes("ancestor::*");
var _2af=false;
var obj=this;
for(var i=0;i<_2ae.length;i++){
if(_2af){
var _2b2=_2ae[i].getAttribute("id");
instantiated=obj.inCache(_2b2);
if(!instantiated){
return false;
}
obj=this.getObjectById(_2b2);
}
if(_2ae[i].getAttribute("id")==this.getId()){
_2af=true;
}
}
return obj.inCache(id);
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.Registry=function(){
this.classMap={};
this.tagMap={};
};
nitobi.base.Registry.instance=null;
nitobi.base.Registry.getInstance=function(){
if(nitobi.base.Registry.instance==null){
nitobi.base.Registry.instance=new nitobi.base.Registry();
}
return nitobi.base.Registry.instance;
};
nitobi.base.Registry.prototype.getProfileByClass=function(_2b3){
return this.classMap[_2b3];
};
nitobi.base.Registry.prototype.getProfileByInstance=function(_2b4){
var _2b5=nitobi.lang.getFirstFunction(_2b4);
var p=_2b5.value.prototype;
var _2b7=null;
var _2b8=0;
for(var _2b9 in this.classMap){
var _2ba=this.classMap[_2b9].classObject;
var _2bb=0;
while(_2ba&&_2b4 instanceof _2ba){
_2ba=_2ba.baseConstructor;
_2bb++;
}
if(_2bb>_2b8){
_2b8=_2bb;
_2b7=_2b9;
}
}
if(_2b7){
return this.getProfileByClass(_2b7);
}else{
return null;
}
};
nitobi.base.Registry.prototype.getProfileByTag=function(_2bc){
return this.tagMap[_2bc];
};
nitobi.base.Registry.prototype.getCompleteProfile=function(_2bd){
if(nitobi.lang.isDefined(_2bd.className)&&_2bd.className!=null){
return this.classMap[_2bd.className];
}
if(nitobi.lang.isDefined(_2bd.tagName)&&_2bd.tagName!=null){
return this.tagMap[_2bd.tagName];
}
nitobi.lang.throwError("A complete class profile could not be found. Insufficient information was provided.");
};
nitobi.base.Registry.prototype.register=function(_2be){
if(!nitobi.lang.isDefined(_2be.tagName)||null==_2be.tagName){
nitobi.lang.throwError("Illegal to register a class without a tagName.");
}
if(!nitobi.lang.isDefined(_2be.className)||null==_2be.className){
nitobi.lang.throwError("Illegal to register a class without a className.");
}
this.tagMap[_2be.tagName]=_2be;
this.classMap[_2be.className]=_2be;
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.Factory=function(){
this.registry=nitobi.base.Registry.getInstance();
};
nitobi.lang.extend(nitobi.base.Factory,nitobi.Object);
nitobi.base.Factory.instance=null;
nitobi.base.Factory.prototype.createByClass=function(_2bf){
try{
return nitobi.lang.newObject(_2bf,arguments,1);
}
catch(err){
nitobi.lang.throwError("The Factory (createByClass) could not create the class "+_2bf+".",err);
}
};
nitobi.base.Factory.prototype.createByNode=function(_2c0){
try{
if(null==_2c0){
nitobi.lang.throwError(nitobi.error.ArgExpected);
}
if(nitobi.lang.typeOf(_2c0)==nitobi.lang.type.XMLDOC){
_2c0=nitobi.xml.getChildNodes(_2c0)[0];
}
var _2c1=this.registry.getProfileByTag(_2c0.nodeName).className;
var _2c2=_2c0.ownerDocument;
var _2c3=Array.prototype.slice.call(arguments,0);
var obj=nitobi.lang.newObject(_2c1,_2c3,0);
return obj;
}
catch(err){
nitobi.lang.throwError("The Factory (createByNode) could not create the class "+_2c1+".",err);
}
};
nitobi.base.Factory.prototype.createByProfile=function(_2c5){
try{
return nitobi.lang.newObject(_2c5.className,arguments,1);
}
catch(err){
nitobi.lang.throwError("The Factory (createByProfile) could not create the class "+_2c5.className+".",err);
}
};
nitobi.base.Factory.prototype.createByTag=function(_2c6){
try{
var _2c7=this.registry.getProfileByTag(_2c6).className;
var _2c8=Array.prototype.slice.call(arguments,0);
return nitobi.lang.newObject(_2c7,_2c8,1);
}
catch(err){
nitobi.lang.throwError("The Factory (createByTag) could not create the class "+_2c7+".",err);
}
};
nitobi.base.Factory.getInstance=function(){
if(nitobi.base.Factory.instance==null){
nitobi.base.Factory.instance=new nitobi.base.Factory();
}
return nitobi.base.Factory.instance;
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.Profile=function(_2c9,_2ca,_2cb,_2cc,_2cd){
this.className=_2c9;
this.classObject=eval(_2c9);
this.schema=_2ca;
this.singleton=_2cb;
this.tagName=_2cc;
this.idField=_2cd||"id";
};
nitobi.lang.defineNs("nitobi.base");
if(false){
nitobi.base=function(){
};
}
nitobi.base.Declaration=function(){
nitobi.base.Declaration.baseConstructor.call(this);
this.xmlDoc=null;
};
nitobi.lang.extend(nitobi.base.Declaration,nitobi.Object);
nitobi.base.Declaration.prototype.loadHtml=function(_2ce){
try{
_2ce=$(_2ce);
this.xmlDoc=nitobi.xml.parseHtml(_2ce);
return this.xmlDoc;
}
catch(err){
nitobi.lang.throwError(nitobi.error.DeclarationParseError,err);
}
};
nitobi.base.Declaration.prototype.getXmlDoc=function(){
return this.xmlDoc;
};
nitobi.base.Declaration.prototype.serializeToXml=function(){
return nitobi.xml.serialize(this.xmlDoc);
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.DateMath={DAY:"d",WEEK:"w",MONTH:"m",YEAR:"y",ONE_DAY_MS:86400000};
nitobi.base.DateMath._add=function(date,unit,_2d1){
if(unit==this.DAY){
date.setDate(date.getDate()+_2d1);
}else{
if(unit==this.WEEK){
date.setDate(date.getDate()+7*_2d1);
}else{
if(unit==this.MONTH){
date.setMonth(date.getMonth()+_2d1);
}else{
if(unit==this.YEAR){
date.setFullYear(date.getFullYear()+_2d1);
}
}
}
}
return date;
};
nitobi.base.DateMath.add=function(date,unit,_2d4){
return this._add(date,unit,_2d4);
};
nitobi.base.DateMath.subtract=function(date,unit,_2d7){
return this._add(date,unit,-1*_2d7);
};
nitobi.base.DateMath.after=function(date,_2d9){
return (date-_2d9)>0;
};
nitobi.base.DateMath.between=function(date,_2db,end){
return (date-_2db)>=0&&(end-date)>0;
};
nitobi.base.DateMath.before=function(date,_2de){
return (date-_2de)<0;
};
nitobi.base.DateMath.clone=function(date){
var n=new Date(date.toString());
return n;
};
nitobi.base.DateMath.isLeapYear=function(date){
var y=date.getFullYear();
var _1=String(y/4).indexOf(".")==-1;
var _2=String(y/100).indexOf(".")==-1;
var _3=String(y/400).indexOf(".")==-1;
return (_3)?true:(_1&&!_2)?true:false;
};
nitobi.base.DateMath.getMonthDays=function(date){
return [31,(this.isLeapYear(date))?29:28,31,30,31,30,31,31,30,31,30,31][date.getMonth()];
};
nitobi.base.DateMath.getMonthEnd=function(date){
return new Date(date.getFullYear(),date.getMonth(),this.getMonthDays(date));
};
nitobi.base.DateMath.getMonthStart=function(date){
return new Date(date.getFullYear(),date.getMonth(),1);
};
nitobi.base.DateMath.isToday=function(date){
var _2ea=this.resetTime(new Date());
var end=this.add(this.clone(_2ea),this.DAY,1);
return this.between(date,_2ea,end);
};
nitobi.base.DateMath.parse=function(str){
};
nitobi.base.DateMath.getWeekNumber=function(date){
var _2ee=this.getJanuary1st(date);
return Math.ceil(this.getNumberOfDays(_2ee,date)/7);
};
nitobi.base.DateMath.getNumberOfDays=function(_2ef,end){
var _2f1=this.resetTime(this.clone(end)).getTime()-this.resetTime(this.clone(_2ef)).getTime();
return Math.round(_2f1/this.ONE_DAY_MS)+1;
};
nitobi.base.DateMath.getJanuary1st=function(date){
return new Date(date.getFullYear(),0,1);
};
nitobi.base.DateMath.resetTime=function(date){
date.setHours(0);
date.setMinutes(0);
date.setSeconds(0);
date.setMilliseconds(0);
return date;
};
nitobi.base.DateMath.parseIso8601=function(date){
return new Date(date.replace(/^(....).(..).(..).(.*)$/,"$1/$2/$3 $4"));
};
nitobi.base.DateMath.toIso8601=function(date){
if(nitobi.base.DateMath.invalid(date)){
return "";
}
var pz=nitobi.lang.padZeros;
return date.getFullYear()+"-"+pz(date.getMonth()+1)+"-"+pz(date.getDate())+" "+pz(date.getHours())+":"+pz(date.getMinutes())+":"+pz(date.getSeconds());
};
nitobi.base.DateMath.invalid=function(date){
return (!date)||(date.toString()=="Invalid Date");
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.EventArgs=function(_2f8,_2f9){
this.source=_2f8;
this.event=_2f9||null;
};
nitobi.lang.defineNs("nitobi.collections");
nitobi.collections.IList=function(){
nitobi.base.ISerializable.call(this);
nitobi.collections.IEnumerable.call(this);
};
nitobi.lang.implement(nitobi.collections.IList,nitobi.base.ISerializable);
nitobi.lang.implement(nitobi.collections.IList,nitobi.collections.IEnumerable);
nitobi.collections.IList.prototype.IListImplemented=true;
nitobi.collections.IList.prototype.add=function(obj){
nitobi.collections.IEnumerable.prototype.add.call(this,obj);
if(obj.ISerializableImplemented==true&&obj.profile!=null){
this.addChildObject(obj);
}
};
nitobi.collections.IList.prototype.insert=function(_2fb,obj){
var _2fd=this.get(_2fb);
nitobi.collections.IEnumerable.prototype.insert.call(this,_2fb,obj);
if(obj.ISerializableImplemented==true&&obj.profile!=null){
this.insertBeforeChildObject(obj,_2fd);
}
};
nitobi.collections.IList.prototype.addToCache=function(obj,_2ff){
nitobi.base.ISerializable.prototype.addToCache.call(this,obj);
this.list[_2ff]=obj;
};
nitobi.collections.IList.prototype.removeFromCache=function(_300){
nitobi.base.ISerializable.prototype.removeFromCache.call(this,this.list[_300].getId());
};
nitobi.collections.IList.prototype.flushCache=function(){
nitobi.base.ISerializable.prototype.flushCache.call(this);
this.list=new Array();
};
nitobi.collections.IList.prototype.get=function(_301){
if(typeof (_301)=="object"){
return _301;
}
if(_301<0||_301>=this.getLength()){
nitobi.lang.throwError(nitobi.error.OutOfBounds);
}
var obj=null;
if(this.list[_301]!=null){
obj=this.list[_301];
}
if(obj==null){
var _303=nitobi.xml.getChildNodes(this.xmlNode)[_301];
if(_303==null){
return null;
}else{
obj=this.factory.createByNode(_303);
this.onCreateObject.notify(obj);
nitobi.collections.IList.prototype.addToCache.call(this,obj,_301);
}
obj.setParentObject(this);
}
return obj;
};
nitobi.collections.IList.prototype.getById=function(id){
var node=this.xmlNode.selectSingleNode("*[@id='"+id+"']");
var _306=nitobi.xml.indexOfChildNode(node.parentNode,node);
return this.get(_306);
};
nitobi.collections.IList.prototype.set=function(_307,_308){
if(_307<0||_307>=this.getLength()){
nitobi.lang.throwError(nitobi.error.OutOfBounds);
}
try{
if(_308.ISerializableImplemented==true){
var obj=this.get(_307);
if(obj.getXmlNode()!=_308.getXmlNode()){
var _30a=this.xmlNode.insertBefore(_308.getXmlNode(),obj.getXmlNode());
this.xmlNode.removeChild(obj.getXmlNode());
obj.setXmlNode(_30a);
}
}
_308.setParentObject(this);
nitobi.collections.IList.prototype.addToCache.call(this,_308,_307);
}
catch(err){
nitobi.lang.throwError(nitobi.error.Unexpected,err);
}
};
nitobi.collections.IList.prototype.remove=function(_30b){
var i;
if(typeof (_30b)!="number"){
i=this.indexOf(_30b);
}else{
i=_30b;
}
var obj=this.get(i);
nitobi.collections.IEnumerable.prototype.remove.call(this,_30b);
this.xmlNode.removeChild(obj.getXmlNode());
};
nitobi.collections.IList.prototype.getLength=function(){
return nitobi.xml.getChildNodes(this.xmlNode).length;
};
nitobi.lang.defineNs("nitobi.collections");
nitobi.collections.List=function(_30e){
nitobi.collections.List.baseConstructor.call(this);
nitobi.collections.IList.call(this);
};
nitobi.lang.extend(nitobi.collections.List,nitobi.Object);
nitobi.lang.implement(nitobi.collections.List,nitobi.collections.IList);
nitobi.base.Registry.getInstance().register(new nitobi.base.Profile("nitobi.collections.List",null,false,"ntb:list"));
nitobi.lang.defineNs("nitobi.collections");
nitobi.collections.isHashEmpty=function(hash){
var _310=true;
for(var item in hash){
if(hash[item]!=null&&hash[item]!=""){
_310=false;
break;
}
}
return _310;
};
nitobi.collections.hashLength=function(hash){
var _313=0;
for(var item in hash){
_313++;
}
return _313;
};
nitobi.collections.serialize=function(hash){
var s="";
for(var item in hash){
var _318=hash[item];
var type=typeof (_318);
if(type=="string"||type=="number"){
s+="'"+item+"':'"+_318+"',";
}
}
s=s.substring(0,s.length-1);
return "{"+s+"}";
};
nitobi.lang.defineNs("nitobi.ui");
if(false){
nitobi.ui=function(){
};
}
nitobi.ui.setWaitScreen=function(_31a){
if(_31a){
var sc=nitobi.html.getBodyArea();
var me=nitobi.html.createElement("div",{"id":"NTB_waitDiv"},{"verticalAlign":"middle","color":"#000000","font":"12px Trebuchet MS, Georgia, Verdana","textAlign":"center","background":"#ffffff","border":"1px solid #000000","padding":"0px","position":"absolute","top":(sc.clientHeight/2)+sc.scrollTop-30+"px","left":(sc.clientWidth/2)+sc.scrollLeft-100+"px","width":"200px","height":"60px"});
me.innerHTML="<table height=60 width=200><tr><td valign=center height=60 align=center>Please wait..</td></tr></table>";
document.getElementsByTagName("body").item(0).appendChild(me);
}else{
var me=$("NTB_waitDiv");
try{
document.getElementsByTagName("body").item(0).removeChild(me);
}
catch(e){
}
}
};
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.IStyleable=function(_31d){
this.htmlNode=_31d||null;
this.onBeforeSetStyle=new nitobi.base.Event();
this.onSetStyle=new nitobi.base.Event();
};
nitobi.ui.IStyleable.prototype.getHtmlNode=function(){
return this.htmlNode;
};
nitobi.ui.IStyleable.prototype.setHtmlNode=function(node){
this.htmlNode=node;
};
nitobi.ui.IStyleable.prototype.setStyle=function(name,_320){
if(this.onBeforeSetStyle.notify(new nitobi.ui.StyleEventArgs(this,this.onBeforeSetStyle,name,_320))&&this.getHtmlNode()!=null){
nitobi.html.Css.setStyle(this.getHtmlNode(),name,_320);
this.onSetStyle.notify(new nitobi.ui.StyleEventArgs(this,this.onSetStyle,name,_320));
}
};
nitobi.ui.IStyleable.prototype.getStyle=function(name){
return nitobi.html.Css.getStyle(this.getHtmlNode(),name);
};
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.StyleEventArgs=function(_322,_323,_324,_325){
nitobi.ui.ElementEventArgs.baseConstructor.apply(this,arguments);
this.property=_324||null;
this.value=_325||null;
};
nitobi.lang.extend(nitobi.ui.StyleEventArgs,nitobi.base.EventArgs);
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.IScrollable=function(_326){
this.scrollableElement=_326;
};
nitobi.ui.IScrollable.prototype.setScrollableElement=function(el){
this.scrollableElement=el;
};
nitobi.ui.IScrollable.prototype.getScrollableElement=function(){
return this.scrollableElement;
};
nitobi.ui.IScrollable.prototype.getScrollLeft=function(){
return this.scrollableElement.scrollLeft;
};
nitobi.ui.IScrollable.prototype.setScrollLeft=function(left){
this.scrollableElement.scrollLeft=left;
};
nitobi.ui.IScrollable.prototype.scrollLeft=function(_329){
_329=_329||25;
this.scrollableElement.scrollLeft-=_329;
};
nitobi.ui.IScrollable.prototype.scrollRight=function(_32a){
_32a=_32a||25;
this.scrollableElement.scrollLeft+=_32a;
};
nitobi.ui.IScrollable.prototype.isOverflowed=function(_32b){
_32b=_32b||this.scrollableElement.childNodes[0];
return !(parseInt(nitobi.html.getBox(this.scrollableElement).width)>=parseInt(nitobi.html.getBox(_32b).width));
};
nitobi.lang.defineNs("nitobi.ui");
if(false){
nitobi.ui=function(){
};
}
nitobi.ui.startDragOperation=function(_32c,_32d,_32e,_32f,_330,_331){
var ddo=new nitobi.ui.DragDrop(_32c,_32e,_32f);
ddo.onDragStop.subscribe(_331,_330);
ddo.startDrag(_32d);
};
nitobi.ui.DragDrop=function(_333,_334,_335){
this.allowVertDrag=(_334!=null?_334:true);
this.allowHorizDrag=(_335!=null?_335:true);
if(nitobi.browser.IE){
this.surface=document.getElementById("ebadragdropsurface_");
if(this.surface==null){
this.surface=nitobi.html.createElement("div",{"id":"ebadragdropsurface_"},{"filter":"alpha(opacity=1)","backgroundColor":"white","position":"absolute","display":"none","top":"0px","left":"0px","width":"100px","height":"100px","zIndex":"899"});
document.body.appendChild(this.surface);
}
}
if(_333.nodeType==3){
alert("Text node not supported. Use parent element");
}
this.element=_333;
this.zIndex=this.element.style.zIndex;
this.element.style.zIndex=900;
this.onMouseMove=new nitobi.base.Event();
this.onDragStart=new nitobi.base.Event();
this.onDragStop=new nitobi.base.Event();
this.events=[{"type":"mouseup","handler":this.handleMouseUp,"capture":true},{"type":"mousemove","handler":this.handleMouseMove,"capture":true}];
};
nitobi.ui.DragDrop.prototype.startDrag=function(_336){
this.elementOriginTop=parseInt(this.element.style.top,10);
this.elementOriginLeft=parseInt(this.element.style.left,10);
if(isNaN(this.elementOriginLeft)){
this.elementOriginLeft=0;
}
if(isNaN(this.elementOriginTop)){
this.elementOriginTop=0;
}
var _337=nitobi.html.getEventCoords(_336);
x=_337.x;
y=_337.y;
this.originX=x;
this.originY=y;
nitobi.html.attachEvents(document,this.events,this);
nitobi.html.cancelEvent(_336);
this.onDragStart.notify();
};
nitobi.ui.DragDrop.prototype.handleMouseMove=function(_338){
var x,y;
var _33b=nitobi.html.getEventCoords(_338);
x=_33b.x;
y=_33b.y;
if(nitobi.browser.IE){
this.surface.style.display="block";
if(document.compat=="CSS1Compat"){
var _33c=nitobi.html.getBodyArea();
var _33d=0;
if(document.compatMode=="CSS1Compat"){
_33d=25;
}
this.surface.style.width=(_33c.clientWidth-_33d)+"px";
this.surface.style.height=(_33c.clientHeight)+"px";
}else{
this.surface.style.width=document.body.clientWidth;
this.surface.style.height=document.body.clientHeight;
}
}
if(this.allowHorizDrag){
this.element.style.left=(this.elementOriginLeft+x-this.originX)+"px";
}
if(this.allowVertDrag){
this.element.style.top=(this.elementOriginTop+y-this.originY)+"px";
}
this.x=x;
this.y=y;
this.onMouseMove.notify(this);
nitobi.html.cancelEvent(_338);
};
nitobi.ui.DragDrop.prototype.handleMouseUp=function(_33e){
this.onDragStop.notify({"event":_33e,"x":this.x,"y":this.y});
nitobi.html.detachEvents(document,this.events);
if(nitobi.browser.IE){
this.surface.style.display="none";
}
this.element.style.zIndex=this.zIndex;
this.element.object=null;
this.element=null;
};
if(typeof (nitobi.ajax)=="undefined"){
nitobi.ajax=function(){
};
}
nitobi.ajax.createXmlHttp=function(){
if(nitobi.browser.IE){
var _33f=null;
try{
_33f=new ActiveXObject("Msxml2.XMLHTTP");
}
catch(e){
try{
_33f=new ActiveXObject("Microsoft.XMLHTTP");
}
catch(ee){
}
}
return _33f;
}else{
if(nitobi.browser.XHR_ENABLED){
return new XMLHttpRequest();
}
}
};
nitobi.lang.defineNs("nitobi.ajax");
nitobi.ajax.HttpRequest=function(){
this.handler="";
this.async=true;
this.responseType=null;
this.httpObj=nitobi.ajax.createXmlHttp();
this.onPostComplete=new nitobi.base.Event();
this.onGetComplete=new nitobi.base.Event();
this.onError=new nitobi.base.Event();
this.timeout=0;
this.timeoutId=null;
this.params=null;
this.data="";
this.completeCallback=null;
this.errorCallback=null;
this.status="complete";
this.preventCache=true;
};
nitobi.lang.extend(nitobi.ajax.HttpRequest,nitobi.Object);
nitobi.ajax.HttpRequestPool_MAXCONNECTIONS=64;
nitobi.ajax.HttpRequest.prototype.handleResponse=function(){
var _340=null;
var _341=null;
if((this.httpObj.responseXML!=null&&this.httpObj.responseXML.documentElement!=null)&&this.responseType!="text"){
_340=this.httpObj.responseXML;
}else{
if(this.responseType=="xml"){
_340=nitobi.xml.createXmlDoc(this.httpObj.responseText);
}else{
_340=this.httpObj.responseText;
}
}
if(this.httpObj.status!=200){
this.onError.notify({"source":this,"status":this.httpObj.status,"message":"An error occured retrieving the data from the server. "+"Expected response type was '"+this.responseType+"'."});
}
return _340;
};
nitobi.ajax.HttpRequest.prototype.post=function(data){
this.data=data;
this.status="pending";
this.httpObj.open("POST",this.handler,this.async,"","");
if(this.async){
this.httpObj.onreadystatechange=nitobi.lang.close(this,this.postComplete);
}
if(this.responseType=="xml"){
this.httpObj.setRequestHeader("Content-Type","text/xml");
}else{
this.httpObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
this.httpObj.send(data);
if(!this.async){
return this.handleResponse();
}
};
nitobi.ajax.HttpRequest.prototype.postComplete=function(){
if(this.httpObj.readyState==4){
this.status="complete";
var _343={"response":this.handleResponse(),"params":this.params};
this.onPostComplete.notify(_343);
if(this.completeCallback){
this.completeCallback.call(this,_343);
}
}
};
nitobi.ajax.HttpRequest.prototype.postXml=function(_344){
this.setTimeout();
if(("undefined"==typeof (_344.documentElement))||(null==_344.documentElement)||("undefined"==typeof (_344.documentElement.childNodes))||(1>_344.documentElement.childNodes.length)){
ebaErrorReport("updategram is empty. No request sent. xmlData["+_344+"]\nxmlData.xml["+_344.xml+"]");
return;
}
if(null==_344.xml){
var _345=new XMLSerializer();
_344.xml=_345.serializeToString(_344);
}
var sync=this.post(_344.xml);
if(!this.async){
return sync;
}
};
nitobi.ajax.HttpRequest.prototype.get=function(){
this.setTimeout();
this.status="pending";
try{
this.httpObj.open("GET",(this.preventCache?this.cacheBust(this.handler):this.handler),this.async);
}
catch(e){
throw (e);
return;
}
if(this.async){
this.httpObj.onreadystatechange=nitobi.lang.close(this,this.getComplete);
}
if(this.responseType=="xml"){
this.httpObj.setRequestHeader("Content-Type","text/xml");
}
this.httpObj.send(null);
if(!this.async){
return this.handleResponse();
}
};
nitobi.ajax.HttpRequest.prototype.setTimeout=function(){
if(this.timeout>0){
this.timeoutId=window.setTimeout(nitobi.lang.close(this,this.abort),this.timeout);
}
};
nitobi.ajax.HttpRequest.prototype.getComplete=function(){
if(this.httpObj.readyState==4){
this.status="complete";
var _347={"response":this.handleResponse(),"params":this.params,"status":this.httpObj.status,"statusText":this.httpObj.statusText};
this.onGetComplete.notify(_347);
if(this.completeCallback){
this.completeCallback.call(this,_347);
}
}
};
nitobi.ajax.HttpRequest.isError=function(code){
return (code>=400&&code<600);
};
nitobi.ajax.HttpRequest.prototype.abort=function(){
this.httpObj.onreadystatechange=function(){
};
this.httpObj.abort();
};
nitobi.ajax.HttpRequest.prototype.clear=function(){
this.handler="";
this.async=true;
this.onPostComplete.dispose();
this.onGetComplete.dispose();
this.params=null;
};
nitobi.ajax.HttpRequest.prototype.cacheBust=function(url){
var _34a=url.split("?");
var _34b="nitobi_cachebust="+(new Date().getTime());
if(_34a.length==1){
url+="?"+_34b;
}else{
url+="&"+_34b;
}
return url;
};
nitobi.ajax.HttpRequestPool=function(_34c){
this.inUse=new Array();
this.free=new Array();
this.max=_34c||nitobi.ajax.HttpRequestPool_MAXCONNECTIONS;
this.locked=false;
this.context=null;
};
nitobi.ajax.HttpRequestPool.prototype.reserve=function(){
this.locked=true;
var _34d;
if(this.free.length){
_34d=this.free.pop();
_34d.clear();
this.inUse.push(_34d);
}else{
if(this.inUse.length<this.max){
try{
_34d=new nitobi.ajax.HttpRequest();
}
catch(e){
_34d=null;
}
this.inUse.push(_34d);
}else{
throw "No request objects available";
}
}
this.locked=false;
return _34d;
};
nitobi.ajax.HttpRequestPool.prototype.release=function(_34e){
var _34f=false;
this.locked=true;
if(null!=_34e){
for(var i=0;i<this.inUse.length;i++){
if(_34e==this.inUse[i]){
this.free.push(this.inUse[i]);
this.inUse.splice(i,1);
_34f=true;
break;
}
}
}
this.locked=false;
return null;
};
nitobi.ajax.HttpRequestPool.prototype.dispose=function(){
for(var i=0;i<this.inUse.length;i++){
this.inUse[i].dispose();
}
this.inUse=null;
for(var j=0;j<this.free.length;j++){
this.free[i].dispose();
}
this.free=null;
};
nitobi.ajax.HttpRequestPool.instance=null;
nitobi.ajax.HttpRequestPool.getInstance=function(){
if(nitobi.ajax.HttpRequestPool.instance==null){
nitobi.ajax.HttpRequestPool.instance=new nitobi.ajax.HttpRequestPool();
}
return nitobi.ajax.HttpRequestPool.instance;
};
nitobi.lang.defineNs("nitobi.data");
nitobi.data.UrlConnector=function(url,_354){
this.url=url||null;
this.transformer=_354||null;
this.async=true;
};
nitobi.data.UrlConnector.prototype.get=function(_355,_356){
var _357=nitobi.data.UrlConnector.requestPool.reserve();
var _358=this.url;
for(var p in _355){
_358=nitobi.html.Url.setParameter(_358,p,_355[p]);
}
_357.handler=_358;
_357.async=this.async;
_357.responseType="xml";
_357.params={dataReadyCallback:_356};
_357.completeCallback=nitobi.lang.close(this,this.getComplete);
_357.get();
};
nitobi.data.UrlConnector.prototype.getComplete=function(_35a){
if(_35a.params.dataReadyCallback){
var _35b=_35a.response;
var _35c=_35a.params.dataReadyCallback;
var _35d=_35b;
if(this.transformer){
if(typeof (this.transformer)==="function"){
_35d=this.transformer.call(null,_35b);
}else{
_35d=nitobi.xml.transform(_35b,this.transformer,"xml");
}
}
if(_35c){
_35c.call(null,{result:_35d,response:_35a.response});
}
}
};
nitobi.data.UrlConnector.requestPool=new nitobi.ajax.HttpRequestPool();
function ntbAssert(_35e,_35f,_360,_361){
}
nitobi.lang.defineNs("console");
nitobi.lang.defineNs("nitobi.debug");
if(typeof (console.log)=="undefined"){
console.log=function(s){
nitobi.debug.addDebugTools();
var t=$("nitobi.log");
t.value=s+"\n"+t.value;
};
console.evalCode=function(){
var _364=(eval($("nitobi.consoleEntry").value));
};
}
nitobi.debug.addDebugTools=function(){
var sId="nitobi_debug_panel";
var div=document.getElementById(sId);
var html="<table width=100%><tr><td width=50%><textarea style='width:100%' cols=125 rows=25 id='nitobi.log'></textarea></td><td width=50%><textarea style='width:100%' cols=125 rows=25 id='nitobi.consoleEntry'></textarea><br/><button onclick='console.evalCode()'>Eval</button></td></tr></table>";
if(div==null){
var div=document.createElement("div");
div.setAttribute("id",sId);
div.innerHTML=html;
document.body.appendChild(div);
}else{
if(div.innerHTML==""){
div.innerHTML=html;
}
}
};
nitobi.debug.assert=function(){
};
EBA_EM_ATTRIBUTE_ERROR=1;
EBA_XHR_RESPONSE_ERROR=2;
EBA_DEBUG="debug";
EBA_WARN="warn";
EBA_ERROR="error";
EBA_THROW="throw";
EBA_DEBUG_MODE=false;
EBA_ON_ERROR="";
EBA_LAST_ERROR="";
_ebaDebug=false;
NTB_EM_ATTRIBUTE_ERROR=1;
NTB_XHR_RESPONSE_ERROR=2;
NTB_DEBUG="debug";
NTB_WARN="warn";
NTB_ERROR="error";
NTB_THROW="throw";
NTB_DEBUG_MODE=false;
NTB_ON_ERROR="";
NTB_LAST_ERROR="";
_ebaDebug=false;
function _ntbAssert(_368,_369){
}
function ebaSetOnErrorEvent(_36a){
nitobi.debug.setOnErrorEvent.apply(this,arguments);
}
nitobi.debug.setOnErrorEvent=function(_36b){
NTB_ON_ERROR=_36b;
};
function ebaReportError(_36c,_36d,_36e){
nitobi.debug.errorReport("dude stop calling this method it is now called nitobi.debug.errorReport","");
nitobi.debug.errorReport(_36c,_36d,_36e);
}
function ebaErrorReport(_36f,_370,_371){
nitobi.debug.errorReport.apply(this,arguments);
}
nitobi.debug.errorReport=function(_372,_373,_374){
_374=(_374)?_374:NTB_DEBUG;
if(NTB_DEBUG==_374&&!NTB_DEBUG_MODE){
return;
}
var _375=_372+"\nerror code    ["+_373+"]\nerror Severity["+_374+"]";
LastError=_375;
if(eval(NTB_ON_ERROR||"true")){
switch(_373){
case NTB_EM_ATTRIBUTE_ERROR:
confirm(_372);
break;
case NTB_XHR_RESPONSE_ERROR:
confirm(_372);
break;
default:
window.status=_372;
break;
}
}
if(NTB_THROW==_374){
throw (_375);
}
};
if(false){
nitobi.error=function(){
};
}
nitobi.lang.defineNs("nitobi.error");
nitobi.error.onError=new nitobi.base.Event();
if(nitobi){
if(nitobi.testframework){
if(nitobi.testframework.initEventError){
nitobi.testframework.initEventError();
}
}
}
nitobi.error.ErrorEventArgs=function(_376,_377,type){
nitobi.error.ErrorEventArgs.baseConstructor.call(this,_376);
this.description=_377;
this.type=type;
};
nitobi.lang.extend(nitobi.error.ErrorEventArgs,nitobi.base.EventArgs);
nitobi.error.isError=function(err,_37a){
return (err.indexOf(_37a)>-1);
};
nitobi.error.OutOfBounds="Array index out of bounds.";
nitobi.error.Unexpected="An unexpected error occurred.";
nitobi.error.ArgExpected="The argument is null and not optional.";
nitobi.error.BadArgType="The argument is not of the correct type.";
nitobi.error.BadArg="The argument is not a valid value.";
nitobi.error.XmlParseError="The XML did not parse correctly.";
nitobi.error.DeclarationParseError="The HTML declaration could not be parsed.";
nitobi.error.ExpectedInterfaceNotFound="The object does not support the properties or methods of the expected interface. Its class must implement the required interface.";
nitobi.error.NoHtmlNode="No HTML node found with id.";
nitobi.error.OrphanXmlNode="The XML node has no owner document.";
nitobi.error.HttpRequestError="The HTML page could not be loaded.";
nitobi.lang.defineNs("nitobi.html");
nitobi.html.IRenderer=function(_37b){
this.setTemplate(_37b);
this.parameters={};
};
nitobi.html.IRenderer.prototype.renderAfter=function(_37c,data){
_37c=$(_37c);
var _37e=_37c.parentNode;
_37c=_37c.nextSibling;
return this._renderBefore(_37e,_37c,data);
};
nitobi.html.IRenderer.prototype.renderBefore=function(_37f,data){
_37f=$(_37f);
return this._renderBefore(_37f.parentNode,_37f,data);
};
nitobi.html.IRenderer.prototype._renderBefore=function(_381,_382,data){
var s=this.renderToString(data);
var _385=document.createElement("div");
_385.innerHTML=s;
var _386=new Array();
if(_385.childNodes){
var i=0;
while(_385.childNodes.length){
_386[i++]=_385.firstChild;
_381.insertBefore(_385.firstChild,_382);
}
}else{
}
return _386;
};
nitobi.html.IRenderer.prototype.renderIn=function(_388,data){
_388=$(_388);
var s=this.renderToString(data);
_388.innerHTML=s;
return _388.childNodes;
};
nitobi.html.IRenderer.prototype.renderToString=function(data){
};
nitobi.html.IRenderer.prototype.setTemplate=function(_38c){
this.template=_38c;
};
nitobi.html.IRenderer.prototype.getTemplate=function(){
return this.template;
};
nitobi.html.IRenderer.prototype.setParameters=function(_38d){
for(var p in _38d){
this.parameters[p]=_38d[p];
}
};
nitobi.html.IRenderer.prototype.getParameters=function(){
return this.parameters;
};
nitobi.lang.defineNs("nitobi.html");
nitobi.html.XslRenderer=function(_38f){
nitobi.html.IRenderer.call(this,_38f);
};
nitobi.lang.implement(nitobi.html.XslRenderer,nitobi.html.IRenderer);
nitobi.html.XslRenderer.prototype.setTemplate=function(_390){
if(typeof (_390)==="string"){
_390=nitobi.xml.createXslProcessor(_390);
}
this.template=_390;
};
nitobi.html.XslRenderer.prototype.renderToString=function(data){
if(typeof (data)==="string"){
data=nitobi.xml.createXmlDoc(data);
}
if(nitobi.lang.typeOf(data)===nitobi.lang.type.XMLNODE){
data=nitobi.xml.createXmlDoc(nitobi.xml.serialize(data));
}
var _392=this.getTemplate();
var _393=this.getParameters();
for(var p in _393){
_392.addParameter(p,_393[p],"");
}
var s=nitobi.xml.transformToString(data,_392,"xml");
for(var p in _393){
_392.addParameter(p,"","");
}
return s;
};
nitobi.lang.defineNs("nitobi.ui");
NTB_CSS_HIDE="nitobi-hide";
nitobi.ui.Element=function(id){
nitobi.ui.Element.baseConstructor.call(this);
nitobi.ui.IStyleable.call(this);
if(id!=null){
if(nitobi.lang.typeOf(id)==nitobi.lang.type.XMLNODE){
nitobi.base.ISerializable.call(this,id);
}else{
if($(id)!=null){
var decl=new nitobi.base.Declaration();
var _398=decl.loadHtml($(id));
var _399=$(id);
var _39a=_399.parentNode;
var _39b=_39a.ownerDocument.createElement("ntb:component");
_39a.insertBefore(_39b,_399);
_39a.removeChild(_399);
this.setContainer(_39b);
nitobi.base.ISerializable.call(this,_398);
}else{
nitobi.base.ISerializable.call(this);
this.setId(id);
}
}
}else{
nitobi.base.ISerializable.call(this);
}
this.eventMap={};
this.onCreated=new nitobi.base.Event("created");
this.eventMap["created"]=this.onCreated;
this.onBeforeRender=new nitobi.base.Event("beforerender");
this.eventMap["beforerender"]=this.onBeforeRender;
this.onRender=new nitobi.base.Event("render");
this.eventMap["render"]=this.onRender;
this.onBeforeSetVisible=new nitobi.base.Event("beforesetvisible");
this.eventMap["beforesetvisible"]=this.onBeforeSetVisible;
this.onSetVisible=new nitobi.base.Event("setvisible");
this.eventMap["setvisible"]=this.onSetVisible;
this.onBeforePropagate=new nitobi.base.Event("beforepropagate");
this.onEventNotify=new nitobi.base.Event("eventnotify");
this.onBeforeEventNotify=new nitobi.base.Event("beforeeventnotify");
this.onBeforePropagateToChild=new nitobi.base.Event("beforepropogatetochild");
this.subscribeDeclarationEvents();
this.setEnabled(true);
this.renderer=new nitobi.html.XslRenderer();
};
nitobi.lang.extend(nitobi.ui.Element,nitobi.Object);
nitobi.lang.implement(nitobi.ui.Element,nitobi.base.ISerializable);
nitobi.lang.implement(nitobi.ui.Element,nitobi.ui.IStyleable);
nitobi.ui.Element.htmlNodeCache={};
nitobi.ui.Element.prototype.setHtmlNode=function(_39c){
var node=$(_39c);
this.htmlNode=node;
};
nitobi.ui.Element.prototype.getRootId=function(){
var _39e=this.getParentObject();
if(_39e==null){
return this.getId();
}else{
return _39e.getRootId();
}
};
nitobi.ui.Element.prototype.getId=function(){
return this.getAttribute("id");
};
nitobi.ui.Element.parseId=function(id){
var ids=id.split(".");
return {localName:ids[1],id:ids[0]};
};
nitobi.ui.Element.prototype.setId=function(id){
this.setAttribute("id",id);
};
nitobi.ui.Element.prototype.notify=function(_3a2,id,_3a4,_3a5){
try{
_3a2=nitobi.html.getEvent(_3a2);
if(_3a5!==false){
nitobi.html.cancelEvent(_3a2);
}
var _3a6=nitobi.ui.Element.parseId(id).id;
if(!this.isDescendantExists(_3a6)){
return false;
}
var _3a7=!(_3a6==this.getId());
var _3a8=new nitobi.ui.ElementEventArgs(this,null,id);
var _3a9=new nitobi.ui.EventNotificationEventArgs(this,null,id,_3a2);
_3a7=_3a7&&this.onBeforePropagate.notify(_3a9);
var _3aa=true;
if(_3a7){
if(_3a4==null){
_3a4=this.getPathToLeaf(_3a6);
}
var _3ab=this.onBeforeEventNotify.notify(_3a9);
var _3ac=(_3ab?this.onEventNotify.notify(_3a9):true);
var _3ad=_3a4.pop().getAttribute("id");
var _3ae=this.getObjectById(_3ad);
var _3aa=this.onBeforePropagateToChild.notify(_3a9);
if(_3ae.notify&&_3aa&&_3ac){
_3aa=_3ae.notify(_3a2,id,_3a4,_3a5);
}
}else{
_3aa=this.onEventNotify.notify(_3a9);
}
var _3af=this.eventMap[_3a2.type];
if(_3af!=null&&_3aa){
_3af.notify(this.getEventArgs(_3a2,id));
}
return _3aa;
}
catch(err){
nitobi.lang.throwError(nitobi.error.Unexpected+" Element.notify encountered a problem.",err);
}
};
nitobi.ui.Element.prototype.getEventArgs=function(_3b0,_3b1){
var _3b2=new nitobi.ui.ElementEventArgs(this,null,_3b1);
return _3b2;
};
nitobi.ui.Element.prototype.subscribeDeclarationEvents=function(){
for(var name in this.eventMap){
var ev=this.getAttribute("on"+name);
if(ev!=null&&ev!=""){
this.eventMap[name].subscribe(ev,this,name);
}
}
};
nitobi.ui.Element.prototype.getHtmlNode=function(name){
var id=this.getId();
id=(name!=null?id+"."+name:id);
var node=nitobi.ui.Element.htmlNodeCache[name];
if(node==null){
node=$(id);
nitobi.ui.Element.htmlNodeCache[id]=node;
}
return node;
};
nitobi.ui.Element.prototype.flushHtmlNodeCache=function(){
nitobi.ui.Element.htmlNodeCache={};
};
nitobi.ui.Element.prototype.hide=function(_3b8,_3b9){
this.setVisible(false,_3b8,_3b9);
};
nitobi.ui.Element.prototype.show=function(_3ba,_3bb){
this.setVisible(true,_3ba,_3bb);
};
nitobi.ui.Element.prototype.isVisible=function(){
var node=this.getHtmlNode();
return node&&!nitobi.html.Css.hasClass(node,NTB_CSS_HIDE);
};
nitobi.ui.Element.prototype.setVisible=function(_3bd,_3be,_3bf){
var _3c0=this.getHtmlNode();
if(_3c0&&this.isVisible()!=_3bd&&this.onBeforeSetVisible.notify({source:this,event:this.onBeforeSetVisible,args:arguments})!==false){
if(this.effect){
this.effect.end();
}
if(_3bd){
if(_3be){
var _3c1=new _3be(_3c0);
_3c1.callback=nitobi.lang.close(this,this.handleSetVisible,[_3bf]);
this.effect=_3c1;
_3c1.onFinish.subscribeOnce(nitobi.lang.close(this,function(){
this.effect=null;
}));
_3c1.start();
}else{
nitobi.html.Css.removeClass(_3c0,NTB_CSS_HIDE);
this.handleSetVisible(_3bf);
}
}else{
if(_3be){
var _3c1=new _3be(_3c0);
_3c1.callback=nitobi.lang.close(this,this.handleSetVisible,[_3bf]);
this.effect=_3c1;
_3c1.onFinish.subscribeOnce(nitobi.lang.close(this,function(){
this.effect=null;
}));
_3c1.start();
}else{
nitobi.html.Css.addClass(this.getHtmlNode(),NTB_CSS_HIDE);
this.handleSetVisible(_3bf);
}
}
}
};
nitobi.ui.Element.prototype.handleSetVisible=function(_3c2){
if(_3c2){
_3c2();
}
this.onSetVisible.notify(new nitobi.ui.ElementEventArgs(this,this.onSetVisible));
};
nitobi.ui.Element.prototype.setEnabled=function(_3c3){
this.enabled=_3c3;
};
nitobi.ui.Element.prototype.isEnabled=function(){
return this.enabled;
};
nitobi.ui.Element.prototype.render=function(_3c4,_3c5){
this.flushHtmlNodeCache();
_3c5=_3c5||this.getState();
_3c4=$(_3c4)||this.getContainer();
if(_3c4==null){
var _3c4=document.createElement("span");
document.body.appendChild(_3c4);
this.setContainer(_3c4);
}
this.htmlNode=this.renderer.renderIn(_3c4,_3c5)[0];
this.htmlNode.jsObject=this;
};
nitobi.ui.Element.prototype.getContainer=function(){
return this.container;
};
nitobi.ui.Element.prototype.setContainer=function(_3c6){
this.container=$(_3c6);
};
nitobi.ui.Element.prototype.getState=function(){
return this.getXmlNode();
};
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.ElementEventArgs=function(_3c7,_3c8,_3c9){
nitobi.ui.ElementEventArgs.baseConstructor.apply(this,arguments);
this.targetId=_3c9||null;
};
nitobi.lang.extend(nitobi.ui.ElementEventArgs,nitobi.base.EventArgs);
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.EventNotificationEventArgs=function(_3ca,_3cb,_3cc,_3cd){
nitobi.ui.EventNotificationEventArgs.baseConstructor.apply(this,arguments);
this.htmlEvent=_3cd||null;
};
nitobi.lang.extend(nitobi.ui.EventNotificationEventArgs,nitobi.ui.ElementEventArgs);
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.Container=function(id){
nitobi.ui.Container.baseConstructor.call(this,id);
nitobi.collections.IList.call(this);
};
nitobi.lang.extend(nitobi.ui.Container,nitobi.ui.Element);
nitobi.lang.implement(nitobi.ui.Container,nitobi.collections.IList);
nitobi.base.Registry.getInstance().register(new nitobi.base.Profile("nitobi.ui.Container",null,false,"ntb:container"));
nitobi.lang.defineNs("nitobi.ui");
NTB_CSS_SMALL="ntb-effects-small";
NTB_CSS_HIDE="nitobi-hide";
if(false){
nitobi.ui.Effects=function(){
};
}
nitobi.ui.Effects={};
nitobi.ui.Effects.setVisible=function(_3cf,_3d0,_3d1,_3d2,_3d3){
_3d2=(_3d3?nitobi.lang.close(_3d3,_3d2):_3d2)||nitobi.lang.noop;
_3cf=$(_3cf);
if(typeof _3d1=="string"){
_3d1=nitobi.effects.families[_3d1];
}
if(!_3d1){
_3d1=nitobi.effects.families["none"];
}
if(_3d0){
var _3d4=_3d1.show;
}else{
var _3d4=_3d1.hide;
}
if(_3d4){
var _3d5=new _3d4(_3cf);
_3d5.callback=_3d2;
_3d5.start();
}else{
if(_3d0){
nitobi.html.Css.removeClass(_3cf,NTB_CSS_HIDE);
}else{
nitobi.html.Css.addClass(_3cf,NTB_CSS_HIDE);
}
_3d2();
}
};
nitobi.ui.Effects.shrink=function(_3d6,_3d7,_3d8,_3d9){
var rect=_3d7.getClientRects()[0];
_3d6.deltaHeight_Doctype=0-parseInt("0"+nitobi.html.getStyle(_3d7,"border-top-width"))-parseInt("0"+nitobi.html.getStyle(_3d7,"border-bottom-width"))-parseInt("0"+nitobi.html.getStyle(_3d7,"padding-top"))-parseInt("0"+nitobi.html.getStyle(_3d7,"padding-bottom"));
_3d6.deltaWidth_Doctype=0-parseInt("0"+nitobi.html.getStyle(_3d7,"border-left-width"))-parseInt("0"+nitobi.html.getStyle(_3d7,"border-right-width"))-parseInt("0"+nitobi.html.getStyle(_3d7,"padding-left"))-parseInt("0"+nitobi.html.getStyle(_3d7,"padding-right"));
_3d6.oldHeight=Math.abs(rect.top-rect.bottom)+_3d6.deltaHeight_Doctype;
_3d6.oldWidth=Math.abs(rect.right-rect.left)+_3d6.deltaWidth_Doctype;
if(!(typeof (_3d6.width)=="undefined")){
_3d6.deltaWidth=Math.floor(Math.ceil(_3d6.width-_3d6.oldWidth)/(_3d8/nitobi.ui.Effects.ANIMATION_INTERVAL));
}else{
_3d6.width=_3d6.oldWidth;
_3d6.deltaWidth=0;
}
if(!(typeof (_3d6.height)=="undefined")){
_3d6.deltaHeight=Math.floor(Math.ceil(_3d6.height-_3d6.oldHeight)/(_3d8/nitobi.ui.Effects.ANIMATION_INTERVAL));
}else{
_3d6.height=_3d6.oldHeight;
_3d6.deltaHeight=0;
}
nitobi.ui.Effects.resize(_3d6,_3d7,_3d8,_3d9);
};
nitobi.ui.Effects.resize=function(_3db,_3dc,_3dd,_3de){
var rect=_3dc.getClientRects()[0];
var _3e0=Math.abs(rect.top-rect.bottom);
var _3e1=Math.max(_3e0+_3db.deltaHeight+_3db.deltaHeight_Doctype,0);
if(Math.abs(_3e0-_3db.height)<Math.abs(_3db.deltaHeight)){
_3e1=_3db.height;
_3db.deltaHeight=0;
}
var _3e2=Math.abs(rect.right-rect.left);
var _3e3=Math.max(_3e2+_3db.deltaWidth+_3db.deltaWidth_Doctype,0);
_3e3=(_3e3>=0)?_3e3:0;
if(Math.abs(_3e2-_3db.width)<Math.abs(_3db.deltaWidth)){
_3e3=_3db.width;
_3db.deltaWidth=0;
}
_3dd-=nitobi.ui.Effects.ANIMATION_INTERVAL;
if(_3dd>0){
window.setTimeout(nitobi.lang.closeLater(this,nitobi.ui.Effects.resize,[_3db,_3dc,_3dd,_3de]),nitobi.ui.Effects.ANIMATION_INTERVAL);
}
var _3e4=function(){
_3dc.height=_3e1+"px";
_3dc.style.height=_3e1+"px";
_3dc.width=_3e3+"px";
_3dc.style.width=_3e3+"px";
if(_3dd<=0){
if(_3de){
window.setTimeout(_3de,0);
}
}
};
nitobi.ui.Effects.executeNextPulse.push(_3e4);
};
nitobi.ui.Effects.executeNextPulse=new Array();
nitobi.ui.Effects.pulse=function(){
var p;
while(p=nitobi.ui.Effects.executeNextPulse.pop()){
p.call();
}
};
nitobi.ui.Effects.PULSE_INTERVAL=20;
nitobi.ui.Effects.ANIMATION_INTERVAL=40;
window.setInterval(nitobi.ui.Effects.pulse,nitobi.ui.Effects.PULSE_INTERVAL);
window.setTimeout(nitobi.ui.Effects.pulse,nitobi.ui.Effects.PULSE_INTERVAL);
nitobi.ui.Effects.fadeIntervalId={};
nitobi.ui.Effects.fadeIntervalTime=10;
nitobi.ui.Effects.cube=function(_3e6){
return _3e6*_3e6*_3e6;
};
nitobi.ui.Effects.cubeRoot=function(_3e7){
var T=0;
var N=parseFloat(_3e7);
if(N<0){
N=-N;
T=1;
}
var M=Math.sqrt(N);
var ctr=1;
while(ctr<101){
var M=M*N;
var M=Math.sqrt(Math.sqrt(M));
ctr++;
}
return M;
};
nitobi.ui.Effects.linear=function(_3ec){
return _3ec;
};
nitobi.ui.Effects.fade=function(_3ed,_3ee,time,_3f0,_3f1){
_3f1=_3f1||nitobi.ui.Effects.linear;
var _3f2=(new Date()).getTime()+time;
var id=nitobi.component.getUniqueId();
var _3f4=(new Date()).getTime();
var el=_3ed;
if(_3ed.length){
el=_3ed[0];
}
var _3f6=nitobi.html.Css.getOpacity(el);
var _3f7=(_3ee-_3f6<0?-1:0);
nitobi.ui.Effects.fadeIntervalId[id]=window.setInterval(function(){
nitobi.ui.Effects.stepFade(_3ed,_3ee,_3f4,_3f2,id,_3f0,_3f1,_3f7);
},nitobi.ui.Effects.fadeIntervalTime);
};
nitobi.ui.Effects.stepFade=function(_3f8,_3f9,_3fa,_3fb,id,_3fd,_3fe,_3ff){
var ct=(new Date()).getTime();
var _401=_3fb-_3fa;
var nct=((ct-_3fa)/(_3fb-_3fa));
if(nct<=0||nct>=1){
nitobi.html.Css.setOpacities(_3f8,_3f9);
window.clearInterval(nitobi.ui.Effects.fadeIntervalId[id]);
_3fd();
return;
}else{
nct=Math.abs(nct+_3ff);
}
var no=_3fe(nct);
nitobi.html.Css.setOpacities(_3f8,no*100);
};
nitobi.lang.defineNs("nitobi.component");
if(false){
nitobi.component=function(){
};
}
nitobi.loadComponent=function(el){
var id=el;
try{
el=$(el);
if(el==null){
nitobi.lang.throwError("nitobi.loadComponent could not load the component because it could not be found on the page. The component may not have a declaration, node, or it may have a duplicated id. Id: "+id);
}
if(el.jsObject!=null){
return el.jsObject;
}
var _406;
var _407=nitobi.html.getTagName(el);
if(_407=="ntb:grid"){
_406=nitobi.initGrid(el.id);
}else{
if(_407==="ntb:combo"){
_406=nitobi.initCombo(el.id);
}else{
if(el.jsObject==null){
_406=nitobi.base.Factory.getInstance().createByTag(_407,el.id,nitobi.component.renderComponent);
if(_406.render&&!_406.onLoadCallback){
_406.render();
}
}else{
_406=el.jsObject;
}
}
}
return _406;
}
catch(err){
nitobi.lang.throwError(nitobi.error.Unexpected,err);
}
};
nitobi.component.renderComponent=function(_408){
_408.source.render();
};
nitobi.getComponent=function(id){
var el=$(id);
if(el==null){
return null;
}
return el.jsObject;
};
nitobi.component.uniqueId=0;
nitobi.component.getUniqueId=function(){
return "ntbcmp_"+(nitobi.component.uniqueId++);
};
nitobi.component.findNitobiComponents=function(_40b,_40c){
if(nitobi.component.isNitobiElement(_40b)){
_40c.push(_40b);
return;
}
var _40d=_40b.childNodes;
for(var i=0;i<_40d.length;i++){
nitobi.component.findNitobiComponents(_40d[i],_40c);
}
return;
};
nitobi.component.isNitobiElement=function(_40f){
var _410=nitobi.html.getTagName(_40f);
if(_410.substr(0,3)=="ntb"){
return true;
}else{
return false;
}
};
nitobi.component.loadComponentsFromNode=function(_411){
var _412=new Array();
nitobi.component.findNitobiComponents(_411,_412);
for(var i=0;i<_412.length;i++){
nitobi.loadComponent(_412[i].getAttribute("id"));
}
};
nitobi.lang.defineNs("nitobi.effects");
if(false){
nitobi.effects=function(){
};
}
nitobi.effects.Effect=function(_414,_415){
this.element=$(_414);
this.transition=_415.transition||nitobi.effects.Transition.sinoidal;
this.duration=_415.duration||1;
this.fps=_415.fps||50;
this.from=typeof (_415.from)==="number"?_415.from:0;
this.to=typeof (_415.from)==="number"?_415.to:1;
this.delay=_415.delay||0;
this.callback=typeof (_415.callback)==="function"?_415.callback:nitobi.lang.noop;
this.queue=_415.queue||nitobi.effects.EffectQueue.globalQueue;
this.onBeforeFinish=new nitobi.base.Event();
this.onFinish=new nitobi.base.Event();
this.onBeforeStart=new nitobi.base.Event();
};
nitobi.effects.Effect.prototype.start=function(){
var now=new Date().getTime();
this.startOn=now+this.delay*1000;
this.finishOn=this.startOn+this.duration*1000;
this.deltaTime=this.duration*1000;
this.totalFrames=this.duration*this.fps;
this.frame=0;
this.delta=this.from-this.to;
this.queue.add(this);
};
nitobi.effects.Effect.prototype.render=function(pos){
if(!this.running){
this.onBeforeStart.notify(new nitobi.base.EventArgs(this,this.onBeforeStart));
this.setup();
this.running=true;
}
this.update(this.transition(pos*this.delta+this.from));
};
nitobi.effects.Effect.prototype.step=function(now){
if(this.startOn<=now){
if(now>=this.finishOn){
this.end();
return;
}
var pos=(now-this.startOn)/(this.deltaTime);
var _41a=Math.floor(pos*this.totalFrames);
if(this.frame<_41a){
this.render(pos);
this.frame=_41a;
}
}
};
nitobi.effects.Effect.prototype.setup=function(){
};
nitobi.effects.Effect.prototype.update=function(pos){
};
nitobi.effects.Effect.prototype.finish=function(){
};
nitobi.effects.Effect.prototype.end=function(){
this.onBeforeFinish.notify(new nitobi.base.EventArgs(this,this.onBeforeFinish));
this.cancel();
this.render(1);
this.running=false;
this.finish();
this.callback();
this.onFinish.notify(new nitobi.base.EventArgs(this,this.onAfterFinish));
};
nitobi.effects.Effect.prototype.cancel=function(){
this.queue.remove(this);
};
nitobi.effects.factory=function(_41c,_41d,etc){
var args=nitobi.lang.toArray(arguments,2);
return function(_420){
var f=function(){
_41c.apply(this,[_420,_41d].concat(args));
};
nitobi.lang.extend(f,_41c);
return new f();
};
};
nitobi.effects.families={none:{show:null,hide:null}};
nitobi.lang.defineNs("nitobi.effects");
if(false){
nitobi.effects.Transition=function(){
};
}
nitobi.effects.Transition={};
nitobi.effects.Transition.sinoidal=function(x){
return (-Math.cos(x*Math.PI)/2)+0.5;
};
nitobi.effects.Transition.linear=function(x){
return x;
};
nitobi.effects.Transition.reverse=function(x){
return 1-x;
};
nitobi.lang.defineNs("nitobi.effects");
nitobi.effects.Scale=function(_425,_426,_427){
nitobi.effects.Scale.baseConstructor.call(this,_425,_426);
this.scaleX=typeof (_426.scaleX)=="boolean"?_426.scaleX:true;
this.scaleY=typeof (_426.scaleY)=="boolean"?_426.scaleY:true;
this.scaleFrom=typeof (_426.scaleFrom)=="number"?_426.scaleFrom:100;
this.scaleTo=_427;
};
nitobi.lang.extend(nitobi.effects.Scale,nitobi.effects.Effect);
nitobi.effects.Scale.prototype.setup=function(){
var _428=this.element.style;
this.originalStyle={"top":_428.top,"left":_428.left,"width":_428.width,"height":_428.height,"overflow":_428.overflow};
this.factor=(this.scaleTo-this.scaleFrom)/100;
this.dims=[this.element.scrollWidth,this.element.scrollHeight];
_428.width=this.dims[0]+"px";
_428.height=this.dims[1]+"px";
_428.overflow="hidden";
};
nitobi.effects.Scale.prototype.finish=function(){
for(var s in this.originalStyle){
this.element.style[s]=this.originalStyle[s];
}
};
nitobi.effects.Scale.prototype.update=function(pos){
var _42b=(this.scaleFrom/100)+(this.factor*pos);
this.setDimensions(Math.floor(_42b*this.dims[0])||1,Math.floor(_42b*this.dims[1])||1);
};
nitobi.effects.Scale.prototype.setDimensions=function(x,y){
if(this.scaleX){
this.element.style.width=x+"px";
}
if(this.scaleY){
this.element.style.height=y+"px";
}
};
nitobi.lang.defineNs("nitobi.effects");
nitobi.effects.EffectQueue=function(){
nitobi.effects.EffectQueue.baseConstructor.call(this);
nitobi.collections.IEnumerable.call(this);
this.intervalId=0;
};
nitobi.lang.extend(nitobi.effects.EffectQueue,nitobi.Object);
nitobi.lang.implement(nitobi.effects.EffectQueue,nitobi.collections.IEnumerable);
nitobi.effects.EffectQueue.prototype.add=function(_42e){
nitobi.collections.IEnumerable.prototype.add.call(this,_42e);
if(!this.intervalId){
this.intervalId=window.setInterval(nitobi.lang.close(this,this.step),15);
}
};
nitobi.effects.EffectQueue.prototype.step=function(){
var now=new Date().getTime();
this.each(function(e){
e.step(now);
});
};
nitobi.effects.EffectQueue.globalQueue=new nitobi.effects.EffectQueue();
nitobi.lang.defineNs("nitobi.effects");
nitobi.effects.BlindUp=function(_431,_432){
_432=nitobi.lang.merge({scaleX:false,duration:Math.min(0.2*(_431.scrollHeight/100),0.5)},_432||{});
nitobi.effects.BlindUp.baseConstructor.call(this,_431,_432,0);
};
nitobi.lang.extend(nitobi.effects.BlindUp,nitobi.effects.Scale);
nitobi.effects.BlindUp.prototype.setup=function(){
nitobi.effects.BlindUp.base.setup.call(this);
};
nitobi.effects.BlindUp.prototype.finish=function(){
nitobi.html.Css.addClass(this.element,NTB_CSS_HIDE);
nitobi.effects.BlindUp.base.finish.call(this);
this.element.style.height="";
};
nitobi.effects.BlindDown=function(_433,_434){
nitobi.html.Css.swapClass(_433,NTB_CSS_HIDE,NTB_CSS_SMALL);
_434=nitobi.lang.merge({scaleX:false,scaleFrom:0,duration:Math.min(0.2*(_433.scrollHeight/100),0.5)},_434||{});
nitobi.effects.BlindDown.baseConstructor.call(this,_433,_434,100);
};
nitobi.lang.extend(nitobi.effects.BlindDown,nitobi.effects.Scale);
nitobi.effects.BlindDown.prototype.setup=function(){
nitobi.effects.BlindDown.base.setup.call(this);
this.element.style.height="1px";
nitobi.html.Css.removeClass(this.element,NTB_CSS_SMALL);
};
nitobi.effects.BlindDown.prototype.finish=function(){
nitobi.effects.BlindDown.base.finish.call(this);
this.element.style.height="";
};
nitobi.effects.families.blind={show:nitobi.effects.BlindDown,hide:nitobi.effects.BlindUp};
nitobi.lang.defineNs("nitobi.effects");
nitobi.effects.ShadeUp=function(_435,_436){
_436=nitobi.lang.merge({scaleX:false,duration:Math.min(0.2*(_435.scrollHeight/100),0.3)},_436||{});
nitobi.effects.ShadeUp.baseConstructor.call(this,_435,_436,0);
};
nitobi.lang.extend(nitobi.effects.ShadeUp,nitobi.effects.Scale);
nitobi.effects.ShadeUp.prototype.setup=function(){
nitobi.effects.ShadeUp.base.setup.call(this);
var _437=nitobi.html.getFirstChild(this.element);
this.originalStyle.position=this.element.style.position;
nitobi.html.position(this.element);
if(_437){
var _438=_437.style;
this.fnodeStyle={position:_438.position,bottom:_438.bottom,left:_438.left};
this.fnode=_437;
_438.position="absolute";
_438.bottom="0px";
_438.left="0px";
}
};
nitobi.effects.ShadeUp.prototype.finish=function(){
nitobi.effects.ShadeUp.base.finish.call(this);
nitobi.html.Css.addClass(this.element,NTB_CSS_HIDE);
this.element.style.height="";
this.element.style.position=this.originalStyle.position;
this.element.style.overflow=this.originalStyle.overflow;
for(var x in this.fnodeStyle){
this.fnode.style[x]=this.fnodeStyle[x];
}
};
nitobi.effects.ShadeDown=function(_43a,_43b){
nitobi.html.Css.swapClass(_43a,NTB_CSS_HIDE,NTB_CSS_SMALL);
_43b=nitobi.lang.merge({scaleX:false,scaleFrom:0,duration:Math.min(0.2*(_43a.scrollHeight/100),0.3)},_43b||{});
nitobi.effects.ShadeDown.baseConstructor.call(this,_43a,_43b,100);
};
nitobi.lang.extend(nitobi.effects.ShadeDown,nitobi.effects.Scale);
nitobi.effects.ShadeDown.prototype.setup=function(){
nitobi.effects.ShadeDown.base.setup.call(this);
this.element.style.height="1px";
nitobi.html.Css.removeClass(this.element,NTB_CSS_SMALL);
var _43c=nitobi.html.getFirstChild(this.element);
this.originalStyle.position=this.element.style.position;
nitobi.html.position(this.element);
if(_43c){
var _43d=_43c.style;
this.fnodeStyle={position:_43d.position,bottom:_43d.bottom,left:_43d.left,right:_43d.right,top:_43d.top};
this.fnode=_43c;
_43d.position="absolute";
_43d.top="";
_43d.right="";
_43d.bottom="0px";
_43d.left="0px";
}
};
nitobi.effects.ShadeDown.prototype.finish=function(){
nitobi.effects.ShadeDown.base.finish.call(this);
this.element.style.height="";
this.element.style.position=this.originalStyle.position;
this.element.style.overflow=this.originalStyle.overflow;
for(var x in this.fnodeStyle){
this.fnode.style[x]=this.fnodeStyle[x];
}
this.fnode.style.top="0px";
this.fnode.style.left="0px";
this.fnode.style.bottom="";
this.fnode.style.right="";
return;
this.fnode.style["position"]="";
};
nitobi.effects.families.shade={show:nitobi.effects.ShadeDown,hide:nitobi.effects.ShadeUp};
nitobi.lang.defineNs("nitobi.lang");
nitobi.lang.StringBuilder=function(_43f){
if(_43f){
if(typeof (_43f)==="string"){
this.strings=[_43f];
}else{
this.strings=_43f;
}
}else{
this.strings=new Array();
}
};
nitobi.lang.StringBuilder.prototype.append=function(_440){
if(_440){
this.strings.push(_440);
}
return this;
};
nitobi.lang.StringBuilder.prototype.clear=function(){
this.strings.length=0;
};
nitobi.lang.StringBuilder.prototype.toString=function(){
return this.strings.join("");
};


var temp_ntb_uniqueIdGeneratorProc='<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" /> <x:p-x:n-guid"x:s-0"/><x:t- match="/"> <x:at-/></x:t-><x:t- match="node()|@*"> <xsl:copy> <xsl:if test="not(@id)"> <x:a-x:n-id" ><x:v-x:s-generate-id(.)"/><x:v-x:s-position()"/><x:v-x:s-$guid"/></x:a-> </xsl:if> <x:at-x:s-./* | text() | @*"> </x:at-> </xsl:copy></x:t-> <x:t- match="text()"> <x:v-x:s-."/></x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.base");
nitobi.base.uniqueIdGeneratorProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_uniqueIdGeneratorProc));


