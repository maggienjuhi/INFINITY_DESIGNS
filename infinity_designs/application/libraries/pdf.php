<?php
require('../fpdf16/fpdf.php');

class PDF extends FPDF{
	//Load data
	function LoadData($file){
		//Read file lines
		$lines=file($file);
		$data=array();
		foreach($lines as $line){
			$data[]=explode(';',chop($line));
		}
		return $data;
	}

	//Get the greatest word in a column
	function getGreatestWord($data,$heading,$counter){
		$item_length = 0;		
		/*
		for($i = 0;$i < sizeof($data);$i++){
			if($item_length < strlen($data[$i])){
				echo 'data '.$data[$i].'<br />';
				$item_length = strlen($data[$i]);
			}
		}
		
		if($item_length < strlen($heading)){
			echo 'heading'.$heading.'<bDr />';
			$item_length = strlen($heading);		
		}
		return $item_length;*/
		for($i = 0; $i < sizeof($data); $i++){
			if($item_length < strlen($data[$counter])){
				$item_length = strlen($data[$counter]);
			}
		}
		return $item_length;
	}
	//Colored table
	function FancyTable($header,$data,$header_space){
		//Colors, line width and bold font
		$this->SetFillColor(255,0,0);
		$this->SetTextColor(255);
		$this->SetDrawColor(128,0,0);
		$this->SetLineWidth(.3);
		$this->SetFont('','B');

		//Get longest item and store it in an array


		//Header
		$w=array(40,35,40,45,45);
		//$w = $header_space;
		for($i=0;$i<count($header);$i++)
			$this->Cell($w[$i],7,$header[$i],1,0,'C',true);
			$this->Ln();
			//Color and font restoration
			$this->SetFillColor(224,235,255);
			$this->SetTextColor(0);
			$this->SetFont('');
			//Data
			$fill=false;
			foreach($data as $row){
				for($i = 0; $i < sizeof($row); $i++){
					$this->Cell($w[$i],6,$row[$i],'LR',0,'L',$fill);
				}
			$this->Ln();
			$fill=!$fill;
			}
		$this->Cell(array_sum($w),0,'','T');
	}
}

?>
