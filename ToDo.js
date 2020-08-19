import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput
} from "react-native";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
  state = {
    isEditing: false,
    isCompleted: false,
    toDoValue:""
  };

  render() {
    const { isCompleted, isEditing,toDoValue } = this.state;
    const {text} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toglleComplete}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.uncompletedCircle,
              ]}
            ></View>
          </TouchableOpacity>
          {isEditing ? (
            <TextInput style={[styles.text, styles.input,  isCompleted ? styles.completedText : styles.uncompletedText]} 
                       value={toDoValue} 
                       multiline={true}
                       onChangeText={this._controllInput}
                       returnKeyType={"done"}
                       onBlur={this._FinishEditing}
                       
            />
            )
          : (
            <Text
            style={[
              styles.Text,
              isCompleted ? styles.completedText : styles.uncompletedText,
            ]}
          >
            {text}
          </Text>
          )  
        }

        </View>
        <View style={styles.column}>
              {isEditing ? (
                <View style={styles.actions}>
                  <TouchableOpacity onPressOut={this._FinishEditing}>
                    <View style={styles.actionContainer}>
                      <Text style={styles.actionText}>Chk</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                ) : (
                  <View style={styles.actions}>
                   <TouchableOpacity onPressOut={this._startEditing}>
                      <View style={styles.actionContainer}>
                        <Text style={styles.actionText}>W</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <View style={styles.actionContainer}>
                        <Text style={styles.actionText}>X</Text>
                      </View>
                    </TouchableOpacity>
                </View>
                )}
        </View>
      </View>
    );
  }
  _toglleComplete = () => {
    this.setState((prevState) => {
      return {
        isCompleted: !prevState.isCompleted,
      };
    });
  };

  _startEditing=() =>{
    const {text} = this.props;
    this.setState({isEditing:true, toDoValue:text});
  }

  _FinishEditing=() =>{
    this.setState({isEditing:false});
  }

  _controllInput = (text) => {
    this.setState({toDoValue: text});
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 10,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 15,
    borderColor: "red",
    borderWidth: 1,
    marginRight: 5,
    marginLeft: 5,
  },
  completedCircle: {
    borderColor: "#bbb",
  },
  uncompletedCircle: {
    borderColor: "#F23657",
  },
  Text: {
    fontWeight: "600",
    fontSize: 10,
    marginVertical: 10,
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through",
  },
  uncompletedText: {
    color: "#F23657",
  },
  column:{
    flexDirection: "row",
    alignItems: "center",
    width: width / 2,
    justifyContent: "space-between"
  },
  actions:{
    flexDirection:"row",
    alignItems:"center"
  },  
  actionText:{
    fontWeight: "600",
    fontSize: 10,
    marginVertical: 10,
    marginLeft: 10
  },
  actionContainer: {
    marginVertical:10,
    marginHorizontal:10
  },
  input: {
    marginVertical:15,
    width: width/2
  }
  
});
