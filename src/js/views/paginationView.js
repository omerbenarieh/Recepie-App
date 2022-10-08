import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 , and other pages
    if (curPage === 1 && numPages > 1) {
      return this._forwardBTN(curPage, numPages);
    }

    // Last Page
    if (curPage === numPages && numPages > 1) {
      return this._BackwardBTN(curPage, numPages);
    }

    // Other pages
    if (this._data.page < numPages) {
      return this._BackwardAndForwardBTNS(curPage, numPages);
    }

    // One Page only
    return `<span class="Pages">There are ${numPages} page.</span>`;
  }

  _forwardBTN(curPage, numPages) {
    return `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    <span class="Pages">There are ${numPages} pages.</span>
    `;
  }

  _BackwardBTN(curPage, numPages) {
    return `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page  ${curPage - 1}</span>
  </button> 
  <span class="Pages">There are ${numPages} pages.</span>`;
  }

  _BackwardAndForwardBTNS(curPage, numPages) {
    return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page  ${curPage - 1}</span>
    </button>

    <span class="Pages">There are ${numPages} pages.</span>

    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
    <span>Page  ${curPage + 1}</span>
    <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
    </svg>
    </button>
  `;
  }
}

export default new PaginationView();
