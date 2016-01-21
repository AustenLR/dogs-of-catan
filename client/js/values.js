var newPlayer = {
  "points": 0,
  "settlement": 5,
  "city": 4,
  "road": 15,
  "color": "red",
  "intersectionsOwned": {
    // i0: 1     settlement at intersection 0
  },
  "trade in ratios": {
    "l": 4,
    "h": 4,
    "w": 4,
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
};

var newGame = {
  "owner": "default",
  "name": "default",
  "length": 0,
  "turnIndex": 0,
  "turnOrder": [],
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

  // TILES

  "tiles": {                 
    "t0": {                 
      "resource": "h",
      "dice roll": 2,
      "robber": false, 
      "intersections": {    
        "i0": true,        // 0: empty, 1: settlement, 2: city
        "i1": true,
        "i2": true,
        "i9": true,
        "i10": true,
        "i11": true,
        }
      },
    "t1": {                 
      "resource": "h",
      "dice roll": 3,
      "robber": false, 
      "intersections": {    
        "i2": true,  
        "i3": true,
        "i4": true,
        "i11": true,
        "i12": true,
        "i13": true,
        }
      },  
    "t2": {                 
      "resource": "h",
      "dice roll": 3,
      "robber": false, 
      "intersections": {    
        "i4": true,  
        "i5": true,
        "i6": true,
        "i13": true,
        "i14": true,
        "i15": true,
        }
      },  
    "t3": {                 
      "resource": "h",
      "dice roll": 4,
      "robber": false, 
      "intersections": {    
        "i8": true,  
        "i9": true,
        "i10": true,
        "i18": true,
        "i19": true,
        "i20": true,
        }
      },  
    "t4": {                 
      "resource": "l",
      "dice roll": 4,
      "robber": false, 
      "intersections": {    
        "i10": true,  
        "i11": true,
        "i12": true,
        "i20": true,
        "i21": true,
        "i22": true,
        }
      },  
    "t5": {                 
      "resource": "l",
      "dice roll": 5,
      "robber": false, 
      "intersections": {    
        "i12": true,  
        "i13": true,
        "i14": true,
        "i22": true,
        "i23": true,
        "i24": true,
        }
      },  
    "t6": {                 
      "resource": "l",
      "dice roll": 5,
      "robber": false, 
      "intersections": {    
        "i14": true,  
        "i15": true,
        "i16": true,
        "i24": true,
        "i25": true,
        "i26": true,
        }
      },  
    "t7": {                 
      "resource": "l",
      "dice roll": 6,
      "robber": false, 
      "intersections": {    
        "i17": true,  
        "i18": true,
        "i19": true,
        "i28": true,
        "i29": true,
        "i30": true,
        }
      },  
    "t8": {                 
      "resource": "w",
      "dice roll": 6,
      "robber": false, 
      "intersections": {    
        "i19": true,  
        "i20": true,
        "i21": true,
        "i30": true,
        "i31": true,
        "i32": true,
        }
      },  
    "t9": {                 
      "resource": "w",
      "dice roll": 8,
      "robber": false, 
      "intersections": {    
        "i21": true,  
        "i22": true,
        "i23": true,
        "i32": true,
        "i33": true,
        "i34": true,
        }
      },  
    "t10": {                 
      "resource": "w",
      "dice roll": 8,
      "robber": false, 
      "intersections": {    
        "i23": true,  
        "i24": true,
        "i25": true,
        "i34": true,
        "i35": true,
        "i36": true,
        }
      },  
    "t11": {                 
      "resource": "w",
      "dice roll": 9,
      "robber": false, 
      "intersections": {    
        "i25": true,  
        "i26": true,
        "i27": true,
        "i36": true,
        "i37": true,
        "i38": true,
        }
      },  
    "t12": {                 
      "resource": "o",
      "dice roll": 9,
      "robber": false, 
      "intersections": {    
        "i29": true,  
        "i30": true,
        "i31": true,
        "i39": true,
        "i40": true,
        "i41": true,
        }
      },  
    "t13": {                 
      "resource": "o",
      "dice roll": 10,
      "robber": false, 
      "intersections": {    
        "i31": true,  
        "i32": true,
        "i33": true,
        "i41": true,
        "i42": true,
        "i43": true,
        }
      },  
    "t14": {                 
      "resource": "o",
      "dice roll": 10,
      "robber": false, 
      "intersections": {    
        "i33": true,  
        "i34": true,
        "i35": true,
        "i43": true,
        "i44": true,
        "i45": true,
        }
      },  
    "t15": {                 
      "resource": "b",
      "dice roll": 11,
      "robber": false, 
      "intersections": {    
        "i35": true,  
        "i36": true,
        "i37": true,
        "i45": true,
        "i46": true,
        "i47": true,
        }
      },  
    "t16": {                 
      "resource": "b",
      "dice roll": 11,
      "robber": false, 
      "intersections": {    
        "i40": true,  
        "i41": true,
        "i42": true,
        "i48": true,
        "i49": true,
        "i50": true,
        }
      },  
    "t17": {                 
      "resource": "b",
      "dice roll": 12,
      "robber": false, 
      "intersections": {    
        "i42": true,  
        "i43": true,
        "i44": true,
        "i50": true,
        "i51": true,
        "i52": true,
        }
      },  
    "t18": {                 
      "resource": "d",
      "dice roll": 7,
      "robber": false, 
      "intersections": {    
        "i44": true,  
        "i45": true,
        "i46": true,
        "i52": true,
        "i53": true,
        "i54": true,
      },
    },
  },

  // INTERSECTIONS

  "intersections": {
    "i0": {
      "trade ratio": false, 
      "roads": {
        "i1": false,  // playerKey upon building a road; MUST ALSO UPDATE i1.i0
        "i9": false,
      },
    },
    "i1": {
      "trade ratio": false, 
      "roads": {
        "i0": false, 
        "i2": false,
      },
    },
    "i2": {
      "trade ratio": false, 
      "roads": {
        "i1": false, 
        "i11": false,
        "i3": false
      },
    },
    "i3": {
      "trade ratio": false, 
      "roads": {
        "i2": false, 
        "i4": false,
      },
    },
    "i4": {
      "trade ratio": false, 
      "roads": {
        "i3": false, 
        "i13": false,
        "i5": false
      },
    },
    "i5": {
      "trade ratio": false, 
      "roads": {
        "i4": false, 
        "i6": false,
      },
    },
    "i6": {
      "trade ratio": false, 
      "roads": {
        "i5": false, 
        "i15": false,
      },
    },
    "i8": {
      "trade ratio": false, 
      "roads": {
        "i9": false, 
        "i18": false,
      },
    },
    "i9": {
      "trade ratio": false, 
      "roads": {
        "i0": false, 
        "i8": false,
        "i10": false
      },
    },
    "i10": {
      "trade ratio": false, 
      "roads": {
        "i9": false, 
        "i20": false,
        "i11": false
      },
    },
    "i11": {
      "trade ratio": false, 
      "roads": {
        "i10": false, 
        "i2": false,
        "i12": false
      },
    },
    "i12": {
      "trade ratio": false, 
      "roads": {
        "i11": false, 
        "i22": false,
        "i13": false
      },
    },
    "i13": {
      "trade ratio": false, 
      "roads": {
        "i12": false, 
        "i4": false,
        "i14": false
      },
    },
    "i14": {
      "trade ratio": false, 
      "roads": {
        "i13": false, 
        "i24": false,
        "i15": false
      },
    },
    "i15": {
      "trade ratio": false, 
      "roads": {
        "i14": false, 
        "i6": false,
        "i16": false
      },
    },
    "i16": {
      "trade ratio": false, 
      "roads": {
        "i15": false, 
        "i26": false,
      },
    },
    "i17": {
      "trade ratio": false, 
      "roads": {
        "i18": false, 
        "i28": false,
      },
    },
    "i18": {
      "trade ratio": false, 
      "roads": {
        "i8": false, 
        "i17": false,
        "i19": false
      },
    },
    "i19": {
      "trade ratio": false, 
      "roads": {
        "i18": false, 
        "i30": false,
        "i20": false
      },
    },
    "i20": {
      "trade ratio": false, 
      "roads": {
        "i19": false, 
        "i10": false,
        "i21": false
      },
    },
    "i21": {
      "trade ratio": false, 
      "roads": {
        "i20": false, 
        "i32": false,
        "i22": false
      },
    },
    "i22": {
      "trade ratio": false, 
      "roads": {
        "i21": false, 
        "i12": false,
        "i23": false
      },
    },
    "i23": {
      "trade ratio": false, 
      "roads": {
        "i22": false, 
        "i34": false,
        "i24": false
      },
    },
    "i24": {
      "trade ratio": false, 
      "roads": {
        "i23": false, 
        "i14": false,
        "i25": false
      },
    },
    "i25": {
      "trade ratio": false, 
      "roads": {
        "i24": false, 
        "i36": false,
        "i26": false
      },
    },
    "i26": {
      "trade ratio": false, 
      "roads": {
        "i25": false, 
        "i16": false,
        "i27": false
      },
    },
    "i27": {
      "trade ratio": false, 
      "roads": {
        "i26": false, 
        "i38": false,
      },
    },
    "i28": {
      "trade ratio": false, 
      "roads": {
        "i17": false, 
        "i29": false,
      },
    },
    "i29": {
      "trade ratio": false, 
      "roads": {
        "i28": false, 
        "i39": false,
        "i30": false
      },
    },
    "i30": {
      "trade ratio": false, 
      "roads": {
        "i29": false, 
        "i19": false,
        "i31": false
      },
    },
    "i31": {
      "trade ratio": false, 
      "roads": {
        "i30": false, 
        "i41": false,
        "i32": false
      },
    },
    "i32": {
      "trade ratio": false, 
      "roads": {
        "i31": false, 
        "i21": false,
        "i33": false
      },
    },
    "i33": {
      "trade ratio": false, 
      "roads": {
        "i32": false, 
        "i43": false,
        "i34": false
      },
    },
    "i34": {
      "trade ratio": false, 
      "roads": {
        "i33": false, 
        "i23": false,
        "i35": false
      },
    },
    "i35": {
      "trade ratio": false, 
      "roads": {
        "i34": false, 
        "i45": false,
        "i36": false
      },
    },
    "i36": {
      "trade ratio": false, 
      "roads": {
        "i35": false, 
        "i25": false,
        "i37": false
      },
    },
    "i37": {
      "trade ratio": false, 
      "roads": {
        "i36": false, 
        "i47": false,
        "i38": false
      },
    },
    "i38": {
      "trade ratio": false, 
      "roads": {
        "i27": false, 
        "i37": false,
      },
    },
    "i39": {
      "trade ratio": false, 
      "roads": {
        "i29": false, 
        "i40": false,
      },
    },
    "i40": {
      "trade ratio": false, 
      "roads": {
        "i39": false, 
        "i48": false,
        "i41": false
      },
    },
    "i41": {
      "trade ratio": false, 
      "roads": {
        "i40": false, 
        "i31": false,
        "i42": false
      },
    },
    "i42": {
      "trade ratio": false, 
      "roads": {
        "i41": false, 
        "i50": false,
        "i43": false
      },
    },
    "i43": {
      "trade ratio": false, 
      "roads": {
        "i42": false, 
        "i33": false,
        "i44": false
      },
    },
    "i44": {
      "trade ratio": false, 
      "roads": {
        "i43": false, 
        "i52": false,
        "i45": false
      },
    },
    "i45": {
      "trade ratio": false, 
      "roads": {
        "i44": false, 
        "i35": false,
        "i46": false
      },
    },
    "i46": {
      "trade ratio": false, 
      "roads": {
        "i45": false, 
        "i54": false,
        "i47": false
      },
    },
    "i47": {
      "trade ratio": false, 
      "roads": {
        "i46": false, 
        "i37": false,
      },
    },
    "i48": {
      "trade ratio": false, 
      "roads": {
        "i40": false, 
        "i49": false,
      },
    },
    "i49": {
      "trade ratio": false, 
      "roads": {
        "i48": false, 
        "i50": false,
      },
    },
    "i50": {
      "trade ratio": false, 
      "roads": {
        "i49": false, 
        "i42": false,
        "i51": false
      },
    },
    "i51": {
      "trade ratio": false, 
      "roads": {
        "i50": false, 
        "i52": false,
      },
    },
    "i52": {
      "trade ratio": false, 
      "roads": {
        "i51": false, 
        "i44": false,
        "i53": false
      },
    },
    "i53": {
      "trade ratio": false, 
      "roads": {
        "i52": false, 
        "i54": false,
      },
    },
    "i54": {
      "trade ratio": false, 
      "roads": {
        "i53": false, 
        "i46": false,
      },
    },
  },
};

app.value('newGame', newGame);
app.value('newPlayer', newPlayer);
app.constant('FIREBASE_URL', "https://radiant-torch-8665.firebaseio.com/dogs-of-catan");