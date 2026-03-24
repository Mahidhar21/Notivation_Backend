export const validate = (schema) => {
  return (req, res, next) => {
    try {
      const data = {
        body: req.body,
        query: req.query,
        params: req.params
      };
      const parsed = schema.parse(data);
      req.body = parsed.body;
      req.query = parsed.query;
      req.params = parsed.params;
      next();
    } catch (err) {
      if (err.errors) {
        return res.status(400).json({
          message: 'Validation error',
          errors: err.errors
        });
      }
      return next(err);
    }
  };
};

