function ddg_spice_isbn(data) {
	// See http://openlibrary.org/dev/docs/api/books for the incoming data format
	var snippet = '';
	for (var bookID in data) {
		// Yes, this is a for loop. The data is returned as an associative
		// array with one element, the book. We use a for loop, but return
		// after the first item.
		
		var book = data[bookID];
		
		if (book['authors']) {
			snippet += ddg_spice_isbn__list(book['authors'],"Author","Authors");
		}
		
		var identifiers = {'isbn_10': "ISBN-10", 'isbn_13': "ISBN-13",
			'lccn': "LCCN", 'oclc': "OCLC"};
		
		if (book['identifiers']) {
			var first=true;
			for (var identifier in identifiers) {
				if (book['identifiers'][identifier]) {
					if (first) {
						snippet += '<div>';
						first=false;
					} else {
						snippet += "; ";
					}
					snippet += identifiers[identifier]+": ";
					var firstID=true;
					for (id in book['identifiers'][identifier]) {
						if (firstID) {
							firstID=false;
						} else {
							snippet += ", ";
						}
						var isbn_identifier = false;
						if (identifier == 'isbn_10' || identifier == 'isbn_13') {
							// Try to hyphenate the ISBN.
							// Sometimes, this doesn't work, particularly if ISBN.GROUPS
							// hasn't heard of the group code. In this case, 
							// just display the unformatted ISBN instead.
							var isbn_hyphenated = ISBN.hyphenate(book['identifiers'][identifier][id]);
							if (isbn_hyphenated) {
								snippet += isbn_hyphenated;
								isbn_identifier = true;
							}
						}
						if (!isbn_identifier) {
							snippet += book['identifiers'][identifier][id];
						}
					}
				}
			}
			if (!first) snippet += '</div>'; // There was at least one identifier.
		}
		
		if (book['publishers']) {
			snippet += ddg_spice_isbn__list(book['publishers'],"Publisher","Publishers");
		}
		
		var items = new Array();
		items[0] = new Array();
		items[0]['a'] = snippet; // TODO
		items[0]['h'] = book['title'];
		items[0]['s'] = 'Open Library';
		items[0]['u'] = book['url'];
		items[0]['t'] = "DEADBEEFDEADBEEF";
		if (book['cover'] && book['cover']['medium']) {
			items[0]['i'] = book['cover']['medium'];
		}
		items[0]['force_big_header'] = true;
		nra(items);
		
		return;
	}
}

function ddg_spice_isbn__list(list, singular, plural) {
	var snippet = "<div>";
	if (list.length = 1) {
		snippet += singular;
	} else {
		snippet += plural;
	}
	snippet += ": ";
	var first = true;
	for (var itemID in list) {
		item=list[itemID];
		if (first) {
			first=false;
		} else {
			snippet += ", ";
		}
		if (item['url']) {
			snippet += '<a href="'+item['url']+'">'+item['name']+'</a>';
		} else {
			snippet += item['name'];
		}
	}
	snippet += '</div>';
	return snippet;
}

//
// isbn.js
//
// The MIT License
// Copyright (c) 2007 hetappi <hetappi.pm (a) gmail.com>
//
var ISBN  = {
  VERSION: '0.01',
  GROUPS: {
    '0': {
      'name': 'English speaking area',
      'ranges': [['00', '19'], ['200', '699'], ['7000', '8499'], ['85000', '89999'], ['900000', '949999'], ['9500000', '9999999']]
    },
    '1': {
      'name': 'English speaking area',
      'ranges': [['00', '09'], ['100', '399'], ['4000', '5499'], ['55000', '86979'], ['869800', '998999']]
    },
    '4': {
      'name': 'Japan',
      'ranges': [['00','19'], ['200','699'], ['7000','8499'], ['85000','89999'], ['900000','949999'], ['9500000','9999999']]
    }
  },

  _isbn: function () {
    this._initialize.apply(this, arguments);
  },

  parse: function(val, groups) {
    var me = new ISBN._isbn(val, groups ? groups : ISBN.GROUPS);
    return me.isValid() ? me : null;
  },

  hyphenate: function(val) {
    var me = ISBN.parse(val);
    return me ? me.isIsbn13() ? me.asIsbn13(true) : me.asIsbn10(true) : null;
  },

  asIsbn13: function(val, hyphen) {
    var me = ISBN.parse(val);
    return me ? me.asIsbn13(hyphen) : null;
  },

  asIsbn10: function(val, hyphen) {
    var me = ISBN.parse(val);
    return me ? me.asIsbn10(hyphen) : null;
  }
};

ISBN._isbn.prototype = {
  isValid: function() {
    return this.codes && this.codes.isValid;
  },

  isIsbn13: function() {
    return this.isValid() && this.codes.isIsbn13;
  },

  isIsbn10: function() {
    return this.isValid() && this.codes.isIsbn10;
  },

  asIsbn10: function(hyphen) {
    return this.isValid() ? hyphen ? this.codes.isbn10h : this.codes.isbn10 : null;
  },

  asIsbn13: function(hyphen) {
    return this.isValid() ? hyphen ? this.codes.isbn13h : this.codes.isbn13 : null;
  },

  _initialize: function(val, groups) {
    this.groups = groups;
    this.codes = this._parse(val);
  },

  _merge: function(lobj, robj) {
    if (!lobj || !robj)
      return null;
    for (var key in robj)
      lobj[key] = robj[key];
    return lobj;
  },

  _parse: function(val) {
    var ret =
      val.match(/^\d{9}[\dX]$/) ?
        this._fill(
          this._merge({source: val, isValid: true, isIsbn10: true, isIsbn13: false}, this._split(val))) :
      val.length == 13 && val.match(/^(\d+)-(\d+)-(\d+)-([\dX])$/) ?
        this._fill({
          source: val, isValid: true, isIsbn10: true, isIsbn13: false, group: RegExp.$1, publisher: RegExp.$2,
          article: RegExp.$3, check: RegExp.$4}) :
      val.match(/^(978|979)(\d{9}[\dX]$)/) ?
        this._fill(
          this._merge({source: val, isValid: true, isIsbn10: false, isIsbn13: true, prefix: RegExp.$1},
          this._split(RegExp.$2))) :
      val.length == 17 && val.match(/^(978|979)-(\d+)-(\d+)-(\d+)-([\dX])$/) ?
        this._fill({
          source: val, isValid: true, isIsbn10: false, isIsbn13: true, prefix: RegExp.$1, group: RegExp.$2,
          publisher: RegExp.$3, article: RegExp.$4, check: RegExp.$5}) :
        null;
    return ret || {source: val, isValid: false};
  },

  _split: function(isbn) {
    return (
      !isbn ?
        null :
      isbn.length == 13 ?
        this._merge(this._split(isbn.substr(3)), {prefix: isbn.substr(0, 3)}) :
      isbn.length == 10 ?
        this._splitToObject(isbn) :
        null);
  },

  _splitToArray: function(isbn10) {
    var rec = this._getGroupRecord(isbn10);
    if (!rec)
      return null;

    for (var key, i = 0, m = rec.record.ranges.length; i < m; ++i) {
      key = rec.rest.substr(0, rec.record.ranges[i][0].length);
      if (rec.record.ranges[i][0] <= key && rec.record.ranges[i][1] >= key) {
        var rest = rec.rest.substr(key.length);
        return [
          rec.group, key, rest.substr(0, rest.length - 1), rest.charAt(rest.length - 1)];
      }
    }
    return null;
  },

  _splitToObject: function(isbn10) {
    var a = this._splitToArray(isbn10);
    if (!a || a.length != 4)
      return null;
    return {group: a[0], publisher: a[1], article: a[2], check: a[3]};
  },

  _fill: function(codes) {
    if (!codes)
      return null;

    var rec = this.groups[codes.group];
    if (!rec)
      return null;

    var prefix = codes.prefix ? codes.prefix : '978';
    var ck10 = this._calcCheckDigit([
      codes.group, codes.publisher, codes.article].join(''));
    if (!ck10)
      return null;

    var ck13 = this._calcCheckDigit([
      prefix, codes.group, codes.publisher, codes.article].join(''));
    if (!ck13)
      return null;

    var parts13 = [prefix, codes.group, codes.publisher, codes.article, ck13];
    this._merge(codes, {
      isbn13: parts13.join(''), isbn13h: parts13.join('-'),
      check10: ck10, check13: ck13, groupname: rec.name});

    if (prefix == '978') {
      var parts10 = [codes.group, codes.publisher, codes.article, ck10];
      this._merge(codes, {isbn10: parts10.join(''), isbn10h: parts10.join('-')});
    }

    return codes;
  },

  _getGroupRecord: function(isbn10) {
    for (var key in this.groups) {
      if (isbn10.match('^' + key + '(.+)'))
        return {group: key, record: this.groups[key], rest: RegExp.$1};
    }
    return null;
  },

  _calcCheckDigit: function(isbn) {
    if (isbn.match(/^\d{9}[\dX]?$/)) {
      var c = 0;
      for (var n = 0; n < 9; ++n)
        c += (10 - n) * isbn.charAt(n);
      c = (11 - c % 11) % 11;
      return c == 10 ? 'X' : String(c);

    } else if (isbn.match(/(?:978|979)\d{9}[\dX]?/)) {
      var c = 0;
      for (var n = 0; n < 12; n += 2)
        c += Number(isbn.charAt(n)) + 3 * isbn.charAt(n + 1);
      return String((10 - c % 10) % 10);
    }

    return null;
  }
};

// TODO: the following group information is *seriously* outdated (2009).
// However, the mkgroups.pl script no longer works, so we need to figure out
// how to generate this data from the new XML file.

// isbn-groups.js
// generated by mkgroups.pl
if (typeof ISBN == 'undefined')
  var ISBN = {};

// referred: http://www.isbn-international.org/converter/ranges.htm
// frequently, you need to update the following table. what a nice specification!
ISBN.GROUPS_VERSION = '20090129';
ISBN.GROUPS = {
  "0": {
    "name": "English speaking area",
    "ranges": [["00", "19"], ["200", "699"], ["7000", "8499"], ["85000", "89999"], ["900000", "949999"], ["9500000", "9999999"]]
  },
  "1": {
    "name": "English speaking area",
    "ranges": [["00", "09"], ["100", "399"], ["4000", "5499"], ["55000", "86979"], ["869800", "998999"]]
  },
  "2": {
    "name": "French speaking area",
    "ranges": [["00", "19"], ["200", "349"], ["35000", "39999"], ["400", "699"], ["7000", "8399"], ["84000", "89999"], ["900000", "949999"], ["9500000", "9999999"]]
  },
  "3": {
    "name": "German speaking area",
    "ranges": [["00", "02"], ["030", "033"], ["0340", "0369"], ["03700", "03999"], ["04", "19"], ["200", "699"], ["7000", "8499"], ["85000", "89999"], ["900000", "949999"], ["9500000", "9539999"], ["95400", "96999"], ["9700000", "9899999"], ["99000", "99499"], ["99500", "99999"]]
  },
  "4": {
    "name": "Japan",
    "ranges": [["00", "19"], ["200", "699"], ["7000", "8499"], ["85000", "89999"], ["900000", "949999"], ["9500000", "9999999"]]
  },
  "5": {
    "name": "Russian Federation",
    "ranges": [["00", "19"], ["200", "420"], ["4210", "4299"], ["430", "430"], ["4310", "4399"], ["440", "440"], ["4410", "4499"], ["450", "699"], ["7000", "8499"], ["85000", "89999"], ["900000", "909999"], ["91000", "91999"], ["9200", "9299"], ["93000", "94999"], ["9500", "9799"], ["98000", "98999"], ["9900000", "9909999"], ["9910", "9999"]]
  },
  "600": {
    "name": "Iran",
    "ranges": [["00", "09"], ["100", "499"], ["5000", "8999"], ["90000", "99999"]]
  },
  "601": {
    "name": "Kazakhstan",
    "ranges": [["00", "19"], ["200", "699"], ["7000", "7999"], ["80000", "84999"], ["85", "99"]]
  },
  "602": {
    "name": "Indonesia",
    "ranges": [["00", "19"], ["200", "799"], ["8000", "9499"], ["95000", "99999"]]
  },
  "603": {
    "name": "Saudi Arabia",
    "ranges": [["00", "04"], ["500", "799"], ["8000", "8999"], ["90000", "99999"]]
  },
  "604": {
    "name": "Vietnam",
    "ranges": [["0", "4"], ["50", "89"], ["900", "979"], ["9800", "9999"]]
  },
  "605": {
    "name": "Turkey",
    "ranges": [["00", "09"], ["100", "399"], ["4000", "5999"], ["60000", "89999"]]
  },
  "606": {
    "name": "Romania",
    "ranges": [["0", "0"], ["10", "49"], ["500", "799"], ["8000", "9199"], ["92000", "99999"]]
  },
  "607": {
    "name": "Mexico",
    "ranges": [["00", "39"], ["400", "749"], ["7500", "9499"], ["95000", "99999"]]
  },
  "608": {
    "name": "Macedonia",
    "ranges": [["0", "0"], ["10", "19"], ["200", "449"], ["4500", "6499"], ["65000", "69999"], ["7", "9"]]
  },
  "609": {
    "name": "Lithuania",
    "ranges": [["00", "39"], ["400", "799"], ["8000", "9499"], ["95000", "99999"]]
  },
  "7": {
    "name": "China, People's Republic",
    "ranges": [["00", "09"], ["100", "499"], ["5000", "7999"], ["80000", "89999"], ["900000", "999999"]]
  },
  "80": {
    "name": "Czech Republic; Slovakia",
    "ranges": [["00", "19"], ["200", "699"], ["7000", "8499"], ["85000", "89999"], ["900000", "999999"]]
  },
  "81": {
    "name": "India",
    "ranges": [["00", "19"], ["200", "699"], ["7000", "8499"], ["85000", "89999"], ["900000", "999999"]]
  },
  "82": {
    "name": "Norway",
    "ranges": [["00", "19"], ["200", "699"], ["7000", "8999"], ["90000", "98999"], ["990000", "999999"]]
  },
  "83": {
    "name": "Poland",
    "ranges": [["00", "19"], ["200", "599"], ["60000", "69999"], ["7000", "8499"], ["85000", "89999"], ["900000", "999999"]]
  },
  "84": {
    "name": "Spain",
    "ranges": [["00", "19"], ["200", "699"], ["7000", "8499"], ["85000", "89999"], ["9000", "9199"], ["920000", "923999"], ["92400", "92999"], ["930000", "949999"], ["95000", "96999"], ["9700", "9999"]]
  },
  "85": {
    "name": "Brazil",
    "ranges": [["00", "19"], ["200", "599"], ["60000", "69999"], ["7000", "8499"], ["85000", "89999"], ["900000", "979999"], ["98000", "99999"]]
  },
  "86": {
    "name": "Serbia and Montenegro",
    "ranges": [["00", "29"], ["300", "599"], ["6000", "7999"], ["80000", "89999"], ["900000", "999999"]]
  },
  "87": {
    "name": "Denmark",
    "ranges": [["00", "29"], ["400", "649"], ["7000", "7999"], ["85000", "94999"], ["970000", "999999"]]
  },
  "88": {
    "name": "Italian speaking area",
    "ranges": [["00", "19"], ["200", "599"], ["6000", "8499"], ["85000", "89999"], ["900000", "949999"], ["95000", "99999"]]
  },
  "89": {
    "name": "Korea",
    "ranges": [["00", "24"], ["250", "549"], ["5500", "8499"], ["85000", "94999"], ["950000", "999999"]]
  },
  "90": {
    "name": "Netherlands, Belgium (Flemish)",
    "ranges": [["00", "19"], ["200", "499"], ["5000", "6999"], ["70000", "79999"], ["800000", "849999"], ["8500", "8999"], ["900000", "909999"], ["940000", "949999"]]
  },
  "91": {
    "name": "Sweden",
    "ranges": [["0", "1"], ["20", "49"], ["500", "649"], ["7000", "7999"], ["85000", "94999"], ["970000", "999999"]]
  },
  "92": {
    "name": "International Publishers (Unesco, EU), European Community Organizations",
    "ranges": [["0", "5"], ["60", "79"], ["800", "899"], ["9000", "9499"], ["95000", "98999"], ["990000", "999999"]]
  },
  "93": {
    "name": "India",
    "ranges": [["00", "09"], ["100", "499"], ["5000", "7999"], ["80000", "94999"], ["950000", "999999"]]
  },
  "94": {
    "name": "Netherlands",
    "ranges": [["000", "599"], ["6000", "8999"], ["90000", "99999"]]
  },
  "950": {
    "name": "Argentina",
    "ranges": [["00", "49"], ["500", "899"], ["9000", "9899"], ["99000", "99999"]]
  },
  "951": {
    "name": "Finland",
    "ranges": [["0", "1"], ["20", "54"], ["550", "889"], ["8900", "9499"], ["95000", "99999"]]
  },
  "952": {
    "name": "Finland",
    "ranges": [["00", "19"], ["200", "499"], ["5000", "5999"], ["60", "65"], ["6600", "6699"], ["67000", "69999"], ["7000", "7999"], ["80", "94"], ["9500", "9899"], ["99000", "99999"]]
  },
  "953": {
    "name": "Croatia",
    "ranges": [["0", "0"], ["10", "14"], ["150", "549"], ["55000", "59999"], ["6000", "9499"], ["95000", "99999"]]
  },
  "954": {
    "name": "Bulgaria",
    "ranges": [["00", "29"], ["300", "799"], ["8000", "8999"], ["90000", "92999"], ["9300", "9999"]]
  },
  "955": {
    "name": "Sri Lanka",
    "ranges": [["0000", "0999"], ["1000", "1999"], ["20", "54"], ["550", "799"], ["8000", "9499"], ["95000", "99999"]]
  },
  "956": {
    "name": "Chile",
    "ranges": [["00", "19"], ["200", "699"], ["7000", "9999"]]
  },
  "957": {
    "name": "Taiwan, China",
    "ranges": [["00", "02"], ["0300", "0499"], ["05", "19"], ["2000", "2099"], ["21", "27"], ["28000", "30999"], ["31", "43"], ["440", "819"], ["8200", "9699"], ["97000", "99999"]]
  },
  "958": {
    "name": "Colombia",
    "ranges": [["00", "56"], ["57000", "59999"], ["600", "799"], ["8000", "9499"], ["95000", "99999"]]
  },
  "959": {
    "name": "Cuba",
    "ranges": [["00", "19"], ["200", "699"], ["7000", "8499"]]
  },
  "960": {
    "name": "Greece",
    "ranges": [["00", "19"], ["200", "659"], ["6600", "6899"], ["690", "699"], ["7000", "8499"], ["85000", "99999"]]
  },
  "961": {
    "name": "Slovenia",
    "ranges": [["00", "19"], ["200", "599"], ["6000", "8999"], ["90000", "94999"]]
  },
  "962": {
    "name": "Hong Kong",
    "ranges": [["00", "19"], ["200", "699"], ["7000", "8499"], ["85000", "86999"], ["8700", "8999"], ["900", "999"]]
  },
  "963": {
    "name": "Hungary",
    "ranges": [["00", "19"], ["200", "699"], ["7000", "8499"], ["85000", "89999"], ["9000", "9999"]]
  },
  "964": {
    "name": "Iran",
    "ranges": [["00", "14"], ["150", "249"], ["2500", "2999"], ["300", "549"], ["5500", "8999"], ["90000", "96999"], ["970", "989"], ["9900", "9999"]]
  },
  "965": {
    "name": "Israel",
    "ranges": [["00", "19"], ["200", "599"], ["7000", "7999"], ["90000", "99999"]]
  },
  "966": {
    "name": "Ukraine",
    "ranges": [["00", "14"], ["1500", "1699"], ["170", "199"], ["2000", "2999"], ["300", "699"], ["7000", "8999"], ["90000", "99999"]]
  },
  "967": {
    "name": "Malaysia",
    "ranges": [["00", "29"], ["300", "499"], ["5000", "5999"], ["60", "89"], ["900", "989"], ["9900", "9989"], ["99900", "99999"]]
  },
  "968": {
    "name": "Mexico",
    "ranges": [["01", "39"], ["400", "499"], ["5000", "7999"], ["800", "899"], ["9000", "9999"]]
  },
  "969": {
    "name": "Pakistan",
    "ranges": [["0", "1"], ["20", "39"], ["400", "799"], ["8000", "9999"]]
  },
  "970": {
    "name": "Mexico",
    "ranges": [["01", "59"], ["600", "899"], ["9000", "9099"], ["91000", "96999"], ["9700", "9999"]]
  },
  "971": {
    "name": "Philippines",
    "ranges": [["000", "019"], ["02", "02"], ["0300", "0599"], ["06", "09"], ["10", "49"], ["500", "849"], ["8500", "9099"], ["91000", "99999"]]
  },
  "972": {
    "name": "Portugal",
    "ranges": [["0", "1"], ["20", "54"], ["550", "799"], ["8000", "9499"], ["95000", "99999"]]
  },
  "973": {
    "name": "Romania",
    "ranges": [["0", "0"], ["100", "169"], ["1700", "1999"], ["20", "54"], ["550", "759"], ["7600", "8499"], ["85000", "88999"], ["8900", "9499"], ["95000", "99999"]]
  },
  "974": {
    "name": "Thailand",
    "ranges": [["00", "19"], ["200", "699"], ["7000", "8499"], ["85000", "89999"], ["90000", "94999"], ["9500", "9999"]]
  },
  "975": {
    "name": "Turkey",
    "ranges": [["00000", "00999"], ["01", "24"], ["250", "599"], ["6000", "9199"], ["92000", "98999"], ["990", "999"]]
  },
  "976": {
    "name": "Caribbean Community",
    "ranges": [["0", "3"], ["40", "59"], ["600", "799"], ["8000", "9499"], ["95000", "99999"]]
  },
  "977": {
    "name": "Egypr",
    "ranges": [["00", "19"], ["200", "499"], ["5000", "6999"], ["700", "999"]]
  },
  "978": {
    "name": "Nigeria",
    "ranges": [["000", "199"], ["2000", "2999"], ["30000", "79999"], ["8000", "8999"], ["900", "999"]]
  },
  "979": {
    "name": "Indonesia",
    "ranges": [["000", "099"], ["1000", "1499"], ["15000", "19999"], ["20", "29"], ["3000", "3999"], ["400", "799"], ["8000", "9499"], ["95000", "99999"]]
  },
  "980": {
    "name": "Venezuela",
    "ranges": [["00", "19"], ["200", "599"], ["6000", "9999"]]
  },
  "981": {
    "name": "Singapore",
    "ranges": [["00", "11"], ["120", "299"], ["3000", "9999"]]
  },
  "982": {
    "name": "South Pacific",
    "ranges": [["00", "09"], ["100", "699"], ["70", "89"], ["9000", "9999"]]
  },
  "983": {
    "name": "Malaysia",
    "ranges": [["00", "01"], ["020", "199"], ["2000", "3999"], ["40000", "44999"], ["45", "49"], ["50", "79"], ["800", "899"], ["9000", "9899"], ["99000", "99999"]]
  },
  "984": {
    "name": "Bangladesh",
    "ranges": [["00", "39"], ["400", "799"], ["8000", "8999"], ["90000", "99999"]]
  },
  "985": {
    "name": "Belarus",
    "ranges": [["00", "39"], ["400", "599"], ["6000", "8999"], ["90000", "99999"]]
  },
  "986": {
    "name": "Taiwan, China",
    "ranges": [["00", "11"], ["120", "559"], ["5600", "7999"], ["80000", "99999"]]
  },
  "987": {
    "name": "Argentina",
    "ranges": [["00", "09"], ["1000", "1999"], ["20000", "29999"], ["30", "49"], ["500", "899"], ["9000", "9499"], ["95000", "99999"]]
  },
  "988": {
    "name": "Hongkong",
    "ranges": [["00", "16"], ["17000", "19999"], ["200", "799"], ["8000", "9699"], ["97000", "99999"]]
  },
  "989": {
    "name": "Portugal",
    "ranges": [["0", "1"], ["20", "54"], ["550", "799"], ["8000", "9499"], ["95000", "99999"]]
  },
  "9933": {
    "name": "Syria",
    "ranges": [["0", "0"], ["10", "39"], ["400", "899"], ["9000", "9999"]]
  },
  "9934": {
    "name": "Latvia",
    "ranges": [["0", "0"], ["10", "49"], ["500", "799"], ["8000", "9999"]]
  },
  "9935": {
    "name": "Iceland",
    "ranges": [["0", "0"], ["10", "39"], ["400", "899"], ["9000", "9999"]]
  },
  "9936": {
    "name": "Afghanistan",
    "ranges": [["0", "1"], ["20", "39"], ["400", "799"], ["8000", "9999"]]
  },
  "9937": {
    "name": "Nepal",
    "ranges": [["0", "2"], ["30", "49"], ["500", "799"], ["8000", "9999"]]
  },
  "9938": {
    "name": "Tunisia",
    "ranges": [["00", "79"], ["800", "949"], ["9500", "9999"]]
  },
  "9939": {
    "name": "Armenia",
    "ranges": [["0", "4"], ["50", "79"], ["800", "899"], ["9000", "9999"]]
  },
  "9940": {
    "name": "Montenegro",
    "ranges": [["0", "1"], ["20", "49"], ["500", "899"], ["9000", "9999"]]
  },
  "9941": {
    "name": "Georgia",
    "ranges": [["0", "0"], ["10", "39"], ["400", "899"], ["9000", "9999"]]
  },
  "9942": {
    "name": "Ecuador",
    "ranges": [["00", "89"], ["900", "994"], ["9950", "9999"]]
  },
  "9943": {
    "name": "Uzbekistan",
    "ranges": [["00", "29"], ["300", "399"], ["4000", "9999"]]
  },
  "9944": {
    "name": "Turkey",
    "ranges": [["0", "2"], ["300", "499"], ["5000", "5999"], ["60", "89"], ["900", "999"]]
  },
  "9945": {
    "name": "Dominican Republic",
    "ranges": [["00", "00"], ["010", "079"], ["08", "39"], ["400", "569"], ["57", "57"], ["580", "849"], ["8500", "9999"]]
  },
  "9946": {
    "name": "Korea, P.D.R.",
    "ranges": [["0", "1"], ["20", "39"], ["400", "899"], ["9000", "9999"]]
  },
  "9947": {
    "name": "Algeria",
    "ranges": [["0", "1"], ["20", "79"], ["800", "999"]]
  },
  "9948": {
    "name": "United Arab Emirates",
    "ranges": [["00", "39"], ["400", "849"], ["8500", "9999"]]
  },
  "9949": {
    "name": "Estonia",
    "ranges": [["0", "0"], ["10", "39"], ["400", "899"], ["9000", "9999"]]
  },
  "9950": {
    "name": "Palestine",
    "ranges": [["00", "29"], ["300", "840"], ["8500", "9999"]]
  },
  "9951": {
    "name": "Kosova",
    "ranges": [["00", "39"], ["400", "849"], ["8500", "9999"]]
  },
  "9952": {
    "name": "Azerbaijan",
    "ranges": [["0", "1"], ["20", "39"], ["400", "799"], ["8000", "9999"]]
  },
  "9953": {
    "name": "Lebanon",
    "ranges": [["0", "0"], ["10", "39"], ["400", "599"], ["60", "89"], ["9000", "9999"]]
  },
  "9954": {
    "name": "Morocco",
    "ranges": [["0", "1"], ["20", "39"], ["400", "799"], ["8000", "9999"]]
  },
  "9955": {
    "name": "Lithuania",
    "ranges": [["00", "39"], ["400", "929"], ["9300", "9999"]]
  },
  "9956": {
    "name": "Cameroon",
    "ranges": [["0", "0"], ["10", "39"], ["400", "899"], ["9000", "9999"]]
  },
  "9957": {
    "name": "Jordan",
    "ranges": [["00", "39"], ["400", "699"], ["70", "84"], ["8500", "9999"]]
  },
  "9958": {
    "name": "Bosnia and Herzegovina",
    "ranges": [["0", "0"], ["10", "49"], ["500", "899"], ["9000", "9999"]]
  },
  "9959": {
    "name": "Libya",
    "ranges": [["0", "1"], ["20", "79"], ["800", "949"], ["9500", "9999"]]
  },
  "9960": {
    "name": "Saudi Arabia",
    "ranges": [["00", "59"], ["600", "899"], ["9000", "9999"]]
  },
  "9961": {
    "name": "Algeria",
    "ranges": [["0", "2"], ["30", "69"], ["700", "949"], ["9500", "9999"]]
  },
  "9962": {
    "name": "Panama",
    "ranges": [["00", "54"], ["5500", "5599"], ["56", "59"], ["600", "849"], ["8500", "9999"]]
  },
  "9963": {
    "name": "Cyprus",
    "ranges": [["0", "2"], ["30", "54"], ["550", "749"], ["7500", "9999"]]
  },
  "9964": {
    "name": "Ghana",
    "ranges": [["0", "6"], ["70", "94"], ["950", "999"]]
  },
  "9965": {
    "name": "Kazakhstan",
    "ranges": [["00", "39"], ["400", "899"], ["9000", "9999"]]
  },
  "9966": {
    "name": "Kenya",
    "ranges": [["000", "199"], ["20", "69"], ["7000", "7499"], ["750", "959"], ["9600", "9999"]]
  },
  "9967": {
    "name": "Kyrgyzstan",
    "ranges": [["00", "39"], ["400", "899"], ["9000", "9999"]]
  },
  "9968": {
    "name": "Costa Rica",
    "ranges": [["00", "49"], ["500", "939"], ["9400", "9999"]]
  },
  "9970": {
    "name": "Uganda",
    "ranges": [["00", "39"], ["400", "899"], ["9000", "9999"]]
  },
  "9971": {
    "name": "Singapore",
    "ranges": [["0", "5"], ["60", "89"], ["900", "989"], ["9900", "9999"]]
  },
  "9972": {
    "name": "Peru",
    "ranges": [["00", "09"], ["1"], ["200", "249"], ["2500", "2999"], ["30", "59"], ["600", "899"], ["9000", "9999"]]
  },
  "9973": {
    "name": "Tunisia",
    "ranges": [["00", "05"], ["060", "089"], ["0900", "0999"], ["10", "69"], ["700", "969"], ["9700", "9999"]]
  },
  "9974": {
    "name": "Uruguay",
    "ranges": [["0", "2"], ["30", "54"], ["550", "749"], ["7500", "9499"], ["95", "99"]]
  },
  "9975": {
    "name": "Moldova",
    "ranges": [["0", "0"], ["100", "399"], ["4000", "4499"], ["45", "89"], ["900", "949"], ["9500", "9999"]]
  },
  "9976": {
    "name": "Tanzania",
    "ranges": [["0", "5"], ["60", "89"], ["900", "989"], ["9990", "9999"]]
  },
  "9977": {
    "name": "Costa Rica",
    "ranges": [["00", "89"], ["900", "989"], ["9900", "9999"]]
  },
  "9978": {
    "name": "Ecuador",
    "ranges": [["00", "29"], ["300", "399"], ["40", "94"], ["950", "989"], ["9900", "9999"]]
  },
  "9979": {
    "name": "Iceland",
    "ranges": [["0", "4"], ["50", "64"], ["650", "659"], ["66", "75"], ["760", "899"], ["9000", "9999"]]
  },
  "9980": {
    "name": "Papua New Guinea",
    "ranges": [["0", "3"], ["40", "89"], ["900", "989"], ["9900", "9999"]]
  },
  "9981": {
    "name": "Morocco",
    "ranges": [["00", "09"], ["100", "159"], ["1600", "1999"], ["20", "79"], ["800", "949"], ["9500", "9999"]]
  },
  "9982": {
    "name": "Zambia",
    "ranges": [["00", "79"], ["800", "989"], ["9900", "9999"]]
  },
  "9983": {
    "name": "Gambia",
    "ranges": [["80", "94"], ["950", "989"], ["9900", "9999"]]
  },
  "9984": {
    "name": "Latvia",
    "ranges": [["00", "49"], ["500", "899"], ["9000", "9999"]]
  },
  "9985": {
    "name": "Estonia",
    "ranges": [["0", "4"], ["50", "79"], ["800", "899"], ["9000", "9999"]]
  },
  "9986": {
    "name": "Lithuania",
    "ranges": [["00", "39"], ["400", "899"], ["9000", "9399"], ["940", "969"], ["97", "99"]]
  },
  "9987": {
    "name": "Tanzania",
    "ranges": [["00", "39"], ["400", "879"], ["8800", "9999"]]
  },
  "9988": {
    "name": "Ghana",
    "ranges": [["0", "2"], ["30", "54"], ["550", "749"], ["7500", "9999"]]
  },
  "9989": {
    "name": "Macedonia",
    "ranges": [["0", "0"], ["100", "199"], ["2000", "2999"], ["30", "59"], ["600", "949"], ["9500", "9999"]]
  },
  "99901": {
    "name": "Bahrain",
    "ranges": [["00", "49"], ["500", "799"], ["80", "99"]]
  },
  "99902": {
    "name": "Gabon - no ranges fixed yet",
    "ranges": []
  },
  "99903": {
    "name": "Mauritius",
    "ranges": [["0", "1"], ["20", "89"], ["900", "999"]]
  },
  "99904": {
    "name": "Netherlands Antilles; Aruba, Neth. Ant",
    "ranges": [["0", "5"], ["60", "89"], ["900", "999"]]
  },
  "99905": {
    "name": "Bolivia",
    "ranges": [["0", "3"], ["40", "79"], ["800", "999"]]
  },
  "99906": {
    "name": "Kuwait",
    "ranges": [["0", "2"], ["30", "59"], ["600", "699"], ["70", "89"], ["9", "9"]]
  },
  "99908": {
    "name": "Malawi",
    "ranges": [["0", "0"], ["10", "89"], ["900", "999"]]
  },
  "99909": {
    "name": "Malta",
    "ranges": [["0", "3"], ["40", "94"], ["950", "999"]]
  },
  "99910": {
    "name": "Sierra Leone",
    "ranges": [["0", "2"], ["30", "89"], ["900", "999"]]
  },
  "99911": {
    "name": "Lesotho",
    "ranges": [["00", "59"], ["600", "999"]]
  },
  "99912": {
    "name": "Botswana",
    "ranges": [["0", "3"], ["400", "599"], ["60", "89"], ["900", "999"]]
  },
  "99913": {
    "name": "Andorra",
    "ranges": [["0", "2"], ["30", "35"], ["600", "604"]]
  },
  "99914": {
    "name": "Suriname",
    "ranges": [["0", "4"], ["50", "89"], ["900", "949"]]
  },
  "99915": {
    "name": "Maldives",
    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
  },
  "99916": {
    "name": "Namibia",
    "ranges": [["0", "2"], ["30", "69"], ["700", "999"]]
  },
  "99917": {
    "name": "Brunei Darussalam",
    "ranges": [["0", "2"], ["30", "89"], ["900", "999"]]
  },
  "99918": {
    "name": "Faroe Islands",
    "ranges": [["0", "3"], ["40", "79"], ["800", "999"]]
  },
  "99919": {
    "name": "Benin",
    "ranges": [["0", "2"], ["300", "399"], ["40", "69"], ["900", "999"]]
  },
  "99920": {
    "name": "Andorra",
    "ranges": [["0", "4"], ["50", "89"], ["900", "999"]]
  },
  "99921": {
    "name": "Qatar",
    "ranges": [["0", "1"], ["20", "69"], ["700", "799"], ["8", "8"], ["90", "99"]]
  },
  "99922": {
    "name": "Guatemala",
    "ranges": [["0", "3"], ["40", "69"], ["700", "999"]]
  },
  "99923": {
    "name": "El Salvador",
    "ranges": [["0", "1"], ["20", "79"], ["800", "999"]]
  },
  "99924": {
    "name": "Nicaragua",
    "ranges": [["0", "1"], ["20", "79"], ["800", "999"]]
  },
  "99925": {
    "name": "Paraguay",
    "ranges": [["0", "3"], ["40", "79"], ["800", "999"]]
  },
  "99926": {
    "name": "Honduras",
    "ranges": [["0", "0"], ["10", "59"], ["600", "999"]]
  },
  "99927": {
    "name": "Albania",
    "ranges": [["0", "2"], ["30", "59"], ["600", "999"]]
  },
  "99928": {
    "name": "Georgia",
    "ranges": [["0", "0"], ["10", "79"], ["800", "999"]]
  },
  "99929": {
    "name": "Mongolia",
    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
  },
  "99930": {
    "name": "Armenia",
    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
  },
  "99931": {
    "name": "Seychelles",
    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
  },
  "99932": {
    "name": "Malta",
    "ranges": [["0", "0"], ["10", "59"], ["600", "699"], ["7", "7"], ["80", "99"]]
  },
  "99933": {
    "name": "Nepal",
    "ranges": [["0", "2"], ["30", "59"], ["600", "999"]]
  },
  "99934": {
    "name": "Dominican Republic",
    "ranges": [["0", "1"], ["20", "79"], ["800", "999"]]
  },
  "99935": {
    "name": "Haiti",
    "ranges": [["0", "2"], ["7", "8"], ["30", "59"], ["600", "699"], ["90", "99"]]
  },
  "99936": {
    "name": "Bhutan",
    "ranges": [["0", "0"], ["10", "59"], ["600", "999"]]
  },
  "99937": {
    "name": "Macau",
    "ranges": [["0", "1"], ["20", "59"], ["600", "999"]]
  },
  "99938": {
    "name": "Srpska",
    "ranges": [["0", "1"], ["20", "59"], ["600", "899"], ["90", "99"]]
  },
  "99939": {
    "name": "Guatemala",
    "ranges": [["0", "5"], ["60", "89"], ["900", "999"]]
  },
  "99940": {
    "name": "Georgia",
    "ranges": [["0", "0"], ["10", "69"], ["700", "999"]]
  },
  "99941": {
    "name": "Armenia",
    "ranges": [["0", "2"], ["30", "79"], ["800", "999"]]
  },
  "99942": {
    "name": "Sudan",
    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
  },
  "99943": {
    "name": "Alsbania",
    "ranges": [["0", "2"], ["30", "59"], ["600", "999"]]
  },
  "99944": {
    "name": "Ethiopia",
    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
  },
  "99945": {
    "name": "Namibia",
    "ranges": [["0", "5"], ["60", "89"], ["900", "999"]]
  },
  "99946": {
    "name": "Nepal",
    "ranges": [["0", "2"], ["30", "59"], ["600", "999"]]
  },
  "99947": {
    "name": "Tajikistan",
    "ranges": [["0", "2"], ["30", "69"], ["700", "999"]]
  },
  "99948": {
    "name": "Eritrea",
    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
  },
  "99949": {
    "name": "Mauritius",
    "ranges": [["0", "1"], ["20", "89"], ["900", "999"]]
  },
  "99950": {
    "name": "Cambodia",
    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
  },
  "99951": {
    "name": "Congo - no ranges fixed yet",
    "ranges": []
  },
  "99952": {
    "name": "Mali",
    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
  },
  "99953": {
    "name": "Paraguay",
    "ranges": [["0", "2"], ["30", "79"], ["800", "999"]]
  },
  "99954": {
    "name": "Bolivia",
    "ranges": [["0", "2"], ["30", "69"], ["700", "999"]]
  },
  "99955": {
    "name": "Srpska",
    "ranges": [["0", "1"], ["20", "59"], ["600", "899"], ["90", "99"]]
  },
  "99956": {
    "name": "Albania",
    "ranges": [["00", "59"], ["600", "999"]]
  },
  "99957": {
    "name": "Malta",
    "ranges": [["0", "1"], ["20", "79"], ["800", "999"]]
  },
  "99958": {
    "name": "Bahrain",
    "ranges": [["0", "4"], ["50", "94"], ["950", "999"]]
  },
  "99959": {
    "name": "Luxembourg",
    "ranges": [["0", "2"], ["30", "59"], ["600", "999"]]
  },
  "99960": {
    "name": "Malawi",
    "ranges": [["0", "0"], ["10", "94"], ["950", "999"]]
  },
  "99961": {
    "name": "El Salvador",
    "ranges": [["0", "3"], ["40", "89"], ["900", "999"]]
  },
  "99962": {
    "name": "Mongolia",
    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
  }
};
