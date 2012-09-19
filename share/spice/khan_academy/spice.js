/*global d YAHOO nra */

function ddg_spice_khan_academy(res) {


  /* General */

  var state = {

    // placeholder for the videos
      vids: []

    // minimum window width to show dots
    , min_win: 500

    // default width of the navigation elements
    , thumb_width: 148
    , li_width: 148

    // height of youtube menu, used when calculating aspect ratio
    , youtube_menu: 30

    // height of the extra menu in the KA embed
    , khan_menu: 32

    // current video in nav
    , khan: 0

    // prev / next witdth
    , pn_width: 50

  }

  // Make sure a property is defined on an object
  function isProp(obj, prop) {
    prop = prop.split('.')
    for (var i = 0, len = prop.length; i < len; i++) {
      if ((obj = obj[prop[i]]) === undefined)
        return false
    }
    return true
  }

  // Cross-browser prevent default
  function preventDefault(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false
  }


  /* Navigation */

  function createNav() {

    // get main nav element
    var nav = d.getElementById('nav')
    nav.innerHTML = ''  // clear

    // container to hide extra pixels
    var gr = d.createElement('div')
    gr.id = 'gr'
    nav.appendChild(gr)

    // create frame to hold thumbnails
    // will hide overflowing elements to look like slide
    var frame = d.createElement('div')
    frame.id = 'frame'

    // store state
    var len = state.vids.length
    var end = state.li_width * len

    // create list of videos
    var ul = d.createElement('ul')
    ul.id = 'slides'
    YAHOO.util.Dom.setStyle(ul, 'width', end + 'px')

    var i, li, img, a, id, vid, p, txt
    for (i = 0; i < len; i++) {
      li = d.createElement('li')
      YAHOO.util.Dom.addClass(li, 'item')
      YAHOO.util.Dom.setStyle(li, 'width', (state.li_width - 2) + 'px')

      vid = state.vids[i]
      if (!isProp(vid, 'id.$t')) continue
      id = vid.id.$t.split(':').pop()

      a = d.createElement('a')
      a.href = 'http://khanacademy.org/video?v=' + id

      YAHOO.util.Event.addListener(a, 'click', clickA(id))

      img = d.createElement('img')
      if (!isProp(vid, 'media$group.media$thumbnail')) continue
      img.src = vid.media$group.media$thumbnail[0].url

      p = d.createElement('p')
      if (!isProp(vid, 'title.$t')) continue
      txt = d.createTextNode(vid.title.$t)
      p.appendChild(txt)

      a.appendChild(img)
      a.appendChild(p)

      li.appendChild(a)
      ul.appendChild(li)
    }

    frame.appendChild(ul)
    nav.appendChild(frame)

    // add the prev / next arrows
    makeNav('>', 'nexta', true)
    makeNav('<', 'preva', false)

  }

  // Close around clicking thumbs
  function clickA(id) {
    return function (e) {
      preventDefault(e)
      var ul = d.getElementById('slides')
      var j = 0, len = ul.childNodes.length
      for (; j < len; j++) {
        YAHOO.util.Dom.removeClass(ul.childNodes[j], 'sel')
      }
      YAHOO.util.Dom.addClass(this.parentNode, 'sel')
      addVid(id)
    }
  }

  // Make prev / next arrows
  function makeNav(txt, id, next) {
    var na = d.createElement('a')
    na.appendChild(d.createTextNode(txt))
    na.href = '#'
    na.id = id
    YAHOO.util.Dom.addClass(na, 'npa')
    YAHOO.util.Event.addListener(na, 'click', wrapCB(next))
    nav.appendChild(na)
  }

  // Click handler for prev / next arrows
  function wrapCB(next) {
    return function (e) {
      preventDefault(e)

      if (state.khan === 0 && !next) return
      if (state.khan === state.last && next) return

      state.khan += (next ? 1 : -1) * state.inc

      // edge conditions when resizing
      if (state.khan < 0) state.khan = 0
      if (state.khan > state.last) state.khan = state.last

      doNav(state.khan / state.inc)
    }
  }

  // Invoke common nav methods
  function doNav(i) {
    setSlides()
    pnClasses()
    highlightDot(i)
  }

  // Slide the thumbnails around
  function setSlides() {
    var mar = '-' + (state.khan * state.li_width) + 'px'
    YAHOO.util.Dom.setStyle('slides', 'margin-left', mar)
  }

  // Set styling on previous / next buttons
  function pnClasses() {
    if (state.khan > 0) YAHOO.util.Dom.removeClass('preva', 'npah')
    else YAHOO.util.Dom.addClass('preva', 'npah')

    if (state.khan < state.last) YAHOO.util.Dom.removeClass('nexta', 'npah')
    else YAHOO.util.Dom.addClass('nexta', 'npah')
  }

  // Highlight the appropriate dot
  function highlightDot(j) {
    var dots = d.getElementById('dots')
    var n = Math.ceil(state.vids.length / state.inc)

    if (n > 4 && state.win < state.min_win)  // small screen
      return showPage(dots, n)

    dots = dots.childNodes
    var l = dots.length
    var k = 0
    for (; k < l; k++) YAHOO.util.Dom.removeClass(dots[k], 'selected')
    YAHOO.util.Dom.addClass(dots[j], 'selected')
  }

  // Close around dot handler
  function dotHandler(j) {
    return function (e) {
      preventDefault(e)
      state.khan = j * state.inc
      doNav(j)
    }
  }

  // Show page numbers
  function showPage(dots, n) {
    var sel = state.khan / state.inc
    var p = d.createElement('p')
    YAHOO.util.Dom.addClass(p, 'page')
    p.appendChild(d.createTextNode((sel + 1) + '/' + n))
    dots.innerHTML = ''  // clear
    dots.appendChild(p)
  }

  // Make the dots
  function makeDots() {
    var dots = d.getElementById('dots')
    if (!dots) {
      dots = d.createElement('p')
      dots.id = 'dots'
      div.appendChild(dots)
    }
    var lin, j = 0, n = Math.ceil(state.vids.length / state.inc)
    var sel = state.khan / state.inc

    if (n > 4 && state.win < state.min_win)  // at most 4 dots on small screens
      return showPage(dots, n)

    dots.innerHTML = ''  // clear
    for (; j < n; j++) {
      lin = d.createElement('a')
      lin.appendChild(d.createTextNode('\u2022'))
      lin.href = '#'
      if (j === sel) YAHOO.util.Dom.addClass(lin, 'selected')
      YAHOO.util.Event.addListener(lin, 'click', dotHandler(j))
      dots.appendChild(lin)
    }
  }


  /* Video Embed */

  // Add video to screen
  function addVid(id) {
    var ne
    if (!id) {
      ne = d.getElementById('ne')
      if (!ne) return
      id = YAHOO.util.Dom.getAttribute(ne, 'vid')
    }
    ne = d.createElement('iframe')
    ne.id = 'ne'
    ne.src = 'http://www.khanacademy.org/embed_video?v=' + id
    YAHOO.util.Dom.setStyle(ne, 'width', '100%')
    YAHOO.util.Dom.setStyle(ne, 'height', '100%')
    YAHOO.util.Dom.setAttribute(ne, 'vid', id)
    YAHOO.util.Dom.setAttribute(ne, 'allowFullScreen', true)
    YAHOO.util.Dom.setAttribute(ne, 'webkitAllowFullScreen', true)
    YAHOO.util.Dom.setAttribute(ne, 'mozallowfullscreen', true)
    YAHOO.util.Dom.setAttribute(ne, 'scrolling', 'no')
    ne.frameBorder = 0

    var emb = d.getElementById('emb')
    emb.innerHTML = ''  // clear
    emb.appendChild(ne)
    YAHOO.util.Dom.setStyle('emb', 'display', 'block')
  }


  /* Main plugin entry point */

  function setup() {

    // store window width
    state.win = YAHOO.util.Dom.getRegion('nav').width

    // 16/9 Aspect Ratio + menu
    var hei = Math.floor(state.win * 0.5625)
    hei += state.youtube_menu + state.khan_menu
    YAHOO.util.Dom.setStyle('emb', 'height', hei + 'px')

    var frame_width = state.win - state.pn_width

    // increment by how many thumbs
    state.inc = Math.floor(frame_width / state.thumb_width)

    // stretch li to fit max
    var extra = frame_width - (state.thumb_width * state.inc)
    state.li_width = state.thumb_width + Math.floor(extra / state.inc)

    // hide extras pixels
    var hide = extra % state.inc
    YAHOO.util.Dom.setStyle('gr', 'width', hide + 'px')

    // last video
    var linc = state.vids.length % state.inc
    state.last = Math.max(0, state.vids.length - (linc ? linc : state.inc))

    // whole states
    state.khan -= state.khan % state.inc

    // add the navigation
    createNav()

    // moves the slide to their current position
    setSlides()

    // style for prev / next
    pnClasses()

    // add the dots
    makeDots()

    // resize current video
    addVid()

    // listen for window resizes
    YAHOO.util.Event.addListener(window, 'resize', function () {
      clearTimeout(state.resize)
      state.resize = setTimeout(setup, 400)  // tune
    })

  }

  // If we have a videos to display
  if (res && isProp(res, 'feed.entry') && res.feed.entry.length > 0) {

    // store the videos
    state.vids = res.feed.entry

    // main container
    var div = d.createElement('div')
    div.id = 'khan'

    // container for the video embed, initially hidden
    var emb = d.createElement('div')
    emb.id = 'emb'
    div.appendChild(emb)

    // container for navigation
    var nav = d.createElement('div')
    nav.id = 'nav'
    div.appendChild(nav)

    // set more at link
    var u = 'http://khanacademy.org/'
    if (isProp(res, 'feed.title.$t')) {
      var q = res.feed.title.$t.split(': ')[1]
      if (q) u += 'search?page_search_query=' + q.replace(/\s/g, '+')
    }

    // ddg: add to page
    var items = [{
      f: 1,
      a: div,
      h: 'Khan Academy Videos',
      s: 'Khan Academy',
      u: u,
      force_big_header: true
    }]
    nra(items, 0, true)

    // start spice
    setup()

  }

}