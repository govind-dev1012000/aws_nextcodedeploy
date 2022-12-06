import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/header";
import AddTodo from "../containers/addTodo";
import TodoList from "../containers/todoList";
import axios from "axios";
import { gql, useMutation } from "@apollo/client";
import apolloclient from "../apolloclient/apolloclient";

export default function Home() {

  const [todos, setTodos] = useState([]);

  useEffect( ()=>{
    (async() => 
    {const todoslist = await apolloclient.query({
      query: gql`
      query{
        todos{
          data{
            id
            attributes{
              text
            }
          }
        }
      }
      `,
    });
    const results = await todoslist.data.todos.data;
    
    console.log(results)
    setTodos(results);
    console.log(todos);
  } ) ();
 },[]);

  const gqladdtodo = gql`
  mutation($data:TodoInput!){
    createTodo(data:$data){
      data{
        id
        attributes{
          text
        }
    }
  }
}
  `;
  const [addsubmit] = useMutation(gqladdtodo);

  const gqldeltodo = gql`
  mutation($data:ID!){
    deleteTodo(id:$data){
      data{
        id
      }
    }
  }
  `;
  const [delsubmit] = useMutation(gqldeltodo);

  const gqledittodo = gql`
  mutation($data1:ID!,$data2:TodoInput!){
    updateTodo(id:$data1,data:$data2){
      data{
        id
        attributes{
          text
        }
      }
    }
  }
  `;
  const [editsubmit] = useMutation(gqledittodo);



  const addTodo = async (text) => {
    console.log(text)
    if (text && text.length > 0) {
      const addtodo = await addsubmit({
        variables: {
          "data": {
            "text": text
          }
        }
      });
      console.log("add output", addtodo)
      setTodos([...todos,addtodo.data.createTodo.data]);
    }


  };

  const deleteTodoItem = async (todo) => {
    if (confirm("Do you really want to delete this item?")) {
      const deltodo = await delsubmit({
        variables: 
        {
          "data": todo.id
        }
      });
      console.log("del output", deltodo)
      const newTodos = todos.filter((_todo) => _todo.id !== todo.id);
      console.log(newTodos);
      setTodos(newTodos);
    }
  };

  const editTodoItem = async (todo) => {
    const newTodoText = prompt("Enter new todo text or description:");
    if (newTodoText != null) {
      const edittodo = await editsubmit({
        variables: 
        {
          "data1": todo.id,
          "data2": {
            "text": newTodoText
          }
        }
      });
      console.log("edit output", edittodo)
      const moddedTodos = todos.map((_todo) => {
        if (_todo.id === todo.id) {
          return edittodo.data.updateTodo.data;
        } else {
          return _todo;
        }
      });
      setTodos(moddedTodos);
    }
  };



  return (
    <div>
      <Head>
        <title>ToDo app</title>
        <link rel='manifest' href='/manifest.json' />
      </Head>
      <Header />
      <main className="main">
        <AddTodo addTodo={addTodo} />
        <TodoList
          todos={todos}
          deleteTodoItem={deleteTodoItem}
          editTodoItem={editTodoItem}
        />
      </main>
    </div>
  );
}

// export async function getServerSideProps(context) {

//   const getlist = gql`
//   query{
//     todos{
//       data{
//         id
//         attributes{
//           text
//         }
//       }
//     }
//   }
//   `;
//   const todosdata = await apolloclient.query({

//     query: getlist

//   });
//   // iuconsole.log(todosdata);
//   const todoslist = todosdata.data.todos.data
//   return {
//     props: { todoslist }
//   }





// }