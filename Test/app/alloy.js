//Open UI window

var win = Ti.UI.createWindow({
	backgroundColor : 'white',
});

//Get Geolocation
Titanium.Geolocation.getCurrentPosition(function(e) {
	var longitude = e.coords.longitude;
	var latitude = e.coords.latitude;

	//I would use the following line if my phone didn't have some issues with getting my geo location
	//var url = 'https://api.foursquare.com/v2/venues/search?ll='+longitude+','+latitude+'&limit=50&intent=browse&categoryId=4d4b7105d754a06374d81259&oauth_token=0YHRMHDEJD0PSOLYJIJ0BZYDWERBMPUOVOUR4ESDCDD1RTDT&v=20140326';
	
	//query FourSquare for food places near San Francisco
	var url = 'https://api.foursquare.com/v2/venues/search?near=San Francisco&limit=50&intent=browse&categoryId=4d4b7105d754a06374d81259&oauth_token=0YHRMHDEJD0PSOLYJIJ0BZYDWERBMPUOVOUR4ESDCDD1RTDT&v=20140326';
	var xhr = Ti.Network.createHTTPClient();
	var tv = Ti.UI.createTableView({
		style : Ti.UI.iPhone.TableViewStyle.PLAIN
	});

	//create rows to put into TableView
	xhr.onload = function() {
		obj = JSON.parse(this.responseText);
		var tableRows = [];
		for (var i = 0; i < obj.response.venues.length; i++) {
			var row = Ti.UI.createTableViewRow({
				title : obj.response.venues[i].name,
				hasDetail : true,
				height : 70,
				color : 'black',
				foo : obj.response.venues[i].contact.formattedPhone,
			});
			row.id = i;
			tableRows.push(row);
		}
		tv.setData(tableRows);
		win.add(tv);
	};

	//function to get phone numbers from each row
	function selectRow(e) {
		var myText = e.rowData.myText;
		alert(myText);
	}

	//Alerts phone number when row is clicked, or no phone number when there isn't one
	tv.addEventListener('click', function(e) {
		var rowdata = e.rowData;
		
		var prop = e.rowData.foo;
		if (prop == null) {
			alert('No phone number found');
		} else {
			alert(prop);
		}
	});

	//used for API call
	if (Ti.Network.online) {
		xhr.open('GET', url);
		xhr.send();
	} else {

	}
});

//opens window
win.open();

