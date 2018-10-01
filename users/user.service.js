const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Event = db.Event;
// var currentUser;
// console.log(currentUser);


module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    deleteEvent: _deleteEvent,
    createEvent,
    getAllEvents
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    currentUser=user;
    console.log("currentUser",currentUser);
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);

        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}
async function getAllEvents(currentUser) {
    console.log("1",{currentUser})
    // User.find({ nameFirst: 'John' });
    return await Event.find({ user: currentUser._id }).select();
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}
async function createEvent(eventParam) {
    // validate
    // if (await User.findOne({ username: userParam.username })) {
    //     throw 'Username "' + userParam.username + '" is already taken';
    // }
    console.log({currentUser});
    const event = new Event(eventParam);
    event.user=currentUser._id;
    // console.log({eventParam});
    console.log({event});
  
    // save event
    // return;
    return await event.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
async function _deleteEvent(id) {
    await Event.findByIdAndRemove(id);
}