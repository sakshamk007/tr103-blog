import React from 'react';
import '../App.css';

const Day10 = () => {
  return (
    <div className="px-10">

      <div className="heading">1. Created Auth/Signup Routes</div>
      <div className="description">
        Today, I worked on creating the routes for user signup. Below is the code for handling GET and POST requests for the signup functionality, ensuring users can sign up by providing their email and password.
      </div>

      <div className="heading">a. Signup Route (GET Request)</div>
      <pre>
{`
router.get('/signup', (req, res) => {
    res.render('web/layouts/auth', { page: 'signup' });
})
`}
      </pre>
      <div className="description">
        This route renders the signup page when a user visits the <code>/signup</code> URL. It loads the necessary view to display the signup form.
      </div>

      <div className="heading">b. Signup Route (POST Request)</div>
      <pre>
{`
router.post('/signup', asyncHandler(async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).render('web/layouts/auth', { page: 'error', status: 400, message: 'Passwords do not match.' });
    }
    const rows = await User.read(email);
    if (rows.length > 0) {
        return res.status(400).render('web/layouts/auth', { page: 'error', status: 400, message: 'User already exists.' });
    }
    const user_id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.add(email, hashedPassword, user_id);
    res.redirect('/');
}));
`}
      </pre>
      <div className="description">
        In this code:
        <ul>
          <li><strong>Password Confirmation:</strong> The passwords entered are compared, and if they do not match, an error message is displayed.</li>
          <li><strong>User Existence Check:</strong> The email is checked in the database to ensure the user doesn't already exist.</li>
          <li><strong>Password Hashing:</strong> The user's password is hashed using <code>bcrypt</code> before storing it in the database for security.</li>
          <li><strong>User Creation:</strong> If all checks pass, a new user is added to the database with a unique user ID generated by <code>uuidv4()</code>.</li>
          <li><strong>Redirection:</strong> After successful signup, the user is redirected to the homepage.</li>
        </ul>
        This route handles the complete user signup process securely, including input validation and password hashing.
      </div>

    </div>
  );
};

export default Day10;
