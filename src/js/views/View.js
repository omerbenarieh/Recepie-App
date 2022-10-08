import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object|Object[]} data  The data to be rendered (e.g recipe)
   * @param {boolean} [render=true] if false, create markup string instead of rendering to the DOM
   * @returns {undefined|string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Omer Ben Arieh
   * @TODO Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  /**
   * @param {Object[]} data The recipes's to be rendered
   */
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Convert a string to a DOM element
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      )
        curEl.textContent = newEl.textContent;

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(att =>
          curEl.setAttribute(att.name, att.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  // Spinner
  renderSpinner() {
    const markup = `
          <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
          </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMsg) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="src/img/${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMsg(message = this._message) {
    const markup = `
    <div class="message">
            <div>
              <svg>
                <use href="src/img/${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
