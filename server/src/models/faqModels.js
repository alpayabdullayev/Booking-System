import mongoose from 'mongoose';
const { Schema } = mongoose;

const faqSchema = new Schema({
    
  title:{type:String},
  description: {type:String},   

},{timestamps:true});

const Faqs = mongoose.model('faqBook', faqSchema);

export default Faqs