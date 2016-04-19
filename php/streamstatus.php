<?php
//frühere funktionen BEGIN
function getJson($username){
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
//frühere funktionen END

// Twitch BEGIN
function twitch_getJson($username){
	$js=file_get_contents('https://api.twitch.tv/kraken/streams/'.$username);
	$data = json_decode($js);
	return $data;
}

function twitch_parseJson($data,$username,$provider){
	if($data->stream!=NULL){
		$stream['name']=$username;
		$stream['status']='online';
		$stream['viewers']=$data->stream->viewers;
		$stream['game']=$data->stream->game;
		$stream['logo']=$data->stream->channel->logo;
		$stream['provider']=$provider;
		return $stream;
	}else return NULL;
}

// Twitch END


function providerSwitch($username){
	$count=count($username);
	for($i=0;$i<$count;$i++){
		$j=0;
		switch ($username[$i][1]) {
			case 'twitch':
				$json=twitch_getJson($username[$i][0]);
				if($json!=NULL){
					$data=twitch_parseJson($json,$username[$i][0],$username[$i][1]);
					$stream[$j]=$data;
					$j++;
				}
				break;
			default:
				//ToDo Error
			 $a=1;
		}
	}
	return $stream;
}

function wFile($contents,$fileDestination){
	$fp = fopen($fileDestination, 'wb');
	if($fp==FALSE){
		printP("Datei: ".$fileDestination." konnte nicht beschrieben werden");
		return;
	}
	fwrite($fp, $contents);
	fclose($fp);
}

$username=array(
	array('dicktraitor','twitch')
	,array('brawlonestream','twitch')
	,array('sumpfauge','twitch')
	,array('insertgame','twitch')
	,array('virtualdojovienna','twitch')
	,array('dfieldmark','twitch')
	,array('venicraft','twitch')
	,array('gronkh','twitch')
);
$fName="test.json";
$stream=providerSwitch($username);
$jEnc=json_encode($stream);
wFile($jEnc,$fName);
//var_dump($stream);

?>

