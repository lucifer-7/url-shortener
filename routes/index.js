const express = require('express');
const router = express.Router();
const Url = require('../model/url');

router.get('/:code', async (req,res)=>{
    try {
        const url = await Url.findOne({urlCode : req.params.code});

        if(url){
            return res.redirect(url.longUrl);
        }else{
            return res.status(404).json('This url does not exist');
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json('Server error');
    }
});

module.exports = router;