
function snapBarGraph(){

// Laden von snap.js

load('Scripts/env.rhino.1.2.js', true);
load('Scripts/snap.svg-min.js', true);

// Initialize graphic object in defined size

// Initialize variables
	// Graphic height
	var GraphicHeight = 320;
	// Output position on the vertical axis
	var StartPosY = 305;
	var SpaceY = 50;

	var Multiplier = 20; // Conversion factor for the consumption value
			
	// Set styles for text, lines, current consumption and previous year consumption
	var textAttr = {"font-family": "SANS","font-size": "8pt",};
	var lineAttr = {stroke: "#999", strokeWidth: 0.5, strokeLinecap:"round"};
	var AktAttr = {"fill": '#0071BB'};
	var VorAttr = {"fill": '#78C0EF'};	

	var goodAttr = {"fill": '#007800'};
	var okAttr = {"fill": '#78FF78'};
	var averagetAttr = {"fill": '#FF7878'};
	var badAttr = {"fill": '#780000'};	

	// Basic data for comparison
	var ONE = [500, 1100, 1900, 2500];
	var TWO = [1000, 2100, 3000, 4100];
	var THREE = [1400, 2500, 3800, 5000];
	var FOUR = [1800, 3000, 4300, 6000];	


// Create the graphic, height
	var snap = Snap(650,GraphicHeight);

	var countX = 7; // amount of lines to print
	var LabelText = 6000; // Highest value on the Y-axis
	var AktPosY = 5; // Space/distance to the upper graphic border
	
	for (var i=0; i < countX; i++) {
		snap.line( 30, AktPosY, 500, AktPosY ).attr(lineAttr);
		snap.text(0, AktPosY+3, LabelText).attr(textAttr);	
		AktPosY = (SpaceY + AktPosY);
		LabelText = (LabelText - 1000);
	}

	snap.text(30, GraphicHeight, "Current year").attr(textAttr);
	snap.text(75, GraphicHeight, "Previous year").attr(textAttr);
	snap.text(140, GraphicHeight, "1 Person").attr(textAttr);
	snap.text(240, GraphicHeight, "2 Persons").attr(textAttr);
	snap.text(340, GraphicHeight, "3 Persons").attr(textAttr);
	snap.text(440, GraphicHeight, "4 Persons").attr(textAttr);
	
	/** Output of bars for current and previous year consumption  **/
	// 1-person household
	snap.rect(120, StartPosY-(ONE[0]/Multiplier), 20, ONE[0]/Multiplier).attr(goodAttr);
	snap.rect(140, StartPosY-(ONE[1]/Multiplier), 20, ONE[1]/Multiplier).attr(okAttr);
	snap.rect(160, StartPosY-(ONE[2]/Multiplier), 20, ONE[2]/Multiplier).attr(averagetAttr);
	snap.rect(180, StartPosY-(ONE[3]/Multiplier), 20, ONE[3]/Multiplier).attr(badAttr);
	// 2-person household
	snap.rect(220, StartPosY-(TWO[0]/Multiplier), 20, TWO[0]/Multiplier).attr(goodAttr);
	snap.rect(240, StartPosY-(TWO[1]/Multiplier), 20, TWO[1]/Multiplier).attr(okAttr);
	snap.rect(260, StartPosY-(TWO[2]/Multiplier), 20, TWO[2]/Multiplier).attr(averagetAttr);
	snap.rect(280, StartPosY-(TWO[3]/Multiplier), 20, TWO[3]/Multiplier).attr(badAttr);
	// 3-person household
	snap.rect(320, StartPosY-(THREE[0]/Multiplier), 20, THREE[0]/Multiplier).attr(goodAttr);
	snap.rect(340, StartPosY-(THREE[1]/Multiplier), 20, THREE[1]/Multiplier).attr(okAttr);
	snap.rect(360, StartPosY-(THREE[2]/Multiplier), 20, THREE[2]/Multiplier).attr(averagetAttr);
	snap.rect(380, StartPosY-(THREE[3]/Multiplier), 20, THREE[3]/Multiplier).attr(badAttr);
	// 4-person household
	snap.rect(420, StartPosY-(FOUR[0]/Multiplier), 20, FOUR[0]/Multiplier).attr(goodAttr);
	snap.rect(440, StartPosY-(FOUR[1]/Multiplier), 20, FOUR[1]/Multiplier).attr(okAttr);
	snap.rect(460, StartPosY-(FOUR[2]/Multiplier), 20, FOUR[2]/Multiplier).attr(averagetAttr);
	snap.rect(480, StartPosY-(FOUR[3]/Multiplier), 20, FOUR[3]/Multiplier).attr(badAttr);

	// Allocate graphic
	return 'data:image/svg+xml;base64,' + window.btoa(snap.toString());
}