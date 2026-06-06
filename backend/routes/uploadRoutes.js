const express = require('express');

const multer = require('multer');

const Replicate = require('replicate');

const cloudinary = require('../config/cloudinary');

const {

    CloudinaryStorage

} = require(

    'multer-storage-cloudinary'

);

const Image = require('../models/Image');

const TryOn = require('../models/TryOn');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();



// REPLICATE

const replicate = new Replicate({

    auth: process.env.REPLICATE_API_TOKEN

});



// CLOUDINARY STORAGE

const storage = new CloudinaryStorage({

    cloudinary: cloudinary,



    params: async (req, file) => ({

        folder: 'mystyle',



        allowed_formats: [

            'jpg',

            'jpeg',

            'png',

            'webp'

        ],



        public_id:

            Date.now() +

            '-' +

            file.originalname

    })

});



// MULTER

const upload = multer({

    storage: storage

});



// UPLOAD IMAGE API

router.post(

    '/upload',

    authMiddleware,

    upload.single('image'),

    async (req, res) => {

        try {

            const imageType = req.body.imageType;



            const newImage = new Image({

                imageUrl: req.file.path,

                imageType: imageType,

                user: req.user

            });



            await newImage.save();



            res.json({

                message:

                    'Image Uploaded Successfully',



                image:

                    req.file.path

            });

        }

        catch (error) {

            console.log(

                'UPLOAD ERROR →',

                error

            );



            res.status(500).json({

                message:

                    'Upload Failed'

            });

        }

    }

);



// FETCH ALL IMAGES

router.get(

    '/images',

    authMiddleware,

    async (req, res) => {

        try {

            const images = await Image.find({

                user: req.user

            }).sort({

                createdAt: -1

            });



            res.json(images);

        }

        catch (error) {

            console.log(error);



            res.status(500).json({

                message:

                    'Failed To Fetch Images'

            });

        }

    }

);



// FETCH IMAGES BY TYPE

router.get(

    '/images/:type',

    authMiddleware,

    async (req, res) => {

        try {

            const images = await Image.find({

                imageType:

                    req.params.type,



                user:

                    req.user

            }).sort({

                createdAt: -1

            });



            res.json(images);

        }

        catch (error) {

            console.log(error);



            res.status(500).json({

                message:

                    'Failed To Fetch Images'

            });

        }

    }

);



// DELETE IMAGE

router.delete(

'/tryons/:id',

authMiddleware,

async (req,res)=>{

try{

await TryOn.findByIdAndDelete(

req.params.id

);

res.json({

message:'Deleted'

});

}

catch(error){

res.status(500).json({

message:'Delete Failed'

});

}

}

);



// AI GENERATE API

router.post(

    '/generate',

    authMiddleware,

    upload.fields([

        {

            name: 'personImage',

            maxCount: 1

        },

        {

            name: 'outfitImage',

            maxCount: 1

        }

    ]),

    async (req, res) => {

        try {

            console.log(

                'GENERATE API STARTED'

            );



            const personImage =

                req.files.personImage[0].path;



            const outfitImage =

                req.files.outfitImage[0].path;



            console.log(

                'PERSON →',

                personImage

            );



            console.log(

                'OUTFIT →',

                outfitImage

            );


            console.log(
    'STARTING IDM-VTON...'
);

const output = await replicate.run(
    "cuuupid/idm-vton:0513734a452173b8173e907e3a59d19a36266e55b48528559432bd21c7d7e985",
    {
        input: {
            human_img: personImage,
            garm_img: outfitImage,
            garment_des: "fashion clothing"
        }
    }
);

console.log(
    'REPLICATE OUTPUT →',
    output
);



            // SAVE PERSON IMAGE

            const newPersonImage =

                new Image({

                    imageUrl:

                        personImage,



                    imageType:

                        'person',



                    user:

                        req.user

                });



            await newPersonImage.save();



            // SAVE OUTFIT IMAGE

            const newOutfitImage =

                new Image({

                    imageUrl:

                        outfitImage,



                    imageType:

                        'outfit',



                    user:

                        req.user

                });



            await newOutfitImage.save();



            // TEMP RESULT

            // REAL AI MODEL CAN BE ADDED LATER

           const resultImage =
    typeof output?.url === 'function'
        ? output.url()
        : output;



            console.log(

                'FINAL RESULT IMAGE →',

                resultImage

            );



            // SAVE TRYON HISTORY

            const newTryOn =

                new TryOn({

                    personImage,



                    outfitImage,



                    resultImage,



                    user:

                        req.user

                });



            await newTryOn.save();



            res.json({

                message:

                    'AI Look Generated',



                resultImage

            });

        }

        catch (error) {

            console.log(

                '========== FINAL ERROR =========='

            );



            console.log(error);



            res.status(500).json({

                message:

                    'AI Generation Failed'

            });

        }

    }

);



// TRYON HISTORY

router.get(

    '/tryons',

    authMiddleware,

    async (req, res) => {

        try {

            const tryons = await TryOn.find({

                user: req.user

            }).sort({

                createdAt: -1

            });



            res.json(tryons);

        }

        catch (error) {

            console.log(error);



            res.status(500).json({

                message:

                    'Failed To Fetch TryOns'

            });

        }

    }

);



module.exports = router;