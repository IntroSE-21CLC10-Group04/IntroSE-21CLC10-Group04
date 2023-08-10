const Announcement = require('../models/announcement.model');
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require('../utils/mongoose');

class announceController {
  // [GET] announcement
  getNewAnnouncement = (req, res, next) => {
    try {
      res.render('admin_announcement');
    } catch (err) {
      next(err);
    }
  };

  // [POST] announcement/post
  postNewAnnouncement = async (req, res, next) => {
    try {
      let ntitle = req.body.title;
      let ncontent = req.body.content;
      let nrecipient = req.body.recipient;

      const newAnnouncement = new Announcement({
        title: ntitle,
        recipient: nrecipient,
        content: ncontent,
      });

      await newAnnouncement.save();

      console.log(req.body);
      res.redirect('/announcement/all');
    } catch (err) {
      next(err);
    }
  };

  // [GET] announcement/all
  getAllAnnouncement = async (req, res, next) => {
    try {
      const announcements = await Announcement.find().sort({ time: -1 });

      res.render('admin_all_announcement', {
        announcements: mutipleMongooseToObject(announcements),
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new announceController();
