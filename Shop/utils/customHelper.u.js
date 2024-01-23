const helper = {
  inc: function (value) {
    return parseInt(value) + 1;
  },
  dec: function (value) {
    return parseInt(value) - 1;
  },
  gender: function (value) {
    if (value === true) {
      return "Male";
    } else {
      return "Female";
    }
  },
};

module.exports = { helper };
