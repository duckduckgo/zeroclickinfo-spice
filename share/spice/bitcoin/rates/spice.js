function ddg_spice_bitcoin_rates(data) {
    var img, snippet, link, div, convert_to, initial, new_value, origin, qr, res, divd, symb1, symb2;
    var query = decodeURIComponent(rq);
    
    qr = query.split(' ');
    initial = qr[0];
    origin = qr[1];
    convert_to = qr[3];
    
    if (isNaN(initial)) {
        items = [];
        items[0] = [];
        items[0].a = '<section><img alt="bitcoin chart" src=https://s3-eu-west-1.amazonaws.com/btc.convert/usd_chart.png ></section><br>';
        items[0].h = 'Mt. Gox BTC to USD 5 Day Chart';
        items[0].i = data.qr;
        
        // Source name and url for the More at X link.
        items[0].s = 'BTC on DDG';
        items[0].u = 'http://174.129.229.21';
        
        // Keep Answer Window Open to Full
        items[0].force_no_fold = 1;
        items[0].force_big_header = true;
        // The rendering function is nra.
        nra(items);
    } if (origin === 'btc') {
        new_value = initial * data[convert_to].value;
        new_value = Math.round(new_value * Math.pow(10, 2)) / Math.pow(10, 2);
        symb1 = data.thb.hex;
        symb2 = data[convert_to].hex;
    } else {
        new_value = initial / data[origin].value;
        new_value = Math.round(new_value * Math.pow(10, 8)) / Math.pow(10, 8);
        symb1 = data[origin].hex;
        symb2 = datathb.hex;
    }
    res = '<section>' + symb1 + ' ' + qr[0] + ' ' + origin + ' is equal to ' + symb2 + ' ' + new_value + ' ' + convert_to + '</section><br>';
    
    items = [];
    items[0] = [];
    items[0].a = res;
    items[0].h = 'Bitcoin Currency Conversion';
    items[0].i = data.qr;
    
    // Source name and url for the More at X link.
    items[0].s = 'BTC on DDG';
    items[0].u = 'http://174.129.229.21';
    
    // Keep Answer Window Open to Full
    items[0].force_no_fold = 1;
    items[0].force_big_header = true;
    // The rendering function is nra.
    nra(items);
}
