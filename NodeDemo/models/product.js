const product = require('../schema/product');
var Schemaproduct = require('../schema/product')

module.exports ={
    getall:function(query){
        var sort={};
        var Search={};
        if(query.sort){
            if(query.sort[0]=='-'){
                sort[query.sort.substring(1)]='desc';
            }else{
                sort[query.sort]='asc';
            }
        }
        if(query.key){
            Search.productName= new RegExp(query.key,'i');
        }
        var limit = parseInt(query.limit)||2;
        var page = parseInt(query.page)||1;
        var skip = (page-1)*limit;
        return Schemaproduct.find(Search).select('name description image price').sort(sort).limit(limit).skip(skip).exec();
    },
    getOne:function(id){
        return Schemaproduct.findById(id);
    },
    getByName:function (name){
        return Schemaproduct.findOne({}).exec();
    },
    createproduct:function(product){
        return new Schemaproduct(product).save();
    },
    findByIdAndUpdate:function(id, product){
        return Schemaproduct.findById(id).updateOne(product);
    },
    findByIdAndDelete:function(id, product){
        return Schemaproduct.findById(id).deleteOne().exec();
    }
}