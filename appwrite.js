import { Client, Databases, Account, ID } from "react-native-appwrite";

const appwriteEndpoint = process.env.EXPO_PUBLIC_API_ENDPOINT;
const appwriteProject = process.env.EXPO_PUBLIC_PROJECT_ID;

const client = new Client();
client.setEndpoint(appwriteEndpoint)
    .setProject(appwriteProject)
    .setPlatform('com.example.todoapp');

const account = new Account(client);
const databases = new Databases(client);

export { account, databases, ID };