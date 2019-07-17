(function() {
    Vue.component('love-component', {
        template: '#love-template',
        data: function() {
            return {
                something: 'Vue'
            }
        },
        props: ["whatever"],
        mounted: function() {
            console.log('mounted!!!');
        },
        methods: {
            clicked: function() {
                console.log("Hello first click");
        // this.something = 'happy to see you'
                this.something = this.whatever;
                // this.showSecondLoveComponent = true;
        },
            clicked2: function () {
                console.log("Hello");
                    this.$emit('change', 'disco duck'); ///emiting events
    }
}

}); //end of love component

})(); //end of efii
