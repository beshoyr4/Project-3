import firebase from  "../firebase";
// whole thing inside GET /api/items

export const retrieve = () => {
    console.log("working")
    firebase.database().ref('items')
    .on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items) {
            newState.push({
                id: item,
                title: items[item].title,
                user: items[item].user
            });
        }
        console.log(newState)
    })
}
