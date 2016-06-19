function createCell(text,type){
	var cell = document.createElement(type);    
	var cellText = document.createTextNode(text); 
	cell.appendChild(cellText);
	return cell;
}

function tableCreate(data) {
		//search if exists than destroy
		var tbl=document.getElementById("streamTbl");
		if(tbl!=null){
  		tbl.parentNode.removeChild(tbl);
		}

		// create elements <table> and a <tbody>
		var tbl     = document.createElement("table");
		tbl.id="streamTbl";

		var row = document.createElement("tr");
			var cell=createCell("name","th");
			row.appendChild(cell);
			var cell=createCell("url","th");
			row.appendChild(cell);
			var cell=createCell("status","th");
			row.appendChild(cell);
			var cell=createCell("viewers","th");
			row.appendChild(cell);
			var cell=createCell("game","th");
			row.appendChild(cell);
			var cell=createCell("logo","th");
			row.appendChild(cell);
			var cell=createCell("provider","th");
			row.appendChild(cell);
		tbl.appendChild(row);
		
		for (var j = 0; j <data.length; j++) {
			var row = document.createElement("tr");

			var cell=createCell(data[j].name,"td");
			row.appendChild(cell);
			var cell=createCell(data[j].url,"td");
			row.appendChild(cell);
			var cell=createCell(data[j].status,"td");
			row.appendChild(cell);
			var cell=createCell(data[j].viewers,"td");
			row.appendChild(cell);
			var cell=createCell(data[j].game,"td");
			row.appendChild(cell);
			var cell=createCell(data[j].logo,"td");
			row.appendChild(cell);
			var cell=createCell(data[j].provider,"td");
			row.appendChild(cell);

			tbl.appendChild(row);
		}
		tbl.setAttribute("border", "2");
		return tbl;
}

function ordne(data){
	var collect=new Array();
	var streams =data.streams;
	var count=streams.length;
	for(i=0;i<count;i++){
		collect[i]=new Object();
		collect[i]['viewers']=streams[i].viewers;
		collect[i]['name']=streams[i].channel.name;
		collect[i]['game']=streams[i].channel.game;
		collect[i]['status']=streams[i].channel.status;
		collect[i]['logo']=streams[i].channel.logo;
		collect[i]['url']=streams[i].channel.url;
		collect[i]['provider']="twitch";
	}

	return collect;
}

function regexFilter(data){
	var patt =new Array(
		new RegExp("[\s\S]*[sS]treet [fF]ighter[\s\S]*")
		,new RegExp("[\s\S]*Guilty Gear[\s\S]*","i")
		,new RegExp("[\s\S]*Killer Instinct[\s\S]*","i")
	);

	var obj=new Array();
	var countData=data.length;
	var countPatt=patt.length;
	var j=0;
	for(var i=0;i<countData;i++){
		for (var k=0;k<countPatt;k++){
			if(patt[k].test(data[i].game)){
				obj[j]=data[i];	
				j++;
				break;
			}
		}
	}
	return obj;
}

function username(){
	var user=new Array(
		"insertgame"
		,"fight_club_nrw"
		,"brawlonestream"
		,"sumpfauge"
		,"virtualdojovienna"
		,"m1kr0s"
		,"thomsonrult"
		,"schlossfgc"
		,"draculasan89"
		,"gghalibel"
		,"chargiii" 
		,"dicktraitor" 
		,"mdz_jimmy" 
		,"atthegates213"
		,"neekogaming"
		,"nymatikz"
		,"leveluplive"
		,"heisenbergshowgta"
		,"levencius"
	);
	return user;
}

function createSrc(user){
	var url='https://api.twitch.tv/kraken/streams?channel=';
	var callback="jsonp";
	var list='';
	for(i=0;i<user.length-1;i++){
		list+=user[i]+",";
	}
	list+=user[user.length-1];
	var src=url+list+"&callback="+callback;
	return src
}

function divCreateOld(elem,data){
	if(elem==null){
		return;
	}
	console.log(data);
	var containerId="streamContainer";

	var streamEntry="streamEntry";
	var streamEntryBody="streamEntryBody";
	var row="streamEntryRow";
	var key="streamEntryRowKey";
	var value="streamEntryRowValue";

	var containerDiv=document.getElementById(containerId);
	if(containerDiv!=null){
		containerDiv.parentNode.removeChild(containerDiv);
	}
	var containerDiv = document.createElement("div");
	containerDiv.id=containerId;

	for (var i = 0; i <data.length; i++) {
		var entryDiv = document.createElement("div");
		entryDiv.className=entryClass;
		var span=document.createElement("span");
			span.innerHTML=data[i].viewers;
			entryDiv.appendChild(span);
		var span=document.createElement("span");
			span.innerHTML=data[i].name;
			entryDiv.appendChild(span);
		var span=document.createElement("span");
			span.innerHTML=data[i].game;
			entryDiv.appendChild(span);
		var span=document.createElement("span");
			span.innerHTML=data[i].status;
			entryDiv.appendChild(span);
		var span=document.createElement("span");
			span.innerHTML=data[i].logo;
			entryDiv.appendChild(span);
		var span=document.createElement("span");
			span.innerHTML=data[i].url;
			entryDiv.appendChild(span);
		var span=document.createElement("span");
			span.innerHTML=data[i].provider;
			entryDiv.appendChild(span);
		containerDiv.appendChild(entryDiv);
	}
	elem.appendChild(containerDiv);
}

function divCreate(elem,data){
	if(elem==null){
		return;
	}
	console.log(data);

	var id_container="streamContainer";
	var class_streamEntry="streamEntry";
	var class_streamEntryImage="streamEntryImage";
	var class_streamEntryBody="streamEntryBody";
	var class_streamEntryRow="streamEntryRow";
	var class_streamEntryRowKey="streamEntryRowKey";
	var class_streamEntryRowValue="streamEntryRowValue";

	var class_streamEntryRow="row";
	var class_streamEntryRowKey="key";
	var class_streamEntryRowValue="value";

	var containerDiv=document.getElementById(id_container);

	if(containerDiv!=null){
		containerDiv.parentNode.removeChild(containerDiv);
	}
	containerDiv = document.createElement("div");
	containerDiv.id=id_container;

	for (var i = 0; i <data.length; i++) {
		var backGroundImage="url('"+data[i].logo+"')";
		console.log(backGroundImage);
		var a_entry=document.createElement("a");
			a_entry.className=class_streamEntry;
			a_entry.href=data[i].url;
			//a_entry.style.backgroundImage = backGroundImage;
		var span_entryBody=document.createElement("span");
			span_entryBody.className=class_streamEntryBody;
		var span_entryImage=document.createElement("span");
			span_entryImage.className=class_streamEntryImage;	
			span_entryImage.style.backgroundImage = backGroundImage;

		var span_entryBodyRow=document.createElement("span");
			span_entryBodyRow.className=class_streamEntryRow;
		var span_entryBodyRowKey=document.createElement("span");
			span_entryBodyRowKey.className=class_streamEntryRowKey;
			span_entryBodyRowKey.innerHTML="Viewers:";
		var span_entryBodyRowValue=document.createElement("span");
			span_entryBodyRowValue.className=class_streamEntryRowValue;
			span_entryBodyRowValue.innerHTML=data[i].viewers;
		span_entryBodyRow.appendChild(span_entryBodyRowKey);
		span_entryBodyRow.appendChild(span_entryBodyRowValue);
		span_entryBody.appendChild(span_entryBodyRow);

		span_entryBodyRow=document.createElement("span");
			span_entryBodyRow.className=class_streamEntryRow;
		span_entryBodyRowKey=document.createElement("span");
			span_entryBodyRowKey.className=class_streamEntryRowKey;
			span_entryBodyRowKey.innerHTML="Game:";
		span_entryBodyRowValue=document.createElement("span");
			span_entryBodyRowValue.className=class_streamEntryRowValue;
			span_entryBodyRowValue.innerHTML=data[i].game;
		span_entryBodyRow.appendChild(span_entryBodyRowKey);
		span_entryBodyRow.appendChild(span_entryBodyRowValue);
		span_entryBody.appendChild(span_entryBodyRow);

		span_entryBodyRowKey=document.createElement("span");
			span_entryBodyRowKey.className=class_streamEntryRowKey;
			span_entryBodyRowKey.innerHTML="Status:";
		span_entryBodyRowValue=document.createElement("span");
			span_entryBodyRowValue.className=class_streamEntryRowValue;
			span_entryBodyRowValue.innerHTML=data[i].status;
		span_entryBodyRow.appendChild(span_entryBodyRowKey);
		span_entryBodyRow.appendChild(span_entryBodyRowValue);
		span_entryBody.appendChild(span_entryBodyRow);
		
		span_entryBodyRowKey=document.createElement("span");
			span_entryBodyRowKey.className=class_streamEntryRowKey;
			span_entryBodyRowKey.innerHTML="Viewers:";
		span_entryBodyRowValue=document.createElement("span");
			span_entryBodyRowValue.className=class_streamEntryRowValue;
			span_entryBodyRowValue.innerHTML=data[i].viewers;
		span_entryBodyRow.appendChild(span_entryBodyRowKey);
		span_entryBodyRow.appendChild(span_entryBodyRowValue);
		span_entryBody.appendChild(span_entryBodyRow);
		
		a_entry.appendChild(span_entryImage);
		a_entry.appendChild(span_entryBody);
		containerDiv.appendChild(a_entry);
	}
	elem.appendChild(containerDiv);
}

function aCreate(className,href){
	var a=document.createElement("a");
		a.className=className;
		a.href=href;
	return a;
}

function createSpanEntryRow(key,value,rowClass,keyClass,valueClass){
	var spanRow=document.createElement("span");
		spanRow.className=rowClass;
	var spanKey=document.createElement("span");
		spanKey.className=keyClass;
		spanKey.innerHTML=key;
	var spanValue=document.createElement("span");
		spanValue.className=valueClass;
		spanValue.innerHTML=value;
	spanRow.appendChild(spanKey);
	spanRow.appendChild(spanValue);
	return spanRow;
}

function divCreate2(elem,data){
	if(elem==null){
		return;
	}
	console.log(data);

	var id_container="streamContainer";
	var class_streamEntry="streamEntry";
	var class_streamEntryImage="streamEntryImage";
	var class_streamEntryBody="streamEntryBody";
	/*
	var class_streamEntryRow="streamEntryRow";
	var class_streamEntryRowKey="streamEntryRowKey";
	var class_streamEntryRowValue="streamEntryRowValue";
	*/

	var class_streamEntryRow="row";
	var class_streamEntryRowKey="key";
	var class_streamEntryRowValue="value";

	var containerDiv=document.getElementById(id_container);

	if(containerDiv!=null){
		containerDiv.parentNode.removeChild(containerDiv);
	}
	containerDiv = document.createElement("div");
	containerDiv.id=id_container;

	for (var i = 0; i <data.length; i++) {
		var backGroundImage="url('"+data[i].logo+"')";
		console.log(backGroundImage);
		var a_entry=aCreate(class_streamEntry,data[i].url);
		var span_entryBody=document.createElement("span");
			span_entryBody.className=class_streamEntryBody;
		var span_entryImage=document.createElement("span");
			span_entryImage.className=class_streamEntryImage;	
			span_entryImage.style.backgroundImage = backGroundImage;

		var span_entryBodyRow=createSpanEntryRow("Name: ",data[i].name,class_streamEntryRow,class_streamEntryRowKey,class_streamEntryRowValue);
		span_entryBody.appendChild(span_entryBodyRow);
		var span_entryBodyRow=createSpanEntryRow("Game: ",data[i].game,class_streamEntryRow,class_streamEntryRowKey,class_streamEntryRowValue);
		span_entryBody.appendChild(span_entryBodyRow);
		var span_entryBodyRow=createSpanEntryRow("Status: ",data[i].status,class_streamEntryRow,class_streamEntryRowKey,class_streamEntryRowValue);
		span_entryBody.appendChild(span_entryBodyRow);
		var span_entryBodyRow=createSpanEntryRow("Viewers ",data[i].viewers,class_streamEntryRow,class_streamEntryRowKey,class_streamEntryRowValue);
		span_entryBody.appendChild(span_entryBodyRow);
		a_entry.appendChild(span_entryImage);
		a_entry.appendChild(span_entryBody);
		containerDiv.appendChild(a_entry);
	}
	elem.appendChild(containerDiv);
}

function jsonp(data){
	// hier passiert das meiste
	var obj=ordne(data);

	//sortieren nach viewer
	obj.sort(function(a, b) {
    return parseInt(a.viewers) - parseInt(b.viewers);
});
	//die streams werden nochmal gefiltert
	var filtered=regexFilter(obj);


	//var element=document.getElementsByTagName("body")[0];
	var element=document.getElementById("FANG");
	console.log(element);
	//divCreate2(element,filtered);
	divCreate2(element,obj);
	//var tbl=tableCreate(filtered);
	console.log("jsonp invoked");
}

function stream_invokeJsonp(){
	console.log("stream_invokeJsonp");
	var script = document.getElementById("streamJsonp");
	if(script!=null){
  	script.parentNode.removeChild(script);
	}
	var script = document.createElement('script');
	var user=username();
	var src=createSrc(user);
	script.src=src;
	script.id="streamJsonp";
	document.getElementsByTagName('head')[0].appendChild(script);
}

	console.log("run");
	stream_invokeJsonp();
	var fn=window.setInterval(stream_invokeJsonp,30000);
