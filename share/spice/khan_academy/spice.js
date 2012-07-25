function ddg_spice_khan_academy(res) {

  // Make sure a property is defined on an object
  function isProp(obj, prop) {
    prop = prop.split('.')
    for (var i = 0, len = prop.length; i < len; i++) {
      if ((obj = obj[prop[i]]) === undefined)
        return false
    }
    return true
  }

  // If we have a videos to display
  if (res && isProp(res, 'feed.entry') && res.feed.entry.length > 0) {

    var LI_WIDTH = 148
    var vids = res.feed.entry

    var div = d.createElement('div')
    div.id = 'khan'

    var emb = d.createElement('div')
    emb.id = 'emb'
    YAHOO.util.Event.addListener(emb, 'click', function (e) {
      preventDefault(e)
      this.innerHTML = ''  // clear video
      YAHOO.util.Dom.setStyle('emb', 'display', 'none')
    })
    div.appendChild(emb)

    var nav = d.createElement('div')
    YAHOO.util.Dom.addClass(nav, 'nav')

    var frame = d.createElement('div')
    frame.id = 'frame'

    var len = vids.length
    var end = LI_WIDTH * len

    var ul = d.createElement('ul')
    ul.id = 'slides'
    YAHOO.util.Dom.setStyle(ul, 'width', end + 'px')

    function clickA(id) {
      return function (e) {
        preventDefault(e)

        var j = 0
        for (; j < len; j++) {
          YAHOO.util.Dom.removeClass(ul.childNodes[j], 'sel')
        }
        YAHOO.util.Dom.addClass(this.parentNode, 'sel')

        var ne = d.createElement('iframe')
        ne.src = [
            'https://www.youtube.com/embed/' + id + '?'
          , 'autoplay=1'
          , 'wmode=opaque'
          , 'iv_load_policy=3'
          , 'autohide=1'
          , 'version=3'
          , 'enablejsapi=1'
        ].join('&')

        YAHOO.util.Dom.setAttribute(ne, 'allowFullScreen', true)
        YAHOO.util.Dom.setAttribute(ne, 'webkitAllowFullScreen', true)
        YAHOO.util.Dom.setAttribute(ne, 'mozallowfullscreen', true)
        ne.frameBorder = 0

        emb.innerHTML = ''  // clear
        emb.appendChild(ne)
        YAHOO.util.Dom.setStyle('emb', 'display', 'block')
      }
    }

    var i, li, img, a, id, vid, p, txt
    for (i = 0; i < len; i++) {
      li = d.createElement('li')
      YAHOO.util.Dom.addClass(li, 'item')

      vid = vids[i]
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

    // gradient fades
    var gr = d.createElement('div')
    gr.id = 'gr'
    YAHOO.util.Dom.addClass(gr, 'grad')
    nav.appendChild(gr)

    var gl = d.createElement('div')
    gl.id = 'gl'
    YAHOO.util.Dom.addClass(gl, 'grad')
    nav.appendChild(gl)

    var win, inc, last, off = 0, off2, khanState = 0

    function pnClasses() {
      if (khanState > 0) YAHOO.util.Dom.removeClass('preva', 'npah')
      else YAHOO.util.Dom.addClass('preva', 'npah')

      if (khanState < last) YAHOO.util.Dom.removeClass('nexta', 'npah')
      else YAHOO.util.Dom.addClass('nexta', 'npah')

      YAHOO.util.Dom.setStyle('slides', 'padding-left', off + 'px')
      YAHOO.util.Dom.setStyle('gl', 'width', off + 'px')
      YAHOO.util.Dom.setStyle('gr', 'width', off2 + 'px')

      // 16/9 Aspect Ratio + menu
      var hei = Math.floor(win * 0.5625) + 30
      YAHOO.util.Dom.setStyle('emb', 'height', hei + 'px')
    }

    function setup() {
      win = YAHOO.util.Dom.getRegion('frame').width
      inc = Math.floor(win / LI_WIDTH)
      last = Math.max(0, len - (len % inc))

      var extra = win - (inc * LI_WIDTH)
      off = Math.floor(extra / 2)  // will center the vids
      off2 = extra - off

      pnClasses()
      makeDots()
    }

    function preventDefault(e) {
      e.preventDefault ? e.preventDefault() : e.returnValue = false
    }

    function setSlides() {
      var mar = '-' + (khanState * LI_WIDTH) + 'px'
      YAHOO.util.Dom.setStyle('slides', 'margin-left', mar)
    }

    function wrapCB(next) {
      return function (e) {
        preventDefault(e)

        if (khanState === 0 && !next) return
        if (khanState === last && next) return

        khanState += (next ? 1 : -1) * inc

        // edge conditions when resizing
        if (khanState < 0) khanState = 0
        if (khanState > last) khanState = last

        highlightDot(khanState / inc)
        setSlides()
        pnClasses()
      }
    }

    function makeNav(txt, id, next) {
      var na = d.createElement('a')
      na.appendChild(d.createTextNode(txt))
      na.href = '#'
      na.id = id
      YAHOO.util.Dom.addClass(na, 'npa')
      YAHOO.util.Event.addListener(na, 'click', wrapCB(next))
      nav.appendChild(na)
    }

    makeNav('>', 'nexta', true)
    makeNav('<', 'preva', false)

    div.appendChild(nav)

    function highlightDot(j) {
      var dots = d.getElementById('dots').childNodes
      var len = dots.length
      var k = 0
      for (; k < len; k++) YAHOO.util.Dom.removeClass(dots[k], 'selected')
      YAHOO.util.Dom.addClass(dots[j], 'selected')
    }

    function dotHandler(j) {
      return function (e) {
        preventDefault(e)
        khanState = j * inc
        highlightDot(j)
        setSlides()
        pnClasses()
      }
    }

    // dots
    function makeDots() {
      var dots = d.getElementById('dots')
      if (dots) dots.parentNode.removeChild(dots)
      if (win < 500) return
      dots = d.createElement('p')
      dots.id = 'dots'
      var lin, j = 0, n = Math.ceil(len / inc)
      var sel = khanState / inc
      for (; j < n; j++) {
        lin = d.createElement('a')
        lin.appendChild(d.createTextNode('\u2022'))
        lin.href = '#'
        if (j === sel) YAHOO.util.Dom.addClass(lin, 'selected')
        YAHOO.util.Event.addListener(lin, 'click', dotHandler(j))
        dots.appendChild(lin)
      }
      div.appendChild(dots)
    }

    var resize
    YAHOO.util.Event.addListener(window, 'resize', function () {
      clearTimeout(resize)
      resize = setTimeout(setup, 400)  // tune
    })

    var u = 'http://khanacademy.org/'
    if (isProp(res, 'feed.title.$t')) {
      var q = res.feed.title.$t.split(': ')[1]
      if (q) u += 'search?page_search_query=' + q.replace(/\s/g, '+')
    }

    var items = [{
      f: 1,
      a: div,
      h: 'Khan Academy Videos',
      s: 'Khan Academy',
      u: u,
      force_big_header: true
    }]
    nra(items, 0, true)  // add to page
    setup()

  }

}