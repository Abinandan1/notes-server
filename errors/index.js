const BadRequestError = require("./BadRequestError");
const CustomAPIError = require("./CustomAPIError");
const NotFoundError = require("./NotFoundError");
const UnauthorizedError = require("./UnauthorizedError");

module.exports = {
  CustomAPIError,
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
};
