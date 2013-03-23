(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['congress'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <li>\n  <a href=\"/q?=";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " (";
  if (stack1 = helpers.party) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.party; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ")</a> &mdash;\n    ";
  stack1 = helpers['if'].call(depth0, depth0.twitter, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, depth0.next_election, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <br>\n    Votes with party on ";
  if (stack1 = helpers.votes_with_party_pct) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.votes_with_party_pct; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "% of issues.\n    ";
  stack1 = helpers['if'].call(depth0, depth0.district, {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<a href=\"https://www.twitter.com/";
  if (stack1 = helpers.twitter) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.twitter; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">@";
  if (stack1 = helpers.twitter) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.twitter; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>, ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "next election in ";
  if (stack1 = helpers.next_election) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.next_election; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1);
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " (district ";
  if (stack1 = helpers.district) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.district; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ")";
  return buffer;
  }

  buffer += "<ul>\n";
  stack1 = helpers.each.call(depth0, depth0.member, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  });
})();
