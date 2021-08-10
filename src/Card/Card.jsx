import React from 'react';
import './Card.css';
import { useState } from 'react';

export default function Cardsss({ word, definition, translation, synonym }) {
	const [ flip, setFlip ] = useState(true);

	return (
		<div id="js-flip-1" class="flip" onClick={() => setFlip(!flip)}>
			{flip ? (
				<div class="card">
					<div class="face front">{word}</div>
					<div className="backdrop" />
				</div>
			) : (
				<div class="card flipped">
					<div class="face back">
						<div className="definition">{definition}</div>
						<div className="translation">{translation}</div>
						<div className="synonyms">
							<strong>syn: </strong> {synonym}
						</div>
					</div>
					<div className="backdrop" />
				</div>
			)}
		</div>
	);
}
