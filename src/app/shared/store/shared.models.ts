export interface teerexStateModel {
    totalCartCount:number,
    products: products[],
    cartDetails: cartDetails[]
}

export interface products{
    id:number,
    imageUrl:string,
    name:string,
    type:string,
    price:number,
    currency: string,
    color: string,
    gender: string,
    quantity: number
}

export interface cartDetails{
        id:number
        quantity:number
}

