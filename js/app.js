var app = angular.module('lyricHub', []);
app.controller("lyricHubController", ['$scope','$http', function ($scope, $http) {
	var startRequest = false;
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
		startRequest = true;
		$scope.getSongs();
		config.params.song = $scope.songName.trim().toLowerCase();
		config.params.artist = $scope.artistName.trim().toLowerCase();
		$http.jsonp(url, config).success(function (response) {
			console.log(response);
			startRequest = false;
			$scope.song = response;
		});
	};

	$scope.getSongs = function () {
		startRequest = true;
		if ($scope.songName == "") {
				config2.params.q = $scope.artistName.trim().toLowerCase();
			}else {
				config2.params.q = $scope.songName.trim().toLowerCase();
			}
		$http.jsonp(url1, config2).success(function (response) {
			console.log(response);
			startRequest = false;
			$scope.songs = response;
			// var albumArt = response.artwork_url;
			// if (albumArt == undefined) {
			// 	albumArt = "img/albumArt.jpg";
		});
	};

	
}]);