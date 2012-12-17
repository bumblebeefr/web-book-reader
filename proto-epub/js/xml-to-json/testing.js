$(function(){
/**
 # * THIS FILE CONTAINS CODE USED FOR TESTING *
 # Feel free to use it as a basis for your own work
	# but only if you know what you're doing
**/
	
	// Override plugin in documentation page
	// so we can show every call in Firebug
 $.xml2json_original = $.xml2json;
	$.xml2json = function(xml, extended){
		var json = $.xml2json_original(xml, extended);
		if(window.console) console.log(['XML:',xml,'JSON:',json]);
		return json;
	};
	
	// Set of tests showing results in simple/extended mode
	$('.structure-test').each(function(){
  var extended = $(this).hasClass('extended');
		$('a', this).each(function(){
			var ref = this.href;
			$(this)
			.after(
    $('<div class="test-result"></div>')
				.hide()
			)
			.after(
				$('<a href="javascript:;">RUN &raquo;</a>')
				.click(function(){
					var result = $(this).next();
					$.get(ref, function(xml){
						var json = $.xml2json(xml, extended);
						var text = function(node){
							return node.text || (typeof node=='string'?node:'')
							.replace(/"/g,"&quot;").replace(/'/g,"&#39;");
						};
						var walk = function(tree){
							if(!tree) return '';
							var s = '';
							//console.log([tree, typeof tree]);
							if(typeof tree=='string'){
								return '';
							}
							else if(tree.length && !tree.text){
								for(var i=0;i<tree.length;i++)
									s += '<li>['+i+']'+walk(tree[i])+'</li>';
 						}
	 					else{
								for(node in tree){
									if(!extended && node=='text'){}
									else if(node.match(/^\d+$/gi)){}
									else{
 									var txt = text(tree[node]);
										s += '<li>'+node+'';
										if(txt){
											s +=' [<a href="javascript:;" title="'+txt+'"'
													+ ' onclick="window.prompt(\''+node+':\',this.title)"'
													+ '>value</a>]';
										};
										s += ''+walk(tree[node])+'';
										s += '</li>';
 								};// skip byte array of string objects
								};
							};
 						return s? (tree.length && !tree.text?' [length: '+tree.length+']':'') + '<ul>'+s+'</ul>' : '';
						};
						result.html(walk(json)).show('slow');
					});//$.get
				})//click
			)//after
			.after(' | TEST: ')
		});//each a
	});//each table
});//dom ready





//==========
// TEST 1
//==========
$(function(){
	$('#butn-1').click(function(){
		$('#result-1').html('Loading...');
		$.get("data/simple.xml", function(xml){
			var json = $.xml2json(xml);
			if(window.console) console.log(['test-1 json:',json]);
			$('#result-1').html('');
			$.each(json['channel']['item'], function(i, obj){
				$('#result-1').append('<p>Title: '+obj.title+'<br/>Link: '+obj.link+'<br/>Description: '+obj.description+'<br/></p>');
			});
		});
	});
});





//==========
// TEST 2
//==========
$(function(){
	$('#butn-2').click(function(){
		$('#result-2').html('Loading...');
		$.get("data/rss.xml", function(xml){
			var json = $.xml2json(xml);
			if(window.console) console.log(['test-2 json:',json]);
			$('#result-2').html('');
			$.each(json['channel']['item'], function(i, obj){
				$('#result-2').append('<p>Title: '+obj.title+'<br/>Link: '+obj.link+'<br/>Description: '+obj.description+'<br/></p>');
			});
		});
	});
});
