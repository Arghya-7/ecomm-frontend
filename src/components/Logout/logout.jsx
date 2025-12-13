export default function logout(){
    window.localStorage.removeItem("token");
}