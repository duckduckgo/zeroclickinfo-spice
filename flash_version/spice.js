function nrfl() 
{
  var zc_data = []
	zc_data[0] = []

  zc_data[0]['h'] = "Your Flash Player version";  
  
  if(YAHOO.util.FlashDetect.installed) {
    zc_data[0]['a'] = "Flash version: " + YAHOO.util.FlashDetect.major + "." + YAHOO.util.FlashDetect.minor + "." + YAHOO.util.FlashDetect.revision;
  }
  else {
    zc_data[0]['a'] = "Flash is no installed";
  }

  nra(zc_data);
}

nrfl();