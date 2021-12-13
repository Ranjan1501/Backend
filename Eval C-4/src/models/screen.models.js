const {model, Schema}=require('mongoose'); 

const screenSchema= new Schema({
    name:{type: String, required: true},
    theatre_ids:[
        {
        type:Schema.Types.ObjectId,
        ref: 'theatre',
        required: true,
    },
],

}, {
    versionKey:false,
    timestamps:true,
});

module.exports =model("screen",screenSchema);