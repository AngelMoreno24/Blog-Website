import express from 'express';
import Account  from '../models/accountModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Route to Add a new account
export const createAccount =  async (req, res) => {

    const {username, email, password} = req.body;
    
    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create the account
        const account = await Account.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'Account created successfully', account });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}

// Route to Add a new account
export const loginAccount =  async (req, res) => {

  const { email, password} = req.body;
  
  if(!email || !password){

    return response.status(400).send({
      message: 'Provide all required fields: email, password',
    });
  }

  try {


      const account = await Account.findOne({ where: { email } });

      if (!account) {
        return res.status(404).json({ error: 'Account not found' });
      }
      
      
      // Hash the password before storing it
      //const hashedPassword = await bcrypt.hash(password, 10);
  
      const isMatch = await bcrypt.compare(password, account.password);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const accessToken = jwt.sign(
        {
          account: {
            username: account.username,
            email: account.email,
            id: account.id
          }
        }, process.env.ACCESS_TOKEN_SECRET,
      )
      
      return res.status(200).json({ accessToken });
      res.status(200).json({ message: 'Login successful', account })
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

}



