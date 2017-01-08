app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "main.htm"
  })
  .when("/login", {
    templateUrl : "views/login.html",
    controller:'LoginController'
  })
  .when("/sign-up", {
    templateUrl : "views/sign-up.html",
    controller:'SignUpController'
  })
  .when("/shorten-url", {
    templateUrl : "views/shorten-url.html",
    controller:'ShortenUrlController'
  });
});