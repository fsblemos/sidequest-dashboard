exports.run = () => {
    let wait = true;
    let startedAt = new Date();
    
    while(wait){
        if((new Date().getTime() - startedAt.getTime()) > 200){
            wait = false;
        }
    }
}
