root = exports ? this

root.ddg_spice_facebook_fanpage = (data) ->
	if data.username
		items = []
		items[0] = []
		items[0]['h'] = "#{data.name} - #{data.category}"
		items[0]['s'] = "#{data.name} on Facebook" # Title of the more link
		items[0]['u'] = data.link
		content = ''
		if data.cover and data.description
			content = """
			#{content}
			<div style="margin-top: 10px; margin-bottom: 5px;">
				#{get_cover_pic data}
				<div>
					<div id="likes" style="font-weight: bold;">
						#{get_stats_html data}
					</div>
					<div>
						#{data.description}
					</div>
				</div>
				<div style="float: clear;"></div>
			</div>
			"""
		else if data.cover
			content = """
			#{content}
			<div style="margin-top: 10px; margin-bottom: 5px;">
				#{get_cover_pic data}
				<div style="margin-top: 10px; font-weight: bold;">
					#{get_stats_html data}
				</div>
				<div style="float: clear;"></div>
			</div>
			"""
		else if data.description
			content = """
			<div style="margin-top: 10px; margin-bottom: 5px;">
				<div style="font-weight: bold;">#{get_stats_html data}</div>
				<div style="margin-top: 5px;">
					#{data.description}
				</div>
			</div>
			"""
		else
			content = """
			#{content}
			<div id="likes" style="margin-top: 10px; margin-bottom: 5px; font-weight: bold;">
				#{get_stats_html data}
			</div>
			"""
		items[0]['a'] = content
		nra items

get_cover_pic = (data) ->
	# Returns the cover pic html
	content = """
	<div style="float: left; margin-right: 10px; margin-left: 5px;">
		<img style="height: 150px; width: 150px;" src="#{data.cover.source}"></img>
	</div>
	"""
	return content

get_stats_html = (data) ->
	# Returns the stats html
	content = """
	Talking About: #{if data.talking_about_count? then data.talking_about_count else 0}.
	Fans: #{if data.likes? then data.likes else  0}.
	Were Here: #{if data.were_here_count? then data.were_here_count else data.were_here_count}.
	"""
	return content
