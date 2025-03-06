import slugify from "slugify";
import {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findOne,
} from "../../../DB/DBMethods.js";
import brandModel from "../../../DB/model/brand.model.js";
import bikeModel from "../../../DB/model/bike.model.js";
import categoryModel from "../../../DB/model/category.model.js";
import { asyncHandler } from "../../../services/asyncHandler.js";
import cloudinary from "../../../services/cloudinary.js";
import { paginate } from "../../../services/pagination.js";

export const addBike = asyncHandler(async (req, res, next) => {
  let { categoryId, brandId } = req.params;
  let foundedCategory = await findOne({
    model: categoryModel,
    condition: { _id: categoryId },
  });
  if (!foundedCategory) {
    next(new Error("Category not found", { cause: 404 }));
  } else {
    let foundedBrand = await findById({ model: brandModel, id: brandId });
    if (!foundedBrand) {
      next(new Error("Brand not found", { cause: 404 }));
    } else {
      if (!req.files?.length) {
        next(new Error("You have to add images", { cause: 400 }));
      } else {
        let { name, discount, price } = req.body;
        req.body.slug = slugify(name);
        req.body.stock = req.body.totalItems;
        req.body.finalPrice = price - (price * discount || 0) / 100;
        // if (discount) {
        //     req.body.finalPrice = discount > price ? 1 : price - discount
        // }
        req.body.categoryId = categoryId;
        req.body.brandId = brandId;
        req.body.createdBy = req.user._id;
        req.body.soldItems = 0;

        let imagesUrl = [];
        let imageIds = [];
        for (const file of req.files) {
          let { secure_url, public_id } = await cloudinary.uploader.upload(
            file.path,
            { folder: "brands/bikes" }
          );
          imagesUrl.push(secure_url);
          imageIds.push(public_id);
        }
        req.body.images = imagesUrl;
        req.body.publicImageIds = imageIds;

        let bike = await create({ model: bikeModel, data: req.body });

        if (!bike) {
          for (const id of imageIds) {
            await cloudinary.uploader.destroy(id);
          }
          next(new Error("Error while inserting to DB", { cause: 400 }));
        } else {
          res.status(201).json({ message: "Success", bike });
        }
      }
    }
  }
});

export const updateBike = asyncHandler(async (req, res, next) => {
  let { bikeId } = req.params;
  let bike = await findById({ model: bikeModel, id: bikeId });
  if (!bike) {
    next(new Error("Bike not found", { cause: 404 }));
  } else {
    let { price, discount, name, totalItems } = req.body;
    if (name) {
      req.body.slug = slugify(name);
    }
    if (price && discount) {
      req.body.finalPrice = price - (price * discount) / 100;
    } else if (price) {
      req.body.finalPrice = price - (price * product.discount) / 100;
    } else if (discount) {
      req.body.finalPrice = product.price - (product.price * discount) / 100;
    }
    if (totalItems) {
      let currentStock = totalItems - bike.soldItems;
      req.body.stock = currentStock > 0 ? currentStock : 0;
    }

    if (req.files?.length) {
      let imagesUrl = [];
      let imageIds = [];
      for (const file of req.files) {
        let { secure_url, public_id } = await cloudinary.uploader.upload(
          file.path,
          { folder: "brands/bikes" }
        );
        imagesUrl.push(secure_url);
        imageIds.push(public_id);
      }
      req.body.images = imagesUrl;
      req.body.publicImageIds = imageIds;
    }
    req.body.updatedBy = req.user._id;
    let updatedBike = await findByIdAndUpdate({
      model: bikeModel,
      condition: { _id: bikeId },
      data: req.body,
      options: { new: true },
    });
    if (!updatedBike) {
      if (req.body.publicImageIds) {
        for (const id of req.body.publicImageIds) {
          await cloudinary.uploader.destroy(id);
        }
      }
      next(new Error("DB error", { cause: 400 }));
    } else {
      if (req.body.publicImageIds) {
        for (const id of product.publicImageIds) {
          await cloudinary.uploader.destroy(id);
        }
      }
      res.status(200).json({ message: "Updated", updatedBike });
    }
  }
});

const populate = [
  {
    path: "categoryId",
    select: "name",
  },
  {
    path: "brandId",
    select: "name",
  },
];

export const allBikes = asyncHandler(async (req, res, next) => {
  const { page, size, limit, skip } = paginate(req.query);

  const bikes = await find({
    model: bikeModel,
    limit,
    skip,
    populate: [...populate],
  });

  const totalBikes = await bikeModel.countDocuments();
  const totalPages = Math.ceil(totalBikes / size);

  res.status(200).json({
    success: true,
    message: "Bikes fetched successfully",
    totalBikes,
    totalPages,
    currentPage: page,
    pageSize: size,
    bikes,
  });
});

export const getBikeById = asyncHandler(async (req, res, next) => {
  let { bikeId } = req.params;

  let bike = await findById({ model: bikeModel, id: bikeId });
  if (!bike) {
    next(new Error("Invalid bike", { cause: 404 }));
  } else {
    res.status(200).json({ message: " Done", bike });
  }
});
