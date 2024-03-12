(function(){var a;a=(function(){function b(){this.options_index=0;this.parsed=[]}b.prototype.add_node=function(c){if(c.nodeName.toUpperCase()==="OPTGROUP"){return this.add_group(c)}else{return this.add_option(c)}};b.prototype.add_group=function(i){var h,e,g,d,f,c;h=this.parsed.length;this.parsed.push({array_index:h,group:true,label:i.label,children:0,disabled:i.disabled});f=i.childNodes;c=[];for(g=0,d=f.length;g<d;g++){e=f[g];c.push(this.add_option(e,h,i.disabled))}return c};b.prototype.add_option=function(d,e,c){if(d.nodeName.toUpperCase()==="OPTION"){if(d.text!==""){if(e!=null){this.parsed[e].children+=1}this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:d.value,text:d.text,html:d.innerHTML,selected:d.selected,disabled:c===true?c:d.disabled,group_array_index:e,classes:d.className,style:d.style.cssText})}else{this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:true})}return this.options_index+=1}};return b})();a.select_to_array=function(b){var g,f,e,c,d;f=new a();d=b.childNodes;for(e=0,c=d.length;e<c;e++){g=d[e];f.add_node(g)}return f.parsed};this.SelectParser=a}).call(this);(function(){window.chosenPlaceholder="You can choose 5 contacts at most1";var b,a;var c=/^[\d#\*\+pe\?][\d#\*pe\?]{0,}$/;a=this;b=(function(){function d(e,f){this.form_field=e;this.options=f!=null?f:{};this.is_multiple=this.form_field.multiple;this.set_default_text();this.set_default_values();this.setup();this.set_up_html();this.register_observers();this.finish_setup()}d.prototype.set_default_values=function(){var e=this;this.click_test_action=function(f){return e.test_active_click(f)};this.activate_action=function(f){return e.activate_field(f)};this.active_field=false;this.mouse_on_container=false;this.results_showing=false;this.result_highlighted=null;this.result_single_selected=null;this.allow_single_deselect=(this.options.allow_single_deselect!=null)&&(this.form_field.options[0]!=null)&&this.form_field.options[0].text===""?this.options.allow_single_deselect:false;this.disable_search_threshold=this.options.disable_search_threshold||0;this.disable_search=this.options.disable_search||false;this.enable_split_word_search=this.options.enable_split_word_search!=null?this.options.enable_split_word_search:true;this.search_contains=this.options.search_contains||false;this.choices=0;this.single_backstroke_delete=this.options.single_backstroke_delete||false;this.max_selected_options=this.options.max_selected_options||Infinity;return this.inherit_select_classes=this.options.inherit_select_classes||false};d.prototype.set_default_text=function(){if(this.form_field.getAttribute("data-placeholder")){this.default_text=this.form_field.getAttribute("data-placeholder")}else{if(this.is_multiple){this.default_text=this.options.placeholder_text_multiple||this.options.placeholder_text||window.chosenPlaceholder}else{this.default_text=this.options.placeholder_text_single||this.options.placeholder_text||"Select an Option"}}return this.results_none_found=this.form_field.getAttribute("data-no_results_text")||this.options.no_results_text||'Please press Enter or enter ";" to complete'};d.prototype.mouse_enter=function(){return this.mouse_on_container=true};d.prototype.mouse_leave=function(){return this.mouse_on_container=false};d.prototype.input_focus=function(e){var f=this;if(this.is_multiple){if(!this.active_field){return setTimeout((function(){return f.container_mousedown()}),50)}}else{if(!this.active_field){return this.activate_field()}}};d.prototype.input_blur=function(e){var f=this;if(!this.mouse_on_container){this.active_field=false;if(this.max_selected_options>this.choices&&c.test(this.search_field.val())){this.result_clear_highlight();this.result_select(e)}return setTimeout((function(){return f.blur_test()}),100)}};d.prototype.result_add_option=function(g){var e,f;if(!g.disabled){g.dom_id=this.container_id+"_o_"+g.array_index;e=g.selected&&this.is_multiple?[]:["active-result"];if(g.selected){e.push("result-selected")}if(g.group_array_index!=null){e.push("group-option")}if(g.classes!==""){e.push(g.classes)}f=g.style.cssText!==""?' style="'+g.style+'"':"";return'<li id="'+g.dom_id+'" class="'+e.join(" ")+'"'+f+">"+g.html+"</li>"}else{return""}};d.prototype.results_update_field=function(){if(!this.is_multiple){this.results_reset_cleanup()}this.result_clear_highlight();this.result_single_selected=null;return this.results_build()};d.prototype.results_toggle=function(){if(this.results_showing){return this.results_hide()}else{return this.results_show()}};d.prototype.results_search=function(e){if(this.results_showing){return this.winnow_results()}else{return this.results_show()}};d.prototype.keyup_checker=function(e){var h,g;h=(g=e.which)!=null?g:e.keyCode;this.search_field_scale();switch(h){case 8:if(this.is_multiple&&this.backstroke_length<1&&this.choices>0){return this.keydown_backstroke()}else{if(!this.pending_backstroke){this.result_clear_highlight();return this.results_search()}}break;case 13:e.preventDefault();var f=this.search_field.val();if(this.results_showing&&this.result_highlight){return this.result_select(e)}else{if(this.results_showing&&!this.result_highlight&&c.test(f)){return this.result_select(e,true)}else{if(this.results_showing&&!this.result_highlight&&!c.test(f)){this.generate_invalid_number_note()}}}break;case 27:if(this.results_showing){this.results_hide()}return true;case 59:case 186:e.preventDefault();var f=this.search_field.val();f=this.search_field.val().length<3?f:f.substring(0,f.length-1);this.search_field.val(f);if(this.results_showing&&this.result_highlight){return this.result_select(e)}else{if(this.results_showing&&!this.result_highlight&&c.test(f)){return this.result_select(e)}else{if(this.results_showing&&!this.result_highlight&&!c.test(f)){this.generate_invalid_number_note()}}}break;case 9:case 38:case 40:case 16:case 91:case 17:break;default:return this.results_search()}};d.clearInvalidNoteTimer=null;d.prototype.generate_invalid_number_note=function(){if(this.clearInvalidNoteTimer){window.clearTimeout(this.clearInvalidNoteTimer);this.clearInvalidNoteTimer=null}$("#searchNumberInvalidWord").hide().remove();$('<i class="colorRed" id="searchNumberInvalidWord" trans="phone_number_invalid"></i>').appendTo(".no-results");$(".no-results").translate();this.clearInvalidNoteTimer=addTimeout(function(){$("#searchNumberInvalidWord").hide().remove()},3000)};d.prototype.generate_field_id=function(){var e;e=this.generate_random_id();this.form_field.id=e;return e};d.prototype.generate_random_char=function(){var g,f,e;g="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";e=Math.floor(Math.random()*g.length);return f=g.substring(e,e+1)};d.prototype.container_width=function(){if(this.options.width!=null){return this.options.width}else{return""+this.form_field.offsetWidth+"px"}};d.browser_is_supported=function(){var e;if(window.navigator.appName==="Microsoft Internet Explorer"){return(null!==(e=document.documentMode)&&e>=8)}return true};d.default_multiple_text="Select Some Options";d.default_single_text="Select an Option";d.default_no_result_text="No results match";return d})();a.AbstractChosen=b}).call(this);(function(){var e,f,d,a,b={}.hasOwnProperty,c=function(j,h){for(var g in h){if(b.call(h,g)){j[g]=h[g]}}function i(){this.constructor=j}i.prototype=h.prototype;j.prototype=new i();j.__super__=h.prototype;return j};a=this;e=jQuery;e.fn.extend({chosen:function(i){var h,g,j;j=navigator.userAgent.toLowerCase();g=/(msie) ([\w.]+)/.exec(j)||[];h={name:g[1]||"",version:g[2]||"0"};if(h.name==="msie"&&(h.version==="6.0"||(h.version==="7.0"&&document.documentMode===7))){}return this.each(function(k){var l;l=e(this);if(!l.hasClass("chzn-done")){return l.data("chosen",new f(this,i))}})}});f=(function(g){c(h,g);function h(){h.__super__.constructor.apply(this,arguments)}h.prototype.setup=function(){this.form_field_jq=e(this.form_field);this.current_value=this.form_field_jq.val();return this.is_rtl=this.form_field_jq.hasClass("chzn-rtl")};h.prototype.finish_setup=function(){return this.form_field_jq.addClass("chzn-done")};h.prototype.set_up_html=function(){var i,n,m,l,k,j;this.container_id=this.form_field.id.length?this.form_field.id.replace(/[^\w]/g,"_"):this.generate_field_id();this.container_id+="_chzn";i=["chzn-container"];i.push("chzn-container-"+(this.is_multiple?"multi":"single"));if(this.inherit_select_classes&&this.form_field.className){i.push(this.form_field.className)}if(this.is_rtl){i.push("chzn-rtl")}this.f_width=this.options.width.replace(/\D/g,"");m={id:this.container_id,"class":i.join(" "),style:"width: "+this.f_width+"px;",title:this.form_field.title};n=e("<div />",m);if(this.is_multiple){n.html('<ul class="chzn-choices"><li class="search-field"><input type="text" id="chosen-search-field-input" maxlength="20" trans="select_some_options" value="'+window.chosenPlaceholder+'" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chzn-drop" style="left:-9000px;display:none;"><ul class="chzn-results"></ul></div>')}else{n.html('<a href="javascript:void(0)" class="chzn-single chzn-default"><span>'+window.chosenPlaceholder+'</span><div><b></b></div></a><div class="chzn-drop" style="left:-9000px;display:none;"><div class="chzn-search"><input type="text" autocomplete="off" /></div><ul class="chzn-results"></ul></div>')}this.form_field_jq.hide().after(n);this.container=e("#"+this.container_id);this.dropdown=this.container.find("div.chzn-drop").first();l=this.container.height();k=this.f_width-d(this.dropdown);this.dropdown.css({width:k+"px",top:l+"px"});this.search_field=this.container.find("input").first();this.search_results=this.container.find("ul.chzn-results").first();this.search_field_scale();this.search_no_results=this.container.find("li.no-results").first();if(this.is_multiple){this.search_choices=this.container.find("ul.chzn-choices").first();this.search_container=this.container.find("li.search-field").first()}else{this.search_container=this.container.find("div.chzn-search").first();this.selected_item=this.container.find(".chzn-single").first();j=k-d(this.search_container)-d(this.search_field);this.search_field.css({width:j+"px"})}this.results_build();this.set_tab_index();return this.form_field_jq.trigger("liszt:ready",{chosen:this})};h.prototype.register_observers=function(){var i=this;this.container.mousedown(function(j){i.container_mousedown(j)});this.container.mouseup(function(j){i.container_mouseup(j)});this.container.mouseenter(function(j){i.mouse_enter(j)});this.container.mouseleave(function(j){i.mouse_leave(j)});this.search_results.mouseup(function(j){i.search_results_mouseup(j)});this.search_results.mouseover(function(j){i.search_results_mouseover(j)});this.search_results.mouseout(function(j){i.search_results_mouseout(j)});this.form_field_jq.bind("liszt:updated",function(j){i.results_update_field(j)});this.form_field_jq.bind("liszt:activate",function(j){i.activate_field(j)});this.form_field_jq.bind("liszt:open",function(j){i.container_mousedown(j)});this.search_field.blur(function(j){i.input_blur(j)});this.search_field.keyup(function(j){i.keyup_checker(j)});this.search_field.keydown(function(j){i.keydown_checker(j)});this.search_field.focus(function(j){i.input_focus(j)});if(this.is_multiple){return this.search_choices.click(function(j){i.choices_click(j)})}else{return this.container.click(function(j){j.preventDefault()})}};h.prototype.search_field_disabled=function(){this.is_disabled=this.form_field_jq[0].disabled;if(this.is_disabled){this.container.addClass("chzn-disabled");this.search_field[0].disabled=true;if(!this.is_multiple){this.selected_item.unbind("focus",this.activate_action)}return this.close_field()}else{this.container.removeClass("chzn-disabled");this.search_field[0].disabled=false;if(!this.is_multiple){return this.selected_item.bind("focus",this.activate_action)}}};h.prototype.container_mousedown=function(i){var j;if(!this.is_disabled){j=i!=null?(e(i.target)).hasClass("search-choice-close"):false;if(i&&i.type==="mousedown"&&!this.results_showing){i.preventDefault()}if(!this.pending_destroy_click&&!j){if(!this.active_field){if(this.is_multiple){this.search_field.val("")}e(document).click(this.click_test_action);this.results_show()}else{if(!this.is_multiple&&i&&((e(i.target)[0]===this.selected_item[0])||e(i.target).parents("a.chzn-single").length)){i.preventDefault();this.results_toggle()}}return this.activate_field()}else{return this.pending_destroy_click=false}}};h.prototype.container_mouseup=function(i){if(i.target.nodeName==="ABBR"&&!this.is_disabled){return this.results_reset(i)}};h.prototype.blur_test=function(i){if(!this.active_field&&this.container.hasClass("chzn-container-active")){return this.close_field()}};h.prototype.close_field=function(){e(document).unbind("click",this.click_test_action);if(!this.is_multiple){this.selected_item.attr("tabindex",this.search_field.attr("tabindex"));this.search_field.attr("tabindex",-1)}this.active_field=false;this.results_hide();this.container.removeClass("chzn-container-active");if(e.browser.msie&&(e.browser.version==="6.0"||e.browser.version==="7.0")){this.container.css("z-index","")}this.winnow_results_clear();this.clear_backstroke();this.show_search_field_default();this.search_field.blur();return this.search_field_scale()};h.prototype.activate_field=function(){if(!this.is_multiple&&!this.active_field){this.search_field.attr("tabindex",this.selected_item.attr("tabindex"));this.selected_item.attr("tabindex",-1)}this.container.addClass("chzn-container-active");if(e.browser.msie&&(e.browser.version==="6.0"||e.browser.version==="7.0")){this.container.css("z-index","4000")}this.active_field=true;this.search_field.val(this.search_field.val());return this.search_field.focus()};h.prototype.test_active_click=function(i){if(e(i.target).parents("#"+this.container_id).length){return this.active_field=true}else{return this.close_field()}};h.prototype.results_build=function(j){var k,n,m,i,l;this.parsing=true;this.results_data=a.SelectParser.select_to_array(this.form_field);if(this.is_multiple&&this.choices>0){this.search_choices.find("li.search-choice").remove();this.choices=0}else{if(!this.is_multiple){this.selected_item.addClass("chzn-default").find("span").text(window.chosenPlaceholder);if(this.disable_search||this.form_field.options.length<=this.disable_search_threshold){this.container.addClass("chzn-container-single-nosearch")}else{this.container.removeClass("chzn-container-single-nosearch")}}}k="";l=this.results_data;for(m=0,i=l.length;m<i;m++){n=l[m];if(n.group){k+=this.result_add_group(n)}else{if(!n.empty){k+=this.result_add_option(n);if(n.selected&&this.is_multiple){this.choice_build(n)}else{if(n.selected&&!this.is_multiple){this.selected_item.removeClass("chzn-default").find("span").text(n.text);if(this.allow_single_deselect){this.single_deselect_control_build()}}}}}}this.search_field_disabled();this.show_search_field_default();this.search_field_scale();if(!j){this.search_results.html(k)}return this.parsing=false};h.prototype.result_add_group=function(i){if(!i.disabled){i.dom_id=this.container_id+"_g_"+i.array_index;return'<li id="'+i.dom_id+'" class="group-result">'+e("<div />").text(i.label).html()+"</li>"}else{return""}};h.prototype.result_do_highlight=function(j){var n,m,k,l,i;if(j.length){this.result_clear_highlight();this.result_highlight=j;this.result_highlight.addClass("highlighted");k=parseInt(this.search_results.css("maxHeight"),10);i=this.search_results.scrollTop();l=k+i;m=this.result_highlight.position().top+this.search_results.scrollTop();n=m+this.result_highlight.outerHeight();if(n>=l){return this.search_results.scrollTop((n-k)>0?n-k:0)}else{if(m<i){return this.search_results.scrollTop(m)}}}};h.prototype.result_clear_highlight=function(){if(this.result_highlight){this.result_highlight.removeClass("highlighted")}return this.result_highlight=null};h.prototype.results_show=function(){var i;if(!this.is_multiple){this.selected_item.addClass("chzn-single-with-drop");if(this.result_single_selected){this.result_do_highlight(this.result_single_selected)}}else{if(this.max_selected_options<=this.choices){this.form_field_jq.trigger("liszt:maxselected",{chosen:this});return false}}i=this.is_multiple?this.container.height():this.container.height()-1;this.form_field_jq.trigger("liszt:showing_dropdown",{chosen:this});this.dropdown.css({top:i+"px",left:0});this.results_showing=true;this.search_field.focus();this.search_field.val(this.search_field.val());return this.winnow_results()};h.prototype.results_hide=function(){if(!this.is_multiple){this.selected_item.removeClass("chzn-single-with-drop")}this.result_clear_highlight();this.form_field_jq.trigger("liszt:hiding_dropdown",{chosen:this});this.dropdown.css({left:"-9000px"});return this.results_showing=false};h.prototype.set_tab_index=function(j){var i;if(this.form_field_jq.attr("tabindex")){i=this.form_field_jq.attr("tabindex");this.form_field_jq.attr("tabindex",-1);return this.search_field.attr("tabindex",i)}};h.prototype.show_search_field_default=function(){if(this.is_multiple&&this.choices<1&&!this.active_field){this.search_field.val(window.chosenPlaceholder);return this.search_field.addClass("default")}else{this.search_field.val("");return this.search_field.removeClass("default")}};h.prototype.search_results_mouseup=function(i){var j;j=e(i.target).hasClass("active-result")?e(i.target):e(i.target).parents(".active-result").first();if(j.length){this.result_highlight=j;this.result_select(i);return this.search_field.focus()}};h.prototype.search_results_mouseover=function(i){var j;j=e(i.target).hasClass("active-result")?e(i.target):e(i.target).parents(".active-result").first();if(j){return this.result_do_highlight(j)}};h.prototype.search_results_mouseout=function(i){if(e(i.target).hasClass("active-result"||e(i.target).parents(".active-result").first())){return this.result_clear_highlight()}};h.prototype.choices_click=function(i){i.preventDefault();if(this.active_field&&!(e(i.target).hasClass("search-choice"||e(i.target).parents(".search-choice").first))&&!this.results_showing){return this.results_show()}};h.prototype.choice_build=function(l){var i,j,k,m=this;if(this.is_multiple&&this.max_selected_options<=this.choices){this.form_field_jq.trigger("liszt:maxselected",{chosen:this});return false}i=this.container_id+"_c_"+l.array_index;this.choices+=1;if(l.disabled){j='<li class="search-choice search-choice-disabled" id="'+i+'"><span>'+l.html+"</span></li>"}else{j='<li class="search-choice" id="'+i+'"><span>'+l.html+'</span><a href="javascript:void(0)" class="search-choice-close" rel="'+l.array_index+'"></a></li>'}this.search_container.before(j);k=e("#"+i).find("a").first();return k.click(function(n){return m.choice_destroy_link_click(n)})};h.prototype.choice_destroy_link_click=function(i){i.preventDefault();if(!this.is_disabled){this.pending_destroy_click=true;return this.choice_destroy(e(i.target))}else{return i.stopPropagation}};h.prototype.choice_destroy=function(i){if(this.result_deselect(i.attr("rel"))){this.choices-=1;this.show_search_field_default();if(this.is_multiple&&this.choices>0&&this.search_field.val().length<1){this.results_hide()}i.parents("li").first().remove();return this.search_field_scale()}};h.prototype.results_reset=function(){this.form_field.options[0].selected=true;this.selected_item.find("span").text("You can choose 5 contacts at most");if(!this.is_multiple){this.selected_item.addClass("chzn-default")}this.show_search_field_default();this.results_reset_cleanup();this.form_field_jq.trigger("change");if(this.active_field){return this.results_hide()}};h.prototype.results_reset_cleanup=function(){this.current_value=this.form_field_jq.val();return this.selected_item.find("abbr").remove()};h.prototype.result_select=function(q,m){var j,k,r,n;if(this.result_highlight){j=this.result_highlight;k=j.attr("id");this.result_clear_highlight();if(this.is_multiple){this.result_deactivate(j)}else{this.search_results.find(".result-selected").removeClass("result-selected");this.result_single_selected=j;this.selected_item.removeClass("chzn-default")}j.addClass("result-selected");n=k.substr(k.lastIndexOf("_")+1);r=this.results_data[n];r.selected=true;this.form_field.options[r.options_index].selected=true;if(this.is_multiple){this.choice_build(r)}else{this.selected_item.find("span").first().text(r.text);if(this.allow_single_deselect){this.single_deselect_control_build()}}if(!((q.metaKey||q.ctrlKey)&&this.is_multiple)){this.results_hide()}this.search_field.val("");if(this.is_multiple||this.form_field_jq.val()!==this.current_value){this.form_field_jq.trigger("change",{selected:this.form_field.options[r.options_index].value})}this.current_value=this.form_field_jq.val();return this.search_field_scale()}else{var p=this.search_field.val();var o=false;if(p.length>10){for(var l=0;l<this.form_field.options.length;l++){if(this.form_field.options[l].value==p){this.form_field.options[l].selected=true;o=true;break}}}else{for(var l=0;l<this.form_field.options.length;l++){if(this.form_field.options[l].value==p){this.form_field.options[l].selected=true;o=true;break}}}if(!o){if(this.max_selected_options>=this.choices){this.form_field.add(new Option(p,p,false,true))}else{this.form_field.add(new Option(p,p,false,false))}}this.results_build(m);this.no_results_clear();return this.search_field_scale()}};h.prototype.result_activate=function(i){return i.addClass("active-result")};h.prototype.result_deactivate=function(i){return i.removeClass("active-result")};h.prototype.result_deselect=function(k){var i,j;j=this.results_data[k];if(!this.form_field.options[j.options_index].disabled){j.selected=false;this.form_field.options[j.options_index].selected=false;i=e("#"+this.container_id+"_o_"+k);i.removeClass("result-selected").addClass("active-result").show();this.result_clear_highlight();this.winnow_results();this.form_field_jq.trigger("change",{deselected:this.form_field.options[j.options_index].value});this.search_field_scale();return true}else{return false}};h.prototype.single_deselect_control_build=function(){if(this.allow_single_deselect&&this.selected_item.find("abbr").length<1){return this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>')}};h.prototype.winnow_results=function(){var o,q,u,t,k,r,n,x,s,w,v,p,l,j,i,y,z,m;this.no_results_clear();s=0;w=this.search_field.val()===window.chosenPlaceholder?"":e("<div/>").text(e.trim(this.search_field.val())).html();r=this.search_contains?"":"^";k=new RegExp(r+w.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"i");l=new RegExp(w.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"i");m=this.results_data;for(j=0,y=m.length;j<y;j++){q=m[j];if(!q.disabled&&!q.empty){if(q.group){e("#"+q.dom_id).css("display","none")}else{if(!(this.is_multiple&&q.selected)){o=false;x=q.dom_id;n=e("#"+x);if(k.test(q.html)){o=true;s+=1}else{if(this.enable_split_word_search&&(q.html.indexOf(" ")>=0||q.html.indexOf("[")===0)){t=q.html.replace(/\[|\]/g,"").split(" ");if(t.length){for(i=0,z=t.length;i<z;i++){u=t[i];if(k.test(u)){o=true;s+=1}}}}}if(o){if(w.length){v=q.html.search(l);p=q.html.substr(0,v+w.length)+"</em>"+q.html.substr(v+w.length);p=p.substr(0,v)+"<em>"+p.substr(v)}else{p=q.html}n.html(p);this.result_activate(n);if(q.group_array_index!=null){e("#"+this.results_data[q.group_array_index].dom_id).css("display","list-item")}}else{if(this.result_highlight&&x===this.result_highlight.attr("id")){this.result_clear_highlight()}this.result_deactivate(n)}}}}}if(s<1&&w.length){return this.no_results(w)}else{return this.winnow_results_set_highlight()}};h.prototype.winnow_results_clear=function(){var i,l,m,k,j;this.search_field.val("");l=this.search_results.find("li");j=[];for(m=0,k=l.length;m<k;m++){i=l[m];i=e(i);if(i.hasClass("group-result")){j.push(i.css("display","auto"))}else{if(!this.is_multiple||!i.hasClass("result-selected")){j.push(this.result_activate(i))}else{j.push(void 0)}}}return j};h.prototype.winnow_results_set_highlight=function(){var i,j;if(!this.result_highlight){j=!this.is_multiple?this.search_results.find(".result-selected.active-result"):[];i=j.length?j.first():this.search_results.find(".active-result").first();if(i!=null){return this.result_do_highlight(i)}}};h.prototype.no_results=function(i){var j;j=e('<li class="no-results"><b trans="sms_chat_input_confirm">'+this.results_none_found+"</b> <span></span></li>");this.search_results.append(j);return this.search_results};h.prototype.no_results_clear=function(){return this.search_results.find(".no-results").remove()};h.prototype.keydown_arrow=function(){var j,i;if(!this.result_highlight){j=this.search_results.find("li.active-result").first();if(j){this.result_do_highlight(e(j))}}else{if(this.results_showing){i=this.result_highlight.nextAll("li.active-result").first();if(i){this.result_do_highlight(i)}}}if(!this.results_showing){return this.results_show()}};h.prototype.keyup_arrow=function(){var i;if(!this.results_showing&&!this.is_multiple){return this.results_show()}else{if(this.result_highlight){i=this.result_highlight.prevAll("li.active-result");if(i.length){return this.result_do_highlight(i.first())}else{if(this.choices>0){this.results_hide()}return this.result_clear_highlight()}}}};h.prototype.keydown_backstroke=function(){var i;if(this.pending_backstroke){this.choice_destroy(this.pending_backstroke.find("a").first());return this.clear_backstroke()}else{i=this.search_container.siblings("li.search-choice").last();if(i.length&&!i.hasClass("search-choice-disabled")){this.pending_backstroke=i;if(this.single_backstroke_delete){return this.keydown_backstroke()}else{return this.pending_backstroke.addClass("search-choice-focus")}}}};h.prototype.clear_backstroke=function(){if(this.pending_backstroke){this.pending_backstroke.removeClass("search-choice-focus")}return this.pending_backstroke=null};h.prototype.keydown_checker=function(i){var k,j;k=(j=i.which)!=null?j:i.keyCode;this.search_field_scale();if(k!==8&&this.pending_backstroke){this.clear_backstroke()}switch(k){case 8:this.backstroke_length=this.search_field.val().length;break;case 9:if(this.results_showing&&!this.is_multiple){this.result_select(i)}this.mouse_on_container=false;break;case 13:i.preventDefault();break;case 38:i.preventDefault();this.keyup_arrow();break;case 40:this.keydown_arrow();break;case 59:case 186:if(this.search_field.val().length<3){i.preventDefault()}break}};h.prototype.search_field_scale=function(){var q,i,l,j,o,p,n,k,m;if(this.is_multiple){l=0;n=0;o="position:absolute; left: -1000px; top: -1000px; display:none;";p=["font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"];for(k=0,m=p.length;k<m;k++){j=p[k];o+=j+":"+this.search_field.css(j)+";"}i=e("<div />",{style:o});i.text(this.search_field.val());e("body").append(i);n=i.width()+25;i.remove();if(n>this.f_width-10){n=this.f_width-10}this.search_field.css({width:n+"px"});q=this.container.height();return this.dropdown.css({top:q+"px"})}};h.prototype.generate_random_id=function(){var i;i="sel"+this.generate_random_char()+this.generate_random_char()+this.generate_random_char();while(e("#"+i).length>0){i+=this.generate_random_char()}return i};return h})(AbstractChosen);a.Chosen=f;d=function(g){var h;return h=g.outerWidth()-g.width()};a.get_side_border_padding=d}).call(this);