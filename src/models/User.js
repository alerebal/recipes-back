const { Schema, model } = require('mongoose');
const bcript = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true}
}, {
    timestamps: true
})

userSchema.plugin(uniqueValidator);

userSchema.methods.encryptPassword = async password => {
    const salt = await bcript.genSalt();
    return await bcript.hash(password, salt);
};

userSchema.methods.matchPassword = async function(password) {
    return await bcript.compare(password, this.password);
}


module.exports = model('RecipeUser', userSchema);

