(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['rhymes'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {

  var buffer = "", stack1, stack2, options;
  buffer += "\n	Rhymes: ";
  options = {hash:{
    'sep': (", "),
    'last': (", and ")
  },inverse:self.noop,fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.concat),stack1 ? stack1.call(depth0, depth0, options) : helperMissing.call(depth0, "concat", depth0, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ".\n";
  return buffer;
  }
function program2(depth0,data) {

  var stack1;
  if (stack1 = helpers.word) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.word; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  return escapeExpression(stack1);
  }

  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.selectRhymes) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.selectRhymes; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.selectRhymes) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });
})();
