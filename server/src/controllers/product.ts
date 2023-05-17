import { Request, Response } from 'express';
import Products from '../models/product';

export const getProducts = async (req: Request, res: Response) => {
    const listProducts = await Products.findAll()

    res.json(listProducts)
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Products.findByPk(id);

    if(product) {
        res.json(product)
    } else {
        res.status(404).json({
            msg: `მოცემული ID-ით - ${id} პროდუქტი ვერ მოიძებნა!`
        })
    }
    
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Products.findByPk(id);

    if (!product) {
        res.status(404).json({
            msg: `მოცემული ID-ით - ${id} პროდუქტი ვერ მოიძებნა!`
        })
    } else {
        await product.destroy();
        res.json({
            msg: `პროდუქტი წარმატებით წაიშალა`
        })
    }
    
    
}

export const postProduct = async (req: Request, res: Response) => {
    const { body } = req;
    
    try {
        await Products.create(body);
        
        res.json({
            msg: `პროდუქტი წარმატებით დაემატა!`
        })
    } catch (error) {
        console.log(error);
        
        res.json({
            msg: `დაფიქსირდა შეცდომა!`
        })
    }


    
}

export const updateProduct = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const product = await Products.findByPk(id);
        if(product) {
            await product.update(body);
            res.json({
                msg: `პროდუქტი წარმატებით შეიცვალა!`
            })
        } else {
            res.status(404).json({
                msg: `მოცემული ID-ით - ${id} პროდუქტი ვერ მოიძებნა!`
            })
        }
    } catch (error) {
        console.log(error);
        
        res.json({
            msg: `დაფიქსირდა შეცდომა!`
        })
    }
    
}