import mongoose from 'mongoose';
import { connString } from '../utils/database';
import * as bcrypt from 'bcrypt';
const Schema = mongoose.Schema;
const SchemaTypes = Schema.Types;

const userTable = new Schema({
    userId: {
        type: Number,
        required: true,
        index: {
            unique: true
        }
    },
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true
    }
});
// hash the password
userTable.pre('save', function(next) {
    if(this.isModified('password')) {
        bcrypt.hash(this.password, bcrypt.genSaltSync(8), (err, hash) => {
            if(err) {
                return next(err);
            } else {
                this.password = hash;
                next();
            }
        });
    }
});

/*userTable.methods.comparePassword = async function(password) {
    if(!password) throw new Error('Password is Missing');

    try {
        return await bcrypt.compare(password, this.password);
    } catch(err) {
        throw new Error('Error while compare password');
    }
}*/
/*userTable.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};
  
// checking if password is valid
userTable.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};*/
export const userModel = connString.model('userTable', userTable);