function serve(drink){
    console.log(`Here is your ${drink}`);
}

function takeAway(drink){
    console.log(`Your ${drink} is packed to go.`);
}

function prepare(drink, callback){
    console.log(`I am making ${drink}`);

    setTimeout(() => {
        callback(drink);
    }, 2000);
}

prepare('coffee', serve);
prepare('tea', takeAway);