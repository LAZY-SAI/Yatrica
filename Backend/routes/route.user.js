import {Router} from 'express'

const useRoute = Router();

//user signup route
useRoute.post('/signup', (req, res) => {
     console.log("data", req.body);
  const { username, password, email } = req.body;
   if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }
   return res.status(201).json({ message: 'User registered successfully', username, email });
});


//user login route
useRoute.post('/login', (req, res) => {

  console.log("user logged in with ",req.body);
  const { email, password } = req.body;

  if (email !== 'user@gmail.com' || password !== 'user') {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.status(200).json({
    message: "user logged in successfully",
    email
  });
});

export default useRoute