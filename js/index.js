function loadPage() {
	$('#content').load(document.location + ' #content');
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
