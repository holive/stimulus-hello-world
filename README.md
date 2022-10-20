### A hello world with Stimulus

Live page (desktop only): [cint-login.web.app](https://cint-login.web.app).<br>
Login: `ui@cint.com`
Password: `1234`

Layout copied from [Denis Bliznyuk](https://dribbble.com/shots/13954636-Onboarding-Animation).

---

Run

```
yarn
yarn dev
```

---

No React this time:

> [Stimulus](https://github.com/hotwired/stimulus)
> is a JavaScript framework with modest ambitions. It doesn't seek to take over your entire
> front-end—in fact, it's not concerned with rendering HTML at all. Instead, it's designed to
> augment
> your HTML with just enough behavior to make it shine.


How does it work? Sprinkle your HTML with controller, target, and action attributes:

```html

<div data-controller="hello">
    <input data-hello-target="name" type="text">

    <button data-action="click->hello#greet">Greet</button>

    <span data-hello-target="output"></span>
</div>
```

Then write a compatible controller. Stimulus brings it to life automatically:

```js
// hello_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["name", "output"]
	
    greet() {
        this.outputTarget.textContent = `Hello, ${this.nameTarget.value}!`
    }
}
```
