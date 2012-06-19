package DDG::Spice::ExpandURL;
# ABSTRACT: Gives expanded url of the query

use DDG::Spice;

spice to => 'http://api.longurl.org/v2/expand?url=$1&format=json&callback={{callback}}';

triggers query => qr/^expand\s(.*)|^https?:\/\/((?=[0123467abcdefghijklmnopqrstuvwxyz])(?:1(?:link\.in|url\.com)|2(?:\.gp|big\.at|tu\.us)|3(?:\.ly|07\.to)|4(?:ms\.me|sq\.com|url\.cc)|a(?:\.(?:gg|nf)|d(?:\.vu|f\.ly|jix\.com)|l(?:l\.fuse|t)url\.com|r(?:\.gy|st\.ch)|a\.cx|bcurl\.net|(?:fx|zc)\.cc|mzn\.to|tu\.ca)|b(?:2(?:3\.ru|l\.me)|i(?:nged\.it|t\.ly|zj\.us)|(?:acn|loat)\.me|cool\.bz|(?:ravo|sa)\.ly|udurl\.com)|c(?:h(?:ilp\.it|zb\.gr)|l(?:\.l[ky]|i(?:c(?:cami\.info|kthru\.ca)|\.gs)|ck\.ru|op\.in)|o(?:nta\.cc|rt\.as|t\.ag)|anurl\.com|rks\.me|(?:tvr|utt)\.us)|d(?:i(?:g(?:bi)?g\.com|sq\.us)|l(?:d\.bz|vr\.it)|o(?:\.my|iop\.com|pen\.us)|ai\.ly|b\.tt|ecenturl\.com|fl8\.me)|e(?:asyur(?:i\.com|l\.net)|(?:epurl|weri)\.com)|f(?:a(?:\.by|v\.me)|b(?:share)?\.me|f(?:\.im|f\.to)|ir(?:sturl\.(?:de|net)|e\.to)|l(?:ic\.kr|(?:q\.u|y2\.w)s)|u(?:seurl\.com|zzy\.to)|w(?:d4\.me|ib\.net)|on\.gs|reak\.to)|g(?:o(?:\.(?:(?:9nl|ign)\.com|usa\.gov)|o\.gl|shrink\.com)|\.ro\.lt|izmo\.do|l\.am|url\.es)|h(?:u(?:rl\.(?:me|ws)|ff\.to|lu\.com)|ex\.io|(?:iderefer|sblinks)\.com|mm\.ph|ref\.in|txt\.it)|i(?:canhaz\.com|(?:dek\.ne|x\.l)t|lix\.in|s\.gd|ts\.my)|j(?:\.mp|ijr\.com)|k(?:l(?:\.am|ck\.me)|orta\.nu|runchd\.com)|l(?:i(?:nkb(?:ee\.com|un\.ch)|ip\.to|fehac\.kr|ltext\.com|url\.cn)|n(?:\-s\.(?:net|ru)|k(?:\.(?:gd|ms)|d\.in|url\.com))|9k\.net|at\.ms|ru\.jp|t\.tl|url\.no)|m(?:a(?:cte\.ch|sh\.to)|e(?:\.lt|lt\.li|rky\.de)|i(?:n(?:iurl\.com|url\.fr)|gre\.me)|o(?:by\.to|ourl\.com)|y(?:loc\.me|url\.in)|ke\.me|rte\.ch)|n(?:b(?:c\.co|lo\.gs)|ot(?:\.my|long\.com)|\.pr|n\.nf|(?:sfw|xy)\.in|utshellurl\.com|yti\.ms)|o(?:m(?:\.ly|f\.gd|oikane\.net)|n(?:\.(?:cnn\.com|mktw\.net)|forb\.es)|\-x\.fr|c1\.us|rz\.se|w\.ly)|p(?:o(?:liti\.co|st\.ly)|(?:ing\.f|(?:titurl|ub\.vitrue)\.co)m|li\.gs|nt\.me|p\.gg|rofile\.to)|q(?:lnk\.net|te\.me|u\.tc|y\.fi)|r(?:e(?:a(?:d(?:\.bi|this\.ca)|llytinyurl\.com)|dir(?:\.ec|ects\.ca|x\.com)|twt\.me)|i(?:\.ms|ckroll\.it|z\.gd)|u(?:\.ly|byurl\.com|rl\.org)|\.im|b6\.me|t\.nu|ww\.tw)|s(?:a(?:fe\.mn|meurl\.com)|h(?:o(?:r(?:t(?:\.(?:ie|to)|links\.co\.uk|url\.com)|l\.com)|ut\.to|w\.my)|r(?:ink(?:ify|r)\.com|t(?:\.(?:fr|st)|en\.com)|unkin\.com)|ar\.es|ink\.de)|m(?:allr\.com|(?:sh\.|url\.na)me)|n(?:ip(?:r|url)\.com|(?:\.i|url\.co)m)|p(?:2\.ro|edr\.com)|r(?:nk\.net|s\.li)|u(?:rl\.(?:co\.uk|hu)|\.pr)|4c\.in|(?:7y|dut)\.us|(?:elnd|(?:im|tart)url)\.com|late\.me)|t(?:\.(?:c[no]|lh\.com)|gr\.(?:me|ph)|i(?:n(?:y(?:\.(?:cc|ly|pl)|ur(?:i\.ca|l\.com)|link\.in)|iuri\.com)|ghturl\.com)|n(?:ij\.org|w\.to|y\.com)|o(?:\.(?:ly)?|(?:goto|tc|ysr)\.us)|r(?:\.im|a\.kz|unc\.it)|w(?:i(?:t(?:terurl\.(?:net|org)|clicks\.com|url\.de)|rl\.at)|url\.(?:cc|nl)|hub\.com)|[al]\.gd|(?:bd|pm)\.ly|crn\.ch|k\.|mi\.me)|u(?:\.(?:mavrev\.com|nu)|r(?:l(?:\.(?:az|co\.uk|ie)|b(?:org|rief)\.com|c(?:over|ut)\.com|s(?:\.i|horteningservicefortwitter\.co)m|(?:360\.m|enco\.d|x\.i)e|4\.eu|i\.nl|zen\.com)|1\.ca)|s(?:at\.l|e\.m)y|76\.org|b0\.cc|lu\.lu|pdating\.me)|v(?:b\.ly|(?:gn|l)\.am|m\.lc)|w(?:ap(?:o\.st|url\.co\.uk)|(?:55\.d|p\.m)e|ipi\.es)|x(?:r(?:l\.(?:in|us)|\.com)|url\.(?:es|jp)|\.vu)|y(?:e(?:\.pe|p\.it)|(?:\.a)?hoo\.it|(?:atuc|frog|iyd|uarel)\.com|outu\.be)|z(?:i(?:\.m[au]|pmyurl\.com)|u(?:d\.me|rl\.ws)|z(?:\.gd|ang\.kr\
)|0p\.de)|0rz\.tw|6url\.com|7\.ly)\/.*)/;

handle matches => sub {
    if ($2) {
        return $2;
    } elsif ($1) {
        my $tmp = $1;
        $tmp =~ s/https?:\/\///g;
        return $tmp;
    }
    return;
};

1;