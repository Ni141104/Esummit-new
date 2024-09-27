import User from "@/app/models/user";
import { connectToDB } from "@/app/utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
const generateUniqueId = (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const handler=NextAuth(
    {   
         providers: [
            GoogleProvider({
              clientId: process.env.GOOGLE_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET
            })
          ],
          callbacks:
          {
            async session({session})
            {
              // store the user id from MongoDB to session
              // To store the data of the user which is currently online
              const sessionUser=await User.findOne({
                      email:session.user.email
              })

              if(sessionUser)
              {
                session.user.scoutId=sessionUser.scoutId;
                session.user.referralUsers=sessionUser.referralUsers.length;
              }
              session.user.id=sessionUser._id.toString();
              session.user.username=sessionUser.username;
              return session; 
            },
            async signIn({ account, profile, user, credentials })
            {
              
              //Here it is serverless so whenever we sign in , it will then connect to database otherwise not
              try {
                  await connectToDB(); 
  
                  //check if user is already exists
                  const userExists=await User.findOne({
                      email:profile.email
                  });
  
                  //if not ,create a new user
                  if(!userExists)
                      {
                        const random=generateUniqueId();
                         await User.create(
                              {
                                  email:profile.email,
                                  username: profile.name.replace(" ","").toLowerCase(),
                                  image:profile.picture,
                                  scoutId:random,
                                  referralUsers:[],
                                  referralCount:0
                              }
                          )
                      }
  
                      return true;
  
              } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false;
              }
            }
          }
    }
)

export { handler as GET,handler as POST}