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

    var vids = res.feed.entry
    
    var title = d.getElementById('search_form_input').value
    if (isProp(res, 'feed.title.$t')) {
      title = res.feed.title.$t.replace('YouTube', 'Khan Academy')
    }

    var div = d.createElement('div')
    div.id = 'khan'
    
    var i, len, ul, li, img, a, id, vid, p, txt
    for (i = 0, len = vids.length; i < len; i++) {
      
      if (!(i % 6)) {
         if (i > 0) div.appendChild(ul)
         ul = d.createElement('ul')
         ul.id = 'khan-ul-' + (i / 6)
      }
      
      li = d.createElement('li')
      YAHOO.util.Dom.addClass(li, 'item')
      
      if (!(i % 3)) YAHOO.util.Dom.addClass(li, 'cleft')
      
      vid = vids[i]
      id = vid.id.$t.split(':').pop()
      
      a = d.createElement('a')
      a.href = 'http://khanacademy.org/video?v=' + id
      
      img = d.createElement('img')
      img.src = vid.media$group.media$thumbnail[0].url
      
      p = d.createElement('p')
      txt = d.createTextNode(vid.title.$t)
      p.appendChild(txt)
      
      a.appendChild(img)
      a.appendChild(p)

      li.appendChild(a)
      ul.appendChild(li)

    }
    
    div.appendChild(ul)
    
    if (len > 6) {  // nav

      var khanState = 0
      function wrapCB(next) {
        return function (e) {
          e.preventDefault()

          if (khanState === 0 && !next) return
          if (khanState === (Math.ceil(len / 6) - 1) && next) return
          
          YAHOO.util.Dom.setStyle('khan-ul-' + khanState, 'display', 'none')
          khanState += (next ? 1 : -1)
          YAHOO.util.Dom.setStyle('khan-ul-' + khanState, 'display', 'block')
          
          return false
        }
      }
      
      function makeNav(txt, cls, next) {
        var na = d.createElement('a')
        na.appendChild(d.createTextNode(txt))
        na.href = '#'
        YAHOO.util.Dom.addClass(na, 'npa')
        YAHOO.util.Dom.addClass(na, cls)
        YAHOO.util.Event.addListener(na, 'click', wrapCB(next))
        div.appendChild(na) 
      }
      
      makeNav('>', 'nexta', true)
      makeNav('<', 'preva', false)
      
    }

    var items = [{
      f: 1,
      a: div,
      h: title,
      s: 'Khan Academy',
      u: 'http://khanacademy.org/'
    }]
    nra(items, 0, true)  // add to page
  }

}