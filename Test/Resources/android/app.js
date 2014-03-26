function selectRow(e) {
    var myText = e.rowData.myText;
    alert(myText);
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var win = Ti.UI.createWindow({
    backgroundColor: "white"
});

var url = "https://api.foursquare.com/v2/venues/search?near=San Francisco&limit=50&intent=browse&categoryId=4d4b7105d754a06374d81259&oauth_token=0YHRMHDEJD0PSOLYJIJ0BZYDWERBMPUOVOUR4ESDCDD1RTDT&v=20140326";

var xhr = Ti.Network.createHTTPClient();

var tv = Ti.UI.createTableView({
    style: Ti.UI.iPhone.TableViewStyle.PLAIN
});

xhr.onload = function() {
    obj = JSON.parse(this.responseText);
    var tableRows = [];
    for (var i = 0; obj.response.venues.length > i; i++) {
        var row = Ti.UI.createTableViewRow({
            title: obj.response.venues[i].name,
            hasDetail: true,
            height: 70,
            color: "black",
            foo: obj.response.venues[i].contact.formattedPhone
        });
        row.id = i;
        tableRows.push(row);
    }
    tv.setData(tableRows);
    win.add(tv);
};

tv.addEventListener("click", function(e) {
    e.rowData;
    var prop = e.rowData.foo;
    null == prop ? alert("No phone number found") : alert(prop);
});

if (Ti.Network.online) {
    xhr.open("GET", url);
    xhr.send();
}

win.open({
    modal: true
});

Alloy.createController("index");