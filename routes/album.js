var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var PhotoModel = require('../models/photo');

//检查登录
var checkLogin = require('../middlewares/check').checkLogin;

router.get('/',checkLogin,function(req, res, next){
  var author=req.session.user;
  console.log(author._id);
//  author._id=req.session.user._id;
//  var photos=req.query.photo;
//  console.log(photos);
  PhotoModel.getPhotosByAuthor(author)
  .then(function(photos){
    res.render('album',{photos:photos,user:author});
  }).catch(next);
//  res.render('album',{user:author});
});

router.post('/upload',checkLogin,function(req,res,next){
   console.log("测试"+path.basename(req.files.file1.path)+"  ");
   if(!req.files.file1.path){
     throw new Error("请选择上传图片！");
   }
   var author=req.session.user;
   var path1=req.files.file1.path.split(path.sep).pop();
   var name=req.files.file1.name;
    var photo={
      author:author._id,
      name:name,
      path:path1
    }  ;
    PhotoModel.create(photo).then(function(result){
      req.flash('success','图片上传成功');
    }).catch(function(e){
      req.flash('error','图片上传失败');
    });
    res.redirect('/album');
});

router.post('/delete',checkLogin,function(req,res,next){
  res.redirect('/album');
});

module.exports = router;
