const Product = require('../models/Product');

const PAGE_SIZE = 1;

const productController = {};

productController.createProduct = async (req, res) => {
  try {
    const {
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    } = req.body;
    const product = new Product({
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    });
    await product.save();
    res.status(200).json({ status: 'success', product });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};
productController.getProducts = async (req, res) => {
  try {
    const { page, name } = req.query;
    const cond =
      name && name.trim() !== ''
        ? { name: { $regex: name, $options: 'i' } }
        : {};
    let query = Product.find(cond);
    const response = {};
    const pageNum = parseInt(page, 10);
    if (pageNum && pageNum > 0) {
      query.skip((pageNum - 1) * PAGE_SIZE).limit(PAGE_SIZE);
      const totalItemNum = await Product.countDocuments(cond);
      const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
      response.totalPageNum = totalPageNum;
    }
    const productList = await query.exec();
    response.data = productList;
    res.status(200).json({ status: 'success', ...response });
  } catch (error) {
    console.error(error); // 에러를 콘솔에 출력
    res.status(400).json({ status: 'fail', error: error.message });
  }
};
productController.updateProduct = async (req,res) => {
  try{
    const productId = req.params.id;
    const {sku, name, size, image, price, description, category, stock, status} = req.body;
    const product = await Product.findByIdAndUpdate({_id:productId}, {sku, name, size, image, price, description, category, stock, status},
      {new: true}
    );
    if(!product) throw new Error('아이템이 존재하지 않습니다');
    res.status(200).json({status: 'success', data: product});
  }catch(error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
}
module.exports = productController;
