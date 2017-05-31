export default class Card {

    constructor (cardID, fullName, departmentName, email, avatarPath) {
        this.cardID = cardID;
        this.fullName = fullName;
        this.departmentName = departmentName;
        this.email = email;
        this.avatarPath = avatarPath;
    }

    getCard () {
        return `
                <div class="card" id="${this.cardID}">
                    <div class="card__avatar">
                        <img class="card__avatar__img" src="images/${this.avatarPath}">
                    </div>
                    <div class="card__detail">
                        <h1 class="card__name">${this.fullName}</h1>
                        <p class="card__department">${this.departmentName}</p>
                        <a class="card__email" href="#">${this.email}</a>
                        <p class="card__email-domain">@kms-technology.com</p>
                    </div>
                </div>
        `;
    }

    getCardID () {
        return this.cardID;
    }
}
