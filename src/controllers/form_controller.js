import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
	static targets = ["email", "password", "submit", "message"]
	static classes = [
		"emailFocus",
		"passwordFocus",
		"emailError",
		"passwordError",
		"formLoading",
		"formInvalid"
	]
	
	focusInput({ target }) {
		if (target.name == "email") return this.changeFormState('FOCUS_EMAIL')
		this.changeFormState('FOCUS_PASSWORD')
	}
	
	blurInput() {
		this.changeFormState('BLUR')
	}
	
	submit() {
		this.changeFormState()
		if (!this.isEmailValid() || !this.isPasswordValid()) return
		
		if (this.emailTarget.value != 'ui@cint.com' || this.passwordTarget.value != '1234') {
			return this.changeFormState('INVALID_CREDENTIALS')
		}
		
		console.log('form sent...')
	}
	
	isEmailValid() {
		if (!this.emailTarget.value.match(/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/)) {
			return this.changeFormState('INVALID_EMAIL')
		}
		this.changeFormState('VALID_EMAIL')
		return true
	}
	
	isPasswordValid() {
		if (this.passwordTarget.value.length == 0) return this.changeFormState('INVALID_PASSWORD')
		this.changeFormState('VALID_PASSWORD')
		return true
	}
	
	changeFormState(state) {
		switch (true) {
			case state == 'FOCUS_EMAIL':
				this.element.classList.add(this.emailFocusClass)
				break
			case state == 'FOCUS_PASSWORD':
				this.element.classList.add(this.passwordFocusClass)
				break
			case state == 'BLUR':
				this.element.classList.remove(this.emailFocusClass, this.passwordFocusClass)
				break
			case state == 'INVALID_CREDENTIALS':
				this.element.classList.add(this.formInvalid)
				this.element.classList.add(this.emailErrorClass)
				this.element.classList.add(this.passwordErrorClass)
				this.messageTarget.innerHTML = 'The username or password you entered is incorrect.'
				break
			case state == 'INVALID_EMAIL':
				this.element.classList.add(this.emailErrorClass)
				break
			case state == 'VALID_EMAIL':
				this.element.classList.remove(this.emailErrorClass)
				break
			case state == 'INVALID_PASSWORD':
				this.element.classList.add(this.passwordErrorClass)
				break
			case state == 'VALID_PASSWORD':
				this.element.classList.remove(this.passwordErrorClass)
				break
			default:
				this.element.classList.remove(this.formInvalid)
				this.element.classList.remove(this.emailErrorClass)
				this.element.classList.remove(this.passwordErrorClass)
				this.messageTarget.innerHTML = ''
		}
	}
}

