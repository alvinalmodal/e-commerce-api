class ProductRepository {
  constructor(mongoose) {
    this.mongoose = mongoose;
    this.productSchema = new mongoose.Schema({
      name: String,
      seller: String,
      description: String,
      price: Number,
      images: [{ imageUrl: String, isMainImage: Boolean }],
    });
    this.Product = this.mongoose.model("Product", this.productSchema);
  }

  save = async (product) => {
    const query = new this.Product(product);
    try {
      const result = await query.save();
      console.log("new product saved");
      return result;
    } catch (error) {
      console.log("failed to create new product", error);
      return error;
    }
  };

  getProducts = async () => {
    try {
      return this.Product.find();
    } catch (error) {
      return error;
    }
  };
}

export default ProductRepository;
