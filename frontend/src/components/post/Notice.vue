<template> 
    <v-container> 
    <v-data-table :headers="headers" :items-per-page="5" class="elevation-1" @click:row="rowClick" > 
        </v-data-table> 
        <v-row> 
            <v-btn outlined color="blue" @click="writeClick" > 작성 </v-btn>
        </v-row> 
    </v-container> 
</template> 
<script> 
export default { 
    methods: { 
        writeClick() {
             this.$router.push('/post/write')
        },
        rowClick(){

        }
    },
    data () { 
        return { 
            headers: [ { 
                text: 'Number', 
                align: 'left',
                 sortable: false,
                  value: 'number', 
            }, { 
                text: 'Title', 
                value: 'title' 
                }, 
                {
                     text: 'Reg Date',
                      value: 'regDt' 
                } ], 
                desserts: [],
                } 
            }

}
</script> 