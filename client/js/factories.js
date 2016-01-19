app.factory("GameFactory", GameFactory);
GameFactory.$inject = [
"firebaseRootService",
"$firebaseObject"
];

function GameFactory(firebaseRootService, $firebaseObject) {
  return function (gameKey) {
    // create a reference to the database where we will store our data
    var gameRef = firebaseRootService.games.child(gameKey);
    // return it as a synchronized object
    return $firebaseObject(gameRef);
  };
}