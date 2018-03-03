
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $photo = $('#photo');


    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('Γεια σου, θέλεις να μείνεις στην διεύθυνση ' + address + ';');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + ';';
     $photo.empty();
     $photo.append('<img class="bgimg" src="' + streetviewUrl + '">');


     // Me append den allazei i eikona, alla prosthetei neo div apo katw tis

    // NYTimes AJAX request

    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=63d77d6638074dedb4aba904d2197b08'

    $.getJSON(nytimesUrl, function(data) {

    $nytHeaderElem.text('Άρθρα από NYTimes σχετικά με ' + cityStr);

    articles = data.response.docs;
    for (var i = 0; i < articles.length; i++) {
      var article = articles[i];
      $nytElem.append('<li class="articles">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
    };

  }).error(function(e){
    $nytHeaderElem.text('Δεν είναι δυνατή η φόρτωση της ιστοσελίδας!');
  });

  // Wikipedia AJAX request

  var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';

  var wikiRequestTimeout = setTimeout(function() {
    $wikiElem.text("Συγγνώμη, η φόρτωση αποτελεσμάτων απέτυχε!");
  }, 5000);

  $.ajax({
    url: wikiUrl,
    dataType: "jsonp",
    success: function (response) {
      var articleList = response[1];

      for (var i = 0; i < articleList.length; i++) {
        articleStr = articleList[i];
        var url = 'http://en.wikipedia.org/wiki/' + articleStr;
        $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
      };

      clearTimeout(wikiRequestTimeout);
    }
  });


    return false;
};

$('#form-container').submit(loadData);
//
//
