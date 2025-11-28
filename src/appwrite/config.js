import conf from "../conf/conf";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)
      
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Create post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug, // You are using slug as ID
        data: { title, slug, content, featuredImage, status, userId },
      });
    } catch (error) {
      console.log("Appwrite service:: createPost:: error", error);
      return false;
    }
  }

  // Update post
  async updatePost(slug, data) {
    try {
      return await this.databases.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
        data,
      });
    } catch (error) {
      console.log("Appwrite service:: updatePost:: error", error);
      return false;
    }
  }

  // Delete post
  async deletePost(slug) {
    try {
      await this.databases.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
      return true;
    } catch (error) {
      console.log("Appwrite service:: deletePost:: error", error);
      return false;
    }
  }

  // Get single post
  async getPost(slug) {
    try {
      return await this.databases.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
    } catch (error) {
      console.log("Appwrite service:: getPost:: error", error);
      return false;
    }
  }

  // Get all posts (filter active posts by default)
  async getRows(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        queries: queries,
      });
    } catch (error) {
      console.log("Appwrite service:: getRows:: error", error);
      return false;
    }
  }

  // Upload file
  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.log("Appwrite service:: uploadFile:: error", error);
      return false;
    }
  }

  // Remove file
  async removeFile(fileId) {
    try {
      return await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
      });
    } catch (error) {
      console.log("Appwrite service:: removeFile:: error", error);
      return false;
    }
  }

  // Get preview URL
  getFilePreview(fileId) {
    return this.bucket.getFilePreview({
      bucketId: conf.appwriteBucketId,
      fileId: fileId,
    });
  }
}

const service = new Service();

export default service;
