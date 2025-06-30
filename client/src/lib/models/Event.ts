import mongoose, { Schema, model, models } from 'mongoose';

const EventSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    location: { type: String },
    imageUrl: { type: String },
    dataAiHint: { type: String },
});

const Event = models.Event || model('Event', EventSchema);

export default Event;
