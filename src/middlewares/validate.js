const httpStatus = require("../utils/apiStatusCode");

const validate = (schema) => async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    next();
  } catch (err) {
    res.status(httpStatus.STATUS_BAD_REQUEST).json({ error: true,  message: err.details[0].message.replace(/"/g, "") || err.message.split(".")[1].replace(/"/g, "") });
  }
};

module.exports = validate;
