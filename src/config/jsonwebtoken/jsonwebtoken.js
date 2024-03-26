// package initialization
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

/** singing jwt
 * @param {string | number} payload - validated user id
 * @param {string} privateKey - RSA secret key generated with crypto
 * @param {object} options - specifying the expiring time
 * @param {err, token} callback - asynchronously handling generation of token
 * 
 * TODO: generate a session Token which would be included in the payload of jwt and used to sign jwt
 * NOTE: access tokens are used to transmit authorization information e.g userId, scopes determined actions allowed
 * access token are used to grant / access protected routes or apis
 * 
 * return = {userId, sessionId, iat, exp}
 * 
 */

// sample user claim
const userInfo = {
    userId: 234,
    name: 'John',
};



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

/**Basic / symmetric jwt generation */
// generating secret key
// const secretKey = crypto.randomBytes(32).toString('hex');
// console.log(secretKey)

// signing jwt - symmetric signing
// const accessToken = function (userInfo) {
//     // sample of generated payload
//     const { userId, name } = userInfo;
//     const payload = {
//         sub: userId,
//         name: name,
//         iat: Date.now(),
//     }

//     // const secretKey = process.env.SECRET_KEY
    
//     const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '10m'})
//     return {
//         access_token: token,
//         token_type: 'Bearer',
//         expires_in: '10m',
//     }
// }

const generatingToken = function (userInfo, expirationTime) {
    // sample of generated payload
    const payload = {
        sub: userInfo.userId,
        iat: Date.now(),
    }
    console.log(expirationTime)
    
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: expirationTime})
    console.log('run...')
    return token;
}

const refreshToken = function(expirationTime = '1day') {
    return  generatingToken(userInfo, expirationTime);
}

const accessToken = function(expirationTime = '10m') {
    return {
        access_token: generatingToken(userInfo, expirationTime),
        token_type: 'Bearer',
        expires_in: '10m',
        refresh_token: refreshToken(),
    }
}

// console.log(accessToken());

module.exports = {
    accessToken,
    refreshToken,
}




// authenticate the user
/**
 * is the user a joint payer or a single payer
 * generate payload based on authentication 
 * payload is used in signing jwt
 * payload to consist of {
 *  subject, issue at, 
 * }
 * returns an object containing {
 *  access_token: 'ACCESS TOKEN'
 *  token_type: 'Bearer',
 *  expires_in: 10000
 *  refresh_token: 'REFRESH TOKEN'
 * }
 */

