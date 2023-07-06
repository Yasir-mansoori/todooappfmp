// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getDatabase, ref, set, push, onValue,remove, update } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd89XeHkEbB8fTZUMnKb6PS4qov38GTec",
  authDomain: "obj-todo.firebaseapp.com",
  projectId: "obj-todo",
  storageBucket: "obj-todo.appspot.com",
  messagingSenderId: "1050032219745",
  appId: "1:1050032219745:web:831eb14ef1fe1f0a90ac20",
  measurementId: "G-744JELH2NH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase()



var inp =document.getElementById("input")
var ul = document.getElementById("list");

window.add = function(){
    // console.log(inp.value)

    var idRef = ref(database, "todos");
    var id = push(idRef).key;
// console.log(id)

    var obj = {
        todos: inp.value,
        id: id,
    }
    var refrence = ref(database, `todos/${id}/`);
    set(refrence, obj);          
 }

 function getTodo(){
    var refrence = ref(database, "todos");
    onValue(refrence, function(data){
    var dataObj =data.val();
    var list = Object.values(dataObj);
    render(list);
    })
 }
 getTodo();

  function render(data){
    ul.innerHTML = ""
    for (var i = 0; i < data.length; i++){
        ul.innerHTML += `<li>
        ${data[i].todos}<button class =trigger-btn onclick = "del(${i})">Delet</button> <button class =trigger-btn onclick = "edit(${i})">Edit</button>
        </li>`
    }
  }

  window.del = function(id){
    remove(ref(database , `todos/${id}`))
}

  // window.del = function(id){
  //   var refrence = ref(database, `/todos/${id}`)
  //   remove(refrence,);
    
  // }

  // window.edit = function(id){
  //   var taxt = prompt("enter new text");
  //   console.log(update);
  //   var refrence = ref(database, `/todos/${id}`);
  //   var obj = {
  //     todos: text
  //   }
  //   update(refrence, obj)
  // }
  window.edit = function(id){
    var newTodo = prompt("enter your data")

    update(ref(database , `todos/${id}`),{
        todo : newTodo
    })
}