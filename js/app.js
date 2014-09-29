var app = angular.module('lyricHub', []);
app.controller("lyricHubController", ['$scope','$http', function ($scope, $http) {
	$scope.songName = "";
	$scope.artistName = "";
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
	$scope.validate = function () {
		console.log(songIn);
		var songIn = $scope.songName.trim().toLowerCase();
		var artistIn = $scope.artistName.trim().toLowerCase();
		if((songIn.length < 1) && (artistIn.length < 1)) {
			console.log("first condition passed");
			alert("You must input one of either Song Name or Artist Name!");
		}else {
			$scope.getSongLyrics();
			$scope.getSongs();
		}
	},

	$scope.getSongLyrics = function () {
		console.log("get lyrics is running");
		$scope.startRequest = true;
		var songIn = $scope.songName.trim().toLowerCase();
		var artistIn = $scope.artistName.trim().toLowerCase();
		config.params.song = songIn;
		config.params.artist = artistIn;
		if (songIn.length < 1 || artistIn.length < 1) {
			$scope.errMessage = { text : "...Please put both the Artist and Song names to generate the lyrics. If you\'re uncertain, consult the search results on the right."};
		}else {
			$http.jsonp(url, config).success(function (response) {
				console.log(response);
				$scope.song = response;
			});
		}
	},

	$scope.getSongs = function () {
		console.log("get songs is running");
		$scope.startRequest = true;
		var songIn = $scope.songName.trim().toLowerCase();
		var artistIn = $scope.artistName.trim().toLowerCase();
		if (songIn.length < 1) {
				config2.params.q = songIn;
			}else {
				config2.params.q = artistIn;
			}
		$http.jsonp(url1, config2).success(function (response) {
			console.log(response);
			$scope.listen = config2.params.client_id;
			$scope.songs = response;
		});

	},

	$scope.albumArt = function (e) {
		if(e == null) {
			return e = "img/albumArt.jpg";
		}else {
			return e;
		}
	}

	// $scope.playSong = function () {
	// 	$scope.songPlay.play();
	// 	return false;
	// };

	
}]);