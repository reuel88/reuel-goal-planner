import firebase from "firebase/app";
import authorization from "firebase/auth";

const faker = require("faker");

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => [])
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  setPersistence: jest.fn(),
  browserSessionPersistence: ""
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn()
}));

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn()
}));

describe("firebase client", () => {

  const initializeApp = jest.spyOn(firebase, "initializeApp").mockImplementation(jest.fn());
  const getAuth = jest.spyOn(authorization, "getAuth").mockImplementation(jest.fn());

  beforeEach(() => {
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY = faker.datatype.uuid();
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = faker.datatype.uuid();
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = faker.datatype.uuid();
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = faker.datatype.uuid();
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = faker.datatype.uuid();
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID = faker.datatype.uuid();
  });

  it("Test initialization", async () => {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    };

    await require("@configs/firebaseClient").auth;

    expect(initializeApp).toBeCalledWith(firebaseConfig);
    expect(getAuth).toBeCalled();
  });
});