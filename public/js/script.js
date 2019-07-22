(function() {
    new Vue({
        el: ".main",
        data: {
            images: [],
            showModal: false,
            moreImagesExist: true,
            title: "",

            description: "",

            username: "",

            file: null,

            id: location.hash.slice(1)
        }, //closes data
        mounted: function() {
            history.replaceState(null, null, "/");
            console.log("this", this); //properties of data are added to "this"
            var self = this;

            axios
                .get("/images")
                .then(function(resp) {
                    self.images = resp.data.rows;
                    // console.log('self.images:', self.images);
                })
                .catch(function(err) {
                    console.log("err in GET /cities", err);
                }); //closes axios req

            $(window).on("hashchange", function() {
                self.id = location.hash.slice(1);
                console.log("hashchanged", self.id);
                if (self.id) {
                    self.showModal = true;
                }
            });
        }, //closes mounted

        methods: {
            //----------------------------

            handleClick: function(e) {
                e.preventDefault();

                // FormData API is necessary for sending FILES:
                var formData = new FormData();
                formData.append("title", this.title); //value "this.title" is whatever user typed in input field
                formData.append("username", this.username);
                formData.append("description", this.description);
                formData.append("file", this.file);

                var self = this;

                axios
                    .post("/upload", formData)
                    .then(function(resp) {
                        console.log("response from POST /upload", resp.data);
                        self.images.unshift(resp.data);
                        self.title = "";
                        self.description = "";
                        self.username = "";
                    })
                    .catch(function(err) {
                        console.log("error in POST /upload", err);
                    });
            }, //closes handleClick

            //------------------this function runs when user selects an image:
            handleChange: function(e) {
                this.file = e.target.files[0];
            }, //closes handleChange

            clicked: function(e) {
                this.showModal = true;
                // console.log("IMAGES URL", this.images[0].url);
                // console.log("target", e.target.id);
                this.id = e.target.id;
            },

            closeModal: function() {
                this.id = null;
                history.replaceState(null, null, "/");
                this.showModal = false;
            },

            clickedMoreButton: function(e) {
                console.log("clicked more btn");
                e.preventDefault();
                var that = this;
                let lastId = this.images[this.images.length - 1].id;
                // console.log(lastId);

                axios
                    .get("/more/" + lastId)
                    .then(function(resp) {
                        // console.log("RESP More Images:", resp.data.length);
                        resp.data.forEach(image => {
                            that.images.push(image);
                            // console.log(that.moreImagesExist);
                            // console.log("RESP", resp.data);
                            if (resp.data.length < 9 || !resp.data.length) {
                                // console.log("RESP", resp.data);
                                that.moreImagesExist = false;
                            } //hiding more btn if no more img
                        });
                    })
                    .catch(function(err) {
                        console.log("err in GET /images+lastID", err);
                    }); //closes axios req
            } //clickedMoreButton
        } //closes methods
    }); //closes new vue
})();

//
// checkScrollPosition: function() {
//     var that = this;
//
//     if (
//         $(document).scrollTop() + $(window).height() >
//         $(document).height() - 40
//     ) {
//         console.log("Has reached bottom");
//     }
// } //closes checkScrollPosition
