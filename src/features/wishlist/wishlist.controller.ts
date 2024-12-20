import { Controller } from '../../decorators/controller';
import { Route } from '../../decorators/route';
import { Request, Response, NextFunction } from 'express';
import WishlistServices from './wishlist.services';

import { wishlistValidation } from './wishlist.validation';
import { Validate } from '../../decorators/vaidate';
import { MongoGet } from '../../decorators/mongooseDecorators/get';
import { Wishlist } from './wishlist.entity';

@Controller('/wishlist')
class WishlistCoontroller {
    @Validate(wishlistValidation)
    @Route('post', '/add-to-wishlist', true)
    async addProductsToWishlist(req: Request, res: Response, next: NextFunction) {
        try {
            const document = await WishlistServices.addProductToWishlist(req, res, next);
            console.log('document', document);
            return res.status(201).json(document);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    @Route('get', '/get-wishlisted-products/:id', true)
    @MongoGet(Wishlist)
    async getProductsFromWishlist(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(201).json(req.mongoGet);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
export default WishlistCoontroller;
