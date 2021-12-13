const {model, Schema}=require('mongoose'); 
const bcrypt=require("bcrypt"); 

const userSchema= new Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    profile_photo_url:{type: String, required: false,default:"www.gmail.com" },
    roles:{type: String, required: true},

}, {
    versionKey:false,
    timestamps:true,
});

userSchema.pre("save", function (next){
    if(!this.isModified("password")) return next();

    bcrypt.hash(this.password, 8, (err, hash)=> {
        this.password = hash;
        return next();
    });
    
});

userSchema.methods.checkPassword=function(password){
return new Promise((resolve, reject)=>{
    bcrypt.compare(password, this.password, function(err, result) {
        if(err) return reject(err);
        return resolve(result);
    });
})

}


module.exports =model("user",userSchema);