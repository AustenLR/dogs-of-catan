{
  "room key": {
    "length": 0,    // number of players in room
    "turnIndex": 0, // current index of turnOrder array
    "turnOrder": [],  // filled with player usernames
    "bank": {
      "res": {
        "h": 19,
        "w": 19,
        "l": 19,
        "o": 19,
        "b": 19
      },
      "dev": {
        
      }
    },

    // PLAYERS 

    "players": {
      "usernameOne": {  // usernames assumed unique
        "points": 0,
        "settlement": 5,
        "city": 4,
        "road": 15,
        "color": "red",
        "intersectionsOwned": {
          // i0: 1     settlement at intersection 0
        },
        "trade in ratios": {
          "l": 4,     // default 4 to 1
          "h": 4,     // some harbors give 3 to 1
          "w": 4,     // some harbors give 2 to 1 specific
          "o": 4,
          "b": 4
        },
        "cards": {
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

    // TILES

    "tiles": {                 
      "t0": {                 
        "resource": "h",    // h, l, b, w, o, d
        "dice roll": 2,     // 2-12
        "robber": false,
        "intersections": {    
          "i0": false,  
          "i1": false,
          "i2": false,
          "i9": false,
          "i10": false,
          "i11": false
        }
      },
      "t1": {                 
        "resource": "h",
        "dice roll": 3,
        "robber": false, 
        "intersections": {    
          "i2": false,  
          "i3": false,
          "i4": false,
          "i11": false,
          "i12": false,
          "i13": false
        }
      },  
      "t2": {                 
        "resource": "h",
        "dice roll": 3,
        "robber": false, 
        "intersections": {    
          "i4": false,  
          "i5": false,
          "i6": false,
          "i13": false,
          "i14": false,
          "i15": false
        }
      },  
      "t3": {                 
        "resource": "h",
        "dice roll": 4,
        "robber": false, 
        "intersections": {    
          "i8": false,  
          "i9": false,
          "i10": false,
          "i18": false,
          "i19": false,
          "i20": false
        }
      },  
      "t4": {                 
        "resource": "l",
        "dice roll": 4,
        "robber": false, 
        "intersections": {    
          "i10": false,  
          "i11": false,
          "i12": false,
          "i20": false,
          "i21": false,
          "i22": false
        }
      },  
      "t5": {                 
        "resource": "l",
        "dice roll": 5,
        "robber": false, 
        "intersections": {    
          "i12": false,  
          "i13": false,
          "i14": false,
          "i22": false,
          "i23": false,
          "i24": false
        }
      },  
      "t6": {                 
        "resource": "l",
        "dice roll": 5,
        "robber": false, 
        "intersections": {    
          "i14": false,  
          "i15": false,
          "i16": false,
          "i24": false,
          "i25": false,
          "i26": false
        }
      },  
      "t7": {                 
        "resource": "l",
        "dice roll": 6,
        "robber": false, 
        "intersections": {    
          "i17": false,  
          "i18": false,
          "i19": false,
          "i28": false,
          "i29": false,
          "i30": false
        }
      },  
      "t8": {                 
        "resource": "w",
        "dice roll": 6,
        "robber": false, 
        "intersections": {    
          "i19": false,  
          "i20": false,
          "i21": false,
          "i30": false,
          "i31": false,
          "i32": false
        }
      },  
      "t9": {                 
        "resource": "w",
        "dice roll": 8,
        "robber": false, 
        "intersections": {    
          "i21": false,  
          "i22": false,
          "i23": false,
          "i32": false,
          "i33": false,
          "i34": false
        }
      },  
      "t10": {                 
        "resource": "w",
        "dice roll": 8,
        "robber": false, 
        "intersections": {    
          "i23": false,  
          "i24": false,
          "i25": false,
          "i34": false,
          "i35": false,
          "i36": false
        }
      },  
      "t11": {                 
        "resource": "w",
        "dice roll": 9,
        "robber": false, 
        "intersections": {    
          "i25": false,  
          "i26": false,
          "i27": false,
          "i36": false,
          "i37": false,
          "i38": false
        }
      },  
      "t12": {                 
        "resource": "o",
        "dice roll": 9,
        "robber": false, 
        "intersections": {    
          "i29": false,  
          "i30": false,
          "i31": false,
          "i39": false,
          "i40": false,
          "i41": false
        }
      },  
      "t13": {                 
        "resource": "o",
        "dice roll": 10,
        "robber": false, 
        "intersections": {    
          "i31": false,  
          "i32": false,
          "i33": false,
          "i41": false,
          "i42": false,
          "i43": false
        }
      },  
      "t14": {                 
        "resource": "o",
        "dice roll": 10,
        "robber": false, 
        "intersections": {    
          "i33": false,  
          "i34": false,
          "i35": false,
          "i43": false,
          "i44": false,
          "i45": false
        }
      },  
      "t15": {                 
        "resource": "b",
        "dice roll": 11,
        "robber": false, 
        "intersections": {    
          "i35": false,  
          "i36": false,
          "i37": false,
          "i45": false,
          "i46": false,
          "i47": false
        }
      },  
      "t16": {                 
        "resource": "b",
        "dice roll": 11,
        "robber": false, 
        "intersections": {    
          "i40": false,  
          "i41": false,
          "i42": false,
          "i48": false,
          "i49": false,
          "i50": false
        }
      },  
      "t17": {                 
        "resource": "b",
        "dice roll": 12,
        "robber": false, 
        "intersections": {    
          "i42": false,  
          "i43": false,
          "i44": false,
          "i50": false,
          "i51": false,
          "i52": false
        }
      },  
      "t18": {                 
        "resource": "d",
        "dice roll": 7,
        "robber": false, 
        "intersections": {    
          "i44": false,  
          "i45": false,
          "i46": false,
          "i52": false,
          "i53": false,
          "i54": false
        }
      }
    },

    // INTERSECTIONS

    "intersections": {
      "i0": {
        "trade ratio": false, // harbor ratios
        "roads": {      // edge intersections only
          "i1": false,  // have two neighbors
          "i9": false   // false or player username
        }
      },
      "i1": {
        "trade ratio": false, 
        "roads": {
          "i0": false,  // username indicates ownership
          "i2": false   // redundantly stored between i1.i2 and i2.i1
        }
      },
      "i2": {
        "trade ratio": false, 
        "roads": {
          "i1": false,  // redundantly stored between i1.i2 and i2.i1
          "i11": false,
          "i3": false
        }
      },
      "i3": {
        "trade ratio": false, 
        "roads": {
          "i2": false, 
          "i4": false
        }
      },
      "i4": {
        "trade ratio": false, 
        "roads": {
          "i3": false, 
          "i13": false,
          "i5": false
        }
      },
      "i5": {
        "trade ratio": false, 
        "roads": {
          "i4": false, 
          "i6": false
        }
      },
      "i6": {
        "trade ratio": false, 
        "roads": {
          "i5": false, 
          "i15": false
        }
      },
      "i8": {
        "trade ratio": false, 
        "roads": {
          "i9": false, 
          "i18": false
        }
      },
      "i9": {
        "trade ratio": false, 
        "roads": {
          "i0": false, 
          "i8": false,
          "i10": false
        }
      },
      "i10": {
        "trade ratio": false, 
        "roads": {
          "i9": false, 
          "i20": false,
          "i11": false
        }
      },
      "i11": {
        "trade ratio": false, 
        "roads": {
          "i10": false, 
          "i2": false,
          "i12": false
        }
      },
      "i12": {
        "trade ratio": false, 
        "roads": {
          "i11": false, 
          "i22": false,
          "i13": false
        }
      },
      "i13": {
        "trade ratio": false, 
        "roads": {
          "i12": false, 
          "i4": false,
          "i14": false
        }
      },
      "i14": {
        "trade ratio": false, 
        "roads": {
          "i13": false, 
          "i24": false,
          "i15": false
        }
      },
      "i15": {
        "trade ratio": false, 
        "roads": {
          "i14": false, 
          "i6": false,
          "i16": false
        }
      },
      "i16": {
        "trade ratio": false, 
        "roads": {
          "i15": false, 
          "i26": false
        }
      },
      "i17": {
        "trade ratio": false, 
        "roads": {
          "i18": false, 
          "i28": false
        }
      },
      "i18": {
        "trade ratio": false, 
        "roads": {
          "i8": false, 
          "i17": false,
          "i19": false
        }
      },
      "i19": {
        "trade ratio": false, 
        "roads": {
          "i18": false, 
          "i30": false,
          "i20": false
        }
      },
      "i20": {
        "trade ratio": false, 
        "roads": {
          "i19": false, 
          "i10": false,
          "i21": false
        }
      },
      "i21": {
        "trade ratio": false, 
        "roads": {
          "i20": false, 
          "i32": false,
          "i22": false
        }
      },
      "i22": {
        "trade ratio": false, 
        "roads": {
          "i21": false, 
          "i12": false,
          "i23": false
        }
      },
      "i23": {
        "trade ratio": false, 
        "roads": {
          "i22": false, 
          "i34": false,
          "i24": false
        }
      },
      "i24": {
        "trade ratio": false, 
        "roads": {
          "i23": false, 
          "i14": false,
          "i25": false
        }
      },
      "i25": {
        "trade ratio": false, 
        "roads": {
          "i24": false, 
          "i36": false,
          "i26": false
        }
      },
      "i26": {
        "trade ratio": false, 
        "roads": {
          "i25": false, 
          "i16": false,
          "i27": false
        }
      },
      "i27": {
        "trade ratio": false, 
        "roads": {
          "i26": false, 
          "i38": false
        }
      },
      "i28": {
        "trade ratio": false, 
        "roads": {
          "i17": false, 
          "i29": false
        }
      },
      "i29": {
        "trade ratio": false, 
        "roads": {
          "i28": false, 
          "i39": false,
          "i30": false
        }
      },
      "i30": {
        "trade ratio": false, 
        "roads": {
          "i29": false, 
          "i19": false,
          "i31": false
        }
      },
      "i31": {
        "trade ratio": false, 
        "roads": {
          "i30": false, 
          "i41": false,
          "i32": false
        }
      },
      "i32": {
        "trade ratio": false, 
        "roads": {
          "i31": false, 
          "i21": false,
          "i33": false
        }
      },
      "i33": {
        "trade ratio": false, 
        "roads": {
          "i32": false, 
          "i43": false,
          "i34": false
        }
      },
      "i34": {
        "trade ratio": false, 
        "roads": {
          "i33": false, 
          "i23": false,
          "i35": false
        }
      },
      "i35": {
        "trade ratio": false, 
        "roads": {
          "i34": false, 
          "i45": false,
          "i36": false
        }
      },
      "i36": {
        "trade ratio": false, 
        "roads": {
          "i35": false, 
          "i25": false,
          "i37": false
        }
      },
      "i37": {
        "trade ratio": false, 
        "roads": {
          "i36": false, 
          "i47": false,
          "i38": false
        }
      },
      "i38": {
        "trade ratio": false, 
        "roads": {
          "i27": false, 
          "i37": false
        }
      },
      "i39": {
        "trade ratio": false, 
        "roads": {
          "i29": false, 
          "i40": false
        }
      },
      "i40": {
        "trade ratio": false, 
        "roads": {
          "i39": false, 
          "i48": false,
          "i41": false
        }
      },
      "i41": {
        "trade ratio": false, 
        "roads": {
          "i40": false, 
          "i31": false,
          "i42": false
        }
      },
      "i42": {
        "trade ratio": false, 
        "roads": {
          "i41": false, 
          "i50": false,
          "i43": false
        }
      },
      "i43": {
        "trade ratio": false, 
        "roads": {
          "i42": false, 
          "i33": false,
          "i44": false
        }
      },
      "i44": {
        "trade ratio": false, 
        "roads": {
          "i43": false, 
          "i52": false,
          "i45": false
        }
      },
      "i45": {
        "trade ratio": false, 
        "roads": {
          "i44": false, 
          "i35": false,
          "i46": false
        }
      },
      "i46": {
        "trade ratio": false, 
        "roads": {
          "i45": false, 
          "i54": false,
          "i47": false
        }
      },
      "i47": {
        "trade ratio": false, 
        "roads": {
          "i46": false, 
          "i37": false
        }
      },
      "i48": {
        "trade ratio": false, 
        "roads": {
          "i40": false, 
          "i49": false
        }
      },
      "i49": {
        "trade ratio": false, 
        "roads": {
          "i48": false, 
          "i50": false
        }
      },
      "i50": {
        "trade ratio": false, 
        "roads": {
          "i49": false, 
          "i42": false,
          "i51": false
        }
      },
      "i51": {
        "trade ratio": false, 
        "roads": {
          "i50": false, 
          "i52": false
        }
      },
      "i52": {
        "trade ratio": false, 
        "roads": {
          "i51": false, 
          "i44": false,
          "i53": false
        }
      },
      "i53": {
        "trade ratio": false, 
        "roads": {
          "i52": false, 
          "i54": false
        }
      },
      "i54": {
        "trade ratio": false, 
        "roads": {
          "i53": false, 
          "i46": false
        }
      }
    }
  }
}