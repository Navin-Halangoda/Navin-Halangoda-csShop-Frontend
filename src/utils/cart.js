import toast from "react-hot-toast"

export function getcart(){
    const cartString= localStorage.getItem("cart")

    if(cartString==null){
        localStorage.setItem("cart","[]")
        return []
    }else{
        const cart= JSON.parse(cartString)
        return cart
    }

}

export function addtocart(product,quantity){
    const cart = getcart()

    const index= cart.findIndex((item)=>{
        return item.productId==product.productId
    })

    if(index==-1){
        cart.push({
            productId:product.productId,
            name:product.name,
            price:product.price,
            lablledPrice:product.lablledPrice,
            quantity:quantity,
            image:product.images[0]
        })
        toast.success(`${product.name} added succefully`)
    }else{
        const newQty = cart[index].quantity+quantity;
         if(newQty<=0){
            cart.splice(index,1)
            toast.success(`${product.name} removed to cart`)
         }else{
            cart[index].quantity=newQty;
            toast.success(`updated ${product.name} quantity to ${newQty}`)
         }
    }
        const cartString= JSON.stringify(cart)
         localStorage.setItem("cart",cartString)
}

export function emptycart(){
    localStorage.setItem("cart","[]")
}

export function getcarttotal(){
    let total=0;
    const cart=getcart();

    cart.forEach((item)=>{
        total+=item.price*item.quantity;
    })
    return total;
}