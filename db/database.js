import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// mongoose.connect('mongodb://127.0.0.1:27017/test');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

const Connection = async () => {
    const URL = process.env.MONGO_URL;
    try {
    await mongoose.connect(URL,{ useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Database Connected Successfully')
    }catch(error){
        console.log('Error Occur',error)
    }
}

export default Connection