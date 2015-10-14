$(function() {
var albumData,
albumItems,
artistName,
itunesUrl,
$albumList = $('.album-list');
$('#album-search').on('submit', function(event) {
$('.initial').hide();
event.preventDefault();
$('#loaader').show();
$albumList.empty();
albumData, albumItems = '',
artistName = $('#artist-name').val().replace(/ /g, '+'),
itunesUrl = 'https://api.instagram.com/v1/tags/'+artistName+'/media/recent?count=12&client_id=fed3ea7d36644c4993d81a12621c74c8';
$.ajax({
method: 'GET',
url: itunesUrl,
dataType: 'jsonp'
})
.done(function(results) {
albumData = results.data;
if ( albumData.length !== 0 ) {
$.each(albumData, function(key, value) {
albumItems += '<div class= "pics">';
albumItems += '<img src="' + value.images.standard_resolution.url + '" />';
albumItems += '<div class="container">';
albumItems += '<div class="profile">';
albumItems += '<img src="' + value.caption.from.profile_picture + '" />';
albumItems += '</div>';
albumItems += '<ul class="tags">';
albumItems +='<li>';
albumItems += '<p>' + value.caption.from.username + '</p>';
albumItems += '<p>'
albumItems += '<i class="fa fa-heart"></i> ' +value.likes.count+ ' ';
albumItems += '<i class="fa fa-comments"></i> ' +value.comments.count;
albumItems += '</p>'
albumItems += '</li>';
albumItems += '</ul>';
albumItems += '</div>';
albumItems += '</div>';
});
} else {
albumItems += '<p style="margin-top: 18px;">Sorry, images not found.</p>';
}
$albumList.append(albumItems);
 })
      .fail(function() {
         $albumList.append('<li>Sorry! There was a problem, please try again.</li>');
      })
      .always(function(){
      $('#loaader').hide();
    });

   });
});
