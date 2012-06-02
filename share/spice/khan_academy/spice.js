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

  // If we have a video to display
  if (res && isProp(res, 'feed.entry') && res.feed.entry.length > 0) {
    var vid = res.feed.entry[0]

    var title = d.getElementById('search_form_input').value
    if (isProp(vid, 'title.$t')) title = vid.title.$t

    if (!isProp(vid, 'id.$t')) return
    var embed = d.createElement('iframe')
    embed.src = 'http://www.youtube.com/embed/'
              + vid.id.$t.split(':').pop()
    embed.allowFullScreen = 'allowFullScreen'
    embed.frameBorder = 0

    YAHOO.util.Dom.setStyle(embed, 'width', '320px')
    YAHOO.util.Dom.setStyle(embed, 'height', '240px')

    var div = d.createElement('div')
    div.appendChild(embed)

    var items = [{
      f: 1,
      a: div,
      h: title,
      s: 'Khan Academy',
      u: 'http://www.khanacademy.org/'
    }]
    nra(items)
  }

}