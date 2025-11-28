import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      if (userAccount) {
        return await this.login({ email, password });
      }
      return userAccount;
    } catch (error) {
      console.log("AuthService::createAccount error", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({
        email,
        password,
      });
    } catch (error) {
      console.log("AuthService::login error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const session = await this.account.getSession({
        sessionId: "current",
      });

      if (!session) return null;

      return await this.account.get();
    } catch (error) {
      console.log("AuthService::getCurrentUser error", error);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.log("AuthService::logout error", error);
      return false;
    }
  }
}

const authService = new AuthService();
export default authService;
