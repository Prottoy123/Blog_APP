import conf from "../conf/conf.js";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
        data: {
          title,
          content,
          featuredimage: featuredImage, // FIX: Appwrite-এর ছোট হাতের নামের সাথে কোডের ডেটা ম্যাপ করা হলো
          status,
          userid: userId,
          slug,
        },
      });
    } catch (error) {
      console.log("Appwrite service:: createPost:: error", error);
      return false;
    }
  }

  async updatePost(slug, data) {
    try {
      return await this.databases.updateDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
        data, // data object being passed directly
      });
    } catch (error) {
      console.log("Appwrite service:: updatePost:: error", error);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
      });
      return true;
    } catch (error) {
      console.log("Appwrite service:: deletePost:: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
      });
    } catch (error) {
      console.log("Appwrite service:: getPost:: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        queries, // array of queries
      });
    } catch (error) {
      console.log("Appwrite service:: getPosts:: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.log("Appwrite service:: uploadFile:: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId,
      });
      return true;
    } catch (error) {
      console.log("Appwrite service:: deleteFile:: error", error);
      return false;
    }
  }
  // Get preview URL (Bypassing Free Tier Restrictions)
  getFilePreview(fileId) {
    if (!fileId) return ""; 

    try {
      const fileUrl = this.bucket.getFileView(conf.appwriteBucketId, fileId);

      return typeof fileUrl === "string" ? fileUrl : fileUrl.href;
    } catch (error) {
      console.log("Appwrite service:: getFilePreview:: error", error);
      return "";
    }
  }
}

const service = new Service();
export default service;
