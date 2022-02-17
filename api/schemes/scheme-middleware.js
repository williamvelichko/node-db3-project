/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const db = require("../../data/db-config");
const scheme = require("./scheme-model");

const checkSchemeId = (req, res, next) => {
  scheme.checkId(req.params.scheme_id).then((sch) => {
    if (!sch) {
      res.status(404).json({
        message: `scheme with scheme_id ${req.params.scheme_id} not found`,
      });
    } else {
      next();
    }
  });
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async (req, res, next) => {
  // try {
  //   const { scheme_name } = req.body;
  //   const result = await db("schemes")
  //     .where("scheme_name", scheme_name)
  //     .first();
  //   if (!scheme_name) {
  //     res.status(400).json({ message: "invalid scheme_name" });
  //   } else if (result) {
  //     res.status(400).json({ message: "invalid scheme_name" });
  //   } else {
  //     next();
  //   }
  // } catch (e) {
  //   next(e);
  // }
  const { scheme_name } = req.body;
  if (
    scheme_name === undefined ||
    typeof scheme_name !== "string" ||
    !scheme_name.trim()
  ) {
    res.status(400).json({ message: "invalid scheme_name" });
  } else {
    next();
  }
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = async (req, res, next) => {
  // try {
  //   const step = req.body;
  //   const { scheme_id } = req.params;
  //   const stepNum = await db("steps")
  //     .where("scheme_id", scheme_id)
  //     .andWhere("step_number", step.step_number)
  //     .first();

  //   const instruction = await db("steps")
  //     .where("scheme_id", scheme_id)
  //     .andWhere("instructions", step.instructions)
  //     .first();

  //   if (!step) {
  //     res.status(400).json({ message: "invalid step" });
  //   } else if (stepNum) {
  //     res.status(400).json({ message: "invalid step" });
  //   } else if (instruction) {
  //     res.status(400).json({ message: "invalid step" });
  //   } else {
  //     next();
  //   }
  // } catch (e) {
  //   next(e);
  // }
  const { instructions, step_number } = req.body;

  if (
    instructions === undefined ||
    typeof instructions !== "string" ||
    !instructions.trim() ||
    typeof step_number !== "number" ||
    step_number < 1
  ) {
    res.status(400).json({ message: "invalid step" });
  } else {
    next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
