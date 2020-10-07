<template>
    <v-app id="inspire">
    <v-main class="mx-10px"
>
    <div class="post">
            <section class="post-list" >
            <div v-for="(post, id) in storeList" :key="id">
                <div class="post-card" v-if="post.id">
                    <a style="color: black">
                        <div class="contents">
                            <h3>{{post.name}}</h3>
                            <h3>{{post.address}}</h3>
                            <h3>{{post.tel}}</h3>
                            <div class="comment mt-1"><v-icon>mdi-comment-multiple-outline</v-icon>  {{post.cnt}}</div>
                        </div> 
                    </a>
                </div>
            </div>
            </section>
        </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
//import SERVER from "@/api/api";
export default {
    props:{
        loc:{
            type:String,
            required:true
        },
        pur:{
            type:Number,
            required:true
        }
    },
    data: () => {
        return {
            storeList:[],
            photos: [],
            limit:0,
            url:"",
        }
    },
    mounted(){
        this.getStores()
    },
    methods: {
        getStores() {
            axios.get("http://j3a507.p.ssafy.io:8399/stores?loc="+this.loc+"&pur="+this.pur)
            .then((res)=>{
                    if(res.data) {
                        console.log(res.data);
                        this.storeList = res.data.data;  
                    }
            })
            .catch((err) => console.error(err));
        },
        
    },
}
</script>

<style scoped>
.tag-list-wrap[data-v-fbaed234] {
    position: fixed;
    width: max-content;
    align-items: center;
    padding: 0;
}
.post .post-list {
    min-height: 500px;
    width: 80vm;
    align-items: left;
}
.post .post-list > div .post-card .contents {
  width: 100%;
  float: left;
  padding: 20px;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  border: 1px solid #000;
  border-top: none;
}

</style>