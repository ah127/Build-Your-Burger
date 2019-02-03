const state = {
    ingredients:{
        cheese:1,
        meat:2
    }
}

const newState = Object.keys(state.ingredients).map((igKey)=>{
    return [...Array(state.ingredients[igKey])].map((_,i)=>{
        return i;
    });
});
console.log(newState);