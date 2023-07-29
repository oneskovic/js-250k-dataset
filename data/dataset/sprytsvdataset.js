Spry.Data.TSVDataSet = function(dataSetURL, dataSetOptions)
{
	// Call the constructor for our HTTPSourceDataSet base class so that
	// our base class properties get defined.

	Spry.Data.HTTPSourceDataSet.call(this, dataSetURL, dataSetOptions);

	this.delimiter = "\t";
	this.firstRowAsHeaders = true;
	this.columnNames = [];
	this.columnNames = [];

	Spry.Utils.setOptions(this, dataSetOptions);
}; // End of Spry.Data.TSVDataSet() constructor.

Spry.Data.TSVDataSet.prototype = new Spry.Data.HTTPSourceDataSet();
Spry.Data.TSVDataSet.prototype.constructor = Spry.Data.TSVDataSet;

// Override the inherited version of getDataRefStrings() with our
// own version that returns the strings memebers we maintain that
// may have data references in them.

Spry.Data.TSVDataSet.prototype.getDataRefStrings = function()
{
	var strArr = [];
	if (this.url) strArr.push(this.url);
	return strArr;
};

Spry.Data.TSVDataSet.prototype.getDocument = function() { return this.doc; };

Spry.Data.TSVDataSet.prototype.columnNumberToColumnName = function(colNum)
{
	var colName = this.columnNames[colNum];
	if (!colName)
		colName = "column" + colNum;
	return colName;
};

// Translate the raw TSV string (rawDataDoc) into an array of row objects.

Spry.Data.TSVDataSet.prototype.loadDataIntoDataSet = function(rawDataDoc)
{
	var data = new Array();
	var dataHash = new Object();

	var s = rawDataDoc ? rawDataDoc : "";
	var strLen = s.length;
	var i = 0;
	var done = false;

	var firstRowAsHeaders = this.firstRowAsHeaders;

	var searchStartIndex = 0;
	var regexp = /[^\r\n]+|(\r\n|\r|\n)/mg;

	var results = regexp.exec(s);
	var rowObj = null;
	var columnNum = -1;
	var rowID = 0;

	while (results && results[0])
	{
		var r = results[0];
		if (r == "\r\n" || r == "\r" || r == "\n")
		{
			if (!firstRowAsHeaders)
			{
				rowObj.ds_RowID = rowID++;
				data.push(rowObj);
				rowObj = null;
			}
			firstRowAsHeaders = false;
			columnNum = -1;
		}
		else
		{
			var fields = r.split(this.delimiter);
			for (var i = 0; i < fields.length; i++)
			{
				if (firstRowAsHeaders)
						this.columnNames[++columnNum] = fields[i];
				else
				{
					if (++columnNum == 0)
						rowObj = new Object;
					rowObj[this.columnNumberToColumnName(columnNum)] = fields[i];
				}
			}
		}

		searchStartIndex = regexp.lastIndex;
		results = regexp.exec(s);
	}
	
	this.doc = rawDataDoc;
	this.data = data;
	this.dataHash = dataHash;
	this.dataWasLoaded = (this.doc != null);
};
