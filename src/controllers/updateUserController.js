const user = require('../models/user');

class User {
      // Function to update user details
      static async updateUser(userId, updatedDetails) {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      
        try {
          await client.connect();
      
          const database = client.db(dbName);
          const collection = database.collection(collectionName);
      
          // Update user details
          const result = await collection.updateOne({ _id: ObjectId(userId) }, { $set: updatedDetails });
      
          if (result.modifiedCount > 0) {
            console.log('User details updated successfully');
          } else {
            console.log('User not found or no changes made');
          }
        } catch (error) {
          console.error('Error updating user details:', error);
        } finally {
          // Close the connection
          await client.close();
        }
      }
}