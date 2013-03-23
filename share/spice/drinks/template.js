(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['drinks'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0));
  }

  buffer += "<i>Ingredients</i>: ";
  options = {hash:{
    'sep': ("; ")
  },inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.concat),stack1 ? stack1.call(depth0, depth0.ingredients, options) : helperMissing.call(depth0, "concat", depth0.ingredients, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "<br>\n<i>Directions</i>: ";
  if (stack2 = helpers.procedure) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.procedure; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\n";
  return buffer;
  });
})();
