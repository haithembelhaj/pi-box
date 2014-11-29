'use strict';

(function(scope){

    function FileInput(el){
        var _this = this;

        this.el = el;
        this.$el = $(el);


        this.$hiddenInput = $('<input type="file" />');

        this.$el.on('click', function(){
            _this.$hiddenInput.click();
        });

        this.$hiddenInput.on('change', function(){

            _this.$el.trigger('change', [this.files || this]);
        })
    }

    scope.FileInput = FileInput;

})(window);


$(function(){

    $('[data-fileinput]').each(function(){
        var fileInput = new FileInput(this);
    })

    $('[data-fileinput]').on('change', function(e, files){
        console.log(files);
    })
});