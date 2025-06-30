import { ObjectId } from 'mongodb';

export interface Member {
    _id?: ObjectId;
    name: string;
    role: string;
    email: string;
    linkedinUrl: string;
    imageUrl: string;
    dataAiHint?: string;
}

export interface Event {
    _id?: ObjectId;
    title: string;
    description: string;
    date: string;
    location: string;
    imageUrl?: string;
    gallery?: { src: string; alt?: string; dataAiHint?: string }[];
}

export interface BlogPost {
    _id?: ObjectId;
    title: string;
    content: string;
    author: string;
    date: string;
    imageUrl?: string;
}

export interface ContactMessage {
    _id?: ObjectId;
    name: string;
    email: string;
    message: string;
    date: string;
}
