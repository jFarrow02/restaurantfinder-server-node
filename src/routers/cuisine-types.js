const Router = require('express').Router;

const CuisineTypeRouter = (cuisineTypeService) => {

    const router = new Router();

    router.get('/find/all', async (req, res) => {
        const data = await cuisineTypeService.getAllCuisineTypes();
        res.status(200).json(data);
    });

    return router;
};

module.exports = CuisineTypeRouter;