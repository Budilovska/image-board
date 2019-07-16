(function() {


//we apply vue for everything that is in the div with class 'main'.
//all information that is dynamic will go do data.
// stuff we put in data we can call with any words we want
new Vue({
    el: '.main',
    data: {
        name: "Ivana Matijevic",
        userInfo: {
            favoriteFood: 'kebab',
            nationality: 'usa',
            color: 'purple'
        },
        cities: [] //closes cities
    }, //closes data
    mounted: function() {
        // we're gonna make our first ajax request to our server using the axious library:
        //it's making GET request to /cities
        //axios is a client now, it's making requests to a server instead of browser! It means it also receives a response

        //using "this we can change properties of data":
        // this.name = 'Andrea';

        console.log('This: ', this);  //this represebts an object we're currently inside of. Currently we are in Vue object
        //PROPERTIES OF DATA BECOME PROPERTIES OF "THIS"
        // "this" looses it's meaning in nested scopes. we need to tell to "this" to always refer to "Vue$3", not WINDOW

        var self = this;
        axios.get('/cities').then(function(resp) {   //we can put any url
            // console.log('self:', self);
            console.log('resp:', resp.data);  //resp.data = cities array we got from server
            self.cities = resp.data;
                console.log('self:', self);
        }).catch(function(err) {
            console.log('err in GET /cities', err);
        });
    } //closes mounted
});  //closes new vue

// vue life cycle:
// created
// mounted
// destroyed

// mounted: runs after HTML has loaded. It's a "lifecycle method".
// In "mounted" we're we're going to make ajax requests to get data the user wants to
// see at the initial moment the page is loaded. If u're in the situation in which u want to render
// information the moment the page is rendered ..u'll probably want to fetchthat data in the "mounted" function.














})();


----------part2
(function() {

new Vue({
    el: '.main',
    data: {
        images: [],

        title: '',

        description: '',

        username:  '',

        file: null,

    }, //closes data
    mounted: function() {

        console.log('This: ', this);
        var self = this;

        axios.get('/images').then(function(resp) {
            console.log("RESPONSE:", resp.data);
            self.images = resp.data.rows;
            // console.log('self.images:', self.images);

        }).catch(function(err) {
            console.log('err in GET /cities', err);
        }); //closes axios req
    },      //closes mounted - don't forget a coma!!!!

    methods: {
        upload: function(e) {
            var fd = new FormData;
            fd.append('file', e.target.file[0]);
            axios.post('/upload', fd).then(function(res) {
                // throw that object into the array of images
            });
        },
//----------------------------
        // every signle function that runs in response to an event must be defined in methods
        handleClick: function(e) {
            e.preventDefault(); //we tell the button to prevent it's default behaviour - the page in not reloading
            // whatever code i write here will run whenever the user clicks the submit button
            console.log('this', this)  //properties of data are added to "this"

            //------FormData
            // FormData API is necessary for sending FILES from client to server !!!!!!!!! We're doing this only because of the file, that we're sending
            var formData = new FormData();
            formData.append('title', this.title);//we pass a key and value
            //value "this.title" is whatever user typed in input field
            formData.append('username', this.username);
            formData.append('description', this.description);
            formData.append('file', this.file);

            console.log("formdata", formData.entries());  //read documentation to log whatever is in formData, if u want to see what's inside
            axios.post('/upload', formData).then(function(resp) {
                console.log('response from POST /upload', resp);
            }).catch(function(err) {
                console.log('error in POST /upload', err);
            })
        },  //closes handleClick
//-----------------------
        //this function runs when user selects an image /on the file input field
        handleChange: function(e) {
            // console.log('Handlechange:', e.target.files[0]);
            // e - gives us an object we'll store inside of in data
            //now we need to add is as a property of data:
            this.file = e.target.files[0];

        } //closes handleChange
//---------------
    } //closes methods

});  //closes new vue
