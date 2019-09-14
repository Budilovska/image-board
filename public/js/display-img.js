(function() {
    Vue.component("display-img", {
        template: "#display-template",
        data: function() {
            return {
                url: "",
                title: "",
                description: "",
                username: "",
                date: "",
                comment: "",
                author: "",
                nextImgId: null,
                prevImgId: null,
                comments: []
            };
        },
        props: ["id"],
        mounted: function() {
            // console.log("mounted!!!", this);
            // console.log("this.comments", this.comments);
            var that = this;
            axios
                .get("/comment/" + that.id)
                .then(function(resp) {
                    if (resp.data[0].length == 0) {
                        that.$emit("quit");
                    } else {
                        console.log(resp.data);
                        that.url = resp.data[0][0].url;
                        that.title = resp.data[0][0].title;
                        that.description = resp.data[0][0].description;
                        that.username = resp.data[0][0].username;
                        that.date = resp.data[0][0].created_at;
                        that.comments = resp.data[1];
                        that.prevImgId = resp.data[2][0].prev;
                        that.nextImgId = resp.data[2][0].next;
                    }
                })
                .catch(function(err) {
                    console.log("err in GET /comment", err);
                }); //closes /comment get
        }, //closes mounted
        methods: {
            clickedSubmitCom: function(e) {
                e.preventDefault();
                // console.log("Submitted a comment");
                // console.log(this.id);
                var that = this;

                axios
                    .post("/comment/" + this.id, {
                        comment: this.comment,
                        author: this.author
                    })
                    .then(function(resp) {
                        // console.log("response from POST /comment", resp.data);
                        that.comments.unshift(resp.data[0]);
                        that.comment = "";
                        that.author = "";
                    })
                    .catch(function(err) {
                        console.log("error in POST /comment", err);
                    });
            },
            closeModal: function() {
                this.$emit("quit");
            } //closes closeModal
        }, //closes Methods
        watch: {
            id: function() {
                // console.log("mounted!!!", this);
                // console.log("this.comments", this.comments);
                var that = this;
                axios
                    .get("/comment/" + that.id)
                    .then(function(resp) {
                        if (resp.data[0].length == 0) {
                            that.$emit("quit");
                        } else {
                            console.log(resp.data);
                            that.url = resp.data[0][0].url;
                            that.title = resp.data[0][0].title;
                            that.description = resp.data[0][0].description;
                            that.username = resp.data[0][0].username;
                            that.date = resp.data[0][0].created_at;
                            that.comments = resp.data[1];
                            that.prevImgId = resp.data[2][0].prev;
                            that.nextImgId = resp.data[2][0].next;
                        }
                    })
                    .catch(function(err) {
                        console.log("err in GET /comment", err);
                    }); //closes /comment get
            } //closes mounted
        }
    }); //end of vue component
})(); //end of efii
