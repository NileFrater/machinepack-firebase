module.exports = {

  friendlyName: 'Set Data',

  description: 'Write data to your Firebase instance with the Set method.',

  extendedDescription: 'This will parse your data from a string into a JSON object. Writing data with .Set() will overwrite all existing data on the child node. This is best used for new or replacement data. To add data to your child node without overwriting, use .push(). You can find out more about which write option to use here: https://www.firebase.com/docs/web/guide/saving-data.html',
  inputs: {

    firebaseURL: {
      example: 'your-firebase-database.firebaseio.com',
      description: 'The reference URL for your Firebase dataset.',
      required: true
    },
    child: {
      example: 'users',
      description: 'The child of your reference URL which you wish to write to.',
    },
    write: {
      description: 'The dataset you wish to write to your Firebase instance, in JSON form.',
      typeclass: '*',
      required: true
    }
  },

  defaultExit: 'success',

  exits: {

    error: {
      description: 'An unexpected error occurred.'
    },
    success: {
      description: 'Firebase has written your data!'
    }
  },

  fn: function (inputs, exits) {

    // Require the Firebase SDK
    var Firebase = require('firebase');

    // Get the root reference
    var rootRef = new Firebase(inputs.firebaseURL);

    // If a child path is specified, get a reference to that data path
    var finalRef = inputs.child ? rootRef.child(inputs.child) : rootRef;

    // Set the data at the path
    finalRef.set(inputs.write, function(error) {

      // Handle errors
      if (error) {
        return exits.error(error);
      }

      // Return success
      return exits.success();
    });
  }

};
