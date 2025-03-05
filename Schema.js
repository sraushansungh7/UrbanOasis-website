const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
                "string.empty": "Title cannot be empty.",
                "string.min": "Title must be at least 3 characters.",
                "string.max": "Title cannot exceed 100 characters.",
                "any.required": "Title is required."
            }),

        description: Joi.string()
            .trim()
            .min(1)
            .max(1000)
            .required()
            .messages({
                "string.empty": "Description cannot be empty.",
                "string.min": "Description must be at least 10 characters.",
                "string.max": "Description cannot exceed 1000 characters.",
                "any.required": "Description is required."
            }),

        location: Joi.string()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
                "string.empty": "Location cannot be empty.",
                "string.min": "Location must be at least 3 characters.",
                "string.max": "Location cannot exceed 100 characters.",
                "any.required": "Location is required."
            }),

        country: Joi.string()
            .trim()
            .min(2)
            .max(56)
            .required()
            .messages({
                "string.empty": "Country cannot be empty.",
                "string.min": "Country must be at least 2 characters.",
                "string.max": "Country cannot exceed 56 characters.",
                "any.required": "Country is required."
            }),

        price: Joi.number()
            .required()
            .min(0)
            .precision(2)
            .messages({
                "number.base": "Price must be a number.",
                "number.min": "Price must be at least 0.",
                "any.required": "Price is required."
            }),

        image: Joi.string()
            .uri()
            .allow("", null)
            .messages({
                "string.uri": "Image must be a valid URL."
            })
    }).required()
});



module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number()
            .min(1)
            .max(5)
            .required()
            .messages({
                "any.required": "Rating is required.",
                "number.min": "Rating must be at least 1.",
                "number.max": "Rating cannot be more than 5."
            }),
        
        comment: Joi.string()
            .trim()
            .min(3)  // Ensure at least 3 characters
            .required()
            .messages({
                "string.empty": "Comment cannot be empty.",
                "string.min": "Comment must be at least 3 characters.",
                "any.required": "Comment is required."
            })
    }).required()
});
