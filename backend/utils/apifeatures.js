class ApiFeatures {
       constructor(query, queryStr){
               this.query = query;
               this.queryStr = queryStr;
       }

       search() {
            const keyword = this.queryStr.keyword ? {
                //this mongodn $regex for search
                name : {
                    $regex: this.queryStr.keyword,
                    $options: 'i' //case-insensitive otherwise default case-sensitive
                },
            } : {};
            this.query = this.query.find({ ...keyword });//passing the keyword that is created using regex
            return this;
       }

       filter() {
        /* spread operator is used to copy the queryStr object */
        /* if we do- "const queryCopy = this.queryStr" - this will give the reference of the object and if we change anything in queryCopy it will make that change in this.queryStr which will not give the results we want. */
          const queryCopy = {...this.queryStr};
          //REMOVE SOME FIELDS
          /* because we have other parameters in api which is for search and pagination
           and we need to remove it so that we can apply filters */
          const removeFields = ["keyword","page","limit"];
          removeFields.forEach(key=> delete queryCopy[key]);
          //FILTER FOR PRICE RANGE
          let queryStr = JSON.stringify(queryCopy);
          queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)
          /* Remember: this.query means Product.find() */
          this.query = this.query.find(JSON.parse(queryStr));
          return this;
       }

       pagination(resultPerPage) {
           const currentPage = Number(this.queryStr.page) || 1;

           const skip = resultPerPage * (currentPage - 1);
           
           /* mongosh methods - filter(), skip () */
           this.query = this.query.limit(resultPerPage).skip(skip);

           return this;

               }
}
module.exports = ApiFeatures; 