angular.module('itunes').service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.



  //Gets the itunes API
  // this is a function called this.getInfo, this. refers to the page that this function lays on, the service page,
  // itunesService will identify it on other pages. the param, artist is being passed into the function as well.
  this.getInfo = function (artist) {
    // deferred is a variable that contains the data, $q.defer(); this 
    var deferred = $q.defer();
    $http({
      method: "JSONP",
      url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
    }).then(function (response) {
      var parsedResponse = response.data.results;
      // Makes an array and pushes the data given into that array
      var arr = [];
      for (var i = 0; i < parsedResponse.length; i++) {
        var formattedArtist = new Artist(parsedResponse[i]);
        arr.push(formattedArtist);
      }
      deferred.resolve(parsedResponse);
    });
    return deferred.promise;
  };

  var Artist = function (artistInfo) {
    this.AlbumArt = artistInfo.artworkUrl60;
    this.Artist = artistInfo.ArtistName;
    this.collection = artistInfo.collectionName;
    this.CollectionPrice = artistInfo.collectionPrice;
    this.Play = artistInfo.previewUrl;
    this.Type = artistInfo.kind;
    this.Explicit = artistInfo.trackExplicitnes;

  };

});
