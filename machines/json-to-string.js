module.exports = {

  friendlyName: 'Convert JSON to String',

  description: 'Firebase reads data as a JSON object. You can convert this to a string with this machine.',

  extendedDescription: 'This will parse your data from a JSON Object into a string.',
  inputs: {

    object: {
      example: '*',
      description: 'The object you wish to convert into a string.',
      required: true
    }
  },

  defaultExit: 'success',

 exits: {

    error: {
      description: 'An unexpected error occurred.'
    },
    parseFailure: {
      description: 'The data provided is not a valid JSON object.',
      moreInfo: 'This usually happens due to a lack of double-quotes or because your variable is already a string. You can check out exactly how to present your string of data here: http://www.json.org/'
    },
    success: {
      description: 'Your data has been parsed into a JSON object!',
      data: '{ "User 1": {"email": "user@gmail.com", "password": "password123"}}'
    }
  },

  fn: function (inputs, exits) {

    var jdata;

    try {
      jdata= JSON.stringify(inputs.object);
    }
    catch (e){
      return exits.parseFailure(e);
    }

    return exits.success({
      description: "Object succesfully converted.",
      data: jdata
    });
  },

};
