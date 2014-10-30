
com=window.com||{};com.marklogic=window.com.marklogic||{};com.marklogic.widgets=window.com.marklogic.widgets||{};com.marklogic.widgets.kratu=function(container){this.container=container;this.errorPublisher=new com.marklogic.events.Publisher();this.results=null;this.facts=null;this.kratu=new Kratu();document.getElementById(container).innerHTML="<div id='"+container+"-inner' class='mljswidget'></div>"
this.kratu.setRenderElement(document.getElementById(this.container+"-inner"));this._config={render:"content"};this._refresh();};com.marklogic.widgets.kratu.getConfigurationDefinition=function(){var self=this;return{render:{type:"enum",default:"content",title:"Render",description:"Whether to render the document content or the search result summary.",options:[{value:"content",title:"Content",description:"Content of the result document."},{value:"summary",title:"Summary",description:"Summary of the search result metadata."}]}};};com.marklogic.widgets.kratu.prototype.setConfiguration=function(config){for(var prop in config){this._config[prop]=config[prop];}
this._refresh();};com.marklogic.widgets.kratu.prototype.render=function(render){this._config.render=render;};com.marklogic.widgets.kratu.prototype.updateResults=function(results){mljs.defaultconnection.logger.debug("kratu.updateResults called");if(typeof(results)!="boolean"&&undefined!=results&&null!=results){mljs.defaultconnection.logger.debug("kratu.updateResults: Got real results");this.results=results;if("content"==this._config.render){mljs.defaultconnection.logger.debug("kratu.updateResults: Rendering search result contents");var content=new Array();for(var i=0,r;i<this.results.results.length;i++){r=this.results.results[i];mljs.defaultconnection.logger.debug("kratu.updateResults: Parsing result "+i+"="+r.content);if(typeof(r.content)=="string"){try{var res=JSON.parse(this.results.results[i].content);content.push(res);}catch(ex){var csvProvider=new KratuCSVProvider();var self=this;csvProvider.parse(this.results.results[i].content,function(csvdata){mljs.defaultconnection.logger.debug("kratu.updateResults: parsed CSV data: "+csvdata);res=csvdata;content.push(csvdata);self.kratu.setEntities(content);self._refresh();});}}else if(typeof(r.content)=="object"){if(undefined!=r.content.nodeType){var json=xmlToJson(r.content);content.push(json);}else{content.push(r.content);}}}
this.kratu.setEntities(content);}else{mljs.defaultconnection.logger.debug("kratu.updateResults: Rendering search result statistics");this.kratu.setEntities(this.results.results);}
this._refresh();}};com.marklogic.widgets.cooccurence.prototype.updateData=function(datacontext){var kratuData=new Array();var sn=datacontext.getSeriesNames();for(var s=0,maxs=sn.length,seriesName;s<maxs;s++){seriesName=sn[s];var data=datacontext.getData(seriesName);for(var r=0,maxr=data.length,row,kratuRow;r<maxr;r++){row=data[r];kratuRow={};kratuRow.series=seriesName;kratuRow.identity=row.identity;for(var f in row.fields){kratuRow[f]=row.fields[f];}
kratuData.push(kratuRow);}}
this.kratu.setEntities(kratuData);this._refresh();};com.marklogic.widgets.kratu.prototype.updateFacts=function(facts){this.facts=facts;var rows=new Array();for(var r=0,max=facts.results.bindings.length;r<max;r++){var result=facts.results.bindings[r];var res={};for(var b=0,maxb=facts.head.vars.length;b<maxb;b++){var varname=facts.head.vars[b];res[varname]=result[varname].value;}
rows.push(res);}
this.kratu.setEntities(rows);this._refresh();};com.marklogic.widgets.kratu.prototype.addErrorListener=function(fl){this.errorPublisher.subscribe(fl);};com.marklogic.widgets.kratu.prototype.removeErrorListener=function(fl){this.errorPublisher.unsubscribe(fl);};com.marklogic.widgets.kratu.prototype._refresh=function(){if((null==this.results||undefined==this.results||"boolean"==typeof this.results)&&(null==this.facts||undefined==this.facts||"boolean"==typeof this.facts)){return;}
this.kratu.renderReport();};