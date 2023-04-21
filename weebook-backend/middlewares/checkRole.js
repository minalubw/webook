export async function checkRole(req, res, next){
    if (req.user.role === 'admin') {
        next();
      } else {
        res.status(process.env.UNAUTHORIZED).json({ error: 'Unauthorized for this operation'});
      }
}