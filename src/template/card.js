export default class Card {

    constructor (contact) {
        this.firstName = contact.firstName;
        this.lastName = contact.lastName;
        this.title = contact.title;
        this.department = contact.department;
        this.employeeId = contact.employeeId;
        this.superiorId = contact.superiorId;
        this.id = contact.id;

        let avatar = contact.avatar;
        if (avatar !== undefined && avatar.includes('data:image')) {
            this.avatar = avatar;
        } else {
            this.avatar = 'images/' + avatar;
        }
    }

    getCard () {
        return `
               <div class="card__avatar">
                   <label for="${this.id}-avatar-uploader">
                        <img class="card__avatar__img" id="${this.id}-avatar-img" src="${this.avatar}">
                   </label>                
                   <input id="${this.id}-avatar-uploader" type="file" disabled="true"/>
               </div>
               <div class="card__detail">
                   <h1 class="card__name">${this.firstName + ' ' + this.lastName}</h1>
                   <p class="card__department">${this.department}</p>
                   <a class="card__email" href="#">${this.employeeId}</a>
                   <p class="card__email-domain">@kms-technology.com</p>
               </div>
               <div class="card__action">
                   <img id="card__edit" src="images/icon/edit-icon.png">
                   ${this.superiorId ? `<img id="card__add-right" src="images/icon/add-right-icon.png">` : `<img id="card__add-right" style="display: 'none'">`}
                   <img id="card__add-bottom" src="images/icon/add-bottom-icon.png">
                   ${this.superiorId ? `<img id="card__delete" src="images/icon/delete-icon.png">` : `<img id="card__delete" style="display: 'none'">`}
               </div>
               `;
    }

    getCardID () {
        return this.cardID;
    }
}
