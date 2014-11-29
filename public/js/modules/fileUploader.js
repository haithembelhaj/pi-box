'use strict';

(function(scope){

    /**
     * File Uploader Class
     *
     * Upload a file to the server
     * initialise with the form action
     *
     * @param action
     * @constructor
     * @author Haithem Bel Haj (hb@dietaikonauten.com)
     */

    function FileUploader(action){
        this.request = new XMLHttpRequest();
        this.request.open("POST", action);
    }

    /**
     * uploads the data
     *
     * example of data:
     * {
     *  images: (Files),
     *  extra: 'extra stuff'
     * }
     *
     *
     * @param data: an object representing the form data
     */
    FileUploader.prototype.upload = function(data){
        var formData = new FormData();

        for (var key in data) {
            formData.append(key, data[key]);
        }

        this.request.send(formData);
    };

    /**
     * Helper Class for nice Markupb ased fileuploads
     *
     * Reacts to change events and trigger upload
     *
     * Configuration:
     *
     * - data-action: for the action url
     * - data-fileupload: for the name field of the file input
     * - data-extra: json for the extra information you want to submit with the file
     *
     * example:
     *
     * <div data-fileupload="cupimage" data-action="upload.php" data-extra="{'product': 'ZT'}">
     *
     * @param el
     * @constructor
     * @author Haithem Bel Haj (hb@dietaikonauten.com)
     */

    function FileUpload(el){

        var _this = this;

        this.el = el;
        this.$el = $(el);

        this.action = this.$el.data('action');
        this.filesName = this.$el.data('fileupload');
        this.data = $.extend({}, this.$el.data('extra'));

        this.uploader = new FileUploader(this.action);

        this.$el.on('change', function(e, files){
            _this.data[_this.filesName] = files;
            _this.uploader.upload(_this.data);
        })
    }

    scope.FileUploader = FileUploader;
    scope.FileUpload = FileUpload;

})(window);


$(function(){


    $('[data-fileupload]').each(function(){

        new FileUpload(this);
    });

});