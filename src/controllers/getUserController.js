const User = require('../models/user');

class User {
    // Function to get user details
    static async getUser(req, res) {
        // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const {userId} = req.body;
        try {
            // await client.connect();

            // const database = client.db(dbName);
            // const collection = database.collection(collectionName);

            // Find user by userId
            const user = await User.findOne({ _id: userId });

            if (user) {
                return res('User details:', user);
            } else {
                console.log('User not found');
            }
        } catch (error) {
            console.error('Error retrieving user details:', error);
        }
    };
}