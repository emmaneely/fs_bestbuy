export const notFoundHandler = (req, res, next) => {
    try {
        res
            .status(404)
            .json({ msg: `Route not found. Check your request url and try again.` });
    } catch (err) {
        next(err);
    }
};