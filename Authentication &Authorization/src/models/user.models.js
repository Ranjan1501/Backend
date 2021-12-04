const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    versionKey: false,
    timestamps: true,
});

// before saving user credential it is important to check first
// need a hook or middleware for this function 
//prototype method in mongoose where as method is added to Schema called as hook 
// two ways  1 hook and  method // pre is hook after running hook user is saved 

userSchema.pre("save", function(next) {
    if(!this.isModified("password")) return next(); 
    bcrypt.hash(this.password, 10, (err, hash) => {   // using async 
        this.password = hash;
        // console.log("password: ", this.password); //give hashed password 
        return next();
    });

});

userSchema.methods.checkPassword = function(password){
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, function(err, same) {
           if(err) return reject(err);
           return resolve(same);
        });
    })
}




module.exports = model("user", userSchema);
