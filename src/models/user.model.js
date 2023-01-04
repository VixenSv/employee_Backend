const mongoose =require('mongoose');
const UserSchema = new mongoose.Schema({
     Name : { type: String, required : true, trim : true },
     Email : { type : String, required : true, trim : true }, 
     Address : { type:String, required : true, trim : true },
   
});

const User = mongoose.model('users', UserSchema);
module.exports = User;