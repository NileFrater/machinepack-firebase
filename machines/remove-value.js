module.exports = {

  friendlyName: 'Remove Value',

  description: 'Remove data from a specific firebase location, such as "/users/".',

  inputs: {
    firebaseURL: {
      example: 'your-firebase-database.firebaseio.com/users/',
      description: 'The reference URL for your Firebase dataset.',
      required: true
    }
  },

  defaultExit: 'success',

  exits: {

    error: {
      description: 'An unexpected error occurred.'
    },
    success: {
      description: "The data was removed."
    }
  },

  fn: function (inputs, exits) {

    // Require the Firebase SDK
    var Firebase = require('firebase');

    // Get the data path reference
    var ref = new Firebase(inputs.firebaseURL);

    // Attempt to read from the data path
    ref.remove(function(error) {

      // Handle errors
      if (error) {
        return exits.error(error);
      }

      // Return through the success exit
      return exits.success();
    });

  },

};
