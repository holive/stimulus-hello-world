import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
	static targets = ["email"]
	static classes = ["emailFocus", "passwordFocus"]
	
	focusInput(event) {
		event.preventDefault()
		
		if (event.target.name == 'email') {
			this.element.classList.add(this.emailFocusClass)
		} else {
			this.element.classList.add(this.passwordFocusClass)
		}
	}
	
	blurInput() {
		this.element.classList.remove(this.emailFocusClass, this.passwordFocusClass)
	}
}

