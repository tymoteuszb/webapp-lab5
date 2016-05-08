function pinkScript() {
	
}

function loadPage() {
	var content = $('#content');
	content.fadeOut(500, function() {
		content.load(document.location.pathname + ' #content', null, function () {
			content.fadeIn(500);
			if (document.location.pathname === '/index.html') {
				$('#list').sortable();
				$('#list').disableSelection();
				pinkScript();
			}
		});
	});
}

$(function () {
	$('body nav a').click(function (e) {
		e.preventDefault();
		var link = $(this)[0];
		history.pushState(null, link.title, link.href);
		loadPage();
	});

	window.onpopstate = loadPage();
});
