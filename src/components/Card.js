function Card({cardData, onCardClick}) {
    function handleClick() {
        onCardClick(cardData);
      } 
    return (
        <article className="card">
            <button className="card__delete hide"></button>
            <img className="card__image" src={cardData.link} alt={cardData.name} onClick={handleClick}/>
            <div className="card__info">
                <h2 className="card__name-place">{cardData.name}</h2>
                <button type="button" data-like={cardData.likes.length} className="card__like"></button>
            </div>
        </article>
    );
}

export default Card;