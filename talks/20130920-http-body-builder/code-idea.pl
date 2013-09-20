

use v5.20;


my $builder = HTTP::Body::Builder::FormData->new;
$builder->add_file( bar => '/foo/bar.jpg');
$builder->add_content( baz => 'ball' );







say $builder->boundary; # -> aBcjd3
say $builder->content_type;
# -> multipart/form-data, boundary=aBcjd3







say $builder->as_string; # ->
#--aBcjd3
#Content-Disposition: form-data; name="bar"; filename="bar.jpg"
#Content-Type: image/jpeg
#
#... binary ...
#--aBcjd3
#Content-Disposition: form-data; name="baz"
#Content-Type: image/jpeg
#
#ball
#--aBcjd3--





$builder->write_file('/tmp/http-body.txt'); # out put file





my $req = HTTP::Request->new('POST', $uri, $headers);
$req->content($builder->content_cb);
my $res = LWP::UserAgent->new->request($req);


my $res = Furl->new->post($uri, $headers, $builder->content_cb);
