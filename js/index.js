function pinkScript() {
	$('.a li:not(li:has(.b:has(a)))').css('background', 'pink');
}

function tableScript() {

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
			} else if (document.location.pathname === '/about.html') {
				window.editItem = function (number) {
					$('table#table tbody #item-' + number + '-edit').show();
					$('table#table tbody #item-' + number).hide();
				}

				window.okItem = function (number) {
					$('table#table tbody #item-' + number + '-number').text($('table#table tbody #item-' + number + '-edit-number').val());
					$('table#table tbody #item-' + number + '-title').text($('table#table tbody #item-' + number + '-edit-title').val());
					$('table#table tbody #item-' + number + '-edit').hide();
					$('table#table tbody #item-' + number).show();
				}

				window.removeItem = function (number) {
					$('table#table tbody #item-' + number).remove();
					$('table#table tbody #item-' + number + '-edit').remove();
				}

				$('#submit').on('click', function () {
					if ($('table#table tbody item-' + $('#newNumber').val()).length > 0) {
						alert('Number already exists');
						return false;
					}
					$('table#table tbody').append($('<tr id="item-' + $('#newNumber').val() + '"><td id="item-' + $("#newNumber").val() + '-number">' + $("#newNumber").val() + '</td><td id="item-' + $("#newNumber").val() + '-title">' + $("#newTitle").val() + '</td><td><button onClick="editItem(' + $("#newNumber").val() + ')">Edit</button> <button onClick="removeItem(' + $("#newNumber").val() + ')">Remove</button></td></tr>'));
					$('table#table tbody').append($('<tr id="item-' + $('#newNumber').val() + '-edit" style="display: none;"><td><input type="number" value="' + $("#newNumber").val() + '" id="item-' + $("#newNumber").val() + '-edit-number"></td><td><input value="' + $("#newTitle").val() + '" id="item-' + $("#newNumber").val() + '-edit-title"></td><td><button onClick="okItem(' + $("#newNumber").val() + ')">Ok</button></td></tr>'));
					$('#newNumber').val(parseInt($('#newNumber').val()) + 1);
				});
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
