
import {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button, ScrollView, FlatList, Modal} from 'react-native';
import uuid from 'react-native-uuid';

const App = () => {
  const[modalVisible, setModalVisible] = useState(false)
  const[idSelected, setIdSelected] = useState("")
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

  const onHandlerModalDelete = (id) => {
    setIdSelected(id)
    setModalVisible(true)
  }
  const deleteTask = () =>{
    setTasks(tasks.filter(task => task.id != idSelected))
  }

  return (
  <View style={styles.container}>
    <View style={styles.inputContainer}>
      <TextInput value={newTask.title} onChangeText={onHandlerTitle} placeholder='Ingresar titulo' style={styles.input}></TextInput>
      <TextInput value={newTask.desc} onChangeText={onHandlerDesc} placeholder='Ingresar descripcion' style={styles.input}></TextInput>
      <Button color="#A1B1FA" title='ADD' onPress={addTask}></Button>
    </View>
    <View style={styles.taskContainer}>
    <FlatList
    data={tasks}
    keyExtractors={item => item.id}
    renderItem={({item}) => (
                      <View style={styles.taskCard}>
                      <Text style={styles.text}>{item.title}</Text>
                      <Button color="#DEC5FA" title='Del' onPress={() => onHandlerModalDelete(item.id)}/>
                      </View>
        )}
    />
    </View>
    <Modal visible={modalVisible}>
      <View style={styles.modalCard}>
        <Text style={styles.modalText}>Quieres borrar esta tarea?</Text>
      <Button color="#DEC5FA" title='si' onPress={()=> {
        deleteTask()
        setModalVisible(false)
      }}/> 
      <Button  color="#DEC5FA" title='no' onPress={()=> setModalVisible(false)}/>
      </View>
    </Modal>
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
    padding:10,
    
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
  },
  modalText:{
    width:"50%",
    color:"black",
    fontSize:20,
    textAlign:"center"
  },
  modalCard:{
    height:"80%",
    backgroundColor:"#FAC0ED",
    justifyContent:"center",
    alignItems:"center"
  },

})
