(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['hacker_news'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, options, helperMissing=helpers.helperMissing, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	\n	";
  stack1 = helpers.each.call(depth0, depth0.topStories, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	";
  stack1 = helpers['if'].call(depth0, depth0.topComments, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	";
  stack1 = helpers['if'].call(depth0, depth0.otherStories, {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n		"
    + "\n		";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.include),stack1 ? stack1.call(depth0, "hn_story", options) : helperMissing.call(depth0, "include", "hn_story", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n	";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		";
  stack1 = helpers['if'].call(depth0, depth0.topStories, {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  stack1 = helpers.each.call(depth0, depth0.topComments, {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n	";
  return buffer;
  }
function program5(depth0,data) {
  
  
  return "\n			<hr class=\"horizontal_line\">\n			<a href=\"javascript:;\" data-target=\"#topComments\" class=\"hn_showHide\">Top Comments</a>\n			<div id=\"topComments\" class=\"hide\">\n		";
  }

function program7(depth0,data) {
  
  
  return "\n			<div id=\"topComments\">\n		";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n				<div class=\"hn_comment\">\n					";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.hn_comment),stack1 ? stack1.call(depth0, depth0.text, options) : helperMissing.call(depth0, "hn_comment", depth0.text, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n					<span class=\"hn_oneline\">\n						[by ";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.user_link),stack1 ? stack1.call(depth0, depth0.username, options) : helperMissing.call(depth0, "user_link", depth0.username, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "]\n						[";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.item_link),stack1 ? stack1.call(depth0, "parent", options) : helperMissing.call(depth0, "item_link", "parent", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "]\n						";
  stack2 = helpers['if'].call(depth0, depth0.discussion, {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n					</span>\n				</div>\n				";
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n							";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.item_link),stack1 ? stack1.call(depth0, ((stack1 = depth0.discussion),stack1 == null || stack1 === false ? stack1 : stack1.title), options) : helperMissing.call(depth0, "item_link", ((stack1 = depth0.discussion),stack1 == null || stack1 === false ? stack1 : stack1.title), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n						";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n							";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.item_link),stack1 ? stack1.call(depth0, depth0.title, options) : helperMissing.call(depth0, "item_link", depth0.title, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n						";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<hr class=\"horizontal_line\">\n		<a href=\"javascript:;\" data-target=\"#otherStories\" class=\"hn_showHide\">Other Stories</a>\n		<div id=\"otherStories\" class=\"hide\">\n			";
  stack1 = helpers.each.call(depth0, depth0.otherStories, {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n	";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n				"
    + "\n				";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.include),stack1 ? stack1.call(depth0, "hn_story", options) : helperMissing.call(depth0, "include", "hn_story", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n			";
  return buffer;
  }

  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.organizeResults) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.organizeResults; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.organizeResults) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });
templates['hn_story'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n		<a href=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  options = {hash:{
    'maxlen': ("50")
  },data:data};
  stack2 = ((stack1 = helpers.condense),stack1 ? stack1.call(depth0, depth0.title, options) : helperMissing.call(depth0, "condense", depth0.title, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</a>\n	";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n		";
  options = {hash:{
    'maxlen': ("50")
  },data:data};
  stack2 = ((stack1 = helpers.condense),stack1 ? stack1.call(depth0, depth0.title, options) : helperMissing.call(depth0, "condense", depth0.title, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n	";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n			(";
  if (stack1 = helpers.domain) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.domain; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ", ";
  if (stack1 = helpers.points) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.points; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " point";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.plural),stack1 ? stack1.call(depth0, depth0.points, options) : helperMissing.call(depth0, "plural", depth0.points, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ")\n		";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n			(";
  if (stack1 = helpers.points) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.points; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " point";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.plural),stack1 ? stack1.call(depth0, depth0.points, options) : helperMissing.call(depth0, "plural", depth0.points, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ")\n		";
  return buffer;
  }

  buffer += "<div class=\"hn_story\">\n	";
  stack1 = helpers['if'].call(depth0, depth0.url, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	<span class=\"hn_oneline\">\n		 [<a href=\"http://news.ycombinator.com/item?id=";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  if (stack1 = helpers.num_comments) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.num_comments; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " comment";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.plural),stack1 ? stack1.call(depth0, depth0.num_comments, options) : helperMissing.call(depth0, "plural", depth0.num_comments, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</a>]\n		";
  stack2 = helpers['if'].call(depth0, depth0.domain, {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n	</span>\n</div>";
  return buffer;
  });
})();
