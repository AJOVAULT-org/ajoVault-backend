// package initialization
const jwt = require('jsonwebtoken');
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
 * 
 * payload = {userId, sessionId, iat, exp}
 * 
 */

const payload = {
    userId: 234,
    name: 'John',
}

// const createPrivateKey = function() {
//     const key = crypto.randomBytes(32);
//     console.log(key);
// }

// createPrivateKey();

// const payload = {
//     username: 'John',
//     age: 15,
//     gender: 'male',
//     password: 'sdf23@1sa'
// };

// const privateKey = 'dfah23asdf'

// const generateAccessToken = async function() {
//     // synchronous
//     // var token = jwt.sign({ foo: 'bar' }, 'dfah23asdf');
//     // console.log(token);

//     const location = path.join(__dirname, '..', '..', '..', 'private-key.pem')

//     const secretKey = fs.readFile(location, 'utf-8', (err, key) => {
//         if (err) console.log(`An error occurred ${err}`);
//         // return key;

//         // asynchronous
//         jwt.sign({ foo: 'bar' }, key, { algorithm: 'RS256' }, function(err, token) {
//             if (err) {
//                 console.log(key);
//                 console.log(`An error occurred ${err}`)
//             }
//             console.log(token);
//         });
//     })

    
//     // const accessToken = jwt.sign(payload, privateKey, {expiresIn: '1h'}, async (err, token) => {
//     //     console.log(payload, privateKey);
//     //     if (err) {
//     //         console.log(err.message);
//     //         throw new Error (`Authentication failed!!! `);
//     //     };
//     //     return await token;
//     // })

//     // console.log(accessToken);
// }

// // jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
// //     if (err) {
// //         console.error('Error signing JWT:', err);
// //         return;
// //     }
// //     console.log(token);
// // });

// generateAccessToken();


// 

/**Generating an asymmetric key */
crypto.generateKeyPair('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
    }
}, (err, publicKey, privateKey) => {
    if (err) {
        console.log(`An error occurred whiles generating key, ${err}`);
        return;
    };
    fs.writeFileSync('publicKey.pem', publicKey);
    fs.writeFileSync('privatekey.pem', privateKey);

    console.log(`Asymmetric key pair generated successfully`);
});

const readSystemFiles = function (filename) {
    fs.readFile(path.join(__dirname, '..', '..', '..', filename), 'utf-8', (err, file) => {
        if (err) {
            console.log(`Failed to read file ${err}`);
            return;
        }
        console.log(`File read successfully`);
        console.log(file)
        return file;
    })

}

const secretPass = {
    private: readSystemFiles('privateKey.pem'),
    public: readSystemFiles('publicKey.pem'),
}

jwt.sign(payload, secretPass, {expiresIn: '10m'}, (err, token) => {
    console.log(`run`);
    if (err) {
        console.log(`Process failed ${err}`)
        return;
    }
    console.log(token);
})


// readSystemFiles('privateKey.pem');
// readSystemFiles('publicKey.pem');



