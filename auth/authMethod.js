import pkg from 'jsonwebtoken'
const { sign, verify } = pkg

export const generateToken = (payload, secretSignature, tokenLife) => {
    try{
        return sign(
            {
                payload,
            },
            secretSignature,
            {
                algorithm: 'HS256',
                expiresIn: tokenLife,
            },
        )
    }catch (error){
        console.log(`Error in generate access token: + ${error}`)
        return null
    }
}

export const decodeToken = (token, secretKey) => {
    try {
      return verify(token, secretKey, {
        ignoreExpiration: true,
      })
    } catch (error) {
      console.log(`Error in decode access token: ${error}`)
      return null
    }
  }

  export const verifyToken = (token, secretKey) => {
    try {
      return verify(token, secretKey)
    } catch (error) {
      console.log(`Error in verify access token:  + ${error}`)
      return null
    }
  }