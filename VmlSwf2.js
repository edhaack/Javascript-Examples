
var agt=navigator.userAgent.toLowerCase();
var isMacIE5 = agt.indexOf("mac") != -1 && agt.indexOf("msie") != -1 && agt.indexOf("5") != -1;

var WEBSITE_NAME = "VML TEMPLATE SITE";
var WELCOME_RESPONSE = "Welcome to the site<BR><BR>";
var MAC_IE52_RESPONSE = "This site has to be viewed in Flash 8. Flash 8 is no longer available for Mac IE 5.  Please use another browser.<br><br>";
var MISSING_FLASH_PLAYER_RESPONSE = "This site requires the Adobe Flash Player. <a href=http://www.adobe.com/go/getflash/>Get Flash</a><br><br>";

var swfFilename = "LegacyDetection.swf";
var swfWidth = 550;
var swfHeight = 400;
var swfVersion = 2;
var swfBackground = "#FFFFFF";
var swfDiv = "FlashContent";


//VmlSwf2 Constructor
function VmlSwf2()
{
	this.Write	            = Write;
	this.SetProperty		= SetProperty;
}

//Methods
function SetProperty(name, value)
{
	this[name] = value;
}

//Writes the swfObject
function Write()
{
	with(this)
	{
        if(isMacIE5)
        {
            document.write(WELCOME_RESPONSE + MAC_IE52_RESPONSE);
        }
        else
        {
            //Write the swf object
            var swfObject = new SWFObject(swfFilename, "base", swfWidth, swfHeight, swfVersion, swfBackgroundColor);
            swfObject.addParam("allowScriptAccess", "always");
            swfObject.addParam("quality", "high");
            swfObject.addParam("menu", "false");
            addQueryStringVars(swfObject);
            swfObject.write(swfDiv);
        }
	}
}

function getQSVariableNames()
{
    // Get a list of names
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    return vars;
}

function addQueryStringVars(so)
{
    // Iterate through each querystring variable and pass it into the
    // flash movie as a variable.
    var qsVars = getQSVariableNames();
    if (qsVars != null)
    {
	    for (var i=0; i<qsVars.length; i++)
	    {
		    var pair = qsVars[i].split("=");
		    so.addVariable(pair[0], pair[1]);
	    }
    }
}