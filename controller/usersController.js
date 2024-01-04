import e from 'express';
import pool from '../database/index.js'
import crypto from 'crypto'; 

const salt = 'thuantoandungnhom3monbaomat!@#$%';
const AESKey = 'ngay10/03/2001langaygiotohangnam' ;  //256-bit 32 ký tự 
const AESIv = '1234567890121416' ; // 12 ký tự
//đã sửa
export const signup = async (req, res) => {
  let { username, password, email, fullname, gender, dateofbirth, phone } = req.body;
  password = hashPassword(password);
  
  if(!Object.is(phone, null)) 
    phone = AESData(phone);
   
  try {
    const checkExisted = await pool.query(
      `SELECT * FROM users WHERE email = '${email}'`,
    )
    if (checkExisted.rows.length > 0)
      res.status(400).json({ message: 'Email existed!' })
    else {
      await pool.query(
        `INSERT INTO users (username, password, email, fullname, gender, dob, phone)
        VALUES ('${username}', '${password}', '${email}', '${fullname}', '${gender}', '${dateofbirth}', '${phone}')`,
      )
      res.status(200).json({ message: 'Signup successfully' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
//đã sửa
export const signin = async (req, res) => {
  // let data = '123456' ;  
  // let encr = AESData(data); 
  // console.log('data: ', data);
  // console.log('encr: ', encr);
  // let decr  = DeAESData(encr);
  // console.log('decr: ', decr);

  let { email, password } = req.body;
  password = hashPassword(password);
  try {
    const checkExisted = await pool.query(
      `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`,
    )
    if (checkExisted.rows.length > 0)
      res.status(200).json({ data: checkExisted.rows[0] })
    else {
      res.status(400).json({ message: 'Wrong email or password!' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
//đã sửa
export const getAllUsers = async (req, res) => {
  const { page, pageSize } = req.query
  const offset = (page - 1) * pageSize

  let queryString = `SELECT * FROM users`
  if (page && pageSize)
    queryString = queryString.concat(` OFFSET ${offset} LIMIT ${pageSize}`)

  const totalQuery = `SELECT COUNT(*) FROM users`

  try {
    const result = await pool.query(queryString)
    const total = await pool.query(totalQuery)

    res
      .status(200)
      .json({ data: result.rows, total: parseInt(total.rows[0].count) })
  } catch (error) {
    res.status(500).json({ error })
  }
}
//đã sửa
export const updateUser = async (req, res) => {
  const { userid } = req.params
  let { fullname, gender, dateofbirth, phone, address } = req.body

  if(!Object.is(address, null))
    address = AESData(address);

  try {
    const result = await pool.query(
      `UPDATE users
      SET
        fullname = '${fullname}',
        dob = TO_DATE('${dateofbirth}', 'YYYY-MM-DD'),
        gender = '${gender}',
        phone = '${phone}',
        address = '${address}'
      WHERE user_id = ${userid}
      RETURNING *`,
    )

    res.status(200).json({ data: result.rows[0] })
  } catch (error) {
    res.status(500).json({ error })
  }
}
//đã sửa
export const updateAddress = async (req, res) => {
  const { userid } = req.params
  let { address } = req.body

  if(!Object.is(address, null))
    address = AESData(address);

  try {
    const result = await pool.query(
      `UPDATE users
      SET
        address = '${address}'
      WHERE user_id = '${userid}'
      RETURNING *`,
    )

    res.status(200).json({ data: result.rows[0] })
  } catch (error) {
    res.status(500).json({ error })
  }
} 
// Hàm để hash mật khẩu
function hashPassword(password) { 
  // crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hashedPassword;
}
// Hàm AES   sdt và  adress
function AESData(data) {
  const cipher = crypto.createCipheriv('aes-256-cbc', AESKey, AESIv);
  let encrypted  = cipher.update(data, 'utf-8', 'hex'); 
  encrypted += cipher.final('hex'); 
  return encrypted;
}
// demo  decrypt
function DeAESData(encr) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', AESKey, AESIv);
  let decrypted   = decipher.update(encr, 'hex', 'utf-8'); 
  decrypted  += decipher.final('utf-8'); 
  return decrypted ;
}
