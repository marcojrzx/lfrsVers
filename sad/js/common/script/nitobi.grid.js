if(typeof (nitobi)=="undefined"||typeof (nitobi.lang)=="undefined"){
alert("The Nitobi framework source could not be found. Is it included before any other Nitobi components?");
}
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.build="5881";
nitobi.grid.version="3.5.5881";
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.Scrollbar=function(){
this.uid="scroll"+nitobi.base.getUid();
};
nitobi.ui.Scrollbar.prototype.render=function(){
};
nitobi.ui.Scrollbar.prototype.attachToParent=function(_1,_2,_3){
this.UiContainer=_1;
this.element=_2||nitobi.html.getFirstChild(this.UiContainer);
if(this.element==null){
this.render();
}
this.surface=_3||nitobi.html.getFirstChild(this.element);
this.element.onclick="";
this.element.onmouseover="";
this.element.onmouseout="";
this.element.onscroll="";
nitobi.html.attachEvent(this.element,"scroll",this.scrollByUser,this);
};
nitobi.ui.Scrollbar.prototype.align=function(){
var vs=document.getElementById("vscroll"+this.uid);
var dx=-1;
if(nitobi.browser.MOZ){
dx=-3;
}
nitobi.drawing.align(vs,this.UiContainer.childNodes[0],269484288,-42,0,24,dx,false);
};
nitobi.ui.Scrollbar.prototype.scrollByUser=function(){
this.fire("ScrollByUser",this.getScrollPercent());
};
nitobi.ui.Scrollbar.prototype.setScroll=function(_6){
};
nitobi.ui.Scrollbar.prototype.getScrollPercent=function(){
};
nitobi.ui.Scrollbar.prototype.setRange=function(_7){
};
nitobi.ui.Scrollbar.prototype.getWidth=function(){
return nitobi.html.getScrollBarWidth();
};
nitobi.ui.Scrollbar.prototype.getHeight=function(){
return nitobi.html.getScrollBarWidth();
};
nitobi.ui.Scrollbar.prototype.fire=function(_8,_9){
return nitobi.event.notify(_8+this.uid,_9);
};
nitobi.ui.Scrollbar.prototype.subscribe=function(_a,_b,_c){
if(typeof (_c)=="undefined"){
_c=this;
}
return nitobi.event.subscribe(_a+this.uid,nitobi.lang.close(_c,_b));
};
nitobi.ui.VerticalScrollbar=function(){
this.uid="vscroll"+nitobi.base.getUid();
};
nitobi.lang.extend(nitobi.ui.VerticalScrollbar,nitobi.ui.Scrollbar);
nitobi.ui.VerticalScrollbar.prototype.setScrollPercent=function(_d){
this.element.scrollTop=(this.surface.offsetHeight-this.element.offsetHeight)*_d;
return false;
};
nitobi.ui.VerticalScrollbar.prototype.getScrollPercent=function(){
return (this.element.scrollTop/(this.surface.offsetHeight-this.element.offsetHeight));
};
nitobi.ui.VerticalScrollbar.prototype.setRange=function(_e){
var st=this.element.scrollTop;
this.surface.style.height=Math.floor(this.element.offsetHeight/_e)+"px";
this.element.scrollTop=st;
this.element.scrollTop=this.element.scrollTop;
};
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.HorizontalScrollbar=function(){
this.uid="hscroll"+nitobi.base.getUid();
};
nitobi.lang.extend(nitobi.ui.HorizontalScrollbar,nitobi.ui.Scrollbar);
nitobi.ui.HorizontalScrollbar.prototype.getScrollPercent=function(){
return (this.element.scrollLeft/(this.surface.clientWidth-this.element.clientWidth));
};
nitobi.ui.HorizontalScrollbar.prototype.setScrollPercent=function(_10){
this.element.scrollLeft=(this.surface.clientWidth-this.element.clientWidth)*_10;
return false;
};
nitobi.ui.HorizontalScrollbar.prototype.setRange=function(_11){
this.surface.style.width=Math.floor(this.element.offsetWidth/_11)+"px";
};
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.IDataBoundList=function(){
};
nitobi.ui.IDataBoundList.prototype.getGetHandler=function(){
return this.getHandler;
};
nitobi.ui.IDataBoundList.prototype.setGetHandler=function(_12){
this.column.ModelNode.setAttribute("GetHandler",_12);
this.getHandler=_12;
};
nitobi.ui.IDataBoundList.prototype.getDataSourceId=function(){
return this.datasourceId;
};
nitobi.ui.IDataBoundList.prototype.setDataSourceId=function(_13){
this.column.ModelNode.setAttribute("DatasourceId",_13);
this.datasourceId=_13;
};
nitobi.ui.IDataBoundList.prototype.getDisplayFields=function(){
return this.displayFields;
};
nitobi.ui.IDataBoundList.prototype.setDisplayFields=function(_14){
this.column.ModelNode.setAttribute("DisplayFields",_14);
this.displayFields=_14;
};
nitobi.ui.IDataBoundList.prototype.getValueField=function(){
return this.valueField;
};
nitobi.ui.IDataBoundList.prototype.setValueField=function(_15){
this.column.ModelNode.setAttribute("ValueField",_15);
this.valueField=_15;
};
if(typeof (nitobi.collections)=="undefined"){
nitobi.collections={};
}
nitobi.collections.CacheMap=function(){
this.tail=null;
this.debug=new Array();
};
nitobi.collections.CacheMap.prototype.insert=function(low,_17){
low=Number(low);
_17=Number(_17);
this.debug.push("insert("+low+","+_17+")");
var _18=new nitobi.collections.CacheNode(low,_17);
if(this.head==null){
this.debug.push("empty cache, adding first node");
this.head=_18;
this.tail=_18;
}else{
var n=this.head;
while(n!=null&&low>n.high+1){
n=n.next;
}
if(n==null){
this.debug.push("appending node to end");
this.tail.next=_18;
_18.prev=this.tail;
this.tail=_18;
}else{
this.debug.push("inserting new node before "+n.toString());
if(n.prev!=null){
_18.prev=n.prev;
n.prev.next=_18;
}
_18.next=n;
n.prev=_18;
while(_18.mergeNext()){
}
if(_18.prev==null){
this.head=_18;
}
if(_18.next==null){
this.tail=_18;
}
}
}
};
nitobi.collections.CacheMap.prototype.remove=function(low,_1b){
low=Number(low);
_1b=Number(_1b);
this.debug.push("insert("+low+","+_1b+")");
if(this.head==null){
}else{
if(_1b<this.head.low||low>this.tail.high){
return;
}
var _1c=this.head;
while(_1c!=null&&low>_1c.high){
_1c=_1c.next;
}
if(_1c==null){
this.debug.push("the range was not found");
}else{
var end=_1c;
var _1e=null;
while(end!=null&&_1b>end.high){
if((end.next!=null&&_1b<end.next.low)||end.next==null){
break;
}
_1e=end.next;
if(end!=_1c){
this.removeNode(end);
}
end=_1e;
}
if(_1c!=end){
if(_1b>=end.high){
this.removeNode(end);
}
if(low<=_1c.low){
this.removeNode(_1c);
}
}else{
if(_1c.low>=low&&_1c.high<=_1b){
this.removeNode(_1c);
return;
}else{
if(low>_1c.low&&_1b<_1c.high){
var _1f=_1c.low;
var _20=_1c.high;
this.removeNode(_1c);
this.insert(_1f,low-1);
this.insert(_1b+1,_20);
return;
}
}
}
if(end!=null&&_1b<end.high){
end.low=_1b+1;
}
if(_1c!=null&&low>_1c.low){
_1c.high=low-1;
}
}
}
};
nitobi.collections.CacheMap.prototype.gaps=function(low,_22){
var g=new Array();
var n=this.head;
if(n==null||n.low>_22||this.tail.high<low){
g.push(new nitobi.collections.Range(low,_22));
return g;
}
var _25=0;
while(n!=null&&n.high<low){
_25=n.high+1;
n=n.next;
}
if(n!=null){
do{
if(g.length==0){
if(low<n.low){
g.push(new nitobi.collections.Range(Math.max(low,_25),Math.min(n.low-1,_22)));
}
}
if(_22>n.high){
if(n.next==null||n.next.low>_22){
g.push(new nitobi.collections.Range(n.high+1,_22));
}else{
g.push(new nitobi.collections.Range(n.high+1,n.next.low-1));
}
}
n=n.next;
}while(n!=null&&n.high<_22);
}else{
g.push(new nitobi.collections.Range(this.tail.high+1,_22));
}
return g;
};
nitobi.collections.CacheMap.prototype.ranges=function(low,_27){
var g=new Array();
var n=this.head;
if(n==null||n.low>_27||this.tail.high<low){
return g;
}
while(n!=null&&n.high<low){
minLow=n.high+1;
n=n.next;
}
if(n!=null){
do{
g.push(new nitobi.collections.Range(n.low,n.high));
n=n.next;
}while(n!=null&&n.high<_27);
}
return g;
};
nitobi.collections.CacheMap.prototype.gapsString=function(low,_2b){
var gs=this.gaps(low,_2b);
var a=new Array();
for(var i=0;i<gs.length;i++){
a.push(gs[i].toString());
}
return a.join(",");
};
nitobi.collections.CacheMap.prototype.removeNode=function(_2f){
if(_2f.prev!=null){
_2f.prev.next=_2f.next;
}else{
this.head=_2f.next;
}
if(_2f.next!=null){
_2f.next.prev=_2f.prev;
}else{
this.tail=_2f.prev;
}
_2f=null;
};
nitobi.collections.CacheMap.prototype.toString=function(){
var n=this.head;
var s=new Array();
while(n!=null){
s.push(n.toString());
n=n.next;
}
return s.join(",");
};
nitobi.collections.CacheMap.prototype.flush=function(){
var _32=this.head;
while(Boolean(_32)){
var _33=_32.next;
delete (_32);
_32=_33;
}
this.head=null;
this.tail=null;
};
nitobi.collections.CacheMap.prototype.insertIntoRange=function(_34){
var n=this.head;
var inc=0;
while(n!=null){
if(_34>=n.low&&_34<=n.high){
inc=1;
n.high+=inc;
}else{
n.low+=inc;
n.high+=inc;
}
n=n.next;
}
if(inc==0){
this.insert(_34,_34);
}
};
nitobi.collections.CacheMap.prototype.removeFromRange=function(_37){
var n=this.head;
var inc=0;
while(n!=null){
if(_37>=n.low&&_37<=n.high){
inc=-1;
if(n.low==n.high){
this.remove(_37,_37);
}else{
n.high+=inc;
}
}else{
n.low+=inc;
n.high+=inc;
}
n=n.next;
}
};
nitobi.lang.defineNs("nitobi.collections");
nitobi.collections.BlockMap=function(){
this.head=null;
this.tail=null;
this.debug=new Array();
};
nitobi.lang.extend(nitobi.collections.BlockMap,nitobi.collections.CacheMap);
nitobi.collections.BlockMap.prototype.insert=function(low,_3b){
low=Number(low);
_3b=Number(_3b);
this.debug.push("insert("+low+","+_3b+")");
if(this.head==null){
var _3c=new nitobi.collections.CacheNode(low,_3b);
this.debug.push("empty cache, adding first node");
this.head=_3c;
this.tail=_3c;
}else{
var n=this.head;
while(n!=null&&low>n.high){
n=n.next;
}
if(n==null){
var _3c=new nitobi.collections.CacheNode(low,_3b);
this.debug.push("appending node to end");
this.tail.next=_3c;
_3c.prev=this.tail;
this.tail=_3c;
}else{
this.debug.push("inserting new node into or before "+n.toString());
if(low<n.low||_3b>n.high){
if(low<n.low){
var _3c=new nitobi.collections.CacheNode(low,_3b);
_3c.prev=n.prev;
_3c.next=n;
if(n.prev!=null){
n.prev.next=_3c;
}
n.prev=_3c;
_3c.high=Math.min(_3c.high,n.low-1);
}else{
var _3c=new nitobi.collections.CacheNode(n.high+1,_3b);
_3c.prev=n;
_3c.next=n.next;
if(n.next!=null){
n.next.prev=_3c;
_3c.high=Math.min(_3b,_3c.next.low-1);
}
n.next=_3c;
}
if(_3c.prev==null){
this.head=_3c;
}
if(_3c.next==null){
this.tail=_3c;
}
}
}
}
};
nitobi.collections.BlockMap.prototype.blocks=function(low,_3f){
var g=new Array();
var n=this.head;
if(n==null||n.low>_3f||this.tail.high<low){
g.push(new nitobi.collections.Range(low,_3f));
return g;
}
var _42=0;
while(n!=null&&n.high<low){
_42=n.high+1;
n=n.next;
}
if(n!=null){
do{
if(g.length==0){
if(low<n.low){
g.push(new nitobi.collections.Range(Math.max(low,_42),Math.min(n.low-1,_3f)));
}
}
if(_3f>n.high){
if(n.next==null||n.next.low>_3f){
g.push(new nitobi.collections.Range(n.high+1,_3f));
}else{
g.push(new nitobi.collections.Range(n.high+1,n.next.low-1));
}
}
n=n.next;
}while(n!=null&&n.high<_3f);
}else{
g.push(new nitobi.collections.Range(this.tail.high+1,_3f));
}
return g;
};
nitobi.lang.defineNs("nitobi.collections");
nitobi.collections.CellSet=function(_43,_44,_45,_46,_47){
this.owner=_43;
if(_44!=null&&_45!=null&&_46!=null&&_47!=null){
this.setRange(_44,_45,_46,_47);
}else{
this.setRange(0,0,0,0);
}
};
nitobi.collections.CellSet.prototype.toString=function(){
var str="";
for(var i=this._topRow;i<=this._bottomRow;i++){
str+="[";
for(var j=this._leftColumn;j<=this._rightColumn;j++){
str+="("+i+","+j+")";
}
str+="]";
}
return str;
};
nitobi.collections.CellSet.prototype.setRange=function(_4b,_4c,_4d,_4e){
this._startRow=_4b;
this._startColumn=_4c;
this._endRow=_4d;
this._endColumn=_4e;
this._leftColumn=Math.min(_4c,_4e);
this._rightColumn=Math.max(_4c,_4e);
this._topRow=Math.min(_4b,_4d);
this._bottomRow=Math.max(_4b,_4d);
};
nitobi.collections.CellSet.prototype.changeStartCell=function(_4f,_50){
this._startRow=_4f;
this._startColumn=_50;
this._leftColumn=Math.min(_50,this._endColumn);
this._rightColumn=Math.max(_50,this._endColumn);
this._topRow=Math.min(_4f,this._endRow);
this._bottomRow=Math.max(_4f,this._endRow);
};
nitobi.collections.CellSet.prototype.changeEndCell=function(_51,_52){
this._endRow=_51;
this._endColumn=_52;
this._leftColumn=Math.min(_52,this._startColumn);
this._rightColumn=Math.max(_52,this._startColumn);
this._topRow=Math.min(_51,this._startRow);
this._bottomRow=Math.max(_51,this._startRow);
};
nitobi.collections.CellSet.prototype.getRowCount=function(){
return this._bottomRow-this._topRow+1;
};
nitobi.collections.CellSet.prototype.getColumnCount=function(){
return this._rightColumn-this._leftColumn+1;
};
nitobi.collections.CellSet.prototype.getCoords=function(){
return {"top":new nitobi.drawing.Point(this._leftColumn,this._topRow),"bottom":new nitobi.drawing.Point(this._rightColumn,this._bottomRow)};
};
nitobi.collections.CellSet.prototype.getCellObjectByOffset=function(_53,_54){
return this.owner.getCellObject(this._topRow+_53,this._leftColumn+_54);
};
if(typeof (nitobi.collections)=="undefined"){
nitobi.collections={};
}
nitobi.collections.CacheNode=function(low,_56){
this.low=low;
this.high=_56;
this.next=null;
this.prev=null;
};
nitobi.collections.CacheNode.prototype.isIn=function(val){
return ((val>=this.low)&&(val<=this.high));
};
nitobi.collections.CacheNode.prototype.mergeNext=function(){
var _58=this.next;
if(_58!=null&&_58.low<=this.high+1){
this.high=Math.max(this.high,_58.high);
this.low=Math.min(this.low,_58.low);
var _59=_58.next;
this.next=_59;
if(_59!=null){
_59.prev=this;
}
_58.clear();
return true;
}else{
return false;
}
};
nitobi.collections.CacheNode.prototype.clear=function(){
this.next=null;
this.prev=null;
};
nitobi.collections.CacheNode.prototype.toString=function(){
return "["+this.low+","+this.high+"]";
};
if(typeof (nitobi.collections)=="undefined"){
nitobi.collections={};
}
nitobi.collections.Range=function(low,_5b){
this.low=low;
this.high=_5b;
};
nitobi.collections.Range.prototype.isIn=function(val){
return ((val>=this.low)&&(val<=this.high));
};
nitobi.collections.Range.prototype.toString=function(){
return "["+this.low+","+this.high+"]";
};
nitobi.prepare=function(){
ebagdl=1185871279984;
ebagd1=1188463279984;
s="var d = new Date().getTime();if ((d<"+ebagdl+") || (d>"+ebagd1+")) {alert('Evaluation period has expired.\\n\\nPlease notify your system administrator.\\n\\nPurchase Information:\\n       NITOBI SOFTWARE\\n\\n       www.nitobi.com\\n       sales@nitobi.com         \\n       Telephone: (604) 985-9287\\n       Fax: (604) 648-9090\\n       Toll-Free: 1-866-6EB-APPS\\n                      (1-866-632-2777)');}";
eval(s);
};
nitobi.lang.defineNs("nitobi.grid");
if(false){
nitobi.grid=function(){
};
}
nitobi.grid.PAGINGMODE_NONE="none";
nitobi.grid.PAGINGMODE_STANDARD="standard";
nitobi.grid.PAGINGMODE_LIVESCROLLING="livescrolling";
nitobi.grid.Grid=function(uid){
nitobi.prepare();
EBAAutoRender=false;
this.disposal=[];
this.uid=uid||nitobi.base.getUid();
if(typeof (this.Interface)=="undefined"){
this.API=nitobi.grid.apiDoc;
this.accessorGeneratorXslProc=nitobi.xml.createXslProcessor(nitobi.grid.accessorGeneratorXslProc.stylesheet);
this.Interface=this.API.selectSingleNode("interfaces/interface[@name='nitobi.grid.Grid']");
eval(nitobi.xml.transformToString(this.Interface,this.accessorGeneratorXslProc));
}
this.configureDefaults();
nitobi.html.addUnload(nitobi.lang.close(this,this.dispose));
this.subscribe("AttachToParent",this.initialize);
this.subscribe("DataReady",this.layout);
this.subscribe("AfterCellEdit",this.autoSave);
this.subscribe("AfterRowInsert",this.autoSave);
this.subscribe("AfterRowDelete",this.autoSave);
this.subscribe("AfterPaste",this.autoSave);
this.subscribe("AfterPaste",this.focus);
this.subscribeOnce("HtmlReady",this.adjustHorizontalScrollBars);
this.subscribe("AfterGridResize",this.adjustHorizontalScrollBars);
this.events=[];
this.keyEvents=[];
};
nitobi.grid.Grid.prototype.initialize=function(){
this.fire("Preinitialize");
this.initializeFromCss();
this.createChildren();
this.fire("AfterInitialize");
this.validationFirstPass();
this.fire("CreationComplete");
};
nitobi.grid.Grid.prototype.initializeFromCss=function(){
var _5e=nitobi.html.getClass("ntbrow");
if(_5e!=null&&_5e.height!=null&&_5e.height!=""){
this.setRowHeight(parseInt(_5e.height));
}
var _5f=nitobi.html.getClass("ntbheaderrow");
if(_5f!=null&&_5f.height!=null&&_5f.height!=""){
this.setHeaderHeight(parseInt(_5f.height));
}
};
nitobi.grid.Grid.prototype.connectRenderersToDataSet=function(_60){
this.TopLeftRenderer.xmlDataSource=_60;
this.TopCenterRenderer.xmlDataSource=_60;
this.MidLeftRenderer.xmlDataSource=_60;
this.MidCenterRenderer.xmlDataSource=_60;
};
nitobi.grid.Grid.prototype.connectToDataSet=function(_61,_62){
this.data=_61;
if(this.TopLeftRenderer){
this.connectRenderersToDataSet(_61);
}
this.connectToTable(_62);
};
nitobi.grid.Grid.prototype.connectToTable=function(_63){
if(typeof (_63)=="string"){
this.datatable=this.data.getTable(_63);
}else{
if(typeof (_63)=="object"){
this.datatable=_63;
}else{
if(this.data.getTable("_default")+""!="undefined"){
this.datatable=this.data.getTable("_default");
}else{
return false;
}
}
}
this.connected=true;
this.updateStructure();
this.datatable.subscribe("DataReady",nitobi.lang.close(this,this.handleHandlerError));
this.datatable.subscribe("DataReady",nitobi.lang.close(this,this.syncWithData));
this.datatable.subscribe("DataSorted",nitobi.lang.close(this,this.syncWithData));
this.datatable.subscribe("RowInserted",nitobi.lang.close(this,this.syncWithData));
this.datatable.subscribe("RowDeleted",nitobi.lang.close(this,this.syncWithData));
this.datatable.subscribe("RowCountChanged",nitobi.lang.close(this,this.setRowCount));
this.datatable.subscribe("PastEndOfData",nitobi.lang.close(this,this.adjustRowCount));
this.datatable.subscribe("RowCountKnown",nitobi.lang.close(this,this.finalizeRowCount));
this.datatable.subscribe("StructureChanged",nitobi.lang.close(this,this.updateStructure));
this.datatable.subscribe("ColumnsInitialized",nitobi.lang.close(this,this.updateStructure));
this.dataTableId=this.datatable.id;
this.datatable.setOnGenerateKey(this.getKeyGenerator());
this.fire("TableConnected",this.datatable);
return true;
};
nitobi.grid.Grid.prototype.ensureConnected=function(){
if(this.data==null){
this.data=new nitobi.data.DataSet();
this.data.initialize();
this.datatable=new nitobi.data.DataTable(this.getDataMode(),this.getPagingMode()==nitobi.grid.PAGINGMODE_LIVESCROLLING,{GridId:this.getID()},{GridId:this.getID()},this.isAutoKeyEnabled());
this.datatable.initialize("_default",this.getGetHandler(),this.getSaveHandler());
this.data.add(this.datatable);
this.connectToDataSet(this.data);
}
if(this.datatable==null){
this.datatable=this.data.getTable("_default");
if(this.datatable==null){
this.datatable=new nitobi.data.DataTable(this.getDataMode(),this.getPagingMode()==nitobi.grid.PAGINGMODE_LIVESCROLLING,{GridId:this.getID()},{GridId:this.getID()},this.isAutoKeyEnabled());
this.datatable.initialize("_default",this.getGetHandler(),this.getSaveHandler());
this.data.add(this.datatable);
}
this.connectToDataSet(this.data);
}
this.connected=true;
};
nitobi.grid.Grid.prototype.updateStructure=function(){
if(this.inferredColumns){
this.defineColumns(this.datatable);
}
this.mapColumns();
if(this.TopLeftRenderer){
this.defineColumnBindings();
this.defineColumnsFinalize();
}
};
nitobi.grid.Grid.prototype.mapColumns=function(){
this.fieldMap=this.datatable.fieldMap;
};
nitobi.grid.Grid.prototype.configureDefaults=function(){
this.initializeModel();
this.displayedFirstRow=0;
this.displayedRowCount=0;
this.scrollVerticalPercent=0;
this.scrollHorizontalPercent=0;
this.localFilter=null;
this.columns=[];
this.fieldMap={};
this.frameRendered=false;
this.connected=false;
this.inferredColumns=true;
this.selectedRows=[];
this.minHeight=20;
this.minWidth=20;
this.setRowCount(0);
this.layoutValid=false;
this.oldVersion=false;
this.frameCssXslProc=nitobi.xml.createXslProcessor(nitobi.grid.frameCssXslProc.stylesheet);
this.rowXslGeneratorXslProc=nitobi.xml.createXslProcessor(nitobi.grid.rowGeneratorXslProc.stylesheet);
this.frameXslProc=nitobi.xml.createXslProcessor(nitobi.grid.frameXslProc.stylesheet);
this.CellHoverColor=nitobi.html.getClassStyle("ntb-grid-cellhover","backgroundColor")||"#C0C0FF";
this.RowHoverColor=nitobi.html.getClassStyle("ntb-grid-rowhover","backgroundColor")||"#FFFFC0";
this.CellActiveColor=nitobi.html.getClassStyle("ntb-grid-cellactive","backgroundColor")||"#F0C0FF";
this.RowActiveColor=nitobi.html.getClassStyle("ntb-grid-rowactive","backgroundColor")||"#FFC0FF";
this.CellSelectColor=nitobi.html.getClassStyle("ntb-grid-cellselect","backgroundColor")||"#F0C000";
this.RowSelectColor=nitobi.html.getClassStyle("ntb-grid-rowselect","backgroundColor")||"#FF00FF";
var _64=0;
var _65=0;
var _66=nitobi.html.getClass("ntbgrid");
if(_66!=null){
if(_66.borderTopWidth!=null){
_65+=nitobi.lang.parseNumber(_66.borderTopWidth);
}
if(_66.borderLeftWidth!=null){
_64+=nitobi.lang.parseNumber(_66.borderLeftWidth);
}
}
nitobi.form.EDITOR_OFFSETX=_64;
nitobi.form.EDITOR_OFFSETY=_65;
};
nitobi.grid.Grid.prototype.attachDomEvents=function(){
var _67=nitobi.html.getFirstChild(this.UiContainer);
this.events=[{"type":"contextmenu","handler":this.handleContextMenu},{"type":"mousedown","handler":this.handleMouseDown},{"type":"mouseup","handler":this.handleMouseUp},{"type":"mousemove","handler":this.handleMouseMove},{"type":"mouseout","handler":this.handleMouseOut},{"type":"mouseover","handler":this.handleMouseOver}];
if(nitobi.browser.IE){
this.keyNav=$("grid"+this.uid);
}else{
this.keyNav=$("ntb-grid-keynav"+this.uid);
}
this.keyEvents=[{"type":"keydown","handler":this.handleKey},{"type":"keyup","handler":this.handleKeyUp},{"type":"keypress","handler":this.handleKeyPress}];
nitobi.html.attachEvents(this.keyNav,this.keyEvents,this,false);
if(nitobi.browser.MOZ){
nitobi.html.attachEvent($("vscrollclip"+this.uid),"mousedown",this.focus,this);
nitobi.html.attachEvent($("hscrollclip"+this.uid),"mousedown",this.focus,this);
this.events.push({"type":"DOMMouseScroll","handler":this.handleMouseWheel});
}else{
if(nitobi.browser.IE){
this.events.push({"type":"mousewheel","handler":this.handleMouseWheel});
}
}
nitobi.html.attachEvents(_67,this.events,this,false);
_67.onselectstart=function(){
return false;
};
};
nitobi.grid.Grid.prototype.hoverCell=function(_68){
if(this.hovered){
this.hovered.style.backgroundColor=this.hoveredbg;
}
if(_68==this.activeCell||_68==null){
return;
}
this.hoveredbg=_68.style.backgroundColor;
this.hovered=_68;
_68.style.backgroundColor=this.CellHoverColor;
};
nitobi.grid.Grid.prototype.hoverView=function(row){
this.rowhoveredbg=row.style.backgroundColor;
this.rowhovered=row;
row.style.backgroundColor=this.RowHoverColor;
};
nitobi.grid.Grid.prototype.hoverRow=function(row){
if(!this.isRowHighlightEnabled()){
return;
}
if(this.leftrowhovered&&this.leftrowhovered!=this.leftActiveRow){
this.leftrowhovered.style.backgroundColor=this.leftrowhoveredbg;
}
if(this.midrowhovered&&this.midrowhovered!=this.midActiveRow){
this.midrowhovered.style.backgroundColor=this.midrowhoveredbg;
}
if(row==this.activeRow||row==null){
return;
}
var _6b=-1;
var _6c=nitobi.html.getFirstChild(row);
var _6d=nitobi.grid.Row.getRowNumber(row);
var _6e=nitobi.grid.Row.getRowElements(this,_6d);
if(_6e.left!=null&&_6e.left!=this.leftActiveRow){
this.leftrowhoveredbg=_6e.left.style.backgroundColor;
this.leftrowhovered=_6e.left;
_6e.left.style.backgroundColor=this.RowHoverColor;
}
if(_6e.mid!=null&&_6e.mid!=this.midActiveRow){
this.midrowhoveredbg=_6e.mid.style.backgroundColor;
this.midrowhovered=_6e.mid;
_6e.mid.style.backgroundColor=this.RowHoverColor;
}
};
nitobi.grid.Grid.prototype.clearHover=function(){
this.hoverCell();
this.hoverRow();
};
nitobi.grid.Grid.prototype.handleMouseOver=function(evt){
this.fire("MouseOver",evt);
};
nitobi.grid.Grid.prototype.handleMouseOut=function(evt){
this.clearHover();
this.fire("MouseOut",evt);
};
nitobi.grid.Grid.prototype.handleMouseDown=function(evt){
if(this.isGridResizeEnabled()){
this.gridResizer.startResize(this,evt);
}
var _72=this.findActiveCell(evt.srcElement);
if(_72==null){
return;
}
var _73=_72.getAttribute("ebatype");
if(_73=="columnheader"){
this.handleHeaderMouseDown(_72,evt.button,evt.clientX,evt.clientY,evt);
}
if(_73=="cell"){
this.handleCellMouseDown(_72,evt.button,evt.clientX,evt.clientY,evt);
}
};
nitobi.grid.Grid.prototype.handleHeaderMouseDown=function(_74,_75,x,y,evt){
var _79=0;
if(nitobi.browser.MOZ){
_79=this.Scroller.scrollLeft;
}
var _7a=_74.getBoundingClientRect().right-_79;
var _7b=nitobi.grid.Cell.getColumnNumber(_74);
if((x<_7a&&x>_7a-10)){
this.columnResizer.startResize(this,this.getColumnObject(_7b),_74,evt);
return false;
}else{
this.headerClicked(_7b);
this.fire("HeaderDown",_7b);
}
};
nitobi.grid.Grid.prototype.handleCellMouseDown=function(_7c,_7d,x,y,evt){
if(!evt.shiftKey){
var _81=this.getSelectedColumnObject();
var _82=new nitobi.grid.OnCellClickEventArgs(this,this.getSelectedCellObject());
if(!this.fire("BeforeCellClick",_82)||(!!_81&&!nitobi.event.evaluate(_81.getOnBeforeCellClickEvent(),_82))){
return;
}
this.setActiveCell(_7c,evt.ctrlKey);
this.Selection.selecting=true;
var _81=this.getSelectedColumnObject();
var _82=new nitobi.grid.OnCellClickEventArgs(this,this.getSelectedCellObject());
this.fire("CellClick",_82);
if(!!_81){
nitobi.event.evaluate(_81.getOnCellClickEvent(),_82);
}
}
};
nitobi.grid.Grid.prototype.handleMouseUp=function(_83){
var _84=this.findActiveCell(_83.srcElement);
if(!_84){
return;
}
if(_84.getAttribute("ebatype")=="columnheader"){
var _85=parseInt(_84.getAttribute("xi"));
this.fire("HeaderUp",_85);
}
};
nitobi.grid.Grid.prototype.handleMouseMove=function(evt){
var _87=this.findActiveCell(evt.srcElement);
if(_87!=null){
var _88=_87.getAttribute("ebatype");
var __x=evt.clientX;
var __y=evt.clientY;
if(_88=="columnheader"){
this.handleHeaderMouseMove(_87,evt.button,__x,__y);
}else{
if(_88=="cell"){
this.handleCellMouseMove(_87,evt.button,__x,__y);
}
}
}else{
var _8b=nitobi.html.getFirstChild(this.UiContainer);
var x=evt.clientX;
var y=evt.clientY;
var _8e=0;
var _8f=0;
if(nitobi.browser.MOZ){
var _90=this.Scroller;
_8e=_90.scrollLeft;
_8f=_90.scrollTop;
}
if(this.isGridResizeEnabled()){
var _91=nitobi.html.getBox(_8b);
if((x<(_91.right-_8e)&&x>(_91.right-_8e)-20)&&(y<(_91.bottom)&&y>(_91.bottom)-20)){
_8b.style.cursor="nw-resize";
}else{
_8b.style.cursor="auto";
}
}
}
this.fire("MouseMove",evt);
nitobi.html.cancelEvent(evt);
return false;
};
nitobi.grid.Grid.prototype.handleHeaderMouseMove=function(_92,_93,x,y){
var _96=_92.getBoundingClientRect(0,(nitobi.grid.Cell.getColumnNumber(_92)>this.getFrozenLeftColumnCount()?this.Scroller.scrollLeft:0));
if((x<_96.right&&x>_96.right-10)){
_92.style.cursor="w-resize";
}else{
(nitobi.browser.IE?_92.style.cursor="hand":_92.style.cursor="pointer");
}
};
nitobi.grid.Grid.prototype.handleHeaderMouseOver=function(_97){
var _98=_97.getAttribute("col");
var col=this.getColumnObject(_98);
var _9a=col.getSortDirection();
nitobi.html.Css.addClass(_97,_97.className.split(" ")[0]+"hover");
};
nitobi.grid.Grid.prototype.handleHeaderMouseOut=function(_9b){
var _9c=_9b.getAttribute("col");
var col=this.getColumnObject(_9c);
var _9e=col.getSortDirection();
_9b.className=_9b.className.split(" ")[0];
};
nitobi.grid.Grid.prototype.handleCellMouseMove=function(_9f,_a0,x,y){
if(this.Selection.selecting){
if(_a0==1||(_a0==0&&!nitobi.browser.IE)){
this.Selection.redraw(_9f);
this.ensureCellInView(_9f);
}else{
this.Selection.selecting=false;
}
}else{
this.hoverCell(_9f);
this.hoverRow(_9f.parentNode);
}
};
nitobi.grid.Grid.prototype.handleMouseWheel=function(_a3){
var _a4=0;
if(_a3.wheelDelta){
_a4=_a3.wheelDelta/120;
}else{
if(_a3.detail){
_a4=-_a3.detail/3;
}
}
this.scrollVerticalRelative(-20*_a4);
nitobi.html.cancelEvent(_a3);
};
nitobi.grid.Grid.prototype.setActiveCell=function(_a5,_a6){
if(!_a5){
return;
}
var _a7=this.getSelectedColumnObject();
var _a8=new nitobi.grid.OnCellBlurEventArgs(this,this.getSelectedCellObject());
if(!!_a7){
if(!this.fire("CellBlur",_a8)||!nitobi.event.evaluate(_a7.getOnCellBlurEvent(),_a8)){
return;
}
}
this.oldCell=this.activeCell;
this.activeCell=_a5;
var row=_a5.parentNode;
this.setActiveRow(row,_a6);
this.Selection.collapse(this.activeCell);
this.ensureCellInView(this.activeCell);
this.focus();
_a7=this.getSelectedColumnObject();
var _aa=new nitobi.grid.OnCellFocusEventArgs(this,this.getSelectedCellObject());
this.fire("CellFocus",_aa);
if(!!_a7){
nitobi.event.evaluate(_a7.getOnCellFocusEvent(),_aa);
}
};
nitobi.grid.Grid.prototype.getRowNodes=function(row){
return nitobi.grid.Row.getRowElements(this,nitobi.grid.Row.getRowNumber(row));
};
nitobi.grid.Grid.prototype.setActiveRow=function(row,_ad){
if(!this.isRowSelectEnabled()){
return;
}
var _ae=nitobi.grid.Row.getRowNumber(row);
var _af=-1;
if(this.selectedRows[0]!=null){
_af=nitobi.grid.Row.getRowNumber(this.selectedRows[0]);
}
if(!_ad||!this.isMultiRowSelectEnabled()){
if(_ae!=_af&&_af!=-1){
var _b0=new nitobi.grid.OnRowBlurEventArgs(this,row);
if(!this.fire("RowBlur",_b0)||!nitobi.event.evaluate(this.getOnRowBlurEvent(),_b0)){
return;
}
}
this.clearActiveRows();
}
var _b1=nitobi.grid.Row.getRowElements(this,_ae);
this.midActiveRow=_b1.mid;
this.leftActiveRow=_b1.left;
if(row.getAttribute("select")=="1"){
this.clearActiveRow(row);
}else{
this.selectedRows.push(row);
if(this.leftActiveRow!=null){
this.leftActiveRow.setAttribute("select","1");
this.applyRowStyle(this.leftActiveRow);
}
if(this.midActiveRow!=null){
this.midActiveRow.setAttribute("select","1");
this.applyRowStyle(this.midActiveRow);
}
if(_ae!=_af){
var _b2=new nitobi.grid.OnRowFocusEventArgs(this,row);
this.fire("RowFocus",_b2);
nitobi.event.evaluate(this.getOnRowFocusEvent(),_b2);
}
}
};
nitobi.grid.Grid.prototype.getSelectedRows=function(){
return this.selectedRows;
};
nitobi.grid.Grid.prototype.clearActiveRows=function(){
for(var i=0;i<this.selectedRows.length;i++){
var row=this.selectedRows[i];
this.clearActiveRow(row);
}
this.selectedRows=[];
};
nitobi.grid.Grid.prototype.selectAllRows=function(){
this.clearActiveRows();
for(var i=0;i<this.getDisplayedRowCount();i++){
var _b6=this.getCellElement(i,0);
if(_b6!=null){
var row=_b6.parentNode;
this.setActiveRow(row,true);
}
}
return this.selectedRows;
};
nitobi.grid.Grid.prototype.clearActiveRow=function(row){
var _b9=nitobi.grid.Row.getRowNumber(row);
var _ba=nitobi.grid.Row.getRowElements(this,_b9);
if(_ba.left!=null){
_ba.left.removeAttribute("select");
this.removeRowStyle(_ba.left);
}
if(_ba.mid!=null){
_ba.mid.removeAttribute("select");
this.removeRowStyle(_ba.mid);
}
};
nitobi.grid.Grid.prototype.applyCellStyle=function(_bb){
if(_bb==null){
return;
}
_bb.style.background=this.CellActiveColor;
};
nitobi.grid.Grid.prototype.removeCellStyle=function(_bc){
if(_bc==null){
return;
}
_bc.style.background="";
};
nitobi.grid.Grid.prototype.applyRowStyle=function(row){
if(row==null){
return;
}
row.style.background=this.RowActiveColor;
};
nitobi.grid.Grid.prototype.removeRowStyle=function(row){
if(row==null){
return;
}
row.style.background="";
};
nitobi.grid.Grid.prototype.findActiveCell=function(_bf){
var _c0=5;
_bf==null;
for(var i=0;i<_c0&&_bf.getAttribute;i++){
var t=_bf.getAttribute("ebatype");
if(t=="cell"||t=="columnheader"){
return _bf;
}
_bf=_bf.parentNode;
}
return null;
};
nitobi.grid.Grid.prototype.attachToParentDomElement=function(_c3){
this.UiContainer=_c3;
this.fire("AttachToParent");
};
nitobi.grid.Grid.prototype.getToolbars=function(){
return this.toolbars;
};
nitobi.grid.Grid.prototype.adjustHorizontalScrollBars=function(){
var _c4=this.calculateWidth();
if((_c4<=parseInt(this.getWidth()))){
var _c5=this.hScrollbar.element.parentNode;
_c5.style.display="none";
}else{
var _c5=this.hScrollbar.element.parentNode;
_c5.style.display="block";
this.resizeScroller();
var _c6=this.Scroller.width/this.calculateWidth();
this.hScrollbar.setRange(_c6);
}
};
nitobi.grid.Grid.prototype.createChildren=function(){
if(this.UiContainer!=null&&nitobi.html.getFirstChild(this.UiContainer)==null){
this.renderFrame();
}
this.generateFrameCss();
this.loadingScreen=new nitobi.grid.LoadingScreen(this);
this.subscribe("Preinitialize",nitobi.lang.close(this.loadingScreen,this.loadingScreen.show));
this.subscribe("HtmlReady",nitobi.lang.close(this.loadingScreen,this.loadingScreen.hide));
this.subscribe("AfterGridResize",nitobi.lang.close(this.loadingScreen,this.loadingScreen.resize));
this.loadingScreen.initialize();
this.loadingScreen.attachToElement($("ntb-grid-overlay"+this.uid));
this.loadingScreen.show();
this.columnResizer=new nitobi.grid.ColumnResizer(this);
this.gridResizer=new nitobi.grid.GridResizer(this);
this.Scroller=new nitobi.grid.Scroller3x3(this,this.getWidth(),this.getHeight(),this.gettop(),this.getright(),this.getbottom(),this.getleft(),this.getcontentWidth(),this.getcontentHeight(),this.getDisplayedRowCount(),this.getColumnCount(),this.getfreezetop(),this.getFrozenLeftColumnCount(),this.getfreezebottom(),this.getfreezeright());
this.Scroller.setRowHeight(this.getRowHeight());
this.Scroller.setHeaderHeight(this.getHeaderHeight());
this.Scroller.onHtmlReady.subscribe(this.handleHtmlReady,this);
this.subscribe("TableConnected",nitobi.lang.close(this.Scroller,this.Scroller.setDataTable));
this.Scroller.setDataTable(this.datatable);
this.Selection=new nitobi.grid.Selection(this);
this.Selection.setRowHeight(this.getRowHeight());
this.createRenderers();
var sv=this.Scroller.view;
sv.midleft.rowRenderer=this.MidLeftRenderer;
sv.midcenter.rowRenderer=this.MidCenterRenderer;
this.mapToHtml();
var vs=$("vscroll"+this.uid);
var hs=$("hscroll"+this.uid);
this.vScrollbar=new nitobi.ui.VerticalScrollbar();
this.vScrollbar.attachToParent(this.element,vs);
this.vScrollbar.subscribe("ScrollByUser",nitobi.lang.close(this,this.scrollVertical));
this.subscribe("PercentHeightChanged",nitobi.lang.close(this.vScrollbar,this.vScrollbar.setRange));
this.subscribe("ScrollVertical",nitobi.lang.close(this.vScrollbar,this.vScrollbar.setScrollPercent));
this.setscrollbarWidth(this.vScrollbar.getWidth());
this.hScrollbar=new nitobi.ui.HorizontalScrollbar();
this.hScrollbar.attachToParent(this.element,hs);
this.hScrollbar.subscribe("ScrollByUser",nitobi.lang.close(this,this.scrollHorizontal));
this.subscribe("PercentWidthChanged",nitobi.lang.close(this.hScrollbar,this.hScrollbar.setRange));
this.subscribe("ScrollHorizontal",nitobi.lang.close(this.hScrollbar,this.hScrollbar.setScrollPercent));
this.setscrollbarHeight(this.hScrollbar.getHeight());
};
nitobi.grid.Grid.prototype.createToolbars=function(_ca){
this.toolbars=new nitobi.ui.Toolbars((this.isToolbarEnabled()?_ca:0));
var _cb=document.getElementById("toolbarContainer"+this.uid);
this.toolbars.setWidth(this.getWidth());
this.toolbars.setRowInsertEnabled(this.isRowInsertEnabled());
this.toolbars.setRowDeleteEnabled(this.isRowDeleteEnabled());
this.toolbars.attachToParent(_cb);
this.setToolbarContainerEmpty(false);
this.toolbars.subscribe("ToolbarsContainerNotEmpty",this.toolbarsContainerNotEmpty,this);
this.toolbars.subscribe("ToolbarsContainerEmpty",this.toolbarsContainerEmpty,this);
this.toolbars.subscribe("InsertRow",nitobi.lang.close(this,this.insertAfterCurrentRow));
this.toolbars.subscribe("DeleteRow",nitobi.lang.close(this,this.deleteCurrentRow));
this.toolbars.subscribe("Save",nitobi.lang.close(this,this.save));
this.toolbars.subscribe("Refresh",nitobi.lang.close(this,this.refresh));
this.subscribe("AfterGridResize",nitobi.lang.close(this,this.resizeToolbars));
};
nitobi.grid.Grid.prototype.resizeToolbars=function(){
this.toolbars.setWidth(this.getWidth());
this.toolbars.resize();
};
nitobi.grid.Grid.prototype.toolbarsContainerEmpty=function(){
this.setToolbarContainerEmpty(true);
this.generateCss();
this.resizeScroller();
};
nitobi.grid.Grid.prototype.toolbarsContainerNotEmpty=function(){
this.setToolbarContainerEmpty(false);
this.generateCss();
this.resizeScroller();
};
nitobi.grid.Grid.prototype.scrollVerticalRelative=function(_cc){
var _cd=this.getScrollSurface();
var st=_cd.scrollTop+_cc;
var MC=this.Scroller.view.midcenter;
percent=st/(MC.container.offsetHeight-MC.element.offsetHeight);
this.scrollVertical(percent);
};
nitobi.grid.Grid.prototype.scrollVertical=function(_d0){
this.clearHover();
var _d1=this.scrollVerticalPercent;
this.scrollVerticalPercent=_d0;
this.Scroller.setScrollTopPercent(_d0);
this.fire("ScrollVertical",_d0);
if(_d0>0.99&&_d1<0.99){
this.fire("ScrollHitBottom",_d0);
}
if(_d0<0.01){
this.fire("ScrollHitTop",_d0);
}
};
nitobi.grid.Grid.prototype.scrollHorizontalRelative=function(_d2){
var _d3=this.getScrollSurface();
var sl=_d3.scrollLeft+_d2;
var MC=this.Scroller.view.midcenter;
percent=sl/(MC.container.offsetWidth-MC.element.offsetWidth);
this.scrollHorizontal(percent);
};
nitobi.grid.Grid.prototype.scrollHorizontal=function(_d6){
this.clearHover();
this.scrollHorizontalPercent=_d6;
this.Scroller.setScrollLeftPercent(_d6);
this.fire("ScrollHorizontal",_d6);
if(_d6>0.99){
this.fire("ScrollHitRight",_d6);
}
if(_d6<0.01){
this.fire("ScrollHitLeft",_d6);
}
};
nitobi.grid.Grid.prototype.getScrollSurface=function(){
if(this.Scroller!=null){
return this.Scroller.view.midcenter.element;
}
};
nitobi.grid.Grid.prototype.getActiveView=function(){
return this.Scroller.getViewportByCoords(nitobi.grid.Cell.getRowNumber(this.activeCell),nitobi.grid.Cell.getColumnNumber(this.activeCell));
};
nitobi.grid.Grid.prototype.ensureCellInView=function(_d7){
var SS=this.getScrollSurface();
var AC=_d7||this.activeCell;
if(AC==null){
return;
}
var sct=0;
var scl=0;
if(nitobi.browser.MOZ){
sct=SS.scrollTop;
scl=SS.scrollLeft;
}
var R1=AC.getClientRects()[0];
var R2=SS.getClientRects()[0];
var B=EBA_SELECTION_BUFFER||0;
var up=R1.top-R2.top-B-sct;
var _e0=R1.bottom-R2.bottom+B-sct;
var _e1=R1.left-R2.left-B-scl;
var _e2=R1.right-R2.right+B-scl;
if(up<0){
this.scrollVerticalRelative(up);
}
if(_e0>0){
this.scrollVerticalRelative(_e0);
}
if(nitobi.grid.Cell.getColumnNumber(AC)>this.getFrozenLeftColumnCount()-1){
if(_e1<0){
this.scrollHorizontalRelative(_e1);
}
if(_e2>0){
this.scrollHorizontalRelative(_e2);
}
}
this.fire("CellCoordsChanged",R1[0]);
};
nitobi.grid.Grid.prototype.invalidate=function(){
this.invalidateProperties();
this.invalidateSize();
this.invalidateDisplayList();
};
nitobi.grid.Grid.prototype.validationFirstPass=function(){
};
nitobi.grid.Grid.prototype.commitFrameProperties=function(){
};
nitobi.grid.Grid.prototype.commitColumnProperties=function(){
};
nitobi.grid.Grid.prototype.commitDataProperties=function(){
};
nitobi.grid.Grid.prototype.updateCellRanges=function(){
if(this.frameRendered){
var _e3=this.getRowCount();
this.Scroller.updateCellRanges(this.getColumnCount(),_e3,this.getFrozenLeftColumnCount(),this.getfreezetop(),this.getfreezeright(),this.getfreezebottom());
var h=this.calculateHeight();
var w=this.calculateWidth();
this.measure();
this.resizeScroller();
var _e6=this.Scroller.height/h;
var _e7=this.Scroller.width/w;
this.fire("PercentHeightChanged",_e6);
this.fire("PercentWidthChanged",_e7);
}
};
nitobi.grid.Grid.prototype.measure=function(){
this.measureViews();
this.sizeValid=true;
};
nitobi.grid.Grid.prototype.measureViews=function(){
this.measureRows();
this.measureColumns();
};
nitobi.grid.Grid.prototype.measureColumns=function(){
var fL=this.getFrozenLeftColumnCount();
var fR=this.getfreezeright();
var wL=0;
var wR=0;
var wT=0;
var _ed=this.getColumnDefinitions();
var _ee=_ed.length;
for(var i=0;i<_ee;i++){
if(_ed[i].getAttribute("Visible")=="1"||_ed[i].getAttribute("visible")=="1"){
var w=Number(_ed[i].getAttribute("Width"));
wT+=w;
if(i<fL){
wL+=w;
}
if(i>=_ee-fR){
wR+=w;
}
}
}
this.setcontentWidth(wT);
this.setleft(wL);
this.setright(wR);
};
nitobi.grid.Grid.prototype.measureRows=function(){
var _f1=this.isColumnIndicatorsEnabled()?this.getHeaderHeight():0;
this.setcontentHeight((this.calculateHeight())+_f1);
this.settop(this.calculateHeight(0,this.getfreezetop()-1)+_f1);
this.setbottom(0);
};
nitobi.grid.Grid.prototype.resizeScroller=function(){
var _f2=(this.getToolbars()!=null&&this.getToolbars().areAnyToolbarsDocked()?25:0);
var _f3=this.isColumnIndicatorsEnabled()?this.getHeaderHeight():0;
this.Scroller.resize(this.getWidth(),this.getHeight()-_f2-_f3,this.gettop(),this.getright(),this.getbottom(),this.getleft(),this.getcontentWidth(),this.getcontentHeight(),this.getDisplayedRowCount(),this.getColumnCount(),this.getfreezetop(),this.getFrozenLeftColumnCount(),this.getfreezebottom(),this.getfreezeright());
};
nitobi.grid.Grid.prototype.resize=function(_f4,_f5){
this.setWidth(_f4);
this.setHeight(_f5);
this.generateCss();
this.fire("AfterGridResize");
};
nitobi.grid.Grid.prototype.initializeModel=function(){
this.model=nitobi.xml.createXmlDoc(nitobi.xml.serialize(nitobi.grid.modelDoc));
var _f6=nitobi.html.getScrollBarWidth();
if(_f6){
this.setscrollbarWidth(_f6);
this.setscrollbarHeight(_f6);
}
var _f7=this.model.selectSingleNode("state/nitobi.grid.Columns");
if(_f7==null){
var _f7=this.model.createElement("nitobi.grid.Columns");
this.model.documentElement.appendChild(_f7);
}
var _f8=this.getColumnCount();
if(_f8>0){
this.defineColumns(_f8);
}else{
this.columnsDefined=false;
this.inferredColumns=true;
}
this.model.documentElement.setAttribute("ID",this.uid);
this.model.documentElement.setAttribute("uniqueID",this.uid);
};
nitobi.grid.Grid.prototype.clearDefaultData=function(_f9){
for(var i=0;i<_f9;i++){
var e=this.model.createElement("e");
e.setAttribute("xi",i+1);
xDec.appendChild(e);
}
};
nitobi.grid.Grid.prototype.createRenderers=function(){
var _fc=this.uid;
var _fd=this.getRowHeight();
this.TopLeftRenderer=new nitobi.grid.RowRenderer(this.data,null,_fd,null,null,_fc);
this.TopCenterRenderer=new nitobi.grid.RowRenderer(this.data,null,_fd,null,null,_fc);
this.MidLeftRenderer=new nitobi.grid.RowRenderer(this.data,null,_fd,null,null,_fc);
this.MidCenterRenderer=new nitobi.grid.RowRenderer(this.data,null,_fd,null,null,_fc);
};
nitobi.grid.Grid.prototype.bind=function(){
if(this.isBound()){
this.clear();
this.datatable.descriptor.reset();
}
};
nitobi.grid.Grid.prototype.dataBind=function(){
this.bind();
};
nitobi.grid.Grid.prototype.getDataSource=function(_fe){
var _ff=this.dataTableId||"_default";
if(_fe){
_ff=_fe;
}
return this.data.getTable(_ff);
};
nitobi.grid.Grid.prototype.getChangeLogXmlDoc=function(_100){
return this.getDataSource(_100).getChangeLogXmlDoc();
};
nitobi.grid.Grid.prototype.getComplete=function(_101){
if(null==_101.dataSource.xmlDoc){
ebaErrorReport("evtArgs.dataSource.xmlDoc is null or not defined. Likely the gethandler failed use fiddler to check the response","",EBA_ERROR);
this.fire("LoadingError");
return;
}
var _102=_101.dataSource.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+_101.dataSource.id+"']");
};
nitobi.grid.Grid.prototype.bindComplete=function(){
if(this.inferredColumns&&!this.columnsDefined){
this.defineColumns(this.datatable);
}
this.setRowCount(this.datatable.remoteRowCount);
this.setBound(true);
this.syncWithData();
};
nitobi.grid.Grid.prototype.syncWithData=function(_103){
if(this.isBound()){
this.Scroller.render(true);
this.fire("DataReady",{"source":this});
}
};
nitobi.grid.Grid.prototype.finalizeRowCount=function(rows){
this.rowCountKnown=true;
this.setRowCount(rows);
};
nitobi.grid.Grid.prototype.adjustRowCount=function(pct){
this.scrollVertical(pct);
};
nitobi.grid.Grid.prototype.setRowCount=function(rows){
this.xSET("RowCount",arguments);
if(this.getPagingMode()==nitobi.grid.PAGINGMODE_STANDARD){
if(this.getDataMode()==nitobi.data.DATAMODE_LOCAL){
this.setDisplayedRowCount(this.getRowsPerPage());
}
}else{
this.setDisplayedRowCount(rows);
}
this.rowCount=rows;
this.updateCellRanges();
};
nitobi.grid.Grid.prototype.getRowCount=function(){
return this.rowCount;
};
nitobi.grid.Grid.prototype.layout=function(_107){
if(this.prevHeight!=this.getHeight()){
this.prevHeight=this.getHeight();
this.prevWidth=this.getWidth();
this.layoutValid=false;
}
if(!this.layoutValid){
this.layoutFrame();
this.generateFrameCss();
this.layoutValid=true;
}
};
nitobi.grid.Grid.prototype.layoutFrame=function(_108){
this.minHeight=20;
this.minWidth=20;
var _109=false;
var _10a=false;
var tbH=this.getToolbarHeight();
var rowH=this.getRowHeight();
var colW=20;
var sbH=this.getscrollbarHeight();
var sbW=this.getscrollbarWidth();
var hdrH=this.getHeaderHeight();
tbH=this.getToolbars().areAnyToolbarsDocked()?tbH:0;
hdrH=this.isColumnIndicatorsEnabled?hdrH:0;
var minH=Math.max(this.minHeight,tbH+rowH+sbH+hdrH);
var maxH=this.Height;
var minW=Math.max(this.minWidth,colW+sbW);
var maxW=this.Width;
if(_109){
var _115=this.Scroller.minSurfaceWidth;
var _116=this.Scroller.maxSurfaceWidth;
}else{
var _115=this.Scroller.SurfaceWidth;
var _116=_115;
}
if(_10a){
var _117=this.Scroller.minSurfaceHeight;
var _118=this.Scroller.maxSurfaceHeight;
}else{
var _117=this.Scroller.SurfaceHeight;
var _118=_117;
}
var _119=_117+(tbH)+(hdrH);
var _11a=_115;
var _11b=(_119>maxH);
var _11c=(_11a>maxW);
var _11b=(_11c&&((_119+20)>maxH))||_11b;
var _11c=(_11b&&((_11a+20)>maxW))||_11c;
sbH=_11c?sbH:0;
sbV=_11b?sbV:0;
var vpH=_119-hdrH-tbH-sbH;
var vpW=_11a-sbW;
this.resize();
};
nitobi.grid.Grid.prototype.defineColumns=function(_11f){
this.fire("BeforeColumnsDefined");
this.resetColumns();
var _120=null;
var _121=nitobi.lang.typeOf(_11f);
this.inferredColumns=false;
if(_121=="string"){
_120=this.defineColumnsFromString(_11f);
}
if(_121==nitobi.lang.type.XMLNODE||_121==nitobi.lang.type.XMLDOC){
_120=this.defineColumnsFromXml(_11f);
}
if(_121==nitobi.lang.type.ARRAY){
_120=this.defineColumnsFromArray(_11f);
}
if(_121=="object"){
this.inferredColumns=true;
_120=this.defineColumnsFromData(_11f);
}
if(_121=="number"){
_120=this.defineColumnsCollection(_11f);
}
this.fire("AfterColumnsDefined");
this.defineColumnsFinalize();
return _120;
};
nitobi.grid.Grid.prototype.defineColumnsFromXml=function(_122){
if(_122==null||_122.childNodes.length==0){
return this.defineColumnsCollection(0);
}
if(_122.childNodes[0].nodeName==nitobi.xml.nsPrefix+"columndefinition"){
var _123=nitobi.xml.createXslDoc(nitobi.grid.declarationConverterXslProc.stylesheet);
_122=nitobi.xml.transformToXml(_122,_123);
}
var wL=0,wT=0,wR=0;
var _127=this.model.selectSingleNode("/state/Defaults/nitobi.grid.Column");
var _128=this.getColumnDefinitions().length;
var cols=_122.childNodes.length;
var xDec=this.model.selectSingleNode("state/nitobi.grid.Columns");
var _12b=_122.childNodes;
var fL=this.getFrozenLeftColumnCount();
var fR=this.getfreezeright();
if(_128==0){
var cols=_12b.length;
for(var i=0;i<cols;i++){
var e=_127.cloneNode(true);
this.setModelDefaults(e,_12b[i],"interfaces/interface[@name='nitobi.grid.Column']/properties/property");
this.setModelDefaults(e,_12b[i],"interfaces/interface[@name='nitobi.grid.Column']/events/event");
var _130="";
var _131=_12b[i].nodeName;
if(_131.indexOf("numbercolumn")!=-1){
_130="EBANumberColumn";
}else{
if(_131.indexOf("datecolumn")!=-1){
_130="EBADateColumn";
}else{
_130="EBATextColumn";
}
}
e.setAttribute("DataType",_130.replace("EBA","").replace("Column","").toLowerCase());
this.setModelDefaults(e,_12b[i],"interfaces/interface[@name='"+_130+"']/properties/property");
this.setModelDefaults(e,_12b[i],"interfaces/interface[@name='"+_130+"']/events/event");
this.defineColumnEditor(e,_12b[i]);
this.defineColumnDatasource(e);
this.defineColumnBinding(e);
xDec.appendChild(e);
var _132=e.getAttribute("GetHandler");
if(_132){
var _133=e.getAttribute("DatasourceId");
if(!_133||_133==""){
_133="columnDatasource_"+i+"_"+this.uid;
e.setAttribute("DatasourceId",_133);
}
var dt=new nitobi.data.DataTable("local",this.getPagingMode()==nitobi.grid.PAGINGMODE_LIVESCROLLING,{GridId:this.getID()},{GridId:this.getID()},this.isAutoKeyEnabled());
dt.initialize(_133,_132,null);
dt.async=false;
this.data.add(dt);
var _135=[];
_135[0]=e;
var _136=e.getAttribute("editor");
var _137=null;
var _138=null;
if(e.getAttribute("editor")=="LOOKUP"){
_137=0;
_138=1;
dt.async=true;
}
dt.get(_137,_138,this,nitobi.lang.close(this,this.editorDataReady,[e]),function(){
});
}
}
this.measureColumns();
this.setcontentHeight((this.calculateHeight())+Number(this.getHeaderHeight()));
this.setColumnCount(cols);
}
var _139;
_139=_122.selectSingleNode("/"+nitobi.xml.nsPrefix+"grid/"+nitobi.xml.nsPrefix+"datasources");
if(_139){
this.Declaration.datasources=nitobi.xml.createXmlDoc(_139.xml);
}
return xDec;
};
nitobi.grid.Grid.prototype.defineColumnsFinalize=function(){
this.setColumnsDefined(true);
if(this.connected){
if(this.frameRendered){
this.makeXSL();
this.generateColumnCss();
this.renderColumns();
}
}
};
nitobi.grid.Grid.prototype.defineColumnDatasource=function(_13a){
var val=_13a.getAttribute("Datasource");
if(val!=null){
var ds=new Array();
try{
ds=eval(val);
}
catch(e){
var _13d=val.split(",");
if(_13d.length>0){
for(var i=0;i<_13d.length;i++){
var item=_13d[i];
ds[i]={text:item.split(":")[0],display:item.split(":")[1]};
}
}
return;
}
if(typeof (ds)=="object"&&ds.length>0){
var _140=new nitobi.data.DataTable("unbound",this.getPagingMode()==nitobi.grid.PAGINGMODE_LIVESCROLLING,{GridId:this.getID()},{GridId:this.getID()},this.isAutoKeyEnabled());
var _141="columnDatasource"+new Date().getTime();
_140.initialize(_141);
_13a.setAttribute("DatasourceId",_141);
var _142="";
for(var item in ds[0]){
_142+=item+"|";
}
_142=_142.substring(0,_142.length-1);
_140.initializeColumns(_142);
for(var i=0;i<ds.length;i++){
_140.createRecord(null,i);
for(var item in ds[i]){
_140.updateRecord(i,item,ds[i][item]);
}
}
this.data.add(_140);
this.editorDataReady(_13a);
}
}
};
nitobi.grid.Grid.prototype.defineColumnEditor=function(_143,_144){
var len=_144.childNodes.length;
if(len>0){
var _146=_144.selectSingleNode("ntb:texteditor|ntb:numbereditor|ntb:textareaeditor|ntb:imageeditor|ntb:linkeditor|ntb:dateeditor|ntb:lookupeditor|ntb:listboxeditor|ntb:checkboxeditor|ntb:passwordeditor");
if(_146!=null){
var _147="EBATextEditor";
var _148=_146.nodeName;
if(_148.indexOf("numbereditor")!=-1){
_147="EBANumberEditor";
}else{
if(_148.indexOf("textareaeditor")!=-1){
_147="EBATextareaEditor";
}else{
if(_148.indexOf("imageeditor")!=-1){
_147="EBAImageEditor";
}else{
if(_148.indexOf("linkeditor")!=-1){
_147="EBALinkEditor";
}else{
if(_148.indexOf("dateeditor")!=-1){
_147="EBADateEditor";
}else{
if(_148.indexOf("lookupeditor")!=-1){
_147="EBALookupEditor";
}else{
if(_148.indexOf("listboxeditor")!=-1){
_147="EBAListboxEditor";
}else{
if(_148.indexOf("passwordeditor")!=-1){
_147="EBAPasswordEditor";
}else{
if(_148.indexOf("checkboxeditor")!=-1){
_147="EBACheckboxEditor";
}
}
}
}
}
}
}
}
}
this.setModelDefaults(_143,_146,"interfaces/interface[@name='"+_147+"']/properties/property");
this.setModelDefaults(_143,_146,"interfaces/interface[@name='"+_147+"']/events/event");
_143.setAttribute("type",_148.substring(4,_148.indexOf("editor")).toUpperCase());
_143.setAttribute("editor",_148.substring(4,_148.indexOf("editor")).toUpperCase());
}
}else{
var _149=_144;
var _147="";
var _148=_149.nodeName;
if(_148.indexOf("numbercolumn")){
_147="EBANumberEditor";
}else{
if(_149.nodeName.indexOf("dateeditor")){
_147="EBADateEditor";
}
}
this.setModelDefaults(_143,_149,"interfaces/interface[@name='"+_147+"']/properties/property");
this.setModelDefaults(_143,_149,"interfaces/interface[@name='"+_147+"']/events/event");
_143.setAttribute("type",_148.substring(4,_148.indexOf("column")).toUpperCase());
}
};
nitobi.grid.Grid.prototype.defineColumnsFromData=function(_14a){
if(_14a==null){
_14a=this.datatable;
}
var _14b=_14a.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasourcestructure");
if(_14b==null){
return this.defineColumnsCollection(0);
}
var _14c=_14b.getAttribute("FieldNames");
if(_14c.length==0){
return this.defineColumnsCollection(0);
}
var _14d=_14b.getAttribute("defaults");
var _14e=this.defineColumnsFromString(_14c);
for(var i=0;i<_14e.length;i++){
if(_14d&&i<_14d.length){
_14e[i].setAttribute("initial",_14d[i]||"");
}
_14e[i].setAttribute("width",100);
}
this.inferredColumns=true;
return _14e;
};
nitobi.grid.Grid.prototype.defineColumnsFromString=function(_150){
return this.defineColumnsFromArray(_150.split("|"));
};
nitobi.grid.Grid.prototype.defineColumnsFromArray=function(_151){
var cols=_151.length;
var _153=this.defineColumnsCollection(cols);
for(var i=0;i<cols;i++){
var col=_153[i];
if(typeof (_151[i])=="string"){
col.setAttribute("ColumnName",_151[i]);
col.setAttribute("xdatafld_orig",_151[i]);
col.setAttribute("DataField_orig",_151[i]);
col.setAttribute("Label",_151[i]);
if(typeof (this.fieldMap[_151[i]])!="undefined"){
col.setAttribute("xdatafld",this.fieldMap[_151[i]]);
col.setAttribute("DataField",this.fieldMap[_151[i]]);
}else{
col.setAttribute("xdatafld","unbound");
col.setAttribute("DataField","unbound");
}
}else{
if(_151[i].name!="_xk"){
col.setAttribute("ColumnName",col.name);
col.setAttribute("xdatafld_orig",col.name);
col.setAttribute("DataField_orig",col.name);
col.setAttribute("xdatafld",this.fieldMap[_151[i].name]);
col.setAttribute("DataField",this.fieldMap[_151[i].name]);
col.setAttribute("Width",col.width);
col.setAttribute("Label",col.label);
col.setAttribute("Initial",col.initial);
col.setAttribute("Mask",col.mask);
}
}
}
this.setColumnCount(cols);
return _153;
};
nitobi.grid.Grid.prototype.defineColumnBindings=function(){
var cols=this.getColumnDefinitions();
for(var i=0;i<cols.length;i++){
var e=cols[i];
this.defineColumnBinding(e);
e.setAttribute("xi",i);
}
};
nitobi.grid.Grid.prototype.defineColumnBinding=function(_159){
if(this.fieldMap==null){
return;
}
var _15a=_159.getAttribute("xdatafld");
var _15b=_159.getAttribute("xdatafld_orig");
if(_15b==null||_15b==""){
_159.setAttribute("xdatafld_orig",_15a);
_159.setAttribute("DataField_orig",_15a);
}
_15a=_159.getAttribute("xdatafld_orig");
_159.setAttribute("ColumnName",_15a);
if(typeof (this.fieldMap[_15a])!="undefined"){
_159.setAttribute("xdatafld",this.fieldMap[_15a]);
_159.setAttribute("DataField",this.fieldMap[_15a]);
}
this.formatBinding(_159,"CssStyle");
this.formatBinding(_159,"ClassName");
this.formatBinding(_159,"Value");
};
nitobi.grid.Grid.prototype.formatBinding=function(_15c,_15d){
var _15e=_15c.getAttribute(_15d);
var _15f=_15c.getAttribute(_15d+"_orig");
if(_15e==null||_15e==""){
return;
}
if(_15f==null||_15f==""){
_15c.setAttribute(_15d+"_orig",_15e);
}
_15e=_15c.getAttribute(_15d+"_orig");
var _160=_15e;
var re=new RegExp("\\{.[^}]*}","gi");
var _162=_15e.match(re);
if(_162==null){
return;
}
for(var i=0;i<_162.length;i++){
var _164=_162[i];
var _165=_164;
var _166=new RegExp("\\$.*?[^0-9a-zA-Z_]","gi");
var _167=_165.match(_166);
for(var j=0;j<_167.length;j++){
var _169=_167[j].substring(0,_167[j].length-1);
var _16a=_169.substring(1);
var _16b=this.fieldMap[_16a];
_165=_165.replace(_169,"<xsl:value-of select=\""+_16b+"\"/>"||"");
}
_165=_165.substring(1,_165.length-1);
_15e=_15e.replace(_164,_165).replace(/\{\}/g,"");
}
_15c.setAttribute(_15d,_15e);
};
nitobi.grid.Grid.prototype.defineColumnsCollection=function(cols){
var xDec=this.model.selectSingleNode("state/nitobi.grid.Columns");
var _16e=xDec.childNodes;
var _16f=this.model.selectSingleNode("/state/Defaults/nitobi.grid.Column");
for(var i=0;i<cols;i++){
var e=_16f.cloneNode(true);
xDec.appendChild(e);
e.setAttribute("xi",i);
e.setAttribute("title",(i>25?String.fromCharCode(Math.floor(i/26)+65):"")+(String.fromCharCode(i%26+65)));
}
this.setColumnCount(cols);
var _16e=xDec.selectNodes("*");
return _16e;
};
nitobi.grid.Grid.prototype.resetColumns=function(){
this.fire("BeforeClearColumns");
this.inferredColumns=true;
this.columnsDefined=false;
var _172=this.model.selectSingleNode("state/nitobi.grid.Columns");
var xDec=this.model.createElement("nitobi.grid.Columns");
if(_172==null){
this.model.documentElement.appendChild(xDec);
}else{
this.model.documentElement.replaceChild(xDec,_172);
}
this.setColumnCount(0);
this.fire("AfterClearColumns");
};
nitobi.grid.Grid.prototype.renderColumns=function(){
if(this.getColumnDefinitions().length>0){
this.clearHeader();
this.renderHeader();
}
};
nitobi.grid.Grid.prototype.initializeSelection=function(){
this.Selection=new nitobi.grid.Selection(this);
};
nitobi.grid.Grid.prototype.calculateHeight=function(_174,end){
_174=(_174!=null)?_174:0;
var _176=this.getDisplayedRowCount();
end=(end!=null)?end:_176-1;
return (end-_174+1)*(this.getRowHeight()||23);
};
nitobi.grid.Grid.prototype.calculateWidth=function(_177,end){
var _179=this.getColumnDefinitions();
var cols=_179.length;
_177=_177||0;
end=(end!=null)?Math.min(end,cols):cols;
var wT=0;
for(var i=_177;i<end;i++){
if(_179[i].getAttribute("Visible")=="1"||_179[i].getAttribute("visible")=="1"){
wT+=Number(_179[i].getAttribute("Width"));
}
}
return (wT);
};
nitobi.grid.Grid.prototype.editorDataReady=function(_17d){
var _17e=_17d.getAttribute("DisplayFields").split("|");
var _17f=_17d.getAttribute("ValueField");
var _180=this.data.getTable(_17d.getAttribute("DatasourceId"));
var _181=_17d.getAttribute("Initial");
if(_181==""){
var _182=_17d.getAttribute("type").toLowerCase();
switch(_182){
case "checkbox":
case "listbox":
var _183=_180.fieldMap[_17f].substring(1);
var data=_180.getDataXmlDoc();
if(data!=null){
var val=data.selectSingleNode("//"+nitobi.xml.nsPrefix+"e[@"+_183+"='"+_181+"']");
if(val==null){
var _186=data.selectSingleNode("//"+nitobi.xml.nsPrefix+"e");
if(_186!=null){
_181=_186.getAttribute(_183);
}
}
}
break;
}
_17d.setAttribute("Initial",_181);
}
if((_17e.length==1&&_17e[0]=="")&&(_17f==null||_17f=="")){
for(var item in _180.fieldMap){
_17e[0]=_180.fieldMap[item].substring(1);
break;
}
}else{
for(var i=0;i<_17e.length;i++){
_17e[i]=_180.fieldMap[_17e[i]].substring(1);
}
}
var _189=_17e.join("|");
if(_17f==null||_17f==""){
_17f=_17e[0];
}else{
_17f=_180.fieldMap[_17f].substring(1);
}
_17d.setAttribute("DisplayFields",_189);
_17d.setAttribute("ValueField",_17f);
};
nitobi.grid.Grid.prototype.headerClicked=function(_18a){
var _18b=this.getColumnObject(_18a);
var _18c=new nitobi.grid.OnHeaderClickEventArgs(this,_18b);
if(!this.fire("HeaderClick",_18c)||!nitobi.event.evaluate(_18b.getOnHeaderClickEvent(),_18c)){
return;
}
if(this.getSortEnabled()){
this.sort(_18a);
}
};
nitobi.grid.Grid.prototype.addFilter=function(){
this.dataTable.addFilter(arguments);
};
nitobi.grid.Grid.prototype.clearFilter=function(){
this.dataTable.clearFilter();
};
nitobi.grid.Grid.prototype.setSortStyle=function(_18d,_18e,_18f){
var _190=this.getColumnObject(_18d);
if(_18f){
this.sortColumn=null;
this.sortColumnCell=null;
this.Scroller.setSort(_18d,"");
this.setColumnHeaderSortOrder(_18d,"");
}else{
_190.setSortDirection(_18e);
this.setColumnHeaderSortOrder(_18d,_18e);
this.sortColumn=_190;
this.sortColumnCell=_190.getHeaderElement();
this.Scroller.setSort(_18d,_18e);
}
};
nitobi.grid.Grid.prototype.sort=function(_191,_192){
var _193=this.getColumnObject(_191);
if(_193==null||!_193.isSortEnabled()){
return;
}
var _194=new nitobi.grid.OnBeforeSortEventArgs(this,_193);
if(!this.fire("BeforeSort",_194)||!nitobi.event.evaluate(_193.getOnBeforeSortEvent(),_194)){
return;
}
this.startMouseWait();
if(_192==null||typeof (_192)=="undefined"){
_192=(_193.getSortDirection()=="Asc")?"Desc":"Asc";
}
this.setSortStyle(_191,_192);
var _195=_193.getColumnName();
var _196=_193.getDataType();
var _197=this.getSortMode()=="local"||(this.getDataMode()=="local"&&this.getSortMode()!="remote");
this.datatable.sort(_195,_192,_196,_197);
if(!_197){
this.datatable.flush();
}
this.clearSurfaces();
this.scrollVertical(0);
if(!_197){
this.loadDataPage(0);
}
this.stopMouseWait();
this.subscribeOnce("HtmlReady",this.handleAfterSort,this,[_193]);
};
nitobi.grid.Grid.prototype.handleAfterSort=function(_198){
var _199=new nitobi.grid.OnAfterSortEventArgs(this,_198);
this.fire("AfterSort",_199);
nitobi.event.evaluate(_198.getOnAfterSortEvent(),_199);
};
nitobi.grid.Grid.prototype.handleDblClick=function(evt){
var cell=new nitobi.grid.Cell(this,this.activeCell);
var _19c=new nitobi.grid.OnCellDblClickEventArgs(this,cell);
return this.fire("CellDblClick",_19c)&&nitobi.event.evaluate(cell.getColumnObject().getOnCellDblClickEvent(),_19c);
};
nitobi.grid.Grid.prototype.clearData=function(){
if(this.getDataMode()!="local"){
this.datatable.flush();
}
};
nitobi.grid.Grid.prototype.clearColumnHeaderSortOrder=function(){
if(this.sortColumn){
var _19d=this.sortColumn;
var _19e=_19d.getHeaderElement();
var css=_19e.className;
css=css.replace(/ascending/gi,"").replace(/descending/gi,"");
_19e.className=css;
this.sortColumn=null;
}
};
nitobi.grid.Grid.prototype.setColumnHeaderSortOrder=function(_1a0,_1a1){
this.clearColumnHeaderSortOrder();
var _1a2=this.getColumnObject(_1a0);
var _1a3=_1a2.getHeaderElement();
var CSS=nitobi.html.Css;
var css=_1a3.className;
if(_1a1==""){
_1a3.className="ntbcolumnindicatorborder";
_1a1="Desc";
}else{
var _1a6=(_1a1=="Desc"?"descending":"ascending");
nitobi.html.Css.swapClass(_1a3,"ntbcolumnindicatorborder","ntbcolumnindicatorborder"+_1a6);
nitobi.html.Css.removeClass(_1a3,"ntbcolumnindicatorborderhover");
}
_1a2.setSortDirection(_1a1);
this.sortColumn=_1a2;
this.sortColumnCell=_1a3;
};
nitobi.grid.Grid.prototype.startMouseWait=function(){
this.mouseWait=document.getElementById("ntbmousewait_"+this.uid);
if(this.mouseWait==null){
this.mouseWait=document.createElement("div");
this.mouseWait.id="ntbmousewait_"+this.uid;
this.mouseWait.className="ntbmousewait";
document.body.appendChild(this.mouseWait);
}
this.mouseWait.style.display="block";
if(nitobi.browser.IE){
nitobi.drawing.align(this.mouseWait,this.element,nitobi.drawing.align.SAMEHEIGHT|nitobi.drawing.align.SAMEWIDTH|nitobi.drawing.align.ALIGNTOP|nitobi.drawing.align.ALIGNLEFT);
}else{
this.mouseWait.style.height=(this.getHeight()+20)+"px";
this.mouseWait.style.width=this.getWidth()+"px";
this.mouseWait.style.top=(this.UiContainer.getBoundingClientRect().top-2)+"px";
this.mouseWait.style.left=this.UiContainer.getBoundingClientRect().left+"px";
}
};
nitobi.grid.Grid.prototype.stopMouseWait=function(){
if(this.mouseWait!=null&&typeof (this.mouseWait)!="undefined"){
this.mouseWait.style.top="-1000px";
this.mouseWait.style.left="-1000px";
this.mouseWait.style.display="none";
}
};
nitobi.grid.Grid.prototype.initializeState=function(){
};
nitobi.grid.Grid.prototype.mapToHtml=function(_1a7){
if(_1a7==null){
_1a7=this.UiContainer;
}
this.Scroller.mapToHtml(_1a7);
this.element=document.getElementById("grid"+this.uid);
this.element.jsObject=this;
};
nitobi.grid.Grid.prototype.initScroller=function(){
};
nitobi.grid.Grid.prototype.generateCss=function(){
this.generateFrameCss();
};
nitobi.grid.Grid.prototype.generateColumnCss=function(){
this.generateCss();
};
nitobi.grid.Grid.prototype.generateFrameCss=function(){
if(this.stylesheet==null){
this.stylesheet=document.createStyleSheet();
}
if(nitobi.browser.IE&&document.compatMode=="CSS1Compat"){
this.frameCssXslProc.addParameter("IE","true","");
}
var _1a8=nitobi.xml.transformToString(this.model,this.frameCssXslProc);
var vp=this.getScrollSurface();
var _1aa=0;
var _1ab=0;
if(vp!=null){
_1aa=vp.scrollTop;
_1ab=vp.scrollLeft;
}
if(this.oldFrameCss!=_1a8){
this.oldFrameCss=_1a8;
this.stylesheet.cssText=_1a8;
if(vp!=null){
if(nitobi.browser.MOZ){
this.scrollVerticalRelative(_1aa);
this.scrollHorizontalRelative(_1ab);
}
vp.style.top="0px";
vp.style.left="0px";
}
}
if(nitobi.grid.RowHoverColor==null){
var _1ac=nitobi.html.getClass("ntbrowhover");
if(_1ac!=null){
var _1ad=_1ac.backgroundColor.toString();
if(_1ad.indexOf("rgb")>-1){
_1ad=eval("nitobi.drawing."+_1ad);
}
nitobi.grid.RowHoverColor=_1ad;
}
}
if(nitobi.grid.CellHoverColor==null){
var _1ac=nitobi.html.getClass("ntbcellhover");
if(_1ac!=null){
var _1ad=_1ac.backgroundColor.toString();
if(_1ad.indexOf("rgb")>-1){
_1ad=eval("nitobi.drawing."+_1ad);
}
nitobi.grid.CellHoverColor=_1ad;
}
}
};
nitobi.grid.Grid.prototype.clearSurfaces=function(){
this.Selection.clearBoxes();
this.Scroller.clearSurfaces();
};
nitobi.grid.Grid.prototype.clearHeader=function(){
this.Scroller.clearSurfaces(false,true);
};
nitobi.grid.Grid.prototype.renderFrame=function(){
if(nitobi.browser.IE){
this.frameXslProc.addParameter("IE","true","");
}
this.UiContainer.innerHTML=nitobi.xml.transformToString(this.model,this.frameXslProc);
this.attachDomEvents();
if(nitobi.browser.MOZ){
var _1ae=nitobi.html.getCoords($("grid"+this.uid));
this.keyNav.style.left=_1ae.x+"px";
this.keyNav.style.top=_1ae.y+"px";
}
this.frameRendered=true;
this.fire("AfterFrameRender");
};
nitobi.grid.Grid.prototype.renderHeader=function(){
var _1af=0;
endRow=this.getfreezetop()-1;
var tl=this.Scroller.view.topleft;
tl.top=this.getHeaderHeight();
tl.left=0;
tl.rowRenderer=this.TopLeftRenderer;
tl.renderGap(_1af,endRow,false,"*");
var tc=this.Scroller.view.topcenter;
tc.top=this.getHeaderHeight();
tc.left=0;
tc.rowRenderer=this.TopCenterRenderer;
tc.renderGap(_1af,endRow,false);
};
nitobi.grid.Grid.prototype.renderMiddle=function(){
this.Scroller.view.midleft.flushCache();
this.Scroller.view.midcenter.flushCache();
};
nitobi.grid.Grid.prototype.refresh=function(){
var _1b2=null;
if(!this.fire("BeforeRefresh",_1b2)){
return;
}
this.clear();
this.syncWithData();
this.subscribeOnce("HtmlReady",this.handleAfterRefresh,this);
};
nitobi.grid.Grid.prototype.handleAfterRefresh=function(){
var _1b3=null;
this.fire("AfterRefresh",_1b3);
};
nitobi.grid.Grid.prototype.clear=function(){
this.selectedRows=[];
this.clearData();
this.clearSurfaces();
};
nitobi.grid.Grid.prototype.handleContextMenu=function(evt,obj){
var _1b6=this.getOnContextMenuEvent();
if(_1b6==null){
return true;
}else{
if(this.fire("ContextMenu")){
return true;
}else{
evt.cancelBubble=true;
evt.returnValue=false;
return false;
}
}
};
nitobi.grid.Grid.prototype.handleKeyPress=function(evt){
if(this.activeCell==null){
return;
}
var col=new nitobi.grid.Cell(this,this.activeCell).getColumnObject();
this.fire("KeyPress",evt);
nitobi.event.evaluate(col.getOnKeyPressEvent(),evt);
nitobi.html.cancelEvent(evt);
return false;
};
nitobi.grid.Grid.prototype.handleKeyUp=function(evt){
if(this.activeCell==null){
return;
}
var col=new nitobi.grid.Cell(this,this.activeCell).getColumnObject();
this.fire("KeyUp",evt);
nitobi.event.evaluate(col.getOnKeyUpEvent(),evt);
};
nitobi.grid.Grid.prototype.handleKey=function(evt,obj){
if(this.activeCell!=null){
var col=new nitobi.grid.Cell(this,this.activeCell).getColumnObject();
if(!this.fire("KeyDown",evt)||!nitobi.event.evaluate(col.getOnKeyDownEvent(),evt)){
return;
}
}
var k=evt.keyCode;
k=k+(evt.shiftKey?256:0)+(evt.ctrlKey?512:0);
switch(k){
case 529:
break;
case 35:
break;
case 36:
break;
case 547:
break;
case 548:
break;
case 34:
this.page(1);
break;
case 33:
this.page(-1);
break;
case 45:
this.insertAfterCurrentRow();
break;
case 46:
this.deleteCurrentRow();
break;
case 292:
this.selectHome();
break;
case 290:
this.pageSelect(1);
break;
case 289:
this.pageSelect(-1);
break;
case 296:
this.reselect(0,1);
break;
case 294:
this.reselect(0,-1);
break;
case 293:
this.reselect(-1,0);
break;
case 295:
this.reselect(1,0);
break;
case 577:
break;
case 579:
case 557:
this.copy(evt);
return true;
break;
case 600:
case 302:
break;
case 598:
case 301:
this.paste(evt);
return true;
break;
case 35:
break;
case 36:
break;
case 547:
break;
case 548:
break;
case 13:
var et=this.getEnterTab().toLowerCase();
var _1c0=0;
var vert=1;
if(et=="left"){
_1c0=-1;
vert=0;
}else{
if(et=="right"){
_1c0=1;
vert=0;
}else{
if(et=="down"){
_1c0=0;
vert=1;
}else{
if(et=="up"){
_1c0=0;
vert=-1;
}
}
}
}
this.move(_1c0,vert);
break;
case 40:
this.move(0,1);
break;
case 269:
case 38:
this.move(0,-1);
break;
case 265:
case 37:
this.move(-1,0);
break;
case 9:
case 39:
this.move(1,0);
break;
case 577:
break;
default:
this.edit(evt);
}
};
nitobi.grid.Grid.prototype.reselect=function(x,y){
var S=this.Selection;
var row=nitobi.grid.Cell.getRowNumber(S.endCell)+y;
var _1c6=nitobi.grid.Cell.getColumnNumber(S.endCell)+x;
if(_1c6>=0&&_1c6<this.columnCount()&&row>=0){
var _1c7=this.getCellElement(row,_1c6);
if(!_1c7){
return;
}
S.changeEndCellWithDomNode(_1c7);
S.alignBoxes();
this.ensureCellInView(_1c7);
}
};
nitobi.grid.Grid.prototype.pageSelect=function(dir){
};
nitobi.grid.Grid.prototype.selectHome=function(){
var S=this.Selection;
var row=nitobi.grid.Cell.getRowNumber(S.endCell);
this.reselect(0,-row);
};
nitobi.grid.Grid.prototype.edit=function(evt){
if(this.activeCell==null){
return;
}
var cell=new nitobi.grid.Cell(this,this.activeCell);
var _1cd=new nitobi.grid.OnBeforeCellEditEventArgs(this,cell);
if(!this.fire("BeforeCellEdit",_1cd)||!nitobi.event.evaluate(cell.getColumnObject().getOnBeforeCellEditEvent(),_1cd)){
return;
}
var _1ce=null;
var _1cf=null;
var ctrl=null;
if(evt){
_1ce=evt.keyCode||null;
_1cf=evt.shiftKey||null;
ctrl=evt.ctrlKey||null;
}
var _1d1="";
var _1d2=null;
if((_1cf&&(_1ce>64)&&(_1ce<91))||(!_1cf&&((_1ce>47)&&(_1ce<58)))){
_1d2=0;
}
if(!_1cf){
if((_1ce>64)&&(_1ce<91)){
_1d2=32;
}else{
if(_1ce>95&&_1ce<106){
_1d2=-48;
}else{
if((_1ce==189)||(_1ce==109)){
_1d1="-";
}else{
if((_1ce>186)&&(_1ce<188)){
_1d2=-126;
}
}
}
}
}else{
}
if(_1d2!=null){
_1d1=String.fromCharCode(_1ce+_1d2);
}
if((!ctrl)&&(""!=_1d1)||(_1ce==113)||(_1ce==0)||(_1ce==null)||(_1ce==32)){
this.cellEditor=nitobi.form.ControlFactory.instance.getEditor(this,cell.getColumnObject());
if(this.cellEditor==null){
return;
}
this.cellEditor.setEditCompleteHandler(this.editComplete);
this.cellEditor.bind(this,cell,_1d1);
this.cellEditor.mimic();
return false;
}else{
return;
}
};
nitobi.grid.Grid.prototype.editComplete=function(_1d3){
var cell=_1d3.cell;
var _1d5=cell.getColumnObject();
var _1d6=_1d3.databaseValue;
var _1d7=_1d3.displayValue;
var _1d8=new nitobi.grid.OnCellValidateEventArgs(this,cell,_1d6,cell.getValue());
if(!this.fire("CellValidate",_1d8)||!nitobi.event.evaluate(_1d5.getOnCellValidateEvent(),_1d8)){
return false;
}
cell.setValue(_1d6,_1d7);
_1d3.editor.hide();
var _1d9=new nitobi.grid.OnAfterCellEditEventArgs(this,cell);
this.fire("AfterCellEdit",_1d9);
nitobi.event.evaluate(_1d5.getOnAfterCellEditEvent(),_1d9);
this.focus();
};
nitobi.grid.Grid.prototype.autoSave=function(){
if(this.isAutoSaveEnabled()){
return this.save();
}
return false;
};
nitobi.grid.Grid.prototype.selectCellByCoords=function(row,_1db){
this.setPosition(row,_1db);
};
nitobi.grid.Grid.prototype.setPosition=function(row,_1dd){
if(row>=0&&_1dd>=0){
this.setActiveCell(this.getCellElement(row,_1dd));
}
};
nitobi.grid.Grid.prototype.save=function(){
if(this.datatable.log.selectNodes("//"+nitobi.xml.nsPrefix+"data/*").length==0){
return;
}
if(!this.fire("BeforeSave")){
return;
}
this.datatable.save(nitobi.lang.close(this,this.saveCompleteHandler),this.getOnBeforeSaveEvent());
};
nitobi.grid.Grid.prototype.saveCompleteHandler=function(_1de){
if(this.getDataSource().getHandlerError()){
this.fire("HandlerError",_1de);
}
this.fire("AfterSave",_1de);
};
nitobi.grid.Grid.prototype.focus=function(){
try{
this.keyNav.focus();
this.fire("Focus");
nitobi.html.cancelEvent(nitobi.html.Event);
return false;
}
catch(e){
}
};
nitobi.grid.Grid.prototype.getRendererForColumn=function(col){
var _1e0=this.getColumnCount();
if(col>=_1e0){
col=_1e0-1;
}
var _1e1=this.getFrozenLeftColumnCount();
if(col<frozenLeft){
return this.MidLeftRenderer;
}else{
return this.MidCenterRenderer;
}
};
nitobi.grid.Grid.prototype.getColumnOuterTemplate=function(col){
return this.getRendererForColumn(col).xmlTemplate.selectSingleNode("//*[@match='ntb:e']/div/div["+col+"]");
};
nitobi.grid.Grid.prototype.getColumnInnerTemplate=function(col){
return this.getColumnOuterXslTemplate(col).selectSingleNode("*[2]");
};
nitobi.grid.Grid.prototype.makeXSL=function(){
var fL=this.getFrozenLeftColumnCount();
var fR=this.getfreezeright();
var cs=this.getColumnCount();
var rh=this.isRowHighlightEnabled();
var _1e8="_default";
if(this.datatable!=null){
_1e8=this.datatable.id;
}
var _1e9=0;
var _1ea=fL;
var sXml=nitobi.xml.serialize(this.model.selectSingleNode("state/nitobi.grid.Columns")).replace(/\#\&lt\;\#/g,"#<#").replace(/\#\&gt\;\#/g,"#>#").replace(/\#\&eq\;\#/g,"#=#").replace(/\#\&quot\;\#/g,"#\"#").replace(/\&/g,"&amp;").replace(/\#<\#/g,"&lt;").replace(/\#>\#/g,"&gt;").replace(/\#=\#/g,"&eq;").replace(/\#\"\#/g,"&quot;");
sXml=sXml.replace(/(\&amp;lt;xsl\:)(.*?)(\/&amp;gt;)/g,function(){
return "&lt;xsl:"+arguments[2].replace(/\&amp;/g,"&")+"/&gt;";
});
if(this.oldColDefs!=sXml){
this.oldColDefs=sXml;
var _1ec=nitobi.xml.createXmlDoc(sXml);
this.TopLeftRenderer.generateXslTemplate(_1ec,this.rowXslGeneratorXslProc,_1e9,_1ea,this.isColumnIndicatorsEnabled(),this.isRowIndicatorsEnabled(),rh);
this.TopLeftRenderer.dataTableId=_1e8;
_1e9=fL;
_1ea=cs-fR-fL;
this.TopCenterRenderer.generateXslTemplate(_1ec,this.rowXslGeneratorXslProc,_1e9,_1ea,this.isColumnIndicatorsEnabled(),this.isRowIndicatorsEnabled(),rh);
this.TopCenterRenderer.dataTableId=_1e8;
this.MidLeftRenderer.generateXslTemplate(_1ec,this.rowXslGeneratorXslProc,0,fL,0,this.isRowIndicatorsEnabled(),rh,"left");
this.MidLeftRenderer.dataTableId=_1e8;
this.MidCenterRenderer.generateXslTemplate(_1ec,this.rowXslGeneratorXslProc,fL,cs-fR-fL,0,0,rh);
this.MidCenterRenderer.dataTableId=_1e8;
}
this.fire("AfterMakeXsl");
};
nitobi.grid.Grid.prototype.render=function(){
this.generateCss();
this.updateCellRanges();
return;
};
nitobi.grid.Grid.prototype.refilter=nitobi.grid.Grid.prototype.render;
nitobi.grid.Grid.prototype.getColumnDefinitions=function(){
return this.model.selectNodes("state/nitobi.grid.Columns/*");
};
nitobi.grid.Grid.prototype.initializeModelFromDeclaration=function(){
this.modelInitializerXslProc=nitobi.xml.createXslProcessor(nitobi.grid.modelFromDeclarationInitializerXslProc.stylesheet);
eval(nitobi.xml.transformToString(this.Interface,this.modelInitializerXslProc));
this.model.documentElement.setAttribute("ID",this.uid);
this.model.documentElement.setAttribute("uniqueID",this.uid);
};
nitobi.grid.Grid.prototype.setModelDefaults=function(_1ed,_1ee,_1ef){
var _1f0=this.API.selectNodes(_1ef);
for(var j=0;j<_1f0.length;j++){
var _1f2=_1f0[j].getAttribute("htmltag")+"";
var _1f3=_1f0[j].getAttribute("name")+"";
var _1f4=_1ee.getAttribute(_1f2)||_1ee.getAttribute(_1f3);
var _1f5=_1f0[j].getAttribute("default").replace(/\"/g,"");
_1f4=_1f4?_1f4:_1f5;
if(_1f0[j].getAttribute("type")=="bool"){
_1f4=nitobi.lang.boolToStr(nitobi.lang.toBool(_1f4));
}
_1ed.setAttribute(_1f0[j].getAttribute("name"),_1f4?_1f4:_1f5);
}
};
nitobi.grid.Grid.prototype.getNewRecordKey=function(){
var _1f6;
var key;
var _1f8;
do{
_1f6=new Date();
key=(_1f6.getTime()+"."+Math.round(Math.random()*99));
_1f8=this.datatable.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"e[@xk = '"+key+"']");
}while(_1f8!=null);
return key;
};
nitobi.grid.Grid.prototype.insertAfterCurrentRow=function(){
if(this.activeCell){
var _1f9=nitobi.grid.Cell.getRowNumber(this.activeCell);
this.insertRow(_1f9+1);
}else{
this.insertRow();
}
};
nitobi.grid.Grid.prototype.insertRow=function(_1fa){
var rows=parseInt(this.getDisplayedRowCount());
var xi=0;
if(_1fa!=null){
xi=parseInt((_1fa==null?rows:parseInt(_1fa)));
}
var _1fd=new nitobi.grid.OnBeforeRowInsertEventArgs(this,this.getRowObject(xi-1));
if(!this.isRowInsertEnabled()||!this.fire("BeforeRowInsert",_1fd)){
return;
}
var _1fe=this.datatable.getTemplateNode();
for(var i=0;i<this.columnCount();i++){
var _200=this.getColumnObject(i);
var _201=_200.getInitial();
if(_201==null||_201==""){
var _202=_200.getDataType();
if(_202==null||_202==""){
_202="text";
}
switch(_202){
case "text":
_201="";
break;
case "number":
_201=0;
break;
case "date":
_201="1900-01-01";
break;
}
}
var att=_200.getxdatafld().substr(1);
if(att!=null&&att!=""){
_1fe.setAttribute(att,_201);
}
}
this.clearSurfaces();
this.datatable.createRecord(_1fe,xi);
this.subscribeOnce("HtmlReady",this.handleAfterRowInsert,this,[xi]);
};
nitobi.grid.Grid.prototype.handleAfterRowInsert=function(xi){
this.fire("AfterRowInsert",new nitobi.grid.OnAfterRowInsertEventArgs(this,this.getRowObject(xi)));
this.setActiveCell(this.getCellElement(xi,0));
};
nitobi.grid.Grid.prototype.deleteCurrentRow=function(){
if(this.activeCell){
this.deleteRow(nitobi.grid.Cell.getRowNumber(this.activeCell));
}else{
alert("First select a record to delete.");
}
};
nitobi.grid.Grid.prototype.deleteRow=function(_205){
var _206=new nitobi.grid.OnBeforeRowDeleteEventArgs(this,this.getRowObject(_205));
if(!this.isRowDeleteEnabled()||!this.fire("BeforeRowDelete",_206)){
return;
}
this.clearSurfaces();
var rows=this.getDisplayedRowCount();
var xi=rows-1;
this.datatable.deleteRecord(_205);
rows--;
this.subscribeOnce("HtmlReady",this.handleAfterRowDelete,this,[_205]);
};
nitobi.grid.Grid.prototype.handleAfterRowDelete=function(xi){
this.fire("AfterRowDelete",new nitobi.grid.OnBeforeRowDeleteEventArgs(this,this.getRowObject(xi)));
this.setActiveCell(this.getCellElement(xi,0));
};
nitobi.grid.Grid.prototype.onNextPage=function(){
this.loadNextDataPage();
};
nitobi.grid.Grid.prototype.page=function(dir){
};
nitobi.grid.Grid.prototype.selectionMoved=function(h,v){
eval(this.onMove);
};
nitobi.grid.Grid.prototype.move=function(h,v){
var hs=1;
var vs=1;
h=(h*hs);
v=(v*vs);
this.selectCellByCoords(nitobi.grid.Cell.getRowNumber(this.activeCell)+v,nitobi.grid.Cell.getColumnNumber(this.activeCell)+h);
};
nitobi.grid.Grid.prototype.handleClick=function(evt){
if(this.isSingleClickEditEnabled()){
this.edit(evt);
}
};
nitobi.grid.Grid.prototype.handleDblClick=function(evt){
var cell=new nitobi.grid.Cell(this,this.activeCell);
var _214=new nitobi.grid.OnCellDblClickEventArgs(this,cell);
return this.fire("CellDblClick",_214)&&nitobi.event.evaluate(cell.getColumnObject().getOnCellDblClickEvent(),_214);
};
nitobi.grid.Grid.prototype.loadNextDataPage=function(){
this.loadDataPage(this.getCurrentPageIndex()+1);
};
nitobi.grid.Grid.prototype.onPreviousPage=function(){
this.loadPreviousDataPage();
};
nitobi.grid.Grid.prototype.loadPreviousDataPage=function(){
this.loadDataPage(this.getCurrentPageIndex()-1);
};
nitobi.grid.Grid.prototype.GetPage=function(_215){
ebaErrorReport("GetPage is deprecated please use loadDataPage instead","",EBA_DEBUG);
this.loadDataPage(_215);
};
nitobi.grid.Grid.prototype.loadDataPage=function(_216){
};
nitobi.grid.Grid.prototype.getSelectedRow=function(rel){
try{
var nRow=-1;
var AC=this.activeCell;
if(AC!=null){
nRow=nitobi.grid.Cell.getRowNumber(AC);
if(rel){
nRow-=this.getfreezetop();
}
}
return nRow;
}
catch(err){
_ntbAssert(false,err.message);
}
};
nitobi.grid.Grid.prototype.handleHandlerError=function(){
var _21a=this.getDataSource().getHandlerError();
if(_21a){
this.fire("HandlerError");
}
};
nitobi.grid.Grid.prototype.getRowObject=function(_21b,_21c){
var _21d=_21c;
if(_21c==null&&_21b!=null){
_21d=_21b;
}
return new nitobi.grid.Row(this,_21d);
};
nitobi.grid.Grid.prototype.getSelectedColumn=function(rel){
try{
var nCol=-1;
var AC=this.activeCell;
if(AC!=null){
nCol=parseInt(AC.getAttribute("col"));
if(rel){
nCol-=this.getFrozenLeftColumnCount();
}
}
return nCol;
}
catch(err){
_ntbAssert(false,err.message);
}
};
nitobi.grid.Grid.prototype.getSelectedColumnObject=function(){
return this.getColumnObject(this.getSelectedColumn());
};
nitobi.grid.Grid.prototype.columnCount=function(){
try{
var _221=this.getColumnDefinitions();
return _221.length;
}
catch(err){
_ntbAssert(false,err.message);
}
};
nitobi.grid.Grid.prototype.getCellObject=function(row,col){
if(typeof (col)=="string"){
var node=this.model.selectSingleNode("state/nitobi.grid.Columns/nitobi.grid.Column[@xdatafld_orig='"+col+"']");
if(node!=null){
col=parseInt(node.getAttribute("xi"));
}
}
var cell=new nitobi.grid.Cell(this,row,col);
return cell;
};
nitobi.grid.Grid.prototype.getCellText=function(row,col){
return this.getCellObject(row,col).getHtml();
};
nitobi.grid.Grid.prototype.getCellValue=function(row,col){
return this.getCellObject(row,col).getValue();
};
nitobi.grid.Grid.prototype.getCellElement=function(row,_22b){
return document.getElementById("cell_"+row+"_"+_22b+"_"+this.uid);
};
nitobi.grid.Grid.prototype.getSelectedRowObject=function(xi){
var obj=null;
var r=nitobi.grid.Cell.getRowNumber(this.activeCell);
obj=new nitobi.grid.Row(this,r);
return obj;
};
nitobi.grid.Grid.prototype.getColumnObject=function(_22f){
var _230=null;
if(_22f>=0){
_230=this.columns[_22f];
if(_230==null){
var _231=this.getColumnDefinitions()[_22f].getAttribute("DataType");
switch(_231){
case "number":
_230=new nitobi.grid.NumberColumn(this,_22f);
break;
case "date":
_230=new nitobi.grid.DateColumn(this,_22f);
break;
default:
_230=new nitobi.grid.TextColumn(this,_22f);
break;
}
this.columns[_22f]=_230;
}
}
if(_230==null||_230.ModelNode==null){
return null;
}else{
return _230;
}
};
nitobi.grid.Grid.prototype.getSelectedCellObject=function(){
var obj=null;
var _233=this.activeCell;
if(_233!=null){
var r=nitobi.grid.Cell.getRowNumber(_233);
var c=nitobi.grid.Cell.getColumnNumber(_233);
obj=this.getCellObject(r,c);
}
return obj;
};
nitobi.grid.Grid.prototype.autoAddRow=function(){
if(this.activeCell.innerText.replace(/\s/g,"")!=""&&this.autoAdd){
this.deactivateCell();
if(this.active=="Y"){
this.freezeCell();
}
eval(this.getOnRowBlurEvent());
this.insertRow();
this.go("HOME");
this.editCell();
}
};
nitobi.grid.Grid.prototype.setDisplayedRowCount=function(_236){
if(this.Scroller){
this.Scroller.view.midcenter.rows=_236;
this.Scroller.view.midleft.rows=_236;
}
this.displayedRowCount=_236;
};
nitobi.grid.Grid.prototype.incrementDisplayedRowCount=function(_237){
this.setDisplayedRowCount(this.getDisplayedRowCount()+(_237||1));
this.updateCellRanges();
};
nitobi.grid.Grid.prototype.decrementDisplayedRowCount=function(_238){
this.setDisplayedRowCount(this.getDisplayedRowCount()-(_238||1));
this.updateCellRanges();
};
nitobi.grid.Grid.prototype.getDisplayedRowCount=function(){
return this.displayedRowCount;
};
nitobi.grid.Grid.prototype.copy=function(){
var _239=this.Selection.getCoords();
var data=this.getTableForSelection(_239);
var _23b=new nitobi.grid.OnCopyEventArgs(this,data,_239);
if(!this.isCopyEnabled()||!this.fire("BeforeCopy",_23b)){
return;
}
if(!nitobi.browser.IE){
var _23c=this.getClipboard();
_23c.onkeyup=nitobi.lang.close(this,this.focus);
_23c.value=data;
_23c.focus();
_23c.setSelectionRange(0,_23c.value.length);
}
if(nitobi.browser.IE){
window.clipboardData.setData("Text",data);
}
this.fire("AfterCopy",_23b);
};
nitobi.grid.Grid.prototype.getTableForSelection=function(_23d){
var _23e=this.getColumnMap(_23d.top.x,_23d.bottom.x);
var _23f=nitobi.data.FormatConverter.convertEbaXmlToTsv(this.getDataSource().getDataXmlDoc(),_23e,_23d.top.y,_23d.bottom.y);
return _23f;
};
nitobi.grid.Grid.prototype.getColumnMap=function(_240,_241){
var _242=this.getColumnDefinitions();
_240=(_240==null)?0:_240;
_241=(_241==null)?_242.length-1:_241;
var map=new Array();
for(var i=_240;i<=_241&&(null!=_242[i]);i++){
map.push(_242[i].getAttribute("xdatafld").substr(1));
}
return map;
};
nitobi.grid.Grid.prototype.paste=function(){
if(!this.isPasteEnabled()){
return;
}
var _245=this.getClipboard();
_245.onkeyup=nitobi.lang.close(this,this.pasteDataReady,[_245]);
_245.focus();
return _245;
};
nitobi.grid.Grid.prototype.pasteDataReady=function(_246){
_246.onkeyup=null;
var _247=this.Selection;
var _248=_247.getCoords();
var _249=_248.top.x;
var _24a=_249+nitobi.data.FormatConverter.getDataColumns(_246.value)-1;
var _24b=true;
for(var i=_249;i<=_24a;i++){
var _24d=this.getColumnObject(i);
if(_24d){
if(!_24d.isEditable()){
_24b=false;
break;
}
}
}
if(!_24b){
alert("Paste Failed: A column you are attempting to paste into is read-only.");
this.handleAfterPaste();
return;
}else{
var _24e=this.getColumnMap(_249,_24a);
var _24f=_248.top.y;
var _250=Math.max(_24f+nitobi.data.FormatConverter.getDataRows(_246.value)-1,0);
this.getSelection().selectWithCoords(_24f,_249,_250,_249+_24e.length-1);
var _251=new nitobi.grid.OnPasteEventArgs(this,_246.value,_248);
if(!this.fire("BeforePaste",_251)){
return;
}
var _252=_246.value;
var _253=null;
if(_252.substr(0,1)=="<"){
_253=nitobi.data.FormatConverter.convertHtmlTableToEbaXml(_252,_24e,_24f);
}else{
_253=nitobi.data.FormatConverter.convertTsvToEbaXml(_252,_24e,_24f);
}
if(_253.documentElement!=null){
this.datatable.mergeFromXml(_253,nitobi.lang.close(this,this.pasteComplete,[_253,_24f,_250,_251]));
}
}
};
nitobi.grid.Grid.prototype.pasteComplete=function(_254,_255,_256,_257){
this.Scroller.reRender(_255,_256);
this.subscribeOnce("HtmlReady",this.handleAfterPaste,this,[_257]);
};
nitobi.grid.Grid.prototype.handleAfterPaste=function(_258){
this.fire("AfterPaste",_258);
};
nitobi.grid.Grid.prototype.getClipboard=function(){
var _259=document.getElementById(this.uid+"_ebaclipboard");
if(!_259){
_259=document.createElement("textarea");
_259.name=this.uid+"_ebaclipboard";
_259.id=this.uid+"_ebaclipboard";
_259.style.position="absolute";
_259.style.top=(-500)+"px";
_259.style.left=(-500)+"px";
_259.width=100;
_259.height=100;
document.body.appendChild(_259);
}
_259.onkeyup=null;
_259.value="";
return _259;
};
nitobi.grid.Grid.prototype.handleHtmlReady=function(_25a){
this.fire("HtmlReady",new nitobi.base.EventArgs(this));
};
nitobi.grid.Grid.prototype.fire=function(evt,args){
return nitobi.event.notify(evt+this.uid,args);
};
nitobi.grid.Grid.prototype.subscribe=function(evt,func,_25f){
if(typeof (_25f)=="undefined"){
_25f=this;
}
return nitobi.event.subscribe(evt+this.uid,nitobi.lang.close(_25f,func));
};
nitobi.grid.Grid.prototype.subscribeOnce=function(evt,func,_262,_263){
var guid=null;
var _265=this;
var _266=function(){
func.apply(_262||this,_263||[]);
_265.unsubscribe(evt,guid);
};
guid=this.subscribe(evt,_266);
};
nitobi.grid.Grid.prototype.unsubscribe=function(evt,guid){
return nitobi.event.unsubscribe(evt+this.uid,guid);
};
nitobi.grid.Grid.prototype.xGET=function(){
var val="";
if(this.model&&this.model.documentElement){
var node=this.model.documentElement.selectSingleNode(arguments[0]);
if(node!=null){
val=node.nodeValue;
}
}
return val;
};
nitobi.grid.Grid.prototype.xSET=function(){
if((arguments[1][0]!=null)&&(this.model)&&(this.model.documentElement)&&(this.model.documentElement.selectSingleNode(arguments[0]))){
var node=this.model.documentElement.selectSingleNode(arguments[0]);
if(typeof (arguments[1][0])=="boolean"){
node.nodeValue=nitobi.lang.boolToStr(arguments[1][0]);
}else{
node.nodeValue=arguments[1][0];
}
}
};
nitobi.grid.Grid.prototype.eSET=function(name,args){
var _26e=args[0];
var _26f=_26e;
var _270=name.substr(2);
_270=_270.substr(0,_270.length-5);
if(typeof (_26e)=="string"){
_26f=function(){
return nitobi.event.evaluate(_26e,arguments[0]);
};
}
if(this[name]!=null){
this.unsubscribe(_270,this[name]);
}
var guid=this.subscribe(_270,_26f);
this.jSET(name,[guid]);
return guid;
};
nitobi.grid.Grid.prototype.jSET=function(name,val){
this[name]=val[0];
};
nitobi.grid.Grid.prototype.dispose=function(){
try{
this.element.jsObject=null;
editorXslProc=null;
var _274=nitobi.html.getFirstChild(this.UiContainer);
nitobi.html.detachEvents(_274,this.events,this,false);
nitobi.html.detachEvents(this.keyNav,this.keyEvents,this,false);
for(var item in this){
if(this[item]!=null){
if(this[item].dispose instanceof Function){
this[item].dispose();
}
this[item]=null;
}
}
nitobi.form.ControlFactory.instance.dispose();
}
catch(e){
}
};
nitobi.Grid=nitobi.grid.Grid;
nitobi.grid.Cell=function(grid,row,_278){
if(row==null){
return null;
}
this.Interface=grid.API.selectSingleNode("interfaces/interface[@name='nitobi.grid.Cell']");
eval(nitobi.xml.transformToString(this.Interface,grid.accessorGeneratorXslProc));
this.grid=grid;
var _279=null;
if(typeof (row)=="object"){
var cell=row;
row=Number(cell.getAttribute("xi"));
_278=cell.getAttribute("col");
_279=cell;
}else{
_279=this.grid.getCellElement(row,_278);
}
this.DomNode=_279;
this.row=Number(row);
this.Row=this.row;
this.column=Number(_278);
this.Column=this.column;
this.columnObject=this.grid.getColumnObject(this.Column);
this.dataIndex=this.Row;
var _27b=this.grid.datatable;
this.DataNode=_27b.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"e[@xi="+this.dataIndex+"]/"+_27b.fieldMap[this.columnObject.getColumnName()]);
this.ModelNode=this.grid.model.selectSingleNode("//nitobi.grid.Columns/nitobi.grid.Column[@xi='"+this.column+"']");
};
nitobi.grid.Cell.prototype.setValue=function(_27c,_27d){
if(_27c==this.getValue()){
return;
}
var _27e="";
switch(this.columnObject.getType()){
case "PASSWORD":
for(var i=0;i<_27c.length;i++){
_27e+="*";
}
break;
case "NUMBER":
if(this.numberXsl==null){
this.numberXsl=nitobi.form.numberXslProc.stylesheet;
}
if(_27c==""){
_27c=nitobi.form.Number.defaultValue;
}
var _280=nitobi.xml.createXmlDoc("<root><number>"+_27c+"</number><mask>"+this.columnObject.getMask()+"</mask><group>"+this.columnObject.getGroupingSeparator()+"</group><decimal>"+this.columnObject.getDecimalSeparator()+"</decimal></root>");
_27e=nitobi.xml.transformToString(_280,this.numberXsl);
if(""==_27e&&_27c!=""){
_27e=nitobi.html.getFirstChild(this.DomNode).innerHTML;
_27c=this.getValue();
}
break;
case "DATE":
if(this.dateXsl==null){
this.dateXsl=nitobi.form.dateXslProc.stylesheet;
}
var _280=nitobi.xml.createXmlDoc("<root><date>"+_27c+"</date><mask>"+this.columnObject.getMask()+"</mask></root>");
_27e=nitobi.xml.transformToString(_280,this.dateXsl);
if(""==_27e){
_27e=nitobi.html.getFirstChild(this.DomNode).innerHTML;
_27c=this.getValue();
}
break;
case "TEXTAREA":
_27e=nitobi.html.encode(_27c);
break;
case "LOOKUP":
var _281=this.getColumnObject();
var _282=_281.ModelNode.getAttribute("DatasourceId");
var _283=this.grid.data.getTable(_282);
var _284=_281.ModelNode.getAttribute("DisplayFields");
var _285=_281.ModelNode.getAttribute("ValueField");
var _286=_283.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"e[@"+_285+"='"+_27c+"']/@"+_284);
if(_286!=null){
_27e=_286.nodeValue;
}else{
_27e=_27c;
}
break;
case "CHECKBOX":
var _281=this.getColumnObject();
var _282=_281.ModelNode.getAttribute("DatasourceId");
var _283=this.grid.data.getTable(_282);
var _284=_281.ModelNode.getAttribute("DisplayFields");
var _285=_281.ModelNode.getAttribute("ValueField");
var _287=_281.ModelNode.getAttribute("CheckedValue");
if(_287==""||_287==null){
_287=0;
}
var _288=_283.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"e[@"+_285+"='"+_27c+"']/@"+_284).nodeValue;
var _289=(_27c==_287)?"checked":"unchecked";
_27e="<div style=\"overflow:hidden;\"><div style=\"float:left;\" class=\"ntbcheckbox ntbcheckbox"+_289+" checkbox"+_289+"\" checked=\""+_27c+"\">&nbsp;</div><span>"+nitobi.html.encode(_288)+"</span></div>";
break;
case "LISTBOX":
var _281=this.getColumnObject();
var _282=_281.ModelNode.getAttribute("DatasourceId");
var _283=this.grid.data.getTable(_282);
var _284=_281.ModelNode.getAttribute("DisplayFields");
var _285=_281.ModelNode.getAttribute("ValueField");
_27e=_283.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"e[@"+_285+"='"+_27c+"']/@"+_284).nodeValue;
break;
case "IMAGE":
_27e=nitobi.html.getFirstChild(this.DomNode).innerHTML;
if(nitobi.lang.typeOf(_27c)==nitobi.lang.type.HTMLNODE){
_27e="<img border=\"0\" src=\""+_27c.getAttribute("src")+"\" />";
}else{
if(typeof (_27c)=="string"){
_27e="<img border=\"0\" src=\""+_27c+"\" />";
}
}
break;
default:
_27e=_27c;
}
if(this.DomNode!=null){
nitobi.html.getFirstChild(this.DomNode).innerHTML=_27e;
this.DomNode.setAttribute("value",_27c);
}
this.grid.datatable.updateRecord(this.dataIndex,this.columnObject.getColumnName(),_27c);
};
nitobi.grid.Cell.prototype.getValue=function(){
return this.GETDATA();
};
nitobi.grid.Cell.prototype.getHtml=function(){
return nitobi.html.getFirstChild(this.DomNode).innerHTML;
};
nitobi.grid.Cell.prototype.edit=function(){
this.grid.setActiveCell(this.DomNode);
this.grid.edit();
};
nitobi.grid.Cell.prototype.GETDATA=function(){
var node=this.DataNode;
if(node!=null){
return node.value;
}
};
nitobi.grid.Cell.prototype.xGETMETA=function(){
if(this.MetaNode==null){
return null;
}
var node=this.MetaNode;
node=node.selectSingleNode("@"+arguments[0]);
if(node!=null){
return node.value;
}
};
nitobi.grid.Cell.prototype.xSETMETA=function(){
var node=this.MetaNode;
if(node!=null){
node.setAttribute(arguments[0],arguments[1][0]);
}else{
alert("Cannot set property: "+arguments[0]);
}
};
nitobi.grid.Cell.prototype.xSETCSS=function(){
var node=this.DomNode;
if(node!=null){
node.style.setAttribute(arguments[0],arguments[1][0]);
}else{
alert("Cannot set property: "+arguments[0]);
}
};
nitobi.grid.Cell.prototype.xGET=function(){
var node=this.ModelNode;
node=node.selectSingleNode(arguments[0]);
if(node!=null){
return node.value;
}
};
nitobi.grid.Cell.prototype.xSET=function(){
var node=this.ModelNode;
node=node.selectSingleNode(arguments[0]);
if(node!=null){
node.nodeValue=arguments[1][0];
}
};
nitobi.grid.Cell.prototype.getStyle=function(){
return this.DomNode.style;
};
nitobi.grid.Cell.prototype.getColumnObject=function(){
if(typeof (this.columnObject)=="undefined"){
this.columnObject=this.grid.getColumnObject(this.getColumn());
}
return this.columnObject;
};
nitobi.grid.Cell.getCellElement=function(grid,row,_292){
return $("cell_"+row+"_"+_292+"_"+grid.uid);
};
nitobi.grid.Cell.getRowNumber=function(_293){
return parseInt(_293.getAttribute("xi"));
};
nitobi.grid.Cell.getColumnNumber=function(_294){
return parseInt(_294.getAttribute("col"));
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.CellEventArgs=function(_295,cell){
this.grid=_295;
this.cell=cell;
this.event=nitobi.html.Event;
};
nitobi.grid.CellEventArgs.prototype.getSource=function(){
return this.grid;
};
nitobi.grid.CellEventArgs.prototype.getCell=function(){
return this.cell;
};
nitobi.grid.CellEventArgs.prototype.getEvent=function(){
return this.event;
};
nitobi.grid.CellEventArgs.prototype.getOldValue=function(){
};
nitobi.grid.CellEventArgs.prototype.getNewValue=function(){
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.RowEventArgs=function(_297,row){
this.grid=_297;
this.row=row;
this.event=nitobi.html.Event;
};
nitobi.grid.RowEventArgs.prototype.getSource=function(){
return this.grid;
};
nitobi.grid.RowEventArgs.prototype.getRow=function(){
return this.row;
};
nitobi.grid.RowEventArgs.prototype.getEvent=function(){
return this.event;
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.SelectionEventArgs=function(_299,data,_29b){
this.source=_299;
this.coords=_29b;
this.data=data;
};
nitobi.grid.SelectionEventArgs.prototype.getSource=function(){
return this.source;
};
nitobi.grid.SelectionEventArgs.prototype.getCoords=function(){
return this.coords;
};
nitobi.grid.SelectionEventArgs.prototype.getData=function(){
return this.data;
};
nitobi.grid.Column=function(grid,_29d){
this.grid=grid;
this.column=_29d;
this.uid=nitobi.base.getUid();
this.Interface=this.grid.API.selectSingleNode("interfaces/interface[@name='nitobi.grid.Column']");
eval(nitobi.xml.transformToString(this.Interface,grid.accessorGeneratorXslProc));
var _29e=null;
if(nitobi.browser.MOZ){
_29e=this.grid.model.selectSingleNode("//state/nitobi.grid.Columns/nitobi.grid.Column["+(parseInt(_29d)+1)+"]");
}else{
_29e=this.grid.model.selectSingleNode("//state/nitobi.grid.Columns/nitobi.grid.Column["+(_29d)+"]");
}
this.ModelNode=_29e;
};
nitobi.grid.Column.prototype.getHeaderElement=function(){
return nitobi.grid.Column.getColumnHeaderElement(this.grid,this.column);
};
nitobi.grid.Column.prototype.getEditor=function(){
};
nitobi.grid.Column.prototype.getStyle=function(){
var _29f=this.getClassName();
return nitobi.html.getClass(_29f);
};
nitobi.grid.Column.prototype.getHeaderStyle=function(){
var _2a0="acolumnheader"+this.grid.uid+"_"+this.column;
return nitobi.html.getClass(_2a0);
};
nitobi.grid.Column.prototype.getDataStyle=function(){
var _2a1="ntbcolumndata"+this.grid.uid+"_"+this.column;
return nitobi.html.getClass(_2a1);
};
nitobi.grid.Column.prototype.getEditor=function(){
return nitobi.form.ControlFactory.instance.getEditor(this.grid,this);
};
nitobi.grid.Column.prototype.xGETMODEL=function(){
var node=this.ModelNode;
node=node.selectSingleNode("@"+arguments[0]);
if(node!=null){
return node.value;
}
};
nitobi.grid.Column.prototype.xSETMODEL=function(){
var node=this.ModelNode;
if(node!=null){
node.setAttribute(arguments[0],arguments[1][0]);
}else{
alert("Cannot set model property: "+arguments[0]);
}
};
nitobi.grid.Column.prototype.xGET=function(){
var node=this.grid.model.documentElement;
node=node.selectSingleNode(arguments[0]);
if(node!=null){
return node.value;
}
};
nitobi.grid.Column.prototype.xSET=function(){
var node=this.grid.model.documentElement;
node=node.selectSingleNode(arguments[0]);
if(node!=null){
node.nodeValue=arguments[1][0];
}
};
nitobi.grid.Column.prototype.eSET=function(name,_2a7){
var _2a8=_2a7[0];
var _2a9=_2a8;
var _2aa=name.substr(2);
_2aa=_2aa.substr(0,_2aa.length-5);
if(typeof (_2a8)=="string"){
_2a9=function(_2ab){
return eval(_2a8);
};
}
if(typeof (this[name])!="undefined"){
alert("unsubscribe");
this.unsubscribe(_2aa,this[name]);
}
var guid=this.subscribe(_2aa,_2a9);
this.jSET(name,[guid]);
};
nitobi.grid.Column.prototype.jSET=function(name,val){
this[name]=val[0];
};
nitobi.grid.Column.prototype.fire=function(evt,args){
return nitobi.event.notify(evt+this.uid,args);
};
nitobi.grid.Column.prototype.subscribe=function(evt,func,_2b3){
if(typeof (_2b3)=="undefined"){
_2b3=this;
}
return nitobi.event.subscribe(evt+this.uid,nitobi.lang.close(_2b3,func));
};
nitobi.grid.Column.prototype.unsubscribe=function(evt,func){
return nitobi.event.unsubscribe(evt+this.uid,func);
};
nitobi.grid.Column.getColumnHeaderElement=function(grid,_2b7){
return $("columnheader_"+_2b7+"_"+grid.uid);
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.ColumnEventArgs=function(_2b8,_2b9){
this.grid=_2b8;
this.column=_2b9;
this.event=nitobi.html.Event;
};
nitobi.grid.ColumnEventArgs.prototype.getSource=function(){
return this.grid;
};
nitobi.grid.ColumnEventArgs.prototype.getColumn=function(){
return this.column;
};
nitobi.grid.ColumnEventArgs.prototype.getEvent=function(){
return this.event;
};
nitobi.grid.ColumnEventArgs.prototype.getDirection=function(){
};
nitobi.grid.ColumnResizer=function(grid){
this.grid=grid;
this.hScrollClass=null;
this.surfaceClass=null;
this.columClass=null;
this.line=document.getElementById("ebagridresizeline_");
if(this.line==null){
this.line=document.createElement("div");
this.line.id="ebagridresizeline_";
document.body.appendChild(this.line);
this.line.className="ntbcolumnresizeline";
}
this.lineStyle=this.line.style;
if(nitobi.browser.IE){
this.surface=document.getElementById("ebagridresizesurface_");
if(this.surface==null){
this.surface=document.createElement("div");
this.surface.id="ebagridresizesurface_";
this.surface.className="ntbcolumnresizesurface";
document.body.appendChild(this.surface);
}
}
};
nitobi.grid.ColumnResizer.prototype.startResize=function(grid,_2bc,_2bd,_2be){
this.grid=grid;
this.column=_2bc;
var _2bf=new nitobi.grid.OnBeforeColumnResizeEventArgs(this.grid,this.column);
if(!nitobi.event.evaluate(_2bc.getOnBeforeResizeEvent(),_2bf)){
return;
}
var x=nitobi.html.getEventCoords(_2be).x;
if(nitobi.browser.IE){
this.surface.style.visibility="visible";
nitobi.drawing.align(this.surface,this.grid.element,nitobi.drawing.align.SAMEHEIGHT|nitobi.drawing.align.SAMEWIDTH|nitobi.drawing.align.ALIGNTOP|nitobi.drawing.align.ALIGNLEFT);
}
this.x=x;
nitobi.drawing.align(this.line,_2bd,nitobi.drawing.align.ALIGNTOP,0,0,nitobi.html.getHeight(_2bd)+1);
this.lineStyle.left=x+"px";
this.lineStyle.height=(parseInt(this.grid.Scroller.height)-parseInt(this.grid.getHeaderHeight()))+"px";
this.lineStyle.visibility="visible";
nitobi.ui.startDragOperation(this.line,_2be,false,true,this,this.endResize);
};
nitobi.grid.ColumnResizer.prototype.endResize=function(_2c1){
var x=_2c1.x;
var Y=_2c1.y;
if(nitobi.browser.IE){
this.surface.style.visibility="hidden";
}
this.lineStyle.visibility="hidden";
this.lineStyle.top="0px";
this.lineStyle.left="0px";
var _2c4=this.column.getWidth();
var _2c5=parseInt(_2c4)+x-this.x;
if(isNaN(_2c5)){
return;
}
if(_2c5>10){
var _2c6=this.column.getWidth();
this.column.setWidth(_2c5);
this.grid.updateCellRanges();
this.grid.generateCss();
this.grid.adjustHorizontalScrollBars();
}
this.grid.Selection.collapse(this.grid.activeCell);
var _2c7=new nitobi.grid.OnAfterColumnResizeEventArgs(this.grid,this.column);
nitobi.event.evaluate(this.column.getOnAfterResizeEvent(),_2c7);
};
nitobi.grid.ColumnResizer.prototype.dispose=function(){
this.grid=null;
this.line=null;
this.lineStyle=null;
this.surface=null;
};
nitobi.grid.GridResizer=function(grid){
this.grid=grid;
this.box=document.getElementById("ebagridresizebox_");
if(this.box==null){
this.box=document.createElement("div");
this.box.id="ebagridresizebox_";
document.body.appendChild(this.box);
this.box.className="ntbcolumnresizeline";
}
};
nitobi.grid.GridResizer.prototype.startResize=function(grid,_2ca){
this.grid=grid;
var _2cb=null;
var x,y;
var _2ce=nitobi.html.getEventCoords(_2ca);
x=_2ce.x;
y=_2ce.y;
this.x=x;
this.y=y;
var w=grid.getWidth();
var h=grid.getHeight();
var L=grid.element.offsetLeft;
var T=grid.element.offsetTop;
this.resizeW=(Math.abs((x-L)-w)<3)||((Math.abs((y-T)-h)<16)&&(Math.abs((x-L)-w)<16));
this.resizeH=(Math.abs((y-T)-h)<3)||((Math.abs((y-T)-h)<16)&&(Math.abs((x-L)-w)<16));
if(this.resizeW||this.resizeH){
this.box.style.cursor=(this.resizeW&&this.resizeH)?"NW-Resize":(this.resizeW)?"W-Resize":"N-Resize";
this.box.style.visibility="visible";
this.box.style.width=(x-L)+"px";
this.box.style.height=(y-T)+"px";
var _2d3=nitobi.drawing.align.SAMEWIDTH|nitobi.drawing.align.SAMEHEIGHT|nitobi.drawing.align.ALIGNTOP|nitobi.drawing.align.ALIGNLEFT;
nitobi.drawing.align(this.box,this.grid.element,_2d3,0,0,0,0,false);
this.dd=new nitobi.ui.DragDrop(this.box,false,false);
this.dd.onDragStop.subscribe(this.endResize,this);
this.dd.onMouseMove.subscribe(this.resize,this);
this.dd.startDrag(_2ca);
}
};
nitobi.grid.GridResizer.prototype.resize=function(){
var x=this.dd.x;
var y=this.dd.y;
var L=this.grid.element.offsetLeft;
var T=this.grid.element.offsetTop;
this.box.style.visibility="visible";
if(this.resizeW){
this.box.style.width=(x-L)+"px";
}
if(this.resizeH){
this.box.style.height=(y-T)+"px";
}
};
nitobi.grid.GridResizer.prototype.endResize=function(){
var x=this.dd.x;
var y=this.dd.y;
this.box.style.visibility="hidden";
var _2da=this.grid.getWidth();
var _2db=this.grid.getHeight();
var _2dc=parseInt(_2da)+((this.resizeW)?x-this.x:0);
var _2dd=parseInt(_2db)+((this.resizeH)?y-this.y:0);
if(isNaN(_2dc)||isNaN(_2dd)){
return;
}
if(_2dc>20&&_2dd>20){
this.grid.setWidth(_2dc);
this.grid.setHeight(_2dd);
this.grid.generateCss();
}
var _2de=null;
this.grid.fire("AfterGridResize",{width:_2dc,height:_2dd});
};
nitobi.grid.GridResizer.prototype.dispose=function(){
this.grid=null;
};
nitobi.data.FormatConverter={};
nitobi.data.FormatConverter.convertHtmlTableToEbaXml=function(_2df,_2e0,_2e1){
var s="<xsl:stylesheet version=\"1.0\" xmlns:ntb=\"http://www.nitobi.com\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:output encoding=\"UTF-8\" method=\"xml\" omit-xml-declaration=\"no\" />";
s+="<xsl:template match=\"//TABLE\"><ntb:data id=\"_default\">";
s+="<xsl:apply-templates /></ntb:data> </xsl:template>";
s+="<xsl:template match = \"//TR\">  <xsl:element name=\"ntb:e\"> <xsl:attribute name=\"xi\"><xsl:value-of select=\"position()-1+"+parseInt(_2e1)+"\"/></xsl:attribute>";
for(var _2e3=0;_2e3<_2e0.length;_2e3++){
s+="<xsl:attribute name=\""+_2e0[_2e3]+"\" ><xsl:value-of select=\"TD["+parseInt(_2e3+1)+"]\"/></xsl:attribute>";
}
s+="</xsl:element></xsl:template>";
s+="</xsl:stylesheet>";
var _2e4=nitobi.xml.createXmlDoc(_2df);
var _2e5=nitobi.xml.createXslProcessor(s);
var _2e6=nitobi.xml.transformToXml(_2e4,_2e5);
return _2e6;
};
nitobi.data.FormatConverter.convertTsvToEbaXml=function(tsv,_2e8,_2e9){
var _2ea="<TABLE><TBODY>"+tsv.replace(/[\&\r]/g,"").replace(/([^\t\n]*)[\t]/g,"<TD>$1</TD>").replace(/([^\n]*?)\n/g,"<TR>$1</TR>").replace(/\>([^\<]*)\<\/TR/g,"><TD>$1</TD></TR")+"</TBODY></TABLE>";
if(_2ea.indexOf("<TBODY><TR>")==-1){
_2ea=_2ea.replace(/TBODY\>(.*)\<\/TBODY/,"TBODY><TR><TD>$1</TD></TR></TBODY");
}
return nitobi.data.FormatConverter.convertHtmlTableToEbaXml(_2ea,_2e8,_2e9);
};
nitobi.data.FormatConverter.convertEbaXmlToHtmlTable=function(_2eb,_2ec,_2ed,_2ee){
var s="<xsl:stylesheet version=\"1.0\" xmlns:ntb=\"http://www.nitobi.com\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:output encoding=\"UTF-8\" method=\"html\" omit-xml-declaration=\"yes\" /><xsl:template match = \"*\"><xsl:apply-templates /></xsl:template><xsl:template match = \"/\">";
s+="<TABLE><TBODY><xsl:for-each select=\"//ntb:e[@xi>"+parseInt(_2ed-1)+" and @xi &lt; "+parseInt(_2ee+1)+"]\" ><TR>";
for(var _2f0=0;_2f0<_2ec.length;_2f0++){
s+="<TD><xsl:value-of select=\"@"+_2ec[_2f0]+"\" /></TD>";
}
s+="</TR></xsl:for-each></TBODY></TABLE></xsl:template></xsl:stylesheet>";
var _2f1=nitobi.xml.createXslProcessor(s);
return nitobi.xml.transformToXml(_2eb,_2f1).xml.replace(/xmlns:ntb="http:\/\/www.nitobi.com"/,"");
};
nitobi.data.FormatConverter.convertEbaXmlToTsv=function(_2f2,_2f3,_2f4,_2f5){
var s="<xsl:stylesheet version=\"1.0\" xmlns:ntb=\"http://www.nitobi.com\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:output encoding=\"UTF-8\" method=\"text\" omit-xml-declaration=\"yes\" /><xsl:template match = \"*\"><xsl:apply-templates /></xsl:template><xsl:template match = \"/\">";
s+="<xsl:for-each select=\"//ntb:e[@xi>"+parseInt(_2f4-1)+" and @xi &lt; "+parseInt(_2f5+1)+"]\" >\n";
for(var _2f7=0;_2f7<_2f3.length;_2f7++){
s+="<xsl:value-of select=\"@"+_2f3[_2f7]+"\" />";
if(_2f7<_2f3.length-1){
s+="<xsl:text>&#x09;</xsl:text>";
}
}
s+="<xsl:text>&#xa;</xsl:text></xsl:for-each></xsl:template></xsl:stylesheet>";
var _2f8=nitobi.xml.createXslProcessor(s);
return nitobi.xml.transformToString(_2f2,_2f8).replace(/xmlns:ntb="http:\/\/www.nitobi.com"/,"");
};
nitobi.data.FormatConverter.getDataColumns=function(data){
var _2fa=0;
if(data!=null&&data!=""){
if(data.substr(0,1)=="<"){
_2fa=data.toLowerCase().substr(0,data.toLowerCase().indexOf("</tr>")).split("</td>").length-1;
}else{
_2fa=data.substr(0,data.indexOf("\n")).split("\t").length;
}
}else{
_2fa=0;
}
return _2fa;
};
nitobi.data.FormatConverter.getDataRows=function(data){
var _2fc=0;
if(data!=null&&data!=""){
if(data.substr(0,1)=="<"){
_2fc=data.toLowerCase().split("</tr>").length-1;
}else{
retValArray=data.split("\n");
_2fc=retValArray.length;
if(retValArray[retValArray.length-1]==""){
_2fc--;
}
}
}else{
_2fc=0;
}
return _2fc;
};
nitobi.grid.DateColumn=function(grid,_2fe){
nitobi.grid.DateColumn.baseConstructor.call(this,grid,_2fe);
this.Interface=grid.API.selectSingleNode("interfaces/interface[@name='EBADateColumn']");
eval(nitobi.xml.transformToString(this.Interface,grid.accessorGeneratorXslProc));
};
nitobi.lang.extend(nitobi.grid.DateColumn,nitobi.grid.Column);
nitobi.lang.defineNs("nitobi.grid.Declaration");
nitobi.grid.Declaration.parse=function(_2ff){
var _300={};
_300.grid=nitobi.xml.parseHtml(_2ff);
var _301=_2ff.firstChild;
while(_301!=null){
if(typeof (_301.tagName)!="undefined"){
var tag=_301.tagName.replace(/ntb\:/gi,"").toLowerCase();
if(tag=="inlinehtml"){
_300[tag]=_301;
}else{
var _303="http://www.nitobi.com";
if(tag=="columndefinition"){
var sXml;
if(nitobi.browser.IE){
sXml=("<"+nitobi.xml.nsPrefix+"grid xmlns:ntb=\""+_303+"\"><"+nitobi.xml.nsPrefix+"columns>"+_301.parentNode.innerHTML.substring(31).replace(/\=\s*([^\"^\s^\>]+)/g,"=\"$1\" ")+"</"+nitobi.xml.nsPrefix+"columns></"+nitobi.xml.nsPrefix+"grid>");
}else{
sXml="<"+nitobi.xml.nsPrefix+"grid xmlns:ntb=\""+_303+"\"><"+nitobi.xml.nsPrefix+"columns>"+_301.parentNode.innerHTML.replace(/\=\s*([^\"^\s^\>]+)/g,"=\"$1\" ")+"</"+nitobi.xml.nsPrefix+"columns></"+nitobi.xml.nsPrefix+"grid>";
}
sXml=sXml.replace(/\&nbsp\;/gi," ");
_300["columndefinitions"]=nitobi.xml.createXmlDoc();
_300["columndefinitions"].validateOnParse=false;
_300["columndefinitions"]=nitobi.xml.loadXml(_300["columndefinitions"],sXml);
break;
}else{
_300[tag]=nitobi.xml.parseHtml(_301);
}
}
}
_301=_301.nextSibling;
}
return _300;
};
nitobi.grid.Declaration.loadDataSources=function(_305,grid){
var _307=new Array();
if(_305["datasources"]){
_307=_305.datasources.selectNodes("//"+nitobi.xml.nsPrefix+"datasources/*");
}
if(_307.length>0){
for(var i=0;i<_307.length;i++){
var id=_307[i].getAttribute("id");
if(id!="_default"){
var _30a=_307[i].xml.replace(/fieldnames=/g,"FieldNames=").replace(/keys=/g,"Keys=");
_30a="<ntb:grid xmlns:ntb=\"http://www.nitobi.com\"><ntb:datasources>"+_30a+"</ntb:datasources></ntb:grid>";
var _30b=new nitobi.data.DataTable("local",grid.getPagingMode()!=nitobi.grid.PAGINGMODE_NONE,{GridId:grid.getID()},{GridId:grid.getID()},grid.isAutoKeyEnabled());
_30b.initialize(id,_30a);
_30b.initializeXml(_30a);
grid.data.add(_30b);
var _30c=grid.model.selectNodes("//nitobi.grid.Column[@DatasourceId='"+id+"']");
for(var j=0;j<_30c.length;j++){
grid.editorDataReady(_30c[j]);
}
}
}
}
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.EditCompleteEventArgs=function(obj,_30f,_310,cell){
this.editor=obj;
this.cell=cell;
this.databaseValue=_310;
this.displayValue=_30f;
this.status="ok";
};
nitobi.grid.EditCompleteEventArgs.prototype.dispose=function(){
this.editor=null;
this.cell=null;
this.metadata=null;
};
nitobi.data.GetCompleteEventArgs=function(_312,_313,_314,_315,_316,_317,obj,_319,_31a){
this.firstRow=_312;
this.lastRow=_313;
this.callback=_319;
this.dataSource=_317;
this.context=obj;
this.ajaxCallback=_316;
this.startXi=_314;
this.pageSize=_315;
this.lastPage=false;
this.numRowsReturned=_31a;
this.lastRowReturned=_313;
};
nitobi.data.GetCompleteEventArgs.prototype.dispose=function(){
this.callback=null;
this.context=null;
this.dataSource=null;
this.ajaxCallback.clear();
this.ajaxCallback==null;
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.MODE_STANDARDPAGING="standard";
nitobi.grid.MODE_LOCALSTANDARDPAGING="localstandard";
nitobi.grid.MODE_LIVESCROLLING="livescrolling";
nitobi.grid.MODE_LOCALLIVESCROLLING="locallivescrolling";
nitobi.grid.MODE_NONPAGING="nonpaging";
nitobi.grid.MODE_LOCALNONPAGING="localnonpaging";
nitobi.grid.MODE_SMARTPAGING="smartpaging";
nitobi.grid.MODE_PAGEDLIVESCROLLING="pagedlivescrolling";
nitobi.grid.RENDERMODE_ONDEMAND="ondemand";
nitobi.lang.defineNs("nitobi.GridFactory");
nitobi.GridFactory.createGrid=function(_31b,_31c,_31d){
var _31e="";
var _31f="";
var _320="";
_31d=nitobi.html.getElement(_31d);
if(_31d!=null){
xDeclaration=nitobi.grid.Declaration.parse(_31d);
_31b=xDeclaration.grid.documentElement.getAttribute("mode");
var _321=nitobi.GridFactory.isGetHandler(xDeclaration);
var _322=nitobi.GridFactory.isDatasourceId(xDeclaration);
var _323=false;
if(_31b==nitobi.grid.MODE_LOCALLIVESCROLLING){
_31e=nitobi.grid.PAGINGMODE_LIVESCROLLING;
_31f=nitobi.data.DATAMODE_LOCAL;
}else{
if(_31b==nitobi.grid.MODE_LIVESCROLLING){
_31e=nitobi.grid.PAGINGMODE_LIVESCROLLING;
_31f=nitobi.data.DATAMODE_CACHING;
}else{
if(_31b==nitobi.grid.MODE_NONPAGING){
_323=true;
_31e=nitobi.grid.PAGINGMODE_NONE;
_31f=nitobi.data.DATAMODE_LOCAL;
}else{
if(_31b==nitobi.grid.MODE_LOCALNONPAGING){
_31e=nitobi.grid.PAGINGMODE_NONE;
_31f=nitobi.data.DATAMODE_LOCAL;
}else{
if(_31b==nitobi.grid.MODE_LOCALSTANDARDPAGING){
_31e=nitobi.grid.PAGINGMODE_STANDARD;
_31f=nitobi.data.DATAMODE_LOCAL;
}else{
if(_31b==nitobi.grid.MODE_STANDARDPAGING){
_31e=nitobi.grid.PAGINGMODE_STANDARD;
_31f=nitobi.data.DATAMODE_PAGING;
}else{
if(_31b==nitobi.grid.MODE_PAGEDLIVESCROLLING){
_31e=nitobi.grid.PAGINGMODE_STANDARD;
_31f=nitobi.data.DATAMODE_PAGING;
_320=nitobi.grid.RENDERMODE_ONDEMAND;
}else{
}
}
}
}
}
}
}
}
var id=_31d.getAttribute("id");
_31b=(_31b||nitobi.grid.MODE_STANDARDPAGING).toLowerCase();
var grid=null;
if(_31b==nitobi.grid.MODE_LOCALSTANDARDPAGING){
grid=new nitobi.grid.GridLocalPage(id);
}else{
if(_31b==nitobi.grid.MODE_LIVESCROLLING){
grid=new nitobi.grid.GridLiveScrolling(id);
}else{
if(_31b==nitobi.grid.MODE_LOCALLIVESCROLLING){
grid=new nitobi.grid.GridLiveScrolling(id);
}else{
if(_31b==nitobi.grid.MODE_NONPAGING||_31b==nitobi.grid.MODE_LOCALNONPAGING){
grid=new nitobi.grid.GridNonpaging(id);
}else{
if(_31b==nitobi.grid.MODE_STANDARDPAGING||_31b==nitobi.grid.MODE_PAGEDLIVESCROLLING){
grid=new nitobi.grid.GridStandard(id);
}
}
}
}
}
grid.setPagingMode(_31e);
grid.setDataMode(_31f);
grid.setRenderMode(_320);
nitobi.GridFactory.processDeclaration(grid,_31d,xDeclaration);
_31d.jsObject=grid;
return grid;
};
nitobi.GridFactory.processDeclaration=function(grid,_327,_328){
if(_328!=null){
grid.setDeclaration(_328);
if(typeof (_328.inlinehtml)=="undefined"){
var _329=document.createElement("ntb:inlinehtml");
_329.setAttribute("parentid","grid"+grid.uid);
_327.insertAdjacentElement("beforeEnd",_329);
grid.Declaration.inlinehtml=_329;
}
if(this.data==null||this.data.tables==null||this.data.tables.length==0){
var _32a=new nitobi.data.DataSet();
_32a.initialize();
grid.connectToDataSet(_32a);
}
grid.initializeModelFromDeclaration();
var _32b=grid.Declaration.columndefinitions||grid.Declaration.columns;
if(typeof (_32b)!="undefined"&&_32b!=null&&_32b.childNodes.length!=0&&_32b.childNodes[0].childNodes.length!=0){
grid.defineColumns(_32b.documentElement);
}
nitobi.grid.Declaration.loadDataSources(_328,grid);
grid.attachToParentDomElement(grid.Declaration.inlinehtml);
var _32c=grid.getDataMode();
var _32d=grid.getDatasourceId();
var _32e=grid.getGetHandler();
if(_32d!=null&&_32d!=""){
grid.connectToTable(grid.data.getTable(_32d));
}else{
grid.ensureConnected();
if(grid.mode.toLowerCase()==nitobi.grid.MODE_LIVESCROLLING&&_328!=null&&_328.datasources!=null){
var _32f=_328.datasources.selectNodes("//ntb:datasource[@id='_default']/ntb:data/ntb:e").length;
if(_32f>0){
var _330=grid.data.getTable("_default");
_330.initializeXmlData(_328.grid.xml);
_330.initializeXml(_328.grid.xml);
_330.descriptor.leap(0,_32f*2);
_330.syncRowCount();
}
}
}
window.setTimeout(function(){
grid.bind();
},0);
}
};
nitobi.GridFactory.isLocal=function(_331){
var _332=_331.grid.documentElement.getAttribute("datasourceid");
var _333=_331.grid.documentElement.getAttribute("gethandler");
if(_333!=null&&_333!=""){
return false;
}else{
if(_332!=null&&_332!=""){
return true;
}else{
throw ("Non-paging grid requires either a gethandler or a local datasourceid to be specified.");
}
}
};
nitobi.GridFactory.isGetHandler=function(_334){
var _335=_334.grid.documentElement.getAttribute("gethandler");
if(_335!=null&&_335!=""){
return true;
}
return false;
};
nitobi.GridFactory.isDatasourceId=function(_336){
var _337=_336.grid.documentElement.getAttribute("datasourceid");
if(_337!=null&&_337!=""){
return true;
}
return false;
};
nitobi.grid.hover=function(_338,_339,_33a){
if(!_33a){
return;
}
var id=_338.getAttribute("id");
var _33c=id.replace(/__/g,"||");
var _33d=_33c.split("_");
var row=_33d[3];
var uid=_33d[5].replace(/\|\|/g,"__");
var _340=document.getElementById("cell_"+row+"_0_"+uid);
var _341=_340.parentNode;
var _342=_341.childNodes[_341.childNodes.length-1];
var id=_342.getAttribute("id");
var _33d=id.split("_");
var _343=document.getElementById("cell_"+row+"_"+(Number(_33d[4])+1)+"_"+uid);
var _344=null;
if(_343!=null){
_344=_343.parentNode;
}
if(_339){
var _345=nitobi.grid.RowHoverColor||"white";
_341.style.backgroundColor=_345;
if(_344){
_344.style.backgroundColor=_345;
}
}else{
_341.style.backgroundColor="";
if(_344){
_344.style.backgroundColor="";
}
}
if(_339){
nitobi.html.addClass(_338,"ntbcellhover");
}else{
nitobi.html.removeClass(_338,"ntbcellhover");
}
};
initEBAGrids=function(){
nitobi.initComponents();
};
nitobi.initGrids=function(){
var _346=window.document.getElementsByTagName(nitobi.browser.MOZ?"ntb:grid":"grid");
for(var i=0;i<_346.length;i++){
_346[i].jsObject=nitobi.GridFactory.createGrid(null,null,_346[i]);
}
};
nitobi.initGrid=function(id){
var grid=nitobi.html.getElement(id);
if(grid!=null){
grid.jsObject=nitobi.GridFactory.createGrid(null,null,grid);
}
return grid.jsObject;
};
nitobi.initComponents=function(){
nitobi.initGrids();
};
nitobi.getGrid=function(_34a){
return document.getElementById(_34a).jsObject;
};
nitobi.base.Registry.getInstance().register(new nitobi.base.Profile("nitobi.initGrid",null,false,"ntb:grid"));
nitobi.grid.GridLiveScrolling=function(uid){
nitobi.grid.GridLiveScrolling.baseConstructor.call(this,uid);
this.mode="livescrolling";
this.setPagingMode(nitobi.grid.PAGINGMODE_LIVESCROLLING);
this.setDataMode(nitobi.data.DATAMODE_CACHING);
};
nitobi.lang.extend(nitobi.grid.GridLiveScrolling,nitobi.grid.Grid);
nitobi.grid.GridLiveScrolling.prototype.createChildren=function(){
var args=arguments;
nitobi.grid.GridLiveScrolling.base.createChildren.call(this,args);
nitobi.grid.GridLiveScrolling.base.createToolbars.call(this,nitobi.ui.Toolbars.VisibleToolbars.STANDARD);
};
nitobi.grid.GridLiveScrolling.prototype.bind=function(){
nitobi.grid.GridStandard.base.bind.call(this);
if(this.getGetHandler()!=""){
this.ensureConnected();
var rows=this.getRowsPerPage();
if(this.datatable.mode=="local"){
rows=null;
}
this.datatable.get(0,rows,this,this.getComplete);
}else{
this.finalizeRowCount(this.datatable.getRemoteRowCount());
this.bindComplete();
}
};
nitobi.grid.GridLiveScrolling.prototype.getComplete=function(_34e){
nitobi.grid.GridLiveScrolling.base.getComplete.call(this,_34e);
if(!this.columnsDefined){
this.defineColumnsFinalize();
}
this.bindComplete();
};
nitobi.grid.GridLiveScrolling.prototype.pageSelect=function(dir){
var _350=this.Scroller.getUnrenderedBlocks();
var rows=_350.last-_350.first;
this.reselect(0,rows*dir);
};
nitobi.grid.GridLiveScrolling.prototype.page=function(dir){
var _353=this.Scroller.getUnrenderedBlocks();
var rows=_353.last-_353.first;
this.move(0,rows*dir);
};
nitobi.grid.LoadingScreen=function(grid){
this.loadingScreen=null;
this.grid=grid;
this.loadingImg=null;
};
nitobi.grid.LoadingScreen.prototype.initialize=function(){
this.loadingScreen=document.createElement("div");
var _356=this.findCssUrl();
var msg="";
if(_356==null){
msg="Loading...";
}else{
msg="<img src='"+_356+"loading.gif'  class='ntbloadingIcon' valign='absmiddle'></img>";
}
this.loadingScreen.innerHTML="<table style='padding:0px;margin:0px;' border='0' width='100%' height='100%'><tr style='padding:0px;margin:0px;'><td style='padding:0px;margin:0px;text-align:center;font:verdana;font-size:10pt;'>"+msg+"</td></tr></table>";
this.loadingScreen.className="ntbloading";
var lss=this.loadingScreen.style;
lss.verticalAlign="middle";
lss.visibility="hidden";
lss.position="absolute";
lss.top="0px";
lss.left="0px";
};
nitobi.grid.LoadingScreen.prototype.attachToElement=function(_359){
_359.appendChild(this.loadingScreen);
};
nitobi.grid.LoadingScreen.prototype.findCssUrl=function(){
var _35a=nitobi.html.findParentStylesheet(".ntbloadingIcon");
if(_35a==null){
return null;
}
var _35b=nitobi.html.normalizeUrl(_35a.href);
if(nitobi.browser.IE){
while(_35a.parentStyleSheet){
_35a=_35a.parentStyleSheet;
_35b=nitobi.html.normalizeUrl(_35a.href)+_35b;
}
}
return _35b;
};
nitobi.grid.LoadingScreen.prototype.show=function(){
try{
this.resize();
this.loadingScreen.style.visibility="visible";
this.loadingScreen.style.display="block";
}
catch(e){
}
};
nitobi.grid.LoadingScreen.prototype.resize=function(){
this.loadingScreen.style.width=this.grid.getWidth()+"px";
this.loadingScreen.style.height=this.grid.getHeight()+"px";
};
nitobi.grid.LoadingScreen.prototype.hide=function(){
this.loadingScreen.style.display="none";
};
nitobi.grid.GridLocalPage=function(uid){
nitobi.grid.GridLocalPage.baseConstructor.call(this,uid);
this.mode="localpaging";
this.setPagingMode(nitobi.grid.PAGINGMODE_STANDARD);
this.setDataMode("local");
};
nitobi.lang.extend(nitobi.grid.GridLocalPage,nitobi.grid.Grid);
nitobi.grid.GridLocalPage.prototype.createChildren=function(){
var args=arguments;
nitobi.grid.GridLocalPage.base.createChildren.call(this,args);
nitobi.grid.GridLiveScrolling.base.createToolbars.call(this,nitobi.ui.Toolbars.VisibleToolbars.STANDARD|nitobi.ui.Toolbars.VisibleToolbars.PAGING);
this.toolbars.subscribe("NextPage",nitobi.lang.close(this,this.pageNext));
this.toolbars.subscribe("PreviousPage",nitobi.lang.close(this,this.pagePrevious));
this.subscribe("EndOfData",function(pct){
this.toolbars.pagingToolbar.getUiElements()["nextPage"+this.toolbars.uid].disable();
});
this.subscribe("TopOfData",function(pct){
this.toolbars.pagingToolbar.getUiElements()["previousPage"+this.toolbars.uid].disable();
});
this.subscribe("NotTopOfData",function(pct){
this.toolbars.pagingToolbar.getUiElements()["previousPage"+this.toolbars.uid].enable();
});
this.subscribe("NotEndOfData",function(pct){
this.toolbars.pagingToolbar.getUiElements()["nextPage"+this.toolbars.uid].enable();
});
};
nitobi.grid.GridLocalPage.prototype.pagePrevious=function(){
this.fire("BeforeLoadPreviousPage");
this.loadDataPage(Math.max(this.getCurrentPageIndex()-1,0));
this.fire("AfterLoadPreviousPage");
};
nitobi.grid.GridLocalPage.prototype.pageNext=function(){
this.fire("BeforeLoadNextPage");
this.loadDataPage(this.getCurrentPageIndex()+1);
this.fire("AfterLoadNextPage");
};
nitobi.grid.GridLocalPage.prototype.loadDataPage=function(_362){
this.fire("BeforeLoadDataPage");
if(_362>-1){
this.setCurrentPageIndex(_362);
this.setDisplayedRowCount(this.getRowsPerPage());
var _363=this.getCurrentPageIndex()*this.getRowsPerPage();
var rows=this.getRowsPerPage()-this.getfreezetop()-this.getfreezebottom();
this.setDisplayedRowCount(rows);
var _365=_363+rows;
if(_365>=this.getRowCount()){
this.fire("EndOfData");
}else{
this.fire("NotEndOfData");
}
if(_363==0){
this.fire("TopOfData");
}else{
this.fire("NotTopOfData");
}
this.clearSurfaces();
this.updateCellRanges();
this.scrollVertical(0);
}
this.fire("AfterLoadDataPage");
};
nitobi.grid.GridLocalPage.prototype.setRowsPerPage=function(rows){
this.setDisplayedRowCount(this.getRowsPerPage());
this.data.table.pageSize=this.getRowsPerPage();
};
nitobi.grid.GridLocalPage.prototype.pageStartIndexChanges=function(){
};
nitobi.grid.GridLocalPage.prototype.hitFirstPage=function(){
this.fire("FirstPage");
};
nitobi.grid.GridLocalPage.prototype.hitLastPage=function(){
this.fire("LastPage");
};
nitobi.grid.GridLocalPage.prototype.bind=function(){
nitobi.grid.GridLocalPage.base.bind.call(this);
this.finalizeRowCount(this.datatable.getRemoteRowCount());
this.bindComplete();
};
nitobi.grid.GridLocalPage.prototype.pageUpKey=function(){
this.pagePrevious();
};
nitobi.grid.GridLocalPage.prototype.pageDownKey=function(){
this.pageNext();
};
nitobi.grid.GridLocalPage.prototype.renderMiddle=function(){
nitobi.grid.GridLocalPage.base.renderMiddle.call(this,arguments);
var _367=this.getfreezetop();
endRow=this.getRowsPerPage()-1;
this.Scroller.view.midcenter.renderGap(_367,endRow,false);
};
nitobi.grid.GridNonpaging=function(uid){
nitobi.grid.GridNonpaging.baseConstructor.call(this);
this.mode="nonpaging";
this.setPagingMode(nitobi.grid.PAGINGMODE_NONE);
this.setDataMode(nitobi.data.DATAMODE_LOCAL);
};
nitobi.lang.extend(nitobi.grid.GridNonpaging,nitobi.grid.Grid);
nitobi.grid.GridNonpaging.prototype.createChildren=function(){
var args=arguments;
nitobi.grid.GridNonpaging.base.createChildren.call(this,args);
nitobi.grid.GridNonpaging.base.createToolbars.call(this,nitobi.ui.Toolbars.VisibleToolbars.STANDARD);
};
nitobi.grid.GridNonpaging.prototype.bind=function(){
nitobi.grid.GridStandard.base.bind.call(this);
if(this.getGetHandler()!=""){
this.ensureConnected();
this.datatable.get(0,null,this,this.getComplete);
}else{
this.finalizeRowCount(this.datatable.getRemoteRowCount());
this.bindComplete();
}
};
nitobi.grid.GridNonpaging.prototype.getComplete=function(_36a){
nitobi.grid.GridNonpaging.base.getComplete.call(this,_36a);
this.finalizeRowCount(_36a.numRowsReturned);
this.defineColumnsFinalize();
this.bindComplete();
};
nitobi.grid.GridNonpaging.prototype.renderMiddle=function(){
nitobi.grid.GridNonpaging.base.renderMiddle.call(this,arguments);
var _36b=this.getfreezetop();
endRow=this.getRowCount();
this.Scroller.view.midcenter.renderGap(_36b,endRow,false);
};
nitobi.grid.GridStandard=function(uid){
nitobi.grid.GridStandard.baseConstructor.call(this,uid);
this.mode="standard";
this.setPagingMode(nitobi.grid.PAGINGMODE_STANDARD);
this.setDataMode(nitobi.data.DATAMODE_PAGING);
};
nitobi.lang.extend(nitobi.grid.GridStandard,nitobi.grid.Grid);
nitobi.grid.GridStandard.prototype.createChildren=function(){
var args=arguments;
nitobi.grid.GridStandard.base.createChildren.call(this,args);
nitobi.grid.GridStandard.base.createToolbars.call(this,nitobi.ui.Toolbars.VisibleToolbars.STANDARD|nitobi.ui.Toolbars.VisibleToolbars.PAGING);
this.toolbars.subscribe("NextPage",nitobi.lang.close(this,this.pageNext));
this.toolbars.subscribe("PreviousPage",nitobi.lang.close(this,this.pagePrevious));
this.subscribe("EndOfData",this.disableNextPage);
this.subscribe("TopOfData",this.disablePreviousPage);
this.subscribe("NotTopOfData",this.enablePreviousPage);
this.subscribe("NotEndOfData",this.enableNextPage);
this.subscribe("TableConnected",nitobi.lang.close(this,this.subscribeToRowCountReady));
};
nitobi.grid.GridStandard.prototype.connectToTable=function(_36e){
if(nitobi.grid.GridStandard.base.connectToTable.call(this,_36e)!=false){
this.datatable.subscribe("RowInserted",nitobi.lang.close(this,this.incrementDisplayedRowCount));
this.datatable.subscribe("RowDeleted",nitobi.lang.close(this,this.decrementDisplayedRowCount));
}
};
nitobi.grid.GridStandard.prototype.subscribeToRowCountReady=function(){
};
nitobi.grid.GridStandard.prototype.updateDisplayedRowCount=function(_36f){
this.setDisplayedRowCount(_36f.numRowsReturned);
};
nitobi.grid.GridStandard.prototype.disableNextPage=function(){
this.disableButton("nextPage");
};
nitobi.grid.GridStandard.prototype.disablePreviousPage=function(){
this.disableButton("previousPage");
};
nitobi.grid.GridStandard.prototype.disableButton=function(_370){
var t=this.getToolbars().pagingToolbar;
if(t!=null){
t.getUiElements()[_370+this.toolbars.uid].disable();
}
};
nitobi.grid.GridStandard.prototype.enableNextPage=function(){
this.enableButton("nextPage");
};
nitobi.grid.GridStandard.prototype.enablePreviousPage=function(){
this.enableButton("previousPage");
};
nitobi.grid.GridStandard.prototype.enableButton=function(_372){
var t=this.getToolbars().pagingToolbar;
if(t!=null){
t.getUiElements()[_372+this.toolbars.uid].enable();
}
};
nitobi.grid.GridStandard.prototype.pagePrevious=function(){
this.fire("BeforeLoadPreviousPage");
this.loadDataPage(Math.max(this.getCurrentPageIndex()-1,0));
this.fire("AfterLoadPreviousPage");
};
nitobi.grid.GridStandard.prototype.pageNext=function(){
this.fire("BeforeLoadNextPage");
this.loadDataPage(this.getCurrentPageIndex()+1);
this.fire("AfterLoadNextPage");
};
nitobi.grid.GridStandard.prototype.loadDataPage=function(_374){
this.fire("BeforeLoadDataPage");
if(_374>-1){
if(this.sortColumn){
if(this.datatable.sortColumn){
for(var i=0;i<this.getColumnCount();i++){
var _376=this.getColumnObject(i);
if(_376.getColumnName()==this.datatable.sortColumn){
this.setSortStyle(i,this.datatable.sortDir);
break;
}
}
}else{
this.setSortStyle(this.sortColumn.column,"",true);
}
}
this.setCurrentPageIndex(_374);
var _377=this.getCurrentPageIndex()*this.getRowsPerPage();
var rows=this.getRowsPerPage()-this.getfreezetop()-this.getfreezebottom();
this.datatable.flush();
this.datatable.get(_377,rows,this,this.afterLoadDataPage);
}
this.fire("AfterLoadDataPage");
};
nitobi.grid.GridStandard.prototype.afterLoadDataPage=function(_379){
this.setDisplayedRowCount(_379.numRowsReturned);
this.setRowCount(_379.numRowsReturned);
if(_379.numRowsReturned!=this.getRowsPerPage()){
this.fire("EndOfData");
}else{
this.fire("NotEndOfData");
}
if(this.getCurrentPageIndex()==0){
this.fire("TopOfData");
}else{
this.fire("NotTopOfData");
}
this.clearSurfaces();
this.updateCellRanges();
this.scrollVertical(0);
};
nitobi.grid.GridStandard.prototype.bind=function(){
nitobi.grid.GridStandard.base.bind.call(this);
this.setCurrentPageIndex(0);
this.disablePreviousPage();
this.enableNextPage();
this.ensureConnected();
this.datatable.get(0,this.getRowsPerPage(),this,this.getComplete);
};
nitobi.grid.GridStandard.prototype.getComplete=function(_37a){
this.afterLoadDataPage(_37a);
nitobi.grid.GridStandard.base.getComplete.call(this,_37a);
this.defineColumnsFinalize();
this.bindComplete();
};
nitobi.grid.GridStandard.prototype.renderMiddle=function(){
nitobi.grid.GridStandard.base.renderMiddle.call(this,arguments);
var _37b=this.getfreezetop();
endRow=this.getRowsPerPage()-1;
this.Scroller.view.midcenter.renderGap(_37b,endRow,false);
};
nitobi.grid.NumberColumn=function(grid,_37d){
nitobi.grid.NumberColumn.baseConstructor.call(this,grid,_37d);
this.Interface=grid.API.selectSingleNode("interfaces/interface[@name='EBANumberColumn']");
eval(nitobi.xml.transformToString(this.Interface,grid.accessorGeneratorXslProc));
};
nitobi.lang.extend(nitobi.grid.NumberColumn,nitobi.grid.Column);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnCopyEventArgs=function(_37e,data,_380){
nitobi.grid.OnCopyEventArgs.baseConstructor.apply(this,arguments);
};
nitobi.lang.extend(nitobi.grid.OnCopyEventArgs,nitobi.grid.SelectionEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnPasteEventArgs=function(_381,data,_383){
nitobi.grid.OnPasteEventArgs.baseConstructor.apply(this,arguments);
};
nitobi.lang.extend(nitobi.grid.OnPasteEventArgs,nitobi.grid.SelectionEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnAfterCellEditEventArgs=function(_384,cell){
nitobi.grid.OnAfterCellEditEventArgs.baseConstructor.call(this,_384,cell);
};
nitobi.lang.extend(nitobi.grid.OnAfterCellEditEventArgs,nitobi.grid.CellEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnAfterColumnResizeEventArgs=function(_386,_387){
nitobi.grid.OnAfterColumnResizeEventArgs.baseConstructor.call(this,_386,_387);
};
nitobi.lang.extend(nitobi.grid.OnAfterColumnResizeEventArgs,nitobi.grid.ColumnEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnAfterRowDeleteEventArgs=function(_388,row){
nitobi.grid.OnAfterRowDeleteEventArgs.baseConstructor.call(this,_388,row);
};
nitobi.lang.extend(nitobi.grid.OnAfterRowDeleteEventArgs,nitobi.grid.RowEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnAfterRowInsertEventArgs=function(_38a,row){
nitobi.grid.OnAfterRowInsertEventArgs.baseConstructor.call(this,_38a,row);
};
nitobi.lang.extend(nitobi.grid.OnAfterRowInsertEventArgs,nitobi.grid.RowEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnAfterSortEventArgs=function(_38c,_38d,_38e){
nitobi.grid.OnAfterSortEventArgs.baseConstructor.call(this,_38c,_38d);
this.direction=_38e;
};
nitobi.lang.extend(nitobi.grid.OnAfterSortEventArgs,nitobi.grid.ColumnEventArgs);
nitobi.grid.OnAfterSortEventArgs.prototype.getDirection=function(){
return this.direction;
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnBeforeCellEditEventArgs=function(_38f,cell){
nitobi.grid.OnBeforeCellEditEventArgs.baseConstructor.call(this,_38f,cell);
};
nitobi.lang.extend(nitobi.grid.OnBeforeCellEditEventArgs,nitobi.grid.CellEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnBeforeColumnResizeEventArgs=function(_391,_392){
nitobi.grid.OnBeforeColumnResizeEventArgs.baseConstructor.call(this,_391,_392);
};
nitobi.lang.extend(nitobi.grid.OnBeforeColumnResizeEventArgs,nitobi.grid.ColumnEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnBeforeRowDeleteEventArgs=function(_393,row){
nitobi.grid.OnBeforeRowDeleteEventArgs.baseConstructor.call(this,_393,row);
};
nitobi.lang.extend(nitobi.grid.OnBeforeRowDeleteEventArgs,nitobi.grid.RowEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnBeforeRowInsertEventArgs=function(_395,row){
nitobi.grid.OnBeforeRowInsertEventArgs.baseConstructor.call(this,_395,row);
};
nitobi.lang.extend(nitobi.grid.OnBeforeRowInsertEventArgs,nitobi.grid.RowEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnBeforeSortEventArgs=function(_397,_398,_399){
nitobi.grid.OnBeforeSortEventArgs.baseConstructor.call(this,_397,_398);
this.direction=_399;
};
nitobi.lang.extend(nitobi.grid.OnBeforeSortEventArgs,nitobi.grid.ColumnEventArgs);
nitobi.grid.OnBeforeSortEventArgs.prototype.getDirection=function(){
return this.direction;
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnBeforeCellClickEventArgs=function(_39a,cell){
nitobi.grid.OnBeforeCellClickEventArgs.baseConstructor.call(this,_39a,cell);
};
nitobi.lang.extend(nitobi.grid.OnBeforeCellClickEventArgs,nitobi.grid.CellEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnCellBlurEventArgs=function(_39c,cell){
nitobi.grid.OnCellBlurEventArgs.baseConstructor.call(this,_39c,cell);
};
nitobi.lang.extend(nitobi.grid.OnCellBlurEventArgs,nitobi.grid.CellEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnCellClickEventArgs=function(_39e,cell){
nitobi.grid.OnCellClickEventArgs.baseConstructor.call(this,_39e,cell);
};
nitobi.lang.extend(nitobi.grid.OnCellClickEventArgs,nitobi.grid.CellEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnCellDblClickEventArgs=function(_3a0,cell){
nitobi.grid.OnCellDblClickEventArgs.baseConstructor.call(this,_3a0,cell);
};
nitobi.lang.extend(nitobi.grid.OnCellDblClickEventArgs,nitobi.grid.CellEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnCellFocusEventArgs=function(_3a2,cell){
nitobi.grid.OnCellFocusEventArgs.baseConstructor.call(this,_3a2,cell);
};
nitobi.lang.extend(nitobi.grid.OnCellFocusEventArgs,nitobi.grid.CellEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnCellValidateEventArgs=function(_3a4,cell,_3a6,_3a7){
nitobi.grid.OnCellValidateEventArgs.baseConstructor.call(this,_3a4,cell);
this.oldValue=_3a7;
this.newValue=_3a6;
};
nitobi.lang.extend(nitobi.grid.OnCellValidateEventArgs,nitobi.grid.CellEventArgs);
nitobi.grid.OnCellValidateEventArgs.prototype.getOldValue=function(){
return this.oldValue;
};
nitobi.grid.OnCellValidateEventArgs.prototype.getNewValue=function(){
return this.newValue;
};
nitobi.grid.OnContextMenuEventArgs=function(){
};
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnHeaderClickEventArgs=function(_3a8,_3a9){
nitobi.grid.OnHeaderClickEventArgs.baseConstructor.call(this,_3a8,_3a9);
};
nitobi.lang.extend(nitobi.grid.OnHeaderClickEventArgs,nitobi.grid.ColumnEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnRowBlurEventArgs=function(_3aa,row){
nitobi.grid.OnRowBlurEventArgs.baseConstructor.call(this,_3aa,row);
};
nitobi.lang.extend(nitobi.grid.OnRowBlurEventArgs,nitobi.grid.RowEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.OnRowFocusEventArgs=function(_3ac,row){
nitobi.grid.OnRowFocusEventArgs.baseConstructor.call(this,_3ac,row);
};
nitobi.lang.extend(nitobi.grid.OnRowFocusEventArgs,nitobi.grid.RowEventArgs);
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.PasteEventArgs=function(_3ae){
this.grid=_3ae;
this.event=nitobi.html.Event;
};
nitobi.grid.PasteEventArgs.prototype.getSource=function(){
return this.grid;
};
nitobi.grid.PasteEventArgs.prototype.getEvent=function(){
return this.event;
};
nitobi.grid.Row=function(grid,row){
this.grid=grid;
this.row=row;
this.Row=row;
this.Interface=this.grid.API.selectSingleNode("interfaces/interface[@name='nitobi.grid.Row']");
eval(nitobi.xml.transformToString(this.Interface,grid.accessorGeneratorXslProc));
this.DomNode=nitobi.grid.Row.getRowElement(grid,row);
this.DataNode=this.grid.datatable.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"data/"+nitobi.xml.nsPrefix+"e[@xi="+row+"]");
};
nitobi.grid.Row.prototype.getStyle=function(){
return this.DomNode.style;
};
nitobi.grid.Row.prototype.getCell=function(_3b1){
return this.grid.getCellObject(this.row,_3b1);
};
nitobi.grid.Row.prototype.getKey=function(_3b2){
return this.grid.getCellObject(this.row,_3b2);
};
nitobi.grid.Row.getRowElement=function(grid,row){
return nitobi.grid.Row.getRowElements(grid,row).mid;
};
nitobi.grid.Row.getRowElements=function(grid,row){
var _3b7=grid.getFrozenLeftColumnCount();
if(!_3b7){
return {left:null,mid:$("row_"+row+"_"+grid.uid)};
}
var rows={};
rows.left=nitobi.grid.Cell.getCellElement(grid,row,0).parentNode;
var cell=nitobi.grid.Cell.getCellElement(grid,row,_3b7);
rows.mid=cell?cell.parentNode:null;
return rows;
};
nitobi.grid.Row.getRowNumber=function(_3ba){
return parseInt(_3ba.getAttribute("xi"));
};
nitobi.grid.Row.prototype.xGETMETA=function(){
var node=this.MetaNode;
node=node.selectSingleNode("@"+arguments[0]);
if(node!=null){
return node.value;
}
};
nitobi.grid.Row.prototype.xSETMETA=function(){
var node=this.MetaNode;
if(null==node){
var meta=this.grid.data.selectSingleNode("//root/gridmeta");
var _3be=this.MetaNode=this.grid.data.createNode(1,"r","");
_3be.setAttribute("xi",this.row);
meta.appendChild(_3be);
node=this.MetaNode=_3be;
}
if(node!=null){
node.setAttribute(arguments[0],arguments[1][0]);
}else{
alert("Cannot set property: "+arguments[0]);
}
};
nitobi.grid.RowRenderer=function(_3bf,_3c0,_3c1,_3c2,_3c3,_3c4){
this.rowHeight=_3c1||23;
this.xmlDataSource=_3bf;
this.dataTableId="";
this.firstColumn=_3c2;
this.columns=_3c3;
this.firstColumn=_3c2;
this.uniqueId=_3c4;
};
nitobi.grid.RowRenderer.prototype.render=function(_3c5,rows,_3c7,_3c8,_3c9,_3ca){
if(this.xslTemplate==null){
return "";
}
var _3c5=Number(_3c5)||0;
var rows=Number(rows)||0;
this.xslTemplate.addParameter("start",_3c5,"");
this.xslTemplate.addParameter("end",_3c5+rows,"");
this.xslTemplate.addParameter("activeColumn",_3c7,"");
this.xslTemplate.addParameter("activeRow",_3c8,"");
this.xslTemplate.addParameter("sortColumn",_3c9,"");
this.xslTemplate.addParameter("sortDirection",_3ca,"");
this.xslTemplate.addParameter("dataTableId",this.dataTableId,"");
var data=this.xmlDataSource.xmlDoc();
s2=nitobi.xml.transformToString(data,this.xslTemplate,"xml");
s2=s2.replace(/ATOKENTOREPLACE/g,"&nbsp;");
return s2;
};
nitobi.grid.RowRenderer.prototype.generateXslTemplate=function(_3cc,_3cd,_3ce,_3cf,_3d0,_3d1,_3d2,id){
_3d0=_3d0||0;
_3d1=_3d1||0;
_3d2=_3d2||0;
this.columns=_3cf;
this.firstColumn=_3ce;
_3cd.addParameter("showIndicators",_3d1,"");
_3cd.addParameter("showHeaders",_3d0,"");
_3cd.addParameter("firstColumn",_3ce,"");
_3cd.addParameter("lastColumn",_3ce+_3cf,"");
_3cd.addParameter("uniqueId",this.uniqueId,"");
_3cd.addParameter("rowHover",_3d2,"");
_3cd.addParameter("frozenColumnId",(id?id:""),"");
this.xmlTemplate=nitobi.xml.transformToXml(_3cc,_3cd);
try{
var path=(typeof (gApplicationPath)=="undefined"?window.location.href.substr(0,window.location.href.lastIndexOf("/")+1):gApplicationPath);
var imp=this.xmlTemplate.selectNodes("//xsl:import");
for(var i=0;i<imp.length;i++){
imp[i].setAttribute("href",path+"xsl/"+imp[i].getAttribute("href"));
}
}
catch(e){
}
this.xslTemplate=nitobi.xml.createXslProcessor(this.xmlTemplate);
};
nitobi.grid.RowRenderer.prototype.dispose=function(){
this.xslTemplate=null;
this.xmlDataSource=null;
};
EBAScroller_RENDERTIMEOUT=100;
EBAScroller_VIEWPANES=new Array("topleft","topcenter","midleft","midcenter");
nitobi.grid.Scroller3x3=function(_3d7,_3d8,_3d9,top,_3db,_3dc,left,_3de,_3df,rows,_3e1,_3e2,_3e3,_3e4,_3e5,_3e6){
this.disposal=[];
this.scrollTop=0;
this.scrollLeft=0;
this.height=_3d9;
this.width=_3d8;
this.top=Math.min(Math.max(0,top),_3d9);
this.bottom=Math.min(Math.max(0,_3dc),_3d9-this.top);
this.mid=Math.max(0,_3d9-this.top-this.bottom);
this.left=Math.min(Math.max(0,left),_3d8);
this.right=Math.min(Math.max(0,_3db),_3d8-this.left);
this.center=Math.max(0,_3d8-this.left-this.right);
this.rows=rows;
this.columns=_3e1;
this.freezetop=_3e2;
this.freezeleft=_3e3;
this.freezebottom=_3e4;
this.freezeright=_3e5;
this.lastScrollTop=-1;
this.uid=nitobi.base.getUid();
this.onRenderComplete=new nitobi.base.Event();
this.onRangeUpdate=new nitobi.base.Event();
this.onHtmlReady=new nitobi.base.Event();
this.renderAll=_3e6;
this.owner=_3d7;
var VP=nitobi.grid.Viewport;
this.view={topleft:new VP(this.owner,0,this.top,this.left),topcenter:new VP(this.owner,1,this.top,this.center),midleft:new VP(this.owner,3,this.mid,this.left,top,_3db,_3dc,0),midcenter:new VP(this.owner,4,this.mid,this.center,top,_3db,_3dc,left)};
this.view.midleft.onHtmlReady.subscribe(this.handleHtmlReady,this);
this.setCellRanges();
this.scrollSurface=null;
this.startRow=_3e2;
this.headerHeight=23;
this.rowHeight=23;
this.lastTimeoutId=0;
this.ScrollTopPercent=0;
this.ScrollLeftPercent=0;
this.dataTable=null;
this.cacheMap=new nitobi.collections.CacheMap(-1,-1);
};
nitobi.grid.Scroller3x3.prototype.updateCellRanges=function(cols,rows,frzL,frzT,frzR,frzB){
this.columns=cols;
this.rows=rows;
this.freezetop=frzT;
this.freezeleft=frzL;
this.setCellRanges();
};
nitobi.grid.Scroller3x3.prototype.setCellRanges=function(){
var _3ee=null;
if(this.implementsStandardPaging()){
_3ee=this.getDisplayedRowCount();
}
this.view.topleft.setCellRanges(0,this.freezetop,0,this.freezeleft);
this.view.topcenter.setCellRanges(0,this.freezetop,this.freezeleft,this.columns-this.freezeleft-this.freezeright);
this.view.midleft.setCellRanges(this.freezetop,(_3ee?_3ee:this.rows)-this.freezebottom-this.freezetop,0,this.freezeleft);
this.view.midcenter.setCellRanges(this.freezetop,(_3ee?_3ee:this.rows)-this.freezebottom-this.freezetop,this.freezeleft,this.columns-this.freezeleft-this.freezeright);
};
nitobi.grid.Scroller3x3.prototype.resize=function(_3ef,_3f0,top,_3f2,_3f3,left,_3f5,_3f6){
this.height=_3f0;
this.width=_3ef;
this.top=Math.min(Math.max(0,top),_3f0);
this.bottom=Math.min(Math.max(0,_3f3),_3f0-this.top);
this.mid=Math.max(0,_3f0-this.top-this.bottom);
this.left=Math.min(Math.max(0,left),_3ef);
this.right=Math.min(Math.max(0,_3f2),_3ef-this.left);
this.center=Math.max(0,_3ef-this.left-this.right);
this.view.topleft.setPosition(this.top,this.left);
this.view.topcenter.setPosition(this.top,this.center);
this.view.midleft.setPosition(this.mid,this.left,top,_3f2,_3f3,left);
this.view.midcenter.setPosition(this.top,this.left,top,_3f2,_3f3,left);
};
nitobi.grid.Scroller3x3.prototype.setScrollLeftRelative=function(_3f7){
this.setScrollLeft(this.scrollLeft+_3f7);
};
nitobi.grid.Scroller3x3.prototype.setScrollLeftPercent=function(_3f8){
this.setScrollLeft(Math.round((this.view.midcenter.element.scrollWidth-this.view.midcenter.element.clientWidth)*_3f8));
};
nitobi.grid.Scroller3x3.prototype.setScrollLeft=function(_3f9){
this.scrollLeft=_3f9;
this.view.midcenter.element.scrollLeft=_3f9;
this.view.topcenter.element.scrollLeft=_3f9;
};
nitobi.grid.Scroller3x3.prototype.setScrollTopRelative=function(_3fa){
this.setScrollTop(this.scrollTop+_3fa);
};
nitobi.grid.Scroller3x3.prototype.setScrollTopPercent=function(_3fb){
this.scrollTopPercent=_3fb;
this.setScrollTop(Math.round((this.view.midcenter.element.scrollHeight-this.view.midcenter.element.clientHeight)*_3fb));
};
nitobi.grid.Scroller3x3.prototype.setScrollTop=function(_3fc){
this.scrollTop=_3fc;
this.view.midcenter.element.scrollTop=_3fc;
this.view.midleft.element.scrollTop=_3fc;
this.render();
};
nitobi.grid.Scroller3x3.prototype.clearSurfaces=function(_3fd,_3fe,_3ff,_400){
this.flushCache();
_3ff=true;
if(_3fd){
_3fe=true;
_3ff=true;
_400=true;
}
if(_3fe){
this.view.topleft.clear(true);
this.view.topcenter.clear(true);
}
if(_3ff){
this.view.midleft.clear(true,true,false,false);
this.view.midcenter.clear(false,false,true);
}
if(_400){
}
};
nitobi.grid.Scroller3x3.prototype.mapToHtml=function(_401){
var uid=this.owner.uid;
for(var i=0;i<4;i++){
var node=$("gridvp_"+i+"_"+uid);
this.view[EBAScroller_VIEWPANES[i]].mapToHtml(node,nitobi.html.getFirstChild(node),null);
}
this.scrollSurface=$("gridvp_3_"+uid);
};
nitobi.grid.Scroller3x3.prototype.getUnrenderedBlocks=function(){
var pair={first:this.freezetop,last:this.rows-1-this.freezetop-this.freezebottom};
if(!this.implementsShowAll()){
var _406=this.scrollSurface.scrollTop+this.top-this.headerHeight;
var MC=this.view.midcenter;
var b0=MC.findBlockAtCoord(_406);
var b1=MC.findBlockAtCoord(_406+this.height);
var _40a=null;
var _40b=null;
var _40c=20;
if(b0==null){
return;
}
_40a=b0.top+Math.floor((_406-b0.offsetTop)/this.rowHeight);
if(b1){
_40b=b1.top+Math.floor((_406+this.height-b1.offsetTop)/this.rowHeight)+_40c;
}else{
_40b=_40a+Math.floor(this.height/this.rowHeight)+_40c;
}
_40b=Math.min(_40b,this.rows);
if(this.implementsStandardPaging()){
var _40d=0;
if(this.owner.getRenderMode()==nitobi.grid.RENDERMODE_ONDEMAND){
var _40e=_40a+_40d;
var last=Math.min(_40b+_40d,_40d+this.getDisplayedRowCount()-1);
pair={first:_40e,last:last};
}else{
var _40e=_40d;
var last=_40e+this.getDisplayedRowCount()-1;
pair={first:_40e,last:last};
}
}else{
pair={first:_40a,last:_40b};
}
this.onRangeUpdate.notify(pair);
}
return pair;
};
nitobi.grid.Scroller3x3.prototype.render=function(_410){
if(this.owner.isBound()&&(this.scrollSurface.scrollTop!=this.lastScrollTop||_410||this.scrollTopPercent>0.9)){
var _411=nitobi.lang.close(this,this.performRender,[]);
window.clearTimeout(this.lastTimeoutId);
this.lastTimeoutId=window.setTimeout(_411,EBAScroller_RENDERTIMEOUT);
}
};
nitobi.grid.Scroller3x3.prototype.performRender=function(){
var _412=this.getUnrenderedBlocks();
if(_412==null){
return;
}
var _413=this.scrollSurface.scrollTop;
var mc=this.view.midcenter;
var ml=this.view.midleft;
var _416=this.getDataTable();
var _417=_412.first;
var last=_412.last;
if(last>=_416.remoteRowCount-1&&!_416.rowCountKnown){
last+=2;
}
var gaps=this.cacheMap.gaps(_417,last);
var _41a=(_417+last<=0);
if(_41a){
this.onHtmlReady.notify();
}else{
if(gaps[0]!=null){
var low=gaps[0].low;
var high=gaps[0].high;
var rows=high-low+1;
if(!_416.inCache(low,rows)){
if(low==null||rows==null){
alert("low or rows =null");
}
_416.get(low,rows);
var _41e=_416.cachedRanges(low,high);
for(var i=0;i<_41e.length;i++){
var _420=this.cacheMap.gaps(_41e[i].low,_41e[i].high);
for(var j=0;j<_420.length;j++){
_412.first=_420[j].low;
_412.last=_420[j].high;
this.renderGap(_420[j].low,_420[j].high);
}
}
return false;
}else{
this.renderGap(low,high);
}
}
}
this.onRenderComplete.notify();
};
nitobi.grid.Scroller3x3.prototype.renderGap=function(low,high){
var gaps=this.cacheMap.gaps(low,high);
var mc=this.view.midcenter;
var ml=this.view.midleft;
if(gaps[0]!=null){
var low=gaps[0].low;
var high=gaps[0].high;
var rows=high-low+1;
this.cacheMap.insert(low,high);
mc.renderGap(low,high);
ml.renderGap(low,high);
}
};
nitobi.grid.Scroller3x3.prototype.flushCache=function(){
if(Boolean(this.cacheMap)){
this.cacheMap.flush();
}
};
nitobi.grid.Scroller3x3.prototype.reRender=function(_428,_429){
var _42a=this.view.midleft.clearBlocks(_428,_429);
this.view.midcenter.clearBlocks(_428,_429);
this.cacheMap.remove(_42a.top,_42a.bottom);
this.render();
};
nitobi.grid.Scroller3x3.prototype.getViewportByCoords=function(row,_42c){
var _42d=0;
if(row>=_42d&&row<this.owner.getfreezetop()&&_42c>=0&&_42c<this.owner.frozenLeftColumnCount()){
return this.view.topleft;
}
if(row>=_42d&&row<this.owner.getfreezetop()&&_42c>=this.owner.getFrozenLeftColumnCount()&&_42c<this.owner.getColumnCount()){
return this.view.topcenter;
}
if(row>=this.owner.getfreezetop()+_42d&&row<this.owner.getDisplayedRowCount()+_42d&&_42c>=0&&_42c<this.owner.getFrozenLeftColumnCount()){
return this.view.midleft;
}
if(row>=this.owner.getfreezetop()+_42d&&row<this.owner.getDisplayedRowCount()+_42d&&_42c>=this.owner.getFrozenLeftColumnCount()&&_42c<this.owner.getColumnCount()){
return this.view.midcenter;
}
};
nitobi.grid.Scroller3x3.prototype.getRowsPerPage=function(){
return this.owner.getRowsPerPage();
};
nitobi.grid.Scroller3x3.prototype.getDisplayedRowCount=function(){
return this.owner.getDisplayedRowCount();
};
nitobi.grid.Scroller3x3.prototype.getCurrentPageIndex=function(){
return this.owner.getCurrentPageIndex();
};
nitobi.grid.Scroller3x3.prototype.implementsStandardPaging=function(){
return Boolean(this.owner.getPagingMode().toLowerCase()=="standard");
};
nitobi.grid.Scroller3x3.prototype.implementsShowAll=function(){
return Boolean(this.owner.getPagingMode().toLowerCase()==nitobi.grid.PAGINGMODE_NONE);
};
nitobi.grid.Scroller3x3.prototype.setDataTable=function(_42e){
this.dataTable=_42e;
};
nitobi.grid.Scroller3x3.prototype.getDataTable=function(){
return this.dataTable;
};
nitobi.grid.Scroller3x3.prototype.handleHtmlReady=function(){
this.onHtmlReady.notify();
};
nitobi.grid.Scroller3x3.prototype.setSort=function(col,dir){
this.view.topleft.setSort(col,dir);
this.view.topcenter.setSort(col,dir);
this.view.midleft.setSort(col,dir);
this.view.midcenter.setSort(col,dir);
};
nitobi.grid.Scroller3x3.prototype.setRowHeight=function(_431){
this.rowHeight=_431;
this.setViewportProperty("RowHeight",_431);
};
nitobi.grid.Scroller3x3.prototype.setHeaderHeight=function(_432){
this.headerHeight=_432;
this.setViewportProperty("HeaderHeight",_432);
};
nitobi.grid.Scroller3x3.prototype.setViewportProperty=function(_433,_434){
var sv=this.view;
for(var i=0;i<EBAScroller_VIEWPANES.length;i++){
sv[EBAScroller_VIEWPANES[i]]["set"+_433](_434);
}
};
nitobi.grid.Scroller3x3.prototype.fire=function(evt,args){
return nitobi.event.notify(evt+this.uid,args);
};
nitobi.grid.Scroller3x3.prototype.subscribe=function(evt,func,_43b){
if(typeof (_43b)=="undefined"){
_43b=this;
}
return nitobi.event.subscribe(evt+this.uid,nitobi.lang.close(_43b,func));
};
nitobi.grid.Scroller3x3.prototype.dispose=function(){
try{
(this.cacheMap!=null?this.cacheMap.flush():"");
this.cacheMap=null;
var _43c=this.disposal.length;
for(var i=0;i<_43c;i++){
if(typeof (this.disposal[i])=="function"){
this.disposal[i].call(this);
}
this.disposal[i]=null;
}
for(var v in this.view){
this.view[v].dispose();
}
for(var item in this){
if(this[item]!=null&&this[item].dispose instanceof Function){
this[item].dispose();
}
}
}
catch(e){
}
};
nitobi.grid.Selection=function(_440){
nitobi.grid.Selection.baseConstructor.call(this,_440);
this.owner=_440;
var t=new Date();
this.selecting=false;
this.resizingRow=false;
this.created=false;
this.freezeTop=this.owner.getfreezetop();
this.freezeLeft=this.owner.getFrozenLeftColumnCount();
this.rowHeight=23;
};
nitobi.lang.extend(nitobi.grid.Selection,nitobi.collections.CellSet);
nitobi.grid.Selection.prototype.setRange=function(_442,_443,_444,_445){
nitobi.grid.Selection.base.setRange.call(this,_442,_443,_444,_445);
this.startCell=this.owner.getCellElement(_442,_443);
this.endCell=this.owner.getCellElement(_444,_445);
};
nitobi.grid.Selection.prototype.setRangeWithDomNodes=function(_446,_447){
this.setRange(nitobi.grid.Cell.getRowNumber(_446),nitobi.grid.Cell.getColumnNumber(_446),nitobi.grid.Cell.getRowNumber(_447),nitobi.grid.Cell.getColumnNumber(_447));
};
nitobi.grid.Selection.prototype.createBoxes=function(){
if(!this.created){
this.box=this.createBox("selectbox"+this.owner.uid);
this.boxtl=this.createBox("selectboxtl"+this.owner.uid);
this.boxt=this.createBox("selectboxt"+this.owner.uid);
this.boxl=this.createBox("selectboxl"+this.owner.uid);
this.events=[{"type":"mousemove","handler":this.shrink},{"type":"mouseup","handler":this.stopSelecting},{"type":"click","handler":this.handleClick},{"type":"dblclick","handler":this.handleDblClick}];
nitobi.html.attachEvents(this.box,this.events,this);
nitobi.html.attachEvents(this.boxl,this.events,this);
nitobi.html.attachEvents(this.boxt,this.events,this);
var sv=this.owner.Scroller.view;
sv.midcenter.surface.appendChild(this.box);
sv.topleft.element.appendChild(this.boxtl);
sv.topcenter.container.appendChild(this.boxt);
sv.midleft.container.firstChild.appendChild(this.boxl);
this.clear();
this.created=true;
}
};
nitobi.grid.Selection.prototype.createBox=function(id){
var _44a="<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"\" class=\"ntbselectionbackground\"><tbody><tr><td></td></tr></tbody></table>";
var box=document.createElement("table");
var _44c=document.createElement("tbody");
var _44d=document.createElement("tr");
var _44e=document.createElement("td");
box.appendChild(_44c);
_44c.appendChild(_44d);
_44d.appendChild(_44e);
box.id=id;
box.className="ntbselectionborder ntbselectionbackground";
box.style.overflow="hidden";
box.style.height="10px";
box.style.width="10px";
box.style.position="absolute";
box.zIndex=10000001;
return box;
};
nitobi.grid.Selection.prototype.clearBoxes=function(){
if(this.box!=null){
this.clearBox(this.box);
}
if(this.box1!=null){
this.clearBox(this.box1);
}
if(this.boxt!=null){
this.clearBox(this.boxt);
}
this.created=false;
};
nitobi.grid.Selection.prototype.clearBox=function(box){
nitobi.html.detachEvents(box,this.events);
if(box.parentNode!=null){
box.parentNode.removeChild(box);
}
box=null;
};
nitobi.grid.Selection.prototype.shrink=function(evt){
if(this.endCell!=this.startCell&&this.selecting){
var _451=this.owner.getScrollSurface();
var _452=this.endCell.getBoundingClientRect(_451.scrollTop+document.body.scrollTop,_451.scrollLeft+document.body.scrollLeft);
var _453=_452.top;
var _454=_452.left;
var _455=nitobi.grid.Cell.getRowNumber(this.endCell);
var _456=nitobi.grid.Cell.getColumnNumber(this.endCell);
var evtY=evt.clientY;
var evtX=evt.clientX;
if(_455>nitobi.grid.Cell.getRowNumber(this.startCell)&&evtY<_453){
var diff=_453-evtY;
_455=_455-Math.floor(diff/this.rowHeight)-1;
}else{
if(evtY>_453+(_452.bottom-_453)){
var diff=evtY-_453;
_455=_455+Math.floor(diff/this.rowHeight);
}
}
if(_456>nitobi.grid.Cell.getColumnNumber(this.startCell)&&evtX<_454){
_456--;
}else{
if(evtX>_454+(_452.right-_454)){
_456++;
}
}
var _45a=this.owner.getCellElement(_455,_456);
if(_45a!=null&&_45a!=this.endCell){
this.changeEndCellWithDomNode(_45a);
this.alignBoxes();
this.owner.ensureCellInView(_45a);
}
}
};
nitobi.grid.Selection.prototype.getHeight=function(){
var rect=this.box.getBoundingClientRect();
return rect.top-rect.bottom;
};
nitobi.grid.Selection.prototype.collapse=function(cell){
if(!cell){
cell=this.startCell;
}
if(!cell){
return;
}
this.setRangeWithDomNodes(cell,cell);
if((this.box==null)||(this.box.parentNode==null)||(this.boxl==null)||(this.boxl.parentNode==null)){
this.created=false;
this.createBoxes();
}
if(null==this.boxt.parentNode){
this.owner.Scroller.view.topcenter.container.appendChild(this.boxt);
}
this.alignBoxes();
this.selecting=false;
};
nitobi.grid.Selection.prototype.startSelecting=function(_45d,_45e){
this.selecting=true;
this.setRangeWithDomNodes(_45d,_45e);
this.shrink();
document.body.attachEvent("onselectstart",function(){
return false;
});
};
nitobi.grid.Selection.prototype.clearSelection=function(cell){
this.collapse(cell);
};
nitobi.grid.Selection.prototype.resizeSelection=function(cell){
this.endCell=cell;
this.shrink();
};
nitobi.grid.Selection.prototype.moveSelection=function(cell){
this.collapse(cell);
};
nitobi.grid.Selection.prototype.alignBoxes=function(){
var _462=this.endCell||this.startCell;
var sc=this.getCoords();
var _464=sc.top.y;
var _465=sc.top.x;
var _466=sc.bottom.y;
var _467=sc.bottom.x;
var ox=(nitobi.browser.IE)?-2:-1;
var oy=(nitobi.browser.IE)?-2:-1;
if(_467>=this.freezeLeft&&_466>=this.freezeTop){
this.box.style.display="block";
this.align(this.box,this.startCell,_462,286265344,3,3,oy,ox);
}else{
this.box.style.display="none";
}
if(_465<=this.freezeLeft&&_464<this.freezeTop){
this.boxtl.style.display="block";
this.align(this.boxtl,this.startCell,_462,286265344,3,3,oy,ox);
}else{
this.boxtl.style.display="none";
}
if(_464<this.freezeTop){
this.boxt.style.display="block";
this.align(this.boxt,this.startCell,_462,286265344,3,3,oy,ox);
}else{
this.boxt.style.display="none";
}
if(_467<this.freezeLeft||_465<this.freezeLeft){
this.boxl.style.display="block";
this.align(this.boxl,this.startCell,_462,286265344,3,3,oy,ox);
}else{
this.boxl.style.display="none";
}
};
nitobi.grid.Selection.prototype.redraw=function(cell){
if(!this.selecting){
this.setRangeWithDomNodes(cell,cell);
}else{
this.changeEndCellWithDomNode(cell);
}
this.alignBoxes();
};
nitobi.grid.Selection.prototype.changeStartCellWithDomNode=function(cell){
this.startCell=cell;
this.changeStartCell(nitobi.grid.Cell.getRowNumber(cell),nitobi.grid.Cell.getColumnNumber(cell));
};
nitobi.grid.Selection.prototype.changeEndCellWithDomNode=function(cell){
this.endCell=cell;
this.changeEndCell(nitobi.grid.Cell.getRowNumber(cell),nitobi.grid.Cell.getColumnNumber(cell));
};
nitobi.grid.Selection.prototype.init=function(cell){
this.createBoxes();
var t=new Date();
this.selecting=true;
this.setRangeWithDomNodes(cell,cell);
};
nitobi.grid.Selection.prototype.clear=function(){
if(!this.box){
return;
}
this.box.style.display="none";
this.box.style.top="-1000px";
this.box.style.left="-1000px";
this.box.style.width="1px";
this.box.style.height="1px";
this.boxtl.style.display="none";
this.boxtl.style.top="-1000px";
this.boxtl.style.left="-1000px";
this.boxtl.style.width="1px";
this.boxtl.style.height="1px";
this.boxt.style.display="none";
this.boxt.style.top="-1000px";
this.boxt.style.left="-1000px";
this.boxt.style.width="1px";
this.boxt.style.height="1px";
this.boxl.style.display="none";
this.boxl.style.top="-1000px";
this.boxl.style.left="-1000px";
this.boxl.style.width="1px";
this.boxl.style.height="1px";
this.selecting=false;
};
nitobi.grid.Selection.prototype.handleClick=function(evt){
if(!this.selected()){
if(NTB_SINGLECLICK==null){
NTB_SINGLECLICK=window.setTimeout(nitobi.lang.close(this,this.edit,[{"keyCode":evt.keyCode,"ctrlKey":evt.ctrlKey,"shiftKey":evt.shiftKey}]),150);
}
}else{
this.collapse();
}
};
nitobi.grid.Selection.prototype.handleDblClick=function(evt){
if(!this.selected()){
window.clearTimeout(NTB_SINGLECLICK);
NTB_SINGLECLICK=null;
if(this.owner.handleDblClick(evt)){
this.edit(evt);
}
}else{
this.collapse();
}
};
nitobi.grid.Selection.prototype.edit=function(evt){
NTB_SINGLECLICK=null;
this.owner.edit(evt);
};
nitobi.grid.Selection.prototype.select=function(_472,_473){
this.selectWithCoords(_472.getRowNumber(),_472.getColumnNumber(),_473.getRowNumber(),_473.getColumnNumber());
};
nitobi.grid.Selection.prototype.selectWithCoords=function(_474,_475,_476,_477){
this.setRange(_474,_475,_476,_477);
this.createBoxes();
this.alignBoxes();
};
nitobi.grid.Selection.prototype.stopSelecting=function(evt){
this.selecting=true;
if(!this.selected()){
this.collapse(this.startCell);
}
this.selecting=false;
this.owner.handleClick(evt);
};
nitobi.grid.Selection.prototype.getStartCell=function(){
return this.startCell;
};
nitobi.grid.Selection.prototype.getEndCell=function(){
return this.endCell;
};
nitobi.grid.Selection.prototype.getTopLeftCell=function(){
var x=nitobi.grid.Cell.getColumnNumber(this.startCell);
var y=nitobi.grid.Cell.getRowNumber(this.startCell);
var endX=nitobi.grid.Cell.getColumnNumber(this.endCell);
var endY=nitobi.grid.Cell.getRowNumber(this.endCell);
if(endX<x&&endY<y){
x=endX;
y=endY;
}
return new nitobi.grid.Cell(this.owner,y,x);
};
nitobi.grid.Selection.prototype.getBottomRightCell=function(){
var _47d=nitobi.grid.Cell.getColumnNumber(this.startCell);
var _47e=nitobi.grid.Cell.getRowNumber(this.startCell);
var x=nitobi.grid.Cell.getColumnNumber(this.endCell);
var y=nitobi.grid.Cell.getRowNumber(this.endCell);
if(_47d>x&&_47e>y){
x=_47d;
y=_47e;
}
return new nitobi.grid.Cell(this.owner,y,x);
};
nitobi.grid.Selection.prototype.getRowByCoords=function(_481){
return (_481.parentNode.offsetTop/_481.parentNode.offsetHeight);
};
nitobi.grid.Selection.prototype.getColumnByCoords=function(_482){
var _483=(this.indicator?-2:0);
if(_482.parentNode.parentNode.getAttribute("id").substr(0,6)!="freeze"){
_483+=2-(this.freezeColumn*3);
}else{
_483+=2;
}
return Math.floor((_482.sourceIndex-_482.parentNode.sourceIndex-_483)/3);
};
nitobi.grid.Selection.prototype.selected=function(){
return (this.endCell==this.startCell)?false:true;
};
nitobi.grid.Selection.prototype.setRowHeight=function(_484){
this.rowHeight=_484;
};
nitobi.grid.Selection.prototype.getRowHeight=function(){
return this.rowHeight;
};
nitobi.grid.Selection.prototype.dispose=function(){
};
nitobi.grid.Selection.prototype.align=function(_485,_486,_487,_488,oh,ow,oy,ox,show){
oh=oh||0;
ow=ow||0;
oy=oy||0;
ox=ox||0;
var a=_488;
var td,sd,tt,tb,tl,tr,th,tw,st,sb,sl,sr,sh,sw;
if(!_486||!(_486.getBoundingClientRect)){
return;
}
ad=_486.getBoundingClientRect();
bd=_487.getBoundingClientRect();
sd=_485.getBoundingClientRect();
at=ad.top;
ab=ad.bottom;
al=ad.left;
ar=ad.right;
bt=bd.top;
bb=bd.bottom;
bl=bd.left;
br=bd.right;
tt=ad.top;
tb=bd.bottom;
tl=ad.left;
tr=bd.right;
th=Math.abs(tb-tt);
tw=Math.abs(tr-tl);
st=sd.top;
sb=sd.bottom;
sl=sd.left;
sr=sd.right;
sh=Math.abs(sb-st);
sw=Math.abs(sr-sl);
if(a&268435456){
_485.style.height=(Math.max(bb-at,ab-bt)+oh)+"px";
}
if(a&16777216){
_485.style.width=(Math.max(br-al,ar-bl)+ow)+"px";
}
if(a&1048576){
_485.style.top=(nitobi.html.getStyleTop(_485)+Math.min(tt,bt)-st+oy)+"px";
}
if(a&65536){
_485.style.top=(nitobi.html.getStyleTop(_485)+tt-st+th-sh+oy)+"px";
}
if(a&4096){
_485.style.left=(nitobi.html.getStyleLeft(_485)-sl+Math.min(tl,bl)+ox)+"px";
}
if(a&256){
_485.style.left=(nitobi.html.getStyleLeft(_485)-sl+tl+tw-sw+ox)+"px";
}
if(a&16){
_485.style.top=(nitobi.html.getStyleTop(_485)+tt-st+oy+Math.floor((th-sh)/2))+"px";
}
if(a&1){
_485.style.left=(nitobi.html.getStyleLeft(_485)-sl+tl+ox+Math.floor((tw-sw)/2))+"px";
}
};
nitobi.grid.Surface=function(_49d,_49e,_49f){
this.height=_49e;
this.width=_49d;
this.element=_49f;
};
nitobi.grid.Surface.prototype.dispose=function(){
this.element=null;
};
nitobi.grid.TextColumn=function(grid,_4a1){
nitobi.grid.TextColumn.baseConstructor.call(this,grid,_4a1);
this.Interface=grid.API.selectSingleNode("interfaces/interface[@name='EBATextColumn']");
eval(nitobi.xml.transformToString(this.Interface,grid.accessorGeneratorXslProc));
};
nitobi.lang.extend(nitobi.grid.TextColumn,nitobi.grid.Column);
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.Toolbars=function(_4a2){
this.uid="nitobiToolbar_"+nitobi.base.getUid();
this.toolbars={};
this.visibleToolbars=_4a2;
};
nitobi.ui.Toolbars.VisibleToolbars={};
nitobi.ui.Toolbars.VisibleToolbars.STANDARD=1;
nitobi.ui.Toolbars.VisibleToolbars.PAGING=1<<1;
nitobi.ui.Toolbars.prototype.initialize=function(){
this.enabled=true;
this.toolbarXml=nitobi.xml.createXmlDoc(nitobi.xml.serialize(nitobi.grid.toolbarDoc));
this.toolbarPagingXml=nitobi.xml.createXmlDoc(nitobi.xml.serialize(nitobi.grid.pagingToolbarDoc));
};
nitobi.ui.Toolbars.prototype.attachToParent=function(_4a3){
this.initialize();
this.container=_4a3;
if(this.standardToolbar==null&&this.visibleToolbars){
this.makeToolbar();
this.render();
}
};
nitobi.ui.Toolbars.prototype.setWidth=function(_4a4){
this.width=_4a4;
};
nitobi.ui.Toolbars.prototype.getWidth=function(){
return this.width;
};
nitobi.ui.Toolbars.prototype.setRowInsertEnabled=function(_4a5){
this.rowInsertEnabled=_4a5;
};
nitobi.ui.Toolbars.prototype.isRowInsertEnabled=function(){
return this.rowInsertEnabled;
};
nitobi.ui.Toolbars.prototype.setRowDeleteEnabled=function(_4a6){
this.rowDeleteEnabled=_4a6;
};
nitobi.ui.Toolbars.prototype.isRowDeleteEnabled=function(){
return this.rowDeleteEnabled;
};
nitobi.ui.Toolbars.prototype.makeToolbar=function(){
var _4a7=this.findCssUrl();
this.toolbarXml.documentElement.setAttribute("id","toolbar"+this.uid);
this.toolbarXml.documentElement.setAttribute("image_directory",_4a7);
var _4a8=this.toolbarXml.selectNodes("/toolbar/items/*");
for(var i=0;i<_4a8.length;i++){
if(_4a8[i].nodeType!=8){
_4a8[i].setAttribute("id",_4a8[i].getAttribute("id")+this.uid);
}
}
this.standardToolbar=new nitobi.ui.Toolbar(this.toolbarXml,"toolbar"+this.uid);
this.toolbarPagingXml.documentElement.setAttribute("id","toolbarpaging"+this.uid);
this.toolbarPagingXml.documentElement.setAttribute("image_directory",_4a7);
_4a8=(this.toolbarPagingXml.selectNodes("/toolbar/items/*"));
for(var i=0;i<_4a8.length;i++){
if(_4a8[i].nodeType!=8){
_4a8[i].setAttribute("id",_4a8[i].getAttribute("id")+this.uid);
}
}
this.pagingToolbar=new nitobi.ui.Toolbar(this.toolbarPagingXml,"toolbarpaging"+this.uid);
};
nitobi.ui.Toolbars.prototype.getToolbar=function(id){
return eval("this."+id);
};
nitobi.ui.Toolbars.prototype.findCssUrl=function(){
var _4ab=nitobi.html.Css.findParentStylesheet(".EbaToolbar");
if(_4ab==null){
_4ab=nitobi.html.Css.findParentStylesheet(".ntbgrid");
if(_4ab==null){
nitobi.lang.throwError("The CSS for the toolbar could not be found.  Try moving the nitobi.grid.css file to a location accessible to the browser's javascript or moving it to the top of the stylesheet list. findParentStylesheet returned "+_4ab);
}
}
return nitobi.html.Css.getPath(_4ab);
};
nitobi.ui.Toolbars.prototype.isToolbarEnabled=function(){
return this.enabled;
};
nitobi.ui.Toolbars.prototype.render=function(){
var _4ac=this.container;
_4ac.style.visibility="hidden";
var xsl=nitobi.ui.ToolbarXsl;
if(xsl.indexOf("xsl:stylesheet")==-1){
xsl="<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:output method=\"xml\" version=\"4.0\" />"+xsl+"</xsl:stylesheet>";
}
var _4ae=nitobi.xml.createXslDoc(xsl);
var _4af=nitobi.xml.transformToString(this.standardToolbar.getXml(),_4ae,"xml");
_4ac.innerHTML=_4af;
_4ac.style.zIndex="1000";
var _4b0=nitobi.xml.transformToString(this.pagingToolbar.getXml(),_4ae,"xml");
_4ac.innerHTML+=_4b0;
_4ae=null;
xmlDoc=null;
this.standardToolbar.attachToTag();
this.standardToolbar.dockEvent=nitobi.lang.close(this,this.onToolbarDock);
this.standardToolbar.undockEvent=nitobi.lang.close(this,this.onToolbarUnDock);
this.pagingToolbar.attachToTag();
this.pagingToolbar.dockEvent=nitobi.lang.close(this,this.onToolbarDock);
this.pagingToolbar.undockEvent=nitobi.lang.close(this,this.onToolbarUnDock);
this.resize();
var _4b1=this;
var _4b2=this.standardToolbar.getUiElements();
_4b2["save"+this.uid].onClick=function(){
_4b1.fire("Save");
};
_4b2["newRecord"+this.uid].onClick=function(){
_4b1.fire("InsertRow");
};
if(!this.isRowInsertEnabled()){
_4b2["newRecord"+this.uid].disable();
}
_4b2["deleteRecord"+this.uid].onClick=function(){
_4b1.fire("DeleteRow");
};
if(!this.isRowDeleteEnabled()){
_4b2["deleteRecord"+this.uid].disable();
}
_4b2["refresh"+this.uid].onClick=function(){
var _4b3=confirm("Refreshing will discard any changes you have made. Is it OK to refresh?");
if(_4b3){
_4b1.fire("Refresh");
}
};
var _4b4=this.pagingToolbar.getUiElements();
var _4b1=this;
_4b4["previousPage"+this.uid].onClick=function(){
_4b1.fire("PreviousPage");
};
_4b4["previousPage"+this.uid].disable();
_4b4["nextPage"+this.uid].onClick=function(){
_4b1.fire("NextPage");
};
if(this.visibleToolbars&nitobi.ui.Toolbars.VisibleToolbars.STANDARD){
this.standardToolbar.show();
}else{
this.standardToolbar.hide();
}
if(this.visibleToolbars&nitobi.ui.Toolbars.VisibleToolbars.PAGING){
this.pagingToolbar.show();
}else{
this.pagingToolbar.hide();
}
_4ac.style.visibility="visible";
};
nitobi.ui.Toolbars.prototype.resize=function(){
var _4b5=this.getWidth();
if(this.visibleToolbars&nitobi.ui.Toolbars.VisibleToolbars.PAGING){
_4b5=_4b5-2-parseInt(this.pagingToolbar.getWidth());
}
if(this.visibleToolbars&nitobi.ui.Toolbars.VisibleToolbars.STANDARD){
this.standardToolbar.setWidth(_4b5);
}
};
nitobi.ui.Toolbars.prototype.onToolbarDock=function(){
if(this.containerEmpty&&!this.areAllToolbarsDocked()){
this.fire("ToolbarsContainerNotEmpty");
}
this.containerEmpty=false;
};
nitobi.ui.Toolbars.prototype.areAllToolbarsDocked=function(){
return ((this.pagingToolbar!=null&&this.pagingToolbar.isFloating()||!this.pagingToolbar.isVisible())&&(this.standardToolbar!=null&&this.standardToolbar.isFloating()||!this.standardToolbar.isVisible()));
};
nitobi.ui.Toolbars.prototype.areAnyToolbarsDocked=function(){
return ((this.pagingToolbar!=null&&!this.pagingToolbar.isFloating()&&this.pagingToolbar.isVisible())||(this.standardToolbar!=null&&!this.standardToolbar.isFloating()&&this.standardToolbar.isVisible()));
};
nitobi.ui.Toolbars.prototype.onToolbarUnDock=function(){
if(this.areAllToolbarsDocked()){
this.fire("ToolbarsContainerEmpty");
this.containerEmpty=true;
}else{
this.containerEmpty=false;
}
};
nitobi.ui.Toolbars.prototype.fire=function(evt,args){
return nitobi.event.notify(evt+this.uid,args);
};
nitobi.ui.Toolbars.prototype.subscribe=function(evt,func,_4ba){
if(typeof (_4ba)=="undefined"){
_4ba=this;
}
return nitobi.event.subscribe(evt+this.uid,nitobi.lang.close(_4ba,func));
};
nitobi.ui.Toolbars.prototype.dispose=function(){
this.toolbarXml=null;
this.toolbarPagingXml=null;
if(this.toolbar&&this.toolbar.dispose){
this.toolbar.dispose();
this.toolbar=null;
}
if(this.toolbarPaging&&this.toolbarPaging.dispose){
this.toolbarPaging.dispose();
this.toolbarPaging=null;
}
};
var EBA_SELECTION_BUFFER=15;
var NTB_SINGLECLICK=null;
nitobi.grid.Viewport=function(grid,_4bc,_4bd,_4be,top,_4c0,_4c1,left,_4c3,_4c4,_4c5){
this.disposal=[];
this.height=_4bd;
this.width=_4be;
this.surface=_4c4||new nitobi.grid.Surface();
this.element=_4c3;
this.rowHeight=23;
this.headerHeight=23;
this.sortColumn=0;
this.sortDir=1;
this.uid=nitobi.base.getUid();
this.region=_4bc;
top=(Boolean(top)&&!isNaN(top)?top:0);
this.top=Math.min(Math.max(0,top),_4bd);
this.bottom=Math.min(Math.max(0,_4c1),_4bd-this.top);
this.mid=Math.max(0,_4bd-this.top-this.bottom);
this.left=Math.min(Math.max(0,left),_4be);
this.right=Math.min(Math.max(0,_4c0),_4be-this.left);
this.center=Math.max(0,_4be-this.left-this.right);
this.scrollIncrement=0;
this.grid=grid;
this.startRow=0;
this.rows=0;
this.startColumn=0;
this.columns=0;
this.rowRenderer=null;
this.onHtmlReady=new nitobi.base.Event();
};
nitobi.grid.Viewport.prototype.mapToHtml=function(_4c6,_4c7,_4c8){
this.surface=_4c7;
this.element=_4c6;
this.container=nitobi.html.getFirstChild(_4c7);
this.makeLastBlock(0,this.grid.getRowsPerPage()*5);
};
nitobi.grid.Viewport.prototype.makeLastBlock=function(low,high){
if(this.lastEmptyBlock==null&&this.grid&&this.region>2&&this.region<5&&this.container){
if(this.container.lastChild){
low=Math.max(low,this.container.lastChild.bottom);
}
this.lastEmptyBlock=this.renderEmptyBlock(low,high);
}
};
nitobi.grid.Viewport.prototype.setCellRanges=function(_4cb,rows,_4cd,_4ce){
this.startRow=_4cb;
this.rows=rows;
this.startColumn=_4cd;
this.columns=_4ce;
this.makeLastBlock(this.startRow,this.startRow+rows-1);
if(this.lastEmptyBlock!=null&&this.region>2&&this.region<5&&this.rows>0){
var _4cf=this.startRow+this.rows-1;
if(this.lastEmptyBlock.top>_4cf){
this.container.removeChild(this.lastEmptyBlock);
this.lastEmptyBlock=null;
}else{
this.lastEmptyBlock.bottom=_4cf;
this.lastEmptyBlock.style.height=(this.rowHeight*(this.lastEmptyBlock.bottom-this.lastEmptyBlock.top+1))+"px";
if(this.lastEmptyBlock.bottom<this.lastEmptyBlock.top){
throw "blocks are miss aligned.";
}
}
}
};
nitobi.grid.Viewport.prototype.setPosition=function(_4d0,_4d1,top,_4d3,_4d4,left){
this.height=_4d0;
this.width=_4d1;
if(this.region==3){
ntbAssert(top>=0&&_4d0>=0,"top and height are incorrectly defined in viewport.setPosition. Viewport region: "+this.region+". (top,height) = "+top+","+_4d0);
}
this.top=Math.min(Math.max(0,top),_4d0);
this.bottom=Math.min(Math.max(0,_4d4),_4d0-this.top);
this.mid=Math.max(0,_4d0-this.top-this.bottom);
this.left=Math.min(Math.max(0,left),_4d1);
this.right=Math.min(Math.max(0,_4d3),_4d1-this.left);
this.center=Math.max(0,_4d1-this.left-this.right);
};
nitobi.grid.Viewport.prototype.clear=function(_4d6,_4d7,_4d8,_4d9){
var uid=this.grid.uid;
if(this.surface&&_4d6){
this.surface.innerHTML="<div id=\"gridvpcontainer_"+this.region+"_"+uid+"\"></div>";
}
if(this.element&&_4d9){
this.element.innerHTML="<div id=\"gridvpsurface_"+this.region+"_"+uid+"\"><div id=\"gridvpcontainer_"+this.region+"_"+uid+"\"></div></div>";
}
if(this.surface&&_4d8){
this.surface.innerHTML="<div id=\"gridvpcontainer_"+this.region+"_"+uid+"\"></div>";
}
this.surface=nitobi.html.getFirstChild(this.element);
this.container=nitobi.html.getFirstChild(this.surface);
if(this.grid&&this.region>2&&this.region<5){
this.lastEmptyBlock=null;
}
this.makeLastBlock(0,this.grid.getRowsPerPage()*5);
};
nitobi.grid.Viewport.prototype.setSort=function(_4db,_4dc){
this.sortColumn=_4db;
this.sortDir=_4dc;
};
nitobi.grid.Viewport.prototype.renderGap=function(top,_4de){
var _4df=this.grid.activeCell;
var _4e0=0,_4e1=0;
if(_4df!=null){
_4e0=nitobi.grid.Cell.getColumnNumber(_4df);
_4e1=nitobi.grid.Cell.getRowNumber(_4df);
}
var _4e2=this.findBlock(top);
var o=this.renderInsideEmptyBlock(top,_4de,_4e2);
if(o==null){
return;
}
o.setAttribute("rendered","true");
var rows=_4de-top+1;
o.innerHTML=this.rowRenderer.render(top,rows,_4e0,_4e1,this.sortColumn,this.sortDir);
this.onHtmlReady.notify(this);
};
nitobi.grid.Viewport.prototype.findBlock=function(row){
var blk=this.container.childNodes;
for(var i=0;i<blk.length;i++){
if(row>=blk[i].top&&row<=blk[i].bottom){
return blk[i];
}
}
};
nitobi.grid.Viewport.prototype.findBlockAtCoord=function(top){
var blk=this.container.childNodes;
for(var i=0;i<blk.length;i++){
var rt=blk[i].offsetTop;
var rb=rt+blk[i].offsetHeight;
if(top>=rt&&top<=rb){
return blk[i];
}
}
};
nitobi.grid.Viewport.prototype.getBlocks=function(_4ed,_4ee){
var _4ef=[];
var _4f0=this.findBlock(_4ed);
var _4f1=_4f0;
_4ef.push(_4f0);
while(_4ee>_4f1.bottom){
var _4f2=_4f1.nextSibling;
if(_4f2!=null){
_4f1=_4f2;
}else{
break;
}
_4ef.push(_4f1);
}
return _4ef;
};
nitobi.grid.Viewport.prototype.clearBlocks=function(_4f3,_4f4){
var _4f5=this.getBlocks(_4f3,_4f4);
var len=_4f5.length;
var top=_4f5[0].top;
var _4f8=_4f5[len-1].bottom;
var _4f9=_4f5[len-1].nextSibling;
for(var i=0;i<len;i++){
_4f5[i].parentNode.removeChild(_4f5[i]);
}
this.renderEmptyBlock(top,_4f8,_4f9);
return {"top":top,"bottom":_4f8};
};
nitobi.grid.Viewport.prototype.renderInsideEmptyBlock=function(top,_4fc,_4fd){
if(_4fd==null){
return this.renderBlock(top,_4fc);
}
if(top==_4fd.top&&_4fc>=_4fd.bottom){
var _4fe=this.renderBlock(top,_4fc,_4fd);
this.container.replaceChild(_4fe,_4fd);
if(_4fd.bottom<_4fd.top){
throw "Render error";
}
return _4fe;
}
if(top==_4fd.top&&_4fc<_4fd.bottom){
_4fd.top=_4fc+1;
_4fd.style.height=(this.rowHeight*(_4fd.bottom-_4fd.top+1))+"px";
_4fd.rows=_4fd.bottom-_4fd.top+1;
if(_4fd.bottom<_4fd.top){
throw "Render error";
}
return this.renderBlock(top,_4fc,_4fd);
}
if(top>_4fd.top&&_4fc>=_4fd.bottom){
_4fd.bottom=top-1;
_4fd.style.height=(this.rowHeight*(_4fd.bottom-_4fd.top+1))+"px";
if(_4fd.bottom<_4fd.top){
throw "Render error";
}
return this.renderBlock(top,_4fc,_4fd.nextSibling);
}
if(top>_4fd.top&&_4fc<_4fd.bottom){
var _4ff=this.renderEmptyBlock(_4fd.top,top-1,_4fd);
_4fd.top=_4fc+1;
_4fd.style.height=(this.rowHeight*(_4fd.bottom-_4fd.top+1))+"px";
if(_4fd.bottom<_4fd.top){
throw "Render error";
}
return this.renderBlock(top,_4fc,_4fd);
}
throw "Could not insert "+top+"-"+_4fc+_4fd.outerHTML;
};
nitobi.grid.Viewport.prototype.renderEmptyBlock=function(top,_501,_502){
var o=this.renderBlock(top,_501,_502);
o.setAttribute("id","eba_grid_emptyblock_"+this.region+"_"+top+"_"+_501+"_"+this.grid.uid);
if(top==0&&_501==99){
crash;
}
o.setAttribute("rendered","false");
o.style.height=((_501-top+1)*this.rowHeight)+"px";
return o;
};
nitobi.grid.Viewport.prototype.renderBlock=function(top,_505,_506){
var o=document.createElement("div");
o.setAttribute("id","eba_grid_block_"+this.region+"_"+top+"_"+_505+"_"+this.grid.uid);
o.top=top;
o.bottom=_505;
o.left=this.startColumn;
o.right=this.startColumn+this.columns;
o.rows=_505-top+1;
o.columns=this.columns;
if(_506){
this.container.insertBefore(o,_506);
}else{
this.container.insertBefore(o,null);
}
return o;
};
nitobi.grid.Viewport.prototype.setHeaderHeight=function(_508){
this.headerHeight=_508;
};
nitobi.grid.Viewport.prototype.setRowHeight=function(_509){
this.rowHeight=_509;
};
nitobi.grid.Viewport.prototype.dispose=function(){
this.element=null;
this.container=null;
nitobi.lang.dispose(this,this.disposal);
return;
};
nitobi.grid.Viewport.prototype.fire=function(evt,args){
return nitobi.event.notify(evt+this.uid,args);
};
nitobi.grid.Viewport.prototype.subscribe=function(evt,func,_50e){
if(typeof (_50e)=="undefined"){
_50e=this;
}
return nitobi.event.subscribe(evt+this.uid,nitobi.lang.close(_50e,func));
};
nitobi.grid.Viewport.prototype.attach=function(evt,func,_511){
return nitobi.html.attachEvent(_511,evt,nitobi.lang.close(this,func));
};
nitobi.lang.defineNs("nitobi.data");
if(false){
nitobi.data=function(){
};
}
nitobi.data.DATAMODE_UNBOUND="unbound";
nitobi.data.DATAMODE_LOCAL="local";
nitobi.data.DATAMODE_REMOTE="remote";
nitobi.data.DATAMODE_CACHING="caching";
nitobi.data.DATAMODE_STATIC="static";
nitobi.data.DATAMODE_PAGING="paging";
nitobi.data.DataSet=function(){
var _512="http://www.nitobi.com";
this.doc=nitobi.xml.createXmlDoc("<"+nitobi.xml.nsPrefix+"datasources xmlns:ntb=\""+_512+"\"></"+nitobi.xml.nsPrefix+"datasources>");
};
nitobi.data.DataSet.prototype.initialize=function(){
this.tables=new Array();
};
nitobi.data.DataSet.prototype.add=function(_513){
this.tables[_513.id]=_513;
};
nitobi.data.DataSet.prototype.getTable=function(_514){
return this.tables[_514];
};
nitobi.data.DataSet.prototype.xmlDoc=function(){
var root=this.doc.documentElement;
while(root.hasChildNodes()){
root.removeChild(root.firstChild);
}
for(var i in this.tables){
if(this.tables[i].xmlDoc&&this.tables[i].xmlDoc.documentElement){
var _517=this.tables[i].xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource").cloneNode(true);
this.doc.selectSingleNode("/"+nitobi.xml.nsPrefix+"datasources").appendChild(_517);
}
}
return this.doc;
};
nitobi.data.DataSet.prototype.dispose=function(){
for(var _518 in this.tables){
this.tables[_518].dispose();
}
};
nitobi.lang.defineNs("nitobi.data");
nitobi.data.DataTable=function(mode,_51a,_51b,_51c,_51d){
if(_51a==null){
}
this.estimateRowCount=_51a;
this.version=3;
this.uid=nitobi.base.getUid();
this.mode=mode||"caching";
this.setAutoKeyEnabled(_51d);
this.columns=new Array();
this.keys=new Array();
this.types=new Array();
this.defaults=new Array();
this.columnsConfigured=false;
this.pagingConfigured=false;
this.id="_default";
this.fieldMap={};
if(_51b){
this.saveHandlerArgs=_51b;
}else{
this.saveHandlerArgs={};
}
if(_51c){
this.getHandlerArgs=_51c;
}else{
this.getHandlerArgs={};
}
this.setGetHandlerParameter("RequestType","GET");
this.setSaveHandlerParameter("RequestType","SAVE");
this.batchInsert=false;
this.batchInsertRowCount=0;
};
nitobi.data.DataTable.DEFAULT_LOG="<"+nitobi.xml.nsPrefix+"grid "+nitobi.xml.nsDecl+"><"+nitobi.xml.nsPrefix+"datasources id='id'><"+nitobi.xml.nsPrefix+"datasource id=\"{id}\"><"+nitobi.xml.nsPrefix+"datasourcestructure /><"+nitobi.xml.nsPrefix+"data id=\"_default\"></"+nitobi.xml.nsPrefix+"data></"+nitobi.xml.nsPrefix+"datasource></"+nitobi.xml.nsPrefix+"datasources></"+nitobi.xml.nsPrefix+"grid>";
nitobi.data.DataTable.DEFAULT_DATA="<"+nitobi.xml.nsPrefix+"datasource "+nitobi.xml.nsDecl+" id=\"{id}\"><"+nitobi.xml.nsPrefix+"datasourcestructure FieldNames=\"{fields}\" Keys=\"{keys}\" types=\"{types}\" defaults=\"{defaults}\"></"+nitobi.xml.nsPrefix+"datasourcestructure><"+nitobi.xml.nsPrefix+"data id=\"{id}\"></"+nitobi.xml.nsPrefix+"data></"+nitobi.xml.nsPrefix+"datasource>";
nitobi.data.DataTable.prototype.initialize=function(_51e,_51f,_520,_521,_522,sort,_524,_525,_526){
this.setGetHandlerParameter("TableId",_51e);
this.setSaveHandlerParameter("TableId",_51e);
this.id=_51e;
this.datastructure=null;
this.descriptor=new nitobi.data.DataTableDescriptor(this,nitobi.lang.close(this,this.syncRowCount),this.estimateRowCount);
this.pageFirstRow=0;
this.pageRowCount=0;
this.pageSize=_522;
this.minPageSize=10;
this.requestCache=new nitobi.collections.CacheMap(-1,-1);
this.dataCache=new nitobi.collections.CacheMap(-1,-1);
this.flush();
this.sortColumn=sort;
this.sortDir=_524||"Asc";
this.filter=new Array();
this.onGenerateKey=_525;
this.remoteRowCount=0;
this.setRowCountKnown(false);
if(_521==null){
_521=0;
}
if(this.mode!="unbound"){
if(_51f!=null){
this.ajaxCallbackPool=new nitobi.ajax.HttpRequestPool(nitobi.ajax.HttpRequestPool_MAXCONNECTIONS);
this.ajaxCallbackPool.context=this;
this.setGetHandler(_51f);
this.setSaveHandler(_520);
}
this.ajaxCallback=new nitobi.ajax.HttpRequest();
this.ajaxCallback.responseType="xml";
}else{
if(_51f!=null&&typeof (_51f)!="string"){
this.initializeXml(_51f);
}
}
this.sortXslProc=nitobi.xml.createXslProcessor(nitobi.data.sortXslProc.stylesheet);
this.requestQueue=new Array();
this.async=true;
};
nitobi.data.DataTable.prototype.setOnGenerateKey=function(_527){
this.onGenerateKey=_527;
};
nitobi.data.DataTable.prototype.getOnGenerateKey=function(){
return this.onGenerateKey;
};
nitobi.data.DataTable.prototype.setAutoKeyEnabled=function(val){
this.autoKeyEnabled=val;
};
nitobi.data.DataTable.prototype.isAutoKeyEnabled=function(){
return this.autoKeyEnabled;
};
nitobi.data.DataTable.prototype.initializeXml=function(oXml){
this.replaceData(oXml);
var rows=this.xmlDoc.selectNodes("//"+nitobi.xml.nsPrefix+"e").length;
if(rows>0){
var s=this.xmlDoc.xml;
s=nitobi.xml.transformToString(this.xmlDoc,this.sortXslProc,"xml");
this.xmlDoc=nitobi.xml.loadXml(this.xmlDoc,s);
this.dataCache.insert(0,rows-1);
if(this.mode=="local"){
this.setRowCountKnown(true);
}
}
this.setRemoteRowCount(rows);
this.fire("DataInitalized");
};
nitobi.data.DataTable.prototype.initializeXmlData=function(oXml){
var sXml=oXml;
if(typeof (oXml)=="object"){
sXml=oXml.xml;
}
sXml=sXml.replace(/fieldnames=/g,"FieldNames=").replace(/keys=/g,"Keys=");
this.xmlDoc=nitobi.xml.loadXml(this.xmlDoc,sXml);
this.datastructure=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"datasourcestructure");
};
nitobi.data.DataTable.prototype.replaceData=function(oXml){
this.initializeXmlData(oXml);
var _52f=this.datastructure.getAttribute("FieldNames");
var keys=this.datastructure.getAttribute("Keys");
var _531=this.datastructure.getAttribute("Defaults");
var _532=this.datastructure.getAttribute("Types");
this.initializeColumns(_52f,keys,_532,_531);
};
nitobi.data.DataTable.prototype.initializeSchema=function(){
var _533=this.columns.join("|");
var keys=this.keys.join("|");
var _535=this.defaults.join("|");
var _536=this.types.join("|");
this.dataCache.flush();
this.xmlDoc=nitobi.xml.loadXml(this.xmlDoc,nitobi.data.DataTable.DEFAULT_DATA.replace(/\{id\}/g,this.id).replace(/\{fields\}/g,_533).replace(/\{keys\}/g,keys).replace(/\{defaults\}/g,_535).replace(/\{types\}/g,_536));
this.datastructure=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"datasourcestructure");
};
nitobi.data.DataTable.prototype.initializeColumns=function(_537,keys,_539,_53a){
if(null!=_537){
var _53b=this.columns.join("|");
if(_53b==_537){
return;
}
this.columns=_537.split("|");
}
if(null!=keys){
this.keys=keys.split("|");
}
if(null!=_539){
this.types=_539.split("|");
}
if(null!=_53a){
this.defaults=_53a.split("|");
}
if(this.xmlDoc.documentElement==null){
this.initializeSchema();
}
this.datastructure=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"datasourcestructure");
var ds=this.datastructure;
if(_537){
ds.setAttribute("FieldNames",_537);
}
if(keys){
ds.setAttribute("Keys",keys);
}
if(_53a){
ds.setAttribute("Defaults",_53a);
}
if(_539){
ds.setAttribute("Types",_539);
}
this.makeFieldMap();
this.fire("ColumnsInitialized");
};
nitobi.data.DataTable.prototype.getTemplateNode=function(_53d){
var _53e=null;
if(_53d==null){
_53d=this.defaults;
}
_53e=nitobi.xml.createElement(this.xmlDoc,"e");
for(var i=0;i<this.columns.length;i++){
var _540=(i>25?String.fromCharCode(Math.floor(i/26)+97):"")+(String.fromCharCode(i%26+97));
if(this.defaults[i]==null){
_53e.setAttribute(_540,"");
}else{
_53e.setAttribute(_540,this.defaults[i]);
}
}
return _53e;
};
nitobi.data.DataTable.prototype.commitProperties=function(){
if(this.mode=="unbound"){
}
};
nitobi.data.DataTable.prototype.flush=function(){
if(this.mode=="caching"||this.mode=="paging"){
this.dataCache.flush();
}
if(this.mode!="unbound"){
this.requestCache.flush();
}
this.flushLog();
this.xmlDoc=nitobi.xml.createXmlDoc();
};
nitobi.data.DataTable.prototype.join=function(_541,_542,_543,_544){
};
nitobi.data.DataTable.prototype.merge=function(xd){
};
nitobi.data.DataTable.prototype.getField=function(_546,_547){
var r=this.getRecord(_546);
var a=this.fieldMap[_547];
if(a&&r){
return r.getAttribute(a.substring(1));
}else{
return null;
}
};
nitobi.data.DataTable.prototype.getRecord=function(_54a){
var data=this.xmlDoc.selectNodes("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data/"+nitobi.xml.nsPrefix+"e[@xi='"+_54a+"']");
if(data.length==0){
return null;
}
return data[0];
};
nitobi.data.DataTable.prototype.beginBatchInsert=function(){
this.batchInsert=true;
this.batchInsertRowCount=0;
};
nitobi.data.DataTable.prototype.commitBatchInsert=function(){
this.batchInsert=false;
var _54c=this.batchInsertRowCount;
this.batchInsertRowCount=0;
this.setRemoteRowCount(this.remoteRowCount+_54c);
if(_54c>0){
this.fire("RowInserted",_54c);
}
};
nitobi.data.DataTable.prototype.createRecord=function(_54d,_54e){
var xi=_54e;
this.adjustXi(parseInt(xi),1);
var data=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data");
var _551=_54d||this.getTemplateNode();
var _552=nitobi.component.getUniqueId();
var _553=_551.cloneNode(true);
_553.setAttribute("xi",xi);
_553.setAttribute("xid",_552);
_553.setAttribute("xac","i");
if(this.onGenerateKey){
var _554=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasourcestructure").getAttribute("Keys").split("|");
var xml=null;
for(var j=0;j<_554.length;j++){
var _557=this.fieldMap[_554[j]].substring(1);
var _558=_553.getAttribute(_557);
if(!_558||_558==""){
if(!xml){
xml=eval(this.onGenerateKey);
}
if(typeof (xml)=="string"||typeof (xml)=="number"){
_553.setAttribute(_557,xml);
}else{
try{
var ck1=j%26;
var ck2=Math.floor(j/26);
var _55b=(ck2>0?String.fromCharCode(96+ck2):"")+String.fromCharCode(97+ck1);
_553.setAttribute(_557,xml.selectSingleNode("//"+nitobi.xml.nsPrefix+"e").getAttribute(_55b));
}
catch(e){
}
}
}
}
}
data.appendChild(_553);
if(this.log!=null){
var _55c=_553.cloneNode(true);
_55c.setAttribute("xac","i");
_55c.setAttribute("xid",_552);
this.logData.appendChild(_55c);
}
this.dataCache.insertIntoRange(_54e);
this.batchInsertRowCount++;
if(!this.batchInsert){
this.commitBatchInsert();
}
return _553;
};
nitobi.data.DataTable.prototype.updateRecord=function(xi,_55e,_55f){
var _560=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"e[@xi='"+xi+"']");
var xid=_560.getAttribute("xid")||"error - unknown xid";
var _562=(_560.getAttribute(_55e)!=_55f);
if(!_562){
return;
}
if(_560.getAttribute(_55e)==null&&this.fieldMap[_55e]!=null){
_560.setAttribute(this.fieldMap[_55e].substring(1),_55f);
}else{
_560.setAttribute(_55e,_55f);
}
var _563="u";
var _564="u";
if(null==this.log){
this.flushLog();
}
var _565=_560.cloneNode(true);
_565.setAttribute("xac","u");
this.logData=this.log.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data");
var _566=this.logData.selectSingleNode("./"+nitobi.xml.nsPrefix+"e[@xid='"+xid+"']");
if(null==_566){
this.logData.appendChild(_565);
_565.setAttribute("xid",xid);
}else{
_565.setAttribute("xac",_566.getAttribute("xac"));
this.logData.replaceChild(_565,_566);
}
if((true==this.AutoSave)){
this.save();
}
};
nitobi.data.DataTable.prototype.deleteRecord=function(_567){
var data=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data");
this.logData=this.log.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data");
var _569=data.selectSingleNode("*[@xi = '"+_567+"']");
if(_569==null){
throw "Index out of bounds in delete.";
}
var xDel=this.logData.selectSingleNode("*[@xi='"+_567+"']");
var sTag="";
if(xDel!=null){
sTag=xDel.getAttribute("xac");
this.logData.removeChild(xDel);
}
if(sTag!="i"){
var _56c=_569.cloneNode(true);
_56c.setAttribute("xac","d");
this.logData.appendChild(_56c);
}
data.removeChild(_569);
this.adjustXi(parseInt(_567)+1,-1);
this.dataCache.removeFromRange(_567);
this.setRemoteRowCount(this.remoteRowCount-1);
this.fire("RowDeleted");
};
nitobi.data.DataTable.prototype.adjustXi=function(_56d,_56e){
nitobi.data.adjustXiXslProc.addParameter("startingIndex",_56d,"");
nitobi.data.adjustXiXslProc.addParameter("adjustment",_56e,"");
this.xmlDoc=nitobi.xml.loadXml(this.xmlDoc,nitobi.xml.transformToString(this.xmlDoc,nitobi.data.adjustXiXslProc,"xml"));
if(this.log!=null){
this.log=nitobi.xml.loadXml(this.log,nitobi.xml.transformToString(this.log,nitobi.data.adjustXiXslProc,"xml"));
this.logData=this.log.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data");
}
};
nitobi.data.DataTable.prototype.setGetHandler=function(val){
this.getHandler=val;
for(var name in this.getHandlerArgs){
this.setGetHandlerParameter(name,this.getHandlerArgs[name]);
}
};
nitobi.data.DataTable.prototype.getGetHandler=function(){
return this.getHandler;
};
nitobi.data.DataTable.prototype.setSaveHandler=function(val){
this.postHandler=val;
for(var name in this.saveHandlerArgs){
this.setSaveHandlerParameter(name,this.saveHandlerArgs[name]);
}
};
nitobi.data.DataTable.prototype.getSaveHandler=function(){
return this.postHandler;
};
nitobi.data.DataTable.prototype.save=function(_573,_574){
if(!eval(_574||"true")){
return;
}
try{
if(this.version==2.8){
var _575=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasourcestructure").getAttribute("FieldNames").split("|");
var _576=this.log.selectNodes("//"+nitobi.xml.nsPrefix+"e[@xac = 'i']");
for(var i=0;i<_576.length;i++){
for(var j=0;j<_575.length;j++){
var _579=_576[i].getAttribute(this.fieldMap[_575[j]].substring(1));
if(!_579){
_576[i].setAttribute(this.fieldMap[_575[j]].substring(1),"");
}
}
}
var _57a=this.log.selectNodes("//"+nitobi.xml.nsPrefix+"e[@xac = 'u']");
for(var i=0;i<_57a.length;i++){
for(var j=0;j<_575.length;j++){
var _579=_57a[i].getAttribute(this.fieldMap[_575[j]].substring(1));
if(!_579){
_57a[i].setAttribute(this.fieldMap[_575[j]].substring(1),"");
}
}
}
nitobi.data.updategramTranslatorXslProc.addParameter("xkField",this.fieldMap["_xk"].substring(1),"");
nitobi.data.updategramTranslatorXslProc.addParameter("fields",_575.join("|").replace(/\|_xk/,""));
this.log=nitobi.xml.transformToXml(this.log,nitobi.data.updategramTranslatorXslProc);
}
var _57b=this.getSaveHandler();
(_57b.indexOf("?")==-1)?_57b+="?":_57b+="&";
_57b+="TableId="+this.id;
_57b+="&uid="+(new Date().getTime());
var _57c=this.ajaxCallbackPool.reserve();
_57c.handler=_57b;
_57c.responseType="xml";
_57c.context=this;
_57c.completeCallback=nitobi.lang.close(this,this.saveComplete);
_57c.params=new nitobi.data.SaveCompleteEventArgs(_573);
if(this.version>2.8&&this.log.selectNodes("//"+nitobi.xml.nsPrefix+"e[@xac='i']").length>0&&this.isAutoKeyEnabled()){
_57c.async=false;
}
if(this.log.documentElement.nodeName=="root"){
this.log=nitobi.xml.loadXml(this.log,this.log.xml.replace(/xmlns:ntb=\"http:\/\/www.nitobi.com\"/g,""));
var _575=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasourcestructure").getAttribute("FieldNames").split("|");
_575.splice(_575.length-1,1);
_575=_575.join("|");
this.log.documentElement.setAttribute("fields",_575);
this.log.documentElement.setAttribute("keys",_575);
}
if(this.isAutoKeyEnabled()&&this.version<3){
alert("AutoKey is not supported in this schema version. You must upgrade to Nitobi Grid Xml Schema version 3 or greater.");
}
_57c.post(this.log,this);
this.flushLog();
}
catch(err){
throw err;
}
};
nitobi.data.DataTable.prototype.flushLog=function(){
this.log=nitobi.xml.createXmlDoc(nitobi.data.DataTable.DEFAULT_LOG.replace(/\{id\}/g,this.id).replace(/\{fields\}/g,this.columns).replace(/\{keys\}/g,this.keys).replace(/\{defaults\}/g,this.defaults).replace(/\{types\}/g,this.types));
this.logData=this.log.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data");
};
nitobi.data.DataTable.prototype.updateAutoKeys=function(_57d){
try{
var _57e=_57d.selectNodes("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data/"+nitobi.xml.nsPrefix+"e[@xac='i']");
if(typeof (_57e)=="undefined"||_57e==null){
nitobi.lang.throwError("When updating keys from the server for AutoKey support, the inserts could not be parsed.");
}
var keys=_57d.selectNodes("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"datasourcestructure")[0].getAttribute("keys").split("|");
if(typeof (keys)=="undefined"||keys==null||keys.length==0){
nitobi.lang.throwError("When updating keys from the server for AutoKey support, no keys could be found. Ensure that the keys are sent in the request response.");
}
for(var i=0;i<_57e.length;i++){
var _581=this.getRecord(_57e[i].getAttribute("xi"));
for(var j=0;j<keys.length;j++){
var att=this.fieldMap[keys[j]].substring(1);
_581.setAttribute(att,_57e[i].getAttribute(att));
}
}
}
catch(err){
nitobi.lang.throwError("When updating keys from the server for AutoKey support, the inserts could not be parsed.",err);
}
};
nitobi.data.DataTable.prototype.saveComplete=function(_584){
var xd=_584.response;
var _584=_584.params;
try{
if(this.isAutoKeyEnabled()&&this.version>2.8){
this.updateAutoKeys(xd);
}
if(this.version==2.8&&!this.onGenerateKey){
var rows=xd.selectNodes("//insert");
for(var i=0;i<rows.length;i++){
var xk=rows[i].getAttribute("xk");
if(xk!=null){
var _589=this.findWithoutMap("xid",rows[i].getAttribute("xid"))[0];
var key=this.fieldMap["_xk"].substring(1);
_589.setAttribute(key,xk);
}
}
}
if(null!=_584.result){
}
var node=xd.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource")||xd.selectSingleNode("/root");
var e=null;
if(node){
e=node.getAttribute("error");
}
if(e){
this.setHandlerError(e);
}else{
this.setHandlerError(null);
}
var _58d=new nitobi.data.OnAfterSaveEventArgs(this,xd);
_584.callback.call(this,_58d);
}
catch(err){
ebaErrorReport(err,"",EBA_ERROR);
}
};
nitobi.data.DataTable.prototype.makeFieldMap=function(){
var _58e=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource");
var cf=0;
var ck=0;
this.fieldMap=new Array();
var cF=this.columns.length;
for(var i=0;i<cF;i++){
var _593=this.columns[i];
ck1=ck%26;
ck2=Math.floor(ck/26);
this.fieldMap[_593]="@"+(ck2>0?String.fromCharCode(96+ck2):"")+String.fromCharCode(97+ck1);
ck++;
}
};
nitobi.data.DataTable.prototype.find=function(_594,_595){
var _596=this.fieldMap[_594];
if(_596){
return this.findWithoutMap(_596,_595);
}else{
return new Array();
}
};
nitobi.data.DataTable.prototype.findWithoutMap=function(_597,_598){
if(_597.charAt(0)!="@"){
_597="@"+_597;
}
return this.xmlDoc.selectNodes("//"+nitobi.xml.nsPrefix+"e["+_597+"=\""+_598+"\"]");
};
nitobi.data.DataTable.prototype.sort=function(_599,dir,type,_59c){
if(_59c){
_599=this.fieldMap[_599];
_599=_599.substring(1);
dir=(dir=="Desc")?"descending":"ascending";
type=(type=="number")?"number":"text";
this.sortXslProc.addParameter("column",_599,"");
this.sortXslProc.addParameter("dir",dir,"");
this.sortXslProc.addParameter("type",type,"");
this.xmlDoc=nitobi.xml.loadXml(this.xmlDoc,nitobi.xml.transformToString(this.xmlDoc,this.sortXslProc,"xml"));
this.fire("DataSorted");
}else{
this.sortColumn=_599;
this.sortDir=dir||"Asc";
}
};
nitobi.data.DataTable.prototype.syncRowCount=function(){
this.setRemoteRowCount(this.descriptor.estimatedRowCount);
};
nitobi.data.DataTable.prototype.setRemoteRowCount=function(rows){
var _59e=this.remoteRowCount;
this.remoteRowCount=rows;
if(this.remoteRowCount!=_59e){
this.fire("RowCountChanged",rows);
}
};
nitobi.data.DataTable.prototype.getRemoteRowCount=function(){
return this.remoteRowCount;
};
nitobi.data.DataTable.prototype.getRows=function(){
return this.xmlDoc.selectNodes("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data/"+nitobi.xml.nsPrefix+"e").length;
};
nitobi.data.DataTable.prototype.getXmlDoc=function(){
return this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']");
};
nitobi.data.DataTable.prototype.getRowNodes=function(){
return this.xmlDoc.selectNodes("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data/"+nitobi.xml.nsPrefix+"e");
};
nitobi.data.DataTable.prototype.getColumns=function(){
return this.fieldMap.length;
};
nitobi.data.DataTable.prototype.setGetHandlerParameter=function(name,_5a0){
if(this.getHandler!=null&&this.getHandler!=""){
this.getHandler=nitobi.html.setUrlParameter(this.getHandler,name,_5a0);
}
this.getHandlerArgs[name]=_5a0;
};
nitobi.data.DataTable.prototype.setSaveHandlerParameter=function(name,_5a2){
if(this.postHandler!=null&&this.postHandler!=""){
this.postHandler=nitobi.html.setUrlParameter(this.getSaveHandler(),name,_5a2);
}
this.saveHandlerArgs[name]=_5a2;
};
nitobi.data.DataTable.prototype.getChangeLogSize=function(){
if(null==this.log){
return 0;
}
return this.log.selectNodes("//"+nitobi.xml.nsPrefix+"e").length;
};
nitobi.data.DataTable.prototype.getChangeLogXmlDoc=function(){
return this.log;
};
nitobi.data.DataTable.prototype.getDataXmlDoc=function(){
return this.xmlDoc;
};
nitobi.data.DataTable.prototype.dispose=function(){
this.flush();
this.dataCache.flush();
this.requestCache.flush();
this.ajaxCallbackPool.context=null;
for(var item in this){
if(this[item]!=null&&this[item].dispose instanceof Function){
this[item].dispose();
}
this[item]=null;
}
};
nitobi.data.DataTable.prototype.getTable=function(_5a4,_5a5,_5a6){
this.errorCallback=_5a6;
var _5a7=this.ajaxCallbackPool.reserve();
var _5a8=this.getGetHandler();
_5a7.handler=_5a8;
_5a7.responseType="xml";
_5a7.context=this;
_5a7.completeCallback=nitobi.lang.close(this,this.getComplete);
_5a7.async=this.async;
_5a7.params=new nitobi.data.GetCompleteEventArgs(null,null,0,null,_5a7,this,_5a4,_5a5);
if(typeof (_5a5)!="function"||this.async==false){
_5a7.async=false;
return this.getComplete({"response":_5a7.get(),"params":_5a7.params});
}else{
_5a7.get();
}
};
nitobi.data.DataTable.prototype.getComplete=function(_5a9){
var xd=_5a9.response;
var _5ab=_5a9.params;
if(this.mode!="caching"){
this.xmlDoc=nitobi.xml.createXmlDoc();
}
if(null==xd||null==xd.xml||""==xd.xml){
var _5ac="No parse error.";
if(nitobi.xml.hasParseError(xd)){
if(xd==null){
_5ac="Blank Response was Given";
}else{
_5ac=nitobi.xml.getParseErrorReason(xd);
}
}
if(this.errorCallback){
this.errorCallback.call(this.context);
}
this.fire("DataReady",_5ab);
return _5ab;
}else{
if(typeof (this.successCallback)=="function"){
this.successCallback.call(this.context);
}
}
if(!this.configured){
this.configureFromData(xd);
}
xd=this.parseResponse(xd,_5ab);
xd=this.assignRowIds(xd);
var _5ad=null;
_5ad=xd.selectNodes("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data/"+nitobi.xml.nsPrefix+"e");
var _5ae;
var _5af=_5ad.length;
if(_5ab.pageSize==null){
_5ab.pageSize=_5af;
_5ab.lastRow=_5ab.startXi+_5ab.pageSize-1;
_5ab.firstRow=_5ab.startXi;
}
if(0!=_5af){
_5ae=parseInt(_5ad[_5ad.length-1].getAttribute("xi"));
if(this.mode=="paging"){
this.dataCache.insert(0,_5ab.pageSize-1);
}else{
this.dataCache.insert(_5ab.firstRow,_5ae);
}
}else{
_5ae=-1;
_5ab.pageSize=0;
var pct=this.descriptor.lastKnownRow/this.descriptor.estimatedRowCount||0;
this.fire("PastEndOfData",pct);
}
_5ab.numRowsReturned=_5af;
_5ab.lastRowReturned=_5ae;
var _5b1=_5ab.startXi;
var _5b2=_5ab.pageSize;
if(!isNaN(_5b1)&&!isNaN(_5b2)){
this.requestCache.remove(_5b1,_5b1+_5b2-1);
}
if(this.mode!="caching"){
this.replaceData(xd);
}else{
this.mergeData(xd);
}
this.updateFromDescriptor(_5ab);
this.fire("RowCountReady",_5ab);
if(null!=_5ab.ajaxCallback){
this.ajaxCallbackPool.release(_5ab.ajaxCallback);
}
this.executeRequests();
var node=xd.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource");
var e=null;
if(node){
e=node.getAttribute("error");
}
if(e){
this.setHandlerError(e);
}else{
this.setHandlerError(null);
}
this.fire("DataReady",_5ab);
if(null!=_5ab.callback&&null!=_5ab.context){
_5ab.callback.call(_5ab.context,_5ab);
_5ab.dispose();
_5ab=null;
}else{
return _5ab;
}
};
nitobi.data.DataTable.prototype.executeRequests=function(){
var _5b5=this.requestQueue;
this.requestQueue=new Array();
for(var i=0;i<_5b5.length;i++){
_5b5[i].call();
}
};
nitobi.data.DataTable.prototype.updateFromDescriptor=function(_5b7){
this.descriptor.update(_5b7);
if(this.mode=="paging"){
this.setRemoteRowCount(_5b7.numRowsReturned);
}else{
this.setRemoteRowCount(this.descriptor.estimatedRowCount);
}
this.setRowCountKnown(this.descriptor.isAtEndOfTable);
};
nitobi.data.DataTable.prototype.setRowCountKnown=function(_5b8){
var _5b9=this.rowCountKnown;
this.rowCountKnown=_5b8;
if(_5b8&&this.rowCountKnown!=_5b9){
this.fire("RowCountKnown",this.remoteRowCount);
}
};
nitobi.data.DataTable.prototype.getRowCountKnown=function(){
return this.rowCountKnown;
};
nitobi.data.DataTable.prototype.configureFromData=function(xd){
this.version=this.inferDataVersion(xd);
if(this.mode=="unbound"){
}
if(this.mode=="static"){
}
if(this.mode=="paging"){
}
if(this.mode=="caching"){
}
};
nitobi.data.DataTable.prototype.mergeData=function(xd){
if(this.xmlDoc.xml==""){
this.initializeXml(xd);
return;
}
var _5bc=xd.selectNodes("//"+nitobi.xml.nsPrefix+"datasource[@id = '"+this.id+"']//"+nitobi.xml.nsPrefix+"e");
var _5bd=this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data");
var len=_5bc.length;
for(var i=0;i<len;i++){
if(this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data/"+nitobi.xml.nsPrefix+"e[@xi='"+_5bc[i].getAttribute("xi")+"']")){
continue;
}
_5bd.appendChild(_5bc[i]);
}
};
nitobi.data.DataTable.prototype.assignRowIds=function(xd){
nitobi.data.addXidXslProc.addParameter("guid",nitobi.component.getUniqueId(),"");
var doc=nitobi.xml.loadXml(xd,nitobi.xml.transformToString(xd,nitobi.data.addXidXslProc,"xml"));
return doc;
};
nitobi.data.DataTable.prototype.inferDataVersion=function(xd){
if(xd.selectSingleNode("/root")){
return 2.8;
}
return 3;
};
nitobi.data.DataTable.prototype.parseResponse=function(xd,_5c4){
if(this.version==2.8){
return this.parseLegacyResponse(xd,_5c4);
}else{
return this.parseStructuredResponse(xd,_5c4);
}
};
nitobi.data.DataTable.prototype.parseLegacyResponse=function(xd,_5c6){
var _5c7=this.mode=="paging"?0:_5c6.startXi;
nitobi.data.dataTranslatorXslProc.addParameter("start",_5c7,"");
nitobi.data.dataTranslatorXslProc.addParameter("id",this.id,"");
var _5c8=xd.selectSingleNode("/root").getAttribute("fields");
var _5c9=_5c8.split("|");
var i=_5c9.length;
var _5cb=(i>25?String.fromCharCode(Math.floor(i/26)+96):"")+(String.fromCharCode(i%26+97));
nitobi.data.dataTranslatorXslProc.addParameter("xkField",_5cb,"");
xd=nitobi.xml.transformToXml(xd,nitobi.data.dataTranslatorXslProc);
return xd;
};
nitobi.data.DataTable.prototype.parseStructuredResponse=function(xd,_5cd){
xd=nitobi.xml.loadXml(xd,"<ntb:grid xmlns:ntb=\"http://www.nitobi.com\"><ntb:datasources>"+xd.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']").xml+"</ntb:datasources></ntb:grid>");
var _5ce=xd.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.id+"']/"+nitobi.xml.nsPrefix+"data/"+nitobi.xml.nsPrefix+"e");
var _5cf=this.mode=="paging"?0:_5cd.startXi;
if(_5ce){
if(_5ce.getAttribute("xi")!=_5cf){
nitobi.data.adjustXiXslProc.addParameter("startingIndex","0","");
nitobi.data.adjustXiXslProc.addParameter("adjustment",_5cf,"");
xd=nitobi.xml.loadXml(xd,nitobi.xml.transformToString(xd,nitobi.data.adjustXiXslProc,"xml"));
}
}
return xd;
};
nitobi.data.DataTable.prototype.forceGet=function(_5d0,_5d1,_5d2,_5d3,_5d4,_5d5){
this.errorCallback=_5d4;
this.successCallback=_5d5;
this.context=_5d2;
var _5d6=this.getGetHandler();
(_5d6.indexOf("?")==-1)?_5d6+="?":_5d6+="&";
_5d6+="StartRecordIndex=0&start=0&PageSize="+_5d1+"&SortColumn="+(this.sortColumn||"")+"&SortDirection="+this.sortDir+"&TableId="+this.id+"&uid="+(new Date().getTime());
var _5d7=this.ajaxCallbackPool.reserve();
_5d7.handler=_5d6;
_5d7.responseType="xml";
_5d7.context=this;
_5d7.completeCallback=nitobi.lang.close(this,this.getComplete);
_5d7.params=new nitobi.data.GetCompleteEventArgs(0,_5d1-1,0,_5d1,_5d7,this,_5d2,_5d3);
_5d7.get();
return;
};
nitobi.data.DataTable.prototype.getPage=function(_5d8,_5d9,_5da,_5db,_5dc,_5dd){
var _5de=_5d8+_5d9-1;
var _5df=this.dataCache.gaps(0,_5d9-1);
var _5e0=_5df.length;
if(_5e0){
var _5e1=this.requestCache.gaps(_5d8,_5de);
if(_5e1.length==0){
var _5e2=nitobi.lang.close(this,this.get,arguments);
this.requestQueue.push(_5e2);
return;
}
this.getFromServer(_5d8,_5de,_5d8,_5de,_5da,_5db,_5dc);
}else{
this.getFromCache(_5d8,_5d9,_5da,_5db,_5dc);
}
};
nitobi.data.DataTable.prototype.get=function(_5e3,_5e4,_5e5,_5e6,_5e7){
this.errorCallback=_5e7;
var _5e8=null;
if(this.mode=="caching"){
_5e8=this.getCached(_5e3,_5e4,_5e5,_5e6,_5e7);
}
if(this.mode=="local"||this.mode=="static"){
_5e8=this.getTable(_5e5,_5e6,_5e7);
}
if(this.mode=="paging"){
_5e8=this.getPage(_5e3,_5e4,_5e5,_5e6,_5e7);
}
return _5e8;
};
nitobi.data.DataTable.prototype.inCache=function(_5e9,_5ea){
if(this.mode=="local"){
return true;
}
var _5eb=_5e9,_5ec=_5e9+_5ea-1;
var _5ed=this.getRemoteRowCount()-1;
if(this.getRowCountKnown()&&_5ed<_5ec){
_5ec=_5ed;
}
var _5ee=this.dataCache.gaps(_5eb,_5ec);
var _5ef=_5ee.length;
return !(_5ef>0);
};
nitobi.data.DataTable.prototype.cachedRanges=function(_5f0,_5f1){
return this.dataCache.ranges(_5f0,_5f1);
};
nitobi.data.DataTable.prototype.getCached=function(_5f2,_5f3,_5f4,_5f5,_5f6,_5f7){
if(_5f3==null){
return this.getFromServer(_5f8,null,_5f2,null,_5f4,_5f5,_5f6);
}
var _5f8=_5f2,_5f9=_5f2+_5f3-1;
var _5fa=this.dataCache.gaps(_5f8,_5f9);
var _5fb=_5fa.length;
if(this.mode!="unbound"&&_5fb>0){
var low=_5fa[_5fb-1].low;
var high=_5fa[_5fb-1].high;
var _5fe=this.requestCache.gaps(low,high);
if(_5fe.length==0){
var _5ff=nitobi.lang.close(this,this.get,arguments);
this.requestQueue.push(_5ff);
return;
}
return this.getFromServer(_5f8,_5f9,low,high,_5f4,_5f5,_5f6);
}else{
this.getFromCache(_5f2,_5f3,_5f4,_5f5,_5f6);
}
};
nitobi.data.DataTable.prototype.getFromServer=function(_600,_601,low,high,_604,_605,_606){
this.requestCache.insert(low,high);
var _607=(_601==null?null:(high-low+1));
var _608=(_607==null?"":_607);
var _609=this.getGetHandler();
(_609.indexOf("?")==-1)?_609+="?":_609+="&";
_609+="StartRecordIndex="+low+"&start="+low+"&PageSize="+(_608)+"&SortColumn="+(this.sortColumn||"")+"&SortDirection="+this.sortDir+"&uid="+(new Date().getTime());
var _60a=this.ajaxCallbackPool.reserve();
_60a.handler=_609;
_60a.responseType="xml";
_60a.context=this;
_60a.completeCallback=nitobi.lang.close(this,this.getComplete);
_60a.async=this.async;
_60a.params=new nitobi.data.GetCompleteEventArgs(_600,_601,low,_607,_60a,this,_604,_605);
return _60a.get();
};
nitobi.data.DataTable.prototype.getFromCache=function(_60b,_60c,_60d,_60e,_60f){
var _610=_60b,_611=_60b+_60c-1;
if(_610>0||_611>0){
if(typeof (_60e)=="function"){
var _612=new nitobi.data.GetCompleteEventArgs(_610,_611,_610,_611-_610+1,null,this,_60d,_60e);
_612.callback.call(_612.context,_612);
}
}
};
nitobi.data.DataTable.prototype.mergeFromXml=function(_613,_614){
var _615=Number(_613.documentElement.firstChild.getAttribute("xi"));
var _616=Number(_613.documentElement.lastChild.getAttribute("xi"));
var _617=this.dataCache.gaps(_615,_616);
if(this.mode=="local"&&_617.length==1){
this.dataCache.insert(_617[0].low,_617[0].high);
this.mergeFromXmlGetComplete(_613,_614,_615,_616);
this.batchInsertRowCount=(_617[0].high-_617[0].low+1);
this.commitBatchInsert();
return;
}
if(_617.length==0){
this.mergeFromXmlGetComplete(_613,_614,_615,_616);
}else{
if(_617.length==1){
this.get(_617[0].low,_617[0].high-_617[0].low+1,this,nitobi.lang.close(this,this.mergeFromXmlGetComplete,[_613,_614,_615,_616]));
}else{
this.forceGet(_615,_616,this,nitobi.lang.close(this,this.mergeFromXmlGetComplete,[_613,_614,_615,_616]));
}
}
};
nitobi.data.DataTable.prototype.mergeFromXmlGetComplete=function(_618,_619,_61a,_61b){
var _61c=nitobi.xml.createElement(this.xmlDoc,"newdata");
this.xmlDoc.documentElement.appendChild(_61c);
_61c.appendChild(_618.documentElement.cloneNode(true));
nitobi.data.mergeEbaXmlXslProc.addParameter("startRowIndex",_61a,"");
nitobi.data.mergeEbaXmlXslProc.addParameter("endRowIndex",_61b,"");
nitobi.data.mergeEbaXmlXslProc.addParameter("guid",nitobi.component.getUniqueId(),"");
this.xmlDoc=nitobi.xml.loadXml(this.xmlDoc,nitobi.xml.transformToString(this.xmlDoc,nitobi.data.mergeEbaXmlXslProc,"xml"));
_61c=nitobi.xml.createElement(this.log,"newdata");
this.log.documentElement.appendChild(_61c);
_61c.appendChild(this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"newdata").firstChild.cloneNode(true));
this.log=nitobi.xml.loadXml(this.log,nitobi.xml.transformToString(this.log,nitobi.data.mergeEbaXmlToLogXslProc,"xml"));
this.xmlDoc.documentElement.removeChild(this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"newdata"));
this.log.documentElement.removeChild(this.log.selectSingleNode("//"+nitobi.xml.nsPrefix+"newdata"));
_619.call();
};
nitobi.data.DataTable.prototype.fillColumn=function(_61d,_61e){
nitobi.data.fillColumnXslProc.addParameter("column",this.fieldMap[_61d].substring(1));
nitobi.data.fillColumnXslProc.addParameter("value",_61e);
this.xmlDoc.loadXML(nitobi.xml.transformToString(this.xmlDoc,nitobi.data.fillColumnXslProc,"xml"));
var _61f=parseFloat((new Date()).getTime());
var _620=nitobi.xml.createElement(this.log,"newdata");
this.log.documentElement.appendChild(_620);
_620.appendChild(this.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"data").cloneNode(true));
nitobi.data.mergeEbaXmlToLogXslProc.addParameter("defaultAction","u");
this.log.loadXML(nitobi.xml.transformToString(this.log,nitobi.data.mergeEbaXmlToLogXslProc,"xml"));
nitobi.data.mergeEbaXmlToLogXslProc.addParameter("defaultAction","");
this.log.documentElement.removeChild(this.log.selectSingleNode("//"+nitobi.xml.nsPrefix+"newdata"));
};
nitobi.data.DataTable.prototype.setHandlerError=function(_621){
this.handlerError=_621;
};
nitobi.data.DataTable.prototype.getHandlerError=function(){
return this.handlerError;
};
nitobi.data.DataTable.prototype.dispose=function(){
this.sortXslProc=null;
this.requestQueue=null;
this.fieldMap=null;
};
nitobi.data.DataTable.prototype.fire=function(evt,args){
return nitobi.event.notify(evt+this.uid,args);
};
nitobi.data.DataTable.prototype.subscribe=function(evt,func,_626){
if(typeof (_626)=="undefined"){
_626=this;
}
return nitobi.event.subscribe(evt+this.uid,nitobi.lang.close(_626,func));
};
nitobi.lang.defineNs("nitobi.data");
nitobi.data.DataTableDescriptor=function(_627,_628,_629){
this.disposal=[];
this.estimatedRowCount=0;
this.leapMultiplier=2;
this.estimateRowCount=(_629==null?true:_629);
this.lastKnownRow=0;
this.isAtEndOfTable=false;
this.table=_627;
this.lowestEmptyRow=0;
this.tableProjectionUpdatedEvent=_628;
this.disposal.push(this.tableProjectionUpdatedEvent);
};
nitobi.data.DataTableDescriptor.prototype.startPeek=function(){
this.enablePeek=true;
this.peek();
};
nitobi.data.DataTableDescriptor.prototype.peek=function(){
var _62a;
if(this.lowestEmptyRow>0){
var _62b=this.lowestEmptyRow-this.lastKnownRow;
_62a=this.lastKnownRow+Math.round(_62b/2);
}else{
_62a=(this.estimatedRowCount*this.leapMultiplier);
}
this.table.get(Math.round(_62a),1,this,this.peekComplete);
};
nitobi.data.DataTableDescriptor.prototype.peekComplete=function(_62c){
if(this.enablePeek){
window.setTimeout(nitobi.lang.close(this,this.peek),1000);
}
};
nitobi.data.DataTableDescriptor.prototype.stopPeek=function(){
this.enablePeek=false;
};
nitobi.data.DataTableDescriptor.prototype.leap=function(_62d,_62e){
if(this.lowestEmptyRow>0){
var _62f=this.lowestEmptyRow-this.lastKnownRow;
this.estimatedRowCount=this.lastKnownRow+Math.round(_62f/2);
}else{
if(_62d==null||_62e==null){
this.estimatedRowCount=0;
}else{
if(this.estimateRowCount){
this.estimatedRowCount=(this.estimatedRowCount*_62d)+_62e;
}
}
}
this.fireProjectionUpdatedEvent();
};
nitobi.data.DataTableDescriptor.prototype.update=function(_630,_631){
if(null==_631){
_631=false;
}
if(this.isAtEndOfTable&&!_631){
return false;
}
var _632=(_630!=null&&_630.numRowsReturned==0&&_630.startXi==0);
var _633=(_630!=null&&_630.lastRow!=_630.lastRowReturned);
if(null==_630){
_630={lastPage:false,pageSize:1,firstRow:0,lastRow:0,startXi:0};
}
var _634=(_632)||(_633)||(this.isAtEndOfTable)||((this.lastKnownRow==this.estimatedRowCount-1)&&(this.estimatedRowCount==this.lowestEmptyRow));
if(_630.pageSize==0&&!_634){
this.lowestEmptyRow=this.lowestEmptyRow>0?Math.min(_630.startXi,this.lowestEmptyRow):_630.startXi;
this.leap();
return true;
}
this.lastKnownRow=Math.max(_630.lastRowReturned,this.lastKnownRow);
if(_634&&!_631){
if(_630.lastRowReturned>=0){
this.estimatedRowCount=_630.lastRowReturned+1;
this.isAtEndOfTable=true;
}else{
if(_632){
this.estimatedRowCount=0;
this.isAtEndOfTable=true;
}else{
this.estimatedRowCount=this.lastKnownRow+Math.ceil((_630.lastRow-this.lastKnownRow)/2);
}
}
this.fireProjectionUpdatedEvent();
this.stopPeek();
return true;
}
if(!this.estimateRowCount){
this.estimatedRowCount=this.lastKnownRow+1;
}
if(this.estimatedRowCount==0){
this.estimatedRowCount=(_630.lastRow+1)*(this.estimateRowCount?2:1);
}
if((this.estimatedRowCount>(_630.lastRow+1)&&!_631)||!this.estimateRowCount){
return false;
}
if(!this.isAtEndOfTable){
this.leap(this.leapMultiplier,0);
return true;
}
return false;
};
nitobi.data.DataTableDescriptor.prototype.reset=function(){
this.estimatedRowCount=0;
this.leapMultiplier=2;
this.lastKnownRow=0;
this.isAtEndOfTable=false;
this.lowestEmptyRow=0;
this.fireProjectionUpdatedEvent();
};
nitobi.data.DataTableDescriptor.prototype.fireProjectionUpdatedEvent=function(_635){
if(this.tableProjectionUpdatedEvent!=null){
this.tableProjectionUpdatedEvent(_635);
}
};
nitobi.data.DataTableDescriptor.prototype.dispose=function(){
nitobi.lang.dispose(this,this.disposal);
};
nitobi.lang.defineNs("nitobi.data");
if(false){
nitobi.data=function(){
};
}
nitobi.data.DataTableEventArgs=function(_636){
this.source=_636;
this.event=nitobi.html.Event;
};
nitobi.data.DataTableEventArgs.prototype.getSource=function(){
return this.source;
};
nitobi.data.DataTableEventArgs.prototype.getEvent=function(){
return this.event;
};
nitobi.data.GetCompleteEventArgs=function(_637,_638,_639,_63a,_63b,_63c,obj,_63e){
this.firstRow=_637;
this.lastRow=_638;
this.callback=_63e;
this.dataSource=_63c;
this.context=obj;
this.ajaxCallback=_63b;
this.startXi=_639;
this.pageSize=_63a;
this.lastPage=false;
this.status="success";
};
nitobi.data.GetCompleteEventArgs.prototype.dispose=function(){
this.callback=null;
this.context=null;
this.dataSource=null;
this.ajaxCallback.clear();
this.ajaxCallback==null;
};
nitobi.data.SaveCompleteEventArgs=function(_63f){
this.callback=_63f;
};
nitobi.data.SaveCompleteEventArgs.prototype.initialize=function(){
};
nitobi.data.OnAfterSaveEventArgs=function(_640,_641,_642){
nitobi.data.OnAfterSaveEventArgs.baseConstructor.call(this,_640);
this.success=_642;
this.responseData=_641;
};
nitobi.lang.extend(nitobi.data.OnAfterSaveEventArgs,nitobi.data.DataTableEventArgs);
nitobi.data.OnAfterSaveEventArgs.prototype.getResponseData=function(){
return this.responseData;
};
nitobi.data.OnAfterSaveEventArgs.prototype.getSuccess=function(){
return this.success;
};
nitobi.lang.defineNs("nitobi.form");
if(false){
nitobi.form=function(){
};
}
nitobi.form.Control=function(){
this.owner=null;
this.cell=null;
this.element=null;
this.blur=false;
this.onKeyUp=new nitobi.base.Event();
this.onKeyDown=new nitobi.base.Event();
this.onKeyPress=new nitobi.base.Event();
this.onChange=new nitobi.base.Event();
};
nitobi.form.Control.attachToParent=function(_643){
};
nitobi.form.Control.prototype.mimic=function(){
};
nitobi.form.Control.prototype.deactivate=function(){
if(this.blur){
return false;
}
this.blur=true;
};
nitobi.form.Control.prototype.bind=function(_644,cell){
this.owner=_644;
this.cell=cell;
this.blur=false;
};
nitobi.form.Control.prototype.hide=function(){
this.placeholder.style.left="-2000px";
};
nitobi.form.Control.prototype.show=function(){
this.placeholder.style.display="block";
};
nitobi.form.Control.prototype.focus=function(){
this.control.focus();
this.blur=false;
};
nitobi.form.Control.prototype.deactivate=function(){
};
nitobi.form.Control.prototype.handleKey=function(evt){
var k=evt.keyCode;
this.lastKeyCode=k;
if(this.onKeyDown.notify(evt)==false){
return;
}
switch(k){
case 27:
nitobi.html.detachEvent(this.control,"blur",this.deactivate);
this.hide();
this.owner.focus();
break;
case 9:
var _648=this.deactivate();
if(_648==false){
nitobi.html.cancelBubble(evt);
break;
}
if(nitobi.browser.IE){
evt.keyCode="";
}
var x=1;
if(evt.shiftKey){
x=-1;
}
this.owner.move(x,0);
nitobi.html.cancelBubble(evt);
break;
case 13:
this.control.blur();
evt.returnValue=false;
break;
default:
}
};
nitobi.form.Control.prototype.handleKeyUp=function(evt){
this.onKeyUp.notify(evt);
};
nitobi.form.Control.prototype.handleKeyPress=function(evt){
this.onKeyPress.notify(evt);
};
nitobi.form.Control.prototype.handleChange=function(evt){
this.onChange.notify(evt);
};
nitobi.form.Control.prototype.render=function(){
};
nitobi.form.Control.prototype.setEditCompleteHandler=function(_64d){
this.editCompleteHandler=_64d;
};
nitobi.form.Control.prototype.eSET=function(name,args){
var _650=args[0];
var _651=_650;
var _652=name.substr(2);
_652=_652.substr(0,_652.length-5);
if(typeof (_650)=="string"){
_651=function(){
return nitobi.event.evaluate(_650,arguments[0]);
};
}
if(this[_652]!=null){
this[name].unSubscribe(this[_652]);
}
var guid=this[name].subscribe(_651);
this.jSET(_652,[guid]);
return guid;
};
nitobi.form.Control.prototype.jSET=function(name,val){
this[name]=val[0];
};
nitobi.form.Control.prototype.dispose=function(){
for(var item in this){
}
};
nitobi.form.IBlurable=function(_657,_658){
this.selfBlur=false;
this.elements=_657;
for(var i=0;i<this.elements.length;i++){
nitobi.html.attachEvent(this.elements[i],"mousedown",this.handleMouseDown,this);
nitobi.html.attachEvent(this.elements[i],"blur",this.handleBlur,this);
nitobi.html.attachEvent(this.elements[i],"focus",this.handleFocus,this);
}
this.blurFunc=_658;
this.lastFocus=null;
};
nitobi.form.IBlurable.prototype.removeBlurable=function(){
for(var i=0;i<elems.length;i++){
nitobi.html.detachEvent(elems[i],"mousedown",this.handleMouseDown,this);
}
};
nitobi.form.IBlurable.prototype.handleMouseDown=function(evt){
if(this.lastFocus!=evt.srcElement&&this.lastFocus!=null){
this.selfBlur=true;
}else{
this.selfBlur=false;
}
this.lastFocus=evt.srcElement;
};
nitobi.form.IBlurable.prototype.handleBlur=function(){
if(!this.selfBlur){
this.blurFunc();
}
this.selfBlur=false;
};
nitobi.form.IBlurable.prototype.handleFocus=function(){
this.selfBlur=false;
};
nitobi.form.Text=function(){
nitobi.form.Text.baseConstructor.call(this);
var div=document.createElement("div");
div.innerHTML="<table border='0' cellpadding='0' cellspacing='0' class='ntbinputborder'><tr><td></td></table>";
this.placeholder=div.firstChild;
this.control=document.createElement("input");
this.control.style.width="100%";
this.control.style.border="0px";
this.placeholder.object=this;
this.placeholder.style.position="absolute";
this.placeholder.style.top="-3000px";
this.placeholder.style.zIndex=2000;
this.placeholder.style.left="-3000px";
this.control.className="ntbinput ntbcell";
this.control.setAttribute("maxlength",255);
this.events=[{"type":"keydown","handler":this.handleKey},{"type":"keyup","handler":this.handleKeyUp},{"type":"keypress","handler":this.handleKeyPress},{"type":"change","handler":this.handleChange},{"type":"blur","handler":this.deactivate}];
};
nitobi.lang.extend(nitobi.form.Text,nitobi.form.Control);
nitobi.form.Text.prototype.initialize=function(){
this.placeholder.rows[0].cells[0].appendChild(this.control);
document.body.appendChild(this.placeholder);
nitobi.html.attachEvents(this.control,this.events,this);
};
nitobi.form.Text.prototype.attachToParent=function(_65d){
_65d.appendChild(this.placeholder);
};
nitobi.form.Text.prototype.bind=function(_65e,cell,_660){
nitobi.form.Text.base.bind.apply(this,arguments);
if(_660!=null&&_660!=""){
this.control.value=_660;
}else{
this.control.value=cell.getValue();
}
var _661=this.cell.getColumnObject().ModelNode;
this.eSET("onKeyPress",[_661.getAttribute("OnKeyPressEvent")]);
this.eSET("onKeyDown",[_661.getAttribute("OnKeyDownEvent")]);
this.eSET("onKeyUp",[_661.getAttribute("OnKeyUpEvent")]);
this.eSET("onChange",[_661.getAttribute("OnChangeEvent")]);
this.control.setAttribute("maxlength",_661.getAttribute("MaxLength"));
nitobi.html.Css.addClass(this.control,"ntbcolumndata"+this.owner.uid+"_"+(this.cell.getColumn()+1));
};
nitobi.form.Text.prototype.render=function(){
this.domNode.appendChild(this.placeholder);
};
nitobi.form.Text.prototype.mimic=function(){
var oY=0;
var oX=0;
if(nitobi.browser.MOZ){
var _664=this.context.getScrollSurface();
var _665=this.context.getActiveView().region;
if(_665==3||_665==4){
oY=_664.scrollTop-nitobi.form.EDITOR_OFFSETY;
}
if(_665==1||_665==4){
oX=_664.scrollLeft-nitobi.form.EDITOR_OFFSETX;
}
}
nitobi.drawing.align(this.placeholder,this.cell.getDomNode(),286265344,0,0,-oY,-oX);
window.setTimeout(nitobi.lang.close(this,this.focus),100);
if(this.control.createTextRange){
var _666=this.control.createTextRange();
_666.collapse(false);
_666.select();
}
};
nitobi.form.Text.prototype.focus=function(){
this.control.focus();
};
nitobi.form.Text.prototype.deactivate=function(){
if(this.lastKeyCode==27){
return;
}
if(nitobi.form.Text.base.deactivate.apply(this,arguments)==false){
return;
}
var _667=this.control.value;
nitobi.html.Css.removeClass(this.control,"ntbcolumndata"+this.owner.uid+"_"+(this.cell.getColumn()+1));
if(this.editCompleteHandler!=null){
var _668=new nitobi.grid.EditCompleteEventArgs(this,_667,_667,this.cell);
var _669=this.editCompleteHandler.call(this.owner,_668);
if(!_669){
this.blur=false;
}
return _669;
}
};
nitobi.form.Text.prototype.dispose=function(){
this.control.object=null;
nitobi.html.detachEvents(this.control,this.events);
var _66a=this.placeholder.parentNode;
_66a.removeChild(this.placeholder);
this.domNode=null;
this.control=null;
this.owner=null;
this.cell=null;
};
nitobi.form.Checkbox=function(){
};
nitobi.lang.extend(nitobi.form.Checkbox,nitobi.form.Control);
nitobi.form.Checkbox.prototype.initialize=function(){
this.DataSourceId="";
this.UnCheckedValue="0";
this.CheckedValue="1";
this.DisplayFields="";
this.ValueField="";
};
nitobi.form.Checkbox.prototype.bind=function(_66b,cell,_66d){
this.blur=false;
this.cell=cell;
this.owner=_66b;
var _66e=this.cell.getColumnObject();
this.DataSourceId=_66e.ModelNode.getAttribute("DatasourceId");
this.dataTable=this.owner.data.getTable(this.DataSourceId);
};
nitobi.form.Checkbox.prototype.mimic=function(){
if(false==eval(this.owner.getOnCellValidateEvent())){
return;
}
this.toggle();
this.deactivate();
};
nitobi.form.Checkbox.prototype.deactivate=function(){
if(this.editCompleteHandler!=null){
var _66f=new nitobi.grid.EditCompleteEventArgs(this,this.value,this.value,this.cell);
this.editCompleteHandler.call(this.context,_66f);
}
this.context=null;
};
nitobi.form.Checkbox.prototype.toggle=function(){
var _670=this.cell.getColumnObject();
this.DataSourceId=_670.ModelNode.getAttribute("DatasourceId");
var _671=this.owner.data.getTable(this.DataSourceId);
var _672=_670.ModelNode.getAttribute("DisplayFields");
var _673=_670.ModelNode.getAttribute("ValueField");
var _674=_670.ModelNode.getAttribute("CheckedValue");
if(_674==""||_674==null){
_674=1;
}
var _675=_670.ModelNode.getAttribute("UnCheckedValue");
if(_675==""||_675==null){
_675=0;
}
this.value=(this.cell.getDomNode().getAttribute("value")==_674)?_675:_674;
};
nitobi.form.Checkbox.prototype.hide=function(){
};
nitobi.form.Checkbox.prototype.dispose=function(){
this.element=null;
this.metadata=null;
this.owner=null;
this.context=null;
};
nitobi.form.Date=function(){
nitobi.form.Date.baseConstructor.call(this);
};
nitobi.lang.extend(nitobi.form.Date,nitobi.form.Text);
nitobi.lang.defineNs("nitobi.form");
nitobi.form.EDITOR_OFFSETX=null;
nitobi.form.EDITOR_OFFSETY=null;
nitobi.form.ControlFactory=function(){
this.editors={};
};
nitobi.form.ControlFactory.prototype.getEditor=function(_676,_677,_678){
var _679=null;
if(null==_677){
ebaErrorReport("getEditor: column parameter is null","",EBA_DEBUG);
return _679;
}
if(false==_677.isEditable()){
return _679;
}
var _67a=_677.getType();
var _67b=_677.getType();
var _67c="nitobi.Grid"+_67a+_67b+"Editor";
if(this.editors[_67c]!=null){
_679=this.editors[_67c];
}else{
switch(_67a){
case "LINK":
case "HYPERLINK":
_679=new nitobi.form.Link;
break;
case "IMAGE":
return null;
case "BUTTON":
return null;
case "LOOKUP":
_679=new nitobi.form.Lookup();
break;
case "LISTBOX":
_679=new nitobi.form.ListBox();
break;
case "PASSWORD":
_679=new nitobi.form.Password();
break;
case "TEXTAREA":
_679=new nitobi.form.TextArea();
break;
case "CHECKBOX":
_679=new nitobi.form.Checkbox();
break;
default:
if(_67b=="DATE"){
if(_677.isCalendarEnabled()){
_679=new nitobi.form.Calendar();
}else{
_679=new nitobi.form.Date();
}
}else{
if(_67b=="NUMBER"){
_679=new nitobi.form.Number();
}else{
_679=new nitobi.form.Text();
}
}
break;
}
}
_679.initialize();
_679.context=_676;
this.editors[_67c]=_679;
return _679;
};
nitobi.form.ControlFactory.prototype.dispose=function(){
for(var _67d in this.editors){
this.editors[_67d].dispose();
}
};
nitobi.form.ControlFactory.instance=new nitobi.form.ControlFactory();
nitobi.form.Link=function(){
};
nitobi.lang.extend(nitobi.form.Link,nitobi.form.Control);
nitobi.form.Link.prototype.initialize=function(){
this.url="";
};
nitobi.form.Link.prototype.bind=function(_67e,cell,_680){
this.cell=cell;
this.url=this.cell.getValue();
this.blur=false;
this.owner=_67e;
};
nitobi.form.Link.prototype.mimic=function(){
if(false==eval(this.owner.getOnCellValidateEvent())){
return;
}
this.click();
this.deactivate();
};
nitobi.form.Link.prototype.deactivate=function(){
if(this.editCompleteHandler!=null){
var _681=new nitobi.grid.EditCompleteEventArgs(this,this.value,this.value,this.cell);
this.editCompleteHandler.call(this.context,_681);
}
this.context=null;
};
nitobi.form.Link.prototype.click=function(){
window.open(this.url);
this.value=this.url;
};
nitobi.form.Link.prototype.hide=function(){
};
nitobi.form.Link.prototype.dispose=function(){
this.element=null;
this.metadata=null;
this.owner=null;
this.context=null;
};
nitobi.form.ListBox=function(){
nitobi.form.ListBox.baseConstructor.call(this);
this.editCompleteHandler=null;
this.context=null;
this.element=null;
this.metadata=null;
this.blur=false;
this.keypress=false;
this.events=[{"type":"change","handler":this.deactivate},{"type":"keydown","handler":this.handleKey},{"type":"keyup","handler":this.handleKeyUp},{"type":"keypress","handler":this.handleKeyPress},{"type":"blur","handler":this.deactivate}];
};
nitobi.lang.extend(nitobi.form.ListBox,nitobi.form.Control);
nitobi.form.ListBox.prototype.initialize=function(){
var div=document.createElement("div");
div.innerHTML="<table border='0' cellpadding='0' cellspacing='0' style='table-layout:fixed;'><tr><td></td></tr></table>";
this.placeholder=div.firstChild;
this.placeholder.object=this;
this.placeholder.style.position="absolute";
this.placeholder.style.top="-1000px";
this.placeholder.style.left="-1000px";
document.body.appendChild(this.placeholder);
};
nitobi.form.ListBox.prototype.bind=function(_683,cell,_685){
this.blur=false;
this.cell=cell;
this.owner=_683;
var _686=cell.getColumnObject().ModelNode;
var _687=_686.getAttribute("DatasourceId");
this.dataTable=this.owner.data.getTable(_687);
this.eSET("onKeyPress",[_686.getAttribute("OnKeyPressEvent")]);
this.eSET("onKeyDown",[_686.getAttribute("OnKeyDownEvent")]);
this.eSET("onKeyUp",[_686.getAttribute("OnKeyUpEvent")]);
this.eSET("onChange",[_686.getAttribute("OnChangeEvent")]);
this.bindComplete(_685);
};
nitobi.form.ListBox.prototype.bindComplete=function(){
var _688=this.dataTable.xmlDoc.selectSingleNode("//"+nitobi.xml.nsPrefix+"datasource[@id='"+this.dataTable.id+"']");
var _689=this.cell.getColumnObject();
var _68a=_689.ModelNode.getAttribute("DisplayFields");
var _68b=_689.ModelNode.getAttribute("ValueField");
nitobi.form.listboxXslProc.addParameter("DisplayFields",_68a,"");
nitobi.form.listboxXslProc.addParameter("ValueField",_68b,"");
nitobi.form.listboxXslProc.addParameter("val",this.cell.getValue(),"");
this.listXml=nitobi.xml.transformToXml(nitobi.xml.createXmlDoc(_688.xml),nitobi.form.listboxXslProc);
this.placeholder.rows[0].cells[0].innerHTML=nitobi.xml.serialize(this.listXml);
this.control=this.placeholder.rows[0].cells[0].childNodes[0];
this.control.style.width="100%";
this.control.style.height=(this.cell.DomNode.offsetHeight-2)+"px";
nitobi.html.attachEvents(this.control,this.events,this);
nitobi.html.Css.addClass(this.control.className,this.cell.DomNode.className);
var oY=0;
var oX=0;
if(nitobi.browser.MOZ){
var _68e=this.context.getScrollSurface();
var _68f=this.context.getActiveView().region;
if(_68f==3||_68f==4){
oY=_68e.scrollTop-nitobi.form.EDITOR_OFFSETY;
}
if(_68f==1||_68f==4){
oX=_68e.scrollLeft-nitobi.form.EDITOR_OFFSETX;
}
}
nitobi.drawing.align(this.placeholder,this.cell.DomNode,286265344,0,0,-oY,-oX);
this.control.focus();
if(this.control.createTextRange){
var _690=this.control.createTextRange();
_690.collapse(false);
_690.select();
}
};
nitobi.form.ListBox.prototype.deactivate=function(ok){
if(this.blur||this.keypress){
this.keypress=false;
return;
}
this.blur=true;
if(this.onChange.notify(this)==false){
return;
}
var c=this.control;
var text="",_694="";
if(ok||ok==null){
text=c.options[c.selectedIndex].text;
_694=c.options[c.selectedIndex].value;
}else{
_694=this.cell.getValue();
var len=c.options.length;
for(var i=0;i<len;i++){
if(c.options[i].value==_694){
text=c.options[i].text;
}
}
}
c.object=null;
if(this.editCompleteHandler!=null){
var _697=new nitobi.grid.EditCompleteEventArgs(this,nitobi.html.encode(text),_694,this.cell);
_697.status=(_694==this.cell.getValue()?false:true);
this.editCompleteHandler.call(this.context,_697);
}
};
nitobi.form.ListBox.prototype.handleKey=function(evt){
var k=evt.keyCode;
if(this.onKeyDown.notify(evt)==false){
return;
}
this.keypress=false;
switch(k){
case 27:
this.deactivate(false);
break;
case 40:
if(this.control.selectedIndex<this.control.options.length-1){
this.keypress=true;
}
break;
case 38:
if(this.control.selectedIndex>0){
this.keypress=true;
}
break;
case 37:
case 39:
case 13:
case 27:
this.deactivate(true);
break;
default:
}
};
nitobi.form.ListBox.prototype.dispose=function(){
nitobi.html.detachEvents(this.control,this.events);
this.placeholder=null;
this.control=null;
this.listXml=null;
this.element=null;
this.metadata=null;
this.owner=null;
};
nitobi.form.Lookup=function(){
nitobi.form.Lookup.baseConstructor.call(this);
this.bVisible=false;
var div=document.createElement("div");
div.innerHTML="<table class='ntbinputborder' border='1px' cellpadding='0' cellspacing='0' style='overflow:hidden;'><tr><td></td></tr><tr><td></td></tr></table>";
this.placeholder=div.firstChild;
this.placeholder.setAttribute("id","lookup_span");
this.placeholder.style.position="absolute";
this.placeholder.style.zIndex=2000;
this.placeholder.style.top="-2000px";
this.placeholder.style.left="-2000px";
this.placeholder.style.tableLayout="fixed";
document.body.appendChild(this.placeholder);
this.textControl=document.createElement("input");
this.textControl.className="ntbinput ntblookuptext";
this.textControl.style.borderWidth="0px";
this.textControl.autocomplete="off";
this.textControl.style.zIndex=2000;
this.events=[{"type":"keydown","handler":this.handleKey},{"type":"keyup","handler":this.filter},{"type":"keypress","handler":this.handleKeyPress},{"type":"change","handler":this.handleChange}];
nitobi.html.attachEvents(this.textControl,this.events,this);
this.placeholder.rows[0].cells[0].appendChild(this.textControl);
this.selectPlaceholder=this.placeholder.rows[1].cells[0];
this.selectEvents=[{"type":"click","handler":this.handleSelectClicked}];
nitobi.html.attachEvents(this.selectPlaceholder,this.selectEvents,this);
nitobi.form.IBlurable.call(this,[this.textControl,this.selectPlaceholder],this.deactivate);
this.firstKeyup=false;
this.autocompleted=false;
this.listXml=null;
this.listXmlLower=null;
this.editCompleteHandler=null;
this.delay=0;
this.timeoutId=null;
var xsl="<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\">";
xsl+="<xsl:output method=\"text\" version=\"4.0\"/><xsl:param name='searchValue'/>";
xsl+="<xsl:template match=\"/\"><xsl:apply-templates select='//option[starts-with(.,$searchValue)][1]' /></xsl:template>";
xsl+="<xsl:template match=\"option\"><xsl:value-of select='@rn' /></xsl:template></xsl:stylesheet>";
var _69c=nitobi.xml.createXslDoc(xsl);
this.searchXslProc=nitobi.xml.createXslProcessor(_69c);
_69c=null;
};
nitobi.lang.extend(nitobi.form.Lookup,nitobi.form.Control);
nitobi.lang.implement(nitobi.form.Lookup,nitobi.ui.IDataBoundList);
nitobi.lang.implement(nitobi.form.Lookup,nitobi.form.IBlurable);
nitobi.form.Lookup.prototype.initialize=function(){
this.firstKeyup=false;
};
nitobi.form.Lookup.prototype.mimic=function(){
};
nitobi.form.Lookup.prototype.hide=function(){
this.placeholder.style.top="-2000px";
};
nitobi.form.Lookup.prototype.hideSelect=function(){
this.selectControl.style.display="none";
this.bVisible=false;
};
nitobi.form.Lookup.prototype.bind=function(_69d,cell,_69f){
nitobi.form.Text.base.bind.apply(this,arguments);
this.column=this.cell.getColumnObject();
var _6a0=this.column.ModelNode;
this.datasourceId=_6a0.getAttribute("DatasourceId");
this.getHandler=_6a0.getAttribute("GetHandler");
this.pageSize=_6a0.getAttribute("PageSize");
this.delay=parseInt(_6a0.getAttribute("Delay"));
this.size=_6a0.getAttribute("Size");
this.displayFields=_6a0.getAttribute("DisplayFields");
this.valueField=_6a0.getAttribute("ValueField");
this.eSET("onKeyPress",[_6a0.getAttribute("OnKeyPressEvent")]);
this.eSET("onKeyDown",[_6a0.getAttribute("OnKeyDownEvent")]);
this.eSET("onKeyUp",[_6a0.getAttribute("OnKeyUpEvent")]);
this.eSET("onChange",[_6a0.getAttribute("OnChangeEvent")]);
nitobi.form.listboxXslProc.addParameter("DisplayFields",this.displayFields,"");
nitobi.form.listboxXslProc.addParameter("ValueField",this.valueField,"");
this.dataTable=this.owner.data.getTable(this.datasourceId);
this.dataTable.setGetHandler(this.getHandler);
this.dataTable.async=false;
if(_69f.length<=0){
_69f=this.cell.getValue();
}
this.get(_69f,true);
};
nitobi.form.Lookup.prototype.bindComplete=function(_6a1){
var _6a2=this.dataTable.getXmlDoc();
nitobi.form.listboxXslProc.addParameter("DisplayFields",this.displayFields,"");
nitobi.form.listboxXslProc.addParameter("ValueField",this.valueField,"");
nitobi.form.listboxXslProc.addParameter("val",nitobi.xml.constructValidXpathQuery(this.cell.getValue(),false),"");
this.listXml=nitobi.xml.transformToXml(nitobi.xml.createXmlDoc(_6a2.xml),nitobi.form.listboxXslProc);
this.listXmlLower=nitobi.xml.createXmlDoc(this.listXml.xml.toLowerCase());
this.selectPlaceholder.innerHTML=nitobi.xml.serialize(this.listXml);
this.selectControl=nitobi.html.getFirstChild(this.selectPlaceholder);
this.selectControl.setAttribute("size",this.size);
this.selectControl.style.display="none";
if(nitobi.browser.IE6){
this.selectControl.style.height="100%";
}
this.bVisible=false;
var rn=this.search(_6a1);
if(rn>0){
this.selectControl.selectedIndex=rn-1;
this.textControl.value=this.selectControl[this.selectControl.selectedIndex].text;
nitobi.html.highlight(this.textControl,this.textControl.value.length-(this.textControl.value.length-_6a1.length));
this.autocompleted=true;
}else{
var row=_6a2.selectSingleNode("//"+nitobi.xml.nsPrefix+"e[@"+this.valueField+"='"+_6a1+"']");
if(row!=null){
this.textControl.value=row.getAttribute(this.displayFields);
var rn=this.search(this.textControl.value);
this.selectControl.selectedIndex=parseInt(rn)-1;
}else{
this.textControl.value=_6a1;
this.selectControl.selectedIndex=-1;
}
}
var oY=0;
var oX=0;
if(nitobi.browser.MOZ){
var _6a7=this.context.getScrollSurface();
var _6a8=this.context.getActiveView().region;
if(_6a8==3||_6a8==4){
oY=_6a7.scrollTop-nitobi.form.EDITOR_OFFSETY;
}
if(_6a8==1||_6a8==4){
oX=_6a7.scrollLeft-nitobi.form.EDITOR_OFFSETX;
}
}
var _6a9=this.cell.getDomNode();
nitobi.drawing.align(this.placeholder,_6a9,286265344,0,0,-oY,-oX);
this.textControl.style.height=nitobi.html.getHeight(_6a9)+"px";
var _6aa=this.placeholder.clientWidth;
this.selectControl.style.display="inline";
this.textControl.style.width="100%";
this.textControl.focus();
return false;
};
nitobi.form.Lookup.prototype.handleSelectClicked=function(evt){
this.textControl.value=this.selectControl.selectedIndex!=-1?this.selectControl.options[this.selectControl.selectedIndex].text:"";
this.deactivate(true);
};
nitobi.form.Lookup.prototype.focus=function(evt){
this.textControl.focus();
};
nitobi.form.Lookup.prototype.deactivate=function(evt,o){
var sc=this.selectControl;
var tc=this.textControl;
var text="",_6b2="";
if(evt!=null&&evt!=false){
if(sc.selectedIndex>=0){
_6b2=sc.options[sc.selectedIndex].value;
text=sc.options[sc.selectedIndex].text;
}else{
if(this.column.ModelNode.getAttribute("ForceValidOption")!="true"){
_6b2=tc.value;
text=_6b2;
}else{
_6b2=this.cell.getValue();
var len=sc.options.length;
for(var i=0;i<len;i++){
if(sc.options[i].value==_6b2){
text=sc.options[i].text;
}
}
}
}
}else{
_6b2=this.cell.getValue();
var len=sc.options.length;
for(var i=0;i<len;i++){
if(sc.options[i].value==_6b2){
text=sc.options[i].text;
}
}
}
nitobi.html.detachEvents(this.selectControl,this.events);
sc=null;
window.clearTimeout(this.timeoutId);
if(this.editCompleteHandler!=null){
var _6b5=new nitobi.grid.EditCompleteEventArgs(this,nitobi.html.encode(text),_6b2,this.cell);
_6b5.status=true;
this.editCompleteHandler.call(this.owner,_6b5);
}
};
nitobi.form.Lookup.prototype.handleKey=function(evt,_6b7){
var k=evt.keyCode;
if(this.onKeyDown.notify(evt)==false){
return;
}
if(k==27){
this.deactivate(false);
return;
}
if(evt.ctrlKey&&k==86){
return;
}
if(evt.ctrlKey){
return;
}
switch(k){
case 9:
this.deactivate(true);
break;
case 13:
nitobi.html.cancelEvent(evt);
if(nitobi.browser.IE){
evt.keyCode=32;
}else{
nitobi.html.cancelEvent(evt);
nitobi.html.createEvent("KeyEvents","keydown",evt,{keyCode:0,charCode:32});
}
this.deactivate(true);
break;
case 8:
default:
this.autocompleted=false;
if(!this.bVisible){
this.selectControl.style.display="inline";
}
}
};
nitobi.form.Lookup.prototype.search=function(_6b9){
_6b9=nitobi.xml.constructValidXpathQuery(_6b9,false);
this.searchXslProc.addParameter("searchValue",_6b9.toLowerCase(),"");
var _6ba=nitobi.xml.transformToString(this.listXmlLower,this.searchXslProc);
if(""==_6ba){
_6ba=0;
}else{
_6ba=parseInt(_6ba);
}
return _6ba;
};
nitobi.form.Lookup.prototype.filter=function(evt,o){
if(this.onKeyUp.notify(evt)==false){
return;
}
if(!this.firstKeyup){
this.firstKeyup=true;
return;
}
var k=evt.keyCode;
var tc=this.textControl;
var sc=this.selectControl;
switch(k){
case 38:
if(sc.selectedIndex==-1){
sc.selectedIndex=0;
}
if(sc.selectedIndex>0){
sc.selectedIndex--;
}
tc.value=sc.options[sc.selectedIndex].text;
nitobi.html.highlight(tc,tc.value.length);
tc.select();
break;
case 40:
if(sc.selectedIndex<(sc.length-1)){
sc.selectedIndex++;
}
tc.value=sc.options[sc.selectedIndex].text;
nitobi.html.highlight(tc,tc.value.length);
tc.select();
break;
default:
if(k<193&&k>46){
var _6c0=tc.value;
this.get(_6c0);
}
}
};
nitobi.form.Lookup.prototype.get=function(_6c1,_6c2){
if(this.getHandler!=null&&this.getHandler!=""){
if(_6c2||!this.delay){
this.doGet(_6c1);
}else{
if(this.timeoutId){
window.clearTimeout(this.timeoutId);
this.timeoutId=null;
}
this.timeoutId=window.setTimeout(nitobi.lang.close(this,this.doGet,[_6c1]),this.delay);
}
}
};
nitobi.form.Lookup.prototype.doGet=function(_6c3){
if(_6c3){
this.dataTable.setGetHandlerParameter("SearchString",_6c3);
}
this.dataTable.get(null,this.pageSize,this);
this.timeoutId=null;
this.bindComplete(_6c3);
};
nitobi.form.Lookup.prototype.dispose=function(){
this.placeholder=null;
nitobi.html.detachEvents(this.events,this);
this.textControl=null;
this.owner=null;
};
nitobi.form.Number=function(){
nitobi.form.Number.baseConstructor.call(this);
};
nitobi.lang.extend(nitobi.form.Number,nitobi.form.Text);
nitobi.form.Number.prototype.handleKey=function(evt){
nitobi.form.Number.base.handleKey.call(this,evt);
var k=evt.keyCode;
this.lastKeyCode=k;
if((k<48||k>57)&&(k<37||k>40)&&(k<96||k>105)&&k!=190&&k!=189&&k!=109&&k!=9&&k!=45&&k!=46&&k!=8){
nitobi.html.cancelEvent(evt);
return false;
}
};
nitobi.form.Number.defaultValue=0;
nitobi.form.Password=function(){
nitobi.form.Password.baseConstructor.call(this,true);
this.control.type="password";
};
nitobi.lang.extend(nitobi.form.Password,nitobi.form.Text);
nitobi.form.TextArea=function(){
nitobi.form.TextArea.baseConstructor.call(this);
var div=document.createElement("div");
div.innerHTML="<table border='0' cellpadding='0' cellspacing='0' class='ntbinputborder'><tr><td></td></table>";
this.placeholder=div.firstChild;
this.control=document.createElement("textarea");
this.control.style.border="0px";
this.control.className="ntbinput";
this.control.style.width="100%";
this.placeholder.style.position="absolute";
this.placeholder.style.top="-2000px";
this.placeholder.style.left="-2000px";
this.placeholder.style.zIndex=2000;
};
nitobi.lang.extend(nitobi.form.TextArea,nitobi.form.Text);
nitobi.form.TextArea.prototype.initialize=function(){
this.placeholder.rows[0].cells[0].appendChild(this.control);
document.body.appendChild(this.placeholder);
nitobi.html.attachEvents(this.control,this.events,this);
};
nitobi.form.TextArea.prototype.mimic=function(){
nitobi.form.TextArea.base.mimic.call(this);
this.placeholder.style.height=parseInt(this.placeholder.style.height)*2+"px";
this.placeholder.style.width=parseInt(this.placeholder.style.width)*1.5+"px";
this.control.style.height=this.placeholder.style.height;
this.control.style.width=this.placeholder.style.width;
};
nitobi.form.TextArea.prototype.handleKey=function(evt,o){
var k=evt.keyCode;
if(this.onKeyDown.notify(evt)==false){
return;
}
switch(k){
case 40:
break;
case 38:
break;
case 37:
break;
case 39:
break;
case 13:
nitobi.html.cancelEvent(evt);
if(nitobi.browser.IE){
evt.keyCode=32;
}
if(!evt.shiftKey){
if(nitobi.browser.MOZ){
nitobi.html.createEvent("KeyEvents","keydown",evt,{"keyCode":0,"charCode":32});
}
this.deactivate();
}else{
if(nitobi.browser.MOZ){
nitobi.html.createEvent("KeyEvents","keypress",evt,{"keyCode":13,"charCode":0});
}
if(this.control.createTextRange){
this.control.focus();
var _6ca=document.selection.createRange();
_6ca.text="\n";
_6ca.collapse(false);
_6ca.select();
}
}
break;
case 9:
break;
case 27:
nitobi.html.detachEvent(this.control,"blur",this.deactivate);
this.hide();
this.owner.focus();
break;
default:
}
};
nitobi.form.Calendar=function(){
nitobi.form.Calendar.baseConstructor.call(this);
var div=document.createElement("div");
div.innerHTML="<table border='0' cellpadding='0' cellspacing='0' style='table-layout:fixed;' class='ntb-dp-input'><tr><td></td><td>"+"<input type='text' style='width:100%;' />"+"</td><td class='ntb-dp-inputbutton'><a href='#' onclick='return false;'></a></td></tr><tr><td colspan='3'><div style='width:1px;height:1px;position:relative;'><!-- --></div></td></tr><colgroup><col style='width:4px;'></col><col></col><col style='width:20px;'></col></colgroup></table>";
this.control=div.getElementsByTagName("input")[0];
this.container=div.firstChild;
this.container.object=this;
this.container.style.position="absolute";
this.container.style.top="-3000px";
this.container.style.zIndex=2000;
this.container.style.left="-3000px";
this.control.setAttribute("maxlength",255);
this.pickerDiv=document.createElement("div");
this.pickerDiv.style.position="absolute";
this.pickerDiv.style.top="2px";
this.pickerDiv.style.left="-1px";
this.isPickerVisible=false;
nitobi.html.Css.addClass(this.pickerDiv,NTB_CSS_HIDE);
this.container.rows[1].cells[0].firstChild.appendChild(this.pickerDiv);
};
nitobi.lang.extend(nitobi.form.Calendar,nitobi.form.Control);
nitobi.form.Calendar.prototype.initialize=function(){
document.body.appendChild(this.container);
this.datePicker=new nitobi.calendar.DatePicker(nitobi.component.getUniqueId());
this.datePicker.setContainer(this.pickerDiv);
this.datePicker.onSetDate.subscribe(this.handlePick,this);
nitobi.html.attachEvent(this.control,"keydown",this.handleKey,this,false);
nitobi.html.attachEvent(this.control,"blur",this.deactivate,this,false);
nitobi.html.attachEvent(this.pickerDiv,"mousedown",function(){
this.dontBlur=true;
},this);
nitobi.html.attachEvent(this.pickerDiv,"mouseup",function(){
this.control.focus();
},this);
var a=this.container.getElementsByTagName("a")[0];
nitobi.html.attachEvent(a,"mousedown",this.handleClick,this);
nitobi.html.attachEvent(a,"mouseup",function(){
this.control.focus();
},this);
};
nitobi.form.Calendar.prototype.attachToParent=function(_6cd){
_6cd.appendChild(this.container);
};
nitobi.form.Calendar.prototype.bind=function(_6ce,cell,_6d0){
this.isPickerVisible=false;
nitobi.html.Css.addClass(this.pickerDiv,NTB_CSS_HIDE);
nitobi.form.Calendar.base.bind.apply(this,arguments);
if(_6d0!=null&&_6d0!=""){
this.control.value=_6d0;
}else{
this.control.value=cell.getValue();
}
this.column=this.cell.getColumnObject();
this.control.maxlength=this.column.ModelNode.getAttribute("MaxLength");
};
nitobi.form.Calendar.prototype.render=function(){
this.domNode.appendChild(this.container);
};
nitobi.form.Calendar.prototype.mimic=function(){
var oY=0;
var oX=0;
if(nitobi.browser.MOZ){
oY=this.owner.Scroller.scrollSurface.scrollTop-nitobi.form.EDITOR_OFFSETY;
oX=this.owner.Scroller.scrollSurface.scrollLeft-nitobi.form.EDITOR_OFFSETX;
}
nitobi.drawing.align(this.container,this.cell.getDomNode(),286265344,0,0,-oY,-oX);
this.control.focus();
if(this.control.createTextRange){
var _6d3=this.control.createTextRange();
_6d3.collapse(false);
_6d3.select();
}
};
nitobi.form.Calendar.prototype.hide=function(){
this.container.style.left="-2000px";
};
nitobi.form.Calendar.prototype.deactivate=function(){
if(this.dontBlur){
this.dontBlur=false;
this.control.focus();
return;
}
var node=this.container.rows[0].cells[2].firstChild;
if(this.lastKeyCode==27){
return;
}
if(nitobi.form.Calendar.base.deactivate.apply(this,arguments)==false){
return;
}
var _6d5=this.control.value;
if(this.editCompleteHandler!=null){
var _6d6=new nitobi.grid.EditCompleteEventArgs(this,_6d5,_6d5,this.cell);
var _6d7=this.editCompleteHandler.call(this.owner,_6d6);
if(!_6d7){
this.blur=false;
}
return _6d7;
}
};
nitobi.form.Calendar.prototype.handleClick=function(evt,_6d9){
if(!this.isPickerVisible){
this.datePicker.setDate(nitobi.base.DateMath.parseIso8601(this.control.value));
this.datePicker.render();
}
this.dontBlur=true;
var node=this.container.rows[0].cells[2].firstChild;
nitobi.ui.Effects.setVisible(this.pickerDiv,!this.isPickerVisible,"none",this.setVisibleComplete,this);
this.control.focus();
};
nitobi.form.Calendar.prototype.setVisibleComplete=function(){
this.isPickerVisible=!this.isPickerVisible;
};
nitobi.form.Calendar.prototype.handlePick=function(){
var date=this.datePicker.getDate();
var _6dc=nitobi.base.DateMath.toIso8601(date);
this.control.value=_6dc;
};
nitobi.form.Calendar.prototype.handleKey=function(evt){
var k=evt.keyCode;
this.lastKeyCode=k;
switch(k){
case 27:
this.control.onblur=null;
this.hide();
this.owner.focus();
break;
case 9:
var _6df=this.deactivate();
if(!_6df){
nitobi.html.cancelBubble(evt);
break;
}
if(nitobi.browser.IE){
evt.keyCode="";
}
var x=1;
if(evt.shiftKey){
x=-1;
}
this.owner.move(x,0);
nitobi.html.cancelBubble(evt);
break;
case 40:
case 38:
break;
case 13:
this.control.blur();
evt.returnValue=false;
break;
default:
}
};
nitobi.form.Calendar.prototype.dispose=function(){
this.container.object=null;
nitobi.html.detachEvent(this.control,"keydown",this.handleKey);
nitobi.html.detachEvent(this.control,"blur",this.deactivate);
var _6e1=this.container.parentNode;
_6e1.removeChild(this.container);
this.domNode=null;
this.control=null;
this.container=null;
this.owner=null;
this.cell=null;
};
nitobi.ui.UiElement=function(xml,xsl,id){
if(arguments.length>0){
this.initialize(xml,xsl,id);
}
};
nitobi.ui.UiElement.prototype.initialize=function(xml,xsl,id){
this.m_Xml=xml;
this.m_Xsl=xsl;
this.m_Id=id;
this.m_HtmlElementHandle=null;
};
nitobi.ui.UiElement.prototype.getHeight=function(){
return this.getHtmlElementHandle().style.height;
};
nitobi.ui.UiElement.prototype.setHeight=function(_6e8){
this.getHtmlElementHandle().style.height=_6e8+"px";
};
nitobi.ui.UiElement.prototype.getId=function(){
return this.m_Id;
};
nitobi.ui.UiElement.prototype.setId=function(id){
this.m_Id=id;
};
nitobi.ui.UiElement.prototype.getWidth=function(){
return this.getHtmlElementHandle().style.width;
};
nitobi.ui.UiElement.prototype.setWidth=function(_6ea){
this.getHtmlElementHandle().style.width=_6ea+"px";
};
nitobi.ui.UiElement.prototype.getXml=function(){
return this.m_Xml;
};
nitobi.ui.UiElement.prototype.setXml=function(xml){
this.m_Xml=xml;
};
nitobi.ui.UiElement.prototype.getXsl=function(){
return this.m_Xsl;
};
nitobi.ui.UiElement.prototype.setXsl=function(xsl){
this.m_Xsl=xsl;
};
nitobi.ui.UiElement.prototype.getHtmlElementHandle=function(){
if(!this.m_HtmlElementHandle){
this.m_HtmlElementHandle=document.getElementById(this.m_Id);
}
return this.m_HtmlElementHandle;
};
nitobi.ui.UiElement.prototype.setHtmlElementHandle=function(_6ed){
this.m_HtmlElementHandle=_6ed;
};
nitobi.ui.UiElement.prototype.hide=function(){
var tag=this.getHtmlElementHandle();
tag.style.visibility="hidden";
tag.style.position="absolute";
};
nitobi.ui.UiElement.prototype.show=function(){
var tag=this.getHtmlElementHandle();
tag.style.visibility="visible";
};
nitobi.ui.UiElement.prototype.isVisible=function(){
var tag=this.getHtmlElementHandle();
return tag.style.visibility=="visible";
};
nitobi.ui.UiElement.prototype.beginFloatMode=function(){
var tag=this.getHtmlElementHandle();
tag.style.position="absolute";
};
nitobi.ui.UiElement.prototype.isFloating=function(){
var tag=this.getHtmlElementHandle();
return tag.style.position=="absolute";
};
nitobi.ui.UiElement.prototype.setX=function(x){
var tag=this.getHtmlElementHandle();
tag.style.left=x+"px";
};
nitobi.ui.UiElement.prototype.getX=function(){
var tag=this.getHtmlElementHandle();
return tag.style.left;
};
nitobi.ui.UiElement.prototype.setY=function(y){
var tag=this.getHtmlElementHandle();
tag.style.top=y+"px";
};
nitobi.ui.UiElement.prototype.getY=function(){
var tag=this.getHtmlElementHandle();
return tag.style.top;
};
nitobi.ui.UiElement.prototype.render=function(_6f9,_6fa,_6fb){
var xsl=this.m_Xsl;
if(xsl!=null&&xsl.indexOf("xsl:stylesheet")==-1){
xsl="<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:output method=\"html\" version=\"4.0\" />"+xsl+"</xsl:stylesheet>";
}
if(null==_6fa){
_6fa=nitobi.xml.createXslDoc(xsl);
}
if(null==_6fb){
_6fb=nitobi.xml.createXmlDoc(this.m_Xml);
}
Eba.Error.assert(nitobi.xml.isValidXml(_6fb),"Tried to render invalid XML according to Mozilla. The XML is "+_6fb.xml);
var html=nitobi.xml.transform(_6fb,_6fa);
if(html.xml){
html=html.xml;
}
if(null==_6f9){
document.body.insertAdjacentHTML("beforeEnd",html);
}else{
_6f9.innerHTML=html;
}
this.attachToTag();
};
nitobi.ui.UiElement.prototype.attachToTag=function(){
var _6fe=this.getHtmlElementHandle();
if(_6fe!=null){
_6fe.object=this;
_6fe.jsobject=this;
_6fe.javascriptObject=this;
}
};
nitobi.ui.UiElement.prototype.dispose=function(){
var _6ff=this.getHtmlElementHandle();
if(_6ff!=null){
_6ff.object=null;
}
this.m_Xml=null;
this.m_Xsl=null;
this.m_HtmlElementHandle=null;
};
nitobi.ui.InteractiveUiElement=function(_700){
this.enable();
};
nitobi.lang.extend(nitobi.ui.InteractiveUiElement,nitobi.ui.UiElement);
nitobi.ui.InteractiveUiElement.prototype.enable=function(){
this.m_Enabled=true;
};
nitobi.ui.InteractiveUiElement.prototype.disable=function(){
this.m_Enabled=false;
};
nitobi.ui.ButtonXsl="<xsl:template match=\"button\">"+"<div class=\"EbaButton\" onmousemove=\"return false;\" onmousedown=\"if (this.object.m_Enabled) this.className='EbaButtonDown';\" onmouseup=\"this.className='EbaButton';\" onmouseover=\"if (this.object.m_Enabled) this.className='EbaButtonHighlight';\" onmouseout=\"this.className='EbaButton';\" align=\"center\">"+"<xsl:attribute name=\"image_disabled\">"+"<xsl:choose>"+"<xsl:when test=\"../../@image_directory\">"+"<xsl:value-of select=\"concat(../../@image_directory,@image_disabled)\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"@image_disabled\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"<xsl:attribute name=\"image_enabled\">"+"<xsl:choose>"+"<xsl:when test=\"../../@image_directory\">"+"<xsl:value-of select=\"concat(../../@image_directory,@image)\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"@image\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"<xsl:attribute name=\"title\">"+"<xsl:value-of select=\"@tooltip_text\" />"+"</xsl:attribute>"+"<xsl:attribute name=\"onclick\">"+"<xsl:value-of select='concat(&quot;v&quot;,&quot;a&quot;,&quot;r&quot;,&quot; &quot;,&quot;e&quot;,&quot;=&quot;,&quot;&apos;&quot;,@onclick_event,&quot;&apos;&quot;,&quot;;&quot;,&quot;e&quot;,&quot;v&quot;,&quot;a&quot;,&quot;l&quot;,&quot;(&quot;,&quot;t&quot;,&quot;h&quot;,&quot;i&quot;,&quot;s&quot;,&quot;.&quot;,&quot;o&quot;,&quot;b&quot;,&quot;j&quot;,&quot;e&quot;,&quot;c&quot;,&quot;t&quot;,&quot;.&quot;,&quot;o&quot;,&quot;n&quot;,&quot;C&quot;,&quot;l&quot;,&quot;i&quot;,&quot;c&quot;,&quot;k&quot;,&quot;H&quot;,&quot;a&quot;,&quot;n&quot;,&quot;d&quot;,&quot;l&quot;,&quot;e&quot;,&quot;r&quot;,&quot;(&quot;,&quot;e&quot;,&quot;)&quot;,&quot;)&quot;,&quot;;&quot;,&apos;&apos;)' />"+"</xsl:attribute>"+"<xsl:attribute name=\"id\">"+"<xsl:value-of select=\"@id\" />"+"</xsl:attribute>"+"<xsl:attribute name=\"style\">"+"<xsl:choose>"+"<xsl:when test=\"../../@height\">"+"<xsl:value-of select=\"concat('float:left;width:',../../@height,'px;height:',../../@height - 1,'px')\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"concat('float:left;width:',@width,'px;height:',@height,'px')\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"<img border=\"0\">"+"<xsl:attribute name=\"src\">"+"<xsl:choose>"+"<xsl:when test=\"../../@image_directory\">"+"<xsl:value-of select=\"concat(../../@image_directory,@image)\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"@image\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"<xsl:attribute name=\"style\">"+"<xsl:variable name=\"top_offset\">"+"<xsl:choose>"+"<xsl:when test=\"@top_offset\">"+"<xsl:value-of select=\"@top_offset\" />"+"</xsl:when>"+"<xsl:otherwise>"+"0"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:variable>"+"<xsl:choose>"+"<xsl:when test=\"../../@height\">"+"<xsl:value-of select=\"concat('MARGIN-TOP:',((../../@height - @height) div 2) - 1 + number($top_offset),'px;MARGIN-BOTTOM:0px')\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"concat('MARGIN-TOP:',(@height - @image_height) div 2,'px;MARGIN-BOTTOM:0','px')\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"</img><![CDATA[ ]]>"+"</div>"+"</xsl:template>";
nitobi.ui.Button=function(xml,id){
this.initialize(xml,nitobi.ui.ButtonXsl,id);
this.enable();
};
nitobi.lang.extend(nitobi.ui.Button,nitobi.ui.InteractiveUiElement);
nitobi.ui.Button.prototype.onClickHandler=function(_703){
if(this.m_Enabled){
eval(_703);
}
};
nitobi.ui.Button.prototype.disable=function(){
nitobi.ui.Button.base.disable.call(this);
var _704=this.getHtmlElementHandle();
_704.childNodes[0].src=_704.getAttribute("image_disabled");
};
nitobi.ui.Button.prototype.enable=function(){
nitobi.ui.Button.base.enable.call(this);
var _705=this.getHtmlElementHandle();
_705.childNodes[0].src=_705.getAttribute("image_enabled");
};
nitobi.ui.Button.prototype.dispose=function(){
nitobi.ui.Button.base.dispose.call(this);
};
nitobi.ui.BinaryStateButtonXsl="<xsl:template match=\"binarystatebutton\">"+"<div class=\"EbaBinaryStateButton\" onmousemove=\"return false;\" onmousedown=\"if (this.object.m_Enabled) this.className='EbaButtonDown';\" onmouseup=\"(this.object.isChecked()?this.object.check():this.object.uncheck())\" onmouseover=\"if (this.object.m_Enabled) this.className='EbaButtonHighlight';\" onmouseout=\"(this.object.isChecked()?this.object.check():this.object.uncheck())\" align=\"center\">"+"<xsl:attribute name=\"image_disabled\">"+"<xsl:choose>"+"<xsl:when test=\"../../@image_directory\">"+"<xsl:value-of select=\"concat(../../@image_directory,@image_disabled)\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"@image_disabled\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"<xsl:attribute name=\"image_enabled\">"+"<xsl:choose>"+"<xsl:when test=\"../../@image_directory\">"+"<xsl:value-of select=\"concat(../../@image_directory,@image)\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"@image\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"<xsl:attribute name=\"title\">"+"<xsl:value-of select=\"@tooltip_text\" />"+"</xsl:attribute>"+"<xsl:attribute name=\"onclick\">"+"<xsl:value-of select='concat(\"this.object.toggle();\",&quot;v&quot;,&quot;a&quot;,&quot;r&quot;,&quot; &quot;,&quot;e&quot;,&quot;=&quot;,&quot;&apos;&quot;,@onclick_event,&quot;&apos;&quot;,&quot;;&quot;,&quot;e&quot;,&quot;v&quot;,&quot;a&quot;,&quot;l&quot;,&quot;(&quot;,&quot;t&quot;,&quot;h&quot;,&quot;i&quot;,&quot;s&quot;,&quot;.&quot;,&quot;o&quot;,&quot;b&quot;,&quot;j&quot;,&quot;e&quot;,&quot;c&quot;,&quot;t&quot;,&quot;.&quot;,&quot;o&quot;,&quot;n&quot;,&quot;C&quot;,&quot;l&quot;,&quot;i&quot;,&quot;c&quot;,&quot;k&quot;,&quot;H&quot;,&quot;a&quot;,&quot;n&quot;,&quot;d&quot;,&quot;l&quot;,&quot;e&quot;,&quot;r&quot;,&quot;(&quot;,&quot;e&quot;,&quot;)&quot;,&quot;)&quot;,&quot;;&quot;,&apos;&apos;)' />"+"</xsl:attribute>"+"<xsl:attribute name=\"id\">"+"<xsl:value-of select=\"@id\" />"+"</xsl:attribute>"+"<xsl:attribute name=\"style\">"+"<xsl:choose>"+"<xsl:when test=\"../../@height\">"+"<xsl:value-of select=\"concat('float:left;width:',../../@height,'px;height:',../../@height - 1,'px')\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"concat('float:left;width:',@width,'px;height:',@height,'px')\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"<img border=\"0\">"+"<xsl:attribute name=\"src\">"+"<xsl:choose>"+"<xsl:when test=\"../../@image_directory\">"+"<xsl:value-of select=\"concat(../../@image_directory,@image)\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"@image\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"<xsl:attribute name=\"style\">"+"<xsl:variable name=\"top_offset\">"+"<xsl:choose>"+"<xsl:when test=\"@top_offset\">"+"<xsl:value-of select=\"@top_offset\" />"+"</xsl:when>"+"<xsl:otherwise>"+"0"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:variable>"+"<xsl:choose>"+"<xsl:when test=\"../../@height\">"+"<xsl:value-of select=\"concat('MARGIN-TOP:',((../../@height - @height) div 2) - 1 + number($top_offset),'px;MARGIN-BOTTOM:0px')\" />"+"</xsl:when>"+"<xsl:otherwise>"+"<xsl:value-of select=\"concat('MARGIN-TOP:',(@height - @image_height) div 2,'px;MARGIN-BOTTOM:0','px')\" />"+"</xsl:otherwise>"+"</xsl:choose>"+"</xsl:attribute>"+"</img><![CDATA[ ]]>"+"</div>"+"</xsl:template>";
nitobi.ui.BinaryStateButton=function(xml,id){
this.initialize(xml,nitobi.ui.BinaryStateButtonXsl,id);
this.m_Checked=false;
};
nitobi.lang.extend(nitobi.ui.BinaryStateButton,nitobi.ui.Button);
nitobi.ui.BinaryStateButton.prototype.isChecked=function(){
return this.m_Checked;
};
nitobi.ui.BinaryStateButton.prototype.check=function(){
var _708=this.getHtmlElementHandle();
_708.className="EbaButtonChecked";
this.m_Checked=true;
};
nitobi.ui.BinaryStateButton.prototype.uncheck=function(){
var _709=this.getHtmlElementHandle();
_709.className="EbaButton";
this.m_Checked=false;
};
nitobi.ui.BinaryStateButton.prototype.toggle=function(){
var _70a=this.getHtmlElementHandle();
if(_70a.className=="EbaButtonChecked"){
this.uncheck();
}else{
this.check();
}
};
nitobi.ui.ToolbarXsl="<xsl:template match=\"//toolbar\">"+"<div class=\"EbaToolbar\" style=\"z-index:800\">"+"<xsl:attribute name=\"id\">"+"<xsl:value-of select=\"@id\" />"+"</xsl:attribute>"+"<xsl:attribute name=\"style\">float:left;position:relative;"+"<xsl:value-of select=\"concat('width:',@width,'px;height:',@height,'px')\" />"+"</xsl:attribute>"+"<div id=\"ToolbarTitle\" onmousedown=\"this.parentNode.jsobject.dragWindow(event)\" ondblclick=\"this.parentNode.jsobject.dock()\" style=\"width:100%;position:absolute;visibility:hidden\">"+"<div class=\"EbaToolbarTitle\" >"+"<div style=\"float:right;\" onclick=\"this.parentNode.parentNode.parentNode.jsobject.dock();\">^</div>"+"<xsl:value-of select=\"@title\"/>"+"</div>"+"</div> "+"<div onmousedown=\"this.parentNode.jsobject.startDrag(event)\" id=\"handle\" style=\"width:10px;height:100%;float:left;\" class=\"EbaToolbarHandle\"><span></span></div>"+"<xsl:apply-templates />"+"</div>"+"</xsl:template>"+nitobi.ui.ButtonXsl+nitobi.ui.BinaryStateButtonXsl+"<xsl:template match=\"separator\">"+"<div align='center'>"+"<xsl:attribute name=\"style\">"+"<xsl:value-of select=\"concat('float:left;width:',@width,';height:',@height)\" />"+"</xsl:attribute>"+"<xsl:attribute name=\"id\">"+"<xsl:value-of select=\"@id\" />"+"</xsl:attribute>"+"<img border='0'>"+"<xsl:attribute name=\"src\">"+"<xsl:value-of select=\"concat(//@image_directory,@image)\" />"+"</xsl:attribute>"+"<xsl:attribute name=\"style\">"+"<xsl:value-of select=\"concat('MARGIN-TOP:3','px;MARGIN-BOTTOM:0','px')\" />"+"</xsl:attribute>"+"</img>"+"</div>"+"</xsl:template>";
nitobi.ui.Toolbar=function(xml,id){
nitobi.ui.Toolbar.baseConstructor.call(this);
this.initialize(xml,nitobi.ui.ToolbarXsl,id);
this.m_isFloating=false;
};
nitobi.lang.extend(nitobi.ui.Toolbar,nitobi.ui.InteractiveUiElement);
nitobi.ui.Toolbar.prototype.getUiElements=function(){
return this.m_UiElements;
};
nitobi.ui.Toolbar.prototype.setUiElements=function(_70d){
this.m_UiElements=_70d;
};
nitobi.ui.Toolbar.prototype.attachButtonObjects=function(){
if(!this.m_UiElements){
this.m_UiElements=new Array();
var tag=this.getHtmlElementHandle();
var _70f=tag.childNodes;
for(var i=0;i<_70f.length;i++){
var _711=_70f[i];
if(_711.nodeType!=3&&_711.className!="EbaToolbarTitle"&&_711.className!="EbaToolbarHandle"){
var _712;
switch(_711.className){
case ("EbaButton"):
_712=new nitobi.ui.Button(null,_711.id);
break;
case ("EbaBinaryStateButton"):
_712=new nitobi.ui.BinaryStateButton(null,_711.id);
break;
default:
_712=new nitobi.ui.UiElement(null,null,_711.id);
break;
}
_712.attachToTag();
this.m_UiElements[_711.id]=_712;
}
}
}
};
nitobi.ui.Toolbar.prototype.render=function(_713){
nitobi.ui.Toolbar.base.base.render.call(this,_713);
this.attachButtonObjects();
};
nitobi.ui.Toolbar.prototype.disableAllElements=function(){
for(var i in this.m_UiElements){
if(this.m_UiElements[i].disable){
this.m_UiElements[i].disable();
}
}
};
nitobi.ui.Toolbar.prototype.enableAllElements=function(){
for(var i in this.m_UiElements){
if(this.m_UiElements[i].enable){
this.m_UiElements[i].enable();
}
}
};
nitobi.ui.Toolbar.prototype.attachToTag=function(){
nitobi.ui.Toolbar.base.base.attachToTag.call(this);
this.attachButtonObjects();
};
nitobi.ui.Toolbar.prototype.getGrabbyElement=function(){
var tag=this.getHtmlElementHandle();
return tag.childNodes[1];
};
nitobi.ui.Toolbar.prototype.dragStart=function(){
var tag=this.getHtmlElementHandle();
return tag.childNodes[1];
};
nitobi.ui.Toolbar.prototype.startDrag=function(_718){
var evt;
if(nitobi.browser.IE){
evt=window.event;
}else{
evt=_718;
}
var tag=this.getHtmlElementHandle();
var _71b=this.getGrabbyElement();
_71b.style.visibility="hidden";
_71b.style.position="absolute";
this.dragDiv=document.getElementById("toolbar_window"+tag.id);
if(null==this.dragDiv){
this.dragDiv=document.createElement("toolbar_window"+tag.id);
document.body.appendChild(this.dragDiv);
this.dragDiv.jsobject=this;
}
tag.swapNode(this.dragDiv);
tag.style.position="absolute";
var This=this;
if(nitobi.browser.IE){
x=window.event.clientX+document.documentElement.scrollLeft+document.body.scrollLeft;
y=window.event.clientY+document.documentElement.scrollTop+document.body.scrollTop;
}else{
x=_718.clientX+window.scrollX;
y=_718.clientY+window.scrollY;
}
tag.style.top=y-5;
tag.style.left=x-5;
var _71d=tag.childNodes[0].style;
_71d.visibility="visible";
_71d.position="";
tag.style.height="41px";
tag.className="EbaToolbarFloating";
nitobi.ui.startDragOperation(tag,_718);
if(!this.m_isFloating&&this.undockEvent){
this.m_isFloating=true;
this.undockEvent();
}else{
if(!this.m_isFloating){
this.m_isFloating=true;
}
}
};
nitobi.ui.Toolbar.prototype.dragWindow=function(_71e){
var evt;
if(nitobi.browser.IE){
evt=window.event;
}else{
evt=_71e;
}
nitobi.ui.startDragOperation(this.getHtmlElementHandle(),_71e);
};
nitobi.ui.Toolbar.prototype.dock=function(){
var tag=this.getHtmlElementHandle();
tag.style.position="";
tag.style.height="23px";
tag.className="EbaToolbar";
var _721=tag.childNodes[0].style;
_721.position="absolute";
_721.visibility="hidden";
tag.swapNode(this.dragDiv);
var _722=this.getGrabbyElement();
_722.style.visibility="visible";
_722.style.position="";
this.m_isFloating=false;
if(this.dockEvent){
this.dockEvent();
}
tag=null;
_721=null;
};
nitobi.ui.Toolbar.prototype.dispose=function(){
if(typeof (this.m_UiElements)!="undefined"){
for(var _723 in this.m_UiElements){
this.m_UiElements[_723].dispose();
}
this.m_UiElements=null;
}
nitobi.ui.Toolbar.base.dispose.call(this);
};
nitobi.lang.defineNs("nitobi.calendar");
if(false){
nitobi.calendar=function(){
};
}
nitobi.calendar.DatePicker=function(_724){
nitobi.prepare();
nitobi.calendar.DatePicker.baseConstructor.call(this,_724);
this.renderer=new nitobi.calendar.Renderer();
this.onSetDate=new nitobi.base.Event();
this.eventMap["setdate"]=this.onSetDate;
if(!this.getStartDate()){
var date=nitobi.base.DateMath.getMonthStart(this.getDate()||new Date());
this.setStartDate(date);
}
this.subscribeDeclarationEvents();
};
nitobi.lang.extend(nitobi.calendar.DatePicker,nitobi.ui.Element);
nitobi.base.Registry.getInstance().register(new nitobi.base.Profile("nitobi.calendar.DatePicker",null,false,"ntb:datepicker"));
nitobi.calendar.DatePicker.prototype.getDate=function(){
return this.getDateAttribute("date");
};
nitobi.calendar.DatePicker.prototype.setDate=function(date){
if(arguments.length<1){
date=new Date();
}else{
if(arguments.length>1){
date=eval("new Date("+nitobi.lang.toArray(arguments).join(",")+")");
}else{
if(typeof date!="object"){
date=new Date(date);
}
}
}
if(nitobi.base.DateMath.invalid(date)){
date=null;
}
this.setDateAttribute("date",date);
var _727=this.getHtmlNode("value");
if(_727){
_727.value=this.getFormatter()(date);
}
this.onSetDate.notify(new nitobi.ui.ElementEventArgs(this,this.onSetDate));
};
nitobi.calendar.DatePicker.prototype.getStartDate=function(){
return this.getDateAttribute("startdate");
};
nitobi.calendar.DatePicker.prototype.setStartDate=function(date){
date=nitobi.base.DateMath.subtract(date,"d",date.getDay());
this.setDateAttribute("startdate",date);
};
nitobi.calendar.DatePicker.prototype.isTimePickerEnabled=function(){
return this.getBoolAttribute("timepickerenabled",false);
};
nitobi.calendar.DatePicker.prototype.setTimePickerEnabled=function(_729){
this.setBoolAttribute("timepickerenabled",_729);
};
nitobi.calendar.DatePicker.prototype.getWidth=function(){
return this.getIntAttribute("width",180);
};
nitobi.calendar.DatePicker.prototype.getHeight=function(){
return this.getIntAttribute("height",192);
};
nitobi.calendar.DatePicker.prototype.getCssClass=function(){
return this.getAttribute("cssclass","");
};
nitobi.calendar.DatePicker.prototype.getState=function(){
return this;
};
nitobi.calendar.DatePicker.prototype.getFormattedDate=function(){
return this.getFormatter().call(this,this.getDate());
};
nitobi.calendar.DatePicker.prototype.nextMonth=function(){
var date=this.getStartDate();
date=nitobi.base.DateMath.getMonthStart(nitobi.base.DateMath.add(date,"d",42));
this.setStartDate(date);
this.render();
};
nitobi.calendar.DatePicker.prototype.prevMonth=function(){
var date=this.getStartDate();
date=nitobi.base.DateMath.getMonthStart(nitobi.base.DateMath.add(date,"d",-12));
this.setStartDate(date);
this.render();
};
nitobi.calendar.DatePicker.prototype.getFormatter=function(){
if(this.formatter){
return this.formatter;
}
eval("var f = "+this.getAttribute("formatter","nitobi.base.DateMath.toIso8601"));
return this.formatter=f;
};
nitobi.calendar.DatePicker.prototype.setFormatter=function(_72c){
this.formatter=_72c;
};
nitobi.calendar.DatePicker.prototype.handleClick=function(evt,_72e){
var td=evt.srcElement;
if(td.nodeName!="TD"){
return;
}
var _730=this.getDate();
if(_730){
var days=nitobi.base.DateMath.getNumberOfDays(this.getStartDate(),_730)-1;
if(days>=0&&days<42){
var row=2+Math.floor(days/7);
var col=days%7;
var _734=this.getHtmlNode("table");
nitobi.html.Css.removeClass(_734.rows[row].cells[col],"ntb-dp-currentday");
}
}
var tr=_72e;
nitobi.html.Css.addClass(td,"ntb-dp-currentday");
var date=nitobi.base.DateMath.add(nitobi.base.DateMath.clone(this.getStartDate()),"d",(tr.rowIndex-2)*7+td.cellIndex);
this.setDate(date);
};
nitobi.calendar.DatePicker.prototype.render=function(){
nitobi.calendar.DatePicker.base.render.call(this);
var rows=this.getHtmlNode().getElementsByTagName("tr");
for(var i=2;i<8;i++){
nitobi.html.attachEvent(rows[i],"click",this.handleClick,this);
}
nitobi.html.attachEvent(this.getHtmlNode("nextmonth"),"anyclick",this.nextMonth,this);
nitobi.html.attachEvent(this.getHtmlNode("prevmonth"),"anyclick",this.prevMonth,this);
};
nitobi.calendar.DatePicker.prototype.getMonthNames=function(){
return this.monthNames||(this.monthNames=nitobi.calendar.DatePicker.defaultMonthNames);
};
nitobi.calendar.DatePicker.prototype.setMonthNames=function(_739){
this.monthNames=_739;
};
nitobi.calendar.DatePicker.prototype.getDayNames=function(){
return this.dayNames||(this.dayNames=nitobi.calendar.DatePicker.defaultDayNames);
};
nitobi.calendar.DatePicker.prototype.setDayNames=function(_73a){
this.dayNames=_73a;
};
nitobi.calendar.DatePicker.defaultMonthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
nitobi.calendar.DatePicker.defaultDayNames=["S","M","T","W","T","F","S"];
nitobi.lang.defineNs("nitobi.calendar");
nitobi.calendar.Renderer=function(){
nitobi.html.IRenderer.call(this);
};
nitobi.lang.implement(nitobi.calendar.Renderer,nitobi.html.IRenderer);
nitobi.calendar.Renderer.prototype.renderToString=function(_73b){
var _73c=nitobi.base.DateMath;
var _73d=_73b.getDate();
var _73e=_73b.getStartDate();
var date=_73e.getDate();
var _740=_73d?_73c.getNumberOfDays(_73e,_73d)-1:1000;
var _741=_73c.getMonthDays(_73e)-_73e.getDate()+1;
var _742=_73c.add(_73c.clone(_73e),"d",_741);
var _743=_73c.getMonthDays(_742);
_743=_743+_741>42?42-_741:_743;
var id=_73b.getId();
var _745=_741>_743;
var year=_745?_73e.getFullYear():_742.getFullYear();
var _747=_73b.getMonthNames();
var _748=_747[(_73e.getMonth()+!_745)%12];
var _749=_73b.getDayNames();
var str=new nitobi.lang.StringBuilder();
var _74b=true;
var _74c=false;
var _74d=false;
str.append("<div onselectstart=\"return false;\" id=\""+id+"\" class=\"ntb-dp\" style=\"width:"+_73b.getWidth()+"px;height:"+_73b.getHeight()+"px;\"><div id=\""+id+".themer\" style=\"width:100%;height:100%;\" class=\""+_73b.getCssClass()+"\">");
str.append("<table id=\""+id+".table\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"width:100%;height:100%;\" class=\"ntb-dp-table\">");
str.append("<thead><tr class=\"ntb-dp-monthheader\">");
str.append("<th><a id=\""+id+".prevmonth\" class=\"ntb-dp-prevmonth\" href=\"#\" onclick=\"return false;\">&#9650;</a></th>");
str.append("<th colspan=\"5\" style=\"width:70%;overflow-x:hidden;\">");
str.append("<a id=\""+id+".month\" class=\"ntb-dp-month\" href=\"#\" onclick=\"return false;\">"+_748+"</a> ");
str.append("<a id=\""+id+".year\" class=\"ntb-dp-year\" href=\"#\" onclick=\"return false;\">"+year+"</a>");
str.append("</th>");
str.append("<th><a id=\""+id+".nextmonth\" class=\"ntb-dp-nextmonth\" href=\"#\" onclick=\"return false;\">&#9660;</a></th>");
str.append("</tr><tr>");
for(var i=0;i<7;i++){
str.append("<th class=\"ntb-dp-dayheader\">"+_749[i]+"</th>");
}
str.append("</tr></thead><tbody>");
for(var i=0;i<6;i++){
str.append("<tr>");
for(var j=0;j<7;j++){
str.append("<td class=\"");
str.append(!_740--?"ntb-dp-currentday ":"");
if(!_745&&_74b){
str.append("ntb-dp-lastmonth ");
}else{
if((_745&&_74b)||(!_745&&_74c)){
str.append("ntb-dp-thismonth ");
}else{
str.append("ntb-dp-nextmonth");
}
}
str.append(" ntb-dp-day\">"+date+"</td>");
if(_741){
if(!--_741){
_74b=false;
_74c=true;
date=1;
}else{
date++;
}
}else{
if(date==_743){
_74c=false;
_74d=true;
}
date=date==_743?1:date+1;
}
}
str.append("</tr>");
}
str.append("</tbody><colgroup span=\"7\" style=\"width:1/7%\"></colgroup></table><input id=\""+id+".value\" name=\""+id+"\" type=\"hidden\" value=\""+_73b.getFormattedDate()+"\" /></div></div>");
return str.toString();
};


var temp_ntb_apiDoc='<?xml version="1.0" ?><interfaces>	<interface name="nitobi.grid.Cell" tagname="ntb:cell" 			remarkfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaCellApiDocumentation" 			examplefile="http://portal:8090/cgi-bin/trac.cgi/wiki/SharedCodeSnippets" 			summaryfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaCellApiDocumentation">		<summary>nitobi.grid.Cell represents a single data cell in a Grid.</summary>		<properties>			<property name="Row" type="int" access="public" persist="js" default=""				readwrite="read" impact="xsl row" testvalue="1">			</property>			<property name="Column" type="int" access="public" persist="js" default=""				readwrite="read" impact="xsl row" testvalue="1">			</property>			<property name="DomNode" type="xml" access="public" persist="js" default=""				readwrite="read" impact="xsl row" testvalue="1">			</property>			<property name="DataNode" type="xml" access="public" persist="js" default=""				readwrite="read" impact="xsl row" testvalue="1">			</property>		</properties>		<methods>                                   <method name="getCellElement" access="private"></method>            <method name="getRowNumber" access="private"></method>            <method name="getColumnNumber" access="private"></method>                                   <method name="Focus" access="public"></method>		</methods>	</interface>		<interface name="nitobi.grid.Columns" ></interface>		<interface name="nitobi.grid.Column" tagname="ntb:column" 		remarkfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaColumnApiDocumentation" 		examplefile="http://portal:8090/cgi-bin/trac.cgi/wiki/SharedCodeSnippets" 		summaryfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaColumnApiDocumentation">		<summary>nitobi.grid.Column represents a single column of data in a Grid.</summary>		<properties>			<property name="Align" type="string" access="private" persist="model" model="Align" default="&quot;left&quot;"				readwrite="readwrite" impact="xsl row " htmltag="align" testvalue="&quot;&quot;">							</property>			<property name="ClassName" type="string" access="private" persist="model" model="ClassName" default="&quot;&quot;"				readwrite="readwrite" impact="xsl row " htmltag="classname" testvalue="&quot;&quot;">							</property>			<property name="CssStyle" type="string" access="private" persist="model" model="CssStyle" default="&quot;&quot;"				readwrite="readwrite" impact="xsl row " htmltag="cssstyle" testvalue="&quot;&quot;">							</property>			<property name="ColumnName" type="string" access="private" persist="model" model="ColumnName" default="&quot;&quot;"				readwrite="readwrite" impact="xsl row" htmltag="columnname" testvalue="&quot;&quot;">			</property>			<property name="Type" type="string" access="private" persist="model" model="type" code="" default="&quot;text&quot;"				impact="row" readwrite="readwrite" htmltag="type" testvalue="&quot;pcm&quot;">			</property>			<property name="DataType" type="string" access="public" persist="model" model="DataType" default="text" 				readwrite="readwrite" impact="xsl row" code="" testvalue="&quot;text&quot;">			</property>			<property name="Editable" type="bool" access="public" persist="model" model="Editable" default="true" 				readwrite="readwrite" impact="model" htmltag="editable" testvalue="false">			</property>			<property name="Initial" type="string" access="public" default="&quot;&quot;" htmltag="initial"				readwrite="readwrite" persist="model" model="Initial" testvalue="&quot;test&quot;">			</property>			<property name="Label" model="Label" type="string" access="public" default="&quot;&quot;"				htmltag="label" readwrite="read" persist="model meta" impact="xsl row" testvalue="&quot;test&quot;">			</property>			<property name="GetHandler" type="string" access="private" default="&quot;&quot;"				persist="model" model="GetHandler" htmltag="gethandler" readwrite="readwrite" impact="xsl row" testvalue="&quot;test&quot;">			</property>						<property name="DataSource" type="string" access="private" default="&quot;&quot;"				persist="model" model="DataSource" htmltag="datasource" readwrite="readwrite" impact="xsl row" testvalue="&quot;test&quot;">			</property>			<property name="Template" type="string" access="private" default="&quot;&quot;"				persist="model" model="Template" htmltag="template" readwrite="readwrite" impact="xsl row" testvalue="&quot;test&quot;">			</property>			<property name="TemplateUrl" type="string" access="private" default="&quot;&quot;"				persist="model" model="TemplateUrl" htmltag="templateurl" readwrite="readwrite" impact="xsl row" testvalue="&quot;test&quot;">			</property>			<property name="MaxLength" type="int" access="public" default="255" htmltag="maxlength" readwrite="readwrite"				persist="model meta" impact="xsl row" model="maxlength" testvalue="200">			</property>			<property name="SortDirection" model="SortDirection" type="string" access="public"				default="&quot;Desc&quot;" htmltag="sortdirection" readwrite="readwrite" persist="model" impact="sort"				testvalue="&quot;Desc&quot;">			</property>			<property name="SortEnabled" model="SortEnabled" type="bool" access="public"				default="true" htmltag="sortenabled" readwrite="readwrite" persist="model" impact="sort"				testvalue="true">			</property>			<property name="Width" model="Width" type="int" access="public" default="100" htmltag="width"				readwrite="readwrite" persist="model" impact="size css row" testvalue="200">				<include path="//*[@id=\'widthsample\']" type="example"/>			</property>			<property name="Visible" model="Visible" type="bool" access="private" default="true" htmltag="visible"				readwrite="readwrite" persist="model" impact="size css row" testvalue="true">			</property>			<property name="xdatafld" type="string" access="public" default="&quot;&quot;" readwrite="read"				persist="meta model" model="xdatafld" htmltag="xdatafld">			</property>			<property name="Value" type="string" access="public" default="&quot;&quot;" readwrite="read"				persist="meta model" model="Value" htmltag="value">			</property>			<property name="xi" type="int" access="private" default="100" htmltag="xi" readwrite="read"				persist="meta model" model="xi" short="xi">			</property>			<property name="Editor" model="Editor" namespace="Eba.Grid" type="Editor" access="private" default="Eba.Grid.TextEditor" htmltag="editor"				readwrite="readwrite" persist="model" impact="" testvalue="true">			</property>		</properties>		<events>			<event name="OnCellClickEvent" model="OnCellClickEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="oncellclickevent"				persist="model"></event>			<event name="OnBeforeCellClickEvent" model="OnBeforeCellClickEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onbeforecellclickevent"				persist="model"></event>			<event name="OnCellDblClickEvent" model="OnCellDblClickEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="oncelldblclickevent"				persist="model"></event>			<event name="OnHeaderDoubleClickEvent" model="OnHeaderDoubleClickEvent" type="string" access="private" default="&quot;&quot;"				readwrite="readwrite" htmltag="onheaderdoubleclickevent" persist="model"></event>			<event name="OnHeaderClickEvent" model="OnHeaderClickEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onheaderclickevent"				persist="model"></event>			<event name="OnBeforeResizeEvent" model="OnBeforeResizeEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onbeforeresizeevent"				persist="model"></event>			<event name="OnAfterResizeEvent" model="OnAfterResizeEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onafterresizeevent"				persist="model"></event>						<event name="OnCellValidateEvent" model="OnCellValidateEvent" type="string" access="private" default="&quot;&quot;" readwrite="readwrite" htmltag="oncellvalidateevent"				persist="model"></event>			<event name="OnBeforeCellEditEvent" model="OnBeforeCellEditEvent" type="String" access="private" default="&quot;&quot;" readwrite="readwrite" htmltag="onbeforecelleditevent"				persist="model"></event>			<event name="OnAfterCellEditEvent" model="OnAfterCellEditEvent" type="String" access="private" default="&quot;&quot;" readwrite="readwrite" htmltag="onaftercelleditevent"				persist="model"></event>			<event name="OnCellBlurEvent" model="OnCellBlurEvent" type="String" access="private" default="&quot;&quot;" readwrite="readwrite" htmltag="oncellblurevent"				persist="model"></event>			<event name="OnCellFocusEvent" model="OnCellFocusEvent" type="String" access="private" default="&quot;&quot;" readwrite="readwrite" htmltag="oncellfocusevent"				persist="model"></event>			<event name="OnBeforeSortEvent" model="OnBeforeSortEvent" type="String" access="private" default="&quot;&quot;" readwrite="readwrite" htmltag="onbeforesortevent"				persist="model"></event>			<event name="OnAfterSortEvent" model="OnAfterSortEvent" type="String" access="private" default="&quot;&quot;" readwrite="readwrite" htmltag="onaftersortevent"				persist="model"></event>			<event name="OnCellUpdateEvent" model="OnCellUpdateEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="oncellupdateevent"				persist="model"></event>			<event name="OnKeyDownEvent" model="OnKeyDownEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeydownevent" persist="model"></event>			<event name="OnKeyUpEvent" model="OnKeyUpEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeyupevent" persist="model"></event>			<event name="OnKeyPressEvent" model="OnKeyPressEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeypressevent" persist="model"></event>			<event name="OnChangeEvent" model="OnChangeEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onchangeevent" persist="model"></event>		</events>	</interface>	<interface name="EBADateColumn" tagname="ntb:datecolumn" 		remarkfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaDateColumnApiDocumentation" 		examplefile="http://portal:8090/cgi-bin/trac.cgi/wiki/SharedCodeSnippets" 		summaryfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaDateColumnApiDocumentation">		<properties>			<property name="Mask" htmltag="mask" type="string" persist="model" model="Mask"				access="public" readwrite="readwrite" default="&quot;M/d/yyyy&quot;">							</property>			<property name="CalendarEnabled" htmltag="calendarenabled" type="bool" persist="model" model="CalendarEnabled"				access="public" readwrite="readwrite" default="true">						</property>		</properties>	</interface>	<interface name="EBANumberColumn" tagname="ntb:numbercolumn" 		remarkfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaDateColumnApiDocumentation" 		examplefile="http://portal:8090/cgi-bin/trac.cgi/wiki/SharedCodeSnippets" 		summaryfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaDateColumnApiDocumentation">		<properties>			<property name="Align" type="string" access="private" persist="model" model="Align" default="&quot;right&quot;"				readwrite="readwrite" impact="xsl row " htmltag="align" testvalue="&quot;&quot;">							</property>			<property name="Mask" htmltag="mask" type="string" persist="model" model="Mask"				access="public" readwrite="readwrite" default="&quot;#,###.00&quot;">							</property>			<property name="GroupingSeparator" htmltag="groupingseparator" type="string" persist="model" model="GroupingSeparator"				access="public" readwrite="readwrite" default="&quot;,&quot;">							</property>			<property name="DecimalSeparator" htmltag="decimalseparator" type="string" persist="model" model="DecimalSeparator"				access="public" readwrite="readwrite" default="&quot;.&quot;">							</property>		</properties>		<events>			<event name="OnKeyDownEvent" model="OnKeyDownEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeydownevent"				persist="model"></event>			<event name="OnKeyUpEvent" model="OnKeyUpEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeyupevent"				persist="model"></event>			<event name="OnKeyPressEvent" model="OnKeyPressEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeypressevent"				persist="model"></event>			<event name="OnChangeEvent" model="OnChangeEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onchangeevent"				persist="model"></event>		</events>	</interface>	<interface name="EBATextColumn" tagname="ntb:textcolumn" 		remarkfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaTextApiDocumentation" 		examplefile="http://portal:8090/cgi-bin/trac.cgi/wiki/SharedCodeSnippets" 		summaryfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaTextApiDocumentation">	</interface>	<interface name="EBALookupEditor" tagname="ntb:lookupeditor" 		remarkfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaLookupEditor" 		examplefile="http://portal:8090/cgi-bin/trac.cgi/wiki/SharedCodeSnippets" 		summaryfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaLookupEditor">				<properties>			<property name="DatasourceId" htmltag="datasourceid" type="string" persist="model" model="DatasourceId" 				access="public" readwrite="readwrite" default="">			</property>			<property name="Datasource" htmltag="datasource" type="string" persist="model" model="Datasource" 				access="public" readwrite="readwrite" default="">			</property>						<property name="GetHandler" htmltag="gethandler" type="string" persist="model" model="GetHandler" 				access="public" readwrite="readwrite" default="">			</property>			<property name="DisplayFields" htmltag="displayfields" type="string" persist="model" model="DisplayFields"				access="public" readwrite="readwrite" default="">			</property>			<property name="ValueField" htmltag="valuefield" type="string" persist="model" model="ValueField"				access="public" readwrite="readwrite" default="">			</property>			<property name="Delay" htmltag="delay" type="string" persist="model" model="Delay"				access="public" readwrite="readwrite" default="">			</property>			<property name="Size" htmltag="size" type="string" persist="model" model="Size"				access="public" readwrite="readwrite" default="6">			</property>			<property name="ForceValidOption" htmltag="forcevalidoption" type="string" model="ForceValidOption"				access="public" readwrite="readwrite" default="false">			</property>		</properties>		<events>			<event name="OnKeyDownEvent" model="OnKeyDownEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeydownevent"				persist="model"></event>			<event name="OnKeyUpEvent" model="OnKeyUpEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeyupevent"				persist="model"></event>			<event name="OnKeyPressEvent" model="OnKeyPressEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeypressevent"				persist="model"></event>			<event name="OnChangeEvent" model="OnChangeEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onchangeevent"				persist="model"></event>		</events>	</interface>	<interface name="EBACheckboxEditor" tagname="ntb:checkboxeditor" 		remarkfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaCheckboxEditor" 		examplefile="http://portal:8090/cgi-bin/trac.cgi/wiki/SharedCodeSnippets" 		summaryfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaCheckboxEditor">		<properties>			<property name="DatasourceId" htmltag="datasourceid" type="string" persist="model" model="DatasourceId" 				access="public" readwrite="readwrite" default="">								<include path="//*[@id=\'staticdatacheckboxeditor\']" type="example" />							</property>			<property name="Datasource" htmltag="datasource" type="string" persist="model" model="Datasource" 				access="public" readwrite="readwrite" default="">							</property>			<property name="GetHandler" htmltag="gethandler" type="string" persist="model" model="GetHandler" 				access="public" readwrite="readwrite" default="">				<summary>Specifies the URL of the CheckboxEditor\'s gethandler.  The gethandler must return valid XML data in the EBA format.</summary>								<include path="//*[@id=\'staticdatacheckboxeditor\']" type="example" />							</property>			<property name="DisplayFields" htmltag="displayfields" type="string" persist="model" model="DisplayFields"				access="public" readwrite="readwrite" default="">				<summary>Specifies what fields from the datasource specified by DatasourceId or by the GetHandler will populate the CheckboxEditor\'s listbox.</summary>				<remarks>DisplayFields is a pipe-delimited list of data fields (eg. "field1|field2|field3").</remarks>								<include path="//*[@id=\'staticdatacheckboxeditor\']" type="example" />			</property>			<property name="ValueField" htmltag="valuefield" type="string" persist="model" model="ValueField"				access="public" readwrite="readwrite" default="">				<summary>Specifies the field of the CheckboxEditor\'s data source that will populate the cell.</summary>								<include path="//*[@id=\'staticdatacheckboxeditor\']" type="example" />			</property>			<property name="CheckedValue" htmltag="checkedvalue" type="string" persist="model" model="CheckedValue"				access="public" readwrite="readwrite" default="">							</property>			<property name="UnCheckedValue" htmltag="uncheckedvalue" type="string" persist="model" model="UnCheckedValue"				access="public" readwrite="readwrite" default="">							</property>		</properties>	</interface>	<interface name="EBAImageEditor" tagname="ntb:imageeditor" 		remarkfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaImageEditor" 		examplefile="http://portal:8090/cgi-bin/trac.cgi/wiki/SharedCodeSnippets" 		summaryfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaImageEditor">				<properties>			<property name="ImageUrl" htmltag="imageurl" type="string" persist="model" model="ImageUrl"				access="public" readwrite="readwrite" default="">			</property>		</properties>	</interface>	<interface name="EBALinkEditor" tagname="ntb:linkeditor" 		remarkfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaLinkEditor" 		examplefile="http://portal:8090/cgi-bin/trac.cgi/wiki/SharedCodeSnippets" 		summaryfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaLinkEditor">		<properties>		</properties>	</interface>		<interface name="EBATextEditor" tagname="ntb:texteditor" 	remarkfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaTextEditor"     examplefile="http://portal:8090/cgi-bin/trac.cgi/wiki/SharedCodeSnippets"     summaryfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaTextEditor">		<properties>			<property name="MaxLength" htmltag="maxlength" type="int" persist="model" model="MaxLength"				access="public" readwrite="readwrite" default="255">							</property>		</properties>		<events>			<event name="OnKeyDownEvent" model="OnKeyDownEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeydownevent"				persist="model"></event>			<event name="OnKeyUpEvent" model="OnKeyUpEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeyupevent"				persist="model"></event>			<event name="OnKeyPressEvent" model="OnKeyPressEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeypressevent"				persist="model"></event>			<event name="OnChangeEvent" model="OnChangeEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onchangeevent"				persist="model"></event>		</events>	</interface>	<interface name="EBANumberEditor" tagname="ntb:numbereditor">		<properties>		</properties>		<events>			<event name="OnKeyDownEvent" model="OnKeyDownEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeydownevent"				persist="model"></event>			<event name="OnKeyUpEvent" model="OnKeyUpEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeyupevent"				persist="model"></event>			<event name="OnKeyPressEvent" model="OnKeyPressEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeypressevent"				persist="model"></event>			<event name="OnChangeEvent" model="OnChangeEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onchangeevent"				persist="model"></event>		</events>	</interface>	<interface name="EBATextareaEditor" tagname="ntb:textareaeditor" namespace="Eba.Grid" type="Eba.Grid.TextareaEditor" inherits="Editor" jstype="object" 	remarkfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaTextAreaEditor"     examplefile="http://portal:8090/cgi-bin/trac.cgi/wiki/SharedCodeSnippets"     summaryfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaTextAreaEditor">				<properties>			<property name="MaxLength" htmltag="maxlength" type="int" persist="model" model="MaxLength"				access="public" readwrite="readwrite" default="255">							</property>		</properties>		<events>			<event name="OnKeyDownEvent" model="OnKeyDownEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeydownevent"				persist="model"></event>			<event name="OnKeyUpEvent" model="OnKeyUpEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeyupevent"				persist="model"></event>			<event name="OnKeyPressEvent" model="OnKeyPressEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeypressevent"				persist="model"></event>			<event name="OnChangeEvent" model="OnChangeEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onchangeevent"				persist="model"></event>		</events>	</interface>	<interface name="EBALinkEditor" tagname="ntb:linkeditor">		<properties>			<property name="OpenWindow" htmltag="openwindow" type="bool" persist="model" model="OpenWindow"				access="public" readwrite="readwrite" default="true">							</property>		</properties>	</interface>	<interface name="EBADateEditor" tagname="ntb:dateeditor" namespace="Eba.Grid" type="Eba.Grid.DateEditor" inherits="Editor" jstype="object">		<properties>			<property name="Mask" htmltag="mask" type="string" persist="model" model="Mask"				access="public" readwrite="readwrite" default="&quot;M/d/yyyy&quot;">							</property>			<property name="CalendarEnabled" htmltag="calendarenabled" type="bool" persist="model" model="CalendarEnabled"				access="public" readwrite="readwrite" default="true">						</property>		</properties>		<events>			<event name="OnKeyDownEvent" model="OnKeyDownEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeydownevent"				persist="model"></event>			<event name="OnKeyUpEvent" model="OnKeyUpEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeyupevent"				persist="model"></event>			<event name="OnKeyPressEvent" model="OnKeyPressEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeypressevent"				persist="model"></event>			<event name="OnChangeEvent" model="OnChangeEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onchangeevent"				persist="model"></event>		</events>	</interface>	<interface name="EBAListboxEditor" tagname="ntb:listboxeditor" >			<properties>			<property name="DatasourceId" htmltag="datasourceid" type="string" persist="model" model="DatasourceId" 				access="public" readwrite="readwrite" default="">							</property>			<property name="Datasource" htmltag="datasource" type="string" persist="model" model="Datasource" 				access="public" readwrite="readwrite" default="">							</property>			<property name="GetHandler" htmltag="gethandler" type="string" persist="model" model="GetHandler" 				access="public" readwrite="readwrite" default="">							</property>			<property name="DisplayFields" htmltag="displayfields" type="string" persist="model" model="DisplayFields"				access="public" readwrite="readwrite" default="">							</property>			<property name="ValueField" htmltag="valuefield" type="string" persist="model" model="ValueField"				access="public" readwrite="readwrite" default="">							</property>		</properties>		<events>			<event name="OnKeyDownEvent" model="OnKeyDownEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeydownevent"				persist="model"></event>			<event name="OnKeyUpEvent" model="OnKeyUpEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeyupevent"				persist="model"></event>			<event name="OnKeyPressEvent" model="OnKeyPressEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeypressevent"				persist="model"></event>			<event name="OnChangeEvent" model="OnChangeEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onchangeevent"				persist="model"></event>		</events>	</interface>	<interface name="nitobi.grid.Row" tagname="ntb:e" namespace="Eba.Grid" type="Eba.Grid.Row" jstype="object">		<elements>		</elements>		<properties>			<property name="ClassName" type="string" access="private" persist="meta" default="&quot;&quot;"				readwrite="readwrite" impact="xsl row " htmltag="ClassName" testvalue="&quot;&quot;">							</property>			<property name="Height" default="23" code="" type="int" persist="meta" impact="row"				access="public" readwrite="readwrite" htmltag="Height" testvalue="50">							</property>		</properties>	</interface>			<interface name="nitobi.grid.Grid" tagname="ntb:grid" namespace="Eba" type="Eba.Grid.Grid" jstype="object" 	remarkfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaGridApiDocumentation"     examplefile="http://portal:8090/cgi-bin/trac.cgi/wiki/SharedCodeSnippets"     summaryfile="http://portal:8090/cgi-bin/trac.cgi/wiki/EbaGridApiDocumentation">		<elements>			<element name="EBADatasources" minoccurs="0" maxoccurs="1" />			<element name="nitobi.grid.Columns" minoccurs="0" maxoccurs="1" />		</elements>                <methods>                        <method name="selectRowByIndex" access="private">                                <summary>Selects a grid cell by row index.</summary>                                <param name="index" type="int">the row index</param>                                <returns type="nitobi.grid.Row"></returns>                                <include path="//*[@id=\'work1\']" type="example"/>                        </method>                                        <method name="selectRowByKey" access="private">                                                         <summary>Selects a grid cell by key.</summary>                                                          <param name="key" type="string">the key of grid data</param>                                                                                            <returns type="nitobi.grid.Row"></returns>                                                       </method>                                                       <method name="selectCellByCoords" access="public">                                <summary>Activates a grid cell. The activated cell is highlighted.                                 Subsequent function calls such as deleteCurrentRow, insertAfterCurrentRow, getActiveColumnObject, getActiveRowObject depends on the new active cell.                                  The row and colum index starts at 0.                                </summary>                                <param name="column" type="int">column number</param>                                <param name="row" type="int">row number</param>                                <returns type=""></returns>                                     <include type="remark" />                                               </method>                                        <method name="save" access="public">                                <summary>Saves data in the grid.</summary>                                <returns type=""></returns>                        </method>                                                       <method name="insertAfterCurrentRow" access="public">                                <summary>Insert a new row after the row of the active cell.</summary>                                <returns type=""></returns>                        </method>                                        <method name="deleteCurrentRow" access="public">                                <summary>Deletes currently selected row.</summary>                                <returns type=""></returns>                        </method>                                                <method name="insertRow" access="public">                                <summary>Inserts a new row into the grid</summary>                                <returns type=""></returns>                        </method>                                                                       <method name="getCellObject" access="public">                                <summary>Returns the cell object of a grid.</summary>                                <param name="column" type="int">column number</param>                                <param name="row" type="int">row number</param>                                <returns type="nitobi.grid.Cell"></returns>                        </method>                        <method name="getRowObject" access="public">                                <summary>Returns a row object.</summary>                                <param></param>                                <returns type="nitobi.grid.Row"></returns>                        </method>                                                <method name="getRowCount" access="public">                                <summary>Returns the number of rows in the grid.</summary>                                <returns type="int"></returns>                        </method>                                                                       <method name="getSelectedLookupKey" access="public">                                <summary>Returns the selected lookup key</summary>                                <returns type="string"></returns>                        </method>                                                <method name="getSelectedColumnNumber" access="public">                                <summary>Returns the column index of the selected cell. </summary>                                <param name="rel" type="bool">Specifies whether to compensate for frozen columns.</param>                                <returns type="int">Column index of the selected cell.</returns>                        </method>                        <method name="getSelectedColumnObject" access="public">                                <summary>Returns the nitobi.grid.Column object that the selected cell is part of.</summary>                                <returns type="nitobi.grid.Column">nitobi.grid.Column object of the selected cell.</returns>                                                        </method>                        <method name="getSelectedRow" access="private">                                <summary>Returns the row index of the selected cell. </summary>                                <param name="rel" type="bool">Specifies whether to compensate for frozen rows.</param>                                <returns type="int">Row index of the selected cell.</returns>                                                        </method>                        <method name="getSelectedRowObject" access="public">                                <summary>Returns the nitobi.grid.Row object that the selected cell is part of.</summary>                                <returns type="nitobi.grid.Column">nitobi.grid.Row object of the selected cell.</returns>                                                        </method>                        <method name="getSelectedCellObject" access="public">                                <summary>Returns a reference to the nitobi.grid.Cell object representing the currently selected cell in the Grid. </summary>                                                                <returns type="nitobi.grid.Cell">selected nitobi.grid.Cell object.</returns>                                <include  path="//*[@id=\'ebaxml_fielddef_getvalue\']" type="remarks" />                        </method>                        <method name="GridSelection" access="private">                                <summary>The selection object is used during select operations by the user. Its members provide the functionality for displaying the selected(highlighted blocks</summary>                                <param name="oGrid" type="object">A reference to the grid containing the selection</param>                        </method>                        <method name="selectionhighlight" access="private">                                <summary>Highlights the selected area</summary>                        </method>                        <method name="deselect" access="private">                                <summary>Acts as the opposite of highlight</summary>                        </method>                        <method name="containsSelection" access="private">                                <summary>Returns true if the grid contains a valid selection</summary>                        </method>                        <method name="cellIsInSelection" access="private">                                <summary>Returns true if the given Cell is situated inside the active grid selection and the selection is bigger than just one cell.</summary>                        </method>                        <method name="copy" access="private">                                <summary>Copys the current selection into the clipboard. This method stores the data as text with a tab for every column. This is the same format MS Excel uses and therefore the paste method also works with data copied from a MSExcel spreadsheet.</summary>                        </method>                        <method name="paste" access="private">                                <summary>Pasts data from the clipboard into the grid if it contains tabular data. Also pasts data from MSExcel as Excel places data to the clipboard in the form of tabular data as well.</summary>                        </method>                        <method name="getPendingSortColumn" access="public">                                <summary>Retrieves the pending sort column number.</summary>                                <returns type="int">Pending sort column number of the Grid.</returns>                                                        </method>                        <method name="loadNextDataPage" access="public">                                <summary>Loads the next page of data from the database.</summary>                                <remarks>This method requests the data from a getHandler which is a server-side script designed to deliver the requested data.</remarks>                                                                <include path="//*[@id=\'pagingexample\']" type="example" />                        </method>                        <method name="loadPreviousDataPage" access="public">                                <summary>Loads the previous page of data from the database.</summary>                                <remarks>This method requests the data from a getHandler which is a server-side script designed to deliver the requested data.</remarks>                                                                <include path="//*[@id=\'pagingexample\']" type="example" />                        </method>                        <method name="loadDataPage" access="public">                                <summary>Loads the specified page of data from the database.</summary>                                <param name="nStart" type="int">Recordnumber of record which should be display on top of the page.</param>                                                                <include path="//*[@id=\'pagingexample\']" type="example" />                        </method>                        <method name="makeXSL" access="private">                                <summary>Makes the main XSL</summary>                                <remarks>The makeXSL() method is normally called automatically when the grid is first instantiated.</remarks>                        </method>                </methods>		<properties>			<property name="ID" htmltag="id" type="string" access="public" persist="js" readwrite="read"></property>			<property name="uid" type="string" access="public" persist="xml" readwrite="readwrite"></property>			<property name="ToolbarHeight" htmltag="toolbarHeight" type="int" access="public" persist="js" readwrite="readwrite" default="25"></property>						<property name="Selection" type="EBASelection" access="public" persist="js" readwrite="read" default="null"></property>			<property name="Bound" type="bool" access="public" persist="js" readwrite="readwrite" default="false"></property>			<property name="RegisteredTo" htmltag="registeredto" type="string" access="public" persist="js" default="true"				readwrite="read" testvalue="test"></property>			<property name="LicenseKey" htmltag="licensekey" type="string" access="public" persist="js" default="true"				readwrite="read" testvalue="test"></property>			<property name="ToolbarContainerEmpty" type="bool" access="private" persist="xml" default="false"				readwrite="readwrite" testvalue="test">			</property>			<property name="Columns" htmltag="columns" namespace="Eba.Grid" type="Column" access="public" persist="js" default="true"				readwrite="read" testvalue="test"></property>			<property name="ColumnsDefined" htmltag="columnsdefined" type="bool" access="public" persist="js" default="false"				readwrite="readwrite" testvalue="true"></property>			<property name="Declaration" htmltag="declaration" type="xml" access="private" persist="js" default="&quot;&quot;"				readwrite="readwrite" testvalue="&quot;&quot;"></property>			<property name="Datasource" htmltag="datasource" namespace="Eba.Data" type="DatasourceManager" access="public" persist="js" default="true"				readwrite="read" testvalue="test"></property>			<property name="DatasourceId" htmltag="datasourceid" type="string" access="public" persist="xml" default=""				readwrite="read" testvalue="testds"></property>			<property name="CurrentPageIndex" htmltag="currentpageindex" type="int" access="public" persist="xml" default="0"				readwrite="read" testvalue="0"></property>			<property name="ColumnIndicatorsEnabled" htmltag="columnindicatorsenabled" type="bool" access="public" persist="xml" default="true"				readwrite="readwrite" testvalue="false"></property>			<property name="RowIndicatorsEnabled" type="bool" access="private" persist="xml" default="false"				readwrite="readwrite" testvalue="false">			</property>			<property name="ToolbarEnabled" htmltag="toolbarenabled" type="bool" access="public" persist="xml" default="true" readwrite="readwrite"				testvalue="false"></property>			<property name="RowHighlightEnabled" htmltag="rowhighlightenabled" type="bool" access="public" persist="xml" default="false" readwrite="readwrite"				testvalue="false"></property>			<property name="RowSelectEnabled" htmltag="rowselectenabled" type="bool" access="public" persist="xml" default="false" readwrite="readwrite"				testvalue="false" >			</property>			<property name="GridResizeEnabled" htmltag="gridresizeenabled" type="bool" access="public" persist="xml" default="false" readwrite="readwrite"				testvalue="false"></property>			<property name="SingleClickEditEnabled" htmltag="singleclickeditenabled" type="bool" access="public" persist="xml" default="false" readwrite="readwrite"				testvalue="false"></property>			<property name="AutoKeyEnabled" htmltag="autokeyenabled" type="bool" access="public" persist="xml" default="false" readwrite="readwrite"				testvalue="false">			</property>			<property name="ToolTipsEnabled" type="bool" access="private" persist="xml" default="true" readwrite="readwrite"				testvalue="false">			</property>			<property name="EnterTab" type="string" access="public" persist="xml" default="down" readwrite="readwrite"				htmltag="entertab" testvalue="up">			</property>			<property name="HScrollbarEnabled" type="bool" access="private" persist="xml" default="true" readwrite="readwrite"				testvalue="false">			</property>			<property name="VScrollbarEnabled" type="bool" access="private" persist="xml" default="true" readwrite="readwrite"				testvalue="false">			</property>			<property name="RowHeight" type="int" access="private" persist="xml" default="23" readwrite="read"				htmltag="rowheight" testvalue="50">			</property>			<property name="HeaderHeight" type="int" persist="xml" access="private" default="23" readwrite="readwrite"				htmltag="headerheight" testvalue="50">			</property>			<property name="cellWidth" type="int" persist="xml" access="private" default="100" readwrite="read"				testvalue="200">			</property>			<property name="top" default="0" type="int" persist="xml" access="private" readwrite="readwrite"				impact="css xsl row" testvalue="200">			</property>			<property name="bottom" default="0" type="int" persist="xml" access="private" readwrite="readwrite"				impact="css xsl row" testvalue="200">			</property>			<property name="left" default="0" type="int" persist="xml" access="private" readwrite="readwrite"				impace="css xsl row" testvalue="200">			</property> 			<property name="right" default="0" type="int" persist="xml" access="private" readwrite="readwrite"				impact="css xsl row" testvalue="200">			</property>			<property name="indicatorWidth" default="0" type="int" persist="xml" access="private" readwrite="readwrite"				testvalue="50">			</property>			<property name="scrollbarWidth" type="int" persist="xml" access="private" readwrite="readwrite"				testvalue="22" default="22">			</property>			<property name="scrollbarHeight" type="int" persist="xml" access="private" readwrite="readwrite"				testvalue="22" default="22">			</property>			<property name="freezetop" default="0" type="int" persist="xml" access="private" readwrite="readwrite"				impact="size css xsl row" testvalue="2">			</property>			<property name="freezebottom" default="0" type="int" persist="xml" access="private" readwrite="readwrite"				testvalue="2">			</property>			<property name="FrozenLeftColumnCount" htmltag="frozenleftcolumncount" default="0" type="int" persist="xml" access="public" readwrite=""				testvalue="2">							</property>			<property name="freezeright" default="0" type="int" persist="xml" access="private" readwrite="readwrite"				testvalue="2">							</property>			<property name="active" type="string" access="private" default="&quot;&quot;">			</property>			<property name="activeCell" type="nitobi.grid.Cell" access="private" default="null" readwrite="readwrite">			</property>			<property name="activeRow" type="object" access="private" persist="xml" default="null">							</property>			<property name="RowInsertEnabled" type="bool" access="public" persist="xml" default="true" htmltag="rowinsertenabled"				readwrite="readwrite">							</property>			<property name="RowDeleteEnabled" type="bool" persist="xml" access="public" default="true" htmltag="rowdeleteenabled" readwrite="readwrite">							</property>			<property name="Asynchronous" type="bool" access="private" persist="xml" default="true" readwrite="readwrite"				htmltag="asynchronous" testvalue="false">							</property>			<property name="AutoAdd" type="bool" access="private" default="false" htmltag="autoadd">							</property>			<property name="AutoSaveEnabled" type="bool" access="public" persist="xml" default="false" readwrite="readwrite"				htmltag="autosaveenabled" testvalue="true">							</property>			<property name="contentHeight" default="1000" type="int" persist="xml" access="private" readwrite="readwrite"				testvalue="2000">							</property>			<property name="contentWidth" default="1000" type="int" persist="xml" access="private" readwrite="readwrite"				testvalue="2000">							</property>			<property name="ColumnCount" type="int" access="public" persist="xml" default="0" readwrite="read"				 testvalue="20">							</property>			<property name="RowsPerPage" type="int" access="public" persist="xml" default="20" readwrite="readwrite"				htmltag="rowsperpage" testvalue="20">								<include path="//*[@id=\'pagingexample\']" type="example" />			</property>			<property name="element" code="" type="Span" persist="dom" access="private" readwrite="read">							</property>			<property name="entertab" type="string" access="private" persist="xml" default="&quot;RT&quot;"				htmltag="entertab">			</property>			<property name="forceValidate" type="bool" access="private" persist="xml" default="false"				readwrite="readwrite">			</property>			<property name="gridColor" type="string" access="private" persist="xml" default="&quot;#F0F0F0&quot;"				htmltag="gridColor">			</property>			<property name="Height" code="" persist="xml" type="int" access="public" default="100" readwrite="read"				htmltag="height" testvalue="200">							</property>			<property name="hwrap" type="bool" access="private" persist="xml" default="true" htmltag="hwrap">			</property>			<property name="keymode" type="string" access="private" default="&quot;&quot;" htmltag="keymode">			</property>			<property name="KeyGenerator" type="string" access="public" default="&quot;&quot;"				readwrite="readwrite" htmltag="keygenerator" persist="js">				<include path="//*[@id=\'keygeneration\']" type="example" />							</property>			<property name="LastError" type="string" access="public" default="&quot;&quot;" readwrite="read"				persist="xml" testvalue="&quot;testError&quot;">							</property>			<property name="lastSaveHandlerResponse" type="string" access="private" default="&quot;&quot;">							</property>			<property name="MultiRowSelectEnabled" type="bool" access="public" persist="xml" default="false" readwrite="readwrite"				testvalue="false" htmltag="multirowselectenabled">			</property>			<property name="MultiRowSelectField" type="string" access="public" persist="xml" default="" readwrite="readwrite"			 	testvalue="" htmltag="multirowselectfield">			</property>			<property name="MultiRowSelectAttr" type="string" access="private" persist="xml" default="" readwrite="readwrite"			 	>			</property>			<property name="scrolling" type="bool" access="private" default="false">			</property>			<property name="GetHandler" type="string" access="public" persist="xml" default="&quot;&quot;" htmltag="gethandler">								<include path="//*[@id=\'saveget\']" type="example" />			</property>			<property name="SaveHandler" type="string" access="public" persist="xml" default="&quot;&quot;" htmltag="savehandler">								<include path="//*[@id=\'saveget\']" type="example" />			</property>			<property name="scrollX" type="string" access="private" persist="xml" code="" readwrite="readwrite"				htmltag="scrollX" testvalue="&quot;scroll&quot;">							</property>			<property name="scrollY" type="string" access="private" persist="xml" default="&quot;auto&quot;"				readwrite="readwrite" htmltag="scrollY" testvalue="&quot;visible&quot;">							</property>			<property name="showErrors" type="bool" access="private" default="false" readwrite="readwrite"				htmltag="showErrors">							</property>			<property name="uniqueID" default="&quot;&quot;" code="" type="object" access="public" readwrite="read">							</property>			<property name="Version" default="3.01" code="" type="string" persist="js" access="public"				readwrite="read" htmltag="version">							</property>			<property name="vwrap" type="bool" access="private" persist="xml" default="true" htmltag="vwrap">			</property>			<property name="Width" type="int" access="public" persist="xml" readwrite="read" htmltag="width"				testvalue="1000">							</property>			<property name="PagingMode" type="string" access="public" persist="xml" readwrite="read" htmltag="pagingmode" default="&quot;LiveScrolling&quot;">							</property>			<property name="DataMode" type="string" access="public" persist="xml" readwrite="read" htmltag="datamode" default="&quot;Caching&quot;">							</property>			<property name="RenderMode" type="string" access="public" persist="xml" readwrite="read" htmltag="rendermode" default="&quot;&quot;">							</property>			<property name="LiveScrollingMode" type="string" access="public" persist="xml" readwrite="read" htmltag="livescrollingmode" default="&quot;Leap&quot;">			</property>			<property name="CopyEnabled" type="bool" access="public" persist="xml" readwrite="readwrite" htmltag="copyenabled" default="true">			</property>			<property name="PasteEnabled" type="bool" access="public" persist="xml" readwrite="readwrite" htmltag="pasteenabled" default="true">			</property>			<property name="SortEnabled" model="SortEnabled" type="string" access="public"				default="true" htmltag="sortenabled" readwrite="readwrite" persist="xml" impact="sort"				testvalue="true"></property>			<property name="SortMode" model="SortMode" type="string" access="public"				default="default" htmltag="sortmode" readwrite="readwrite" persist="xml" impact="sort"				testvalue="default"></property>		</properties>		<events>			<event name="OnCellClickEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="oncellclickevent" persist="event"></event>			<event name="OnBeforeCellClickEvent" model="OnBeforeCellClickEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onbeforecellclickevent"				persist="event"></event>			<event name="OnCellDblClickEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="oncelldblclickevent" persist="event"></event>			<event name="OnDataReadyEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="ondatareadyevent" persist="event"></event>			<event name="OnHtmlReadyEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onhtmlreadyevent" persist="event"></event>			<event name="OnDataRenderedEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="ondatarenderevent" persist="event"></event>			<event name="OnCellDoubleClickEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="oncelldoubleclickevent"				persist="event">			</event>			<event name="OnAfterLoadDataPageEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onafterloaddatapageevent"				persist="event">			</event>			<event name="OnBeforeLoadDataPageEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onbeforeloaddatapageevent"				persist="event">			</event>			<event name="OnAfterLoadPreviousPageEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onafterloadpreviouspageevent"				persist="event">			</event>			<event name="OnBeforeLoadPreviousPageEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onbeforeloadpreviouspageevent"				persist="event">			</event>			<event name="OnAfterLoadNextPageEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onafterloadnextpageevent"				persist="event">			</event>			<event name="OnBeforeLoadNextPageEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onbeforeloadnextpageevent"				persist="event">			</event>			<event name="OnBeforeCellEditEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onbeforecelleditevent"				persist="event">							</event>			<event name="OnAfterCellEditEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onaftercelleditevent"				persist="event">							</event>			<event name="OnBeforeRowInsertEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onbeforerowinsertevent"				persist="event">							</event>			<event name="OnAfterRowInsertEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onafterrowinsertevent"				persist="event">							</event>			<event name="OnBeforeSortEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onbeforesortevent"				persist="event">			</event>			<event name="OnAfterSortEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onaftersortevent"				persist="event">			</event>			<event name="OnBeforeRefreshEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onbeforerefreshevent"				persist="event">			</event>			<event name="OnAfterRefreshEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onafterrefreshevent"				persist="event">			</event>						<event name="OnBeforeSaveEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onbeforesaveevent"				persist="event">							</event>			<event name="OnAfterSaveEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onaftersaveevent"				persist="event">							</event>			<event name="OnHandlerErrorEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onhandlererrorevent"				persist="event">							</event>						<event name="OnRowBlurEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onrowblurevent"				persist="event">							</event>			<event name="OnCellFocusEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="oncellfocusevent"				persist="event">			</event>			<event name="OnCellBlurEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="oncellblurevent"				persist="event">							</event>			<event name="OnAfterRowDeleteEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onafterrowdeleteevent"				persist="event">							</event>			<event name="OnBeforeRowDeleteEvent" type="string" access="public" default="&quot;true&quot;" readwrite="readwrite" htmltag="onbeforerowdeleteevent"				persist="event">							</event>			<event name="OnCellUpdateEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="oncellupdateevent"				persist="event">			</event>			<event name="OnRowFocusEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onrowfocusevent"				persist="event">							</event>			<event name="OnBeforeCopyEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onbeforecopyevent"				persist="event">							</event>			<event name="OnAfterCopyEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onaftercopyevent"				persist="event">							</event>			<event name="OnBeforePasteEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onbeforepasteevent"				persist="event">							</event>			<event name="OnAfterPasteEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onafterpasteevent"				persist="event">							</event>			<event name="OnErrorEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onerrorevent"				persist="event">							</event>			<event name="OnContextMenuEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="oncontextmenuevent"				persist="event">			</event>			<event name="OnFocusEvent" type="string" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onfocusvent"				persist="event">							</event>			<event name="OnCellValidateEvent" type="string" access="private" default="&quot;&quot;"				readwrite="readwrite" persist="event" htmltag="oncellvalidateevent">				<include path="//*[@id=\'datavalidation\']" type="example" />			</event>			<event name="OnKeyDownEvent" model="OnKeyDownEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeydownevent" persist="event"></event>			<event name="OnKeyUpEvent" model="OnKeyUpEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeyupevent" persist="event"></event>			<event name="OnKeyPressEvent" model="OnKeyPressEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onkeypressevent" persist="event"></event>			<event name="OnMouseOverEvent" model="OnMouseOverEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onmouseoverevent" persist="event"></event>			<event name="OnMouseOutEvent" model="OnMouseOutEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onmouseoutevent" persist="event"></event>			<event name="OnMouseMoveEvent" model="OnMouseMoveEvent" type="String" access="public" default="&quot;&quot;" readwrite="readwrite" htmltag="onmousemoveevent" persist="event"></event>		</events>	</interface></interfaces>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.apiDoc = nitobi.xml.createXmlDoc(temp_ntb_apiDoc);

var temp_ntb_modelDoc='<state	 xmlns:ntb="http://www.nitobi.com"	ID="mySheet"	Version="3.01" 	element="grid" 		uniqueID="_hkj342">    <nitobi.grid.Grid		Height="300"		Width="700"		skin="default"		cellWidth="100"			RowHeight="23"					indicatorHeight="23"		HeaderHeight="23"		indicatorWidth="30"		scrollX="0"		scrollY="0"		scrollbarWidth="26"		scrollbarHeight="26"		toolbarHeight="22"				top="23"		bottom="23"		left="100"		right="100"				minHeight="60"		minWidth="250"		PrimaryDatasourceSize="0" 		contentHeight="1000"		contentWidth="1500"				containerHeight=""		containerWidth=""		columnsdefined="0"		renderframe="0"		renderindicators="0"		renderheader="0"		renderfooter="0"		renderleft="0"		renderright="0"		rendercenter="0"		active="1"		selected="1"		activeRow=""		activeCell=""		activeView=""		activeBlock=""		highlightCell=""		scrolling="0"		prevCell=""		prevText=""		prevData=""		FrozenLeftColumnCount="0"		DatasourceSizeEstimate="0"    	DatasourceId=""  		freezeright="0"		freezetop="0"		freezebottom="0"		ToolbarEnabled="1"			GridResizeEnabled="0"		RowHighlightEnabled="0"		RowSelectEnabled="0"		MultiRowSelectEnabled="0"		AutoKeyEnabled="0"			ToolbarContainerEmpty="false"			ToolTipsEnabled="1"		RowIndicatorsEnabled="0"		ColumnIndicatorsEnabled="1"		HScrollbarEnabled="1"		VScrollbarEnabled="1"		rowselect="0"		AutoSaveEnabled="0"		autoAdd="0"		remoteSort="0"		forceValidate="0"		showErrors="0"		columnGraying="0"		hwrap="0"		vwrap="0"		keymode=""				entertab="RT"		keyboardPaging="0"		RowInsertEnabled="1"		RowDeleteEnabled="1"		allowEdit="1"		allowFormula="1"		PasteEnabled="1"		CopyEnabled="1"				expandRowsOnPaste="1"		expandColumnsOnPast="1"		datalog="myXMLLog"		xselect="//root"		xorder="@a"		asynchronous="1"		fieldMap=""    	GetHandler="" 		getHandler=""		SaveHandler=""		lastSaveHandlerResponse=""		sortColumn="0"		curSortColumn="0"		descending="0"		curSortColumnDesc="0"		RowCount="0"		ColumnCount="0"		nextXK="32"		CurrentPageIndex="0"		PagingMode="standard"		DataMode="caching"		RenderMode=""    	LiveScrollingMode="Leap"		RowsPerPage="20"		pageStart="0"		normalColor="#FFFFFF"		normalColor2="#FFFFFF"		activeColor="#FFFFFF"		selectionColor="#FFFFFF"		highlightColor="#FFFFFF"		columnGrayingColor="#FFFFFF"		gridColor="#FFFFFF"		SingleClickEditEnabled="0"		LastError=""		SortEnabled="1"    	SortMode="default"    	EnterTab="down"	>    </nitobi.grid.Grid>    <nitobi.grid.Columns>    </nitobi.grid.Columns>    <Defaults>    	<nitobi.grid.Grid></nitobi.grid.Grid>		<nitobi.grid.Column 			Width="100"			type="TEXT"			Visible="1"			SortEnabled="1"			/>		<nitobi.grid.Row></nitobi.grid.Row>		<nitobi.grid.Cell></nitobi.grid.Cell>		<ntb:e />    </Defaults>    	<declaration>	</declaration>	<columnDefinitions>	</columnDefinitions></state>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.modelDoc = nitobi.xml.createXmlDoc(temp_ntb_modelDoc);

var temp_ntb_toolbarDoc='<?xml version="1.0" encoding="utf-8"?><toolbar id="toolbarthis.uid" title="Grid" height="23" width="110" image_directory="http://localhost/vss/EBALib/v13/Common/Toolbar/Styles/default">	<items>		<button id="save" onclick_event="this.onClick()" height="14" width="14" image="save.gif"			image_disabled="save_disabled.gif" tooltip_text="Save Changes" />		<!-- <button id="discardChanges" onclick_event="testclick(this);" height="17" width="16" top_offset="-2"			image="cancelsave.gif" image_disabled="cancelsave_disabled.gif" tooltip_text="Discard Changes" /> -->		<separator id="toolbar1_separator1" height="20" width="5" image="separator.jpg" />		<button id="newRecord" onclick_event="this.onClick()" height="11" width="14" image="newrecord.gif"			image_disabled="newrecord_disabled.gif" tooltip_text="New Record" />		<button id="deleteRecord" onclick_event="this.onClick()" height="11" width="14" image="deleterecord.gif"			image_disabled="deleterecord_disabled.gif" tooltip_text="Delete Record" />		<separator id="toolbar1_separator2" height="20" width="5" image="separator.jpg" />		<button id="refresh" onclick_event="this.onClick()" height="14" width="16" image="refresh.gif"			image_disabled="refresh_disabled.gif" tooltip_text="Refresh" />		<!--<separator id="toolbar1_separator3" height="20" width="5" image="separator.jpg" />		<button id="toolbar1_button4" onclick_event="testclick(this);" height="11" width="10" image="left.gif"			image_disabled="left_disabled.gif" tooltip_text="Previous Page" />		<button id="toolbar1_button5" onclick_event="testclick(this);" height="11" width="10" image="right.gif"			image_disabled="right_disabled.gif" tooltip_text="Next Page" />		-->	</items></toolbar>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.toolbarDoc = nitobi.xml.createXmlDoc(temp_ntb_toolbarDoc);

var temp_ntb_pagingToolbarDoc='<?xml version="1.0" encoding="utf-8"?><toolbar id="toolbarpagingthis.uid" title="Paging" height="23" width="60" image_directory="http://localhost/vss/EBALib/v13/Common/Toolbar/Styles/default">	<items>		<button id="previousPage" onclick_event="this.onClick()" height="14" width="14" image="left.gif"			image_disabled="left_disabled.gif" tooltip_text="Previous Page" />		<button id="nextPage" onclick_event="this.onClick()" height="14" width="16" image="right.gif"			image_disabled="right_disabled.gif" tooltip_text="Next Page" />	</items></toolbar>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.pagingToolbarDoc = nitobi.xml.createXmlDoc(temp_ntb_pagingToolbarDoc);


var temp_ntb_accessorGeneratorXslProc='<?xml version="1.0"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> <xsl:output method="text" encoding="utf-8" omit-xml-declaration="yes"/> <x:t- match="interface"> <x:ct-x:n-initJSDefaults"/> <x:at-/> </x:t-> <x:t-x:n-initJSDefaults"> </x:t-> <x:t- match="interface/properties"> <x:va-x:n-object"><x:v-x:s-ancestor::interface/@name" /></x:va-> <xsl:for-eachx:s-property"> <x:ct-x:n-generate-accessors"> <x:w-x:n-object"x:s-$object"></x:w-> </x:ct-> </xsl:for-each> </x:t-> <x:t- match="interface/methods"> <xsl:for-eachx:s-method"> <xsl:if test="@code"> this.<x:v-x:s-@name"/>= function(<xsl:for-eachx:s-parameters/parameter"><x:v-x:s-@name" /><xsl:if test="not(last())">,</xsl:if></xsl:for-each>) {<x:v-x:s-@code"/>}; </xsl:if> </xsl:for-each> </x:t-> <x:t- match="interface/events"> <x:va-x:n-object"><x:v-x:s-ancestor::interface/@name" /></x:va-> <xsl:for-eachx:s-event"> <x:ct-x:n-generate-accessors"> <x:w-x:n-object"x:s-$object"></x:w-> </x:ct-> </xsl:for-each> </x:t-> <x:t-x:n-generate-accessors"> <x:p-x:n-object"></x:p-> <x:va-x:n-name"> <xsl:if test="@xml"><x:v-x:s-$object"/>/<x:v-x:s-@xml" /></xsl:if> <xsl:if test="not(@xml)"><x:v-x:s-$object"/>/@<x:v-x:s-@name" /></xsl:if> </x:va-> <xsl:if test="\'a\'=\'a\'"> this.set<x:v-x:s-@name"/> = function() { <x:v-x:s-@precode"/> <xsl:if test="contains(@persist,\'event\')">this.eSET("<x:v-x:s-@name"/>",arguments);</xsl:if> <xsl:if test="contains(@persist,\'js\')">this.jSET("<x:v-x:s-@name"/>",arguments);</xsl:if> <xsl:if test="contains(@persist,\'xml\')">this.xSET("<x:v-x:s-$name"/>",arguments);</xsl:if> <xsl:if test="contains(@persist,\'data\')">this.SETDATA("<x:v-x:s-$name"/>",arguments);</xsl:if> <!-- <xsl:if test="contains(@persist,\'meta\')">this.xSETMETA("<x:v-x:s-@short"/>",arguments);</xsl:if> --> <xsl:if test="contains(@persist,\'model\')">this.xSETMODEL("<x:v-x:s-@model"/>",arguments);</xsl:if> <xsl:if test="contains(@persist,\'css\')">this.xSETCSS("<x:v-x:s-@htmltag"/>",arguments);</xsl:if> <xsl:if test="contains(@persist,\'dom\')">this.SETDOM("<x:v-x:s-@name"/>",arguments);</xsl:if> <xsl:if test="contains(@persist,\'tag\')">this.SETTAG("<x:v-x:s-@name"/>",arguments);</xsl:if> <x:v-x:s-@code"/> if (EBAAutoRender) { <xsl:if test="not($object=\'nitobi.grid.Grid\')"> <xsl:if test="contains(@impact,\'config\')">this.grid.initializeModelFromDeclaration();</xsl:if> <xsl:if test="contains(@impact,\'bind\')">this.grid.bind();</xsl:if> <xsl:if test="contains(@impact,\'css\')">this.grid.generateCss();</xsl:if> <xsl:if test="contains(@impact,\'frame\')">this.grid.renderFrame();</xsl:if> <xsl:if test="contains(@impact,\'align\')">this.grid.Scroller.alignSurfaces();</xsl:if> <xsl:if test="contains(@impact,\'size\')">this.grid.resize();</xsl:if> <xsl:if test="contains(@impact,\'xsl\')">this.grid.makeXSL();</xsl:if> <xsl:if test="contains(@impact,\'row\')">this.grid.refilter();</xsl:if> </xsl:if> <xsl:if test="$object=\'nitobi.grid.Grid\'"> <xsl:if test="contains(@impact,\'config\')">this.initializeModelFromDeclaration();</xsl:if> <xsl:if test="contains(@impact,\'bind\')">this.bind();</xsl:if> <xsl:if test="contains(@impact,\'css\')">this.generateCss();</xsl:if> <xsl:if test="contains(@impact,\'frame\')">this.renderFrame();</xsl:if> <xsl:if test="contains(@impact,\'xsl\')">this.makeXSL();</xsl:if> <xsl:if test="contains(@impact,\'row\')">this.refilter();</xsl:if> </xsl:if> }; }; </xsl:if> <x:va-x:n-accessor-prefix"> <x:c-> <x:wh- test="@type=\'bool\'"> <x:v-x:s-\'is\'"/> </x:wh-> <x:o-> <x:v-x:s-\'get\'"/> </x:o-> </x:c-> </x:va-> <xsl:if test="contains(@persist,\'js\') or contains(@persist,\'event\')">this.<x:v-x:s-$accessor-prefix"/><x:v-x:s-@name"/> = function() {return this.<x:v-x:s-@name"/>;};</xsl:if> <xsl:if test="contains(@persist,\'xml\')">this.<x:v-x:s-$accessor-prefix"/><x:v-x:s-@name"/> = function() {return <x:ct-x:n-cast-type"><x:w-x:n-type"x:s-@type"/><x:w-x:n-expression">this.xGET("<x:v-x:s-$name"/>",arguments)</x:w-><x:w-x:n-default"x:s-@default" /></x:ct->;};</xsl:if> <xsl:if test="contains(@persist,\'data\')">this.<x:v-x:s-$accessor-prefix"/><x:v-x:s-@name"/> = function() {return <x:ct-x:n-cast-type"><x:w-x:n-type"x:s-@type"/><x:w-x:n-expression">this.GETDATA("<x:v-x:s-$name"/>",arguments)</x:w-><x:w-x:n-default"x:s-@default" /></x:ct->;};</xsl:if> <xsl:if test="contains(@persist,\'meta\')">this.<x:v-x:s-$accessor-prefix"/><x:v-x:s-@name"/> = function() {return <x:ct-x:n-cast-type"><x:w-x:n-type"x:s-@type"/><x:w-x:n-expression">this.xGETMETA("<x:v-x:s-@short"/>",arguments)</x:w-><x:w-x:n-default"x:s-@default" /></x:ct->;};</xsl:if> <xsl:if test="contains(@persist,\'model\')">this.<x:v-x:s-$accessor-prefix"/><x:v-x:s-@name"/> = function() {return <x:ct-x:n-cast-type"><x:w-x:n-type"x:s-@type"/><x:w-x:n-expression">this.xGETMODEL("<x:v-x:s-@model"/>",arguments)</x:w-><x:w-x:n-default"x:s-@default" /></x:ct->;};</xsl:if> <xsl:if test="contains(@persist,\'dom\')">this.<x:v-x:s-$accessor-prefix"/><x:v-x:s-@name"/> = function() {return this.dGET("<x:v-x:s-@name"/>",arguments);};</xsl:if> <xsl:if test="contains(@persist,\'tag\')">this.<x:v-x:s-$accessor-prefix"/><x:v-x:s-@name"/> = function() {return this.GETTAG("<x:v-x:s-@name"/>",arguments);};</xsl:if> </x:t-> <x:t-x:n-cast-type"> <x:p-x:n-type"/> <x:p-x:n-expression"/> <x:p-x:n-default"x:s-\'true\'"/> <x:c-> <x:wh- test="$type=\'int\'">Number(<x:v-x:s-$expression"/>)</x:wh-> <x:wh- test="$type=\'bool\'">nitobi.lang.toBool(<x:v-x:s-$expression"/>, <x:v-x:s-$default"/>)</x:wh-> <x:o-><x:v-x:s-$expression"/></x:o-> </x:c-> </x:t-> <x:t- match="text()"/></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.accessorGeneratorXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_accessorGeneratorXslProc));

var temp_ntb_addXidXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <x:p-x:n-guid"x:s-0"/><x:t- match="/"> <x:at-/></x:t-><x:t- match="node()|@*"> <xsl:copy> <xsl:if test="not(@xid)"> <x:a-x:n-xid" ><x:v-x:s-generate-id(.)"/><x:v-x:s-position()"/><x:v-x:s-$guid"/></x:a-> </xsl:if> <x:at-x:s-./* | text() | @*"> </x:at-> </xsl:copy></x:t-> <x:t- match="text()"> <x:v-x:s-."/></x:t-></xsl:stylesheet> ';
nitobi.lang.defineNs("nitobi.data");
nitobi.data.addXidXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_addXidXslProc));

var temp_ntb_adjustXiXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" omit-xml-declaration="yes" /> <x:p-x:n-startingIndex"x:s-5"></x:p-> <x:p-x:n-startingGroup"x:s-5"></x:p-> <x:p-x:n-adjustment"x:s--1"></x:p-> <x:t- match="*|@*"> <xsl:copy> <x:at-x:s-@*|node()" /> </xsl:copy> </x:t-> <!--[@id=\'_default\']--> <x:t- match="//ntb:data/ntb:e|@*"> <x:c-> <x:wh- test="number(@xi) &gt;= number($startingIndex)"> <xsl:copy> <x:at-x:s-@*|node()" /> <x:ct-x:n-increment-xi" /> </xsl:copy> </x:wh-> <x:o-> <xsl:copy> <x:at-x:s-@*|node()" /> </xsl:copy> </x:o-> </x:c-> </x:t-> <x:t-x:n-increment-xi"> <x:a-x:n-xi"> <x:v-x:s-number(@xi) + number($adjustment)" /> </x:a-> </x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.data");
nitobi.data.adjustXiXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_adjustXiXslProc));

var temp_ntb_dataTranslatorXslProc='<?xml version="1.0"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" omit-xml-declaration="yes" /> <x:p-x:n-start"x:s-0"></x:p-> <x:p-x:n-id"x:s-\'_default\'"></x:p-> <x:p-x:n-xkField"x:s-\'a\'"></x:p-> <x:t- match="//root"> <ntb:grid xmlns:ntb="http://www.nitobi.com"> <ntb:datasources> <ntb:datasource id="{$id}"> <xsl:if test="@error"> <x:a-x:n-error"><x:v-x:s-@error" /></x:a-> </xsl:if> <ntb:datasourcestructure id="{$id}"> <x:a-x:n-FieldNames"><x:v-x:s-@fields" />|_xk</x:a-> <x:a-x:n-Keys">_xk</x:a-> </ntb:datasourcestructure> <ntb:data id="{$id}"> <xsl:for-eachx:s-//e"> <x:at-x:s-."> <x:w-x:n-xi"x:s-position()-1"></x:w-> </x:at-> </xsl:for-each> </ntb:data> </ntb:datasource> </ntb:datasources> </ntb:grid> </x:t-> <x:t- match="e"> <x:p-x:n-xi"x:s-0"></x:p-> <ntb:e> <xsl:copy-ofx:s-@*[not(name() = \'xk\')]"></xsl:copy-of> <xsl:if test="not(@xi)"><x:a-x:n-xi"><x:v-x:s-$start + $xi" /></x:a-></xsl:if> <x:a-x:n-{$xkField}"><x:v-x:s-@xk" /></x:a-> </ntb:e> </x:t-> <x:t- match="lookups"></x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.data");
nitobi.data.dataTranslatorXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_dataTranslatorXslProc));

var temp_ntb_dateFormatTemplatesXslProc='<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com" xmlns:d="http://exslt.org/dates-and-times" xmlns:n="http://www.nitobi.com/exslt/numbers" extension-element-prefixes="d n"> <!-- http://java.sun.com/j2se/1.3/docs/api/java/text/SimpleDateFormat.html --><d:ms> <d:m l="31" a="Jan">January</d:m> <d:m l="28" a="Feb">February</d:m> <d:m l="31" a="Mar">March</d:m> <d:m l="30" a="Apr">April</d:m> <d:m l="31" a="May">May</d:m> <d:m l="30" a="Jun">June</d:m> <d:m l="31" a="Jul">July</d:m> <d:m l="31" a="Aug">August</d:m> <d:m l="30" a="Sep">September</d:m> <d:m l="31" a="Oct">October</d:m> <d:m l="30" a="Nov">November</d:m> <d:m l="31" a="Dec">December</d:m></d:ms><d:ds> <d:d a="Sun">Sunday</d:d> <d:d a="Mon">Monday</d:d> <d:d a="Tue">Tuesday</d:d> <d:d a="Wed">Wednesday</d:d> <d:d a="Thu">Thursday</d:d> <d:d a="Fri">Friday</d:d> <d:d a="Sat">Saturday</d:d></d:ds><x:t-x:n-d:format-date"> <x:p-x:n-date-time" /> <x:p-x:n-mask"x:s-\'MMM d, yy\'"/> <x:va-x:n-formatted"> <x:va-x:n-date-time-length"x:s-string-length($date-time)" /> <x:va-x:n-timezone"x:s-\'\'" /> <x:va-x:n-dt"x:s-substring($date-time, 1, $date-time-length - string-length($timezone))" /> <x:va-x:n-dt-length"x:s-string-length($dt)" /> <x:c-> <x:wh- test="substring($dt, 3, 1) = \':\' and substring($dt, 6, 1) = \':\'"> <!--that means we just have a time--> <x:va-x:n-hour"x:s-substring($dt, 1, 2)" /> <x:va-x:n-min"x:s-substring($dt, 4, 2)" /> <x:va-x:n-sec"x:s-substring($dt, 7)" /> <xsl:if test="$hour &lt;= 23 and $min &lt;= 59 and $sec &lt;= 60"> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-\'NaN\'" /> <x:w-x:n-month"x:s-\'NaN\'" /> <x:w-x:n-day"x:s-\'NaN\'" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$min" /> <x:w-x:n-second"x:s-$sec" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </xsl:if> </x:wh-> <x:o-> <!--($neg * -2)--> <x:va-x:n-year"x:s-substring($dt, 1, 4) * (0 + 1)" /> <x:va-x:n-month"x:s-substring($dt, 6, 2)" /> <x:va-x:n-day"x:s-substring($dt, 9, 2)" /> <x:c-> <x:wh- test="$dt-length = 10"> <!--that means we just have a date--> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:wh-> <x:wh- test="substring($dt, 14, 1) = \':\' and substring($dt, 17, 1) = \':\'"> <!--that means we have a date + time--> <x:va-x:n-hour"x:s-substring($dt, 12, 2)" /> <x:va-x:n-min"x:s-substring($dt, 15, 2)" /> <x:va-x:n-sec"x:s-substring($dt, 18)" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$min" /> <x:w-x:n-second"x:s-$sec" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:wh-> </x:c-> </x:o-> </x:c-> </x:va-> <x:v-x:s-$formatted" /> </x:t-><x:t-x:n-d:_format-date"> <x:p-x:n-year" /> <x:p-x:n-month"x:s-1" /> <x:p-x:n-day"x:s-1" /> <x:p-x:n-hour"x:s-0" /> <x:p-x:n-minute"x:s-0" /> <x:p-x:n-second"x:s-0" /> <x:p-x:n-timezone"x:s-\'Z\'" /> <x:p-x:n-mask"x:s-\'\'" /> <x:va-x:n-char"x:s-substring($mask, 1, 1)" /> <x:c-> <x:wh- test="not($mask)" /> <!--replaced escaping with \' here/--> <x:wh- test="not(contains(\'GyMdhHmsSEDFwWakKz\', $char))"> <x:v-x:s-$char" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$minute" /> <x:w-x:n-second"x:s-$second" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-substring($mask, 2)" /> </x:ct-> </x:wh-> <x:o-> <x:va-x:n-next-different-char"x:s-substring(translate($mask, $char, \'\'), 1, 1)" /> <x:va-x:n-mask-length"> <x:c-> <x:wh- test="$next-different-char"> <x:v-x:s-string-length(substring-before($mask, $next-different-char))" /> </x:wh-> <x:o-> <x:v-x:s-string-length($mask)" /> </x:o-> </x:c-> </x:va-> <x:c-> <!--took our the era designator--> <x:wh- test="$char = \'M\'"> <x:c-> <x:wh- test="$mask-length >= 3"> <x:va-x:n-month-node"x:s-document(\'\')/*/d:ms/d:m[number($month)]" /> <x:c-> <x:wh- test="$mask-length >= 4"> <x:v-x:s-$month-node" /> </x:wh-> <x:o-> <x:v-x:s-$month-node/@a" /> </x:o-> </x:c-> </x:wh-> <x:wh- test="$mask-length = 2"> <x:v-x:s-format-number($month, \'00\')" /> </x:wh-> <x:o-> <x:v-x:s-$month" /> </x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'E\'"> <x:va-x:n-month-days"x:s-sum(document(\'\')/*/d:ms/d:m[position() &lt; $month]/@l)" /> <x:va-x:n-days"x:s-$month-days + $day + boolean(((not($year mod 4) and $year mod 100) or not($year mod 400)) and $month &gt; 2)" /> <x:va-x:n-y-1"x:s-$year - 1" /> <x:va-x:n-dow"x:s-(($y-1 + floor($y-1 div 4) - floor($y-1 div 100) + floor($y-1 div 400) + $days) mod 7) + 1" /> <x:va-x:n-day-node"x:s-document(\'\')/*/d:ds/d:d[number($dow)]" /> <x:c-> <x:wh- test="$mask-length >= 4"> <x:v-x:s-$day-node" /> </x:wh-> <x:o-> <x:v-x:s-$day-node/@a" /> </x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'a\'"> <x:c-> <x:wh- test="$hour >= 12">PM</x:wh-> <x:o->AM</x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'z\'"> <x:c-> <x:wh- test="$timezone = \'Z\'">UTC</x:wh-> <x:o->UTC<x:v-x:s-$timezone" /></x:o-> </x:c-> </x:wh-> <x:o-> <x:va-x:n-padding"x:s-\'00\'" /> <!--removed padding--> <x:c-> <x:wh- test="$char = \'y\'"> <x:c-> <x:wh- test="$mask-length &gt; 2"><x:v-x:s-format-number($year, $padding)" /></x:wh-> <x:o-><x:v-x:s-format-number(substring($year, string-length($year) - 1), $padding)" /></x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'d\'"> <x:v-x:s-format-number($day, $padding)" /> </x:wh-> <x:wh- test="$char = \'h\'"> <x:va-x:n-h"x:s-$hour mod 12" /> <x:c-> <x:wh- test="$h"><x:v-x:s-format-number($h, $padding)" /></x:wh-> <x:o-><x:v-x:s-format-number(12, $padding)" /></x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'H\'"> <x:v-x:s-format-number($hour, $padding)" /> </x:wh-> <x:wh- test="$char = \'k\'"> <x:c-> <x:wh- test="$hour"><x:v-x:s-format-number($hour, $padding)" /></x:wh-> <x:o-><x:v-x:s-format-number(24, $padding)" /></x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'K\'"> <x:v-x:s-format-number($hour mod 12, $padding)" /> </x:wh-> <x:wh- test="$char = \'m\'"> <x:v-x:s-format-number($minute, $padding)" /> </x:wh-> <x:wh- test="$char = \'s\'"> <x:v-x:s-format-number($second, $padding)" /> </x:wh-> <x:wh- test="$char = \'S\'"> <x:v-x:s-format-number(substring-after($second, \'.\'), $padding)" /> </x:wh-> <x:wh- test="$char = \'F\'"> <x:v-x:s-floor($day div 7) + 1" /> </x:wh-> <x:o-> <x:va-x:n-month-days"x:s-sum(document(\'\')/*/d:ms/d:m[position() &lt; $month]/@l)" /> <x:va-x:n-days"x:s-$month-days + $day + boolean(((not($year mod 4) and $year mod 100) or not($year mod 400)) and $month &gt; 2)" /> <x:v-x:s-format-number($days, $padding)" /> <!--removed week in year--> <!--removed week in month--> </x:o-> </x:c-> </x:o-> </x:c-> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$minute" /> <x:w-x:n-second"x:s-$second" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-substring($mask, $mask-length + 1)" /> </x:ct-> </x:o-> </x:c-></x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.dateFormatTemplatesXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_dateFormatTemplatesXslProc));

var temp_ntb_dateXslProc='<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com" xmlns:d="http://exslt.org/dates-and-times" extension-element-prefixes="d"> <xsl:output method="text" version="4.0" omit-xml-declaration="yes" /> <!-- http://java.sun.com/j2se/1.3/docs/api/java/text/SimpleDateFormat.html --><d:ms> <d:m l="31" a="Jan">January</d:m> <d:m l="28" a="Feb">February</d:m> <d:m l="31" a="Mar">March</d:m> <d:m l="30" a="Apr">April</d:m> <d:m l="31" a="May">May</d:m> <d:m l="30" a="Jun">June</d:m> <d:m l="31" a="Jul">July</d:m> <d:m l="31" a="Aug">August</d:m> <d:m l="30" a="Sep">September</d:m> <d:m l="31" a="Oct">October</d:m> <d:m l="30" a="Nov">November</d:m> <d:m l="31" a="Dec">December</d:m></d:ms><d:ds> <d:d a="Sun">Sunday</d:d> <d:d a="Mon">Monday</d:d> <d:d a="Tue">Tuesday</d:d> <d:d a="Wed">Wednesday</d:d> <d:d a="Thu">Thursday</d:d> <d:d a="Fri">Friday</d:d> <d:d a="Sat">Saturday</d:d></d:ds><x:t-x:n-d:format-date"> <x:p-x:n-date-time" /> <x:p-x:n-mask"x:s-\'MMM d, yy\'"/> <x:va-x:n-formatted"> <x:va-x:n-date-time-length"x:s-string-length($date-time)" /> <x:va-x:n-timezone"x:s-\'\'" /> <x:va-x:n-dt"x:s-substring($date-time, 1, $date-time-length - string-length($timezone))" /> <x:va-x:n-dt-length"x:s-string-length($dt)" /> <x:c-> <x:wh- test="substring($dt, 3, 1) = \':\' and substring($dt, 6, 1) = \':\'"> <!--that means we just have a time--> <x:va-x:n-hour"x:s-substring($dt, 1, 2)" /> <x:va-x:n-min"x:s-substring($dt, 4, 2)" /> <x:va-x:n-sec"x:s-substring($dt, 7)" /> <xsl:if test="$hour &lt;= 23 and $min &lt;= 59 and $sec &lt;= 60"> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-\'NaN\'" /> <x:w-x:n-month"x:s-\'NaN\'" /> <x:w-x:n-day"x:s-\'NaN\'" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$min" /> <x:w-x:n-second"x:s-$sec" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </xsl:if> </x:wh-> <x:o-> <!--($neg * -2)--> <x:va-x:n-year"x:s-substring($dt, 1, 4) * (0 + 1)" /> <x:va-x:n-month"x:s-substring($dt, 6, 2)" /> <x:va-x:n-day"x:s-substring($dt, 9, 2)" /> <x:c-> <x:wh- test="$dt-length = 10"> <!--that means we just have a date--> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:wh-> <x:wh- test="substring($dt, 14, 1) = \':\' and substring($dt, 17, 1) = \':\'"> <!--that means we have a date + time--> <x:va-x:n-hour"x:s-substring($dt, 12, 2)" /> <x:va-x:n-min"x:s-substring($dt, 15, 2)" /> <x:va-x:n-sec"x:s-substring($dt, 18)" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$min" /> <x:w-x:n-second"x:s-$sec" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-$mask" /> </x:ct-> </x:wh-> </x:c-> </x:o-> </x:c-> </x:va-> <x:v-x:s-$formatted" /> </x:t-><x:t-x:n-d:_format-date"> <x:p-x:n-year" /> <x:p-x:n-month"x:s-1" /> <x:p-x:n-day"x:s-1" /> <x:p-x:n-hour"x:s-0" /> <x:p-x:n-minute"x:s-0" /> <x:p-x:n-second"x:s-0" /> <x:p-x:n-timezone"x:s-\'Z\'" /> <x:p-x:n-mask"x:s-\'\'" /> <x:va-x:n-char"x:s-substring($mask, 1, 1)" /> <x:c-> <x:wh- test="not($mask)" /> <!--replaced escaping with \' here/--> <x:wh- test="not(contains(\'GyMdhHmsSEDFwWakKz\', $char))"> <x:v-x:s-$char" /> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$minute" /> <x:w-x:n-second"x:s-$second" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-substring($mask, 2)" /> </x:ct-> </x:wh-> <x:o-> <x:va-x:n-next-different-char"x:s-substring(translate($mask, $char, \'\'), 1, 1)" /> <x:va-x:n-mask-length"> <x:c-> <x:wh- test="$next-different-char"> <x:v-x:s-string-length(substring-before($mask, $next-different-char))" /> </x:wh-> <x:o-> <x:v-x:s-string-length($mask)" /> </x:o-> </x:c-> </x:va-> <x:c-> <!--took our the era designator--> <x:wh- test="$char = \'M\'"> <x:c-> <x:wh- test="$mask-length >= 3"> <x:va-x:n-month-node"x:s-document(\'\')/*/d:ms/d:m[number($month)]" /> <x:c-> <x:wh- test="$mask-length >= 4"> <x:v-x:s-$month-node" /> </x:wh-> <x:o-> <x:v-x:s-$month-node/@a" /> </x:o-> </x:c-> </x:wh-> <x:wh- test="$mask-length = 2"> <x:v-x:s-format-number($month, \'00\')" /> </x:wh-> <x:o-> <x:v-x:s-$month" /> </x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'E\'"> <x:va-x:n-month-days"x:s-sum(document(\'\')/*/d:ms/d:m[position() &lt; $month]/@l)" /> <x:va-x:n-days"x:s-$month-days + $day + boolean(((not($year mod 4) and $year mod 100) or not($year mod 400)) and $month &gt; 2)" /> <x:va-x:n-y-1"x:s-$year - 1" /> <x:va-x:n-dow"x:s-(($y-1 + floor($y-1 div 4) - floor($y-1 div 100) + floor($y-1 div 400) + $days) mod 7) + 1" /> <x:va-x:n-day-node"x:s-document(\'\')/*/d:ds/d:d[number($dow)]" /> <x:c-> <x:wh- test="$mask-length >= 4"> <x:v-x:s-$day-node" /> </x:wh-> <x:o-> <x:v-x:s-$day-node/@a" /> </x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'a\'"> <x:c-> <x:wh- test="$hour >= 12">PM</x:wh-> <x:o->AM</x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'z\'"> <x:c-> <x:wh- test="$timezone = \'Z\'">UTC</x:wh-> <x:o->UTC<x:v-x:s-$timezone" /></x:o-> </x:c-> </x:wh-> <x:o-> <x:va-x:n-padding"x:s-\'00\'" /> <!--removed padding--> <x:c-> <x:wh- test="$char = \'y\'"> <x:c-> <x:wh- test="$mask-length &gt; 2"><x:v-x:s-format-number($year, $padding)" /></x:wh-> <x:o-><x:v-x:s-format-number(substring($year, string-length($year) - 1), $padding)" /></x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'d\'"> <x:v-x:s-format-number($day, $padding)" /> </x:wh-> <x:wh- test="$char = \'h\'"> <x:va-x:n-h"x:s-$hour mod 12" /> <x:c-> <x:wh- test="$h"><x:v-x:s-format-number($h, $padding)" /></x:wh-> <x:o-><x:v-x:s-format-number(12, $padding)" /></x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'H\'"> <x:v-x:s-format-number($hour, $padding)" /> </x:wh-> <x:wh- test="$char = \'k\'"> <x:c-> <x:wh- test="$hour"><x:v-x:s-format-number($hour, $padding)" /></x:wh-> <x:o-><x:v-x:s-format-number(24, $padding)" /></x:o-> </x:c-> </x:wh-> <x:wh- test="$char = \'K\'"> <x:v-x:s-format-number($hour mod 12, $padding)" /> </x:wh-> <x:wh- test="$char = \'m\'"> <x:v-x:s-format-number($minute, $padding)" /> </x:wh-> <x:wh- test="$char = \'s\'"> <x:v-x:s-format-number($second, $padding)" /> </x:wh-> <x:wh- test="$char = \'S\'"> <x:v-x:s-format-number(substring-after($second, \'.\'), $padding)" /> </x:wh-> <x:wh- test="$char = \'F\'"> <x:v-x:s-floor($day div 7) + 1" /> </x:wh-> <x:o-> <x:va-x:n-month-days"x:s-sum(document(\'\')/*/d:ms/d:m[position() &lt; $month]/@l)" /> <x:va-x:n-days"x:s-$month-days + $day + boolean(((not($year mod 4) and $year mod 100) or not($year mod 400)) and $month &gt; 2)" /> <x:v-x:s-format-number($days, $padding)" /> <!--removed week in year--> <!--removed week in month--> </x:o-> </x:c-> </x:o-> </x:c-> <x:ct-x:n-d:_format-date"> <x:w-x:n-year"x:s-$year" /> <x:w-x:n-month"x:s-$month" /> <x:w-x:n-day"x:s-$day" /> <x:w-x:n-hour"x:s-$hour" /> <x:w-x:n-minute"x:s-$minute" /> <x:w-x:n-second"x:s-$second" /> <x:w-x:n-timezone"x:s-$timezone" /> <x:w-x:n-mask"x:s-substring($mask, $mask-length + 1)" /> </x:ct-> </x:o-> </x:c-></x:t-> <x:t- match="/"> <x:ct-x:n-d:format-date"> <x:w-x:n-date-time"x:s-//date" /> <x:w-x:n-mask"x:s-//mask" /> </x:ct-></x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.form");
nitobi.form.dateXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_dateXslProc));

var temp_ntb_declarationConverterXslProc='<?xml version="1.0" encoding="utf-8" ?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" omit-xml-declaration="yes" /> <x:t- match="/"> <ntb:grid xmlns:ntb="http://www.nitobi.com"> <ntb:columns> <x:at-x:s-//ntb:columndefinition" mode="columndef" /> </ntb:columns> <ntb:datasources> <x:at-x:s-//ntb:columndefinition" mode="datasources" /> </ntb:datasources> </ntb:grid> </x:t-> <x:t- match="ntb:columndefinition" mode="columndef"> <x:c-> <x:wh- test="@type=\'TEXT\' or @type=\'TEXTAREA\' or @type=\'LISTBOX\' or @type=\'LOOKUP\' or @type=\'CHECKBOX\' or @type=\'LINK\' or @type=\'IMAGE\' or @type=\'\' or not(@type)"> <ntb:textcolumn> <xsl:copy-ofx:s-@*" /> <x:c-> <x:wh- test="@type=\'TEXT\'"> <ntb:texteditor><xsl:copy-ofx:s-@*" /></ntb:texteditor> </x:wh-> <x:wh- test="@type=\'TEXTAREA\'"> <ntb:textareaeditor><xsl:copy-ofx:s-@*" /></ntb:textareaeditor> </x:wh-> <x:wh- test="@type=\'LISTBOX\'"> <ntb:listboxeditor> <xsl:copy-ofx:s-@*" /> <x:a-x:n-DatasourceId">id_<x:v-x:s-position()"/></x:a-> <x:a-x:n-DisplayFields"> <x:c-> <x:wh- test="@show=\'value\'">b</x:wh-> <x:wh- test="@show=\'key\'">a</x:wh-> <x:o-></x:o-> </x:c-> </x:a-> <x:a-x:n-ValueField"> <x:c-> <x:wh- test="@show">a</x:wh-> <x:o-></x:o-> </x:c-> </x:a-> </ntb:listboxeditor> </x:wh-> <x:wh- test="@type=\'CHECKBOX\'"> <ntb:checkboxeditor> <xsl:copy-ofx:s-@*" /> <x:a-x:n-DatasourceId">id_<x:v-x:s-position()"/></x:a-> <x:a-x:n-DisplayFields"> <x:c-> <x:wh- test="@show=\'value\'">b</x:wh-> <x:wh- test="@show=\'key\'">a</x:wh-> <x:o-></x:o-> </x:c-></x:a-> <x:a-x:n-ValueField">a</x:a-> </ntb:checkboxeditor> </x:wh-> <x:wh- test="@type=\'LOOKUP\'"> <ntb:lookupeditor> <xsl:copy-ofx:s-@*" /> <x:a-x:n-DatasourceId">id_<x:v-x:s-position()"/></x:a-> <x:a-x:n-DisplayFields"> <x:c-> <x:wh- test="@show=\'key\'">a</x:wh-> <x:wh- test="@show=\'value\'">b</x:wh-> <x:o-></x:o-> </x:c-></x:a-> <x:a-x:n-ValueField"> <x:c-> <x:wh- test="@show">a</x:wh-> <x:o-></x:o-> </x:c-> </x:a-> </ntb:lookupeditor> </x:wh-> <x:wh- test="@type=\'LINK\'"> <ntb:linkeditor><xsl:copy-ofx:s-@*" /></ntb:linkeditor> </x:wh-> <x:wh- test="@type=\'IMAGE\'"> <ntb:imageeditor><xsl:copy-ofx:s-@*" /></ntb:imageeditor> </x:wh-> </x:c-> </ntb:textcolumn> </x:wh-> <x:wh- test="@type=\'NUMBER\'"> <ntb:numbercolumn><xsl:copy-ofx:s-@*" /></ntb:numbercolumn> </x:wh-> <x:wh- test="@type=\'DATE\' or @type=\'CALENDAR\'"> <ntb:datecolumn> <xsl:copy-ofx:s-@*" /> <x:c-> <x:wh- test="@type=\'DATE\'"> <ntb:dateeditor><xsl:copy-ofx:s-@*" /></ntb:dateeditor> </x:wh-> <x:wh- test="@type=\'CALENDAR\'"> <ntb:calendareditor><xsl:copy-ofx:s-@*" /></ntb:calendareditor> </x:wh-> </x:c-> </ntb:datecolumn> </x:wh-> </x:c-> </x:t-> <x:t- match="ntb:columndefinition" mode="datasources"> <xsl:if test="@values and @values!=\'\'"> <ntb:datasource> <x:a-x:n-id">id_<x:v-x:s-position()" /></x:a-> <ntb:datasourcestructure> <x:a-x:n-id">id_<x:v-x:s-position()" /></x:a-> <x:a-x:n-FieldNames">a|b</x:a-> <x:a-x:n-Keys">a</x:a-> </ntb:datasourcestructure> <ntb:data> <x:a-x:n-id">id_<x:v-x:s-position()" /></x:a-> <x:ct-x:n-values"> <x:w-x:n-valuestring"x:s-@values" /> </x:ct-> </ntb:data> </ntb:datasource> </xsl:if> </x:t-> <x:t-x:n-values"> <x:p-x:n-valuestring" /> <x:va-x:n-bstring"> <x:c-> <x:wh- test="contains($valuestring,\',\')"><x:v-x:s-substring-after(substring-before($valuestring,\',\'),\':\')" /></x:wh-> <x:o-><x:v-x:s-substring-after($valuestring,\':\')" /></x:o-> </x:c-> </x:va-> <ntb:e> <x:a-x:n-a"><x:v-x:s-substring-before($valuestring,\':\')" /></x:a-> <x:a-x:n-b"><x:v-x:s-$bstring" /></x:a-> </ntb:e> <xsl:if test="contains($valuestring,\',\')"> <x:ct-x:n-values"> <x:w-x:n-valuestring"x:s-substring-after($valuestring,\',\')" /> </x:ct-> </xsl:if> </x:t-> </xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.declarationConverterXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_declarationConverterXslProc));

var temp_ntb_frameCssXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:user="http://mycompany.com/mynamespace" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:output method="text" omit-xml-declaration="yes"/><x:p-x:n-IE"x:s-\'false\'"/><xsl:keyx:n-style" match="//s" use="@k" /><x:t- match = "/"> <x:va-x:n-g"x:s-//state/nitobi.grid.Grid"></x:va-> <x:va-x:n-u"x:s-//state/@uniqueID"></x:va-> <x:va-x:n-showvscroll"><x:c-><x:wh- test="($g/@VScrollbarEnabled=\'true\' or $g/@VScrollbarEnabled=1)">1</x:wh-><x:o->0</x:o-></x:c-></x:va-> <x:va-x:n-showhscroll"><x:c-><x:wh- test="($g/@HScrollbarEnabled=\'true\' or $g/@HScrollbarEnabled=1)">1</x:wh-><x:o->0</x:o-></x:c-></x:va-> <x:va-x:n-showtoolbar"><x:c-><x:wh- test="($g/@ToolbarEnabled=\'true\' or $g/@ToolbarEnabled=1)">1</x:wh-><x:o->0</x:o-></x:c-></x:va-> <x:va-x:n-frozen-columns-width"> <x:ct-x:n-get-pane-width"> <x:w-x:n-start-column"x:s-number(1)"/> <x:w-x:n-end-column"x:s-number($g/@FrozenLeftColumnCount)"/> <x:w-x:n-current-width"x:s-number(0)"/> </x:ct-> </x:va-> <x:va-x:n-unfrozen-columns-width"> <x:ct-x:n-get-pane-width"> <x:w-x:n-start-column"x:s-number($g/@FrozenLeftColumnCount)+1"/> <x:w-x:n-end-column"x:s-number($g/@ColumnCount)"/> <x:w-x:n-current-width"x:s-number(0)"/> </x:ct-> </x:va-> <x:va-x:n-total-columns-width"> <x:v-x:s-number($frozen-columns-width) + number($unfrozen-columns-width)"/> </x:va-> <x:va-x:n-scrollerHeight"x:s-number($g/@Height)-(number($g/@scrollbarHeight)*$showhscroll)-(number($g/@toolbarHeight)*$showtoolbar)" /> <x:va-x:n-scrollerWidth"x:s-number($g/@Width)-(number($g/@scrollbarWidth)*number($g/@VScrollbarEnabled))" /> <x:va-x:n-midHeight"x:s-number($g/@Height)-(number($g/@scrollbarHeight)*$showhscroll)-(number($g/@toolbarHeight)*$showtoolbar)-number($g/@top)"/> #grid<x:v-x:s-$u" /> { height:<x:v-x:s-$g/@Height" />px; width:<x:v-x:s-$g/@Width" />px; overflow:hidden;text-align:left; <xsl:if test="$IE=\'true\'"> position:relative; </xsl:if> -moz-user-select: none; -khtml-user-select: none; user-select: none; } .hScrollbarRange<x:v-x:s-$u" /> { width:<x:v-x:s-$total-columns-width"/>px; } .vScrollbarRange<x:v-x:s-$u" /> {} .ntb-grid-datablock, .ntb-grid-headerblock { table-layout:fixed; width:0px; } .ntbrowindicator {overflow:hidden;height:<x:v-x:s-$g/@RowHeight" />px;width:<x:v-x:s-$g/@indicatorWidth" />px;float:left;} .ntbcellborder<x:v-x:s-$u" /> {overflow:hidden;text-decoration:none;margin:0px;border-right:1px solid #c0c0c0;border-bottom:1px solid #c0c0c0;white-space:nowrap;} .ntb-grid-headershow<x:v-x:s-$u" /> {padding:0px;spacing:0px;<xsl:if test="not($g/@ColumnIndicatorsEnabled=1)">display:none;</xsl:if>} .ntb-grid-vscrollshow<x:v-x:s-$u" /> {padding:0px;spacing:0px;<xsl:if test="not($g/@VScrollbarEnabled=1)">display:none;</xsl:if>} .ntb-grid-hscrollshow<x:v-x:s-$u" /> {padding:0px;spacing:0px;<xsl:if test="not($g/@HScrollbarEnabled=1)">display:none;</xsl:if>} .ntb-grid-toolbarshow<x:v-x:s-$u" /> {<xsl:if test="not($g/@ToolbarEnabled=1) and not($g/@ToolbarEnabled=\'true\')">display:none;</xsl:if>} .ntb-grid-height<x:v-x:s-$u" /> {height:<x:v-x:s-$g/@Height" />px;overflow:hidden;} .ntb-grid-width<x:v-x:s-$u" /> {width:<x:v-x:s-$g/@Width" />px;overflow:hidden;} .ntb-grid-overlay<x:v-x:s-$u" /> {position:relative;z-index:1000;top:0px;left:0px;} .ntb-grid-scroller<x:v-x:s-$u" /> {overflow:hidden;text-align:left;} .ntb-grid-scrollerheight<x:v-x:s-$u" /> {height: <x:c-><x:wh- test="($total-columns-width &gt; $g/@Width)"><x:v-x:s-$scrollerHeight"/></x:wh-><x:o-><x:v-x:s-number($scrollerHeight) + number($g/@scrollbarHeight)"/></x:o-></x:c->px;} .ntb-grid-scrollerwidth<x:v-x:s-$u" /> {width:<x:v-x:s-$scrollerWidth"/>px;} .ntb-grid-topheight<x:v-x:s-$u" /> {height:<x:v-x:s-$g/@top" />px;overflow:hidden;<xsl:if test="$g/@top=0">display:none;</xsl:if>} .ntb-grid-midheight<x:v-x:s-$u" /> {overflow:hidden;height:<x:c-><x:wh- test="($total-columns-width &gt; $g/@Width)"><x:v-x:s-$midHeight"/></x:wh-><x:o-><x:v-x:s-number($midHeight) + number($g/@scrollbarHeight)"/></x:o-></x:c->px;} .ntb-grid-bottomheight<x:v-x:s-$u" /> {height:<x:v-x:s-$g/@bottom" />px;overflow:hidden;} .ntb-grid-leftwidth<x:v-x:s-$u" /> { width:<x:v-x:s-$g/@left" />px;overflow:hidden;text-align:left; } .ntb-grid-centerwidth<x:v-x:s-$u" /> {width:<x:v-x:s-number($g/@Width)-number($g/@left)-(number($g/@scrollbarWidth)*$showvscroll)" />px;} .ntb-grid-rightwidth<x:v-x:s-$u" /> {width:<x:v-x:s-$g/@right" />px;} .ntb-grid-scrollbarheight<x:v-x:s-$u" /> {height:<x:v-x:s-$g/@scrollbarHeight" />px;} .ntb-grid-scrollbarwidth<x:v-x:s-$u" /> {width:<x:v-x:s-$g/@scrollbarWidth" />px;} .ntb-grid-toolbarheight<x:v-x:s-$u" /> {height:<x:v-x:s-$g/@toolbarHeight" />px;} .ntb-grid-surfacewidth<x:v-x:s-$u" /> {width:<x:v-x:s-number($unfrozen-columns-width)"/>px;} .ntb-grid-surfaceheight<x:v-x:s-$u" /> {height:100px;} .ntb-grid {padding:0px;margin:0px;border:1px solid #cccccc} .ntb-scroller {padding:0px;spacing:0px;} .ntb-scrollcorner {padding:0px;spacing:0px;} .ntb-hscrollbar {<x:c-><x:wh- test="($total-columns-width &gt; $g/@Width)">display:block;</x:wh-><x:o->display:none;</x:o-></x:c->} .ntbinputborder { table-layout:fixed; overflow:hidden; } .ntbcolumnresizesurface { filter:alpha(opacity=1); background-color:white; position:absolute; visibility:hidden; top:0; left:0; width:100; height:100; z-index:800; } .ntbcolumnindicatorborder { padding-right: 1px; } .ntbcolumnindicator { overflow:hidden; white-space: nowrap; } .ntbrow<x:v-x:s-$u" /> {height:<x:v-x:s-$g/@RowHeight" />px;margin:0px;} .ntbheaderrow<x:v-x:s-$u" /> {height:<x:v-x:s-$g/@HeaderHeight" />px;} <x:at-x:s-state/nitobi.grid.Columns" /></x:t-><x:t-x:n-get-pane-width"> <x:p-x:n-start-column"/> <x:p-x:n-end-column"/> <x:p-x:n-current-width"/> <x:c-> <x:wh- test="$start-column &lt;= $end-column"> <x:ct-x:n-get-pane-width"> <x:w-x:n-start-column"x:s-$start-column+1"/> <x:w-x:n-end-column"x:s-$end-column"/> <x:w-x:n-current-width"x:s-number($current-width) + number(//state/nitobi.grid.Columns/nitobi.grid.Column[$start-column]/@Width)"/> </x:ct-> </x:wh-> <x:o-> <x:v-x:s-$current-width"/> </x:o-> </x:c-> </x:t-><x:t- match="nitobi.grid.Columns"> <xsl:for-eachx:s-*"> <x:va-x:n-p"><x:v-x:s-position()"/></x:va-> <x:va-x:n-w"><x:v-x:s-@Width"/></x:va-> .ntbcolumn<x:v-x:s-/state/@uniqueID" />_<xsl:number value="$p" /> {width:<x:v-x:s-$w" />px;} .ntbcolumndata<x:v-x:s-/state/@uniqueID" />_<xsl:number value="$p" /> {text-align:<x:v-x:s-@Align"/>;} </xsl:for-each></x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.frameCssXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_frameCssXslProc));

var temp_ntb_frameXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:ntb="http://www.nitobi.com" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:output method="text" omit-xml-declaration="yes"/><x:p-x:n-IE"x:s-\'false\'"/><x:p-x:n-scrollbarWidth"x:s-17" /><x:t- match = "/"><x:va-x:n-uniqueId"x:s-state/@uniqueID" /><x:va-x:n-Id"x:s-state/@ID" /><x:va-x:n-resizeEnabled"x:s-state/nitobi.grid.Grid/@GridResizeEnabled" /><x:va-x:n-offset"> <x:c-> <x:wh- test="$IE=\'true\'">1</x:wh-> <x:o->0</x:o-> </x:c-></x:va-> &lt;table <xsl:if test="$IE=\'true\'">tabindex="1"</xsl:if> cellpadding="0" cellspacing="0" id="grid<x:v-x:s-$uniqueId" />" class="ntb-grid <x:v-x:s-@theme" />" &gt; &lt;tr&gt; &lt;td colspan="2"&gt; &lt;div id="ntb-grid-overlay<x:v-x:s-$uniqueId" />" class="ntb-grid-overlay<x:v-x:s-$uniqueId" />"&gt;&lt;/div&gt; <xsl:if test="$IE=\'false\'">&lt;div id="ntb-grid-keynav<x:v-x:s-$uniqueId" />" tabindex="1" style="position:absolute;width:0px;height:0px;"&gt;&lt;/div&gt;</xsl:if> &lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td id="ntb-grid-scroller<x:v-x:s-$uniqueId" />" class="ntb-grid-scrollerheight<x:v-x:s-$uniqueId" /> ntb-grid-scrollerwidth<x:v-x:s-$uniqueId" />" &gt; &lt;div id="ntb-grid-scrollerarea<x:v-x:s-$uniqueId" />" class="ntb-grid-scrollerheight<x:v-x:s-$uniqueId" />" style="overflow:hidden;" &gt; &lt;div tabindex="2" id="ntb-grid-scroller<x:v-x:s-$uniqueId" />" class="ntb-grid-scroller<x:v-x:s-$uniqueId" /> ntb-grid-scrollerheight<x:v-x:s-$uniqueId" />" &gt; &lt;table class="ntb-grid-scroller" cellpadding="0" cellspacing="0" border="0" &gt; &lt;tr class="ntb-grid-topheight<x:v-x:s-$uniqueId" /> " &gt; &lt;td class="ntb-scroller ntb-grid-topheight<x:v-x:s-$uniqueId" />" &gt; &lt;div id="gridvp_0_<x:v-x:s-$uniqueId" />" class="ntb-grid-topheight<x:v-x:s-$uniqueId" /> ntb-grid-leftwidth<x:v-x:s-$uniqueId" />"&gt; &lt;div id="gridvpsurface_0_<x:v-x:s-$uniqueId" />" &gt; &lt;div id="gridvpcontainer_0_<x:v-x:s-$uniqueId" />" &gt;&lt;/div&gt; &lt;/div&gt; &lt;/div&gt; &lt;/td&gt; &lt;td class="ntb-scroller" &gt; &lt;div id="gridvp_1_<x:v-x:s-$uniqueId" />" class="ntb-grid-topheight<x:v-x:s-$uniqueId" /> ntb-grid-centerwidth<x:v-x:s-$uniqueId" /> ntbgridheader"&gt; &lt;div id="gridvpsurface_1_<x:v-x:s-$uniqueId" />" class="ntb-grid-surfacewidth<x:v-x:s-$uniqueId" />" &gt; &lt;div id="gridvpcontainer_1_<x:v-x:s-$uniqueId" />" &gt;&lt;/div&gt; &lt;/div&gt; &lt;/div&gt; &lt;/td&gt; &lt;/tr&gt; &lt;tr class="ntb-grid-scroller" &gt; &lt;td class="ntb-scroller" &gt; &lt;div style="position:relative;"&gt; <!--&lt;div id="ntb-frozenshadow<x:v-x:s-$uniqueId" />" class="ntb-frozenshadow"&gt;&lt;/div&gt;--> &lt;div id="gridvp_2_<x:v-x:s-$uniqueId" />" class="ntb-grid-midheight<x:v-x:s-$uniqueId" /> ntb-grid-leftwidth<x:v-x:s-$uniqueId" />" style="position:relative;"&gt; &lt;div id="gridvpsurface_2_<x:v-x:s-$uniqueId" />" &gt; &lt;div id="gridvpcontainer_2_<x:v-x:s-$uniqueId" />" &gt;&lt;/div&gt; &lt;/div&gt; &lt;/div&gt; &lt;/div&gt; &lt;/td&gt; &lt;td class="ntb-scroller" &gt; &lt;div id="gridvp_3_<x:v-x:s-$uniqueId" />" class="ntb-grid-midheight<x:v-x:s-$uniqueId"/> ntb-grid-centerwidth<x:v-x:s-$uniqueId" />" style="position:relative;"&gt; &lt;div id="gridvpsurface_3_<x:v-x:s-$uniqueId" />" class="ntb-grid-surfacewidth<x:v-x:s-$uniqueId" />" &gt; &lt;div id="gridvpcontainer_3_<x:v-x:s-$uniqueId" />" &gt;&lt;/div&gt; &lt;/div&gt; &lt;/div&gt; &lt;/td&gt; &lt;/tr&gt; &lt;/table&gt; &lt;/div&gt; &lt;/div&gt; &lt;/td&gt; &lt;td id="ntb-grid-vscrollshow<x:v-x:s-$uniqueId" />" class="ntb-grid-scrollerheight<x:v-x:s-$uniqueId" />"&gt;&lt;div id="vscrollclip<x:v-x:s-$uniqueId" />" class="ntb-grid-scrollerheight<x:v-x:s-$uniqueId" /> ntb-grid-scrollbarwidth<x:v-x:s-$uniqueId"/> ntb-scrollbar" style="overflow:hidden;" &gt;&lt;div id="vscroll<x:v-x:s-$uniqueId" />" class="ntb-scrollbar" style="height:100%;width:<x:v-x:s-number($offset)+number(state/nitobi.grid.Grid/@scrollbarWidth)"/>px;position:relative;top:0px;left:-<x:v-x:s-$offset"/>px;overflow-x:hidden;overflow-y:scroll;" &gt;&lt;div class="vScrollbarRange<x:v-x:s-$uniqueId" />" style="WIDTH:1px;overflow:hidden;"&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/td&gt; &lt;/tr&gt; &lt;tr id="ntb-grid-hscrollshow<x:v-x:s-$uniqueId" />" &gt; &lt;td &gt;&lt;div id="hscrollclip<x:v-x:s-$uniqueId" />" class="ntb-grid-scrollbarheight<x:v-x:s-$uniqueId" /> ntb-grid-scrollerwidth<x:v-x:s-$uniqueId" /> ntb-hscrollbar" style="overflow:hidden;" &gt; &lt;div id="hscroll<x:v-x:s-$uniqueId" />" class="ntb-grid-scrollbarheight<x:v-x:s-$uniqueId" /> ntb-grid-scrollerwidth<x:v-x:s-$uniqueId" /> ntb-scrollbar" style="overflow-x:scroll;overflow-y:hidden;height:30px;position:relative;top:-<x:v-x:s-30-number(state/nitobi.grid.Grid/@scrollbarWidth)"/>px;left:0px;" &gt; &lt;div class="hScrollbarRange<x:v-x:s-$uniqueId" />" style="HEIGHT:1px;overflow:hidden;"&gt; &lt;/div&gt; &lt;/td&gt; &lt;td class="ntb-grid-vscrollshow<x:v-x:s-$uniqueId" /> ntb-scrollcorner" &gt;&lt;/td&gt; &lt;/tr&gt; &lt;tr id="ntb-grid-toolbarshow<x:v-x:s-$uniqueId" />" &gt;&lt;td colspan="2" class="ntbtoolbarcontainer" &gt;&lt;div id="toolbarContainer<x:v-x:s-$uniqueId" />" style="overflow:hidden;" class="ntb-grid-toolbarshow<x:v-x:s-$uniqueId" /> ntb-grid-toolbarheight<x:v-x:s-$uniqueId" /> ntb-grid-width<x:v-x:s-$uniqueId" />"&gt;&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt; &lt;tr id="ntb-resize-container<x:v-x:s-$uniqueId" />" &gt; &lt;td colspan="2"&gt; <xsl:if test="$resizeEnabled = \'true\'"> &lt;div style="position:relative;"&gt; &lt;div id="resizecornercontainer<x:v-x:s-$uniqueId" />" style="visibility:visible;position:absolute;right:0px;width:20px;height:20px;border:0px;bottom:0px;" onmouseover="nitobi.html.Css.setStyle($(\'resizecorner<x:v-x:s-$uniqueId" />\'), \'visibility\', \'visible\')" onmouseout="nitobi.html.Css.setStyle($(\'resizecorner<x:v-x:s-$uniqueId" />\'), \'visibility\', \'hidden\')"&gt; &lt;div id="resizecorner<x:v-x:s-$uniqueId" />" style="visibility:hidden;"&gt; &lt;div class="ntbresizeindicatorright"&gt; &lt;/div&gt; &lt;div class="ntbresizeindicatorbottom"&gt; &lt;/div&gt; &lt;/div&gt; &lt;/div&gt; &lt;/div&gt; </xsl:if> &lt;/td&gt; &lt;/tr&gt; &lt;/table&gt;</x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.frameXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_frameXslProc));

var temp_ntb_listboxXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" omit-xml-declaration="yes"/> <x:p-x:n-DisplayFields"x:s-\'\'"></x:p-> <x:p-x:n-ValueField"x:s-\'\'"></x:p-> <x:p-x:n-val"x:s-\'\'"></x:p-> <x:t- match="/"> <!--<x:va-x:n-cell"x:s-/root/metadata/r[@xi=$row]/*[@xi=$col]"></x:va->--> <select class="ntbinput ntblookupoptions"> <!--<x:c-> <x:wh- test="$DatasourceId">--> <xsl:for-eachx:s-/ntb:datasource/ntb:data/*"> <xsl:sortx:s-@*[name(.)=substring-before($DisplayFields,\'|\')]" data-type="text" order="ascending" /> <option> <x:a-x:n-value"> <x:v-x:s-@*[name(.)=$ValueField]"></x:v-> </x:a-> <x:a-x:n-rn"> <x:v-x:s-position()"></x:v-> </x:a-> <xsl:if test="@*[name(.)=$ValueField and .=$val]"> <x:a-x:n-selected">true</x:a-> </xsl:if> <x:ct-x:n-print-displayfields"> <x:w-x:n-field"x:s-$DisplayFields" /> </x:ct-> </option> </xsl:for-each> <!--</x:wh-> <x:o-> </x:o-> </x:c->--> </select> </x:t-> <x:t-x:n-print-displayfields"> <x:p-x:n-field" /> <x:c-> <x:wh- test="contains($field,\'|\')" > <!-- Here we hardcode a spacer \', \' - this should probably be moved elsewhere. --> <x:v-x:s-concat(@*[name(.)=substring-before($field,\'|\')],\', \')"></x:v-> <x:ct-x:n-print-displayfields"> <x:w-x:n-field"x:s-substring-after($field,\'|\')" /> </x:ct-> </x:wh-> <x:o-> <x:v-x:s-@*[name(.)=$field]"></x:v-> </x:o-> </x:c-> </x:t-> </xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.form");
nitobi.form.listboxXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_listboxXslProc));

var temp_ntb_mergeEbaXmlToLogXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" omit-xml-declaration="yes"/> <x:p-x:n-defaultAction"></x:p-> <x:p-x:n-startXid"x:s-100" ></x:p-> <xsl:keyx:n-newData" match="/ntb:grid/ntb:newdata/ntb:data/ntb:e" use="@xid" /> <xsl:keyx:n-oldData" match="/ntb:grid/ntb:datasources/ntb:datasource/ntb:data/ntb:e" use="@xid" /> <x:t- match="@* | node()" > <xsl:copy> <x:at-x:s-@*|node()" /> </xsl:copy> </x:t-> <x:t- match="/ntb:grid/ntb:datasources/ntb:datasource/ntb:data/ntb:e"> <xsl:if test="not(key(\'newData\',@xid))"> <xsl:copy> <xsl:copy-ofx:s-@*" /> </xsl:copy> </xsl:if> </x:t-> <x:t- match="/ntb:grid/ntb:datasources/ntb:datasource/ntb:data"> <xsl:copy> <x:at-x:s-@*|node()" /> <xsl:for-eachx:s-/ntb:grid/ntb:newdata/ntb:data/ntb:e"> <xsl:copy> <xsl:copy-ofx:s-@*" /> <xsl:if test="$defaultAction"> <x:va-x:n-oldNode"x:s-key(\'oldData\',@xid)" /> <x:c-> <x:wh- test="$oldNode"> <x:va- name=\'xid\'x:s-@xid" /> <x:a-x:n-xac"><x:v-x:s-$oldNode/@xac" /></x:a-> </x:wh-> <x:o-> <x:a-x:n-xac"><x:v-x:s-$defaultAction" /></x:a-> </x:o-> </x:c-> </xsl:if> </xsl:copy> </xsl:for-each> </xsl:copy> </x:t-></xsl:stylesheet> ';
nitobi.lang.defineNs("nitobi.data");
nitobi.data.mergeEbaXmlToLogXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_mergeEbaXmlToLogXslProc));

var temp_ntb_mergeEbaXmlXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" omit-xml-declaration="no" /> <x:p-x:n-startRowIndex"x:s-100" ></x:p-> <x:p-x:n-endRowIndex"x:s-200" ></x:p-> <x:p-x:n-guid"x:s-1"></x:p-> <xsl:keyx:n-newData" match="/ntb:grid/ntb:newdata/ntb:data/ntb:e" use="@xi" /> <xsl:keyx:n-oldData" match="/ntb:grid/ntb:datasources/ntb:datasource/ntb:data/ntb:e" use="@xi" /> <x:t- match="@* | node()" > <xsl:copy> <x:at-x:s-@*|node()" /> </xsl:copy> </x:t-> <x:t- match="/ntb:grid/ntb:datasources/ntb:datasource/ntb:data/ntb:e"> <x:c-> <x:wh- test="(number(@xi) &gt;= $startRowIndex) and (number(@xi) &lt;= $endRowIndex)"> <xsl:copy> <xsl:copy-ofx:s-@*" /> <xsl:copy-ofx:s-key(\'newData\',@xi)/@*" /> </xsl:copy> </x:wh-> <x:o-> <xsl:copy> <x:at-x:s-@*|node()" /> </xsl:copy> </x:o-> </x:c-> </x:t-> <x:t- match="/ntb:grid/ntb:datasources/ntb:datasource/ntb:data"> <xsl:copy> <x:at-x:s-@*|node()" /> <xsl:for-eachx:s-/ntb:grid/ntb:newdata/ntb:data/ntb:e"> <xsl:if test="not(key(\'oldData\',@xi))"> <xsl:elementx:n-ntb:e" namespace="http://www.nitobi.com"> <xsl:copy-ofx:s-@*" /> <x:a-x:n-xid"><x:v-x:s-generate-id(.)"/><x:v-x:s-position()"/><x:v-x:s-$guid"/></x:a-> </xsl:element> </xsl:if> </xsl:for-each> </xsl:copy> </x:t-> <x:t- match="/ntb:grid/ntb:newdata/ntb:data/ntb:e"> <xsl:copy> <xsl:copy-ofx:s-@*" /> <x:va-x:n-oldData"x:s-key(\'oldData\',@xi)"/> <x:c-> <x:wh- test="$oldData"> <xsl:copy-ofx:s-$oldData/@*" /> <xsl:copy-ofx:s-@*" /> <x:a-x:n-xac">u</x:a-> <xsl:if test="$oldData/@xac=\'i\'"> <x:a-x:n-xac">i</x:a-> </xsl:if> </x:wh-> <x:o-> <x:a-x:n-xid"><x:v-x:s-generate-id(.)"/><x:v-x:s-position()"/><x:v-x:s-$guid"/></x:a-> <x:a-x:n-xac">i</x:a-> </x:o-> </x:c-> </xsl:copy> </x:t-> </xsl:stylesheet> ';
nitobi.lang.defineNs("nitobi.data");
nitobi.data.mergeEbaXmlXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_mergeEbaXmlXslProc));

var temp_ntb_mergeUpdateAttributesXslProc='<?xml version="1.0" encoding="UTF-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> <xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/> <x:t-x:n-xmlUpdate"> <update></update> </x:t-> <x:t- match="@*|node()"> <xsl:copy> <x:at-x:s-@*|node()"/> </xsl:copy> </x:t-> <x:t- match="//update//@*"> <xsl:copy> <x:at-x:s-node()|@*"/> </xsl:copy> </x:t-> <!-- update the number of rows does not account for inserts! --> <x:t- match="//metadata/@numrows"> <x:a-x:n-{name(.)}"><x:v-x:s-. - count((document(\'\')//data[@id=\'_default\']/e[@xac=\'d\']))" /></x:a-> </x:t-> <!-- merge the updated attributes for each row --> <x:t- match="@*"> <x:va-x:n-currentXI"x:s-../@xi"/> <x:va-x:n-parentID"x:s-../../@id"/> <x:va-x:n-parentXI"x:s-../../@xi"/> <x:va-x:n-targetNode"x:s-(document(\'\')//*[@id=$parentID or @xi=$parentXI]/*[@xi=$currentXI and @xac=\'u\'])" /> <x:c-> <x:wh- test="($targetNode) and (name($targetNode)=name(..)) and (../@xi = $targetNode/@xi) and (name(../..) = name($targetNode/..))"> <xsl:copy> <x:at-x:s-node()|@*"/> </xsl:copy> <x:at-x:s-$targetNode/@*" /> </x:wh-> <x:o-> <xsl:copy> <x:at-x:s-node()|@*"/> </xsl:copy> </x:o-> </x:c-> </x:t-> <!-- delete rows --> <x:t- match="//root/*//node()"> <x:va-x:n-currentXI"x:s-@xi"/> <x:va-x:n-parentID"x:s-../@id"/> <x:va-x:n-parentXI"x:s-../@xi"/> <x:va-x:n-targetNode"x:s-(document(\'\')//*[@id=$parentID or @xi=$parentXI]/*[@xi=$currentXI and @xac=\'d\'])" /> <x:c-> <x:wh- test="($targetNode) and (name($targetNode/..)=name(..)) and (name() = name($targetNode))"> </x:wh-> <x:o-> <xsl:copy> <x:at-x:s-node()|@*"/> </xsl:copy> </x:o-> </x:c-> </x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.data");
nitobi.data.mergeUpdateAttributesXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_mergeUpdateAttributesXslProc));

var temp_ntb_modelFromDeclarationInitializerXslProc='<?xml version="1.0"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> <xsl:output method="text" encoding="utf-8" omit-xml-declaration="yes"/> <x:t- match="interface"> <x:ct-x:n-initJSDefaults"/> <x:at-/> </x:t-> <x:t-x:n-initJSDefaults"> var elem = this.Declaration.grid.documentElement; var valueFromHtml; </x:t-> <x:t- match="properties | events"> <xsl:for-eachx:s-*"> valueFromHtml = <x:c-><x:wh- test="@htmltag">elem.getAttribute("<x:v-x:s-@htmltag"/>")</x:wh-><x:o->elem.getAttribute("<x:v-x:s-@name"/>")</x:o-></x:c->; if (valueFromHtml) { this.set<x:v-x:s-@name"/>(valueFromHtml); } </xsl:for-each> </x:t-> <x:t- match="text()"/></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.modelFromDeclarationInitializerXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_modelFromDeclarationInitializerXslProc));

var temp_ntb_numberFormatTemplatesXslProc='<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com" xmlns:d="http://exslt.org/dates-and-times" xmlns:n="http://www.nitobi.com/exslt/numbers" extension-element-prefixes="d n"> <!--http://www.w3schools.com/xsl/func_formatnumber.asp--><xsl:decimal-formatx:n-ebaNumber" decimal-separator="." grouping-separator="," /><x:t-x:n-n:format"> <x:p-x:n-number"x:s-0" /> <x:p-x:n-mask"x:s-\'#.00\'" /> <x:p-x:n-group"x:s-\',\'" /> <x:p-x:n-decimal"x:s-\'.\'" /> <x:va-x:n-formattedNumber"> <x:v-x:s-format-number($number, $mask, \'ebaNumber\')" /> </x:va-> <xsl:if test="not(string($formattedNumber) = \'NaN\')"> <x:v-x:s-$formattedNumber" /> </xsl:if></x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.numberFormatTemplatesXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_numberFormatTemplatesXslProc));

var temp_ntb_numberXslProc='<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com" xmlns:d="http://exslt.org/dates-and-times" xmlns:n="http://www.nitobi.com/exslt/numbers" extension-element-prefixes="d n"><xsl:output method="text" version="4.0" omit-xml-declaration="yes" />  <!--http://www.w3schools.com/xsl/func_formatnumber.asp--><xsl:decimal-formatx:n-ebaNumber" decimal-separator="." grouping-separator="," /><x:t-x:n-n:format"> <x:p-x:n-number"x:s-0" /> <x:p-x:n-mask"x:s-\'#.00\'" /> <x:p-x:n-group"x:s-\',\'" /> <x:p-x:n-decimal"x:s-\'.\'" /> <x:va-x:n-formattedNumber"> <x:v-x:s-format-number($number, $mask, \'ebaNumber\')" /> </x:va-> <xsl:if test="not(string($formattedNumber) = \'NaN\')"> <x:v-x:s-$formattedNumber" /> </xsl:if></x:t-><x:t- match="/"> <x:ct-x:n-n:format"> <x:w-x:n-number"x:s-//number" /> <x:w-x:n-mask"x:s-//mask" /> <x:w-x:n-group"x:s-//group" /> <x:w-x:n-decimal"x:s-//decimal" /> </x:ct-></x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.form");
nitobi.form.numberXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_numberXslProc));

var temp_ntb_rowGeneratorXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com" xmlns:d="http://exslt.org/dates-and-times" xmlns:n="http://www.nitobi.com/exslt/numbers" extension-element-prefixes="d n"><xsl:output method="text" omit-xml-declaration="yes"/><x:p-x:n-showIndicators"x:s-\'0\'" /><x:p-x:n-showHeaders"x:s-\'0\'" /><x:p-x:n-firstColumn"x:s-\'0\'" /><x:p-x:n-lastColumn"x:s-\'0\'" /><x:p-x:n-uniqueId"x:s-\'0\'" /><x:p-x:n-rowHover"x:s-\'0\'" /><x:p-x:n-frozenColumnId"x:s-\'\'" /><x:t- match = "/">&lt;xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com" xmlns:d="http://exslt.org/dates-and-times" xmlns:n="http://www.nitobi.com/exslt/numbers" extension-element-prefixes="d n"&gt; &lt;!-- http://java.sun.com/j2se/1.3/docs/api/java/text/SimpleDateFormat.html --&gt;&lt;d:ms&gt; &lt;d:m l="31" a="Jan"&gt;January&lt;/d:m&gt; &lt;d:m l="28" a="Feb"&gt;February&lt;/d:m&gt; &lt;d:m l="31" a="Mar"&gt;March&lt;/d:m&gt; &lt;d:m l="30" a="Apr"&gt;April&lt;/d:m&gt; &lt;d:m l="31" a="May"&gt;May&lt;/d:m&gt; &lt;d:m l="30" a="Jun"&gt;June&lt;/d:m&gt; &lt;d:m l="31" a="Jul"&gt;July&lt;/d:m&gt; &lt;d:m l="31" a="Aug"&gt;August&lt;/d:m&gt; &lt;d:m l="30" a="Sep"&gt;September&lt;/d:m&gt; &lt;d:m l="31" a="Oct"&gt;October&lt;/d:m&gt; &lt;d:m l="30" a="Nov"&gt;November&lt;/d:m&gt; &lt;d:m l="31" a="Dec"&gt;December&lt;/d:m&gt;&lt;/d:ms&gt;&lt;d:ds&gt; &lt;d:d a="Sun"&gt;Sunday&lt;/d:d&gt; &lt;d:d a="Mon"&gt;Monday&lt;/d:d&gt; &lt;d:d a="Tue"&gt;Tuesday&lt;/d:d&gt; &lt;d:d a="Wed"&gt;Wednesday&lt;/d:d&gt; &lt;d:d a="Thu"&gt;Thursday&lt;/d:d&gt; &lt;d:d a="Fri"&gt;Friday&lt;/d:d&gt; &lt;d:d a="Sat"&gt;Saturday&lt;/d:d&gt;&lt;/d:ds&gt;&lt;x:t-x:n-d:format-date"&gt; &lt;x:p-x:n-date-time" /&gt; &lt;x:p-x:n-mask"x:s-\'MMM d, yy\'"/&gt; &lt;x:va-x:n-formatted"&gt; &lt;x:va-x:n-date-time-length"x:s-string-length($date-time)" /&gt; &lt;x:va-x:n-timezone"x:s-\'\'" /&gt; &lt;x:va-x:n-dt"x:s-substring($date-time, 1, $date-time-length - string-length($timezone))" /&gt; &lt;x:va-x:n-dt-length"x:s-string-length($dt)" /&gt; &lt;x:c-&gt; &lt;x:wh- test="substring($dt, 3, 1) = \':\' and substring($dt, 6, 1) = \':\'"&gt; &lt;!--that means we just have a time--&gt; &lt;x:va-x:n-hour"x:s-substring($dt, 1, 2)" /&gt; &lt;x:va-x:n-min"x:s-substring($dt, 4, 2)" /&gt; &lt;x:va-x:n-sec"x:s-substring($dt, 7)" /&gt; &lt;xsl:if test="$hour &amp;lt;= 23 and $min &amp;lt;= 59 and $sec &amp;lt;= 60"&gt; &lt;x:ct-x:n-d:_format-date"&gt; &lt;x:w-x:n-year"x:s-\'NaN\'" /&gt; &lt;x:w-x:n-month"x:s-\'NaN\'" /&gt; &lt;x:w-x:n-day"x:s-\'NaN\'" /&gt; &lt;x:w-x:n-hour"x:s-$hour" /&gt; &lt;x:w-x:n-minute"x:s-$min" /&gt; &lt;x:w-x:n-second"x:s-$sec" /&gt; &lt;x:w-x:n-timezone"x:s-$timezone" /&gt; &lt;x:w-x:n-mask"x:s-$mask" /&gt; &lt;/x:ct-&gt; &lt;/xsl:if&gt; &lt;/x:wh-&gt; &lt;x:o-&gt; &lt;!--($neg * -2)--&gt; &lt;x:va-x:n-year"x:s-substring($dt, 1, 4) * (0 + 1)" /&gt; &lt;x:va-x:n-month"x:s-substring($dt, 6, 2)" /&gt; &lt;x:va-x:n-day"x:s-substring($dt, 9, 2)" /&gt; &lt;x:c-&gt; &lt;x:wh- test="$dt-length = 10"&gt; &lt;!--that means we just have a date--&gt; &lt;x:ct-x:n-d:_format-date"&gt; &lt;x:w-x:n-year"x:s-$year" /&gt; &lt;x:w-x:n-month"x:s-$month" /&gt; &lt;x:w-x:n-day"x:s-$day" /&gt; &lt;x:w-x:n-timezone"x:s-$timezone" /&gt; &lt;x:w-x:n-mask"x:s-$mask" /&gt; &lt;/x:ct-&gt; &lt;/x:wh-&gt; &lt;x:wh- test="substring($dt, 14, 1) = \':\' and substring($dt, 17, 1) = \':\'"&gt; &lt;!--that means we have a date + time--&gt; &lt;x:va-x:n-hour"x:s-substring($dt, 12, 2)" /&gt; &lt;x:va-x:n-min"x:s-substring($dt, 15, 2)" /&gt; &lt;x:va-x:n-sec"x:s-substring($dt, 18)" /&gt; &lt;x:ct-x:n-d:_format-date"&gt; &lt;x:w-x:n-year"x:s-$year" /&gt; &lt;x:w-x:n-month"x:s-$month" /&gt; &lt;x:w-x:n-day"x:s-$day" /&gt; &lt;x:w-x:n-hour"x:s-$hour" /&gt; &lt;x:w-x:n-minute"x:s-$min" /&gt; &lt;x:w-x:n-second"x:s-$sec" /&gt; &lt;x:w-x:n-timezone"x:s-$timezone" /&gt; &lt;x:w-x:n-mask"x:s-$mask" /&gt; &lt;/x:ct-&gt; &lt;/x:wh-&gt; &lt;/x:c-&gt; &lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:va-&gt; &lt;x:v-x:s-$formatted" /&gt; &lt;/x:t-&gt;&lt;x:t-x:n-d:_format-date"&gt; &lt;x:p-x:n-year" /&gt; &lt;x:p-x:n-month"x:s-1" /&gt; &lt;x:p-x:n-day"x:s-1" /&gt; &lt;x:p-x:n-hour"x:s-0" /&gt; &lt;x:p-x:n-minute"x:s-0" /&gt; &lt;x:p-x:n-second"x:s-0" /&gt; &lt;x:p-x:n-timezone"x:s-\'Z\'" /&gt; &lt;x:p-x:n-mask"x:s-\'\'" /&gt; &lt;x:va-x:n-char"x:s-substring($mask, 1, 1)" /&gt; &lt;x:c-&gt; &lt;x:wh- test="not($mask)" /&gt; &lt;!--replaced escaping with \' here/--&gt; &lt;x:wh- test="not(contains(\'GyMdhHmsSEDFwWakKz\', $char))"&gt; &lt;x:v-x:s-$char" /&gt; &lt;x:ct-x:n-d:_format-date"&gt; &lt;x:w-x:n-year"x:s-$year" /&gt; &lt;x:w-x:n-month"x:s-$month" /&gt; &lt;x:w-x:n-day"x:s-$day" /&gt; &lt;x:w-x:n-hour"x:s-$hour" /&gt; &lt;x:w-x:n-minute"x:s-$minute" /&gt; &lt;x:w-x:n-second"x:s-$second" /&gt; &lt;x:w-x:n-timezone"x:s-$timezone" /&gt; &lt;x:w-x:n-mask"x:s-substring($mask, 2)" /&gt; &lt;/x:ct-&gt; &lt;/x:wh-&gt; &lt;x:o-&gt; &lt;x:va-x:n-next-different-char"x:s-substring(translate($mask, $char, \'\'), 1, 1)" /&gt; &lt;x:va-x:n-mask-length"&gt; &lt;x:c-&gt; &lt;x:wh- test="$next-different-char"&gt; &lt;x:v-x:s-string-length(substring-before($mask, $next-different-char))" /&gt; &lt;/x:wh-&gt; &lt;x:o-&gt; &lt;x:v-x:s-string-length($mask)" /&gt; &lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:va-&gt; &lt;x:c-&gt; &lt;!--took our the era designator--&gt; &lt;x:wh- test="$char = \'M\'"&gt; &lt;x:c-&gt; &lt;x:wh- test="$mask-length &gt;= 3"&gt; &lt;x:va-x:n-month-node"x:s-document(\'\')/*/d:ms/d:m[number($month)]" /&gt; &lt;x:c-&gt; &lt;x:wh- test="$mask-length &gt;= 4"&gt; &lt;x:v-x:s-$month-node" /&gt; &lt;/x:wh-&gt; &lt;x:o-&gt; &lt;x:v-x:s-$month-node/@a" /&gt; &lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:wh-&gt; &lt;x:wh- test="$mask-length = 2"&gt; &lt;x:v-x:s-format-number($month, \'00\')" /&gt; &lt;/x:wh-&gt; &lt;x:o-&gt; &lt;x:v-x:s-$month" /&gt; &lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:wh-&gt; &lt;x:wh- test="$char = \'E\'"&gt; &lt;x:va-x:n-month-days"x:s-sum(document(\'\')/*/d:ms/d:m[position() &amp;lt; $month]/@l)" /&gt; &lt;x:va-x:n-days"x:s-$month-days + $day + boolean(((not($year mod 4) and $year mod 100) or not($year mod 400)) and $month &amp;gt; 2)" /&gt; &lt;x:va-x:n-y-1"x:s-$year - 1" /&gt; &lt;x:va-x:n-dow"x:s-(($y-1 + floor($y-1 div 4) - floor($y-1 div 100) + floor($y-1 div 400) + $days) mod 7) + 1" /&gt; &lt;x:va-x:n-day-node"x:s-document(\'\')/*/d:ds/d:d[number($dow)]" /&gt; &lt;x:c-&gt; &lt;x:wh- test="$mask-length &gt;= 4"&gt; &lt;x:v-x:s-$day-node" /&gt; &lt;/x:wh-&gt; &lt;x:o-&gt; &lt;x:v-x:s-$day-node/@a" /&gt; &lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:wh-&gt; &lt;x:wh- test="$char = \'a\'"&gt; &lt;x:c-&gt; &lt;x:wh- test="$hour &gt;= 12"&gt;PM&lt;/x:wh-&gt; &lt;x:o-&gt;AM&lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:wh-&gt; &lt;x:wh- test="$char = \'z\'"&gt; &lt;x:c-&gt; &lt;x:wh- test="$timezone = \'Z\'"&gt;UTC&lt;/x:wh-&gt; &lt;x:o-&gt;UTC&lt;x:v-x:s-$timezone" /&gt;&lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:wh-&gt; &lt;x:o-&gt; &lt;x:va-x:n-padding"x:s-\'00\'" /&gt; &lt;!--removed padding--&gt; &lt;x:c-&gt; &lt;x:wh- test="$char = \'y\'"&gt; &lt;x:c-&gt; &lt;x:wh- test="$mask-length &amp;gt; 2"&gt;&lt;x:v-x:s-format-number($year, $padding)" /&gt;&lt;/x:wh-&gt; &lt;x:o-&gt;&lt;x:v-x:s-format-number(substring($year, string-length($year) - 1), $padding)" /&gt;&lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:wh-&gt; &lt;x:wh- test="$char = \'d\'"&gt; &lt;x:v-x:s-format-number($day, $padding)" /&gt; &lt;/x:wh-&gt; &lt;x:wh- test="$char = \'h\'"&gt; &lt;x:va-x:n-h"x:s-$hour mod 12" /&gt; &lt;x:c-&gt; &lt;x:wh- test="$h"&gt;&lt;x:v-x:s-format-number($h, $padding)" /&gt;&lt;/x:wh-&gt; &lt;x:o-&gt;&lt;x:v-x:s-format-number(12, $padding)" /&gt;&lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:wh-&gt; &lt;x:wh- test="$char = \'H\'"&gt; &lt;x:v-x:s-format-number($hour, $padding)" /&gt; &lt;/x:wh-&gt; &lt;x:wh- test="$char = \'k\'"&gt; &lt;x:c-&gt; &lt;x:wh- test="$hour"&gt;&lt;x:v-x:s-format-number($hour, $padding)" /&gt;&lt;/x:wh-&gt; &lt;x:o-&gt;&lt;x:v-x:s-format-number(24, $padding)" /&gt;&lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:wh-&gt; &lt;x:wh- test="$char = \'K\'"&gt; &lt;x:v-x:s-format-number($hour mod 12, $padding)" /&gt; &lt;/x:wh-&gt; &lt;x:wh- test="$char = \'m\'"&gt; &lt;x:v-x:s-format-number($minute, $padding)" /&gt; &lt;/x:wh-&gt; &lt;x:wh- test="$char = \'s\'"&gt; &lt;x:v-x:s-format-number($second, $padding)" /&gt; &lt;/x:wh-&gt; &lt;x:wh- test="$char = \'S\'"&gt; &lt;x:v-x:s-format-number(substring-after($second, \'.\'), $padding)" /&gt; &lt;/x:wh-&gt; &lt;x:wh- test="$char = \'F\'"&gt; &lt;x:v-x:s-floor($day div 7) + 1" /&gt; &lt;/x:wh-&gt; &lt;x:o-&gt; &lt;x:va-x:n-month-days"x:s-sum(document(\'\')/*/d:ms/d:m[position() &amp;lt; $month]/@l)" /&gt; &lt;x:va-x:n-days"x:s-$month-days + $day + boolean(((not($year mod 4) and $year mod 100) or not($year mod 400)) and $month &amp;gt; 2)" /&gt; &lt;x:v-x:s-format-number($days, $padding)" /&gt; &lt;!--removed week in year--&gt; &lt;!--removed week in month--&gt; &lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:o-&gt; &lt;/x:c-&gt; &lt;x:ct-x:n-d:_format-date"&gt; &lt;x:w-x:n-year"x:s-$year" /&gt; &lt;x:w-x:n-month"x:s-$month" /&gt; &lt;x:w-x:n-day"x:s-$day" /&gt; &lt;x:w-x:n-hour"x:s-$hour" /&gt; &lt;x:w-x:n-minute"x:s-$minute" /&gt; &lt;x:w-x:n-second"x:s-$second" /&gt; &lt;x:w-x:n-timezone"x:s-$timezone" /&gt; &lt;x:w-x:n-mask"x:s-substring($mask, $mask-length + 1)" /&gt; &lt;/x:ct-&gt; &lt;/x:o-&gt; &lt;/x:c-&gt;&lt;/x:t-&gt; &lt;!--http://www.w3schools.com/xsl/func_formatnumber.asp--&gt;&lt;xsl:decimal-formatx:n-ebaNumber" decimal-separator="." grouping-separator="," /&gt;&lt;x:t-x:n-n:format"&gt; &lt;x:p-x:n-number"x:s-0" /&gt; &lt;x:p-x:n-mask"x:s-\'#.00\'" /&gt; &lt;x:p-x:n-group"x:s-\',\'" /&gt; &lt;x:p-x:n-decimal"x:s-\'.\'" /&gt; &lt;x:va-x:n-formattedNumber"&gt; &lt;x:v-x:s-format-number($number, $mask, \'ebaNumber\')" /&gt; &lt;/x:va-&gt; &lt;xsl:if test="not(string($formattedNumber) = \'NaN\')"&gt; &lt;x:v-x:s-$formattedNumber" /&gt; &lt;/xsl:if&gt;&lt;/x:t-&gt;&lt;xsl:output method="xml" omit-xml-declaration="yes"/&gt;&lt;x:p-x:n-start" /&gt;&lt;x:p-x:n-end" /&gt;&lt;x:p-x:n-activeColumn"x:s-\'0\'" /&gt;&lt;x:p-x:n-activeRow"x:s-\'0\'" /&gt;&lt;x:p-x:n-sortColumn"x:s-\'0\'" /&gt;&lt;x:p-x:n-sortDirection"x:s-\'Asc\'" /&gt;&lt;x:p-x:n-dataTableId"x:s-\'_default\'" /&gt;&lt;xsl:keyx:n-data-source" match="//ntb:datasources/ntb:datasource" use="@id" /&gt;&lt;x:t- match = "/"&gt; &lt;div&gt; <xsl:if test="$showHeaders"> &lt;table cellpadding="0" cellspacing="0" border="0" class="ntb-grid-headerblock" &gt; &lt;tr class="ntbheaderrow<x:v-x:s-$uniqueId" />"&gt; <xsl:if test="$showIndicators"> &lt;td ebatype="columnheader" xi="<x:v-x:s-position()-1"/>" class="ntbcolumn"&gt; &lt;a href="#" class="ntbrowindicator" onclick="return false;" style=";float:left;"&gt; &lt;x:v-x:s-@xi"/&gt; &lt;/a&gt; &lt;/td&gt; </xsl:if> <xsl:for-eachx:s-*/*"> <xsl:if test="@Visible = \'1\' and (position() &gt; $firstColumn and position() &lt;= $lastColumn)"> &lt;td id="columnheader_<x:v-x:s-position()-1"/>_<x:v-x:s-$uniqueId" />" ebatype="columnheader" xi="<x:v-x:s-position()-1"/>" col="<x:v-x:s-position()-1"/>" onmouseover="$(\'grid<x:v-x:s-$uniqueId" />\').jsObject.handleHeaderMouseOver(this);" onmouseout="$(\'grid<x:v-x:s-$uniqueId" />\').jsObject.handleHeaderMouseOut(this);"&gt; &lt;x:va-x:n-sortString<x:v-x:s-position()-1"/>"&gt; &lt;x:c-&gt; &lt;x:wh- test="$sortColumn=<x:v-x:s-position()-1"/> and $sortDirection=\'Asc\'"&gt;ascending&lt;/x:wh-&gt; &lt;x:wh- test="$sortColumn=<x:v-x:s-position()-1"/> and $sortDirection=\'Desc\'"&gt;descending&lt;/x:wh-&gt; &lt;x:o-&gt;&lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:va-&gt; &lt;x:a-x:n-class"&gt;ntbcolumnindicatorborder&lt;x:v-x:s-$sortString<x:v-x:s-position()-1"/>" /&gt;&lt;/x:a-&gt; &lt;div class="ntbcolumnindicator"&gt; <x:c-> <x:wh- test="@Label and not(@Label = \'\') and not(@Label = \' \')"><x:v-x:s-@Label" /></x:wh-> <x:wh- test="ntb:label and not(ntb:label = \'\') and not(ntb:label = \' \')"><x:v-x:s-ntb:label" /></x:wh-> <x:o->ATOKENTOREPLACE</x:o-> </x:c-> &lt;/div&gt; &lt;/td&gt; </xsl:if> </xsl:for-each> &lt;/tr&gt; &lt;colgroup&gt; <xsl:for-eachx:s-*/*"> <xsl:if test="@Visible = \'1\' and (position() &gt; $firstColumn and position() &lt;= $lastColumn)"> &lt;col class="ntbcolumn<x:v-x:s-$uniqueId" />_<x:v-x:s-position()" />"&gt;&lt;/col&gt; </xsl:if> </xsl:for-each> &lt;/colgroup&gt; &lt;/table&gt; </xsl:if> &lt;table cellpadding="0" cellspacing="0" border="0" class="ntb-grid-datablock"&gt; &lt;x:at-x:s-key(\'data-source\', $dataTableId)/ntb:data/ntb:e[@xi&amp;gt;=$start and @xi&amp;lt; $end]" &gt; &lt;xsl:sortx:s-@xi" data-type="number" /&gt; &lt;/x:at-&gt; &lt;colgroup&gt; <xsl:for-eachx:s-*/*"> <xsl:if test="@Visible = \'1\' and (position() &gt; $firstColumn and position() &lt;= $lastColumn)"> &lt;col class="ntbcolumn<x:v-x:s-$uniqueId"/>_<x:v-x:s-position()" />"&gt;&lt;/col&gt; </xsl:if> </xsl:for-each> &lt;/colgroup&gt; &lt;/table&gt; &lt;/div&gt;&lt;/x:t-&gt;&lt;x:t- match="ntb:e"&gt; &lt;x:va-x:n-xi"x:s-@xi" /&gt; &lt;x:va-x:n-rowClass"&gt; &lt;xsl:if test="@xi mod 2 = 0"&gt;ntbalternaterow&lt;/xsl:if&gt; &lt;xsl:if test="<x:v-x:s-@rowselectattr=1"/>"&gt;ebarowselected&lt;/xsl:if&gt; &lt;/x:va-&gt; &lt;tr class="ntbrow {$rowClass} ntbrow<x:v-x:s-$uniqueId"/>" xi="{$xi}"&gt; &lt;x:a-x:n-id"&gt;row_&lt;x:v-x:s-$xi" /&gt;<x:v-x:s-$frozenColumnId"/>_<x:v-x:s-$uniqueId" />&lt;/x:a-&gt; <xsl:for-eachx:s-*/*"> <xsl:if test="@Visible = \'1\' and (position() &gt; $firstColumn and position() &lt;= $lastColumn)"> &lt;x:va-x:n-sortString<x:v-x:s-position()-1"/>"&gt; &lt;x:c-&gt; &lt;x:wh- test="$sortColumn=<x:v-x:s-position()-1"/> and $sortDirection=\'Asc\'"&gt;ascending&lt;/x:wh-&gt; &lt;x:wh- test="$sortColumn=<x:v-x:s-position()-1"/> and $sortDirection=\'Desc\'"&gt;descending&lt;/x:wh-&gt; &lt;x:o-&gt;&lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:va-&gt; &lt;x:va-x:n-value<x:v-x:s-position()"/>" &gt; <x:c-> <x:wh- test="not(@xdatafld = \'\')">&lt;x:v-x:s-<x:v-x:s-@xdatafld" />" /&gt;</x:wh-> <!-- @Value will actuall have some escaped XSLT in it like any other bound property --> <x:o-><x:v-x:s-@Value" /></x:o-> </x:c-> &lt;/x:va-&gt; &lt;td ebatype="cell" xi="{$xi}" col="<x:v-x:s-position()-1"/>" value="{$value<x:v-x:s-position()"/>}" &gt; &lt;x:a-x:n-style"&gt;<x:v-x:s-@CssStyle"/>;&lt;/x:a-&gt; &lt;x:a-x:n-id"&gt;cell_&lt;x:v-x:s-$xi" /&gt;_<x:v-x:s-position()-1" />_<x:v-x:s-$uniqueId" />&lt;/x:a-&gt; &lt;x:a-x:n-class"&gt;ntbcellborder<x:v-x:s-$uniqueId"/> ntbcolumndata<x:v-x:s-$uniqueId"/>_<x:v-x:s-position()" /> ntbcolumn&lt;x:v-x:s-$sortString<x:v-x:s-position()-1"/>" /&gt;<xsl:text> </xsl:text><x:v-x:s-@ClassName"/>&lt;/x:a-&gt; &lt;div style="overflow:hidden;white-space:nowrap;"&gt; &lt;x:a-x:n-class"&gt;ntbcell&lt;/x:a-&gt; &lt;x:ct-x:n-<x:c-><x:wh- test="@type and not(@type=\'\')"><x:v-x:s-@type" /></x:wh-><x:o->TEXT</x:o-></x:c->"&gt;&lt;x:w-x:n-value"x:s-$value<x:v-x:s-position()"/>" /&gt;&lt;x:w-x:n-mask" &gt;<x:v-x:s-@Mask"/>&lt;/x:w-&gt;&lt;x:w-x:n-datasource" &gt;<x:v-x:s-@DatasourceId"/>&lt;/x:w-&gt;&lt;x:w-x:n-valuefield" &gt;<x:v-x:s-@ValueField"/>&lt;/x:w-&gt;&lt;x:w-x:n-displayfields" &gt;<x:v-x:s-@DisplayFields"/>&lt;/x:w-&gt;&lt;x:w-x:n-checkedvalue" &gt;<x:v-x:s-@CheckedValue"/>&lt;/x:w-&gt;&lt;x:w-x:n-imageurl" &gt;<x:v-x:s-@ImageUrl"/>&lt;/x:w-&gt; &lt;/x:ct-&gt; &lt;/div&gt; &lt;/td&gt; </xsl:if> </xsl:for-each> &lt;/tr&gt;&lt;/x:t-&gt;&lt;x:t-x:n-replaceblank"&gt; &lt;x:p-x:n-value" /&gt; &lt;x:c-&gt; &lt;x:wh- test="not($value) or $value = \'\' or $value = \' \'"&gt;ATOKENTOREPLACE&lt;/x:wh-&gt; &lt;x:o-&gt;&lt;x:v-x:s-$value" /&gt;&lt;/x:o-&gt; &lt;/x:c-&gt;&lt;/x:t-&gt;&lt;x:t-x:n-replace"&gt; &lt;x:p-x:n-text"/&gt; &lt;x:p-x:n-search"/&gt; &lt;x:p-x:n-replacement"/&gt; &lt;x:c-&gt; &lt;x:wh- test="contains($text, $search)"&gt; &lt;x:v-x:s-substring-before($text, $search)"/&gt; &lt;x:v-x:s-$replacement"/&gt; &lt;x:ct-x:n-replace"&gt; &lt;x:w-x:n-text"x:s-substring-after($text,$search)"/&gt; &lt;x:w-x:n-search"x:s-$search"/&gt; &lt;x:w-x:n-replacement"x:s-$replacement"/&gt; &lt;/x:ct-&gt; &lt;/x:wh-&gt; &lt;x:o-&gt; &lt;x:v-x:s-$text"/&gt; &lt;/x:o-&gt; &lt;/x:c-&gt;&lt;/x:t-&gt;&lt;x:t-x:n-print-displayfields"&gt; &lt;x:p-x:n-field" /&gt; &lt;x:c-&gt; &lt;x:wh- test="contains($field,\'|\')" &gt; &lt;!-- Here we hardcode a spacer \', \' - this should probably be moved elsewhere. --&gt; &lt;x:v-x:s-concat(@*[name(.)=substring-before($field,\'|\')],\', \')" /&gt; &lt;x:ct-x:n-print-displayfields"&gt; &lt;x:w-x:n-field"x:s-substring-after($field,\'|\')" /&gt; &lt;/x:ct-&gt; &lt;/x:wh-&gt; &lt;x:o-&gt; &lt;x:v-x:s-@*[name(.)=$field]" /&gt; &lt;/x:o-&gt; &lt;/x:c-&gt;&lt;/x:t-&gt;&lt;x:t-x:n-replace-break"&gt; &lt;x:p-x:n-text"/&gt; &lt;x:ct-x:n-replace"&gt; &lt;x:w-x:n-text"x:s-$text"/&gt; &lt;x:w-x:n-search"x:s-\'&amp;amp;#xa;\'"/&gt; &lt;x:w-x:n-replacement"x:s-\'&amp;lt;br/&amp;gt;\'"/&gt; &lt;/x:ct-&gt;&lt;/x:t-&gt;&lt;x:t-x:n-TEXT"&gt; &lt;x:p-x:n-value" /&gt; &lt;x:ct-x:n-replaceblank"&gt; &lt;x:w-x:n-value"x:s-$value" /&gt; &lt;/x:ct-&gt;&lt;/x:t-&gt;&lt;x:t-x:n-PASSWORD"&gt; &lt;x:p-x:n-value" /&gt; *********&lt;/x:t-&gt;&lt;x:t-x:n-TEXTAREA"&gt; &lt;x:p-x:n-value" /&gt; &lt;x:ct-x:n-replace-break"&gt; &lt;x:w-x:n-text"&gt; &lt;x:ct-x:n-replaceblank"&gt; &lt;x:w-x:n-value"x:s-$value" /&gt; &lt;/x:ct-&gt; &lt;/x:w-&gt; &lt;/x:ct-&gt;&lt;/x:t-&gt;&lt;x:t-x:n-NUMBER"&gt; &lt;x:p-x:n-value" /&gt; &lt;x:p-x:n-mask" /&gt; &lt;x:va-x:n-number-mask"&gt; &lt;x:c-&gt; &lt;x:wh- test="$mask"&gt;&lt;x:v-x:s-$mask" /&gt;&lt;/x:wh-&gt; &lt;x:o-&gt;#,###.00&lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:va-&gt; &lt;x:va-x:n-number"&gt; &lt;x:ct-x:n-n:format"&gt; &lt;x:w-x:n-number"x:s-$value" /&gt; &lt;x:w-x:n-mask"x:s-$number-mask" /&gt; &lt;/x:ct-&gt; &lt;/x:va-&gt; &lt;x:ct-x:n-replaceblank"&gt; &lt;x:w-x:n-value"x:s-$number" /&gt; &lt;/x:ct-&gt;&lt;/x:t-&gt;&lt;x:t-x:n-IMAGE"&gt; &lt;x:p-x:n-value" /&gt; &lt;x:p-x:n-imageurl" /&gt; &lt;x:va-x:n-url"&gt; &lt;x:c-&gt; &lt;x:wh- test="$imageurl"&gt;&lt;x:v-x:s-$imageurl" /&gt;&lt;/x:wh-&gt; &lt;x:o-&gt;&lt;x:v-x:s-$value" /&gt;&lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:va-&gt; <!-- image editor --> &lt;img border="0" src="{$url}" /&gt;&lt;/x:t-&gt;&lt;x:t-x:n-DATE"&gt; &lt;x:p-x:n-value" /&gt; &lt;x:p-x:n-mask" /&gt; &lt;x:va-x:n-date-mask"&gt; &lt;x:c-&gt; &lt;x:wh- test="$mask"&gt;&lt;x:v-x:s-$mask" /&gt;&lt;/x:wh-&gt; &lt;x:o-&gt;MMM d, yy&lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:va-&gt; &lt;x:va-x:n-date"&gt; &lt;x:ct-x:n-d:format-date"&gt; &lt;x:w-x:n-date-time"x:s-$value" /&gt; &lt;x:w-x:n-mask"x:s-$date-mask" /&gt; &lt;/x:ct-&gt; &lt;/x:va-&gt; &lt;x:ct-x:n-replaceblank"&gt; &lt;x:w-x:n-value"x:s-$date" /&gt; &lt;/x:ct-&gt;&lt;/x:t-&gt;&lt;x:t-x:n-LISTBOX"&gt; &lt;x:p-x:n-value" /&gt; &lt;x:p-x:n-datasource" /&gt; &lt;x:p-x:n-valuefield" /&gt; &lt;x:p-x:n-displayfields" /&gt; &lt;x:c-&gt; &lt;x:wh- test="$datasource"&gt; &lt;xsl:for-eachx:s-key(\'data-source\',$datasource)//*"&gt; &lt;xsl:if test="@*[name(.)=$valuefield and .=$value]"&gt; &lt;x:ct-x:n-replaceblank"&gt; &lt;x:w-x:n-value"&gt; &lt;x:ct-x:n-print-displayfields"&gt; &lt;x:w-x:n-field"x:s-$displayfields" /&gt; &lt;/x:ct-&gt; &lt;/x:w-&gt; &lt;/x:ct-&gt; &lt;/xsl:if&gt; &lt;/xsl:for-each&gt; &lt;/x:wh-&gt; &lt;x:o-&gt; &lt;x:ct-x:n-replaceblank"&gt; &lt;x:w-x:n-value"x:s-$value" /&gt; &lt;/x:ct-&gt; &lt;/x:o-&gt; &lt;/x:c-&gt;&lt;/x:t-&gt;&lt;x:t-x:n-LOOKUP"&gt; &lt;x:p-x:n-value" /&gt; &lt;x:p-x:n-datasource" /&gt; &lt;x:p-x:n-valuefield" /&gt; &lt;x:p-x:n-displayfields" /&gt; &lt;x:c-&gt; &lt;x:wh- test="$valuefield = $displayfields"&gt; &lt;x:ct-x:n-TEXT"&gt; &lt;x:w-x:n-value"x:s-$value" /&gt; &lt;/x:ct-&gt; &lt;/x:wh-&gt; &lt;x:o-&gt; &lt;x:ct-x:n-replaceblank"&gt; &lt;x:w-x:n-value"&gt; &lt;x:c-&gt; &lt;x:wh- test="$datasource"&gt; &lt;x:va-x:n-preset-value" &gt; &lt;xsl:for-eachx:s-key(\'data-source\',$datasource)//*"&gt; &lt;xsl:if test="@*[name(.)=$valuefield and .=$value]"&gt; &lt;x:ct-x:n-print-displayfields"&gt; &lt;x:w-x:n-field"x:s-$displayfields" /&gt; &lt;/x:ct-&gt; &lt;/xsl:if&gt; &lt;/xsl:for-each&gt; &lt;/x:va-&gt; &lt;x:c-&gt; &lt;x:wh- test="$preset-value=\'\'"&gt; &lt;x:v-x:s-$value"/&gt; &lt;/x:wh-&gt; &lt;x:o-&gt; &lt;x:v-x:s-$preset-value"/&gt; &lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:wh-&gt; &lt;x:o-&gt; &lt;x:v-x:s-$value"/&gt; &lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:w-&gt; &lt;/x:ct-&gt; &lt;/x:o-&gt; &lt;/x:c-&gt;&lt;/x:t-&gt;&lt;x:t-x:n-CHECKBOX"&gt; &lt;x:p-x:n-value" /&gt; &lt;x:p-x:n-datasource" /&gt; &lt;x:p-x:n-valuefield" /&gt; &lt;x:p-x:n-displayfields" /&gt; &lt;x:p-x:n-checkedvalue" /&gt; &lt;xsl:for-eachx:s-key(\'data-source\',$datasource)//*"&gt; &lt;xsl:if test="@*[name(.)=$valuefield and .=$value]"&gt; &lt;x:va-x:n-checkString"&gt; &lt;x:c-&gt; &lt;x:wh- test="$value=$checkedvalue"&gt;checked&lt;/x:wh-&gt; &lt;x:o-&gt;unchecked&lt;/x:o-&gt; &lt;/x:c-&gt; &lt;/x:va-&gt; &lt;div style="overflow:hidden;"&gt; &lt;div style="float:left;" class="ntbcheckbox ntbcheckbox{$checkString} checkbox{$checkString}" checked="{$value}" width="10" &gt;ATOKENTOREPLACE&lt;/div&gt;&lt;span&gt;&lt;x:v-x:s-@*[name(.)=$displayfields]" /&gt;&lt;/span&gt; &lt;/div&gt; &lt;/xsl:if&gt; &lt;/xsl:for-each&gt;&lt;/x:t-&gt;&lt;x:t-x:n-LINK"&gt; &lt;x:p-x:n-value" /&gt; &lt;span class="ntbhyperlinkeditor"&gt; &lt;x:ct-x:n-replaceblank"&gt; &lt;x:w-x:n-value"x:s-$value" /&gt; &lt;/x:ct-&gt; &lt;/span&gt;&lt;/x:t-&gt;<!--This can be used as an insertion point for column templates--> &lt;!--COLUMN-TYPE-TEMPLATES--&gt;&lt;/xsl:stylesheet&gt;</x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.grid");
nitobi.grid.rowGeneratorXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_rowGeneratorXslProc));

var temp_ntb_sortXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" omit-xml-declaration="yes" /> <x:p-x:n-column"x:s-@xi"> </x:p-> <x:p-x:n-dir"x:s-\'ascending\'"> </x:p-> <x:p-x:n-type"x:s-\'text\'"> </x:p-> <x:t- match="*|@*"> <xsl:copy> <x:at-x:s-@*|node()" /> </xsl:copy> </x:t-> <x:t- match="ntb:data"> <xsl:copy> <x:at-x:s-@*"/> <xsl:for-eachx:s-ntb:e"> <xsl:sortx:s-@*[name() =$column]" order="{$dir}" data-type="{$type}"/> <xsl:copy> <x:a-x:n-xi"> <x:v-x:s-position()-1" /> </x:a-> <x:at-x:s-@*" /> </xsl:copy> </xsl:for-each> </xsl:copy> </x:t-><x:t- match="@xi" /></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.data");
nitobi.data.sortXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_sortXslProc));

var temp_ntb_fillColumnXslProc='<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" omit-xml-declaration="no" /> <x:p-x:n-startRowIndex"x:s-0" ></x:p-> <x:p-x:n-endRowIndex"x:s-10000" ></x:p-> <x:p-x:n-value"x:s-test"></x:p-> <x:p-x:n-column"x:s-a"></x:p-> <x:t- match="@* | node()" > <xsl:copy> <x:at-x:s-@*|node()" /> </xsl:copy> </x:t-> <x:t- match="/ntb:grid/ntb:datasources/ntb:datasource/ntb:data/ntb:e"> <x:c-> <x:wh- test="(number(@xi) &gt;= $startRowIndex) and (number(@xi) &lt;= $endRowIndex)"> <xsl:copy> <xsl:copy-ofx:s-@*" /> <x:a-x:n-{$column}"><x:v-x:s-$value" /></x:a-> </xsl:copy> </x:wh-> <x:o-> <xsl:copy> <x:at-x:s-@*|node()" /> </xsl:copy> </x:o-> </x:c-> </x:t-></xsl:stylesheet> ';
nitobi.lang.defineNs("nitobi.data");
nitobi.data.fillColumnXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_fillColumnXslProc));

var temp_ntb_updategramTranslatorXslProc='<?xml version="1.0"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" encoding="utf-8" omit-xml-declaration="yes"/> <x:p-x:n-datasource-id"x:s-\'_default\'"></x:p-> <x:p-x:n-xkField" ></x:p-> <x:t- match="/"> <root> <x:at-x:s-//ntb:datasource[@id=$datasource-id]/ntb:data/ntb:e" /> </root> </x:t-> <x:t- match="ntb:e"> <x:c-> <x:wh- test="@xac=\'d\'"> <delete xi="{@xi}" xk="{@*[name() = $xkField]}"></delete> </x:wh-> <x:wh- test="@xac=\'i\'"> <insert><xsl:copy-ofx:s-@*[not(name() = $xkField) and not(name() = \'xac\')]" /><x:a-x:n-xk"><x:v-x:s-@*[name() = $xkField]" /></x:a-></insert> </x:wh-> <x:wh- test="@xac=\'u\'"> <update><xsl:copy-ofx:s-@*[not(name() = $xkField) and not(name() = \'xac\')]" /><x:a-x:n-xk"><x:v-x:s-@*[name() = $xkField]" /></x:a-></update> </x:wh-> </x:c-> </x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.data");
nitobi.data.updategramTranslatorXslProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_updategramTranslatorXslProc));


