const Cart = require('./../model/cart-model');
const Product = require('./../model/product-model');

exports.update = async (req, res) => {
    try {
        const product = await Product.findOne({ skuId: req.params.productSku });
        // check is product exist
        if (!product) throw 'product now found';

        let cart;

        cart = await Cart
            .findOne({ owner: req.member._id })
            .populate('productList.product', 'thumbnail name price skuId -_id')

        // check is cart exist
        if (!cart) cart = await Cart.create({ owner: req.member._id, totalProduct: 0, totalPrice: 0 });

        if (req.body.action === 'update') {
            // check is product already in cart
            const isProductAlreadyInCart = !!cart.productList.find(item => item.product.skuId === req.params.productSku);

            if (isProductAlreadyInCart) {
                cart.productList.forEach(item => {
                    if (item.product.skuId === req.params.productSku) {
                        item.totalPrice += (product.price * req.params.quantity);
                        item.amount += Number(req.params.quantity);
                    }
                });

            } else {
                cart.productList.push({
                    product: product._id,
                    amount: req.params.quantity,
                    totalPrice: product.price * req.params.quantity
                });
            }

            // update total
            cart.totalProduct = cart.totalProduct + Number(req.params.quantity);
            cart.totalPrice = cart.totalPrice + (product.price * req.params.quantity);

        } else if (req.body.action === 'increase' || req.body.action === 'decrease') {
            const isIncrease = req.body.action === 'increase'

            cart.productList.forEach(item => {
                if (item.product.skuId === req.params.productSku) {
                    item.totalPrice = isIncrease ? item.totalPrice += product.price : item.totalPrice -= product.price;
                    item.amount = isIncrease ? item.amount + 1 : item.amount - 1;
                }
            });

            // update total
            cart.totalProduct = isIncrease ? cart.totalProduct + 1 : cart.totalProduct - 1;
            cart.totalPrice = isIncrease ? cart.totalPrice + product.price : cart.totalPrice - product.price;


        } else if (req.body.action === 'change') {
            //
            console.log('change is here');
        }

        await cart.save();

        res.status(200).json({
            status: 'success',
            msg: 'update cart successfully',
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
            .populate('productList.product', 'thumbnail name skuId category price amount')

        if (!cart) cart = await Cart.create({ owner: req.member._id, totalProduct: 0, totalPrice: 0 });


        res.status(200).json({
            status: 'success',
            msg: 'cart with this member',
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

exports.delete = async (req, res) => {
    try {
        const product = await Product.findOne({ skuId: req.params.productSku });
        if (!product) throw 'product not found';

        const myCart = await Cart
            .findOne({ owner: req.member._id, productList: { $elemMatch: { product: product._id } } })
            .populate('productList.product', 'thumbnail name skuId price -_id');
        if (!myCart) throw 'your cart not found';

        const productInCart = myCart.productList.find(item => item.product.skuId === req.params.productSku);
        if (!productInCart) throw 'this product not found in your cart';

        const cart = await Cart.findOneAndUpdate({ owner: req.member._id }, {
            $pull: {
                productList: { product: product._id }
            },
            totalPrice: myCart.totalPrice - productInCart.totalPrice,
            totalProduct: myCart.totalProduct - productInCart.amount
        }, { new: true });

        res.status(200).json({
            status: 'success',
            msg: 'delete item in cart successfully',
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