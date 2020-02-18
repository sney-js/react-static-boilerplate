#!/usr/bin/env node
const AWS = require("aws-sdk");
const fs = require("fs");
const mime = require("mime-types");

function publishStatic(awsRegion, s3Bucket, pathToLocalFolder) {
    console.info("Publishing static content...");
    console.info("awsRegion: %s, s3Bucket: %s, pathToLocalFolder: %s", awsRegion, s3Bucket, pathToLocalFolder);
    console.info(`http://${ s3Bucket }.s3-website-${ awsRegion }.amazonaws.com`);

    const s3 = initS3(awsRegion);

    s3.headBucket({ Bucket: s3Bucket }).promise()
        .then(() => {
            console.info("Bucket exists");
            return emptyBucket(s3, s3Bucket);
        })
        .then(() => {
            console.log("start upload");
            return uploadContent(__dirname + "/" + pathToLocalFolder, s3, s3Bucket)
                .then(() => console.info("Done."));
        })
        .catch(err => {
            console.log(err);
            if (err.statusCode === 404) {
                console.info("Bucket doesn't exist. Creating...");
                return createBucket(s3, s3Bucket, awsRegion).then(() => {
                    console.info("Bucket created.");
                })
                    .then(() => {
                        uploadContent(__dirname + "/" + pathToLocalFolder, s3, s3Bucket)
                            .then(() => console.info("Done."));
                    })
                    .catch(err => {
                        handleError(err);
                    });
            } else {
                handleError(err);
            }
        });
}

function createBucket(s3, s3Bucket, awsRegion) {
    const bucketParams = {
        Bucket: s3Bucket,
        CreateBucketConfiguration: {
            LocationConstraint: awsRegion,
        },
    };

    return s3.createBucket(bucketParams).promise()
        .catch(err => {
            handleError(err);
        });
}

function uploadContent(dir, s3, s3Bucket) {

    const map = new Map();
    collectDirInfo(dir, map);
    const promises = [];
    for (key of map.keys()) {
        const content = map.get(key);
        const s3Key = key.substr(dir.length + 1);
        const contentType = mime.lookup(s3Key);
        if (contentType) {
            const params = {
                Body: content,
                Bucket: s3Bucket,
                Key: s3Key,
                ContentType: contentType,
            };
            promises.push(s3.putObject(params).promise());
        }

    }
    return Promise.all(promises)
        .then(() => {
            console.info("Upload finished");

        }).catch(err => {
            handleError(err);
        });
}


function collectDirInfo(dir, map) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const key = dir + "/" + file;
        const stat = fs.statSync(key);
        if (stat && stat.isDirectory()) {
            collectDirInfo(key, map);
        } else {
            map.set(key, fs.readFileSync(key));
        }
    });
}

function emptyBucket(s3, s3Bucket) {
    const params = {
        Bucket: s3Bucket,
    };
    const promises = [];

    return s3.listObjects(params).promise()
        .then(data => {
            const items = data.Contents;
            for (let i = 0; i < items.length; i++) {
                const deleteParams = {
                    Bucket: s3Bucket,
                    Key: items[ i ].Key,
                };
                promises.push(s3.deleteObject(deleteParams).promise());
            }
        })
        .then(_ => {
            return Promise.all(promises)
                .then(() => {
                    console.info("Delete files finished");
                }).catch(err => {
                    handleError(err);
                });
        })
        .catch(err => {
            handleError(err);
        });
}

function initS3(awsRegion) {
    AWS.config.update({
        region: awsRegion,
    });
    return new AWS.S3();
}

function handleError(err) {
    console.error(err);
    process.exit(1);
}

function run() {
    const args = process.argv.slice(2);
    console.info(args);
    if (args.length !== 3) {
        console.error("Script requires 3 args. Usage: publishStatic awsRegion s3Bucket pathToLocalFolder");
        process.exit(1);
    }
    publishStatic(args[ 0 ], args[ 1 ], args[ 2 ]);
}

try {
    run();
} catch (error) {
    handleError(error);
}
