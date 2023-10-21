const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Hashing information
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  projects: [
    {type: Schema.Types.ObjectId, ref: 'Project'}
  ],
  email: {type: String},
});

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);
    // console.log('err is: ', err);
    this.password = hash; //where is this saved? How can we reference it later when the user tries to log in?
    // console.log('hash is: ', hash);
    return next();
  })
})

module.exports = mongoose.model('User', userSchema);