 import {User} from "../../../../models/user"
import {withSessionRoute} from "../../../lib/session"

export default withSessionRoute(createUser);

async function createUser(req, res) {
    // Reject all methods other than POST.
    if (req.method !== 'POST') return res.status(405).end();

    const {username} = req.body
    const {session} = req
    console.log(session)

    const existingUsername = await User.findOne({
        username: username
      });
  
      if (existingUsername) {
        return res.status(400).json({
          message: 'Username already exists.'
        });
      }
    
    userObj = {
        username: username,
        key: session.ref
    }
    const newUser = new User(userData);
    const savedUser = await newUser.save();

    if (savedUser) {
      // const token = createToken(savedUser);
      // const decodedToken = jwtDecode(token);
      // const expiresAt = decodedToken.exp;

      const { username, role, id, created, profilePhoto } = savedUser;
      const userInfo = {
        username,
        role,
        id,
        created,
        profilePhoto
      };

      return res.json({
        message: 'User created!',
        // token,
        userInfo,
        // expiresAt
      });
    } else {
      return res.status(400).json({
        message: 'There was a problem creating your account.'
      });
    }
}