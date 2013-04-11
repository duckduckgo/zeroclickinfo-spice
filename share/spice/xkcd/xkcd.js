function ddg_spice_xkcd(response) {
  if (!response.img || !response.alt) return;

  Spice.render({
      data             : response,
      header1          : response.safe_title + " (XKCD)",
      source_url       : 'http://xkcd.com/' + response.num,
      source_name      : 'XKCD',
      template_normal  : 'xkcd',
      force_big_header : true,
      force_no_fold    : true,
  });
}
