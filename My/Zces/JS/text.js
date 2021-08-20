
var scope="global";
function t(){
    console.log(scope);
    var scope="local"
    console.log(scope);
}
console.log(scope);
t();
console.log(scope);