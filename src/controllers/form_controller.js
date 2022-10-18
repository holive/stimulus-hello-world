import { Controller } from '@hotwired/stimulus'
import * as c from "../constants";

/**
 * @property {Object} submitTarget
 * @property {Object} messageTarget
 * @property {Object} emailTarget
 * @property {Object} passwordTarget
 *
 * @property {String} passwordErrorClass
 * @property {String} passwordFocusClass
 * @property {String} emailErrorClass
 * @property {String} emailFocusClass
 * @property {String} loadingClass
 * @property {String} invalidClass
 */
export default class extends Controller {
	static targets = ["email", "password", "submit", "message"]
	static classes = [
		"emailFocus",
		"passwordFocus",
		"emailError",
		"passwordError",
		"loading",
		"invalid"
	]
	
	focusInput({ target }) {
		if (target.name == "email") return this.changeState(c.FOCUS_EMAIL)
		this.changeState(c.FOCUS_PASSWORD)
	}
	
	blurInput() {
		this.changeState(c.BLUR)
		this.isEmailValid()
	}
	
	submit() {
		this.changeState()
		if (!this.isEmailValid() || !this.isPasswordValid()) return
		
		if (this.emailTarget.value != 'ui@cint.com' || this.passwordTarget.value != '1234') {
			return this.changeState(c.INVALID_CREDENTIALS)
		}
		
		console.log('form sent...')
	}
	
	isEmailValid() {
		if (this.emailTarget.value && !this.emailTarget.value.match(/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/)) {
			return this.changeState(c.INVALID_EMAIL)
		}
		this.changeState(c.VALID_EMAIL)
		return true
	}
	
	isPasswordValid() {
		if (this.passwordTarget.value.length == 0) return this.changeState(c.INVALID_PASSWORD)
		this.changeState(c.VALID_PASSWORD)
		return true
	}
	
	changeState(state) {
		switch (true) {
			case state == c.FOCUS_EMAIL:
				this.element.classList.add(this.emailFocusClass)
				break
			
			case state == c.FOCUS_PASSWORD:
				this.element.classList.add(this.passwordFocusClass)
				break
			
			case state == c.BLUR:
				this.element.classList.remove(this.emailFocusClass, this.passwordFocusClass)
				break
			
			case state == c.INVALID_CREDENTIALS:
				this.element.classList.add(this.invalidStateClass(), this.emailErrorClass, this.passwordErrorClass)
				this.messageTarget.innerHTML = 'The username or password you entered is incorrect.'
				break
			
			case state == c.INVALID_EMAIL:
				this.element.classList.add(this.invalidStateClass(), this.emailErrorClass)
				this.messageTarget.innerHTML = 'Invalid e-mail format.'
				break
			
			case state == c.VALID_EMAIL:
				this.element.classList.remove(this.emailErrorClass)
				this.messageTarget.innerHTML = ''
				break
			
			case state == c.INVALID_PASSWORD:
				this.element.classList.add(this.invalidStateClass(), this.passwordErrorClass)
				this.messageTarget.innerHTML = 'Password is empty.'
				break
			
			case state == c.VALID_PASSWORD:
				this.element.classList.remove(this.passwordErrorClass)
				this.messageTarget.innerHTML = ''
				break
			
			default:
				this.element.classList.remove(this.invalidStateClass())
				this.element.classList.remove(this.emailErrorClass)
				this.element.classList.remove(this.passwordErrorClass)
				this.messageTarget.innerHTML = ''
		}
	}
	
	invalidStateClass() {
		setTimeout(() => {
			this.element.classList.remove(this.invalidClass)
		}, 1000)
		return this.invalidClass
	}
}

