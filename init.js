let card_collection = [{
        image: 'image/card_javascript.jpg',
        id: 'card_javascript',
        index: null
    },
    {
        image: 'image/card_php.jpg',
        id: 'card_php',
        index: null
    },
    {
        image: 'image/card_python.jpg',
        id: 'card_python',
        index: null
    },
    {
        image: 'image/card_cplus.jpg',
        id: 'card_cplusplus',
        index: null
    },
    {
        image: 'image/card_java.jpg',
        id: 'card_java',
        index: null
    },
    {
        image: 'image/card_ruby.jpg',
        id: 'card_ruby',
        index: null
    },
    {
        image: 'image/card_golang.jpg',
        id: 'card_golang',
        index: null
    },
    {
        image: 'image/card_csharp.jpg',
        id: 'card_csharp',
        index: null
    },
    {
        image: 'image/card_flutter.jpg',
        id: 'card_flutter',
        index: null
    },
    {
        image: 'image/card_kotlin.jpg',
        id: 'card_kotlin',
        index: null
    },
    {
        image: 'image/card_swift.jpg',
        id: 'card_swift',
        index: null
    },
    {
        image: 'image/card_vue.jpg',
        id: 'card_vue',
        index: null
    }
]

const card_default = 'image/card_default.jpg';

const click_sound = document.getElementById("click_sound");
const match_sound = document.getElementById("match_sound");

// check the storage

if (localStorage.getItem('level_card') == null || localStorage.getItem('level_card') == undefined) {
    localStorage.setItem('level_card', 'easy')
    selectLevel('easy');
} else {
    let level_selected = localStorage.getItem('level_card');
    selectLevel(level_selected);
}

function selectLevel($level) {
    switch ($level) {
        case 'easy':
            card_collection = card_collection.slice(0, 4);
            localStorage.setItem('level_card', 'easy')
            break;
        case 'medium':
            card_collection = card_collection.slice(0, 8);
            localStorage.setItem('level_card', 'medium')
            break;
        case 'advanced':
            card_collection = card_collection;
            localStorage.setItem('level_card', 'advanced')
            break;
        default:
            card_collection = card_collection;
            break;
    }
}