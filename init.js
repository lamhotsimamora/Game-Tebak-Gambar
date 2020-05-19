let card_collection = [
    {
        image : 'https://lamhotsimamora.github.io/Game-Tebak-Gambar/image/card_javascript.png',
        id : 'card_javascript',
        index : null
    },
    {
        image : 'https://lamhotsimamora.github.io/Game-Tebak-Gambar/image/card_php.png',
        id : 'card_php',
        index : null
    },
    {
        image : 'https://lamhotsimamora.github.io/Game-Tebak-Gambar/image/card_python.png',
        id : 'card_python',
        index : null
    },
    {
        image : 'https://lamhotsimamora.github.io/Game-Tebak-Gambar/image/card_cplus.png',
        id : 'card_cplusplus',
        index : null
    }
    ,
    {
        image : 'https://lamhotsimamora.github.io/Game-Tebak-Gambar/image/card_java.png',
        id : 'card_java',
        index : null
    }
    ,
    {
        image : 'https://lamhotsimamora.github.io/Game-Tebak-Gambar/image/card_ruby.png',
        id : 'card_ruby',
        index : null
    }
    ,
    {
        image : 'https://lamhotsimamora.github.io/Game-Tebak-Gambar/image/card_golang.png',
        id : 'card_golang',
        index : null
    }
    ,
    {
        image : 'https://lamhotsimamora.github.io/Game-Tebak-Gambar/image/card_csharp.png',
        id : 'card_csharp',
        index : null
    }
    ,
    {
        image : 'https://lamhotsimamora.github.io/Game-Tebak-Gambar/image/card_flutter.png',
        id : 'card_flutter',
        index : null
    }
    ,
    {
        image : 'https://lamhotsimamora.github.io/Game-Tebak-Gambar/image/card_kotlin.png',
        id : 'card_kotlin',
        index : null
    }
    ,
    {
        image : 'https://lamhotsimamora.github.io/Game-Tebak-Gambar/image/card_swift.png',
        id : 'card_swift',
        index : null
    }
    ,
    {
        image : 'https://lamhotsimamora.github.io/Game-Tebak-Gambar/image/card_vue.png',
        id : 'card_vue',
        index : null
    }
]

const card_default = 'https://lamhotsimamora.github.io/Game-Tebak-Gambar/image/card_default.png';

const click_sound = document.getElementById("click_sound"); 
const match_sound = document.getElementById("match_sound"); 

// check the storage

if (localStorage.getItem('level_card')==null || localStorage.getItem('level_card')== undefined){
    localStorage.setItem('level_card','easy')
    selectLevel('easy');
}else{
    let level_selected = localStorage.getItem('level_card');
    selectLevel(level_selected);
}

function selectLevel($level){
    switch ($level) {
        case 'easy':
            card_collection = card_collection.slice(0,4);
            localStorage.setItem('level_card','easy')
            break;
        case 'medium':
            card_collection = card_collection.slice(0,8);
            localStorage.setItem('level_card','medium')
            break;
        case 'advanced':
            card_collection = card_collection;
            localStorage.setItem('level_card','advanced')
            break;
        default:
            card_collection = card_collection;
            break;
    }
}