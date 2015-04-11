module.exports = {

  friendlyName: 'Push Data',

  description: 'Write data to your Firebase instance with the Push method.',

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
      description: 'The dataset you wish to write to your Firebase instance.',
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
      example: "-JmahDOMzYCH1R_gGEAL",
      description: "The unique key generated for the new data path."
    }

  },

  fn: function (inputs, exits) {

    // Require the Firebase SDK
    var Firebase = require('firebase');

    // Get the root reference
    var rootRef = new Firebase(inputs.firebaseURL);

    // If a child path is specified, get a reference to that data path
    var finalRef = inputs.child ? rootRef.child(inputs.child) : rootRef;

    // Create a new data reference
    var dataRef = finalRef.push(inputs.write, function(error) {

        // Handle errors
        if (error) {
          return exits.error(error);
        }

        // Get the unique ID of the new data path
        var key = dataRef.key();

        // Return it through the success exit
        return exits.success(key);
      });
  },

};
