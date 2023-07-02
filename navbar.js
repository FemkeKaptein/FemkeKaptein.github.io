class Myheader extends HTMLElement {
    connectedCallback() {
        this.innerHTML =
            '<header id="header">\n' +
                '<nav>\n' +
                    '<ul id="navlist">\n' +
                        '<li class="list-item"><img class="logo" src="img/logo.jpeg" alt="logo"></li>\n' +
                        '<li class="list-item"><a class="anchor" href="index.html">Thuis</a></li>\n' +
                        '<li class="list-item"><a class="anchor" href="hardlopen.html">Hardlopen</a></li>\n' +
                        '<li class="list-item"><a class="anchor" href="wandelen.html">Wandelen</a></li>\n' +
                    '</ul>\n' +
                '</nav>\n' +
            '</header>\n'
    }
}
customElements.define('my-header', Myheader)