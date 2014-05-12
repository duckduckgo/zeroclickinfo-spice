# DuckDuckHack in Public Beta

The new version of DuckDuckGo has launched public beta.

The DuckDuckHack platform is undergoing changes to support the new
features, and you can help!

The focus so far has been on the zeroclickinfo-spice API which has changed in some
significant ways.  At DuckDuckGo we have converted many of the Spice Instant
Answers, but there is still much to do!

Over the next few days, we will make a series of posts walking through in
detail the anatomy of a Spice, and creating issues in the zeroclickinfo-spice
repo tagged with `bttf`.

If you want to jump in, see the list below for the current status of each of
the Spice Instant Answers. A great way to start is to look at the examples
below that are working.

## Primary Examples

These examples take full advantage of the new version of DuckDuckGo. 

- `in_theaters`
- `maps`
- `movie`
- `news` (internal)
- `quixey` (apps)
- `recipes`
- `videos` (internal)
- `zipcode`

## Complete

These have been converted and are in good shape.

- `amazon`
- `alternative_to`
- `automeme`
- `bbc`
- `bitcoin`
- `bootic`
- `brainy_quote`
- `chuck_norris`
- `code_search`
- `congress` Could use photos.
- `coupon_mountain` Needs better images.
- `detect_lang`
- `dictionary`
- `dns`
- `drinks`
- `expand_url`
- `flash_version`
- `forecast`
- `github`
- `github_jobs`
- `gravatar`
- `hackage`
- `is_it_up`
- `lastfm_artist_all` needs top tracks
- `meta_cpan`
- `npm`
- `rand_word`
- `reddit`
- `ruby_gems`
- `septa` needs visual redesign
- `songkick_artists`
- `sound_cloud`
- `stopwatch`
- `urban_dictionary`
- `xkcd_display`

## In Process

Still in development. Check these out, test them in DuckPAN.
This is a great place to start helping!

- `airlines` data issues
- `bible`
- `expatistan`
- `gifs`
- `google_plus`
- `hacker_news` needs visual tweaks
- `haxelib`
- `kwixer`
- `lastfm_album`
- `lastfm_top_tracks`
- `lastfm_artist_album`
- `lastfm_song`
- `mass_on_time` explore using the map view and Location model
- `open_snp`
- `plos`
- `rhymes` visual tweaks - style after `dictionary_definition` (text detail template)
- `thesaurus` needs to be styled after dictionary (text detail template)
- `twitter` needs more api data from backend


## Needs work

These IAs need some thought, more design work, or reconfiguration to bring them
up to the level expected of an instant answer on the new DuckDuckGo.

- `betterific` visual design
- `forvo`
- `guidebox_getid`
- `leak_db`
- `octopart` visual design
- `rand_nums` triggering
- `shorten`
- `today_in_history`


## On Hold

Contact us regarding these. They have various issues and we'd love it if you wanted to tackle them.
We will likely want to work with you in their conversion.

- `aur`
- `book`
- `canistreamit`
- `editor`
- `espn`
- `game_info`
- `hayoo`
- `hq_temp`
- `imdb`
- `khan_academy` overlap with videos?
- `maven`
- `search_code`
- `smbc`
- `steam_db` needs better data from api - art, etc
- `translate`
- `word_map`
- `zanran`

# HOWTO Get Involved

You can test these on the new version of DuckPAN.

1) Install DuckPAN -- see the README at https://github.com/duckduckgo/p5-app-duckpan

2) Clone DuckPAN repo: https://github.com/duckduckgo/p5-app-duckpan

3) Install beta version:

    cd ~/p5-app-duckpan
    git pull
    git checkout beta
    duckpan install
    rm ~/.duckpan/cache/*

4) Clone Spice repo: https://github.com/duckduckgo/zeroclickinfo-spice

5) Checkout bttf:

    cd ~/zeroclickinfo-spice
    git reset --hard && git pull
    git checkout bttf

6) Run the server:

    cd ~/zeroclickinfo-spice
    duckpan server

7) Try queries that trigger spice instant answers, e.g.:

- [thailand beaches images](https://next.duckduckgo.com/?q=thailand+beaches+images)
- [alternative to google](https://next.duckduckgo.com/?q=alternative+to+google)
- [duckduckgo apps](https://next.duckduckgo.com/?q=duckduckgo+apps)

The new Spice documentation is a work in progress, and you can find it here: https://duck.co/duckduckhack/spice_overview
