// import User from "../../../models/user";
import {withSessionRoute} from "../../../lib/session"

export default withSessionRoute(createUser);

async function createUser(req, res) {
    // Reject all methods other than POST.
    if (req.method !== 'POST') return res.status(405).end();

    const {username} = req.body
    const {session} = req

    if (!session.user.key || !username) {
        console.log("missing args")
        res.status(402).json({msg: "Missing either key or username"})
    }

    // const existingUsername = await User.findOne({
    //     username: username
    //   });
    // console.log(existingUsername)
    //   if (existingUsername) {
    //     return res.status(400).json({
    //       message: 'Username already exists.'
    //     });
    //   }
    
    const userObj = {
        username: username,
        key: session.user.key
    }
    // console.log(userObj)
    // const newUser = new User(userObj);
    // const savedUser = await newUser.save();
    res.status(200).json(savedUser)

    // if (savedUser) {
    //     console.log("saved user", savedUser)
    //   // const token = createToken(savedUser);
    //   // const decodedToken = jwtDecode(token);
    //   // const expiresAt = decodedToken.exp;

    //   const { username, role, id, created, profilePhoto } = savedUser;
    //   const userInfo = {
    //     username,
    //     role,
    //     id,
    //     created,
    //     profilePhoto
    //   };

    //   return res.json({
    //     message: 'User created!',
    //     // token,
    //     userInfo,
    //     // expiresAt
    //   });
    // } else {
    //   return res.status(400).json({
    //     message: 'There was a problem creating your account.'
    //   });
    // }
}