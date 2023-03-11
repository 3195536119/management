<template>
    <div class="headerContainer">
        <div class="left_banner">
            <h1>
                Element
            </h1>
        </div>

        <div class="user_info">
            {{userID}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',

    data() {
        return {
            
        };
    },

    computed:{
        userID(){
            return this.$store.state.userID
        }
    },

    mounted() {
        
    },



    methods: {
        
    },
};
</script>

<style scoped>
.headerContainer{
    height: 100px;
    background-color: rgb(0, 163, 255);
    display: flex;
    justify-content: space-between;
    line-height: 100px;
    padding: 0 20px 0 15px;
    color: white;
}

</style>