// packages
const jwt = require('jsonwebtoken');
require('dotenv').config();

/** 
 * @param {object} userInfo - validated user id
 * @param {string} expirationTime - token validity
 */

/**Symmetric jwt generation */
const generateToken = function (payload, expirationTime) {

    // signing jwt
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: expirationTime})
    return token;
}

const refreshToken = function(userInfo, expirationTime = '1day') {
    return generateToken(userInfo, expirationTime);
}

const accessToken = function(userInfo, expirationTime = '10m') {
    return generateToken(userInfo, expirationTime);
}


// TODO: verification

module.exports = {
    accessToken,
    refreshToken,
}



/** Generating payload & jwt
 * authenticate the user
 * is the user a joint payer or a single payer
 * generate payload based on authentication 
 * payload is used in signing jwt
 * payload to consist of {
 *  sub: userId
 *  exp: expiration time,
 *  iat: issue at time,
 *  audience: endpoint,
 *  scope: [isAJointPayer, isASinglePayer]
 * }
 * returns an object containing {
 *  access_token: 'ACCESS TOKEN',
 *  token_type: 'Bearer',
 *  expires_in: 10000,
 *  refresh_token: 'REFRESH TOKEN'
 * }
 */

/**Generating an asymmetric key */
// crypto.generateKeyPair('rsa', {
//     modulusLength: 2048,
//     publicKeyEncoding: {
//         type: 'pkcs1',
//         format: 'pem',
//     },
//     privateKeyEncoding: {
//         type: 'pkcs1',
//         format: 'pem',
//     }
// }, (err, publicKey, privateKey) => {
//     if (err) {
//         console.log(`An error occurred whiles generating key, ${err}`);
//         return;
//     };
//     fs.writeFileSync('publicKey.pem', publicKey);
//     fs.writeFileSync('privatekey.pem', privateKey);

//     console.log(`Asymmetric key pair generated successfully`);
// });

// const readSystemFiles = function (filename) {
//     fs.readFile(path.join(__dirname, '..', '..', '..', filename), 'utf-8', (err, file) => {
//         if (err) {
//             console.log(`Failed to read file ${err}`);
//             return;
//         }
//         console.log(`File read successfully`);
//         console.log(file)
//         return file;
//     })

// }

// const secretPass = {
//     private: readSystemFiles('privateKey.pem'),
//     public: readSystemFiles('publicKey.pem'),
// }

// jwt.sign(payload, secretPass, {expiresIn: '10m'}, (err, token) => {
//     console.log(`run`);
//     if (err) {
//         console.log(`Process failed ${err}`)
//         return;
//     }
//     console.log(token);
// })


// // readSystemFiles('privateKey.pem');
// // readSystemFiles('publicKey.pem');


