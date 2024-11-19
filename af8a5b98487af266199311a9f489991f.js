ace.define("ace/snippets",["require","exports","module","ace/lib/dom","ace/lib/oop","ace/lib/event_emitter","ace/lib/lang","ace/range","ace/range_list","ace/keyboard/hash_handler","ace/tokenizer","ace/clipboard","ace/editor"],(function(e,t,n){"use strict";var i=e("./lib/dom"),r=e("./lib/oop"),o=e("./lib/event_emitter").EventEmitter,s=e("./lib/lang"),a=e("./range").Range,c=e("./range_list").RangeList,p=e("./keyboard/hash_handler").HashHandler,u=e("./tokenizer").Tokenizer,h=e("./clipboard"),l={CURRENT_WORD:function(e){return e.session.getTextRange(e.session.getWordRange())},SELECTION:function(e,t,n){var i=e.session.getTextRange();return n?i.replace(/\n\r?([ \t]*\S)/g,"\n"+n+"$1"):i},CURRENT_LINE:function(e){return e.session.getLine(e.getCursorPosition().row)},PREV_LINE:function(e){return e.session.getLine(e.getCursorPosition().row-1)},LINE_INDEX:function(e){return e.getCursorPosition().row},LINE_NUMBER:function(e){return e.getCursorPosition().row+1},SOFT_TABS:function(e){return e.session.getUseSoftTabs()?"YES":"NO"},TAB_SIZE:function(e){return e.session.getTabSize()},CLIPBOARD:function(e){return h.getText&&h.getText()},FILENAME:function(e){return/[^/\\]*$/.exec(this.FILEPATH(e))[0]},FILENAME_BASE:function(e){return/[^/\\]*$/.exec(this.FILEPATH(e))[0].replace(/\.[^.]*$/,"")},DIRECTORY:function(e){return this.FILEPATH(e).replace(/[^/\\]*$/,"")},FILEPATH:function(e){return"/not implemented.txt"},WORKSPACE_NAME:function(){return"Unknown"},FULLNAME:function(){return"Unknown"},BLOCK_COMMENT_START:function(e){var t=e.session.$mode||{};return t.blockComment&&t.blockComment.start||""},BLOCK_COMMENT_END:function(e){var t=e.session.$mode||{};return t.blockComment&&t.blockComment.end||""},LINE_COMMENT:function(e){return(e.session.$mode||{}).lineCommentStart||""},CURRENT_YEAR:d.bind(null,{year:"numeric"}),CURRENT_YEAR_SHORT:d.bind(null,{year:"2-digit"}),CURRENT_MONTH:d.bind(null,{month:"numeric"}),CURRENT_MONTH_NAME:d.bind(null,{month:"long"}),CURRENT_MONTH_NAME_SHORT:d.bind(null,{month:"short"}),CURRENT_DATE:d.bind(null,{day:"2-digit"}),CURRENT_DAY_NAME:d.bind(null,{weekday:"long"}),CURRENT_DAY_NAME_SHORT:d.bind(null,{weekday:"short"}),CURRENT_HOUR:d.bind(null,{hour:"2-digit",hour12:!1}),CURRENT_MINUTE:d.bind(null,{minute:"2-digit"}),CURRENT_SECOND:d.bind(null,{second:"2-digit"})};function d(e){var t=(new Date).toLocaleString("en-us",e);return 1==t.length?"0"+t:t}l.SELECTED_TEXT=l.SELECTION;var g=function(){function e(){this.snippetMap={},this.snippetNameMap={},this.variables=l}return e.prototype.getTokenizer=function(){return e.$tokenizer||this.createTokenizer()},e.prototype.createTokenizer=function(){function t(e){return e=e.substr(1),/^\d+$/.test(e)?[{tabstopId:parseInt(e,10)}]:[{text:e}]}function n(e){return"(?:[^\\\\"+e+"]|\\\\.)"}var i={regex:"/("+n("/")+"+)/",onMatch:function(e,t,n){var i=n[0];return i.fmtString=!0,i.guard=e.slice(1,-1),i.flag="",""},next:"formatString"};return e.$tokenizer=new u({start:[{regex:/\\./,onMatch:function(e,t,n){var i=e[1];return("}"==i&&n.length||-1!="`$\\".indexOf(i))&&(e=i),[e]}},{regex:/}/,onMatch:function(e,t,n){return[n.length?n.shift():e]}},{regex:/\$(?:\d+|\w+)/,onMatch:t},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(e,n,i){var r=t(e.substr(1));return i.unshift(r[0]),r},next:"snippetVar"},{regex:/\n/,token:"newline",merge:!1}],snippetVar:[{regex:"\\|"+n("\\|")+"*\\|",onMatch:function(e,t,n){var i=e.slice(1,-1).replace(/\\[,|\\]|,/g,(function(e){return 2==e.length?e[1]:"\0"})).split("\0").map((function(e){return{value:e}}));return n[0].choices=i,[i[0]]},next:"start"},i,{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:/:/,onMatch:function(e,t,n){return n.length&&n[0].expectElse?(n[0].expectElse=!1,n[0].ifEnd={elseEnd:n[0]},[n[0].ifEnd]):":"}},{regex:/\\./,onMatch:function(e,t,n){var i=e[1];return"}"==i&&n.length||-1!="`$\\".indexOf(i)?e=i:"n"==i?e="\n":"t"==i?e="\t":-1!="ulULE".indexOf(i)&&(e={changeCase:i,local:i>"a"}),[e]}},{regex:"/\\w*}",onMatch:function(e,t,n){var i=n.shift();return i&&(i.flag=e.slice(1,-1)),this.next=i&&i.tabstopId?"start":"",[i||e]},next:"start"},{regex:/\$(?:\d+|\w+)/,onMatch:function(e,t,n){return[{text:e.slice(1)}]}},{regex:/\${\w+/,onMatch:function(e,t,n){var i={text:e.slice(2)};return n.unshift(i),[i]},next:"formatStringVar"},{regex:/\n/,token:"newline",merge:!1},{regex:/}/,onMatch:function(e,t,n){var i=n.shift();return this.next=i&&i.tabstopId?"start":"",[i||e]},next:"start"}],formatStringVar:[{regex:/:\/\w+}/,onMatch:function(e,t,n){return n[0].formatFunction=e.slice(2,-1),[n.shift()]},next:"formatString"},i,{regex:/:[\?\-+]?/,onMatch:function(e,t,n){"+"==e[1]&&(n[0].ifEnd=n[0]),"?"==e[1]&&(n[0].expectElse=!0)},next:"formatString"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"formatString"}]}),e.$tokenizer},e.prototype.tokenizeTmSnippet=function(e,t){return this.getTokenizer().getLineTokens(e,t).tokens.map((function(e){return e.value||e}))},e.prototype.getVariableValue=function(e,t,n){if(/^\d+$/.test(t))return(this.variables.__||{})[t]||"";if(/^[A-Z]\d+$/.test(t))return(this.variables[t[0]+"__"]||{})[t.substr(1)]||"";if(t=t.replace(/^TM_/,""),!this.variables.hasOwnProperty(t))return"";var i=this.variables[t];return"function"==typeof i&&(i=this.variables[t](e,t,n)),null==i?"":i},e.prototype.tmStrFormat=function(e,t,n){if(!t.fmt)return e;var i=t.flag||"",r=t.guard;r=new RegExp(r,i.replace(/[^gim]/g,""));var o="string"==typeof t.fmt?this.tokenizeTmSnippet(t.fmt,"formatString"):t.fmt,s=this,a=e.replace(r,(function(){var e=s.variables.__;s.variables.__=[].slice.call(arguments);for(var t=s.resolveVariables(o,n),i="E",r=0;r<t.length;r++){var a=t[r];if("object"==typeof a)if(t[r]="",a.changeCase&&a.local){var c=t[r+1];c&&"string"==typeof c&&("u"==a.changeCase?t[r]=c[0].toUpperCase():t[r]=c[0].toLowerCase(),t[r+1]=c.substr(1))}else a.changeCase&&(i=a.changeCase);else"U"==i?t[r]=a.toUpperCase():"L"==i&&(t[r]=a.toLowerCase())}return s.variables.__=e,t.join("")}));return a},e.prototype.tmFormatFunction=function(e,t,n){return"upcase"==t.formatFunction?e.toUpperCase():"downcase"==t.formatFunction?e.toLowerCase():e},e.prototype.resolveVariables=function(e,t){for(var n=[],i="",r=!0,o=0;o<e.length;o++){var s=e[o];if("string"!=typeof s){if(s){if(r=!1,s.fmtString){var a=e.indexOf(s,o+1);-1==a&&(a=e.length),s.fmt=e.slice(o+1,a),o=a}if(s.text){var c=this.getVariableValue(t,s.text,i)+"";s.fmtString&&(c=this.tmStrFormat(c,s,t)),s.formatFunction&&(c=this.tmFormatFunction(c,s,t)),c&&!s.ifEnd?(n.push(c),p(s)):!c&&s.ifEnd&&p(s.ifEnd)}else s.elseEnd?p(s.elseEnd):(null!=s.tabstopId||null!=s.changeCase)&&n.push(s)}}else n.push(s),"\n"==s?(r=!0,i=""):r&&(i=/^\t*/.exec(s)[0],r=/\S/.test(s))}function p(t){var n=e.indexOf(t,o+1);-1!=n&&(o=n)}return n},e.prototype.getDisplayTextForSnippet=function(e,t){return f.call(this,e,t).text},e.prototype.insertSnippetForSelection=function(e,t,n){void 0===n&&(n={});var i=f.call(this,e,t,n),r=e.getSelectionRange(),o=e.session.replace(r,i.text),s=new m(e),a=e.inVirtualSelectionMode&&e.selection.index;s.addTabstops(i.tabstops,r.start,o,a)},e.prototype.insertSnippet=function(e,t,n){void 0===n&&(n={});var i=this;if(e.inVirtualSelectionMode)return i.insertSnippetForSelection(e,t,n);e.forEachSelection((function(){i.insertSnippetForSelection(e,t,n)}),null,{keepOrder:!0}),e.tabstopManager&&e.tabstopManager.tabNext()},e.prototype.$getScope=function(e){var t=e.session.$mode.$id||"";if("html"===(t=t.split("/").pop())||"php"===t){"php"!==t||e.session.$mode.inlinePhp||(t="html");var n=e.getCursorPosition(),i=e.session.getState(n.row);"object"===typeof i&&(i=i[0]),i.substring&&("js-"==i.substring(0,3)?t="javascript":"css-"==i.substring(0,4)?t="css":"php-"==i.substring(0,4)&&(t="php"))}return t},e.prototype.getActiveScopes=function(e){var t=this.$getScope(e),n=[t],i=this.snippetMap;return i[t]&&i[t].includeScopes&&n.push.apply(n,i[t].includeScopes),n.push("_"),n},e.prototype.expandWithTab=function(e,t){var n=this,i=e.forEachSelection((function(){return n.expandSnippetForSelection(e,t)}),null,{keepOrder:!0});return i&&e.tabstopManager&&e.tabstopManager.tabNext(),i},e.prototype.expandSnippetForSelection=function(e,t){var n,i=e.getCursorPosition(),r=e.session.getLine(i.row),o=r.substring(0,i.column),s=r.substr(i.column),a=this.snippetMap;return this.getActiveScopes(e).some((function(e){var t=a[e];return t&&(n=this.findMatchingSnippet(t,o,s)),!!n}),this),!!n&&(t&&t.dryRun||(e.session.doc.removeInLine(i.row,i.column-n.replaceBefore.length,i.column+n.replaceAfter.length),this.variables.M__=n.matchBefore,this.variables.T__=n.matchAfter,this.insertSnippetForSelection(e,n.content),this.variables.M__=this.variables.T__=null),!0)},e.prototype.findMatchingSnippet=function(e,t,n){for(var i=e.length;i--;){var r=e[i];if((!r.startRe||r.startRe.test(t))&&((!r.endRe||r.endRe.test(n))&&(r.startRe||r.endRe)))return r.matchBefore=r.startRe?r.startRe.exec(t):[""],r.matchAfter=r.endRe?r.endRe.exec(n):[""],r.replaceBefore=r.triggerRe?r.triggerRe.exec(t)[0]:"",r.replaceAfter=r.endTriggerRe?r.endTriggerRe.exec(n)[0]:"",r}},e.prototype.register=function(e,t){var n=this.snippetMap,i=this.snippetNameMap,r=this;function o(e){return e&&!/^\^?\(.*\)\$?$|^\\b$/.test(e)&&(e="(?:"+e+")"),e||""}function a(e,t,n){return e=o(e),t=o(t),n?(e=t+e)&&"$"!=e[e.length-1]&&(e+="$"):(e+=t)&&"^"!=e[0]&&(e="^"+e),new RegExp(e)}function c(e){e.scope||(e.scope=t||"_"),t=e.scope,n[t]||(n[t]=[],i[t]={});var o=i[t];if(e.name){var c=o[e.name];c&&r.unregister(c),o[e.name]=e}n[t].push(e),e.prefix&&(e.tabTrigger=e.prefix),!e.content&&e.body&&(e.content=Array.isArray(e.body)?e.body.join("\n"):e.body),e.tabTrigger&&!e.trigger&&(!e.guard&&/^\w/.test(e.tabTrigger)&&(e.guard="\\b"),e.trigger=s.escapeRegExp(e.tabTrigger)),(e.trigger||e.guard||e.endTrigger||e.endGuard)&&(e.startRe=a(e.trigger,e.guard,!0),e.triggerRe=new RegExp(e.trigger),e.endRe=a(e.endTrigger,e.endGuard,!0),e.endTriggerRe=new RegExp(e.endTrigger))}e||(e=[]),Array.isArray(e)?e.forEach(c):Object.keys(e).forEach((function(t){c(e[t])})),this._signal("registerSnippets",{scope:t})},e.prototype.unregister=function(e,t){var n=this.snippetMap,i=this.snippetNameMap;function r(e){var r=i[e.scope||t];if(r&&r[e.name]){delete r[e.name];var o=n[e.scope||t],s=o&&o.indexOf(e);s>=0&&o.splice(s,1)}}e.content?r(e):Array.isArray(e)&&e.forEach(r)},e.prototype.parseSnippetFile=function(e){e=e.replace(/\r/g,"");for(var t,n=[],i={},r=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm;t=r.exec(e);){if(t[1])try{i=JSON.parse(t[1]),n.push(i)}catch(c){}if(t[4])i.content=t[4].replace(/^\t/gm,""),n.push(i),i={};else{var o=t[2],s=t[3];if("regex"==o){var a=/\/((?:[^\/\\]|\\.)*)|$/g;i.guard=a.exec(s)[1],i.trigger=a.exec(s)[1],i.endTrigger=a.exec(s)[1],i.endGuard=a.exec(s)[1]}else"snippet"==o?(i.tabTrigger=s.match(/^\S*/)[0],i.name||(i.name=s)):o&&(i[o]=s)}}return n},e.prototype.getSnippetByName=function(e,t){var n,i=this.snippetNameMap;return this.getActiveScopes(t).some((function(t){var r=i[t];return r&&(n=r[e]),!!n}),this),n},e}();r.implement(g.prototype,o);var f=function(e,t,n){void 0===n&&(n={});var i=e.getCursorPosition(),r=e.session.getLine(i.row),o=e.session.getTabString(),s=r.match(/^\s*/)[0];i.column<s.length&&(s=s.slice(0,i.column)),t=t.replace(/\r/g,"");var a=this.tokenizeTmSnippet(t);a=(a=this.resolveVariables(a,e)).map((function(e){return"\n"!=e||n.excludeExtraIndent?"string"==typeof e?e.replace(/\t/g,o):e:e+s}));var c=[];a.forEach((function(e,t){if("object"==typeof e){var n=e.tabstopId,i=c[n];if(i||((i=c[n]=[]).index=n,i.value="",i.parents={}),-1===i.indexOf(e)){e.choices&&!i.choices&&(i.choices=e.choices),i.push(e);var r=a.indexOf(e,t+1);if(-1!==r){var o=a.slice(t+1,r);o.some((function(e){return"object"===typeof e}))&&!i.value?i.value=o:!o.length||i.value&&"string"===typeof i.value||(i.value=o.join(""))}}}})),c.forEach((function(e){e.length=0}));var p={};function u(e){for(var t=[],n=0;n<e.length;n++){var i=e[n];if("object"==typeof i){if(p[i.tabstopId])continue;i=t[e.lastIndexOf(i,n-1)]||{tabstopId:i.tabstopId}}t[n]=i}return t}for(var h=0;h<a.length;h++){var l=a[h];if("object"==typeof l){var d=l.tabstopId,g=c[d],f=a.indexOf(l,h+1);if(p[d])p[d]===l&&(delete p[d],Object.keys(p).forEach((function(e){g.parents[e]=!0})));else{p[d]=l;var m=g.value;"string"!==typeof m?m=u(m):l.fmt&&(m=this.tmStrFormat(m,l,e)),a.splice.apply(a,[h+1,Math.max(0,f-h)].concat(m,l)),-1===g.indexOf(l)&&g.push(l)}}}var b=0,v=0,x="";return a.forEach((function(e){if("string"===typeof e){var t=e.split("\n");t.length>1?(v=t[t.length-1].length,b+=t.length-1):v+=e.length,x+=e}else e&&(e.start?e.end={row:b,column:v}:e.start={row:b,column:v})})),{text:x,tabstops:c,tokens:a}},m=function(){function e(e){if(this.index=0,this.ranges=[],this.tabstops=[],e.tabstopManager)return e.tabstopManager;e.tabstopManager=this,this.$onChange=this.onChange.bind(this),this.$onChangeSelection=s.delayedCall(this.onChangeSelection.bind(this)).schedule,this.$onChangeSession=this.onChangeSession.bind(this),this.$onAfterExec=this.onAfterExec.bind(this),this.attach(e)}return e.prototype.attach=function(e){this.$openTabstops=null,this.selectedTabstop=null,this.editor=e,this.session=e.session,this.editor.on("change",this.$onChange),this.editor.on("changeSelection",this.$onChangeSelection),this.editor.on("changeSession",this.$onChangeSession),this.editor.commands.on("afterExec",this.$onAfterExec),this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)},e.prototype.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this),this.ranges.length=0,this.tabstops.length=0,this.selectedTabstop=null,this.editor.off("change",this.$onChange),this.editor.off("changeSelection",this.$onChangeSelection),this.editor.off("changeSession",this.$onChangeSession),this.editor.commands.off("afterExec",this.$onAfterExec),this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.tabstopManager=null,this.session=null,this.editor=null},e.prototype.onChange=function(e){for(var t="r"==e.action[0],n=this.selectedTabstop||{},i=n.parents||{},r=this.tabstops.slice(),o=0;o<r.length;o++){var s=r[o],a=s==n||i[s.index];if(s.rangeList.$bias=a?0:1,"remove"==e.action&&s!==n){var c=s.parents&&s.parents[n.index],p=s.rangeList.pointIndex(e.start,c);p=p<0?-p-1:p+1;var u=s.rangeList.pointIndex(e.end,c);u=u<0?-u-1:u-1;for(var h=s.rangeList.ranges.slice(p,u),l=0;l<h.length;l++)this.removeRange(h[l])}s.rangeList.$onChange(e)}var d=this.session;this.$inChange||!t||1!=d.getLength()||d.getValue()||this.detach()},e.prototype.updateLinkedFields=function(){var e=this.selectedTabstop;if(e&&e.hasLinkedRanges&&e.firstNonLinked){this.$inChange=!0;for(var n=this.session,i=n.getTextRange(e.firstNonLinked),r=0;r<e.length;r++){var o=e[r];if(o.linked){var s=o.original,a=t.snippetManager.tmStrFormat(i,s,this.editor);n.replace(o,a)}}this.$inChange=!1}},e.prototype.onAfterExec=function(e){e.command&&!e.command.readOnly&&this.updateLinkedFields()},e.prototype.onChangeSelection=function(){if(this.editor){for(var e=this.editor.selection.lead,t=this.editor.selection.anchor,n=this.editor.selection.isEmpty(),i=0;i<this.ranges.length;i++)if(!this.ranges[i].linked){var r=this.ranges[i].contains(e.row,e.column),o=n||this.ranges[i].contains(t.row,t.column);if(r&&o)return}this.detach()}},e.prototype.onChangeSession=function(){this.detach()},e.prototype.tabNext=function(e){var t=this.tabstops.length,n=this.index+(e||1);(n=Math.min(Math.max(n,1),t))==t&&(n=0),this.selectTabstop(n),this.updateTabstopMarkers(),0===n&&this.detach()},e.prototype.selectTabstop=function(e){this.$openTabstops=null;var t=this.tabstops[this.index];if(t&&this.addTabstopMarkers(t),this.index=e,(t=this.tabstops[this.index])&&t.length){this.selectedTabstop=t;var n=t.firstNonLinked||t;if(t.choices&&(n.cursor=n.start),this.editor.inVirtualSelectionMode)this.editor.selection.fromOrientedRange(n);else{var i=this.editor.multiSelect;i.toSingleRange(n);for(var r=0;r<t.length;r++)t.hasLinkedRanges&&t[r].linked||i.addRange(t[r].clone(),!0)}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler),this.selectedTabstop&&this.selectedTabstop.choices&&this.editor.execCommand("startAutocomplete",{matches:this.selectedTabstop.choices})}},e.prototype.addTabstops=function(e,t,n){var i=this.useLink||!this.editor.getOption("enableMultiselect");if(this.$openTabstops||(this.$openTabstops=[]),!e[0]){var r=a.fromPoints(n,n);v(r.start,t),v(r.end,t),e[0]=[r],e[0].index=0}var o=[this.index+1,0],s=this.ranges,p=this.snippetId=(this.snippetId||0)+1;e.forEach((function(e,n){var r=this.$openTabstops[n]||e;r.snippetId=p;for(var u=0;u<e.length;u++){var h=e[u],l=a.fromPoints(h.start,h.end||h.start);b(l.start,t),b(l.end,t),l.original=h,l.tabstop=r,s.push(l),r!=e?r.unshift(l):r[u]=l,h.fmtString||r.firstNonLinked&&i?(l.linked=!0,r.hasLinkedRanges=!0):r.firstNonLinked||(r.firstNonLinked=l)}r.firstNonLinked||(r.hasLinkedRanges=!1),r===e&&(o.push(r),this.$openTabstops[n]=r),this.addTabstopMarkers(r),r.rangeList=r.rangeList||new c,r.rangeList.$bias=0,r.rangeList.addList(r)}),this),o.length>2&&(this.tabstops.length&&o.push(o.splice(2,1)[0]),this.tabstops.splice.apply(this.tabstops,o))},e.prototype.addTabstopMarkers=function(e){var t=this.session;e.forEach((function(e){e.markerId||(e.markerId=t.addMarker(e,"ace_snippet-marker","text"))}))},e.prototype.removeTabstopMarkers=function(e){var t=this.session;e.forEach((function(e){t.removeMarker(e.markerId),e.markerId=null}))},e.prototype.updateTabstopMarkers=function(){if(this.selectedTabstop){var e=this.selectedTabstop.snippetId;0===this.selectedTabstop.index&&e--,this.tabstops.forEach((function(t){t.snippetId===e?this.addTabstopMarkers(t):this.removeTabstopMarkers(t)}),this)}},e.prototype.removeRange=function(e){var t=e.tabstop.indexOf(e);-1!=t&&e.tabstop.splice(t,1),-1!=(t=this.ranges.indexOf(e))&&this.ranges.splice(t,1),-1!=(t=e.tabstop.rangeList.ranges.indexOf(e))&&e.tabstop.splice(t,1),this.session.removeMarker(e.markerId),e.tabstop.length||(-1!=(t=this.tabstops.indexOf(e.tabstop))&&this.tabstops.splice(t,1),this.tabstops.length||this.detach())},e}();m.prototype.keyboardHandler=new p,m.prototype.keyboardHandler.bindKeys({Tab:function(e){t.snippetManager&&t.snippetManager.expandWithTab(e)||(e.tabstopManager.tabNext(1),e.renderer.scrollCursorIntoView())},"Shift-Tab":function(e){e.tabstopManager.tabNext(-1),e.renderer.scrollCursorIntoView()},Esc:function(e){e.tabstopManager.detach()}});var b=function(e,t){0==e.row&&(e.column+=t.column),e.row+=t.row},v=function(e,t){e.row==t.row&&(e.column-=t.column),e.row-=t.row};i.importCssString("\n.ace_snippet-marker {\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    background: rgba(194, 193, 208, 0.09);\n    border: 1px dotted rgba(211, 208, 235, 0.62);\n    position: absolute;\n}","snippets.css",!1),t.snippetManager=new g;var x=e("./editor").Editor;(function(){this.insertSnippet=function(e,n){return t.snippetManager.insertSnippet(this,e,n)},this.expandSnippet=function(e){return t.snippetManager.expandWithTab(this,e)}}).call(x.prototype)})),ace.define("ace/ext/emmet",["require","exports","module","ace/keyboard/hash_handler","ace/editor","ace/snippets","ace/range","ace/config","resources","resources","tabStops","resources","utils","actions"],(function(e,t,n){"use strict";var i,r,o=e("../keyboard/hash_handler").HashHandler,s=e("../editor").Editor,a=e("../snippets").snippetManager,c=e("../range").Range,p=e("../config"),u=function(){function e(){}return e.prototype.setupContext=function(e){this.ace=e,this.indentation=e.session.getTabString(),i||(i=window.emmet),(i.resources||i.require("resources")).setVariable("indentation",this.indentation),this.$syntax=null,this.$syntax=this.getSyntax()},e.prototype.getSelectionRange=function(){var e=this.ace.getSelectionRange(),t=this.ace.session.doc;return{start:t.positionToIndex(e.start),end:t.positionToIndex(e.end)}},e.prototype.createSelection=function(e,t){var n=this.ace.session.doc;this.ace.selection.setRange({start:n.indexToPosition(e),end:n.indexToPosition(t)})},e.prototype.getCurrentLineRange=function(){var e=this.ace,t=e.getCursorPosition().row,n=e.session.getLine(t).length,i=e.session.doc.positionToIndex({row:t,column:0});return{start:i,end:i+n}},e.prototype.getCaretPos=function(){var e=this.ace.getCursorPosition();return this.ace.session.doc.positionToIndex(e)},e.prototype.setCaretPos=function(e){var t=this.ace.session.doc.indexToPosition(e);this.ace.selection.moveToPosition(t)},e.prototype.getCurrentLine=function(){var e=this.ace.getCursorPosition().row;return this.ace.session.getLine(e)},e.prototype.replaceContent=function(e,t,n,i){null==n&&(n=null==t?this.getContent().length:t),null==t&&(t=0);var r=this.ace,o=r.session.doc,s=c.fromPoints(o.indexToPosition(t),o.indexToPosition(n));r.session.remove(s),s.end=s.start,e=this.$updateTabstops(e),a.insertSnippet(r,e)},e.prototype.getContent=function(){return this.ace.getValue()},e.prototype.getSyntax=function(){if(this.$syntax)return this.$syntax;var e=this.ace.session.$modeId.split("/").pop();if("html"==e||"php"==e){var t=this.ace.getCursorPosition(),n=this.ace.session.getState(t.row);"string"!=typeof n&&(n=n[0]),n&&((n=n.split("-")).length>1?e=n[0]:"php"==e&&(e="html"))}return e},e.prototype.getProfileName=function(){var e=i.resources||i.require("resources");switch(this.getSyntax()){case"css":return"css";case"xml":case"xsl":return"xml";case"html":var t=e.getVariable("profile");return t||(t=-1!=this.ace.session.getLines(0,2).join("").search(/<!DOCTYPE[^>]+XHTML/i)?"xhtml":"html"),t;default:var n=this.ace.session.$mode;return n.emmetConfig&&n.emmetConfig.profile||"xhtml"}},e.prototype.prompt=function(e){return prompt(e)},e.prototype.getSelection=function(){return this.ace.session.getTextRange()},e.prototype.getFilePath=function(){return""},e.prototype.$updateTabstops=function(e){var t=0,n=null,r=i.tabStops||i.require("tabStops"),o=(i.resources||i.require("resources")).getVocabulary("user"),s={tabstop:function(e){var i=parseInt(e.group,10),o=0===i;o?i=++t:i+=1e3;var a=e.placeholder;a&&(a=r.processText(a,s));var c="${"+i+(a?":"+a:"")+"}";return o&&(n=[e.start,c]),c},escape:function(e){return"$"==e?"\\$":"\\"==e?"\\\\":e}};if(e=r.processText(e,s),o.variables.insert_final_tabstop&&!/\$\{0\}$/.test(e))e+="${0}";else if(n){e=(i.utils?i.utils.common:i.require("utils")).replaceSubstring(e,"${0}",n[0],n[1])}return e},e}(),h={expand_abbreviation:{mac:"ctrl+alt+e",win:"alt+e"},match_pair_outward:{mac:"ctrl+d",win:"ctrl+,"},match_pair_inward:{mac:"ctrl+j",win:"ctrl+shift+0"},matching_pair:{mac:"ctrl+alt+j",win:"alt+j"},next_edit_point:"alt+right",prev_edit_point:"alt+left",toggle_comment:{mac:"command+/",win:"ctrl+/"},split_join_tag:{mac:"shift+command+'",win:"shift+ctrl+`"},remove_tag:{mac:"command+'",win:"shift+ctrl+;"},evaluate_math_expression:{mac:"shift+command+y",win:"shift+ctrl+y"},increment_number_by_1:"ctrl+up",decrement_number_by_1:"ctrl+down",increment_number_by_01:"alt+up",decrement_number_by_01:"alt+down",increment_number_by_10:{mac:"alt+command+up",win:"shift+alt+up"},decrement_number_by_10:{mac:"alt+command+down",win:"shift+alt+down"},select_next_item:{mac:"shift+command+.",win:"shift+ctrl+."},select_previous_item:{mac:"shift+command+,",win:"shift+ctrl+,"},reflect_css_value:{mac:"shift+command+r",win:"shift+ctrl+r"},encode_decode_data_url:{mac:"shift+ctrl+d",win:"ctrl+'"},expand_abbreviation_with_tab:"Tab",wrap_with_abbreviation:{mac:"shift+ctrl+a",win:"shift+ctrl+a"}},l=new u;for(var d in t.commands=new o,t.runEmmetCommand=function e(n){if("expand_abbreviation_with_tab"==this.action){if(!n.selection.isEmpty())return!1;var r=n.selection.lead,o=n.session.getTokenAt(r.row,r.column);if(o&&/\btag\b/.test(o.type))return!1}try{l.setupContext(n);var s=i.actions||i.require("actions");if("wrap_with_abbreviation"==this.action)return setTimeout((function(){s.run("wrap_with_abbreviation",l)}),0);var a=s.run(this.action,l)}catch(u){if(!i){var c=t.load(e.bind(this,n));return"expand_abbreviation_with_tab"!=this.action&&c}n._signal("changeStatus","string"==typeof u?u:u.message),p.warn(u),a=!1}return a},h)t.commands.addCommand({name:"emmet:"+d,action:d,bindKey:h[d],exec:t.runEmmetCommand,multiSelectAction:"forEach"});t.updateCommands=function(e,n){n?e.keyBinding.addKeyboardHandler(t.commands):e.keyBinding.removeKeyboardHandler(t.commands)},t.isSupportedMode=function(e){if(!e)return!1;if(e.emmetConfig)return!0;var t=e.$id||e;return/css|less|scss|sass|stylus|html|php|twig|ejs|handlebars/.test(t)},t.isAvailable=function(e,n){if(/(evaluate_math_expression|expand_abbreviation)$/.test(n))return!0;var i=e.session.$mode,r=t.isSupportedMode(i);if(r&&i.$modes)try{l.setupContext(e),/js|php/.test(l.getSyntax())&&(r=!1)}catch(o){}return r};var g=function(e,n){var i=n;if(i){var r=t.isSupportedMode(i.session.$mode);!1===e.enableEmmet&&(r=!1),r&&t.load(),t.updateCommands(i,r)}};t.load=function(e){return"string"!==typeof r?(p.warn("script for emmet-core is not loaded"),!1):(p.loadModule(r,(function(){r=null,e&&e()})),!0)},t.AceEmmetEditor=u,p.defineOptions(s.prototype,"editor",{enableEmmet:{set:function(e){this[e?"on":"removeListener"]("changeMode",g),g({enableEmmet:!!e},this)},value:!0}}),t.setCore=function(e){"string"==typeof e?r=e:i=e}})),ace.require(["ace/ext/emmet"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}));