/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const getS3file = async () => {
  const client = new S3Client({region: 'us-east-1'});

  const bucketName = 'dashboard-s35ea37-staging';
  const objectKey = 'WalmartEmployeeList.csv';

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });

  try {
    const response = await client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const str = await response.Body.transformToString();

    const tuples = str.split('\n').map(line => {
      const [email, role] = line.split(',');
      return [email.trim(), role.trim()];
    });

    return tuples;
    
  } catch (err) {
    console.error(err);
  }
}

const findUserByEmail = (email, userData) => {
  const user = userData.find(([userEmail,]) => userEmail === email);
  return user ? user : null;
};

exports.handler = async (event, context) => {
  const data = await getS3file(event);

  const user = findUserByEmail(event.request.userAttributes.email, data);


  if (user) {
    return event; // Return the role of the user
  } else {
    throw new Error("Sign up from this email domain is not allowed.");  // Return null if user is not found
  }
};

  