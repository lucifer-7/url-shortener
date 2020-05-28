const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');
const Url = require('../model/url');

router.post('/shorten', async (req,res)=>{
     const { longUrl } = req.body;
     const baseurl = config.get('baseUrl');
    
     if(!validUrl.isUri(baseurl)){
         res.status(401).json('Invalid base Url');
     }

     const urlCode = shortId.generate();

     if(validUrl.isUri(longUrl)){
         try{
             let url = await Url.findOne({longUrl});

             if(url){
                 res.json(url);
             }else{
                 const shortUrl = baseurl + '/' + urlCode;
                 url = new Url({
                     urlCode, 
                     longUrl, 
                     shortUrl,
                     date: new Date() 
                 });

                 await url.save();
                 res.json(url);
             }
         }catch(err){
             console.log(err.message);
             res.status(500).json('Server error');
         }
     }else{
         res.status(401).json('Invalid Url');
     }
});




module.exports = router;