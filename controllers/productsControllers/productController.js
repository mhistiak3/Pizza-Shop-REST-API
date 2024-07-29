import multer from "multer";
import path from "path";
import fs from "fs";
import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { Product } from "../../models";
import productSchema from "../../validators/productValidators";

// image upload Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = file.originalname
      .replace(fileExt, "")
      .toLowerCase()
      .split(" ")
      .join("-");
    const uniqName = `${Date.now()}-${fileName + fileExt}`;
    cb(null, uniqName);
  },
});

const uploadImage = multer({
  storage,
  limits: {
    fileSize: 1000000 * 5, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "image") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only .png .jpg .jpeg file allowed"));
      }
    }
  },
}).single("image");

const productController = {
  async store(req, res, next) {
    uploadImage(req, res, async (err) => {
      if (err) {
        return next(err);
      }
      const filePath = req.file.path;

      //   HACK: validation
      const { error } = productSchema.validate(req.body);

      //   HACK: if error come s in validation then image will delete .
      if (error) {
        // delete image
        fs.unlink(`${appRoote}/${filePath}`, (err) => {
          if (err) {
            return next(CustomErrorHandler.serverError(err.message));
          }
        });
        return next(error);
      }

      //  HACK: create a product in database
      try {
        const { name, size, price } = req.body;
        let document = await Product.create({
          name,
          size,
          price,
          image: filePath,
        });

        // HACK: send response
        res.status(201).json(document);
      } catch (error) {
        next(error);
      }
    });
  },

  async update(req, res, next) {
    uploadImage(req, res, async (err) => {
      if (err) {
        return next(err);
      }
      let filePath;
      if (req.file) {
        
        filePath = req.file.path;
      }

      //   HACK: validation
      const { error } = productSchema.validate(req.body);

      //   HACK: if error come s in validation then image will delete .
      if (error) {
        if (req.file) {
          // delete image
          fs.unlink(`${appRoote}/${filePath}`, (err) => {
            if (err) {
              return next(CustomErrorHandler.serverError(err.message));
            }
          });
        }
        return next(error);
      }

      //  HACK: Update a product in database
      try {
        const { name, size, price } = req.body;
        let document = await Product.findByIdAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              name,
              size,
              price,
              ...(req.file && { image: filePath }),
            },
          },
          { new: true }
        );

        // HACK: send response
        res.status(201).json(document);
      } catch (error) {
        next(error);
      }
    });
  },
};
export default productController;
