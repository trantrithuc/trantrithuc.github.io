<?php
	function text() {
		//load file xml
		$xml = simplexml_load_file("../xml/data.xml") or die ("Not found XML file.");
		//test input with data 
		foreach ($xml->user as $user) {
			if($_GET['usr'] == $user->username){			
				return true; //is exits
			}			
		}
		return false; //is not exits
	}
	//show result
	if (!text())
		echo "<p>Congratulations <a>".$_GET['usr']."</a> . Completed successfully.</p>"; 
	else
		echo "<p>This account has eixts!. Input another Username and try again.!</p>";
?>