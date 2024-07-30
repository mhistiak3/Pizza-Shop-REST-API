import multer from "multer";
import path from "path";
import fs from "fs";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { Product } from "../models";
import productSchema from "../validators/productValidators";

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
  // function: store product in database
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
  // function: update product in database
  async update(req, res, next) {
    uploadImage(req, res, async (err) => {
      if (err) {
        return next(err);
      }
      let filePath;
      if (req.file) {
        // HACK: delete image if image is uploded
        const product = await Product.findOne({
          _id: req.params.id,
        });
        if (!product) {
          return next(new Error("Nothing to delete"));
        }
        fs.unlink(`${appRoote}/${product._doc.image}`, (err) => {
          if (err) {
            return next(err);
          }
        });
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
  // function: delete product from database
  async destroy(req, res, next) {
    try {
      // HACK: delete product
      const document = await Product.findOneAndRemove({ _id: req.params.id });
      if (!document) {
        return next(new Error("Nothing to delete"));
      }
      // HACK: delete image
      const imagePath = document._doc.image;
      fs.unlink(`${appRoote}/${imagePath}`, (err) => {
        if (err) {
          return next(err);
        }
      });

      res.json(document);
    } catch (error) {
      next(error);
    }
  },
  // function: get all product from database
  async index(req, res, next) {
    try {
      const document = await Product.find()
        .select("-updatedAt -__v")
        .sort({ updatedAt: -1 });
      res.json({ document });
    } catch (error) {
      next(err);
    }
  },

  // function: get single product from database
  async show(req, res, next) {
    try {
      const document = await Product.findOne({ _id: req.params.id }).select(
        "-updatedAt -__v"
      );
      if (!document) {
        return next(new Error("Product not found"));
      }

      res.json(document);
    } catch (error) {
      next(error);
    }
  },
};
export default productController;
