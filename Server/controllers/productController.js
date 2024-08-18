import ProductModel from "../model/productModel.js";
import CategoryModel from "../model/categoryModel.js";
import slugify from "slugify";
import uploadOnCloudinary from "../utils/cloudinary.js";

// *-------------------
// * create product
// *-------------------

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      originalprice,
      price,
      category,
      quantity,
      specifications,
    } = req.body;

    // Check if required fields are provided
    if (
      !name ||
      !description ||
      !originalprice ||
      !price ||
      !category ||
      !quantity ||
      !specifications ||
      !req.file
    ) {
      return res.status(400).send({
        success: false,
        message:
          "All fields, including an image file and specifications, are required",
      });
    }

    // Parse specifications
    let parsedSpecifications;
    try {
      parsedSpecifications = JSON.parse(specifications);
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: "Specifications should be in JSON format",
      });
    }

    // Check if all required specifications are provided
    const requiredSpecs = [
      "processor",
      "ram",
      "storage",
      "display",
      "operatingSystem",
    ];
    for (const spec of requiredSpecs) {
      if (!parsedSpecifications[spec]) {
        return res.status(400).send({
          success: false,
          message: `Specification ${spec} is required`,
        });
      }
    }

    // First, upload the image to Cloudinary
    const { path: localFilePath } = req.file;
    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

    if (!cloudinaryResponse.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image",
        error: cloudinaryResponse.message,
      });
    }

    // Create the product in the database
    const product = await new ProductModel({
      ...req.body,
      specifications: parsedSpecifications,
      slug: slugify(req.body.name),
      image: cloudinaryResponse.url,
    });

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating Product",
      error: error.message,
    });
  }
};

// *-------------------
// * Get All product with sorting and pagging
// *-------------------

const getAllProducts = async (req, res) => {
  try {
    const { page = 1, perPage = 9, sort = "createdAt", order } = req.query;
    const skip = (page - 1) * perPage;
    const sortOptions = { [sort]: order === "asc" ? 1 : -1 };

    const products = await ProductModel.find({})
      .populate("category")
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(perPage));

    const totalProducts = await ProductModel.countDocuments();

    res.status(200).send({
      success: true,
      totalProducts,
      message: "All Products",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Getting All Product",
      error: error.message,
    });
  }
};

// *-------------------
// * Get Single product
// *-------------------

const getSingleProducts = async (req, res) => {
  try {
    const product = await ProductModel.findOne({
      slug: req.params.slug,
    }).populate("category");
    res.status(200).send({
      success: true,
      message: "Product Fateched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting Product",
      error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Product",
      error,
    });
  }
};

// *-------------------
// * update product
// *-------------------

const updateProduct = async (req, res) => {
  try {
    let updatedFields = {
      ...req.body,
      slug: slugify(req.body.name),
    };

    // Check if the file is provided
    if (req.file) {
      const { path: localFilePath } = req.file;
      const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

      if (!cloudinaryResponse.success) {
        return res.status(500).json(cloudinaryResponse);
      }
      updatedFields.image = cloudinaryResponse.url;
    }

    const product = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      updatedFields,
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating Product",
      error: error.message,
    });
  }
};

// *-------------------
// * Product Count
// *-------------------

const productCount = async (req, res) => {
  try {
    const totalecount = await ProductModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      totalecount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Product Count",
      error,
    });
  }
};

// *-------------------
// * Product List With filter
// *-------------------

const productList = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const perPage = parseInt(req.query.perPage) || 9; // Number of items per page
    const sort = req.query.sort || "createdAt"; // Sorting criteria
    const order = req.query.order === "desc" ? -1 : 1; // Sorting order

    const args = {};

    // Filter by category and price
    if (req.query.filtercategories) {
      args.category = { $in: req.query.filtercategories.split(",") };
    }

    if (req.query.pricerange) {
      const [minPrice, maxPrice] = req.query.pricerange.split(",").map(Number);
      args.price = { $gte: minPrice, $lte: maxPrice };
    }

    const products = await ProductModel.find(args)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ [sort]: order });

    const total = await ProductModel.countDocuments(args);

    res.status(200).send({
      success: true,
      products,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching products",
      error,
    });
  }
};

// *-------------------
// * Product Search
// *-------------------
const productSearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await ProductModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).populate("category");
    res.json(results);
    // res.status(200).send({
    //   success: true,
    //   products,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Search products",
      error,
    });
  }
};

// *-------------------
// * Similar Product
// *-------------------
const similarProduct = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await ProductModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .limit(4)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting similar products",
      error,
    });
  }
};

// *--------------------------
// * Product by Category pagging and sorting
// *----------------------------
const productByCategory = async (req, res) => {
  try {
    const { page = 1, perPage = 9, sort = "createdAt", order } = req.query;
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    const skip = (page - 1) * perPage;
    const sortOptions = { [sort]: order === "asc" ? 1 : -1 };

    const products = await ProductModel.find({ category })
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(perPage))
      .populate("category");

    const totalProducts = await ProductModel.countDocuments({ category });

    res.status(200).send({
      success: true,
      category,
      products,
      totalProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting products",
      error,
    });
  }
};

// *--------------------------
// * Product Count by Category
// *----------------------------

const productCountByCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    const counts = await Promise.all(
      categories.map(async (category) => {
        const count = await ProductModel.countDocuments({
          category: category._id,
        });
        return { category: category.slug, count };
      })
    );
    res.status(200).send({
      success: true,
      counts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Getting Product Counts by Category",
      error: error.message,
    });
  }
};

// *-------------------
// * Filter product without paging use if need
// *-------------------

const filterProducts = async (req, res) => {
  try {
    const { filtercategories, pricerange } = req.body;
    const args = {};

    if (filtercategories?.length > 0) {
      args.category = filtercategories;
    }

    if (pricerange?.length && pricerange.length === 2) {
      args.price = { $gte: pricerange[0], $lte: pricerange[1] };
    }

    const products = await ProductModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in filtering products",
      error,
    });
  }
};

// *-------------------
// * Latest product
// *-------------------
const getLatestProducts = async (req, res) => {
  try {
    const latestProducts = await ProductModel.find({})
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .limit(6) // Limit the results to 6
      .populate("category"); // Populate the category field

    res.status(200).send({
      success: true,
      message: "Latest Products",
      products: latestProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting Latest Products",
      error: error.message,
    });
  }
};

export default {
  createProduct,
  getAllProducts,
  getSingleProducts,
  deleteProduct,
  updateProduct,
  filterProducts,
  productCount,
  productList,
  productSearch,
  similarProduct,
  productByCategory,
  productCountByCategory,
  getLatestProducts,
};

//

//

//

//

//

//

// maual

// const createProduct = async (req, res) => {
//   try {
//     const { name, slug, description, price, category, quantity } = req.fields;
//     const { image } = req.files;
//     //validation
//     switch (true) {
//       case !name:
//         return res.status(500).send({ error: "Name is Required" });
//       case !description:
//         return res.status(500).send({ error: "Description is Required" });
//       case !price:
//         return res.status(500).send({ error: "Price is Required" });
//       case !category:
//         return res.status(500).send({ error: "Category is Required" });
//       case !quantity:
//         return res.status(500).send({ error: "Quantity is Required" });
//       case image && image.size > 1000000:
//         return res.status(500).send({
//           error: "Photo is Required and should be less than 1mb",
//         });
//     }

//     if (image && image.size > 1000000) {
//     }
//     const products = new ProductModel({
//       ...req.fields,
//       slug: slugify(name),
//     });
//     if (image) {
//       products.image.data = fs.readFileSync(image.path);
//       products.image.contentType = image.type;
//     }
//     await products.save();
//     res.status(201).send({
//       success: true,
//       message: "Product created successfully",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in creating Product",
//       error,
//     });
//   }
// };

// const getAllProducts = async (req, res) => {
//   try {
//     const products = await ProductModel.find({})
//       .populate("category")
//       .select("-image")
//       .limit(12)
//       .sort({ createdAt: -1 });
//     res.status(200).send({
//       success: true,
//       TotalCount: products.length,
//       message: "All Products",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in Getting All Product",
//       error: error.message,
//     });
//   }
// };

// const getSingleProducts = async (req, res) => {
//   try {
//     const product = await ProductModel.findOne({ slug: req.params.slug })
//       .select("-image")
//       .populate("category");
//     res.status(200).send({
//       success: true,
//       message: "Product Fateched",
//       product,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in Getting Product",
//       error,
//     });
//   }
// };

// const getPhotoProduct = async (req, res) => {
//   try {
//     const product = await ProductModel.findById(req.params.pid).select("image");
//     if (product.image.data) {
//       res.set("Content-type", product.image.contentType);
//       res.status(200).send(product.image.data);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while Getting Product Photo",
//       error,
//     });
//   }
// };
