const Cart = require("../models/CartModel")
const Product = require("../models/ProductModel")
const jwt = require('jsonwebtoken')

const ViewCart = async(req , res)=>{
    try{
        const id = req.userid ;
        if(!id){
            return res.status(401).json({
                message : "token id not found , please login again "
            })
        }

        const cart = await Cart.find({
            userId : id
        }) 

        if(!cart){
            return res.status(400).json({
                message : "the cart is currently empty"
            })
        }
        return res.status(200).json({
            message : "cart fetched successfully" ,
            cartInfo : cart
        })
    }catch(err){
        return res.status(500).json({
            message : err.message
        })
    }


}

const addToCart = async(req , res)=>{
    try{
        const userId = req.userid
        const {productId}  = req.body ;

        if(!productId){
            return res.status(401).json({
                message : "the product id is missing"
            })
        }

        const product = await Product.findById(productId);

        if(!product){
            return res.status(401).json({
                message : "the product id was not found "
            })
        }

        const product_amt = product.discount_price;

        
        let cart = await Cart.findOne({userId})
        if(!cart){
            cart = await Cart.create({
            userId ,
            products : [
                {
                    productId ,
                    quantity : 1
                },
                
            ] , 
            totalAmount : product_amt ,
            totalProducts : 1

            })
        }else{
            const existingProduct = cart.products.find(
                p => p.productId === productId
            )
            if(existingProduct){
                existingProduct.quantity +=1 ;
            }else{
                cart.products.push({
                    productId ,
                    quantity : 1 
                })

                cart.totalProducts+=1;

            }
            cart.totalAmount += product_amt ;
            await cart.save();
        }

        return res.status(200).json({
            success : true ,
        });
    }catch(err){
        return res.status(500).json({
            message : err.message
        })
    }
}

const deleteFromCart = async(req , res)=>{
    try{
        const userId = req.userid ;
        const {productId} = req.body;

        if(!productId){
            return res.status(400).json({
                message : "the product id is missing "
            })
        }

        const product = await Product.findById(productId);
        if(!product){
            return res.status(401).json({
                message : "the Product was not found"
            })
        }
        const product_amt = product.discount_price

        let cart = await Cart.findOne(
            {userId}
        )

        if(!cart){
            return res.status(404).json({
                message : "the Cart is already empty , cannot delete any item"
            })
        }
        const existingProduct = cart.products.find(
            p=>p.productId === productId
        );
        if(!existingProduct){
            return res.status(404).json({
                message : "the product do not exist in the cart  , unable to delete "
            })
        }
        if(existingProduct.quantity > 1 ) existingProduct.quantity--;
        else{
            cart.products = cart.products.filter(
                p=>p.productId!==productId
            );

            cart.totalProducts-=1;
        }
        
        cart.totalAmount = Math.max(
            0 , cart.totalAmount - product_amt 
        ) ;

        if(cart.products.length === 0) cart.totalAmount = 0;
        await cart.save();

        return res.status(200).json({
            success : true ,
        })

    }catch(err){
        return res.status(500).json({
            message : err.message
        })
    }
}

module.exports = {ViewCart , addToCart , deleteFromCart}