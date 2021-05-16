const router = require('express').Router();
const { User, Post } = require('../models');


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        User
      ],
    });

    const posts = postData.map((user) =>
      user.get({ plain: true })
    );
    res.render('homepage', {
      posts,
      loggedIn:req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/post', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('post');
});

module.exports = router;
