

export const REGISTER = `mutation RegisterUser($fullName: String!, $email: String!, $mobileNo: String!, $gender: String!, $dob: String!, $country: String!, $password: String!, $role: String!, $isVerified: Boolean!, $fcmToken: String!, $deviceId: String!, $platform: String!) {
  registerUser(fullName: $fullName, email: $email, mobileNo: $mobileNo, gender: $gender, dob: $dob, country: $country, password: $password, role: $role, isVerified: $isVerified, fcmToken: $fcmToken, deviceId: $deviceId, platform: $platform) {
    message
    statusCode
    data {
      fullName
      _id
      email
      mobileNo
      password
      gender
      dob
      country
      isVerified
      platform
      deviceId
    }
  }
}`

export const LOGIN = `mutation LoginUser($email: String!, $password: String!, $fcmToken: String!, $deviceId: String!, $role: String!) {
  loginUser(email: $email, password: $password, fcmToken: $fcmToken, deviceId: $deviceId, role: $role) {
    message
    statusCode
    data {
      _id
      fullName
      email
      mobileNo
      password
      gender
      dob
      country
      token
      isVerified
      fcmTokens {
        fcmToken
        _id
      }
      deviceId
      platform
    }
  }
}`

