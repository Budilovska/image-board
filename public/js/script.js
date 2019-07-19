(function() {
    new Vue({
        el: ".main",
        data: {
            images: [],
            showModal: false,
            title: "",

            description: "",

            username: "",

            file: null,

            id: location.hash
        }, //closes data
        mounted: function() {
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
                self.id = window.location.hash;
                // self.id = location.hash.slice(1);
                if (self.id) {
                    self.showModal = true;
                }
            });
        }, //closes mounted - don't forget a coma!!!!

        methods: {
            //----------------------------

            handleClick: function(e) {
                e.preventDefault();
                // console.log('this', this)  //properties of data are added to "this"

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
                        console.log("response from POST /upload", resp);
                        self.images.unshift(resp.data);
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
                location.hash = "";
                history.replaceState(null, null, "/");
                this.showModal = false;
                console.log("this.showModal", this.showModal);
            }
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
