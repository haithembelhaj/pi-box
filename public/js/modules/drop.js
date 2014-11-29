'use strict';

(function(scope){

    function Drop(el){
        var _this = this;

        this.el = el;
        this.$el = $(el);


        this.$el.on('dragover', prevent(function(e){
            _this.$el.addClass('dragover');
        }));

        this.$el.on('dragend, dragleave',prevent(function(e){
            _this.$el.removeClass('dragover');
        }));

        this.$el.on('drop', prevent(function(e){
            _this.$el.removeClass('dragover');
            _this.$el.trigger('change', [e.originalEvent.dataTransfer.files])
        }));

        this.$el.data('drop', this);
    };

    Drop.prototype.addListener = function(func){

        this.$el.on('drop', prevent(function(e){
            func(e.originalEvent.dataTransfer.files);
        }))
    };

    function prevent(func){

        return function(e){
            e.preventDefault();
            e.stopPropagation();
            func.apply(this, arguments);
            return false;
        }
    }

scope.Drop = Drop;

})(window);


$(function(){

    $('[data-drop]').each(function(){
        var drop = new Drop(this);

        drop.addListener(function(files){
            console.log(files);
        })
    })
});