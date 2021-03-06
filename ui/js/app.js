angular.module('app', [])
  .controller('MainCtrl', function($scope, $http){

    var apigClient;
      //AWS Credentialの初期化
      AWS.config.region = 'ap-northeast-1';
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'ap-northeast-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' //Identity Pool Id
      });
      AWS.config.credentials.get(function(err){
        if(!err){
          //API ClientにaccessKey,secretKey,sessionToken,regionを設定し、初期化します。
          apigClient = apigClientFactory.newClient({
            accessKey: AWS.config.credentials.accessKeyId,
            secretKey: AWS.config.credentials.secretAccessKey,
            sessionToken: AWS.config.credentials.sessionToken,//大事
            region: 'ap-northeast-1'//大事
          });
        }else{
          console.log(err);
        }
      });


    var self = $scope;
    var req = {
      method: 'GET',
      url:    'https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/Stages/movies'/*,
      headers: {
        'hoge': 'hoge'
      }*/
    }

    self.movies = [];
    self.movie = {};
    self.error = '';

    self.getMovies = function(){
      $http(req).then(function(res){console.log(res);
        self.movies = res.data;
      })
    }

    self.create = function(){
      apigClient.moviesPost({}, self.movie).then(function(res){
        self.getMovies();
        self.movie = '';
        self.error = '';
      }, function(err){
        self.error = err.data.status;
      });
    }

    self.getMovies();
  });
