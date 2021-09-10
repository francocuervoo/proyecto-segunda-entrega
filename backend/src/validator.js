async function validateAdmin(req, res, next) {
  const { headers } = req;
  try {
    if(headers.admin){
        next();
    } else {
        throw new Error("Error")
    }
  } catch (error) {
    next(error);
  }
}

module.exports = validateAdmin;
