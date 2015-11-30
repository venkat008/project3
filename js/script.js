$(document).ready(function(){
  $('#more').hide();
   $('.fancybox').fancybox();

$(function(){
  var tagData,
  nextData,
  tagItems,
  tagName,
  instagramUrl,
  tagItems2,
  nextUrl,
  loadB,
  $tagList = $('.tag-list');
  $('#tag-name-item').on('click', function(event) {
  event.preventDefault();
    // reset all the things
     $('.initial').hide();
     $('#loaader').show();
     $('#more').show();
     $tagList.empty();
     tagData, tagItems = '',
      // get the search string
       tagName = $('#tag-name').val().replace(/ /g, '+'),
      instagramUrl= 'https://api.instagram.com/v1/tags/'+tagName+'/media/recent?count=12&client_id=a22c00bd31ca48e8b3dfc67b51b44262';
      $.ajax({
        method: 'GET',
        url: instagramUrl,
        dataType: 'jsonp'
      })

    .done(function(data) {
      nextUrl = data.pagination.next_url;
      tagData = data.data;
     if ( tagData.length !== 0 ) {
     $('#loaader').hide();
     $.each(tagData, function(key, value) {
        tagItems += '<div class= "pics">';
        tagItems += '<a class="fancybox" rel="gallery" href="'+ value.images.standard_resolution.url +'" class="fancybox" rel="gallery">';
        tagItems += '<img src="' + value.images.standard_resolution.url + '" />';
        tagItems += '</a>';
        tagItems += '<div class="container">';
        tagItems += '<div class="profile">';
        tagItems += '<img src="' + value.caption.from.profile_picture + '" />';
        tagItems += '</div>';
        tagItems += '<ul class="tags">';
        tagItems +='<li>';
        tagItems += '<p>' + value.caption.from.username + '</p>';
        tagItems += '<p>'
        tagItems += '<i class="fa fa-heart"></i> ' +value.likes.count+ ' ';
        tagItems += '<i class="fa fa-comments"></i> ' +value.comments.count;
        tagItems += '</p>'
        tagItems += '</li>';
        tagItems += '</ul>';
        tagItems += '</div>';
        tagItems += '</div>';
    });

     $('#more').on('click',function(event){
     event.preventDefault();
     tagItems2 = '',

       $.ajax({
        method: 'GET',
        url: nextUrl,
        next_max_id: "13872296",
        dataType: 'jsonp'
      })

     .done(function(dat){
     tagData = dat.data;
     nextUrl = dat.pagination.next_url;
     $('#lmore').toggle();
   if (tagData.length!==0){
    $.each(tagData,function(key,value){
        tagItems2 += '<div class= "pics">';
        tagItems2 += '<a class="fancybox" rel="gallery" href="'+ value.images.standard_resolution.url +'" class="fancybox" rel="gallery">';
        tagItems2 += '<img src="' + value.images.standard_resolution.url + '" />';
        tagItems2 += '</a>';
        tagItems2 += '<div class="container">';
        tagItems2 += '<div class="profile">';
        tagItems2 += '<img src="' + value.caption.from.profile_picture + '" />';
        tagItems2 += '</div>';
        tagItems2 += '<ul class="tags">';
        tagItems2 +='<li>';
        tagItems2 += '<p>' + value.caption.from.username + '</p>';
        tagItems2 += '<p>'
        tagItems2 += '<i class="fa fa-heart"></i> ' +value.likes.count+ ' ';
        tagItems2 += '<i class="fa fa-comments"></i> ' +value.comments.count;
        tagItems2 += '</p>'
        tagItems2 += '</li>';
        tagItems2 += '</ul>';
        tagItems2 += '</div>';
        tagItems2 += '</div>';
    });
           }
               $tagList.append(tagItems2);
               $('#lmore').show();
             })

            })
          }


       else {
         $('#loaader').hide();
            tagItems += '<p style="margin-top: 18px;">Sorry, artist not found.</p>';
         }
         $tagList.append(tagItems);
      })
      // and if it fails...
      .fail(function() {
        $('#loaader').hide();
         $tagList.append('<li>Sorry! There was a problem, please try again.</li>');

      });
   });
});
});
