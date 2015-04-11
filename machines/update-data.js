module.exports = {

  friendlyName: 'Update Data',

  description: 'Update data in a Firebase child node per field.',

  extendedDescription: 'This can be used to edit a single field within a child, or to add a new field entirely. You can find out more about which write option to use here: https://www.firebase.com/docs/web/guide/saving-data.html',
  inputs: {

    firebaseURL: {
      example: 'your-firebase-database.firebaseio.com/users',
      description: 'The reference URL for your Firebase dataset. NOTE: Refer to the specific location you need to update as this machine can only work on one child level. For example, add /users/ to the URL, and the specific user as the child.',
      required: true
    },
    child: {
      example: 'users',
      description: 'The child of your reference URL which you wish to write to.',
    },
    write: {
      description: 'The children to overwrite in the data path.',
      typeclass: 'dictionary',
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
    finalRef.update(inputs.write, function(error) {

      // Handle errors
      if (error) {
        return exits.error(error);
      }

      // Return success
      return exits.success();
    });

  },

};
