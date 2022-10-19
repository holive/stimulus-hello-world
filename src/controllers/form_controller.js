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
 * @property {String} successClass
 */
export default class extends Controller {
	static targets = ["email", "password", "submit", "message"]
	static classes = [
		"emailFocus",
		"passwordFocus",
		"emailError",
		"passwordError",
		"loading",
		"invalid",
		"success"
	]
	
	focusInput({ target }) {
		if (target.name == "email") return this.changeState(c.FOCUS_EMAIL)
		this.changeState(c.FOCUS_PASSWORD)
	}
	
	blurInput() {
		this.changeState(c.BLUR)
		this.isEmailValid()
	}
	
	isEmailValid() {
		if (this.emailTarget.value && !this.emailTarget.value.match(c.EMAIL_REGEX)) {
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
	
	invalidStateClass() {
		setTimeout(() => this.element.classList.remove(this.invalidClass), 1000)
		return this.invalidClass
	}
	
	addLoadingClass() {
		this.element.classList.add(this.loadingClass)
		this.submitTarget.disabled = true
	}
	
	removeLoadingClass() {
		this.element.classList.remove(this.loadingClass)
		this.submitTarget.disabled = false
	}
	
	submit() {
		this.changeState('initial')
		if (this.submitTarget.disabled == true) return
		
		const data = new FormData(this.element)
		const [email, password] = [data.get('email'), data.get('password')]
		
		if (!email || !this.isEmailValid()) return this.changeState(c.INVALID_EMAIL)
		else if (!password || !this.isPasswordValid()) return this.changeState(c.INVALID_PASSWORD)
		
		this.login(email, password)
	}
	
	login(email, password) {
		this.changeState(c.LOADING)
		
		setTimeout(() => {
			if (email != 'ui@cint.com' || password != '1234') {
				return this.changeState(c.INVALID_CREDENTIALS)
			}
			
			this.changeState(c.SUCCESS)
			setTimeout(() => window.location.href = "https://www.cint.com/", 1000)
		}, 1500)
	}
	
	changeState(state) {
		switch (true) {
			case state == c.LOADING:
				this.addLoadingClass()
				break
			
			case state == c.FOCUS_EMAIL:
				this.element.classList.add(this.emailFocusClass)
				break
			
			case state == c.FOCUS_PASSWORD:
				this.element.classList.add(this.passwordFocusClass)
				break
			
			case state == c.BLUR:
				this.element.classList.remove(this.emailFocusClass, this.passwordFocusClass)
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
				this.messageTarget.innerHTML = 'Please type your password.'
				break
			
			case state == c.VALID_PASSWORD:
				this.element.classList.remove(this.passwordErrorClass)
				this.messageTarget.innerHTML = ''
				break
			
			case state == c.INVALID_CREDENTIALS:
				this.removeLoadingClass()
				this.element.classList.add(this.invalidStateClass(), this.emailErrorClass, this.passwordErrorClass)
				this.messageTarget.innerHTML = 'Your username and/or password are incorrect. Please try again.'
				break
			
			case state == c.SUCCESS:
				this.removeLoadingClass()
				this.element.closest('main').classList.add(this.successClass)
				break
			
			default:
				this.element.classList.remove(this.invalidStateClass())
				this.element.classList.remove(this.emailErrorClass)
				this.element.classList.remove(this.passwordErrorClass)
				this.messageTarget.innerHTML = ''
		}
	}
}
