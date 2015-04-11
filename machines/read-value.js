module.exports = {

  friendlyName: 'Read Value',

  description: 'Read data from a specific firebase location, such as "/users/".',

  extendedDescription: 'This will return your data as a JSON object. To return this to a String format, please use the .JSONtoString machine included in this machinepack. You can find more information on which read method to use here: https://www.firebase.com/docs/web/guide/retrieving-data.html',

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
      example: '{ "User 1": {"email": "user@gmail.com", "password": "password123"}}',
      description: "The data at the specified path, as a JSON string."
    }
  },

  fn: function (inputs, exits) {

    // Require the Firebase SDK
    var Firebase = require('firebase');

    // Get the data path reference
    var ref = new Firebase(inputs.firebaseURL);

    // Attempt to read from the data path
    ref.once("value", function(snapshot) {

      // Return the data as a JSON string through the success exit
      return exits.success(JSON.stringify(snapshot.val()));
    },

    // In case of error, send the error throuh the error exit
    function(errorObject) {
        return exits.error(errorObject);
    });

  },

};
