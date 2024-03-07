const S3 = require('aws-sdk/clients/s3')
require('dotenv').config()

async function s3DeleteDir(params) {
  const s3 = new S3({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })

  const list = await s3.listObjects(params).promise()
  const result = { deletedCount: 0 }
  if (!list.Contents) return result

  const isDirEmpty = !list.Contents.length
  if (isDirEmpty) {
    await s3
      .deleteObject({
        Bucket: params.Bucket,
        Key: params.Prefix
      })
      .promise()

    return result
  }

  const deleteParams = {
    Bucket: params.Bucket,
    Delete: { Objects: [] }
  }

  list.Contents.forEach(({ Key }) => {
    if (!Key) return null
    deleteParams.Delete.Objects.push({ Key })
  })

  const deleteResponse = await s3.deleteObjects(deleteParams).promise()
  result.deletedCount += deleteResponse.Deleted ? deleteResponse.Deleted.length : 0

  const recursiveResult = await s3DeleteDir(params)
  result.deletedCount += recursiveResult.deletedCount

  return result
}

const params = {
  Bucket: process.env.S3_TEMPORAL_BUCKET,
  Prefix: process.env.S3_TEMPORAL_PREFIX
}

s3DeleteDir(params)
