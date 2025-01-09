import express from 'express';
import  Account  from '../models/accountModel.js';
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



