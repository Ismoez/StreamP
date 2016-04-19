<?php

function getjson($username){
	$count=count($username);
	for($i=0;$i<$count;$i++){
		$js=file_get_contents('https://api.twitch.tv/kraken/streams/'.$username[$i]);
		$data[] = json_decode($js);
	}
	return $data;
}

function getOnlineData($data,$username){
	$count=count($data);
	$j=0;
	for($i=0;$i<$count;$i++){
		if($data[$i]->stream!=NULL){
			$stream[$j]['name']=$username[$i];
			$stream[$j]['status']='online';
			$stream[$j]['viewers']=$data[$i]->stream->viewers;
			$stream[$j]['game']=$data[$i]->stream->game;
			$stream[$j]['logo']=$data[$i]->stream->channel->logo;
			$j++;
		}
	}
	return $stream;
}

$username=array(
'dicktraitor'
,'brawlonestream'
,'sumpfauge'
,'insertgame'
,'virtualdojovienna'
,'dicktraitor'
,'dfieldmark'
,'venicraft'
,'gronkh'
);

$data=getjson($username);
$stream=getOnlineData($data,$username);
$test=json_encode($stream);
var_dump($test);


?>

