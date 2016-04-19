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

		//body reference 
		var body = document.getElementsByTagName("body")[0];
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
		body.appendChild(tbl);
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

function jsonp(data)
{
	// hier passiert das meiste
	var obj=ordne(data);
	//filter funktion hier hinzufügen
	tableCreate(obj);
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
	var fn=window.setInterval(stream_invokeJsonp,10000);
