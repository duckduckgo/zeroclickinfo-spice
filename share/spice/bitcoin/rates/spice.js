function ddg_spice_bitcoin_rates(data) {
    var img, snippet, link, div, convert_to, initial, new_value, origin, qr, res, divd, symb1, symb2;
    var query = decodeURIComponent(rq);

    qr = query.split(' ');
    initial = qr[0];
    origin = qr[1];
    convert_to = qr[3];

    if (isNaN(initial)) {

        var currency, cx, html, item, q, _i, _len, initial, new_value, symb1, symb2;



        __indexOf = [].indexOf || function (item) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (i in this && this[i] === item) return i;
            }
            return -1;
        };

        cx = ['aud', 'cad', 'chf', 'cny', 'dkk', 'eur', 'gbp', 'hkd', 'jpy', 'nok', 'nzd', 'pln', 'rub', 'sek', 'sgd', 'thb', 'usd'];

        //q = 'btc to cny';

        q = query.split(' ');

        for (_i = 0, _len = cx.length; _i < _len; _i++) {
            item = cx[_i];
            if (__indexOf.call(q, item) >= 0) {

                currency = item;
                break;
            }
        }

        new_value = 1 * data[currency].value;
        new_value = Math.round(new_value * Math.pow(10, 2)) / Math.pow(10, 2);
        symb1 = data.thb.hex + ';';
        symb2 = data[currency].hex + ';';
        
        chart_url = 'http://www.bitcoincharts.com/charts/chart.png?width=480&m=mtgox'+currency.toUpperCase()+'&SubmitButton=Draw&r=5&i=1-hour&c=0&s=&e=&Prev=&Next=&t=S&b=&a1=EMA&m1=720&a2=&m2=25&x=0&i1=&i2=&i3=&i4=&v=1&cv=0&ps=0&l=1&p=0&';
        html = '<section><img alt="bitcoin chart" src='+chart_url+' ></section><br><section>' + symb1 + '1 bitcoin is equal to ' + symb2 + new_value + ' ' + currency + '</section><br>';
        items = [];
        items[0] = [];
        items[0].a = html;
        items[0].h = 'Mt. Gox BTC 5 Day Chart';
        items[0].i = 'http://s3-eu-west-1.amazonaws.com/btc.convert/1TiPS_small.png';

        // Source name and url for the More at X link.
        items[0].s = 'Bitcoincharts.com/';
        items[0].u = 'http://www.bitcoincharts.com/';

        // Keep Answer Window Open to Full
        items[0].force_no_fold = 1;
        items[0].force_big_header = true;
        // The rendering function is nra.
        nra(items);

    }
    if (origin === 'btc') {
        new_value = initial * data[convert_to].value;
        new_value = Math.round(new_value * Math.pow(10, 2)) / Math.pow(10, 2);
        symb1 = data.thb.hex + ';';
        symb2 = data[convert_to].hex + ';';

    } else {
        initial;
        new_value = initial / data[origin].value;
        new_value = Math.round(new_value * Math.pow(10, 8)) / Math.pow(10, 8);
        symb1 = data[origin].hex + ';';
        symb2 = data.thb.hex + ';';
    }


    res = '<section>' + symb1 + qr[0] + ' ' + origin + ' is equal to ' + symb2 + new_value + ' ' + convert_to + '</section><br>';

    items = [];
    items[0] = [];
    items[0].a = res;
    items[0].h = 'Bitcoin Currency Conversion';
    items[0].i = 'http://s3-eu-west-1.amazonaws.com/btc.convert/1TiPS_small.png';

    // Source name and url for the More at X link.
    items[0].s = 'MtGox';
    items[0].u = 'https://mtgox.com/';

    // Keep Answer Window Open to Full
    items[0].force_no_fold = 1;
    items[0].force_big_header = true;
    // The rendering function is nra.
    nra(items);
}
