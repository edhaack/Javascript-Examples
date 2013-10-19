			var bodyReq;
			var logoBarReq;
			var footerBarReq;
			var tabs;
			var questionReq;
			var teamScoreReq;
			var teamScoreInterval;
			var userBarReq;
			var inviteThankYouReq;
			var inviteThankYouHeader;
			//#isRegisteredScript#
			//#userId/gameId/localeVars#

			// used to request the url specified and call fillModule to fill
			// the given div (elemID) with the responseText returned from the request
			function loadXml(url, req, postData, elemID, async)
			{
				req = new ActiveXObject("Msxml2.XMLHTTP");
				if(req)
				{
					req.onreadystatechange = function()
					{
						// only if req shows "loaded"
						if(req.readyState == 4)
						{
							// only if "OK"
							if(req.status == 200)
							{
								fillModule(req.responseText, elemID);
							}
							else
							{
								fillModule(req.statusText, elemID);
								//alert("There was a problem retrieving the XML data:\n" + req.statusText);
							}
						}
					};
					req.open("POST", url, async);
					req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
					req.send(postData);
				}
			}	

			// fills the element's (elemID) innerHTML property with a string (html)
			function fillModule(html, elemID)
			{
				var module;
				if(elemID != "tabs")
				{
					//alert("elemID: " + elemID + "\nhtml: " + html);
				}
				module = document.getElementById(elemID);
				module.innerHTML = html;
			}

			function doClearInterval(intervalToClear)
			{
				if(intervalToClear)
				{
					clearInterval(intervalToClear);
				}
			}

			function navigate(page)
			{
				var url = page;
				var homeBody;
				var bdyCntent;
				
				loadXml("/Q6/Q6Navigation.aspx", tabs, "uid=" + userId + "&page=" + page + "&isReg=" + isRegistered, "tabs", false);
				
				switch(url)
				{
					case "Q6Home.aspx":
					
						doClearInterval(teamScoreInterval);
						bdyCntent = document.getElementById("bdyCntent");
						bdyCntent.id = "homeBody";
						loadXml("/Q6/" + url, bdyCntent, "uid=" + userId + "&gid=" + gameId + "&locale="+ locale, "homeBody", false);
						
						break;
						
					case "Q6Play.aspx":
					
						if(document.getElementById("homeBody"))
						{
							homeBody = document.getElementById("homeBody");
							homeBody.id = "bdyCntent";
						}
						
						loadXml("/Q6/" + url, bdyCntent, "uid=" + userId + "&gid=" + gameId + "&locale="+ locale + "&simdate=" + simDate, "bdyCntent", false);
						
						if(document.getElementById("teamgrid")) 
						{
							if(document.getElementById("interval"))
							{
								teamScoreInterval = setInterval("loadXml(\"/Q6/TeamScoreGrid.aspx\", teamScoreReq, \"\", \"teamgrid\", true)", document.getElementById("interval").value);
							}
						}
						
						//alert("interval: " + document.getElementById("interval").value);
						break;
					
					
					/*case "Q6Team.aspx":
						doClearInterval(teamScoreInterval);
						if(document.getElementById("homeBody"))
						{
							homeBody = document.getElementById("homeBody");
							homeBody.id = "bdyCntent";
						}
						bdyCntent = document.getElementById("bdyCntent");
						loadXml("/Q6/" + url, bdyCntent, "uid=" + userId + "&gid=" + gameId + "&locale="+ locale + "&week="+ currentWeek, "bdyCntent", true);
						loadXml("/Q6/Q6TeamQA.aspx", bdyCntent, "uid=" + userId + "&gid=" + gameId + "&locale="+ locale + "&week="+ currentWeek, "teamQStaus", false);
						loadXml("/Q6/Q6TeamGrid.aspx", bdyCntent, "uid=" + userId + "&gid=" + gameId + "&locale="+ locale + "&week="+ currentWeek, "teamgrid", false);

						break;*/
					default:
						doClearInterval(teamScoreInterval);
						if(document.getElementById("homeBody"))
						{
							homeBody = document.getElementById("homeBody");
							homeBody.id = "bdyCntent";
						}
						bdyCntent = document.getElementById("bdyCntent");
						loadXml("/Q6/" + url, bdyCntent, "uid=" + userId + "&gid=" + gameId + "&locale="+ locale + "&week="+ currentWeek, "bdyCntent", false);
						break;

										
				}
				
			}

			// used for initial load of the page
			function initPage()
			{
				var bdyCntent = document.getElementById("bdyCntent");
				bdyCntent.id = "homeBody";
				loadXml("/Q6/Q6Navigation.aspx",	tabs,			"uid=" + userId + "&isRegistered=" + isRegistered + "&gid=" + gameId + "&locale="+ locale + "&simdate=" + simDate + "&page=Q6Home.aspx", "tabs", false);
				loadXml("/Q6/UserBar.aspx",			userBarReq,		"uid=" + userId + "&isRegistered=" + isRegistered + "&gid=" + gameId + "&locale="+ locale + "&simdate=" + simDate, "crumb", false);
				loadXml("/Q6/Q6Home.aspx",			bodyReq,		"uid=" + userId + "&isRegistered=" + isRegistered + "&gid=" + gameId + "&locale="+ locale , "homeBody", false);
				loadXml("/Q6/logobar.aspx",			logoBarReq,		"uid=" + userId + "&isRegistered=" + isRegistered + "&gid=" + gameId + "&locale="+ locale , "logoBar", false);
				loadXml("/Q6/footerbar.aspx",		footerBarReq,	"uid=" + userId + "&gid=" + gameId + "&locale="+ locale , "container_bottom", false);
			}

			