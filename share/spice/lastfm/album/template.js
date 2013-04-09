(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['album'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n        <div>\n            <em>Artist:</em>\n            ";
  if (stack1 = helpers.artist) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.artist; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n        </div>\n        ";
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.releasedate),stack1 ? stack1.call(depth0, depth0.releasedate, options) : helperMissing.call(depth0, "releasedate", depth0.releasedate, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, depth0.tracks, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  stack2 = helpers['if'].call(depth0, depth0.wiki, {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div>\n                <em>Release Date:</em>\n                ";
  if (stack1 = helpers.date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n            </div>\n        ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.tracks),stack1 == null || stack1 === false ? stack1 : stack1.track), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n                <div>\n                    <em>Songs:</em>\n                    ";
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data};
  stack2 = ((stack1 = helpers.list),stack1 ? stack1.call(depth0, ((stack1 = depth0.tracks),stack1 == null || stack1 === false ? stack1 : stack1.track), options) : helperMissing.call(depth0, "list", ((stack1 = depth0.tracks),stack1 == null || stack1 === false ? stack1 : stack1.track), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                </div>\n            ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<a href=\""
    + escapeExpression(((stack1 = depth0.url),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.wiki),stack1 == null || stack1 === false ? stack1 : stack1.summary), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n                <div>\n                    <span id=\"some\"><em>Description:</em> ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.snippet),stack1 ? stack1.call(depth0, ((stack1 = depth0.wiki),stack1 == null || stack1 === false ? stack1 : stack1.summary), "some", options) : helperMissing.call(depth0, "snippet", ((stack1 = depth0.wiki),stack1 == null || stack1 === false ? stack1 : stack1.summary), "some", options)))
    + "</span>\n                    <a id=\"expand\" href=\"javascript:;\">\n                        <span>More...</span>\n                    </a>\n                    <span id=\"all\"><em>Description:</em> ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.snippet),stack1 ? stack1.call(depth0, ((stack1 = depth0.wiki),stack1 == null || stack1 === false ? stack1 : stack1.summary), "all", options) : helperMissing.call(depth0, "snippet", ((stack1 = depth0.wiki),stack1 == null || stack1 === false ? stack1 : stack1.summary), "all", options)))
    + "</span>\n                </div>\n            ";
  return buffer;
  }

  buffer += "<div>\n    ";
  stack1 = helpers['with'].call(depth0, depth0.album, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });
})();