function ddg_spice_bitcoin_chart(data) {
    var res;
    
    items = [];
    items[0] = [];
    items[0].a = '<section><img alt="bitcoin chart" src=https://s3-eu-west-1.amazonaws.com/btc.convert/usd_chart.png ></section><br>';
    items[0].h = 'Mt. Gox BTC to USD 5 Day Chart';
    items[0].i = 'https://s3-eu-west-1.amazonaws.com/btc.convert/1TiPS_small.png';
    
    // Source name and url for the More at X link.
    items[0].s = 'BitcoinCharts.com';
    items[0].u = 'http://www.bitcoincharts.com/charts/mtgoxUSD#rg5zigHourlyztgTzm1g10zm2g25zv';
    
    // Keep Answer Window Open to Full
    items[0].force_no_fold = 1;
    items[0].force_big_header = true;
    // The rendering function is nra.
    nra(items);
}
