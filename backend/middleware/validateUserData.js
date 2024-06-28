const Joi = require("joi");

const validateUser = (type) => (req, res, next) => {
  const registerSchema = Joi.object().keys({
    ...(type === "register" && {
      username: Joi.string().alphanum().min(2).max(7).required(),
    }),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error });
  }
  next();
};

module.exports = validateUser;
