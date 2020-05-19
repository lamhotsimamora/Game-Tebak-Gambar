/*
* Written by Lamhot Simamora
* Github : @lamhotsimamora
* 19 Mei 2020
*/

// store when card is selected
let card_selected = [];

// store count of true selected card
let true_card_selected = 0;

let $score = new Vue({
    el : '#score',
    data : {
        true_selected : 0,
        time  : '00 : 00',
        wrong : 0,
        final_score : 0,
        data_level : [
            {
                level : 'easy'
            },
            {
                level : 'medium'
            },
            {
                level : 'advanced'
            }
        ],
        level : null,
        level_selected : null
    },
    methods: {
        selectLevel: function(){
            selectLevel(this.level);
            window.location.href="index.html";
        }
    },
    mounted() {
        this.level_selected = localStorage.getItem('level_card').toUpperCase();
    },
})

let $app = new Vue({
    el : '#app',
    data : {
        data_card : [],
        all_index_card : [],
        index : null,
        minute : 0,
        second : 0,
        stopwatch : false,
        obj_interval : null
    },
    methods: {
        startStopWatch: function(){
            this.obj_interval = setInterval(() => {
            if (this.second==59){
                this.minute++;
                this.second = 0;
            }else{
                if (this.minute==0){
                    this.minute='00';
                }
                this.second++;
            }
            if (this.second.toString().length==1){
                this.second = '0'+this.second;
            }
            $score.time = this.minute  +' : '+ this.second
        }, 1000);
        },
        openImage : function(event){
            try{
                // check if stopwatch is not running
                if (this.stopwatch==false){
                    this.startStopWatch();
                    this.stopwatch=true;
                }

                let div = event.currentTarget
                    
                // get attribute
                card_index  = div.getAttribute('card_index');
                image_index = div.getAttribute('index_number');
                id          = div.getAttribute('id');

                // skip if the div is disabled
                if (div.getAttribute('disabled')){
                    return;
                }

                // check if the card is double to click
                if (card_selected.length>0){
                    if (card_selected[0].card_index==card_index){
                        return;
                    }
                }

                // play the sound effect
                click_sound.play(); 
                
                // open the card 
                this.openCard(card_index,image_index)

                // store card selected in array
                card_selected.push({
                    image_index : image_index,
                    card_index : card_index
                })

                this.checkTheCard();

                if (true_card_selected==this.data_card.length){
                    this.calculateScore();
                    Swal.fire({
                        title: 'Finish !!!',
                        text: 'Your Score is '+$score.final_score,
                        icon: 'info',
                        confirmButtonText: 'OK'
                    });
                    clearInterval(this.obj_interval)
                }
            }catch(e){
                console.error("Tebak Gambar - "+e);
            }
        },
        checkTheCard: function(){
            // check if the card was open 2 card
            if (card_selected.length==2){
                // if the card is match
                if (card_selected[0]['image_index'] == card_selected[1]['image_index']){
                    let $id_div = this.data_card[card_selected[0]['card_index']];
                    $id_div = $id_div.id;
                    
                    let $find_copy = $id_div.search("copy");

                    let $btn_1;
                    let $btn_2;
                    if ($find_copy==-1){
                        $btn_1 = $id_div+'_copy'
                        $btn_2 = $id_div;
                    }else{
                        $btn_1 = $id_div;
                        $btn_2 = $id_div.replace("_copy",'');
                    }

                    // set disabled attribute to element div, 
                    // so its cant be click again
                    document.getElementById($btn_1).setAttribute("disabled", "true");
                    document.getElementById($btn_2).setAttribute("disabled", "true");
                    
                    // add event onclick to the div, and return false
                    document.getElementById($btn_1).addEventListener('click',function(){
                         return false;
                    });
                    document.getElementById($btn_2).addEventListener('click',function(){
                        return false;
                    });

                    // empty array card selected
                    card_selected = [];

                    // +1 the true selected
                    $score.true_selected++;

                    true_card_selected = true_card_selected + 2;

                    // play sound effect when the card is match
                    match_sound.play(); 
                }else{
                   this.closeCard(card_selected[0]['card_index'])
                   $score.wrong++;
                   card_selected.splice(0, 1);
                }
            }
        },
        calculateScore: function(){
             let $count_card = this.data_card.length;
             
             let $minute = this.minute*60;
             let $second = this.second;
             
             let sum_minute_second = $minute + $second;

             let result_score = ( $score.true_selected +  sum_minute_second );

             // score is not valid, i will finish it soon
             $score.final_score = Math.floor(result_score);

        }
        ,
        openCard: function(card_index,image_index){
            this.data_card[card_index].image = card_collection[image_index].image;
        }
        ,
        closeCard: function(card_index){
            this.data_card[card_index].image = card_default;
        },
        loadRandomImage(){
            // get count card to display
            const $sum_card = card_collection.length;

            let index_card_A = [];
            let index_card_B = [];

            for (let k = 0 ; k < $sum_card; k++) {
                index_card_A[k]=k;
            }
            for (let k = 0 ; k < $sum_card; k++) {
                index_card_B[k]=k;
            }

            // join the array index_card_a + index_card_b
            this.all_index_card = index_card_A.concat(index_card_B);

            // shuffle the array
            this.all_index_card = this.shuffleCard(this.all_index_card)
            
          
           for (let k = 0 ; k < this.all_index_card.length; k++){
               let $obj = card_collection[this.all_index_card[k]];
               let $index = this.all_index_card[k];
               
               let $id_card = $obj.id;
                
                this.data_card.push({
                    image : card_default,
                    image_index : $index,
                    card_index : k,
                    id : $id_card
                });
           }
           
           let $store_array = [];
           for (let m= 0 ; m < this.data_card.length; m++){
               let $id_card = this.data_card[m]['id'];
               if (m==0){
                   $store_array.push($id_card);
               }else{
                   if ($store_array.indexOf($id_card)!=-1){
                       $store_array.push($id_card+'_copy')
                   }else{
                    $store_array.push($id_card);
                   }
               }
           }

           for (let n=0; n< this.data_card.length; n++){
                 let $obj = this.data_card[n];

                 $obj.id = $store_array[n];
           }
        },
        randomNumber(number){
            return  Math.floor(Math.random() * number);
        },
        shuffleCard($array){
            return $array.sort(() => Math.random() - 0.5);
        }
    },
    mounted(){
        this.loadRandomImage();
    }
})