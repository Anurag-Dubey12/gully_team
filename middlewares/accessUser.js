import CustomErrorHandler from "../helpers/CustomErrorHandler.js";
import { Admin } from "../models/index.js";

// const accessUser = async function (req, res, next) {

//   try {
//     console.log("email is recieved",req.email);
//   let userData = await Admin.findOne({ email:req.email });

//   console.log("data is recieved");

//   if(userData.role === 'Admin'){
//     console.log("user is  Admin");
//     next();
//   }else if(userData.role === 'subAdmin'){

//     console.log("user is  SubAdmin");
//     userData.rights.forEach(right => {
//       if(right === 'Users'){
//         next();
//       }
//     });
//   }

//   } catch (err) {
//     console.log(err);
//     return next(CustomErrorHandler.unAuthorized());
//   }

// };

function accessUser(access = "") {
  // Return a middleware function
  return async function (req, res, next) {
    try {
      // console.log("email is recieved", req.email);
      let userData = await Admin.findOne({ email: req.email });

      // console.log("data is recieved");

      if (userData.role === "Admin") {
        //console.log("user is  Admin");
        next();
      } else if (userData.role === "subAdmin") {
        userData.rights.forEach((right) => {
          if (right === access) {
            next();
          }
        });
      }
    } catch (err) {
      console.log(err);
      return next(CustomErrorHandler.unAuthorized());
    }
  };
}

export default accessUser;
