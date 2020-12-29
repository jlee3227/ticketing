import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';

declare global {
    namespace NodeJS {
        interface Global {
            signin(): string[];
        }
    }
}

jest.mock('../nats-wrapper.ts');

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'asdfasdf';

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

// Fakes authentication
global.signin = () => {
    // Create the JWT with the payload of { id, email }
    const token = jwt.sign(
        {
            id: new mongoose.Types.ObjectId().toHexString(),
            email: 'test@test.com'
        },
        process.env.JWT_KEY!
    );

    // Build session, turn it into JSON and encode it as base64. The session looks like: { jwt: MY_JWT }
    const base64 = Buffer.from(JSON.stringify({ jwt: token })).toString(
        'base64'
    );

    // Return a string that's the cookie with the encoded data
    return [`express:sess=${base64}`];
};
