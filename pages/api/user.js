import connectMongo from '../../src/lib/connectMongo';
import Users from '../../src/models/user';

export default function handler(req, res) {
  // switch the methods
  switch (req.method) {
      case 'GET': {
          return getUsers(req, res);
      }

      case 'POST': {
          return addUser(req, res);
      }

      case 'PUT': {
          return updateUser(req, res);
      }

      case 'DELETE': {
          return deleteUser(req, res);
      }
  }
}

// Get all users
async function getUsers(req, res) {
  try {
    // connect to mongo
    await connectMongo();
    
    // get all users
    const users = await Users.find({});
    
    // send response
    res.status(200).json(users);
  } catch {
    res.status(500).json({ error: 'Something went wrong' });
  }
}

// Add user
async function addUser(req, res) {
  try {
    // get the database connection
    await connectMongo();
    
    // get the user from the request body
    const newUser = await Users.create(req.body);
    
    // return the user
    res.status(201).json(newUser);
  } catch {
    res.status(500).json({ error: 'Something went wrong' });
  }
}

// Update user
async function updateUser(req, res) {
  try {
    // get the database connection
    await connectMongo();
    
    // get the user from the request body
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    // return the user
    res.status(200).json(updatedUser);
  } catch {
    res.status(500).json({ error: 'Something went wrong' });
  }
}

// Delete user
async function deleteUser(req, res) {
  try {
    // get the database connection
    await connectMongo();
    
    // get the user from the request body
    const deletedUser = await Users.findByIdAndDelete(req.params.id);
    
    // return the user
    res.status(200).json(deletedUser);
  } catch {
    res.status(500).json({ error: 'Something went wrong' });
  }
}