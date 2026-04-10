import express from 'express'
import { body, validationResult } from 'express-validator' //use to validate 

const router = express.Router();


//use validation middlewaare
const handleValidationError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errors.array()[0].msg
        })
    }
    next()
}

//post/api/auth/register

router.post('/register',
    body('name')
    .trim
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'))