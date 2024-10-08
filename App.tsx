import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const App = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  const addTask = () => {
    if (task.length > 0) {
      if (isEditing && editTaskId !== null) {
        setTasks(
          tasks.map(t => (t.id === editTaskId ? {...t, title: task} : t)),
        );
        setIsEditing(false);
        setEditTaskId(null);
      } else {
        setTasks([
          ...tasks,
          {id: tasks.length + 1, title: task, completed: false},
        ]);
      }
      setTask('');
    }
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  };

  const initiateEditTask = (id: number, title: string) => {
    setTask(title);
    setIsEditing(true);
    setEditTaskId(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Masukan Data</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add or edit a task"
          placeholderTextColor={'#ffff'} // Ubah warna placeholder menjadi hitam
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>
            {isEditing ? 'Update' : 'Add'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
              <Text
                style={[
                  styles.taskText,
                  item.completed && styles.completedTask,
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                onPress={() => initiateEditTask(item.id, item.title)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeTask(item.id)}>
                <Text style={styles.removeButton}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF69B4',
    paddingTop: 55,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffff',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    color: '#ffff',
  },
  input: {
    flex: 1,
    borderColor: '#000',
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    color: '#ffff',
    fontWeight: '400',
  },
  addButton: {
    backgroundColor: '#FF69B4',
    padding: 15,
    borderRadius: 10,
    marginLeft: 15,
    borderWidth: 2,
  },
  addButtonText: {
    color: '#ffff',
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: '#ffff',
    borderBottomWidth: 1,
  },
  taskText: {
    fontSize: 18,
    color: '#ffff',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#ffff',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  editButton: {
    color: 'black',
    marginRight: 10,
  },
  removeButton: {
    color: 'green',
  },
});

export default App;
