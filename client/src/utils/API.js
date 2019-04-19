// whole thing inside GET /api/items
function = () => {

    firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items) {
            newState.push({
                id: item,
                title: items[item].title,
                user: items[item].user
            });
        }

// whole thing inside PUT /api/saved
function = () => {

    firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items) {
            newState.push({
                id: item,
                title: items[item].title,
                user: items[item].user
            });
        }