exports.validate = (email, phoneNumber) => {
  if (email === 'undefined' && phoneNumber === 'undefined') {
    return false;
  }
}

exports.validateUpdate = (owner, phoneNumber, email) => {
  if (phoneNumber === undefined && email === undefined) {
    return false;
  } else {
  return true;
  }
}