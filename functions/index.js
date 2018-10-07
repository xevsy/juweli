'use strict';
const functions = require('firebase-functions');
const { Storage } = require('@google-cloud/storage');
const projectId = 'juweli-58262';
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;

const gcs = new Storage({
  projectId: projectId,
});

exports.onImageUpload = functions.storage.object().onFinalize((object) => {
  const bucket = object.bucket;
  const contentType= object.contentType;
  const filePath = object.name;
  console.log('File change detected, function execution started');

  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return null;
  }

  const fileName = path.basename(filePath);
  // Exit if the image is already a thumbnail.
  if (fileName.startsWith('thumb_')) {
    console.log('Already a Thumbnail.');
    return null;
  }

  // [START thumbnailGeneration]
  const destBucket = gcs.bucket(bucket);
  const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
  const metadata = { contentType: contentType };
  return destBucket.file(filePath).download({
    destination: tmpFilePath
  }).then(() => {
    return spawn('convert', [tmpFilePath, '-thumbnail', '200x200>', tmpFilePath]);
  }).then(() => {
    console.log('Thumbnail created at', tmpFilePath);
    const thumbFileName = `thumb_${fileName}`;
    const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
    return destBucket.upload(tmpFilePath,  {
      destination: thumbFilePath,
      metadata: metadata
    })
  }).then(() => fs.unlinkSync(tmpFilePath));
    // [END thumbnailGeneration]
});
