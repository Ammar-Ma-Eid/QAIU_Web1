import mongoose, { Schema, model, models } from 'mongoose';

const MemberSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    linkedinUrl: { type: String },
    imageUrl: { type: String },
    dataAiHint: { type: String },
});

const Member = models.Member || model('Member', MemberSchema);

export default Member;
