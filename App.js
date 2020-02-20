import React, {Component} from 'react';
import { View } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text
} from "native-base";
import styles from "./styles";

export default class App extends Component {
	render() {
		return (
				<Button iconLeft success style={styles.mb15}>
				  <Icon active name="save" />
				  <Text>Salvar</Text>
				</Button>
		);
	  }
}

