var listwin = function(_data, _title, _nav){
	
	var tableView = Ti.UI.createTableView({
		objName: 'table'
	});
	
	var tableData = [];
	
	for(var i = 0; i < _data.length; i++)
	{
		var row = Ti.UI.createTableViewRow({
			objName : 'listwinRow',
			rowIndex: i,
			title : _data[i]
		});
		tableData.push(row);
	}
	tableView.setData(tableData);
	
	var self = Ti.UI.createWindow({
		layout : 'vertical',
		title: _title,
		table: tableView
	});
	
	self.add(tableView);
	return self;
	
};

module.exports = listwin;
