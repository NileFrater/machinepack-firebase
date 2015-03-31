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
      required: true
    },
    write: {
      example: '{ "User 1": {"email": "user@gmail.com", "password": "password123"}}',
      description: 'The dataset you wish to write to your Firebase instance, in JSON form.',
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


    finalRef.push(jdata, function(error) {
        if (error) {
          return exits.error({
            description: error
          });
        } else {
          console.log("Firebase has logged the following data:", inputs.write);
          return exits.success({
            description: "Firebase has successfully logged your data."
          });
        }
      });
  },

};
