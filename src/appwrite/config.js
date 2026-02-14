import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";
import { Permission, Role } from "appwrite";

export class AppwriteService {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)
        // .setSelfSigned(true); // for localhost, remove in production

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId,featuredVideo }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        //   ID.unique(),   // ✔ correct
        slug,
        {
            title,content,featuredImage,status,userId, featuredVideo,  // video file ID
        },
          [
        Permission.read(Role.any()),          // everyone can read post
        Permission.update(Role.user(userId)), // only owner edit
        Permission.delete(Role.user(userId))  // only owner delete
      ],
        ID.unique(),
        {
          title,
          slug,
          content,
            // fullContent: content,   // ← use fullContent instead of content
          featuredImage,
          status,
          userId,
        },
      );
    } catch (error) {
      console.log("Appwrite service:: create post::error ", error);
      throw error;
    }
  }

  

  async updatePost(slug, { title, content, featuredImage, status,featuredVideo }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          featuredVideo,
          status,
        },
      );
    } catch (error) {
      console.log("Appwrite service:: update post::error ", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
      );
      
      return true;
    } catch (error) {
      console.log("Appwrite service:: delete post ::error ", error);
      return false;
    }
  }

// async deletePost(postId, fileId,userId) {
//     try {
//         // 1️⃣ pehle image delete
//         if (fileId) {
//             await this.bucket.deleteFile(
//                 conf.appwriteBucketId,
//                 fileId
//             );
//         }

//         // 2️⃣ phir document delete
//         await this.databases.deleteDocument(
//             conf.appwriteDatabaseId,
//             conf.appwriteCollectionId,
//             postId
//         )
//         ,
//       [
//         // Permission.read(Role.any()),              // sab dekh sakte
//         Permission.update(Role.user(userId)),     // sirf author edit
//         Permission.delete(Role.user(userId)),     // ⭐ sirf author delete
//       ]

//         return true;
//     } catch (error) {
//         console.log("Delete Post Error:", error);
//         return false;
//     }
// }




  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
      );
    } catch (error) {
      console.log("Appwrite service:: get post::error ", error);
    }
  }





  //=============file upload servides===========
  
  
 async getPosts(userId) {
  try {
    return await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      [
        Query.equal("userId", userId),
        Query.equal("status", "active"),
      ]
    );
  } catch (error) {
    console.log("Appwrite service:: get posts ::error ", error);
    return false;
  }
}
 
// =========new =======================
async getPublicPosts() {
  try {
    return await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      [
        Query.equal("status", "active"),
      ]
    );
  } catch (error) {
    console.log("Public posts error", error);
    return false;
  }
}

async getUserPosts(userId) {
  try {
    return await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      [
        Query.equal("userId", userId),
        Query.equal("status", "active"),
      ]
    );
  } catch (error) {
    console.log("User posts error", error);
    return false;
  }
}

async getHomePosts() {
  try {
    return await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      [
        Query.equal("status", "active"),        // sirf published
        Query.orderDesc("$createdAt"),          // newest first
        Query.limit(4)                          //  sirf 4 posts
      ]
    );
  } catch (error) {
    console.log("Home posts error", error);
    return false;
  }
}

  
  
  
  async uploadFile(file) {
    //should be pass blog not file name
    try {
      return await this.bucket.createFile(
        //   return await this.bucket.uploadFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
        [Permission.read(Role.any())], //That will make all newly uploaded images accessible in <img> tags.


    );
    } catch (error) {
      console.log("Appwrite service::upload file::error ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    //shold be pass blog not file name
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service:: delete file::error ", error);
      return false;
    }
  }
  

  

getFilePreview(fileId) {
  return `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`;
}


async toggleLike(postId, userId) {
// check existing like
const res = await this.databases.listDocuments(
conf.appwriteDatabaseId,
conf.likesCollectionId,
[
Query.equal("postId", postId),
Query.equal("userId", userId),
]
);

// already liked -> remove
if (res.documents.length > 0) {
await this.databases.deleteDocument(
conf.appwriteDatabaseId,
conf.likesCollectionId,
res.documents[0].$id
);
return false;
}

// not liked -> add
await this.databases.createDocument(
conf.appwriteDatabaseId,
conf.likesCollectionId,

   ID.unique(),
    { postId, userId },
    [
      Permission.read(Role.any()),           // everyone can see likes count
      Permission.update(Role.user(userId)),  // only creator can remove their like
      Permission.delete(Role.user(userId)),  // only creator can delete their like
    ]

);


return true;
}



async getLikes(postId) {
const res = await this.databases.listDocuments(
conf.appwriteDatabaseId,
conf.likesCollectionId,
[Query.equal("postId", postId)]
);
return res.documents.length;

}






}

const appwriteService = new AppwriteService();
export default appwriteService;
