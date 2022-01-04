
class Pagination {

    itemsPerPage; 
    firstPage;
    currentPage;
    lastPage; 

    content;
    amountTags;

    get currentTags() {
        return this.content[this.currentPage-1];
    }

    constructor(taglist) {
        this.content = [];
        this.itemsPerPage = 3;
        this.firstPage = 1;
        this.lastPage = Math.ceil(taglist.length/this.itemsPerPage);
        this.currentPage = this.firstPage;
        this.amountTags = taglist.length;
        var a = 0;
        for(var i = 0; i < this.lastPage; i++) {
            var tags = [];
            for(var j = 0; j< this.itemsPerPage; j++) {
                if(a < taglist.length) {
                    tags.push(taglist[a]);
                }
                a++;
            }
            this.content.push(tags);
        }
    }


    

    hasNext() {
        return this.currentPage < this.lastPage;
    }

    hasPrevious() {
        return this.currentPage > 1;
    }

    next() {
        this.currentPage++;
    }

    prev() {
        this.currentPage--;
    }




}

module.exports = Pagination;