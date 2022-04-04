import Cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import initMiddleware from "@/lib/init-middleware";
import { users as User } from "@/models/index";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
  })
);

export default async (req, res) => {
  await cors(req, res);
  const { email, password } = req.body;
  try {
    if (!isEmail(email)) {
      return res.status(201).send("Email should be a valid email address");
    }

    const user = await User.findOne({
      where: { email: email },
    });
    console.log(user);
    if (!user) {
      return res.status(201).send("User account does not exist");
    }

    if (!user.active) {
      return res
        .status(201)
        .send(
          "This account is temporarily disabled, please contact the support email"
        );
    }
    if (user.emailConfirmed === false) {
      console.log("email not verifed");
      return res.status(203).send(203);
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send(token);
    } else {
      res.status(201).send("Password is not correct");
    }
    // const isEmailVerifed = await User.findOne({
    //   where: { email: email },
    // });

    // console.log(isEmailVerifed);
  } catch (error) {
    // console.error(error)
    res.status(299).send("Error logging in user, Please check your Internet Connection!");
  }
};