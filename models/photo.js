var Photo=require('../lib/mongo').Photo;

module.exports={
    create:function(photo){
      return Photo.create(photo).exec();
    },
    delete:function(photo){
      return Photo.remove(photo).exec();
    },
    getPhotosByAuthor:function(author){
      return Photo.find({}).exec();
    }
}
