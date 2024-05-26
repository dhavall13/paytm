const express = require('express')
const router = express.Router()
const zod = require('zod')
const jwt = require('jsonwebtoken')
const { User } = require('../db')
const { JWT_SECRET } = require('../config')

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
})

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
})

router.post('/signup', async (req, res) => {
  const { success } = signupSchema.safeParse(req.body)
  if (!success) {
    return res.status(411).json({
      message: 'Email already taken / Incorrect inputs',
    })
  }

  const existingUser = await User.findOne({
    username: body.username,
  })

  if (existingUser) {
    return res.json({
      message: 'Email already taken / Incorrect inputs',
    })
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  })

  const userId = user._id

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  )

  res.json({
    message: 'User created successfully',
    token: token,
  })
})

router.post('/signin', async (req, res) => {
  const { success } = signinSchema.safeParse(req.body)
  if (!success) {
    return res.status(411).json({
      message: 'Incorrect inputs',
    })
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  })

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    )
    res.json({
      token: token,
    })
    return
  }

  res.status(411).json({
    message: 'Error while logging in',
  })
})

module.exports = router
