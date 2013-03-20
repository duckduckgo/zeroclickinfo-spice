(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['movie2'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n\n\n<div id=\"movie_data_box\">\n\n    <div>\n        <span class=\"movie_data_item\">\n            <span class=\"movie_star_rating\">";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.star_rating),stack1 ? stack1.call(depth0, ((stack1 = depth0.ratings),stack1 == null || stack1 === false ? stack1 : stack1.critics_score), options) : helperMissing.call(depth0, "star_rating", ((stack1 = depth0.ratings),stack1 == null || stack1 === false ? stack1 : stack1.critics_score), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\n        </span>\n        <span class=\"movie_critics_rating\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.ratings),stack1 == null || stack1 === false ? stack1 : stack1.critics_rating)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <div class=\"movie_data_description\">\n        ("
    + escapeExpression(((stack1 = ((stack1 = depth0.ratings),stack1 == null || stack1 === false ? stack1 : stack1.critics_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "% critics,\n         "
    + escapeExpression(((stack1 = ((stack1 = depth0.ratings),stack1 == null || stack1 === false ? stack1 : stack1.audience_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "% audience approved)\n        </div>\n    </div>\n\n    <div><span class=\"movie_data_item\">MPAA rating:</span>";
  if (stack2 = helpers.mpaa_rating) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.mpaa_rating; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</div>\n    <div><span class=\"movie_data_item\">Running time:</span>";
  if (stack2 = helpers.runtime) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.runtime; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " minutes</div>\n    <div><span class=\"movie_data_item\">Starring:</span>\n        ";
  options = {hash:{
    'sep': (", "),
    'last': (", and ")
  },inverse:self.noop,fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.concat),stack1 ? stack1.call(depth0, depth0.abridged_cast, options) : helperMissing.call(depth0, "concat", depth0.abridged_cast, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ".\n    </div>\n</div>\n\n\n    ";
  stack2 = helpers['if'].call(depth0, depth0.synopsis, {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<a href=\"http://www.rottentomatoes.com/celebrity/";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  if (stack1 = helpers.synopsis) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.synopsis; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        ";
  options = {hash:{
    'maxlen': ("200")
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.condense),stack1 ? stack1.call(depth0, depth0.critics_consensus, options) : helperMissing.call(depth0, "condense", depth0.critics_consensus, options)))
    + "\n    ";
  return buffer;
  }

  buffer += "\n\n";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.relevantMovie) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.relevantMovie; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.relevantMovie) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  });
templates['movie'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n\n";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " (";
  if (stack1 = helpers.year) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.year; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ") is ";
  if (stack1 = helpers.rating_adjective) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.rating_adjective; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  if (stack1 = helpers.mpaa_rating) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.mpaa_rating; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " movie\n\n("
    + escapeExpression(((stack1 = ((stack1 = depth0.ratings),stack1 == null || stack1 === false ? stack1 : stack1.critics_rating)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ",\n "
    + escapeExpression(((stack1 = ((stack1 = depth0.ratings),stack1 == null || stack1 === false ? stack1 : stack1.critics_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "% critics,\n "
    + escapeExpression(((stack1 = ((stack1 = depth0.ratings),stack1 == null || stack1 === false ? stack1 : stack1.audience_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "% audience approved)\n\nstarring\n\n    ";
  options = {hash:{
    'sep': (", "),
    'last': (", and ")
  },inverse:self.noop,fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.concat),stack1 ? stack1.call(depth0, depth0.abridged_cast, options) : helperMissing.call(depth0, "concat", depth0.abridged_cast, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ".\n\n    ";
  stack2 = helpers['if'].call(depth0, depth0.synopsis, {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<a href=\"http://www.rottentomatoes.com/celebrity/";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  if (stack1 = helpers.synopsis) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.synopsis; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        ";
  options = {hash:{
    'maxlen': ("135")
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.condense),stack1 ? stack1.call(depth0, depth0.critics_consensus, options) : helperMissing.call(depth0, "condense", depth0.critics_consensus, options)))
    + "\n    ";
  return buffer;
  }

  buffer += "\n";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.relevantMovie) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.relevantMovie; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.relevantMovie) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  });
})();
