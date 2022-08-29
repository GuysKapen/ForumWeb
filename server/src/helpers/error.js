"use strict";

/*
    Get Unique error field name
*/

const uniquesMessage = (error) => {
  let output;
  try {
    let fieldName = error.message.split(".$")[1];
    let field = field.split("dub key")[0];
    field = field.substring(0, field.lastIndexOf("_"));
    req.flash("errors", [
      {
        message: "An Account with this" + field + "already exits",
      },
    ]);

    output =
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + "already exits";
  } catch (error) {
    output = "already exits";
  }
  return output;
};

/*
 Get error message from error object
*/

exports.errorHandler = (error) => {
  let message = "";
  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = uniquesMessage(error);
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (let errorName in error.errorors) {
      if (error.errorors[errorName].message) {
        message = error.errorors[errorName].message;
      }
    }
  }
  return message;
};