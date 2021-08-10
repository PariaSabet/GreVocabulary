import { Component } from 'react';
import './App.css';
import Card from './Card/Card';
import DrawButton from './DrawButton/DrawButton';
import firebase from 'firebase/app';
import 'firebase/database';

import { DB_CONFIG } from './Config/Firebase/db_config';

class App extends Component {
	constructor(props) {
		super(props);

		//this.app = firebase.initializeApp(DB_CONFIG);
		if (!firebase.apps.length) {
			firebase.initializeApp(DB_CONFIG);
		} else {
			firebase.app();
		}

		this.database = firebase.database().ref().child('cards');
		this.updateCard = this.updateCard.bind(this);

		this.state = {
			cards: [],
			currentCard: {}
		};

		const currentCards = this.state.cards;

		this.database.on('child_added', (snap) => {
			currentCards.push({
				id: snap.key,
				word: snap.val().word,
				definition: snap.val().definition,
				translation: snap.val().translation,
				synonym: snap.val().synonym
			});

			this.setState({
				cards: currentCards,
				currentCard: this.getRandomCard(currentCards)
			});
		});
	}

	componentWillMount() {}

	getRandomCard(currentCards) {
		var card = currentCards[Math.floor(Math.random() * currentCards.length)];
		return card;
	}

	updateCard() {
		debugger;
		const currentCards = this.state.cards;
		// this.setState({
		// 	currentCard: this.getRandomCard(currentCards)
		// });
		if (currentCards.length == 0) {
			this.setState({
				currentCard: {
					id: 0,
					word: 'Loading...',
					definition: 'The  Definition',
					translation: 'The Translation',
					synonym: 'Synonyms'
				}
			});
		} else {
			this.setState({
				currentCard: this.getRandomCard(currentCards)
			});
		}
		// if (typeof currentCards !== 'undefined' && currentCards != null) {
		// 	console.log('Not Undefined and Not Null');
		// 	this.setState({
		// 		currentCard: this.getRandomCard(currentCards)
		// 	});
		console.log('New  Card');
	}

	render() {
		return (
			<div className="App">
				<Card
					word={this.state.currentCard.word}
					definition={this.state.currentCard.definition}
					translation={this.state.currentCard.translation}
					synonym={this.state.currentCard.synonym}
				/>
				<div className="buttonRow">
					<DrawButton drawCard={this.updateCard} />
				</div>
			</div>
		);
	}
}

export default App;
