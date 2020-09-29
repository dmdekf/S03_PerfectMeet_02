<template>
  <div id="app">
    <v-app id="inspire">
      <v-main>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="8">
              <v-card class="elevation-12">
                <v-toolbar color="deep-purple accent-4" dark flat>
                  <v-toolbar-title>회원 정보</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <v-text-field
                        prepend-icon="mdi-emoticon-cool-outline"
                        v-model="nickName" id="nickname"
                        label="nickName"
                        outlined
                        readonly
                        dense
                        type="text"
                    ></v-text-field>
                    <v-text-field
                        prepend-icon="mdi-email"
                         v-model="email" id="email" type="text"
                        label="email"
                        outlined
                        readonly
                        dense
                    ></v-text-field>
                </v-card-text>
                <v-card-text>
                    
                    <v-container fluid v-if="profileUrl">
                    <v-row justify="center" align="center">
                    <v-col cols="8" aspect-ratio="2" contain>
                      <v-img :src="profileUrl" aspect-ratio="1" max-width="100" max-height="100">
                     
                      </v-img>
                    </v-col>
                  </v-row>
                  </v-container>
                  <v-container v-else fluid>
                  <v-row  justify="center" align="center">
                    <v-col class="subtitle-1 text-center mb-5" cols="8" aspect-ratio="2" contain>
                    <div v-if="profileUrl!=``">
                      <v-img :src="profileUrl"/>
                      
                    </div>
                    <div v-else class="overline"> 
                        프로필 사진을 등록해 보세요.
                    </div>
                    </v-col>
                  </v-row>
                  </v-container>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <span v-if="profileUrl">
                  <v-btn @click="deleteProfile" color="#9896f1" text>프로필 사진 삭제</v-btn>
                  </span>
                  <v-btn color="primary" v-on:click="moveUpdate">수정하기</v-btn>
                  <v-btn color="lime" v-on:click="moveList">메인화면</v-btn>
                </v-card-actions>
                </v-card-text>
              </v-card> 
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import axios from 'axios';
import SERVER from "@/api/api";

export default {
    
    data: () => {
            return {
                email: '',
                nickName: '',
                profileUrl : '',
            }
        },
        methods: {
            deleteProfile(){
              axios({
                method: "DELETE",
                url: SERVER.URL + "/profile/delete/" + this.$store.state.login_user
              }).then((res) => {
                  if (res.data.status) {
                      //(res.data);
                      this.profileUrl=""
            } else {}
        })
            },
            moveList(){
                this.$router.push("/");
            },
            moveUpdate(){
                this.$router.push("/user/update");
            }
            
        },
        created() {            
            axios({
                method:"get",
                url:SERVER.URL+"/user/detail/"+this.$store.state.login_user,
            }).then((res)=>{
                if (res.data.status){
                    this.email = res.data.object.email
                    this.nickName = res.data.object.uid
                }
            })
            axios({
              method :"POST",
              url : SERVER.URL+ "/getImg/"+this.$store.state.login_user,
            }).then((res)=>{
                if (res.data.status){
                    this.profileUrl = res.data.object.uimage
                }
            })
        },
}
</script>

<style>
.middle {
    margin-top: 20px;
}
</style>