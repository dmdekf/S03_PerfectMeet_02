<template> 
<v-form> 
    <v-container>
        <v-row> 제목 </v-row> 
        <v-row> 
            <v-text-field :counter="50" label="제목" name="title" required v-model="title" maxlength="50" >
                </v-text-field> 
                </v-row> 
                <v-row> 내용 </v-row>
                 <v-row> 
                     <v-textarea filled name="context" hint="내용을 입력해주세요." v-model="context" :counter="1000" maxlength="1000" ></v-textarea> 
                </v-row> 
                <v-row> 
                    <v-btn block outlined color="blue" @click="writeClick"> 등록 </v-btn> 
                </v-row> 
    </v-container> 
    </v-form> 
</template>

<script>
export default {
    
}
</script>