const User = require('../models/user')

function index(req, res, next) {
  User.find({})
    .exec()
    .then((users) => res.json(users))
    .catch((err) => next(err))
}

function create(req, res, next) {
  const { name, email, password } = req.body

  User.create({ name, email, password })
    .then((user) => res.json(user))
    .catch((err) => next(err))
}

function read(req, res, next) {
  const { id } = req.params

  User.findById(id)
    .exec()
    .then((user) => res.json(user))
    .catch((err) => next(err))
}

function update(req, res, next) {
  const { id } = req.params
  const { name, email, password } = req.body

  User.findByIdAndUpdate(id, { name, email, password }, { new: true })
    .exec()
    .then((user) => res.json(user))
    .catch((err) => next(err))
}

function updateProfile(req, res, next) {
  const {
    name, email, password, geolocation,
  } = req.body

  req.user.set({
    name, email, password, geolocation,
  }).save()

  res.json(req.user)
}

function getProfile(req, res, next) {
  return res.json(req.user)
}

module.exports = {
  index,
  create,
  read,
  update,
  updateProfile,
  getProfile,
}
