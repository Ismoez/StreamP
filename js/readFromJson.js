function tableCreate(data) {
		//body reference 
		var body = document.getElementsByTagName("body")[0];
		// create elements <table> and a <tbody>
		var tbl     = document.createElement("table");
		var tblBody = document.createElement("tbody");


		for (var j = 0; j <data.length; j++) {
			var row = document.createElement("tr");
			//_---------------------------------------------------------
			var cell = document.createElement("td");    
			var cellText = document.createTextNode(data[j].name); 
			cell.appendChild(cellText);
			row.appendChild(cell);
			tbl.appendChild(row);

			var cell = document.createElement("td");    
			var cellText = document.createTextNode(data[j].status); 
			cell.appendChild(cellText);
			row.appendChild(cell);
			tbl.appendChild(row);

			var cell = document.createElement("td");    
			var cellText = document.createTextNode(data[j].viewers); 
			cell.appendChild(cellText);
			row.appendChild(cell);
			tbl.appendChild(row);

			var cell = document.createElement("td");    
			var cellText = document.createTextNode(data[j].game); 
			cell.appendChild(cellText);
			row.appendChild(cell);
			tbl.appendChild(row);

			var cell = document.createElement("td");    
			var cellText = document.createTextNode(data[j].logo); 
			cell.appendChild(cellText);
			row.appendChild(cell);
			tbl.appendChild(row);

			var cell = document.createElement("td");    
			var cellText = document.createTextNode(data[j].provider); 
			cell.appendChild(cellText);
			row.appendChild(cell);
			tbl.appendChild(row);
		}
		tbl.setAttribute("border", "2");
		body.appendChild(tbl);
}

function qry(file){
	var xhttp;
	if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    } else {
  xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

  xhttp.open("GET", file, false);
  xhttp.send();
	return xhttp.responseText;
}

function run(){
	var file="test.json";
	var data=qry(file);
	var obj=JSON.parse(data);
	tableCreate(obj);
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
		collect[i]['provider']="twitch";
	}
	//console.log(collect[0].viewers);
	//console.log(streams);
	//console.log(streams.length);
	return collect;
}


function jsonp(data)
{
	//alert(data);
	//alert (JSON.stringify(data));	
	//console.log(JSON.stringify(data));
	//var obj=JSON.parse(data);
	//var obj=data;
	console.log("hi");
	var obj=ordne(data);
	tableCreate(obj);
}
function username(){
	var user=new Array(
		"gronkh"
		,"zauberponyy"
		,"shurjoka"
		,"prelyer"	
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
var script = document.createElement('script');
var user=username();
var src=createSrc(user);
script.src=src;
document.getElementsByTagName('head')[0].appendChild(script);

//script.src = 'https://api.twitch.tv/kraken/streams?channel=gronkh,zauberponyy,shurjoka,prelyer&callback=jsonp'
//window.onload =run();

