const Cart = require('./../model/cart-model');
const Product = require('./../model/product-model');

exports.update = async (req, res) => {
    try {
        // check is product exist
        const product = await Product.findOne({ skuId: req.params.productSku });
        if (!product) throw 'product now found';

        // check is cart exist
        let cart;

        cart = await Cart
            .findOne({ owner: req.member._id })
            .populate('itemList.product', 'thumbnail name price skuId -_id')

        if (!cart) cart = await Cart.create({ owner: req.member._id, totalProduct: 0, totalPrice: 0 });

        // check is product already in cart
        const isProductAlreadyInCart = !!cart.itemList.find(item => item.product.skuId === req.params.productSku);

        if (isProductAlreadyInCart) {
            cart.itemList.forEach(item => {
                if (item.product.skuId === req.params.productSku) {
                    item.totalPrice += (product.price * req.params.quantity);
                    item.amount += Number(req.params.quantity);
                }
            });

        } else {
            cart.itemList.push({
                product: product._id,
                amount: req.params.quantity,
                totalPrice: product.price * req.params.quantity
            });
        }

        // update total
        cart.totalProduct = cart.totalProduct + Number(req.params.quantity);
        cart.totalPrice = cart.totalPrice + (product.price * req.params.quantity);

        await cart.save();

        res.status(200).json({
            status: 'success',
            msg: 'add item to cart successfully',
            data: {
                cart
            }
        })

    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        let cart;

        cart = await Cart
            .findOne({ owner: req.member._id })
            .populate('itemList.product', 'thumbnail name price -_id')

        if (!cart) cart = await Cart.create({ owner: req.member._id, totalProduct: 0, totalPrice: 0 });


        res.status(200).json({
            status: 'success',
            msg: 'cart with this member',
            data: {
                cart: cart.itemList
            }
        })

    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}