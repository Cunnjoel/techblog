const router = require('express').Router();
const { User, Post } = require('../models');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await User.findAll({
      include: [
        {
          model: Post,
          attributes: ['body', 'title'],
        },
      ],
    });

    const users = dbBlogData.map((user) =>
      user.get({ plain: true })
    );
    res.render('homepage', {
      users,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
router.get('/user/:id', async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          attributes: [
            'id',
            'title',
            'body',
            'userId',
          ],
        },
      ],
    });

    const gallery = dbBlogData.get({ plain: true });
    res.render('gallery', { user, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one painting
router.get('/post/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id);

    const post = dbPaintingData.get({ plain: true });
    res.render('painting', { post, loggedIn: req.session.loggedIn });
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

module.exports = router;
