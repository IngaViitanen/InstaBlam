console.log('jag körs innan dom har laddats')



async function registerSW(){
    if ('serviceWorker' in navigator){
        try{
            await navigator.serviceWorker.register('sw.js')
            console.log('Service Worker är registrerad ')
        } catch{
            console.log('kunde inte registrerrar service worker:' + error.message)
        }
    } else {
        console.log('service worker finns inte i den här webbläsaren')
        // kanske göra saker i appen annorlunda
    }
}

registerSW()