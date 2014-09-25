var app = angular.module('lyricHub', []);
app.controller("lyricHubController", ['$scope','$http', function ($scope, $http) {
	var url = "https://lyrics.wikia.com/api.php";
	var url1 = 'https://api.soundcloud.com/tracks.json';
	var config = {
			params : {
				fmt: 'realjson',
				callback: 'JSON_CALLBACK'
				}
		};
	var config2 = {
			params : {
				client_id: 'a5d568cd2894d82c7060a31ab7a67348',
				callback: 'JSON_CALLBACK'
				}
		};

	$scope.getSongLyrics = function () {
		$scope.getSongs();
		config.params.song = $scope.songName;
		config.params.artist = $scope.artistName;
		$http.jsonp(url, config).success(function (response) {
			console.log(response);
		});
	};

	$scope.getSongs = function () {
		config2.params.q = $scope.songName;
		$http.jsonp(url1, config2).success(function (response) {
			console.log(response);
			$scope.songs = response;
			var albumArt = response.artwork_url;
			if (albumArt == undefined) {
				albumArt = "img/albumArt.jpg";
			}
		});
	};

	
}]);