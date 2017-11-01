$(function() {
    $('#buttonId').click(function() {
        $.get('/api/protected/meGusto', function(res) {
            var $h3Id = $('#h3Id').html(res);
            console.log($h3Id);
        });
    });
});

