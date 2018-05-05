const moment = require('moment');

module.exports = {
	truncate: function(str, len) {
		if (str.length > len && str.length > 0)
		{
			var truncStr = str + " ";
			truncStr = str.substr(0, len);
			truncStr = str.substr(0, truncStr.lastIndexOf(" "));
			truncStr = (truncStr.length > 0) ? truncStr : str.substr(0, len);
			return truncStr + '...';
		}
		return str;
	},
	stripTags: function(input) {
		return input.replace(/<(?:.|\n)*?>|\&nbsp;/gm, '');
	},
	formatDate: function(date, format) {
		return moment(date).format(format);
	},
	select: function(selected, options) {
		return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"')
			.replace(new RegExp('>' + selected + '</option>'), ' selected="selected"$&');
	},
	ifNotEq: function(obj1, obj2, options) {
		if (obj1.getTime() && obj2.getTime()) {
			obj1 = obj1.getTime();
			obj2 = obj2.getTime();
		}

		if (obj1 !== obj2) {
			return options.fn(this);
		}
		return options.inverse(this);
	}
}