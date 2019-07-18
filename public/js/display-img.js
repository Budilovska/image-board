(function() {
    Vue.component('display-img', {
        template: '#display-template',
        data: function() {
            return {
                url: '',
                title: '',
                description: '',
                username: '',
                date: '',
                comment: '',
                author: '',
                comments: []
            }
        },
        props: ["id"],
        mounted: function() {
            console.log('mounted!!!');
            console.log("this.comments", this.comments);

            var that = this;
            axios.get('/comment/' + that.id).then(function(resp) {
                console.log("RESP:", resp);
                that.url = resp.data[0][0].url;
                that.title = resp.data[0][0].title;
                that.description = resp.data[0][0].description;
                that.username = resp.data[0][0].username;
                that.date = resp.data[0][0].created_at;
                that.comments = resp.data[1];
                console.log("that.comments", that.comments);
            }).catch(function(err) {
                    console.log('err in GET /comment', err);
            }); //closes /comment get
        },      //closes mounted
        methods: {
            clickedSubmitCom: function(e) {
                e.preventDefault();
                // console.log("Submitted a comment");
                // console.log(this.id);
                var that = this;

                axios.post('/comment/' + this.id, {comment: this.comment, author: this.author}).then(function(resp) {
                    console.log('response from POST /comment', resp.data);
                    that.comments.unshift(resp.data[0]);
                }).catch(function(err) {
                     console.log('error in POST /comment', err);
                })
            }
        },
        // watch: {
        //     id: function() {
        //adding here all from mounted
        //     }
        // }



    }) //end of vue component

    })(); //end of efii

    // the componen will need mounted function : take id it's passed, makes ajax req to get info about the image
    // all data about the image and all comments
    //
    // new query get image by id - we pass id and get all infos
