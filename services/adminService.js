import CustomErrorHandler from "../helpers/CustomErrorHandler.js";
import { Admin, Update } from "../models/index.js";
import bcrypt from "bcrypt";
import jwtService from "../helpers/jwtService.js";
import nodemailer from "nodemailer";

import firebaseNotification from "../helpers/firebaseNotification.js";

const adminService = {
  async adminLogin(data) {
    const { email, password } = data;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      throw CustomErrorHandler.notFound("This Email is Not exist.");
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      throw CustomErrorHandler.notFound("This Password is Wrong.");
    }

    // Clear existing tokens
    admin.tokens = [];
    admin.expiredTokens = [];

    // Generate a new token
    const token = jwtService.sign(
      {
        _id: admin._id,
        email: admin.email,
        role: admin.role,
      },
      { expiresIn: "1y" }
    );

    const expiresIn = new Date(Date.now() + 3600000); // Token expiration in milliseconds (1 hour)
    admin.tokens.push({ token, expiresAt: expiresIn });
    await admin.save();

    const adminData = {
      name: admin.name,
      email: admin.email,
      id: admin._id,
      role: admin.role,
      token: token,
      expiresIn: expiresIn,
    };

    return adminData;
  },

  async resetPassword(data, token) {
    const { password } = data;
    const admin = await Admin.findOne({ token });

    if (!admin) {
      throw CustomErrorHandler.notFound("This Token is Not Valid.");
    }

    const newPassword = await bcrypt.hash(password, 10);
    // Clear existing tokens
    admin.password = newPassword;

    await admin.save();

    return true;
  },

  async sendMail(userFor = "", email, name, token) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "omkarmhetar105@gmail.com",
        pass: "mdpxjibrlsnzbwhn",
      },
    });

    let mailOptions;

    if (userFor == "forgotPassword") {
      mailOptions = {
        from: "omkarmhetar105@gmail.com",
        to: email,
        subject: "Reset Password",
        html: `<p>Hi ${name}, please copy the following link to reset your password: <a href="http://localhost:3000/auth/reset/${token}">Reset Password</a></p>`,
      };
    } else {
      mailOptions = {
        from: "omkarmhetar105@gmail.com",
        to: email,
        subject: "Helpdesk Feedback",
        html: `
        <style>
        p {
          margin: 5px 0; /* Adjust the margin as needed */
        }
        .footer {
          margin-top: 20px;
          border-top: 1px solid #ccc;
          padding-top: 10px;
        }
        h3{
          margin: 2px 0;
        }
        </style>
        <p>Dear ${name},</p>
        <p>Your recent helpdesk query has been addressed. Please find feedback below:</p>
        <p>${token}</p>
        <p>For further assistance,reach out to our helpdesk.</p>
        <p>Best Regards,</p>
        <p>Gully Team</p>
        <div class="footer">
        <h3>GullY Team Pvt. Ltd</h3>
        <h4>Contact: +91-7977283987 | Email: info@egames.com | <a href="http://www.egames.com">www.egames.com</a></h4>
        <h4>Skype: nileegames</h4>
        <h4>GAMING | FUTURE TECHNOLOGIES | ANIMATION & VFX</h4>
    </div>`,
      };
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail sent: " + info.response);
        return true;
      }
    });
  },

  async Forceupdate(data, Id) {
    let updateData = await Update.findById(Id);

    updateData.version = data.version;
    updateData.forceUpdate = data.forceUpdate;

    return await updateData.save();
  },

  async getForceupdate(Id) {
    const data = await Update.findOne();
    return data;
  },

  async sendNotification(registrationToken, message) {
    // const registrationToken =
    // "csA2cz-ESbCjbTG6JupnrT:APA91bGY-xvpHA7azM8AC8-yrmM7Q0InkGCptmAdWO-GlgQGudCIYCLEMfAkedxPURJ9m2cRFJsNqxJN6miPqFkppOFTeQn-z6R3qLJ5i2T5VL4V8yTmRJ1vf_iRDLCOiUizZLrzt_N1";
    const notificationData = {
      title: "Gully Team",
      body: message,
      image: "",
      data: {
        key1: "value1",
        key2: "value2",
      },
    };

    if (registrationToken) {
      const result = await firebaseNotification.sendNotification(
        registrationToken,
        notificationData
      );
    }
    return true;
  },
};

export default adminService;
