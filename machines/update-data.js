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
      required: true
    },
    write: {
      example: '{"email": "MyNewEmail@gmail.com"}',
      description: 'The dataset you wish to write to the .',
      required: true
    }
  },

  defaultExit: 'success',

  exits: {

    error: {
      description: 'An unexpected error occurred.'
    },
    parseFailure: {
      description: 'The data provided could not be parsed into a JSON Object.',
      moreInfo: 'This usually happens due to a lack of double-quotes. You can check out exactly how to present your string of data here: http://www.json.org/'
    },
    success: {
      description: 'Firebase has written your data!'
    }
  },

  fn: function (inputs, exits) {

    var Firebase = require('firebase');

    var rootRef = new Firebase(inputs.firebaseURL);

    var finalRef = rootRef.child(inputs.child);

    var jdata;

    try {
      jdata= JSON.parse(inputs.write);
    }
    catch (e){
      return exits.parseFailure(e);
    }


    finalRef.update(jdata, function(error) {
        if (error) {
          return exits.error({
            description: error
          });
        } else {
          console.log("Firebase has updated Child " + finalRef + " with the following data:", inputs.write);
          return exits.success({
            description: "Firebase has successfully updated your data."
          });
        }
      });
  },

};
