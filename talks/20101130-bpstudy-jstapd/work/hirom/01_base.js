ok(1, 'ok 1');
ok(!0, 'ok 0');
is('test', 'test', 'is');
isnt('test', 'dev', 'isnt');
like('test', new RegExp('es'), 'like');
$('#test').is_text('DATA');
$('#test').like_text(new RegExp('ATA'));
$('#test').is_visible(1);
