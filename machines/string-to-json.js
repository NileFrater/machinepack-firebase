module.exports = {

  friendlyName: 'Convert string to JSON',

  description: 'Firebase writes data as a JSON object. You can convert your JSON-format string to a JSON object with this machine.',

  extendedDescription: 'This will parse your data from a JSON Object into a string.',
  inputs: {

    string: {
      example: '{ "User 1": {"email": "user@gmail.com", "password": "password123"}}',
      description: 'The string you wish to convert.',
      required: true
    }
  },

  defaultExit: 'success',

  exits: {

    error: {
      description: 'An unexpected error occurred.'
    },
    parseFailure: {
      description: 'The data provided is not in valid JSON format.',
      moreInfo: 'This usually happens due to a lack of double-quotes or because your variable is already a JSON object. You can check out exactly how to present your string of data here: http://www.json.org/'
    },
    success: {
      description: 'Your data has been parsed into a JSON object!',
      data: '{ "User 1": {"email": "user@gmail.com", "password": "password123"}}'
    }
  },

  fn: function (inputs, exits) {

    var jdata;

    try {
      jdata= JSON.parse(inputs.string);
    }
    catch (e){
      return exits.parseFailure(e);
    }

    return exits.success({
      description: "String succesfully converted.",
      data: jdata
    });
  },

};
