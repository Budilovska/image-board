(function() {
    Vue.component('display-img', {
        template: '#display-template',
        data: function() {
            return {
                url: '',
                title: '',
                description: '',
                username: '',
                date: ''
            }
        },
        props: ["id"],
        mounted: function() {
            console.log('mounted!!!');
            // console.log("PROPS:", this.id)
            var that = this;
            axios.get('/comment/' + that.id).then(function(resp) {
                console.log("RESP:", resp.data);
                that.url = resp.data[0].url;
                that.title = resp.data[0].title;
                that.description = resp.data[0].description;
                that.username = resp.data[0].username;
                that.date = resp.data[0].created_at;
            }).catch(function(err) {
                    console.log('err in GET /comment', err);
            }); //closes /comment get
        } //closes mounted




    }) //end of vue component

    })(); //end of efii

    // the componen will need mounted function : take id it's passed, makes ajax req to get info about the image
    // all data about the image and all comments
    //
    // new query get image by id - we pass id and get all infos
