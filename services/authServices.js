import CustomErrorHandler from "../helpers/CustomErrorHandler.js";
import jwtService from "../helpers/jwtService.js";
import { User } from "../models/index.js";

const authServices = {
  async googleLogin(data) {
    const { fullName, email, coordinates, phoneNumber } = data;

    const userInfo = global.user;
    //Find the user by ID

    let user;

    if (phoneNumber != null) {
      user = await User.findOne({ phoneNumber, isDeleted: false });
    } else {
      user = await User.findOne({ email, isDeleted: false });
    }

    if (user) {
      // If the user exists, update their tokens
      const accessToken = jwtService.sign(
        {
          email,
          userId: user._id,
          fullName: user.fullName,
        },
        {
          // never expires
          expiresIn: "12000s",
        }
      );

      user.accessToken = accessToken;
      user.isLogin = true;

      if (coordinates) {
        // If coordinates are provided, update the user's coordinates and add to locations
        const { latitude, longitude, placeName } = coordinates;
        user.location.coordinates = [
          parseFloat(longitude),
          parseFloat(latitude),
        ];
        user.location.selectLocation = placeName;
      }

      if (user.banStatus === "ban") {
        const currentDate = new Date();
        if (user.banExpiresAt < currentDate) {
          user.banStatus = "active";
          user.banExpiresAt = null;
          user = await user.save();
        }

        if (user.banStatus === "active") {
          return await user.save();
        } else {
          throw CustomErrorHandler.validationError(
            "You have been banned by the admin please contact administrator gullyteam33@gmail.com"
          );
        }
      }
      return await user.save();
    } else {
      const newUser = new User({
        fullName,
        email,
        phoneNumber,
        registrationDate: new Date(),
      });

      if (coordinates) {
        // If coordinates are provided, add them to the new user's profile
        const { latitude, longitude, placeName } = coordinates;
        newUser.location.coordinates = [
          parseFloat(longitude),
          parseFloat(latitude),
        ];
        newUser.location.selectLocation = placeName;
      }

      const accessToken = jwtService.sign(
        {
          email,
          fullName,
          userId: newUser._id,
        },
        "12000s"
      );

      newUser.accessToken = accessToken;
      const newUserData = await newUser.save();
      return newUserData;
    }
  },
};

export default authServices;
