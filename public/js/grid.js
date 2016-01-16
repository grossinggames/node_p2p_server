var wss = new WebSocket("wss://" + window.location.hostname + ":" + window.location.port);
var result;

wss.onmessage = function (event) 
{
	try 
	{
		result = event.data;
	}
	catch(e) 
	{
	    console.log("Error Message: " + e.message);
	    return;
	}

	if (result!=undefined) 
	{
		console.log(result);
		document.getElementById("p1").innerHTML = "Create:_[" + String(result) + "]_rooms.";
	}
};
