import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import ToDo from "./ToDo";
import {AppLoading} from "expo";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos : false
  };
  componentDidMount = () =>{
    this._loadToDos();
  }
  render() {
    const { newToDo, loadedToDos } = this.state;
    if(!loadedToDos){
      return <AppLoading/>
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>To Do Test  App</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            onChangeText={this._controlNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"} 
            autoCorrect={false}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text={"Hello I'm a TODO" } />
          </ScrollView>
        </View>
      </View>
    );
  }

  _controlNewToDo = (text) => {
    this.setState({ newToDo: text });
  };

  _loadToDos =() => {
    this.setState({loadedToDos:true});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 20,
    fontWeight: "200",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },

  input: {
    padding: 5,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 12,
  },
});
