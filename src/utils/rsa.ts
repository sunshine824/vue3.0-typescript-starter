import JSEncrypt from 'jsencrypt'

const PublicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPkaGKH0s2LS9J9/sLNV5qTpYEEg5/bBgzYBIMSOkaSHSfFQe58e35LqwDMbUXl09Is++3tc3RMeclm7v1W2qXEd+xTou5u7fljzUzi21G1T0kfRPrt2hsSu/awnfa4SmTSUHZoQpWho14xLa8uTmPWl9DEU43R1Gm9DSQShOmEwIDAQAB'
const Privatekey = ''

// rsa加密
export const rsaEncrypt = (data: string): string => {
  const jsencrypt = new JSEncrypt()
  jsencrypt.setPublicKey(PublicKey)
  const result = jsencrypt.encrypt(data) as string
  return result
}

// rsa解密
export const rsaDecrypt = (data: any) => {
  const jsencrypt = new JSEncrypt()
  jsencrypt.setPrivateKey(Privatekey)
  const result = jsencrypt.decrypt(data)
  return result
}
