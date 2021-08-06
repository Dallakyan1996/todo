import logo from './logo.svg';
import './App.css';
import ToDoItem from './Components/TodoList';
import AddTask from './Components/TaskInput';

function App(props) {
  return (
    <>
      <div className="App">
        <ToDoItem />
      </div>
    </>
  );
}

export default App;
