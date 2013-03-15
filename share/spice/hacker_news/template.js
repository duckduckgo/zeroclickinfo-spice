(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['hacker_news'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {

  var buffer = "", stack1, stack2, options;
  buffer += "\n	<div id=\"topStories\">\n		<a href=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  options = {hash:{
    'maxlen': ("50")
  },data:data};
  stack2 = ((stack1 = helpers.condense),stack1 ? stack1.call(depth0, depth0.title, options) : helperMissing.call(depth0, "condense", depth0.title, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</a>\n		<span class=\"hn_oneline\">\n			[";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.comment_link),stack1 ? stack1.call(depth0, depth0.num_comments, options) : helperMissing.call(depth0, "comment_link", depth0.num_comments, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "]\n			";
  stack2 = helpers['if'].call(depth0, depth0.domain, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n		</span>\n	</div>\n";
  return buffer;
  }
function program2(depth0,data) {

  var buffer = "", stack1, stack2, options;
  buffer += "\n				(";
  if (stack1 = helpers.domain) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.domain; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ", ";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.hn_points),stack1 ? stack1.call(depth0, depth0.points, options) : helperMissing.call(depth0, "hn_points", depth0.points, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ")\n			";
  return buffer;
  }

function program4(depth0,data) {

  var buffer = "", stack1, stack2, options;
  buffer += "\n				(";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.hn_points),stack1 ? stack1.call(depth0, depth0.points, options) : helperMissing.call(depth0, "hn_points", depth0.points, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ")\n			";
  return buffer;
  }

function program6(depth0,data) {

  var buffer = "", stack1, stack2, options;
  buffer += "\n	<div>\n		";
  options = {hash:{
    'maxlen': ("200")
  },data:data};
  stack2 = ((stack1 = helpers.condense),stack1 ? stack1.call(depth0, depth0.text, options) : helperMissing.call(depth0, "condense", depth0.text, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n		<span class=\"hn_oneline\">\n			[by ";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.user_link),stack1 ? stack1.call(depth0, depth0.username, options) : helperMissing.call(depth0, "user_link", depth0.username, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "]\n			[";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.item_link),stack1 ? stack1.call(depth0, "parent", options) : helperMissing.call(depth0, "item_link", "parent", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "]\n			";
  stack2 = helpers['if'].call(depth0, depth0.discussion, {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n		</span>\n	</div>\n	";
  return buffer;
  }
function program7(depth0,data) {

  var buffer = "", stack1, stack2, options;
  buffer += "\n				";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.item_link),stack1 ? stack1.call(depth0, ((stack1 = depth0.discussion),stack1 == null || stack1 === false ? stack1 : stack1.title), options) : helperMissing.call(depth0, "item_link", ((stack1 = depth0.discussion),stack1 == null || stack1 === false ? stack1 : stack1.title), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n			";
  return buffer;
  }

function program9(depth0,data) {

  var buffer = "", stack1, stack2, options;
  buffer += "\n				";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.item_link),stack1 ? stack1.call(depth0, depth0.title, options) : helperMissing.call(depth0, "item_link", depth0.title, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n			";
  return buffer;
  }

function program11(depth0,data) {

  var buffer = "", stack1, stack2, options;
  buffer += "\n	<div>\n		<a href=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  options = {hash:{
    'maxlen': ("50")
  },data:data};
  stack2 = ((stack1 = helpers.condense),stack1 ? stack1.call(depth0, depth0.title, options) : helperMissing.call(depth0, "condense", depth0.title, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</a>\n		<span class=\"hn_oneline\">\n			[";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.comment_link),stack1 ? stack1.call(depth0, depth0.num_comments, options) : helperMissing.call(depth0, "comment_link", depth0.num_comments, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "]\n			";
  stack2 = helpers['if'].call(depth0, depth0.domain, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n		</span>\n	</div>\n	";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.topStories, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<hr class=\"horizontal_line\">\n\n<p class=\"showHide\">Top Comments</p>\n<div id=\"topComments\">\n	";
  stack1 = helpers.each.call(depth0, depth0.topComments, {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n\n<hr class=\"horizontal_line\">\n\n<p class=\"showHide\">Other Stories</p>\n<div id=\"otherStories\">\n	";
  stack1 = helpers.each.call(depth0, depth0.otherStories, {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });
})();
