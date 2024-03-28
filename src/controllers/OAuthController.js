require("dotenv").config();
const axios = require("axios");
const qs = require("qs");

class OauthController {
  static async googleOAuthHandler(req, res) {
    // --| Retrieve code needed to make api request on behalf of user

    const { code } = req.query;

    const access_token_url = "http://oauth2.googleapis.com/token" 

    const values = {
      code, 
      clientId: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code"
    };

    try {
      // --| Make a post request to the access token endpoint
      // --| Exchange code for an access and Id token
      const res = await axios.post(access_token_url, qs.stringify(values), {
        headers: {
          "content-Type": "application/x-www-form-urlencoded",
        },
      });

      const { id_token, access_token } = await res.data;

    // --| Get user name, email and picture from here cause these details are not guaranteed to be in the id token
    const token_info_url = "https://oauth2.googleapis.com/tokeninfo";

    const user_info_url = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="
    const data = await axios.get(`${token_info_url}${access_token}`, {
      headers: {
        Authorization: `Bearer ${id_token}`
      }
    });

    const  { name, picture, email, family_name: last_name, given_name: first_name, verified_email  } = await data.data;

    // --| Unverified user
    if (!verified_email) return res.status(403).json({ error: true, message: "Email not verified" });

    // --| Upsert user
    let user = await User.findOne({ email });

    // --| If email already exists with a traditional password, return error
    if (user.password) return res.status(403).json({ error: true, message: "Account with email exists already, login with password" });
    
    user = User.findOneAndUpdate({ email }, { name, picture, first_name, last_name }, { upsert: true, new: true });
    
    // --| Set Cookies, SEssion, Access and Refresh token Here
    // 
    // 
    // 

    return res.redirect(process.env.CLIENT_ORIGIN)

    } catch (error) {
      // --| Redirect to frontend oauth error page/endpoint
      return res.redirect(`${process.env.CLIENT_ORIGIN}/oauth/error`)
    }
  }

  clientCode(){
    const GOOGLE_OAUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

    const values = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      // --| This is the backend endpoint that process the google server response
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      // --| Offline returns a refresh token alongside the access token
      access_type: "offline",
      response_rype: "code",
      // --| Scope is the list of scopes our app needs access to
      scope: ["https%3A//www.googleapis.com/auth/userinfo.email", "https%3A//www.googleapis.com/auth/userinfo.profile"].join(" "),
    }

    // --| This is the button link, that takes users to the google oauth consent page/screen
    const GOOGLE_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?${qs.stringify(values)}`

  }
}

module.exports = OauthController;