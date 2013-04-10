(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['quixey_detail'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n                <div title=\"";
  if (stack1 = helpers.rating) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.rating; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"rating\">\n                    ";
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.loop),stack1 ? stack1.call(depth0, depth0.rating, options) : helperMissing.call(depth0, "loop", depth0.rating, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                </div>\n            ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <img src=\"";
  if (stack1 = helpers.quixey_star) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.quixey_star; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"star\"></span>\n                    "
    + "\n                        "
    + "\n                    ";
  return buffer;
  }

function program4(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                        <div class=\"app_edition\" title=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " - Rating: ";
  if (stack1 = helpers.rating) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.rating; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                            <a href=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" class=\"app_platform\">\n                                ";
  stack2 = helpers['with'].call(depth0, ((stack1 = depth0.platforms),stack1 == null || stack1 === false ? stack1 : stack1[0]), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                                ";
  if (stack2 = helpers.platform_name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.platform_name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\n                                ";
  stack2 = helpers['if'].call(depth0, depth1.hasPricerange, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                            </a>\n                        </div>\n                    ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n                                <img src=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.platform_icon),stack1 ? stack1.call(depth0, depth0.icon_url, options) : helperMissing.call(depth0, "platform_icon", depth0.icon_url, options)))
    + "\" class=\"platform_icon\">\n                                ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n                                     - ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.price),stack1 ? stack1.call(depth0, depth0.cents, options) : helperMissing.call(depth0, "price", depth0.cents, options)))
    + "\n                                ";
  return buffer;
  }

  buffer += "<div id=\"quixey_preview\" style=\"width: 100%; height: 100%;\" app=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <div class=\"app_info\">\n        <a href=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" class=\"app_icon_anchor\">\n            <img src=\"";
  if (stack1 = helpers.icon_url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.icon_url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" class=\"app_icon\">\n        </a>\n        <div class=\"name_wrap\">\n            <a href=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"name\" title=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n\n            ";
  stack1 = helpers['if'].call(depth0, depth0.rating, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <div class=\"price\">";
  if (stack1 = helpers.pricerange) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pricerange; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n            <div class=\"app_description\">";
  if (stack1 = helpers.short_desc) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.short_desc; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n            <div id=\"details_";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"app_details\">\n                <div class=\"app_editions\">\n                    ";
  stack1 = helpers.each.call(depth0, depth0.editions, {hash:{},inverse:self.noop,fn:self.programWithDepth(program4, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"clear\"></div>\n</div>\n\n";
  return buffer;
  });
templates['quixey'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", helperMissing=helpers.helperMissing;


  buffer += "<li class=\"ddgc_item\"> "
    + "\n    <a class=\"ddgc_detail_link\" "
    + ">\n        <p><img src=\"";
  if (stack1 = helpers.icon_url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.icon_url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" /></p>\n        <span>";
  options = {hash:{
    'maxlen': ("40")
  },data:data};
  stack2 = ((stack1 = helpers.condense),stack1 ? stack1.call(depth0, depth0.name, options) : helperMissing.call(depth0, "condense", depth0.name, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\n    </a>\n</li>";
  return buffer;
  });
})();
