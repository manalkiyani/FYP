const router = require("express").Router();
var bcrypt = require('bcryptjs');
const User = require('../models/Admin');
const verify = require('../verifyToken');

//UPDATE

router.put('/:id',verify , async (req,res)=>{
    if (req.user.id === req.params.id || req.user.isAdmin){
        if (req.body.password){
            var hash = bcrypt.hashSync(req.body.password).toString();
        }
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set : req.body
            },{new:true})
            res.status(200).json(updateUser)

        }
        catch(err){
            req.status(500).json(err)
        }
    }
    else{ 
        res.status(403).json('You can only update your account')
    }
})
//DELETE
router.delete('/:id',verify , async (req,res)=>{
    if (req.user.id === req.params.id || req.user.isAdmin){
       
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted")

        }
        catch(err){
            req.status(500).json(err)
        }
    }
    else{ 
        res.status(403).json('You can only delete your account')
    }
})
//GET
router.get('/find/:id' , async (req,res)=>{
   
       
        try{
         const user =  await User.findById(req.params.id)
            res.status(200).json(user)

        }
        catch(err){
            req.status(500).json(err)
        }

})
//GET ALL
router.get('/',verify , async (req,res)=>{
    const query = req.query.new;
    if (req.user.isAdmin){
       
        try{
            const users = query ? await User.find().limit(10) : await User.find();
        
            res.status(200).json(users)

        }
        catch(err){
            req.status(500).json(err)
        }
    }
    else{ 
        res.status(403).json('You are not allowed to see all users')
    }
})

module.exports = router;