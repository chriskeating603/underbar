(function() {
  'use strict';

  window._ = {};

  _.identity = function(val) {
    return val;
  };

  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  _.last = function(array, n) {
    return n === undefined ? array[array.length - 1] : (n <= array.length ? array.slice(array.length - n) : array)
  };

  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var prop in collection) {
        iterator(collection[prop], prop, collection);
      }
    }
  };

  _.indexOf = function(array, target){
    var result = -1;
    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  _.filter = function(collection, test) {
    var acceptableValues = [];
    _.each(collection, function(item) {
      if (test(item)) {
        acceptableValues.push(item)
      }
    }) 
    return acceptableValues;
  };

  _.reject = function(collection, test) {
    return _.filter(collection, function (item){
      return test(item) === false;
    })
  };

  _.uniq = function(array) {
    var uniqueArray = [];
    _.each(array, function (item) {
      if (uniqueArray.includes(item) === false) {
        uniqueArray.push(item)
      }
    }) 
    return uniqueArray;
  };

  _.map = function(collection, iterator) {
    var transformedArray = [];
    _.each(collection, function (item) {
      transformedArray.push(iterator(item))
    })
    return transformedArray;
  };

  _.pluck = function(collection, key) {
    return _.map(collection, function(item){
      return item[key];
    });
  };

  _.reduce = function(collection, iterator, accumulator) {
    if (Array.isArray(collection)) {
      if (accumulator === undefined) {
        accumulator = collection[0];
        for (var i = 1; i < collection.length; i++) {
          accumulator = iterator (accumulator, collection[i])
        }
        return accumulator;
      } else {
        for (var j = 0; j < collection.length; j++) {
          accumulator = iterator(accumulator, collection[j])
        }
        return accumulator
      }
    } else {
      if (accumulator === undefined) {
        accumulator = collection[0];
        for (var prop in collection) {
          if (collection[prop] !== collection[0] && iterator(accumulator, collection[prop]) !== undefined) {
            accumulator = iterator (accumulator, collection[prop])
          }
        }
        return accumulator
      } else {
        for (var prop in collection) {
          if (iterator(accumulator, collection[prop]) !== undefined) {
            accumulator = iterator(accumulator, collection[prop])
          }
        }
        return accumulator
      }
    }
  }

  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  _.every = function (collection, iterator) {
    var allTrue = true;
    for (var i = 0; i < collection.length; i++) {
      if (iterator === undefined) {
        if (collection[i] == false || collection[i] == undefined || collection[i] == null) {
          allTrue = false;
        }
      } else {
        if (iterator(collection[i]) == false || iterator(collection[i]) == undefined || iterator(collection[i]) == null) {
          allTrue = false;
        }
      }
    }
    return allTrue;
  }

  _.some = function(collection, iterator) {
    var someTrue = false;
    for (var i = 0; i < collection.length; i++) {
      if (iterator === undefined) {
        if (collection[i] != false && collection[i] != undefined && collection[i] != null) {
          someTrue = true;
        }
      } else {
        if (iterator(collection[i]) != false && iterator(collection[i]) != undefined && iterator(collection[i]) != null) {
          someTrue = true;
        }
      }
    }
    return someTrue;
  };

  _.extend = function(obj) {
    for (var i = 0; i < arguments.length; i++) {
      for (var prop in arguments[i]) {
        obj[prop] = arguments[i][prop];
      }
    }
    return obj;
  };

  _.defaults = function(obj) {
    for (var i = 0; i < arguments.length; i++) {
      for (var prop in arguments[i]) {
        if (obj.hasOwnProperty(prop) === false)
          obj[prop] = arguments[i][prop];
      }
    }
    return obj;
  };

  _.once = function(func) {
    var alreadyCalled = false;
    var result;
    return function() {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      return result;
    };
  };

  _.memoize = function(func) {
    var prevArgs = {};
    return function() {
      var argsList = []
      _.each(arguments, function(item){
        argsList.push(item)
      })
      var key = JSON.stringify(argsList);
      if (key in prevArgs === false) {
        prevArgs[key] = func.apply(this, argsList);
      }
      return prevArgs[key];
    }
  };

  _.delay = function(func, wait) {
    var argsList = [];
    for (var i = 0; i < arguments.length; i++) {
      argsList.push(arguments[i])
    }
    if (argsList.length > 2) {
      setTimeout(func.apply(this, argsList.slice(2)), wait);
    } else {
      setTimeout(func, wait);
    }
  };

  _.shuffle = function(array) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      var pushOrUnshift = Math.floor(Math.random() * 2);
      if (pushOrUnshift === 1) {
        newArray.push(array[i])
      } else {
        newArray.unshift(array[i])
      }
    }
    return newArray;
  };

/*
  /**
   * ADVANCED
   * =================
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };*/
}());