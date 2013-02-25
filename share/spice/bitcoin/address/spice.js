function ddg_spice_bitcoin_address(response) {
    var query = decodeURIComponent(rq);
    query = query.replace(/ ?(btc|bitcoins?)( address( of)?)? ?/gi, '')

    function format_bitcoin_from_satoshi(balance) {
        var balance = balance/100000000;
        var parts = balance.toString().split('.');
        balance = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                + (parts[1] ? '.' + parts[1] : '');
        return balance + ' ฿';
    }

    var balance = format_bitcoin_from_satoshi(response.final_balance);
    var total_received = format_bitcoin_from_satoshi(response.total_received);
    var total_sent = format_bitcoin_from_satoshi(response.total_sent);

    var address_tag = '';
    response.txs.map(
        function (tx) {
            if (tx.out[0].addr_tag != undefined)
                address_tag = tx.out[0].addr_tag;
        }
    );

    var answer = '<table>'
               + (address_tag != '' ?
                       '<tr><th colspan="2">' + address_tag + '</th></tr>' : '')
               + '<tr><td>No. Transactions:</td>'
               + '<td>' + response.n_tx + '</td></tr>'
               + '<tr><td>Total Received:</td>'
               + '<td class="bitcoin-balance">' + total_received + '</td></tr>'
               + '<tr><td>Total Sent:</td>'
               + '<td class="bitcoin-balance">' + total_sent + '</td></tr>'
               + '<tr><td>Final Balance:</td>'
               + '<td class="bitcoin-balance">' + balance + '</td></tr>'
               + '</table>';

	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = answer;
	items[0]['h'] = query + " (Bitcoin Address)";
	items[0]['s'] = 'blockchain.info';
	items[0]['u'] = 'http://blockchain.info/address/' + query;
    items[0]["force_big_header"] = true;
	
	nra(items);
}
