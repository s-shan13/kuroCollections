class ApiFeatures{
    //result = query
    constructor(results, queries){
        this.results = results;
        this.queries = queries;
    }

    /**
     * Search feature of api
     * Uses regular expression to create a filter of the name property and assigns it to keyword
     * Calls find method of mongodb with the keyword so that only the results which match the name are returned
     */
    search(){
        const keyword = this.queries.keyword?{
            name:{
                $regex:this.queries.keyword, //regular expression
                $options:"i" //case insensitive
            }
        }:{}
        
        this.results = this.results.find({...keyword});
        return this; 
    }

    /**
     * Filter feature of api
     * Works by removing all queries except collections query
     * Returns items in the required collection
     */
    filter(){
        const queriesCopy = {...this.queries};

        //Removing fields other than collections
        const removeFields = ["keyword", "page", "limit"]
        removeFields.forEach((key)=>delete queriesCopy[key]);

        //Queries copy has only the collections field remaining
        this.results = this.results.find(queriesCopy)
        return this
    }

    /**
     * Separate items into multiple pages
     */
    pagination(resultPerPage){
        const currentPage = Number(this.queries.page) || 1;

        //number of products we need to skip to get to the start of the page
        const skip = resultPerPage*(currentPage-1)
        
        this.results = this.results.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures