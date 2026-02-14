import conf from '../conf/conf.js';
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

    async createAccount({email, password, name}) {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
       
    }

    async login({email, password}) {
      
            return await this.account.createEmailPasswordSession(email, password);
        
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

// async getCurrentUser() {
//     try {
//         return await this.account.get();
//     } catch (error) {
//         // Only log if it’s not a guest error
//         if (error.code !== 401) {
//             console.error("Appwrite service :: getCurrentUser :: error", error);
//         }
//         return null; // guest users
//     }
// }


    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService




// ======================= extra func =======================

// import { Account } from "appwrite";
// import conf from "../conf/conf";
// import { Client } from "appwrite";

// const client = new Client()
//   .setEndpoint(conf.appwriteUrl)
//   .setProject(conf.appwriteProjectId);

// const account = new Account(client);

// export const getCurrentUser = async () => {
//   try {
//     return await account.get();
//   } catch (error) {
//     return null;
//   }
// };
