require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");
const userM = require("../models/users.m");
const axios = require("axios")
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_PAYMENT;

//store session
passport.serializeUser((user, done) => {
  done(null, { email: user.email, userId: user.userId, token: jwt.sign({ email: user.email }, JWT_SECRET), role: user.role });
});

// check session
passport.deserializeUser(async (un, done) => {
  console.log("deserializeUser", un);
  const u = userM.getByEmail(un);
  if (!u) {
    return done("invalid", null);
  }
  done(null, u);
});

module.exports = (app) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env["GOOGLE_CLIENT_ID"],
        clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
        callbackURL: "/auth/oauth2/redirect/google",
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
        ],
      },
      async function verify(issuer, profile, cb) {
        const rs1 = await userM.getByEmail(profile.emails[0].value);
        // have
        if (rs1.length > 0) {
          var user = rs1[0];
          return cb(null, user);
        } else {
          const user = await userM.add({
            name: profile.displayName,
            password: "",
            name: profile.name.familyName + " " + profile.name.givenName,
            email: profile.emails[0].value,
            phoneNumber: "",
            avatar: `https://ui-avatars.com/api/?name=No+Name`,
            public_id: null,
            active: true,
          });

          /// them account vao payment system
          try {
            //////
            const apiUrl = `${process.env.PAYMENT_SERVER}/tkgd`;
            const requestData = {
              username: profile.emails[0].value,
              isActive: true
            };
            axios.post(apiUrl, requestData, {
              headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed
              },
              httpsAgent: new (require('https').Agent)({
                rejectUnauthorized: false
              })
            })
              .then(response => {
                // Process the response data
                //console.log('API Response:', JSON.parse(response));
                //return done(null, user);
                console.log("data");
                let rs = response.data;
                console.log(rs);
                //console.log(response.data);
              })
              .catch(error => {
                // Handle errors
                // console.error('Error fetching API:', error.message);
                console.log(error)
              });
            //
          } catch (error) {
            console.log(error)
          }
          return cb(null, user);
        }
      }
    )
  );
}