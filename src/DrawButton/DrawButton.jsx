import { Component } from 'react';
import './DrawButton.css';

class DrawButton extends Component {
	constructor(props) {
		super(props);

		this.drawCard = this.drawCard.bind(this);
	}

	drawCard() {
		this.props.drawCard();
	}

	render(props) {
		return (
			<div>
				<div className="buttonContainer">
					<button className="btn button1" onClick={this.drawCard}>
						Draw Cards
					</button>
				</div>
				{/* <div class="frame">Draw Cards</div> */}
			</div>
		);
	}
}
export default DrawButton;
