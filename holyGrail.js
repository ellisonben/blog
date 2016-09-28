function playGame () {
    var user = prompt("Bridgekeeper:'What is your name?'").toUpperCase();

    var elementIsInArray = function(x,xs) {
        return xs.indexOf(x) !== -1;    
    }

    switch (user) {
        case 'ROBIN':
            var quest=prompt("Bridgekeeper: 'What is your quest?'").toLowerCase();
            var capital=prompt("Bridgekeeper: 'What is the capital of Assyria?'").toLowerCase(); 
            if (quest === "to seek the holy grail" && elementIsInArray(capital,["nineveh","assur","nimrud","dur sarukin"])) {
                alert("Bridgekeeper:'Right. Off you go.'")
            }
            else {
                alert("Robin is thrown from the bridge into the gorge of eternal peril")
            }
            break;
        case 'ARTHUR':
            var quest=prompt("Bridgekeeper: 'What is your quest?'").toLowerCase();
            var speed=prompt("Bridgekeeper: 'What... is the air-speed velocity of an unladen swallow?'").toLowerCase(); 
            if (quest === "to seek the holy grail" && speed === "an african or european swallow?") {
                alert("Bridgekeeper:'Huh? I... I don't know that. [he is thrown over by his own spell] AUUUUUUUGGGGGGGGGGGHHH!!'")
            }
            else {
                alert("Arthur is thrown from the bridge and the Bridgekeeper cackles malevolently")
            }
            break;
        case 'LANCELOT':
            var quest=prompt("Bridgekeeper: 'What is your quest?'").toLowerCase();
            var colour=prompt("Bridgekeeper: 'What is your favourite colour?'").toLowerCase(); 
            if (quest === "to seek the holy grail" && colour === "blue") {
                alert("Bridgekeeper:'Right. Off you go.'")
            }
            else {
                alert("Lancelot is thrown from the bridge and the Bridgekeeper cackles malevolently")
            }
            break;
        default:
            var quest=prompt("Bridgekeeper: 'What is your quest?'").toLowerCase();
            var capital=prompt("Bridgekeeper: 'What is the capital of Assyria?'").toLowerCase(); 
            if (quest === "to seek the holy grail" && elementIsInArray(capital,["nineveh","assur","nimrud","dur sarukin"])) {
                alert("Bridgekeeper:'Right. Off you go.'")
            }
            else {
                alert(user + " " + "is thrown from the bridge and the Bridgekeeper cackles malevolently")
            }
    }
}