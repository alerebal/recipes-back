const { Schema, model } = require('mongoose');
const bcript = require('bcryptjs');

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {
    timestamps: true
})

userSchema.methods.encryptPassword = async password => {
    const salt = await bcript.genSalt();
    return await bcript.hash(password, salt);
};

userSchema.methods.matchPassword = async function(password) {
    return await bcript.compare(password, this.password);
}


module.exports = model('RecipeUser', userSchema);

