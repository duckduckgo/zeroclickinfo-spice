(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['sound_cloud'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li><a class=\"soundcloud-audio\" data-image=\"";
  if (stack1 = helpers.artwork_url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.artwork_url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-stream=\"";
  if (stack1 = helpers.stream_url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.stream_url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "?allow_redirects=False&client_id=df14a65559c0e555d9f9fd950c2d5b17\" type=\"audio/mp3\" >";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " <span class=\"sidenote\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></a></li>\n    ";
  return buffer;
  }

  buffer += "<ul class=\"playlist\">\n    ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>";
  return buffer;
  });
})();