
import {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button, ScrollView} from 'react-native';
import uuid from 'react-native-uuid';

const App = () => {
  const [newTask,setNewTask] = useState({
    title:"",
    desc:"",
    id:""
  })
  
  const [tasks,setTasks] = useState ([])

  const addTask = () =>{
    setTasks([...tasks,newTask])
    console.log(newTask)
    setNewTask({    
    title:"",
    desc:"",
    id:""
    })
  }

  const onHandlerTitle = (t) => {
    const id = uuid.v4();
    setNewTask({...newTask,title:t, id})
    console.log(newTask)
  }

  const onHandlerDesc = (r) => {
    setNewTask({...newTask,desc:r})
    console.log(newTask)
  }

  return (
  <View style={styles.container}>
    <View style={styles.inputContainer}>
      <TextInput value={newTask.title} onChangeText={onHandlerTitle} placeholder='Ingresar titulo' style={styles.input}></TextInput>
      <TextInput value={newTask.desc} onChangeText={onHandlerDesc} placeholder='Ingresar descripcion' style={styles.input}></TextInput>
      <Button color="#A1B1FA" title='ADD' onPress={addTask}></Button>
    </View>
    
    <ScrollView style={styles.taskContainer}>
      {
      tasks.map(task => (<View key={task.id} style={styles.taskCard}>
                        <Text style={styles.text}>{task.title}</Text>
                        <Button title='Del'></Button>
                        </View>)
        )
      }
    </ScrollView>

  </View>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#DEC5FA",
    flex:1,
    paddingTop:30
  },
  inputContainer:{
    backgroundColor:"#FAC0ED",
    alignItems:"center",
    justifyContent:"space-around"
  },
  input:{
    width:250,
    borderBottomWidth:3,
    borderColor:"black"
  },
  taskContainer:{
    padding:10
  },
  taskCard:{
    flexDirection:"row",
    backgroundColor:"#FAC0ED",
    padding:20,
    alignItems:"center",
    borderRadius:5
  },
  text:{
    width:"70%",
    color:"black",
    fontSize:16
  }
})
