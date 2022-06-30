// import userModel from "../../../../models/user"
import {withSessionRoute} from "../../../lib/session"

export default withSessionRoute(createUser);

async function createUser(req, res) {
    // Reject all methods other than POST.
    if (req.method !== 'POST') return res.status(405).end();

    const {username} = req.body
    const {session} = req
    console.log(session, username)
    res.status(200).json({username, session})
}