const user = require('../models/user');

class User {
    // Function to delete user account
  static async deleteUser(userId) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      await client.connect();
  
      const database = client.db(dbName);
      const collection = database.collection(collectionName);
  
      // Delete user account
      const result = await collection.deleteOne({ _id: ObjectId(userId) });
  
      if (result.deletedCount > 0) {
        console.log('User account deleted successfully');
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error deleting user account:', error);
    } finally {
      // Close the connection
      await client.close();
    }
  };
}