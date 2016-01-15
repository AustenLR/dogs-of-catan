
// rooms contains only meta info about each room
// stored under the room's unique ID

// INITIAL STATE

{"rooms": {                      // /rooms/
  "one": {                      // /rooms/one
    "name": "room alpha",       // /rooms/one/name
    "turnIndex": 1,
    "turnOrder": [],
    "bank": {
      "res": {
        "h": 30,
        "w": 30,
        "l": 30,
        "o": 30,
        "b": 30
      },
      "dev": {
        // ...
      }
    },

    "players": {                  // /rooms/one/players/
      "user_one": {             // /rooms/one/players/user_one
        "username": "mchen",
        "points": 0,
        "settlement": 5,
        "city": 4,
        "road": 15,
        "color": "red",
        "intsOwned": {
          "i1": 1,           // structure type    1:settlement
          "i2": 2
          }
        },
        "tradeRatios": {
          "l": 4,             // 3:1 everything above 3
          "h": 4,             // 2:1 specific resource
          "w": 4,
          "o": 4,
          "b": 4
        },
        "cards": {                // /rooms/one/players/user_one/cards
          "res": {
            "h": 0,
            "w": 0,
            "l": 0,
            "o": 0,
            "b": 0
          },
          "dev": {
            // ...
          }
        }
      },

      "user_two": {             // /rooms/one/players/user_one
        "username": "mchen",
        "points": 0,
        "settlement": 5,
        "city": 4,
        "road": 15,
        "color": "red",
        "intsOwned": {
          "i1": 1,           // structure type    1:settlement
          "i2": 2
          }
        },
        "tradeRatios": {
          "l": 4,             // 3:1 everything above 3
          "h": 4,             // 2:1 specific resource
          "w": 4,
          "o": 4,
          "b": 4
        },
        "cards": {                // /rooms/one/players/user_one/cards
          "res": {
            "h": 0,
            "w": 0,
            "l": 0,
            "o": 0,
            "b": 0
          },
          "dev": {
            // ...
          }
        }
      }

    },

    "tiles": {                  // /rooms/one/tiles
      "t1": {                 // /rooms/one/tiles/t1
        "res": "h",
        "diceRoll": 8,
        "robber": false,
        "ints": {             // /rooms/one/tiles/t1/ints
          "i1": "ownerKey",     // value contains owner key
          "i2": true,
          "i13": true
          // 6 total
          }
        },
      // more tiles
      "t18": {
        "res": "hay",
        "diceRoll": 3,
        "ints": {    // /rooms/one/tiles/t1/ints
          "i1": true,
          "i3": true,
          "i17": true
          }
      },
      "t19": {
        "res": "hay",
        "diceRoll": 6,
        "ints": {    // /rooms/one/tiles/t1/ints
          "i1": true,
          "i2": true,
          "i3": true
          }
      }
    },

    "ints": {
      "i1": {
        "trade ratio": 4,    // initialized for harbor pieces
        "roads": {        // roads
          "i2": false,        // false or player id
          "i3": false,
          "i4": false
        },

        "ints_tiles": {       // might not be used??
          "t1": true,
          "t2": true,
          "t3": true
          }
        }
      },

      "i2": {
        "structure": 0,
        "trade ratio": 4, 
        "ints_ints": {
          "i5": false,
          "i3": true,
          "i4": false
        },

        "ints_tiles": {
          "t1": true,
          "t2": true,
          "t3": true
          }
        }
      }
  }

// END INITIAL





function sample(from, to, type, count) {
  // ratio = ratio || 1
  // ref = room_id
  // fromRef = ref.child(from).child(type)
  // toRef = ref.child(to).child(type)
  // fromRef loses count * ratio
  // toRef gains count
}
















// EXPERIMENT BELOW
// messages are separate from data we may want to iterate quickly
// but still easily paginated and queried, and organized by room ID
"tiles": {
  "one": {
    "t1": {
      "resource": "hay"
      "dice roll": 8
      "ints": {
          int1_key: value,
          int2_key: value,
          int3_key: value,
        }
      },
    "t18": { ... },
    "t19": { ... }
  },
  "two": { ... },
  "three": { ... }
}

"ints": {
  "one": {

  }
}


"users": {
  "user_one": {
    name: "mchen"
  }
  "user_two": {
    name: "b"
  }
}

"players": {
  // we'll talk about indices like this below
  "one": {
    "user_one": {
      username: "mchen"
      points:
      settlement:
      city:
      road:
      color:
    },
    "b": true
  },

  "two": { ... },
  "three": { ... }
},

"cards":
  "user_one": {
    dev: {
      // ...
    }
    res: {
      h: 1
      w: 2
      l: 3
      o: 6
      b: 0
    }
  }
}

""

"points": {
  "user_one": 123
}
}