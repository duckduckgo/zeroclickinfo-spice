function ddg_spice_chuck_norris(res){
		if ( res['type'] == 'success');
		{		
			items = [[]];
            items[0]['h'] = 'Random Chuck Norris Joke'
            items[0]['force_big_header'] = true;
			items[0]['a'] = res['value']['joke'];
			items[0]['s'] = 'Internet Chuck Norris Database';
			items[0]['u'] = 'http://www.icndb.com/';
			nra(items,2,1);
		}
	}

