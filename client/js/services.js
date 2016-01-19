app.service("firebaseRootService", firebaseRootService);

function firebaseRootService() {
  var root = new Firebase("https://radiant-torch-8665.firebaseio.com/dogs-of-catan");
  return {
    root: root,
    users: root.child("users"),
    games: root.child("games"),
    messages: root.child("messages")
  };
}

app.service("AuthService", AuthService);
AuthService.$inject = ["firebaseRootService", "$firebaseAuth", "$firebaseObject"];

app.service("GameService", GameService);
GameService.$inject = ["firebaseRootService", "$firebaseObject", "$firebaseArray", "UserService"];

app.service("MessageService", MessageService);
MessageService.$inject = ["firebaseRootService", "$firebaseArray", "UserService"];

app.service("UserService", ["$window", function($window){
  return{
    setCurrentUser: function(user){
      user.username = user.password.email.split("@")[0];
      $window.localStorage.setItem("user",JSON.stringify(user));
    },
    getCurrentUser: function(){
      return JSON.parse($window.localStorage.getItem("user"));
    }
  };
}]);


// Services

function AuthService(firebaseRootService, $firebaseAuth, $firebaseObject) {
  var authRef = firebaseRootService.root;
  var userRef = firebaseRootService.users;
  var firebaseAuthObject = $firebaseAuth(authRef);
  var firebaseUserObject = $firebaseObject(userRef);

  var service = {
    signup: signup,
    createUser: createUser,
    login: login,
    logout: logout,
    setCurrentUser: setCurrentUser,
    getCurrentUser: getCurrentUser
  };

  return service;



  function signup(inputs) {
    return firebaseAuthObject.$createUser(inputs);
  }

  function createUser(user) {
    // CODE???
  }

  function login(inputs) {
    return firebaseAuthObject.$authWithPassword(inputs);
  }

  function logout() {
    // $rootScope.$broadcast('logout');
    firebaseAuthObject.$unauth();
  }

}

function GameService(firebaseRootService, $firebaseObject, $firebaseArray, UserService) {
  var gamesRef = firebaseRootService.games;
  var games = $firebaseArray(gamesRef);           //grabbing all the games and presenting them into an array
  var currentUser = UserService.getCurrentUser();
  var username = currentUser.username;

  var service = {
    createGame: createGame,
    getAllGames: getAllGames,
    getGame: getGame,
    joinGame: joinGame,
    leaveGame: leaveGame,
  };

  return service;



  function createGame(newGame) {
    return games.$add(newGame);             //adding the new game to the array
  }

  function getAllGames() {
    return games.$loaded();
  }

  function getGame(gameKey) {
    return $firebaseObject(gamesRef.child(gameKey)).$loaded();
  }

  function joinGame(gameKey) {
    var users = $firebaseObject(gamesRef.child(gameKey).child("users")).$loaded();

    users.then(function (users) {
      users[username] = true;
      users.$save();
    });
  }

  function leaveGame(gameKey, currentUser) {
    var user = $firebaseObject(gamesRef.child(gameKey).child("users").child(currentUser.username));
    user.$remove();
  }
}

function MessageService(firebaseRootService, $firebaseArray, UserService) {
  var messagesRef = firebaseRootService.messages;
  var currentUser = UserService.getCurrentUser();

  var service = {
    createMessage: createMessage,
    getAllMessages: getAllMessages
  };

  return service;



  function createMessage(gameKey, currentUser, message) {
    var firebaseMessagesArray = $firebaseArray(messagesRef.child(gameKey));

    var newMessage = {};
    newMessage.sender = currentUser.username;
    newMessage.message = message;
    firebaseMessagesArray.$loaded()
    .then(function(messageArr){
      messageArr.$add(newMessage);
    });
  }

  function getAllMessages(gameKey) {
    var messageRef = messagesRef.child(gameKey);
    var query = messageRef.limitToLast(25);
    return $firebaseArray(query).$loaded();
  }
}

