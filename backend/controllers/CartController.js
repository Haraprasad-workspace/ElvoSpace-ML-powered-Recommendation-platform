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

        const cart = await Cart.findOne({
            userId : id
        }) 

        if(!cart){
            return res.status(404).json({
                message : "the cart is currently empty"
            })
        }
        const productIds = cart.products.map(p=>p.productId);
        
        const products = await Product.find({
            "_id" : {$in : productIds}
        }).lean()
        


        const productMap = new Map(
            products.map(p=>[p._id.toString(), p])
        )
        
        const cartItems = cart.products.map(item =>({
            product : productMap.get(item.productId.toString()) ,
            quantity : item.quantity
        }))

        console.log(cartItems);
       

        return res.status(200).json({
            message : "cart fetched successfully" ,
            cartInfo : cartItems
        })

    }catch(err){
        console.log(err.message)
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
                p => p.productId.toString() === productId.toString()
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

const DeleteFromCart = async(req , res)=>{
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
            p=>p.productId.toString() === productId.toString()
        )
        if(!existingProduct){
            return res.status(404).json({
                message : "the product do not exist in the cart  , unable to delete "
            })
        }
        if(existingProduct.quantity > 1 ) existingProduct.quantity--;
        else{
            cart.products = cart.products.filter(
                p=>p.productId.toString()!==productId.toString()
            );

            cart.totalProducts-=1;
        }
        
        if(cart.products.length === 0) cart.totalAmount = 0;
        let totalamount = 0;
        let totalproducts = cart.products.length;

        for(const item of cart.products){
            const product = await Product.findById(item.productId);
            totalamount += product.discount_price * item.quantity;
        }
        cart.totalAmount = totalamount ;

        await cart.save();

        return res.status(200).json({
            success : true ,
        })

    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            message : err.message
        })
    }
}

module.exports = {ViewCart , addToCart , DeleteFromCart}