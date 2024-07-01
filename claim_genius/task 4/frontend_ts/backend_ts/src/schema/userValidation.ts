import Joi from 'joi';

const schema = Joi.object({
    first_name: Joi.string()
        .pattern(/^[A-Za-z]+$/)
        .min(3)
        .max(15)
        .required()
        .messages({
            'string.pattern.base': 'First name must contain only alphabetic characters.',
            'string.min': 'First name must be at least 3 characters long.',
            'string.max': 'First name must be at most 15 characters long.',
            'any.required': 'First name is required.'
        }),

    last_name: Joi.string()
        .pattern(/^[A-Za-z]+$/)
        .min(3)
        .max(15)
        .required()
        .messages({
            'string.pattern.base': 'Last name must contain only alphabetic characters.',
            'string.min': 'Last name must be at least 3 characters long.',
            'string.max': 'Last name must be at most 15 characters long.',
            'any.required': 'Last name is required.'
        }),

    dob: Joi.date()
        .min('1900-01-01')
        .max('2020-12-31')
        .required()
        .messages({
            'date.min': 'Date of birth must be after January 1, 1900.',
            'date.max': 'Date of birth must be before December 31, 2020.',
            'any.required': 'Date of birth is required.'
        }),
    
    mno: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            'string.pattern.base': 'Mobile number must be exactly 10 digits.',
            'any.required': 'Mobile number is required.'
        }),
    
    address: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.min': 'Address must be at least 3 characters long.',
            'string.max': 'Address must be at most 100 characters long.',
            'any.required': 'Address is required.'
        })
});

export default schema;
