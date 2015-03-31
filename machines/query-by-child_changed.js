module.exports = {

  friendlyName: 'Query by Child_Changed',

  description: 'Read data from all child nodes, triggered whenever a child node is updated, from a specific firebase location, such as "/users/".',

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
      data: '{ "User 1": {"email": "user@gmail.com", "password": "password123"}}'
    }
  },

  fn: function (inputs, exits) {

    var Firebase = require('firebase');

    var ref = new Firebase(inputs.firebaseURL);

    ref.on("child_changed", function(snapshot) {
        console.log(snapshot.val());
        return exits.success({
          data: snapshot.val()
        });
      }, function(errorObject) {
          console.log("The Read operation failed: " + errorObject.code);
          return exits.error({
            description: "The Read operation failed: " + errorObject.code
          });
      });

  },

};
